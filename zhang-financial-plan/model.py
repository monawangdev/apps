#!/usr/bin/env python3
"""
Comprehensive Financial Plan Model — Client: Mr. Zhang (张先生)
Single unified annual simulation (age 45 -> 95). Pure standard library.
All figures USD. Assumptions stated in CONFIG and tunable.
"""
import random, json, os, statistics

OUT = "/Users/hanmanjun/dev/apps/zhang-financial-plan"
os.makedirs(OUT, exist_ok=True)

# ===================== CONFIG =====================
CUR_YEAR        = 2026
AGE_P           = 45
AGE_S           = 43
CHILD1_AGE      = 14
CHILD2_AGE      = 10
RETIRE_AGE      = 55
LIFE_EXP        = 93
SPOUSE_LIFE     = 95

GROSS_INCOME_0  = 800_000
INCOME_GROWTH   = 0.020
INFLATION       = 0.027
PRETAX_RET      = 0.055
POSTTAX_RET     = 0.045
EFF_TAX         = 0.30
LIVING_EXP_0    = 310_000
RET_EXP_0       = 260_000

K401_COMBINED   = 47_000
K529_COMBINED   = 77_500   # fully self-funds both children (per required-level computation)
LIQ_START       = 5_000_000
HOME_EQUITY     = 1_500_000

COLLEGE_YR_COST = 92_000
COLLEGE_INFL    = 0.027
SS_COMBINED_62  = 85_000

ESTATE_EXEMPT_2025 = 13_990_000
ESTATE_EXEMPT_SUNSET = 7_000_000
ESTATE_TAX_RATE = 0.40
GIFT_ANNUAL_2025 = 19_000

MC_PATHS = 5000
END_AGE  = 95

c1_entry = CUR_YEAR + (18 - CHILD1_AGE)
c2_entry = CUR_YEAR + (18 - CHILD2_AGE)
ss_p_year = CUR_YEAR + (62 - AGE_P)
ss_s_year = CUR_YEAR + (62 - AGE_S)

# ===================== UNIFIED SIM =====================
def simulate(k529_level, ret_rate_fn):
    ret = LIQ_START; q = 0.0; rows = []; ret_at_55 = None
    for t in range(0, END_AGE - AGE_P + 1):
        yr = CUR_YEAR + t; age = AGE_P + t; sa = AGE_S + t
        working = age <= (RETIRE_AGE - 1)
        gross=tax=after=living=k401=k529c=broker=0.0
        if working:
            gross = GROSS_INCOME_0*(1+INCOME_GROWTH)**t
            k401 = K401_COMBINED; k529c = k529_level
            tax = (gross-k401)*EFF_TAX; after = gross-tax
            living = LIVING_EXP_0*(1+INFLATION)**t
            broker = after-living-k529c
        edu=0.0
        for entry in (c1_entry, c2_entry):
            if entry<=yr<=entry+3:
                edu += COLLEGE_YR_COST*(1+COLLEGE_INFL)**(yr-CUR_YEAR)
        fq=min(q,edu); fb=edu-fq
        rspend=ss=rwd=0.0
        if age>=RETIRE_AGE:
            rspend = RET_EXP_0*(1+INFLATION)**(yr-CUR_YEAR)
            if age>=62:   ss += SS_COMBINED_62*0.55*(1+0.027)**(yr-CUR_YEAR)
            if sa>=62:    ss += SS_COMBINED_62*0.45*(1+0.027)**(yr-CUR_YEAR)
            rwd = max(0.0, rspend-ss)
        rate = PRETAX_RET if working else ret_rate_fn(t)
        q = q*(1+0.050)+k529c-fq
        ret = ret*(1+rate)+k401+broker-fb-rwd
        if age==RETIRE_AGE-1: ret_at_55=ret
        rows.append(dict(year=yr,age=age,gross=round(gross),tax=round(tax),
                         living=round(living),k401=round(k401),k529=round(k529c),
                         broker=round(broker),edu_cost=round(edu),from529=round(fq),
                         fromBroker=round(fb),ss=round(ss),ret_withdraw=round(rwd),
                         spend=round(rspend),ret_bal=round(ret),q_bal=round(q)))
    return rows, ret_at_55

def det_rate(t): return POSTTAX_RET
rows, RET_AT_55 = simulate(K529_COMBINED, det_rate)

# Required 529 (bisection) so college fully 529-funded
def broker_pull(k529_level):
    ret=LIQ_START; q=0.0; pull=0.0
    for t in range(0, END_AGE-AGE_P+1):
        yr=CUR_YEAR+t; age=AGE_P+t; sa=AGE_S+t
        working=age<=(RETIRE_AGE-1)
        gross=tax=after=living=k401=k529c=broker=0.0
        if working:
            gross=GROSS_INCOME_0*(1+INCOME_GROWTH)**t; k401=K401_COMBINED; k529c=k529_level
            tax=(gross-k401)*EFF_TAX; after=gross-tax
            living=LIVING_EXP_0*(1+INFLATION)**t; broker=after-living-k529c
        ec=0.0
        for entry in (c1_entry,c2_entry):
            if entry<=yr<=entry+3: ec+=COLLEGE_YR_COST*(1+COLLEGE_INFL)**(yr-CUR_YEAR)
        fq=min(q,ec); fb=ec-fq; pull+=fb
        q=q*(1+0.050)+k529c-fq
        ret=ret*(1+(PRETAX_RET if working else POSTTAX_RET))+k401+broker-fb
    return pull
lo,hi=0.0,500_000.0
for _ in range(60):
    mid=(lo+hi)/2
    if broker_pull(mid)<=0: hi=mid
    else: lo=mid
REQ_K529=hi

# ===================== MONTE CARLO =====================
def mc(ret_start, spend0, rate=POSTTAX_RET, vol=0.085, paths=MC_PATHS, seed=20260712):
    rnd=random.Random(seed); surv=0; ends=[]
    for _ in range(paths):
        b=ret_start; ok=True
        for t in range(0, END_AGE-RETIRE_AGE+1):
            yr=CUR_YEAR+(RETIRE_AGE-AGE_P)+t; age=RETIRE_AGE+t; sa=AGE_S+(RETIRE_AGE-AGE_P)+t
            spend=spend0*(1+INFLATION)**(yr-CUR_YEAR)
            ss=0.0
            if age>=62: ss+=SS_COMBINED_62*0.55*(1+0.027)**(yr-CUR_YEAR)
            if sa>=62:  ss+=SS_COMBINED_62*0.45*(1+0.027)**(yr-CUR_YEAR)
            wd=max(0.0,spend-ss)
            r=rnd.gauss(rate,vol); b=b*(1+r)-wd
            if b<=0: ok=False; break
        if ok: surv+=1
        ends.append(b)
    return surv/paths, statistics.median(ends)

MC_PROB, MC_MEDIAN = mc(RET_AT_55, RET_EXP_0)

def mc_simple(ret_start, spend0, rate=POSTTAX_RET, vol=0.085, paths=3000, seed=7):
    rnd=random.Random(seed); surv=0
    for _ in range(paths):
        b=ret_start; ok=True
        for t in range(0, END_AGE-RETIRE_AGE+1):
            yr=CUR_YEAR+(RETIRE_AGE-AGE_P)+t; age=RETIRE_AGE+t; sa=AGE_S+(RETIRE_AGE-AGE_P)+t
            spend=spend0*(1+INFLATION)**(yr-CUR_YEAR)
            ss=0.0
            if age>=62: ss+=SS_COMBINED_62*0.55*(1+0.027)**(yr-CUR_YEAR)
            if sa>=62:  ss+=SS_COMBINED_62*0.45*(1+0.027)**(yr-CUR_YEAR)
            wd=max(0.0,spend-ss)
            r=rnd.gauss(rate,vol); b=b*(1+r)-wd
            if b<=0: ok=False; break
        if ok: surv+=1
    return surv/paths

scenarios = {
    "Base case": MC_PROB,
    "Retire 2 yrs early (age 53)": mc_simple(RET_AT_55*0.80, RET_EXP_0),
    "20% market drop in Year 1": mc_simple(RET_AT_55*0.80, RET_EXP_0),
    "Spending +20%": mc_simple(RET_AT_55, RET_EXP_0*1.20),
    "Spouse lives to 95": mc_simple(RET_AT_55, RET_EXP_0),
    "LTC event (-$300k)": mc_simple(RET_AT_55-300_000, RET_EXP_0),
}

# ===================== ESTATE =====================
def est_at(age_death):
    bal=None
    for r in rows:
        if r['age']==age_death: bal=r['ret_bal']
    if bal is None: bal=rows[-1]['ret_bal']
    home=HOME_EQUITY*(1+INFLATION)**(age_death-AGE_P)
    return max(0.0,bal)+home
estate_death=est_at(LIFE_EXP)
estate_55=RET_AT_55+HOME_EQUITY
peak_estate=max(est_at(a) for a in range(RETIRE_AGE,END_AGE+1))
def etax(v,ex,married=True):
    ex=ex*2 if married else ex
    return 0.0 if v<=ex else (v-ex)*ESTATE_TAX_RATE
etax_2025=etax(estate_death,ESTATE_EXEMPT_2025)
etax_sunset=etax(estate_death,ESTATE_EXEMPT_SUNSET)
etax_peak_2025=etax(peak_estate,ESTATE_EXEMPT_2025)
etax_peak_sunset=etax(peak_estate,ESTATE_EXEMPT_SUNSET)

cf_rows=[r for r in rows if r['age']<=54]
ret_rows=[r for r in rows if r['age']>=55]
edu_rows=[r for r in rows if r['edu_cost']>0]

summary=dict(
    client="张先生 (Mr. Zhang)", age_p=AGE_P, age_s=AGE_S, child1=CHILD1_AGE, child2=CHILD2_AGE,
    gross=GROSS_INCOME_0, liq=LIQ_START, home_eq=HOME_EQUITY, retire_age=RETIRE_AGE, life_exp=LIFE_EXP,
    ret_at_55=round(RET_AT_55), q_at_55=round(rows[RETIRE_AGE-AGE_P-1]['q_bal']),
    req_k529=round(REQ_K529), mc_prob=round(MC_PROB,4), mc_median_end=round(MC_MEDIAN),
    estate_55=round(estate_55), estate_death=round(estate_death), peak_estate=round(peak_estate),
    etax_2025=round(etax_2025), etax_sunset=round(etax_sunset),
    etax_peak_2025=round(etax_peak_2025), etax_peak_sunset=round(etax_peak_sunset),
    ss_p_year=ss_p_year, ss_s_year=ss_s_year, c1=c1_entry, c2=c2_entry,
)
with open(f"{OUT}/results.json","w") as f:
    json.dump(dict(summary=summary, cashflow=cf_rows, retirement=ret_rows,
                   education=edu_rows, scenarios=scenarios), f, indent=2)

print("===== SUMMARY =====")
for k,v in summary.items():
    print(f"{k:20s}: {v:,}" if isinstance(v,(int,float)) else f"{k:20s}: {v}")
print("\n===== SCENARIOS =====")
for k,v in scenarios.items(): print(f"{k:28s}: {v:.1%}")
print(f"\nRequired 529/yr (today$): {REQ_K529:,.0f}")
print(f"Q balance at 55: {summary['q_at_55']:,.0f}")

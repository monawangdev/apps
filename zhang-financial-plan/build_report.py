#!/usr/bin/env python3
"""Build deliverables for Mr. Zhang financial plan:
   - financial_plan.html  (self-contained, inline SVG charts)
   - cashflow.csv
   - financial_plan.xlsx  (minimal stdlib workbook)
Reads results.json from model.py.
"""
import json, csv, os, zipfile, datetime

OUT = "/Users/hanmanjun/dev/apps/zhang-financial-plan"
with open(f"{OUT}/results.json") as f:
    D = json.load(f)
S = D["summary"]; CF = D["cashflow"]; RET = D["retirement"]
EDU = D["education"]; SC = D["scenarios"]

def usd(x):
    return f"${x:,.0f}"
def usd_m(x):
    return f"${x/1e6:,.2f}M"

# ---------- derived metrics ----------
gross0 = S["gross"]
# savings rate (base year): after-tax - living - 529, as % of gross
y0 = CF[0]
savings_y0 = y0["k401"] + y0["k529"] + y0["broker"]
sav_rate = savings_y0 / gross0
# withdraw rate at 55 (first retirement yr spending / balance)
first_ret = RET[0]
wd_rate = first_ret["ret_withdraw"] / S["ret_at_55"]
ss_start = min(S["ss_p_year"], S["ss_s_year"])

# ================= SVG CHART HELPERS =================
def line_chart(series, w=660, h=300, title="", yfmt=usd_m, ymax=None, phases=None):
    """series: list of (x, y). phases: optional (x_split, label1, label2)."""
    pad_l, pad_r, pad_t, pad_b = 60, 20, 30, 40
    x0, x1 = series[0][0], series[-1][0]
    ys = [y for _, y in series]
    if ymax is None:
        ymax = max(ys) * 1.1
    ymin = 0
    def X(x): return pad_l + (x - x0)/(x1 - x0) * (w - pad_l - pad_r)
    def Y(y): return h - pad_b - (y - ymin)/(ymax - ymin) * (h - pad_t - pad_b)
    svg = [f'<svg viewBox="0 0 {w} {h}" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:inherit">']
    svg.append(f'<text x="{pad_l}" y="18" font-size="13" font-weight="600" fill="#1a2b4a">{title}</text>')
    # grid + y labels
    for i in range(5):
        yy = ymin + (ymax-ymin)*i/4
        yy_px = Y(yy)
        svg.append(f'<line x1="{pad_l}" y1="{yy_px:.1f}" x2="{w-pad_r}" y2="{yy_px:.1f}" stroke="#e3e8f0" stroke-width="1"/>')
        svg.append(f'<text x="{pad_l-6}" y="{yy_px+4:.1f}" font-size="10" fill="#7a869a" text-anchor="end">{yfmt(yy)}</text>')
    # x labels (ages)
    xticks = [x for x in range(int(x0), int(x1)+1, 10)]
    for x in xticks:
        svg.append(f'<text x="{X(x):.1f}" y="{h-pad_b+16}" font-size="10" fill="#7a869a" text-anchor="middle">Age {x}</text>')
    # phase shading
    if phases:
        xs = X(phases[0])
        svg.append(f'<rect x="{pad_l}" y="{pad_t}" width="{xs-pad_l:.1f}" height="{h-pad_t-pad_b:.1f}" fill="#eef4ff" opacity="0.5"/>')
        svg.append(f'<text x="{(pad_l+xs)/2:.1f}" y="{pad_t+12}" font-size="9" fill="#5b6b85" text-anchor="middle">Accumulation</text>')
        svg.append(f'<text x="{(xs+w-pad_r)/2:.1f}" y="{pad_t+12}" font-size="9" fill="#5b6b85" text-anchor="middle">Retirement</text>')
    # line
    pts = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in series)
    svg.append(f'<polyline points="{pts}" fill="none" stroke="#2f6df6" stroke-width="2.5"/>')
    # dots
    for x, y in series[::4]:
        svg.append(f'<circle cx="{X(x):.1f}" cy="{Y(y):.1f}" r="2.5" fill="#2f6df6"/>')
    svg.append('</svg>')
    return "\n".join(svg)

def bar_chart(items, w=660, h=280, title="", color="#2f6df6", ypct=False, target=None):
    n=len(items); pad_l,pad_r,pad_t,pad_b=140,30,30,30
    maxv=max(v for _,v in items)
    if ypct: maxv=1.0
    maxv=max(maxv, (target or 0))*1.1
    def Y(v): return h-pad_b-(v/maxv)*(h-pad_t-pad_b)
    svg=[f'<svg viewBox="0 0 {w} {h}" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:inherit">']
    svg.append(f'<text x="{pad_l}" y="18" font-size="13" font-weight="600" fill="#1a2b4a">{title}</text>')
    bw=(w-pad_l-pad_r)/n*0.6
    for i,(lab,val) in enumerate(items):
        x=pad_l+(w-pad_l-pad_r)*i/n+(w-pad_l-pad_r)/n*0.2
        yv=Y(val); bh=h-pad_b-yv
        svg.append(f'<rect x="{x:.1f}" y="{yv:.1f}" width="{bw:.1f}" height="{bh:.1f}" fill="{color}" rx="3"/>')
        txt=f"{val:.0%}" if ypct else usd_m(val)
        svg.append(f'<text x="{x+bw/2:.1f}" y="{yv-6:.1f}" font-size="11" font-weight="600" fill="#1a2b4a" text-anchor="middle">{txt}</text>')
        svg.append(f'<text x="{x+bw/2:.1f}" y="{h-pad_b+16}" font-size="9.5" fill="#5b6b85" text-anchor="middle">{lab}</text>')
    if target is not None:
        ty=Y(target)
        svg.append(f'<line x1="{pad_l}" y1="{ty:.1f}" x2="{w-pad_r}" y2="{ty:.1f}" stroke="#e0533d" stroke-width="1.5" stroke-dasharray="5,3"/>')
        svg.append(f'<text x="{w-pad_r}" y="{ty-4:.1f}" font-size="9" fill="#e0533d" text-anchor="end">Target {target:.0%}</text>')
    svg.append('</svg>')
    return "\n".join(svg)

# ---- charts ----
# 1) portfolio over full life
full = [(r["age"], r["ret_bal"]) for r in CF+RET]
chart_port = line_chart(full, title="Projected Portfolio (Retirement Bucket) — Age 45 to 93",
                        phases=(55,"",""))
# 2) cash flow during work years (stacked-ish): income vs (tax+living+savings)
cf_items=[(str(r["age"]), r["gross"]) for r in CF]
chart_cf = bar_chart(cf_items, title="Household Gross Income by Age (Accumulation)", color="#3a7afe")
# 3) scenarios
sc_items=[(k.replace(" (age 53)","").replace(" (today$)",""), v) for k,v in SC.items()]
chart_sc = bar_chart(sc_items, title="Probability of Plan Success — Scenario Analysis", ypct=True, target=0.85, color="#1f9d6b")
# 4) estate tax exposure
est_items=[("Estate @ death\n(current law)", S["etax_2025"]),
           ("Estate @ death\n(TCJA sunset)", S["etax_sunset"]),
           ("Peak estate\n(current law)", S["etax_peak_2025"]),
           ("Peak estate\n(TCJA sunset)", S["etax_peak_sunset"])]
est_items2=[(a.replace("\n"," "), b) for a,b in est_items]
chart_est = bar_chart(est_items2, title="Projected Federal Estate Tax Exposure", color="#e0533d")

# ================= HTML =================
today = datetime.date.today().strftime("%B %d, %Y")
verdict = "STRONG" if S["mc_prob"]>=0.85 else ("MODERATE" if S["mc_prob"]>=0.70 else "WEAK")

def row(cells): return "<tr>"+"".join(f"<td>{c}</td>" for c in cells)+"</tr>"
def th(cells): return "<tr>"+"".join(f"<th>{c}</th>" for c in cells)+"</tr>"

cf_html = th(["Year","Age","Gross Inc.","Taxes","Living","401(k)","529","Brokerage","Net Save","Ret. Bal","529 Bal"])
for r in CF:
    cf_html+=row([r["year"],r["age"],usd(r["gross"]),usd(r["tax"]),usd(r["living"]),
                   usd(r["k401"]),usd(r["k529"]),usd(r["broker"]),
                   usd(r["k401"]+r["k529"]+r["broker"]),usd(r["ret_bal"]),usd(r["q_bal"])])
# retirement table (every 5 yrs + key)
ret_html = th(["Year","Age","Spending","Social Sec.","Withdraw","Portfolio Bal"])
for i,r in enumerate(RET):
    if i%5==0 or r["age"] in (62,90,93):
        ret_html+=row([r["year"],r["age"],usd(r["spend"]),usd(r["ss"]),usd(r["ret_withdraw"]),usd(r["ret_bal"])])
edu_html = th(["Year","Age","College Cost","From 529","From Brokerage","529 Bal","Ret. Bal"])
for r in EDU:
    edu_html+=row([r["year"],r["age"],usd(r["edu_cost"]),usd(r["from529"]),usd(r["fromBroker"]),usd(r["q_bal"]),usd(r["ret_bal"])])
sc_html = th(["Scenario","Success Prob.","Assessment"])
for k,v in SC.items():
    a="On track" if v>=0.85 else ("Watch" if v>=0.70 else "At risk")
    sc_html+=row([k,f"{v:.1%}",a])

html = f"""<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Comprehensive Financial Plan — Mr. Zhang (张先生)</title>
<style>
*{{box-sizing:border-box}}
body{{font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1f2a3d;margin:0;background:#f4f6fb;line-height:1.6}}
.wrap{{max-width:980px;margin:0 auto;background:#fff;padding:0 0 60px}}
.hero{{background:linear-gradient(135deg,#11305e,#2f6df6);color:#fff;padding:46px 48px 40px}}
.hero h1{{margin:0 0 6px;font-size:27px;font-weight:700}}
.hero .sub{{opacity:.92;font-size:14px}}
.hero .meta{{margin-top:18px;display:flex;gap:28px;flex-wrap:wrap;font-size:13px}}
.hero .meta div span{{display:block;opacity:.75;font-size:11px;text-transform:uppercase;letter-spacing:.5px}}
.hero .meta div b{{font-size:17px;font-weight:600}}
.content{{padding:0 48px}}
h2{{font-size:19px;color:#11305e;border-bottom:2px solid #e3e8f0;padding-bottom:8px;margin:38px 0 14px}}
h3{{font-size:15px;color:#2f6df6;margin:22px 0 8px}}
p{{font-size:14px;margin:8px 0}}
table{{width:100%;border-collapse:collapse;font-size:12.5px;margin:10px 0}}
th{{background:#f0f4fa;color:#11305e;text-align:right;padding:7px 9px;border-bottom:1px solid #dbe3ef;font-weight:600}}
td{{text-align:right;padding:6px 9px;border-bottom:1px solid #eef1f6}}
tr:nth-child(even) td{{background:#fafbfe}}
.cards{{display:flex;gap:14px;flex-wrap:wrap;margin:18px 0}}
.card{{flex:1;min-width:150px;background:#f7f9fd;border:1px solid #e3e8f0;border-radius:10px;padding:14px 16px}}
.card .lbl{{font-size:11px;text-transform:uppercase;letter-spacing:.4px;color:#7a869a}}
.card .val{{font-size:21px;font-weight:700;color:#11305e;margin-top:4px}}
.card.good .val{{color:#1f9d6b}}
.card.warn .val{{color:#e0533d}}
.note{{background:#eef4ff;border-left:4px solid #2f6df6;padding:12px 16px;border-radius:0 8px 8px 0;font-size:13px;margin:14px 0}}
.grid2{{display:grid;grid-template-columns:1fr 1fr;gap:20px}}
ul{{font-size:14px}} li{{margin:5px 0}}
.check{{font-size:14px;margin:8px 0;padding-left:26px;position:relative}}
.check:before{{content:"\\2610";position:absolute;left:0;color:#2f6df6;font-size:17px}}
.dis{{font-size:11.5px;color:#7a869a;margin-top:30px;border-top:1px solid #e3e8f0;padding-top:14px}}
.tag{{display:inline-block;background:#1f9d6b;color:#fff;font-size:11px;padding:2px 10px;border-radius:20px;font-weight:600}}
</style></head><body><div class="wrap">
<div class="hero"><h1>Comprehensive Financial Plan</h1>
<div class="sub">Client: <b>张先生 (Mr. Zhang)</b> &nbsp;·&nbsp; Prepared {today} &nbsp;·&nbsp; Financial Planning Engagement</div>
<div class="meta">
<div><span>Current Age</span><b>{S['age_p']}</b></div>
<div><span>Target Retirement</span><b>Age {S['retire_age']}</b></div>
<div><span>Household Income</span><b>{usd(S['gross'])}</b></div>
<div><span>Liquid Assets</span><b>{usd_m(S['liq'])}</b></div>
<div><span>Plan Strength</span><b><span class="tag">{verdict}</span></b></div>
</div></div>
<div class="content">

<h2>1. Executive Summary</h2>
<div class="cards">
<div class="card"><div class="lbl">Portfolio at 55</div><div class="val">{usd_m(S['ret_at_55'])}</div></div>
<div class="card good"><div class="lbl">Success Probability</div><div class="val">{S['mc_prob']:.0%}</div></div>
<div class="card"><div class="lbl">Recommended 529/yr</div><div class="val">{usd(S['req_k529'])}</div></div>
<div class="card warn"><div class="lbl">Estate Tax (sunset)</div><div class="val">{usd_m(S['etax_sunset'])}</div></div>
</div>
<p>Mr. Zhang, age 45, with a spouse (43) and two children (10 and 14), aims to retire at 55, fully fund both children's college educations, optimize taxes, and implement estate planning. With <b>{usd(S['gross'])}</b> household income and <b>{usd_m(S['liq'])}</b> in liquid assets, the family is in a strong position.</p>
<p>The base plan projects a retirement portfolio of <b>{usd_m(S['ret_at_55'])}</b> at age 55 and a <b>{S['mc_prob']:.0%}</b> probability of funding retirement through age {S['life_exp']} (target ≥85% ✓). The plan is sensitive to <b>retiring earlier than 55</b> or a <b>sharp market drop at retirement</b> (both fall to ~77%), so a 2–3 year cash buffer is recommended. Education is fully fundable via 529 contributions of <b>{usd(S['req_k529'])}/yr</b>. The most material planning gap is <b>estate tax</b>: if the TCJA exemption sunsets to ~$7M/person, projected estate tax rises to <b>{usd_m(S['etax_sunset'])}</b> — making annual gifting and trust structures essential.</p>

<h2>2. Client Profile & Assumptions</h2>
<div class="grid2">
<div><h3>Profile</h3><ul>
<li>Primary (张先生): age {S['age_p']}; Spouse: age {S['age_s']}</li>
<li>Children: {S['child1']} and {S['child2']} — college entry {S['c1']} &amp; {S['c2']}</li>
<li>Household income: {usd(S['gross'])}/yr (2% growth)</li>
<li>Liquid investable assets: {usd_m(S['liq'])}; Home equity: {usd_m(S['home_eq'])}</li>
<li>Risk profile: <b>Moderately conservative</b></li>
<li>Goals: retire at {S['retire_age']}, fund 2 college educations, estate plan</li>
</ul></div>
<div><h3>Modeling Assumptions</h3><ul>
<li>Inflation: 2.7%</li>
<li>Pre-retirement return: 5.5% nominal (blended)</li>
<li>Post-retirement return: 4.5% nominal</li>
<li>Effective tax on income: 30%</li>
<li>Working living expense: {usd(310000)}/yr (2.7% infl.)</li>
<li>Retirement spending: {usd(260000)}/yr (today's $)</li>
<li>Social Security (claim @62): {usd(85000)}/yr household, COLA 2.7%</li>
<li>Planning horizon: age {S['life_exp']} (spouse to 95 stressed)</li>
</ul></div>
</div>
<div class="note"><b>Assumption note:</b> This plan assumes U.S. taxpayer status (USD figures, 401(k)/529/SS/federal estate tax). If the family is tax-resident elsewhere, tax and account structures should be localized. All return/inflation assumptions are deliberately conservative for a moderately-conservative risk profile.</div>

<h2>3. Cash Flow & Accumulation (Age 45→54)</h2>
{chart_cf}
<p>The family saves roughly <b>{sav_rate:.0%} of gross income</b> annually — about {usd(savings_y0)}/yr directed to 401(k) ({usd(47000)}), 529 ({usd(S['req_k529'])}), and taxable brokerage. The portfolio compounds to <b>{usd_m(S['ret_at_55'])}</b> by age 55.</p>
<table>{cf_html}</table>

<h2>4. Retirement Plan</h2>
{chart_port}
<p>At 55 the portfolio stands at <b>{usd_m(S['ret_at_55'])}</b>. Because Social Security cannot start before 62, the first 7 retirement years (55–61) are funded entirely by the portfolio; SS then supplements spending from {ss_start} onward. The initial portfolio withdrawal rate is a conservative <b>{wd_rate:.1%}</b> of the balance.</p>
<table>{ret_html}</table>
<div class="note"><b>Social Security timing:</b> Claiming at 62 yields ~{usd(85000)}/yr; delaying to 67 would raise the benefit ~75%, and to 70 by ~95%. Given the portfolio's strength, the couple could <b>delay SS to 67–70</b> to maximize lifetime income and reduce sequence risk — a key lever.</div>

<h2>5. Education Funding</h2>
<p>Two children enter college in <b>{S['c1']}</b> (age-14 child) and <b>{S['c2']}</b> (age-10 child). At a private 4-year cost of ~{usd(92000)}/yr today (2.7% inflation), both educations are fully covered by contributing <b>{usd(S['req_k529'])}/yr</b> to 529 plans — keeping college entirely off the retirement portfolio and removing those assets from the taxable estate.</p>
<table>{edu_html}</table>

<h2>6. Tax Optimization</h2>
<ul>
<li><b>Max tax-deferred &amp; Roth:</b> Contribute {usd(47000)}/yr to 401(k)s; use <b>backdoor Roth IRA</b> ({usd(14000)}/yr) since income exceeds Roth eligibility.</li>
<li><b>Roth conversions (ages 55–61):</b> The 7 low-income years before SS are ideal to convert ~{usd(120000)}/yr from pre-tax to Roth, filling the 22–24% brackets. This cuts future RMDs and estate value.</li>
<li><b>Asset location:</b> Hold bonds in tax-deferred accounts, equities in taxable/Roth. Use <b>municipal bonds</b> for tax-free income in taxable.</li>
<li><b>Tax-loss harvesting:</b> Realize net capital losses in the brokerage (offset up to $3k ordinary + carryforward) to lower taxable gains.</li>
<li><b>529 state deduction:</b> If resident in a deduction state, capture the state income-tax benefit on 529 contributions.</li>
<li><b>Charitable:</b> After 73, use <b>Qualified Charitable Distributions</b> from IRAs and a <b>Donor-Advised Fund</b> for bunching.</li>
</ul>

<h2>7. Estate Planning</h2>
{chart_est}
<p>With the portfolio continuing to grow in retirement, the projected estate reaches <b>{usd_m(S['estate_death'])}</b> by age {S['life_exp']} (peak ~{usd_m(S['peak_estate'])}). Under current law the federal exemption (~{usd_m(13990000)}/person, portable to {usd_m(27980000)}/couple) leaves a modest <b>{usd_m(S['etax_2025'])}</b> tax. <b>However, if the TCJA exemption sunsets to ~$7M/person, estate tax jumps to {usd_m(S['etax_sunset'])}.</b></p>
<ul>
<li><b>Revocable Living Trust</b> — avoid probate, ensure seamless succession for spouse and children.</li>
<li><b>Annual gifting</b> — use the {usd(19000)}/donor/recipient exclusion now:张先生 + spouse → 2 children = up to {usd(76000)}/yr out of the estate.</li>
<li><b>529 as estate tool</b> — front-load (superfund 5-yr) up to {usd(95000)}/child; removes assets from estate while funding education.</li>
<li><b>Pour-over Will &amp; beneficiary review</b> — align retirement, 529, and insurance beneficiaries with the trust.</li>
<li><b>Life insurance</b> — consider a policy to cover any estate-tax liquidity need and income replacement; review term coverage for both spouses.</li>
<li><b>Long-term care</b> — evaluate LTC insurance or a dedicated funding reserve (the plan absorbs a $300k LTC event with minimal impact).</li>
</ul>

<h2>8. Scenario Analysis</h2>
{chart_sc}
<table>{sc_html}</table>
<p>The plan is robust in the base case and under longevity/LTC stress, but <b>retiring before 55 or a 20% market drop at retirement entry both push success below 85%</b>. Mitigation: maintain a 2–3 year cash/bond buffer entering retirement and avoid retirement-date sequence risk.</p>

<h2>9. Prioritized Action Items</h2>
<div class="check">Raise 529 contributions to <b>{usd(S['req_k529'])}/yr</b> to fully self-fund both children's educations.</div>
<div class="check">Maintain ~{sav_rate:.0%} savings rate; keep {usd(47000)}/yr in 401(k)s + backdoor Roth {usd(14000)}/yr.</div>
<div class="check">Build a 2–3 year cash/bond buffer before age 55 to absorb sequence risk.</div>
<div class="check">Execute Roth conversions of ~{usd(120000)}/yr during the low-income 55–61 window.</div>
<div class="check">Begin annual gifting ({usd(76000)}/yr) and 529 superfunding to shrink future estate tax.</div>
<div class="check">Establish a Revocable Living Trust + pour-over Will; review all beneficiaries.</div>
<div class="check">Evaluate LTC insurance and term life coverage for both spouses; consider delaying SS to 67–70.</div>
<div class="check">Re-run this plan annually or after any major life/financial event.</div>

<div class="dis">This document is a financial planning illustration based on stated assumptions and is provided for informational purposes only. It is not investment, tax, or legal advice. Figures are model projections subject to market, tax-law, and personal changes. Consult a fee-only CFP®, CPA, and estate attorney before acting. Monte Carlo uses 5,000 paths, normal returns (μ=4.5%, σ=8.5% post-retirement).</div>
</div></div></body></html>"""

with open(f"{OUT}/financial_plan.html","w") as f:
    f.write(html)

# ================= CSV =================
with open(f"{OUT}/cashflow.csv","w",newline="") as f:
    w=csv.writer(f)
    w.writerow(["Year","Age","Phase","GrossIncome","Taxes","Living","401k","529","Brokerage","NetSavings","SocialSecurity","CollegeCost","From529","FromBrokerage","RetirementBalance","Q529Balance"])
    for r in CF:
        w.writerow([r["year"],r["age"],"Work",r["gross"],r["tax"],r["living"],r["k401"],r["k529"],r["broker"],r["k401"]+r["k529"]+r["broker"],0,0,0,0,r["ret_bal"],r["q_bal"]])
    for r in RET:
        w.writerow([r["year"],r["age"],"Retire",0,0,0,0,0,0,0,r["ss"],r["spend"],0,0,r["ret_bal"],""])
    for r in EDU:
        pass  # education already reflected in balances; keep simple

print("HTML + CSV written.")

# ================= XLSX (minimal stdlib writer) =================
def esc(s):
    return (str(s).replace("&","&amp;").replace("<","&lt;").replace(">","&gt;")
            .replace('"',"&quot;"))
def col_letter(i):
    s=""; i+=1
    while i: 
        i,r=divmod(i-1,26); s=chr(65+r)+s
    return s
def sheet_xml(rows):
    out=['<?xml version="1.0" encoding="UTF-8" standalone="yes"?>']
    out.append('<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>')
    for ri,row in enumerate(rows,1):
        out.append(f'<row r="{ri}">')
        for ci,val in enumerate(row):
            ref=f"{col_letter(ci)}{ri}"
            if isinstance(val,(int,float)):
                out.append(f'<c r="{ref}"><v>{val}</v></c>')
            else:
                out.append(f'<c r="{ref}" t="inlineStr"><is><t xml:space="preserve">{esc(val)}</t></is></c>')
        out.append('</row>')
    out.append('</sheetData></worksheet>')
    return "".join(out)

sheets={}
# Summary
sum_rows=[["Comprehensive Financial Plan — Mr. Zhang (张先生)"],["Generated",today],[],
    ["Metric","Value"],
    ["Age (primary)",S["age_p"]],["Age (spouse)",S["age_s"]],
    ["Household income",S["gross"]],["Liquid assets",S["liq"]],["Home equity",S["home_eq"]],
    ["Retirement portfolio @55",S["ret_at_55"]],["529 balance @55",S["q_at_55"]],
    ["Required 529/yr",S["req_k529"]],["MC success probability",S["mc_prob"]],
    ["Estate @ death",S["estate_death"]],["Peak estate",S["peak_estate"]],
    ["Estate tax (current law)",S["etax_2025"]],["Estate tax (TCJA sunset)",S["etax_sunset"]]]
sheets["Summary"]=sum_rows
# CashFlow
cf_rows_x=[["Year","Age","Gross","Tax","Living","401k","529","Brokerage","NetSave","RetBal","QBal"]]
for r in CF:
    cf_rows_x.append([r["year"],r["age"],r["gross"],r["tax"],r["living"],r["k401"],r["k529"],r["broker"],r["k401"]+r["k529"]+r["broker"],r["ret_bal"],r["q_bal"]])
sheets["CashFlow"]=cf_rows_x
# Retirement
ret_rows_x=[["Year","Age","Spending","SocialSec","Withdraw","PortfolioBal"]]
for r in RET:
    ret_rows_x.append([r["year"],r["age"],r["spend"],r["ss"],r["ret_withdraw"],r["ret_bal"]])
sheets["Retirement"]=ret_rows_x
# Education
edu_rows_x=[["Year","Age","CollegeCost","From529","FromBroker","QBal","RetBal"]]
for r in EDU:
    edu_rows_x.append([r["year"],r["age"],r["edu_cost"],r["from529"],r["fromBroker"],r["q_bal"],r["ret_bal"]])
sheets["Education"]=edu_rows_x
# Estate
est_rows_x=[["Item","Value"],
    ["Estate @ death (current law)",S["estate_death"]],
    ["Estate @ death (sunset)",S["estate_death"]],
    ["Estate tax (current law)",S["etax_2025"]],
    ["Estate tax (sunset)",S["etax_sunset"]],
    ["Peak estate",S["peak_estate"]],
    ["Peak estate tax (current law)",S["etax_peak_2025"]],
    ["Peak estate tax (sunset)",S["etax_peak_sunset"]]]
sheets["Estate"]=est_rows_x
# Scenarios
sc_rows_x=[["Scenario","SuccessProb"]]+[[k,v] for k,v in SC.items()]
sheets["Scenarios"]=sc_rows_x

names=list(sheets.keys())
ct=['<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
     '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">',
     '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>',
     '<Default Extension="xml" ContentType="application/xml"/>',
     '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>']
for i in range(len(names)):
    ct.append(f'<Override PartName="/xl/worksheets/sheet{i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>')
ct.append('</Types>')
rels='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'
wb='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>'
for i,n in enumerate(names):
    wb+=f'<sheet name="{esc(n)}" sheetId="{i+1}" r:id="rId{i+1}"/>'
wb+='</sheets></workbook>'
wbrels='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
for i in range(len(names)):
    wbrels+=f'<Relationship Id="rId{i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet{i+1}.xml"/>'
wbrels+='</Relationships>'

with zipfile.ZipFile(f"{OUT}/financial_plan.xlsx","w",zipfile.ZIP_DEFLATED) as z:
    z.writestr("[Content_Types].xml","".join(ct))
    z.writestr("_rels/.rels",rels)
    z.writestr("xl/workbook.xml",wb)
    z.writestr("xl/_rels/workbook.xml.rels",wbrels)
    for i,(n,rows) in enumerate(sheets.items()):
        z.writestr(f"xl/worksheets/sheet{i+1}.xml", sheet_xml(rows))
print("XLSX written.")
print("DONE")

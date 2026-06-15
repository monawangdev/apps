import type { ProductApp } from '../content/apps';
import type { Locale } from '../content/i18n';
import { localePath, supportEmail } from '../content/i18n';

const siteUrl = 'https://monawangdev.github.io/apps';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Safari Format Apps',
    url: siteUrl,
    email: supportEmail,
  };
}

export function softwareJsonLd(app: ProductApp, locale: Locale) {
  const copy = app.copy[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: copy.name,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS, Safari',
    description: copy.description,
    url: `${siteUrl}${localePath(locale, `apps/${app.id}/`)}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

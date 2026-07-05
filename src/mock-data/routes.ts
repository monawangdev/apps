import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const mockTypes = ['json', 'xml', 'yaml', 'css'] as const;

export type MockType = (typeof mockTypes)[number];

type BodyKind = 'file' | 'inline' | 'json';

type MockRoute = {
  route: string;
  source?: string;
  body?: string;
  value?: unknown;
  kind: BodyKind;
};

export type MockIndexEntry = {
  route: string;
  contentType: string;
  url: string;
  plainTextUrl?: string;
  yamlUrl?: string;
};

const TYPE_CONFIG: Record<MockType, { contentType: string; extension: string }> = {
  json: { contentType: 'application/json; charset=utf-8', extension: 'json' },
  xml: { contentType: 'application/xml; charset=utf-8', extension: 'xml' },
  yaml: { contentType: 'text/html; charset=utf-8', extension: 'html' },
  css: { contentType: 'text/css; charset=utf-8', extension: 'css' },
};

const PUBLIC_BASE_PATH = '/apps';

const JSON_BAD_CASES = {
  'trailing-comma': '{"name": "Alice", "age": 30,}',
  'single-quotes': "{'name': 'Alice', 'age': 30}",
  'unquoted-keys': '{name: "Alice", age: 30}',
  'missing-colon': '{"name" "Alice", "age": 30}',
  'unclosed-object': '{"name": "Alice", "items": [1, 2, 3}',
  'unclosed-array': '{"items": [1, 2, 3}',
  'extra-comma-array': '{"items": [1, 2, 3,]}',
  'bare-value': 'hello world',
  comment: '{"name": "Alice" /* admin */, "age": 30}',
  'undefined-value': '{"value": undefined}',
  'nan-value': '{"score": NaN}',
  'infinity-value': '{"limit": Infinity}',
  truncated: '{"name": "Alice", "address": {"city": "New York", "zip":',
  'duplicate-keys': '{"id": 1, "id": 2, "name": "Alice"}',
  'mixed-quotes': '{"name": \'Alice\', "age": 30}',
  'newline-in-string': '{"text": "line1\nline2"}',
  bom: '\uFEFF{"name": "Alice"}',
  empty: '',
  'whitespace-only': '   \n\t  ',
  'html-response': '<!DOCTYPE html><html><body>Not Found</body></html>',
  'partial-escape': '{"text": "bad escape \\q here"}',
} as const;

const YAML_BAD_CASES = {
  'wrong-indent': `name: Alice\n  age: 30\n  city: NYC`,
  'tab-indent': `name: Alice\n\tage: 30\n\tcity: NYC`,
  'unclosed-quote': `name: "Alice\nage: 30`,
  'invalid-anchor': `&invalid anchor\ntest: *nonexistent`,
  'duplicate-key': `name: Alice\nname: Bob`,
  'invalid-merge': `<<: not_an_anchor\ntest: value`,
  'trailing-colon': `name:\ntest: value`,
  'invalid-flow': `{name: Alice, age:}`,
  'empty-document': ``,
  'whitespace-only': `   \n\t  `,
  'invalid-tag': `!!invalidtag value`,
  'mixed-indent': `parent:\n  child1: value1\n    child2: value2`,
} as const;

const CSS_BAD_CASES = {
  'missing-brace': `.card {
  padding: 16px;
  background: #1a1a1a;
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.4rem;
  background: linear-gradient(135deg, #22c55e, #0f766e);
  color: white;
`,
  'invalid-property': `.hero {
  background-color: #0f172a;
  padding: 60px 30px;
  font-weigth: 700;
  color: #f8fafc;
}
`,
  'unterminated-string': `.alert {
  content: "Warning: unsaved changes;
  border-left: 4px solid #facc15;
  background: #111827;
}
`,
  'missing-semicolon': `.badge {
  display: inline-block
  padding: 0.2rem 0.6rem;
  background: #2563eb;
  color: #fff;
}
`,
  empty: '',
} as const;

const jsonRoutes: MockRoute[] = [
  file('small', 'small.json'),
  file('small/html', 'small/html.json'),
  file('small/link', 'small/link.json'),
  file('small/html-link', 'small/html-link.json'),
  file('small/array', 'small/array.json'),
  file('small/array/html', 'small/array/html.json'),
  file('small/array/link', 'small/array/link.json'),
  file('small/array/html-link', 'small/array/html-link.json'),
  file('small/timestamp', 'small/timestamp.json'),
  file('full/nested', 'fixtures/nested.json'),
  file('full/array-values-nested', 'fixtures/array_values_nested.json'),
  file('full/emoji', 'fixtures/emoji.json'),
  file('full/edge-cases', 'fixtures/edge_cases.json'),
  file('full/kitchen-sink', 'fixtures/kitchen_sink.json'),
  file('full/real-world-types', 'fixtures/real_world_types.json'),
  file('full/big-numbers', 'fixtures/big_numbers.json'),
  file('full/long-strings-many-keys', 'fixtures/long_strings_many_keys.json'),
  file('full/image-links', 'fixtures/image_links.json'),
  file('full/media-links', 'fixtures/media_links.json'),
  file('full/color-values', 'fixtures/color_values.json'),
  file('full/single-prop-item', 'fixtures/single_prop_item.json'),
  file('full/simple-object', 'fixtures/simple_object.json'),
  json('full/mock', {
    user: { id: 1, name: 'Alice', email: 'alice@example.com', active: true },
    tags: ['admin', 'editor'],
    meta: { version: '1.0.0' },
  }),
  inline('full/bad-json', JSON_BAD_CASES['trailing-comma']),
  json('full/bad-json/variants', variantList('json', 'full/bad-json', Object.keys(JSON_BAD_CASES))),
  ...Object.entries(JSON_BAD_CASES).map(([name, body]) => inline(`full/bad-json/${name}`, body)),
];

const xmlRoutes: MockRoute[] = [
  file('10kb', '10kb.xml'),
  file('small', 'small.xml'),
  file('small/html', 'small-html.xml'),
  file('small/link', 'small-links.xml'),
  file('small/timestamp', 'small-timestamps.xml'),
  file('small/array', 'fixture-array.xml'),
  file('nested', 'fixture-nested.xml'),
  file('emoji', 'fixture-emoji.xml'),
  file('edge-cases', 'fixture-edge-cases.xml'),
  file('kitchen-sink', 'fixture-kitchen-sink.xml'),
  file('big-numbers', 'fixture-big-numbers.xml'),
  file('image-links', 'fixture-images.xml'),
  file('media-links', 'fixture-media.xml'),
  file('color-values', 'fixture-colors.xml'),
  file('mock', 'mock.xml'),
];

const yamlRoutes: MockRoute[] = [
  file('small', 'small.yaml'),
  file('small/flow', 'small/flow.yaml'),
  file('small/anchors', 'small/anchors.yaml'),
  file('small/multi-doc', 'small/multi-doc.yaml'),
  file('full/nested', 'fixtures/nested.yaml'),
  file('full/anchors-aliases', 'fixtures/anchors_aliases.yaml'),
  file('full/multi-document', 'fixtures/multi_document.yaml'),
  file('full/flow-style', 'fixtures/flow_style.yaml'),
  file('full/kitchen-sink', 'fixtures/kitchen_sink.yaml'),
  file('full/edge-cases', 'fixtures/edge_cases.yaml'),
  file('full/long-strings', 'fixtures/long_strings.yaml'),
  file('full/emoji', 'fixtures/emoji.yaml'),
  file('full/config-files', 'fixtures/config_files.yaml'),
  file('full/big-numbers', 'fixtures/big_numbers.yaml'),
  file('full/media-links', 'fixtures/media-links.yaml'),
  file('full/color-values', 'fixtures/color-values.yaml'),
  file('full/timestamps', 'fixtures/timestamps.yaml'),
  file('full/comments', 'fixtures/comments.yaml'),
  file('full/yaml-spec-types', 'fixtures/yaml_spec_types.yaml'),
  inline('full/mock', `user:
  id: 1
  name: Alice
  email: alice@example.com
  active: true
tags:
  - admin
  - editor
meta:
  version: "1.0.0"`),
  inline('full/bad-yaml', YAML_BAD_CASES['wrong-indent']),
  json('full/bad-yaml/variants', variantList('yaml', 'full/bad-yaml', Object.keys(YAML_BAD_CASES))),
  ...Object.entries(YAML_BAD_CASES).map(([name, body]) => inline(`full/bad-yaml/${name}`, body)),
];

const cssRoutes: MockRoute[] = [
  file('small', 'small.css'),
  file('less', 'less.less'),
  file('scss', 'scss.scss'),
  file('sass', 'sass.sass'),
  file('full/dark-theme', 'fixtures/dark_theme.css'),
  file('full/complex-selectors', 'fixtures/complex_selectors.css'),
  file('full/legacy', 'fixtures/legacy.css'),
  inline('full/mock', `.card {
  padding: 16px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.card__body {
  margin-top: 8px;
  color: #6b7280;
  line-height: 1.5;
}`),
  inline('full/bad-css', CSS_BAD_CASES['missing-brace']),
  json('full/bad-css/variants', variantList('css', 'full/bad-css', Object.keys(CSS_BAD_CASES))),
  ...Object.entries(CSS_BAD_CASES).map(([name, body]) => inline(`full/bad-css/${name}`, body)),
];

const ROUTES: Record<MockType, MockRoute[]> = {
  json: jsonRoutes,
  xml: xmlRoutes,
  yaml: yamlRoutes,
  css: cssRoutes,
};

const ROUTE_LOOKUP: Record<MockType, Map<string, MockRoute>> = {
  json: toLookup(jsonRoutes),
  xml: toLookup(xmlRoutes),
  yaml: toLookup(yamlRoutes),
  css: toLookup(cssRoutes),
};

function file(route: string, source: string): MockRoute {
  return { route, source, kind: 'file' };
}

function inline(route: string, body: string): MockRoute {
  return { route, body, kind: 'inline' };
}

function json(route: string, value: unknown): MockRoute {
  return { route, value, kind: 'json' };
}

function toLookup(routes: MockRoute[]): Map<string, MockRoute> {
  return new Map(routes.map((route) => [route.route, route]));
}

function variantList(type: MockType, baseRoute: string, variants: string[]) {
  const extension = TYPE_CONFIG[type].extension;
  return variants.map((variant) => ({
    variant,
    url: `${PUBLIC_BASE_PATH}/api/mock/${type}/${baseRoute}/${variant}.${extension}`,
  }));
}

function isMockType(value: string | undefined): value is MockType {
  return mockTypes.includes(value as MockType);
}

function readDataFile(type: MockType, source: string): string {
  return readFileSync(join(process.cwd(), 'src', 'mock-data', type, source), 'utf8');
}

function getBody(type: MockType, route: MockRoute): string {
  if (route.kind === 'file' && route.source) {
    return readDataFile(type, route.source);
  }

  if (route.kind === 'json') {
    return JSON.stringify(route.value, null, 2);
  }

  return route.body ?? '';
}

export function getMockRoutes(type: MockType): string[] {
  return ROUTES[type].map(({ route }) => route);
}

export function getMockContentType(type: MockType): string {
  return TYPE_CONFIG[type].contentType;
}

export function getMockStaticPaths(type: MockType) {
  return getMockRoutes(type).map((path) => ({ params: { path } }));
}

export function getAllMockStaticPaths() {
  return mockTypes.flatMap((type) => getMockRoutes(type).map((path) => ({ params: { type, path } })));
}

export function getMockIndex() {
  return Object.fromEntries(
    mockTypes.map((type) => [type, getMockIndexEntries(type)]),
  ) as Record<MockType, MockIndexEntry[]>;
}

export function getMockIndexEntries(type: MockType): MockIndexEntry[] {
  return getMockRoutes(type).map((route) => ({
    route,
    contentType: getMockContentType(type),
    url: `${PUBLIC_BASE_PATH}/api/mock/${type}/${route}.${TYPE_CONFIG[type].extension}`,
    ...(type === 'yaml'
      ? {
          plainTextUrl: `${PUBLIC_BASE_PATH}/api/mock/${type}/${route}.txt`,
          yamlUrl: `${PUBLIC_BASE_PATH}/api/mock/${type}/${route}.yaml`,
        }
      : {}),
  }));
}

export function createMockResponse(type: string | undefined, path: string | undefined): Response {
  if (!isMockType(type) || !path) {
    return new Response('Not found', { status: 404 });
  }

  const route = ROUTE_LOOKUP[type].get(path);
  if (!route) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(getBody(type, route), {
    status: 200,
    headers: {
      'Content-Type': getMockContentType(type),
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

export function createMockTextResponse(type: string | undefined, path: string | undefined): Response {
  if (!isMockType(type) || !path) {
    return new Response('Not found', { status: 404 });
  }

  const route = ROUTE_LOOKUP[type].get(path);
  if (!route) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(getBody(type, route), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

export function createMockHtmlResponse(type: string | undefined, path: string | undefined): Response {
  if (!isMockType(type) || !path) {
    return new Response('Not found', { status: 404 });
  }

  const route = ROUTE_LOOKUP[type].get(path);
  if (!route) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(getBody(type, route), {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

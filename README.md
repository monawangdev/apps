# Apps site

## Mock data

Migrated mock datasets live in `src/mock-data` and build into static Astro endpoints under `/api/mock`.

- Route index: `/apps/api/mock/index.json`
- JSON: `/apps/api/mock/json/<route>.json` (`application/json`)
- XML: `/apps/api/mock/xml/<route>.xml` (`text/xml` on static preview/hosts by extension)
- YAML: `/apps/api/mock/yaml/<route>.yaml` (`text/yaml`)
- CSS: `/apps/api/mock/css/<route>.css` (`text/css`)

Examples:

- `/apps/api/mock/json/small.json`
- `/apps/api/mock/json/full/bad-json/trailing-comma.json`
- `/apps/api/mock/xml/small.xml`
- `/apps/api/mock/yaml/full/kitchen-sink.yaml`
- `/apps/api/mock/css/full/dark-theme.css`

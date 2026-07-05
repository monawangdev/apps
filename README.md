# Apps site

## Mock data

Migrated mock datasets live in `src/mock-data` and build into static Astro endpoints under `/api/mock`.

- Route index: `/apps/api/mock/index.json`
- Type index pages: `/apps/api/mock/json/`, `/apps/api/mock/xml/`, `/apps/api/mock/yaml/`, `/apps/api/mock/css/`
- JSON: `/apps/api/mock/json/<route>.json` (`application/json`)
- XML: `/apps/api/mock/xml/<route>.xml` (`text/xml` on static preview/hosts by extension)
- YAML: `/apps/api/mock/yaml/<route>.html` (`text/html`)
- YAML plain text: `/apps/api/mock/yaml/<route>.txt` (`text/plain`, useful for iOS Safari)
- YAML legacy extension: `/apps/api/mock/yaml/<route>.yaml` (GitHub Pages may serve this as `text/yaml`)
- CSS: `/apps/api/mock/css/<route>.css` (`text/css`)

Examples:

- `/apps/api/mock/json/small.json`
- `/apps/api/mock/json/full/bad-json/trailing-comma.json`
- `/apps/api/mock/xml/small.xml`
- `/apps/api/mock/yaml/full/kitchen-sink.html`
- `/apps/api/mock/yaml/full/kitchen-sink.txt`
- `/apps/api/mock/yaml/full/kitchen-sink.yaml`
- `/apps/api/mock/css/full/dark-theme.css`

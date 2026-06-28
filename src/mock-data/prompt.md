apps 这个目录是使用github action来进行部署的产品介绍网站，需要在这个站点上生成所有app的介绍以及相关的隐私声明，联系方式
1. 首先要设计合理的站点结构，保证结构清晰
2. 提炼每个App的核心功能，形成产品站点描述，以标题+描述的方式来组织， 我会根据标题和描述来提供后续的产品截图，站点生成时先试用占位符即可，产品logo从/Users/hanmanjun/dev/safari-format-extension/xcode目录下对应的App里去获取，/Users/hanmanjun/dev/apps/raw-assets里有Apple download的icon
2. 网站要适配多主题，支持亮色和暗色
3. 要SEO友好，/Users/hanmanjun/dev/claude-seo/skills 里包含了一些skills可以参考
4. 设计上使用目录下的DESIGN.md来设计
5. 支持多语言，默认语言使用英文,此外需要支持中文简体，中文繁体，日语，韩语
6. 参考网站：https://www.raycast.com/，https://cocoapps.fr/better-json，https://getnoir.app/，https://pstan.fr/
7. 如果有哪些是我没有考虑到的，可以帮我补充
8. 技术上使用合理高效的技术即可


除了static.yml这种静态的方式，github是否支持其它支持构建的github action，如果有的话，帮我列举一下

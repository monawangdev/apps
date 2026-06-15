import type { Locale } from './i18n';

export const appIds = ['json', 'css', 'xml', 'html', 'javascript', 'yaml'] as const;
export type AppId = typeof appIds[number];

type LocalizedAppCopy = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  screenshotTitle: string;
  screenshotDescription: string;
  features: string[];
};

type ShowcaseItem = {
  title: string;
  description: string;
  image: string;
};

export type ProductApp = {
  id: AppId;
  category: 'Browser Extension' | 'Developer Tool' | 'Productivity';
  platforms: string[];
  accent: string;
  icon: string;
  screenshot: string;
  storeUrl: string;
  permissions: string[];
  copy: Record<Locale, LocalizedAppCopy>;
  showcase?: Record<Locale, ShowcaseItem[]>;
};

const sharedPermissions = [
  'storage: saves viewer settings locally',
  'tabs: coordinates page reload and viewer state',
  'contextMenus: exposes quick viewer actions',
  'all URLs: detects matching response pages in Safari',
];

export const apps: ProductApp[] = [
  {
    id: 'json',
    category: 'Browser Extension',
    platforms: ['Safari', 'macOS', 'iPadOS', 'iOS'],
    accent: '#0066cc',
    icon: 'json.png',
    screenshot: 'json/graph-view.png',
    storeUrl: '#download-pending',
    permissions: sharedPermissions,
    copy: {
      en: {
        name: 'JSON Prettify',
        shortName: 'JSON',
        tagline: 'Inspect JSON like a native data workspace.',
        description: 'JSON Prettify turns raw API responses into a fast, readable workspace with tree, graph, raw, and stringify views. Use JSONPath, search, color previews, collapse controls, copy, and download without sending content to any server.',
        screenshotTitle: 'Tree, graph, JSONPath, search.',
        screenshotDescription: 'Real JSON Prettify screens showing structured data, product records, graph navigation, and JSON data types.',
        features: ['Tree view for large nested API responses', 'Graph view for exploring object relationships', 'JSONPath filter with copyable paths', 'Search, collapse, copy, and download actions', 'Type-aware rendering for booleans, nulls, numbers, colors, dates, URLs, and media-like values'],
      },
      'zh-Hans': {
        name: 'JSON Prettify',
        shortName: 'JSON',
        tagline: '在不丢失结构的情况下探索 JSON。',
        description: '用树形、原始、图形和字符串化视图检查 JSON/JSONP 响应。支持 JSONPath 过滤、深度搜索、折叠分支、复制和下载。',
        screenshotTitle: '树形、图形、JSONPath、搜索。',
        screenshotDescription: '用于 JSON 响应主视图的截图位置。',
        features: ['虚拟树形视图', '原始、图形、字符串化模式', 'JSONPath 过滤', '上下条文本搜索', '复制与下载'],
      },
      'zh-Hant': {
        name: 'JSON Prettify',
        shortName: 'JSON',
        tagline: '在不失去結構的情況下探索 JSON。',
        description: '用樹狀、原始、圖形與字串化視圖檢查 JSON/JSONP 回應。支援 JSONPath 過濾、深度搜尋、折疊分支、複製與下載。',
        screenshotTitle: '樹狀、圖形、JSONPath、搜尋。',
        screenshotDescription: 'JSON 回應主視圖的截圖位置。',
        features: ['虛擬樹狀視圖', '原始、圖形、字串化模式', 'JSONPath 過濾', '上下筆文字搜尋', '複製與下載'],
      },
      ja: {
        name: 'JSON Prettify',
        shortName: 'JSON',
        tagline: '構造を保ったまま JSON を探索。',
        description: 'JSON/JSONP レスポンスをツリー、Raw、グラフ、文字列化ビューで確認できます。JSONPath、検索、折りたたみ、コピー、ダウンロードに対応します。',
        screenshotTitle: 'ツリー、グラフ、JSONPath、検索。',
        screenshotDescription: 'JSON ビューアの主スクリーンショット枠です。',
        features: ['仮想ツリービュー', 'Raw、グラフ、文字列化モード', 'JSONPath フィルター', '前後移動つき検索', 'コピーとダウンロード'],
      },
      ko: {
        name: 'JSON Prettify',
        shortName: 'JSON',
        tagline: '구조를 잃지 않고 JSON 탐색.',
        description: 'JSON/JSONP 응답을 트리, 원본, 그래프, 문자열 보기로 확인합니다. JSONPath, 검색, 접기, 복사, 다운로드를 지원합니다.',
        screenshotTitle: '트리, 그래프, JSONPath, 검색.',
        screenshotDescription: 'JSON 응답 뷰어용 주요 스크린샷 자리입니다.',
        features: ['가상 트리 보기', '원본, 그래프, 문자열 모드', 'JSONPath 필터', '이전/다음 검색', '복사 및 다운로드'],
      },
    },
    showcase: {
      en: [
        {
          title: 'Understand product data at a glance',
          description: 'Formatted tree view keeps product records, inventory counts, launch dates, prices, tags, nulls, and booleans readable on one screen.',
          image: 'json/tree-view.png',
        },
        {
          title: 'Map nested objects visually',
          description: 'Graph view turns large JSON objects into connected nodes, so you can scan relationships without losing the root structure.',
          image: 'json/graph-view.png',
        },
        {
          title: 'See every JSON type clearly',
          description: 'Strings, numbers, booleans, nulls, arrays, objects, colors, timestamps, URLs, and media references get distinct, practical presentation.',
          image: 'json/data-types.png',
        },
        {
          title: 'Copy paths while browsing',
          description: 'JSONPath hints make it easy to inspect nested arrays, copy a useful path, then return to the exact field you were reading.',
          image: 'json/jsonpath-ipad.png',
        },
      ],
      'zh-Hans': [
        {
          title: '一屏看懂产品数据',
          description: '树形视图让商品记录、库存、发布日期、价格、标签、null 和布尔值保持清晰。',
          image: 'json/tree-view.png',
        },
        {
          title: '用图形视图理解嵌套结构',
          description: '图形视图把大型 JSON 对象转成节点关系，方便快速扫描根对象与子对象。',
          image: 'json/graph-view.png',
        },
        {
          title: '清楚显示所有 JSON 类型',
          description: '字符串、数字、布尔值、null、数组、对象、颜色、时间、URL 和媒体引用都有明确呈现。',
          image: 'json/data-types.png',
        },
        {
          title: '浏览时复制 JSONPath',
          description: '路径提示帮助你定位嵌套数组，复制有用路径，再回到正在阅读的字段。',
          image: 'json/jsonpath-ipad.png',
        },
      ],
      'zh-Hant': [
        {
          title: '一屏看懂產品資料',
          description: '樹狀視圖讓商品記錄、庫存、發布日期、價格、標籤、null 與布林值保持清晰。',
          image: 'json/tree-view.png',
        },
        {
          title: '用圖形視圖理解巢狀結構',
          description: '圖形視圖把大型 JSON 物件轉成節點關係，方便快速掃描根物件與子物件。',
          image: 'json/graph-view.png',
        },
        {
          title: '清楚顯示所有 JSON 類型',
          description: '字串、數字、布林值、null、陣列、物件、顏色、時間、URL 與媒體引用都有明確呈現。',
          image: 'json/data-types.png',
        },
        {
          title: '瀏覽時複製 JSONPath',
          description: '路徑提示協助定位巢狀陣列，複製有用路徑，再回到正在閱讀的欄位。',
          image: 'json/jsonpath-ipad.png',
        },
      ],
      ja: [
        {
          title: '商品データを一画面で把握',
          description: 'ツリー表示で商品情報、在庫、発売日、価格、タグ、null、真偽値を読みやすく保ちます。',
          image: 'json/tree-view.png',
        },
        {
          title: 'ネスト構造をグラフで確認',
          description: 'グラフ表示は大きな JSON オブジェクトをノード関係に変換し、全体像を素早く追えます。',
          image: 'json/graph-view.png',
        },
        {
          title: 'JSON 型を明確に表示',
          description: '文字列、数値、真偽値、null、配列、オブジェクト、色、日時、URL、メディア参照を見分けやすく表示します。',
          image: 'json/data-types.png',
        },
        {
          title: '閲覧しながら JSONPath をコピー',
          description: 'パスヒントでネスト配列を確認し、必要な JSONPath をコピーできます。',
          image: 'json/jsonpath-ipad.png',
        },
      ],
      ko: [
        {
          title: '제품 데이터를 한 화면에서 파악',
          description: '트리 보기는 제품 정보, 재고, 출시일, 가격, 태그, null, 불리언 값을 읽기 쉽게 보여 줍니다.',
          image: 'json/tree-view.png',
        },
        {
          title: '중첩 구조를 그래프로 탐색',
          description: '그래프 보기는 큰 JSON 객체를 연결된 노드로 바꿔 루트와 하위 객체 관계를 빠르게 확인하게 합니다.',
          image: 'json/graph-view.png',
        },
        {
          title: '모든 JSON 타입을 명확하게 표시',
          description: '문자열, 숫자, 불리언, null, 배열, 객체, 색상, 날짜, URL, 미디어 참조를 구분해서 보여 줍니다.',
          image: 'json/data-types.png',
        },
        {
          title: '탐색 중 JSONPath 복사',
          description: '경로 힌트로 중첩 배열을 확인하고 필요한 JSONPath를 바로 복사할 수 있습니다.',
          image: 'json/jsonpath-ipad.png',
        },
      ],
    },
  },
  {
    id: 'css',
    category: 'Browser Extension',
    platforms: ['Safari', 'macOS'],
    accent: '#2b7fff',
    icon: 'css.png',
    screenshot: 'css-placeholder.svg',
    storeUrl: '#download-pending',
    permissions: sharedPermissions,
    copy: {
      en: {
        name: 'CSS Prettify',
        shortName: 'CSS',
        tagline: 'Read stylesheets like source code again.',
        description: 'Turn CSS responses into a clean reader with pretty and raw modes, line numbers, color swatches, themes, copy, download, and keyboard shortcuts.',
        screenshotTitle: 'Readable CSS with color awareness.',
        screenshotDescription: 'A screenshot slot for stylesheet formatting and swatches.',
        features: ['Pretty and raw views', 'Line number toggle', 'Color swatch previews', 'Theme and font controls', 'Copy and download'],
      },
      'zh-Hans': {
        name: 'CSS Prettify',
        shortName: 'CSS',
        tagline: '让样式表重新像源码一样可读。',
        description: '将 CSS 响应变成清晰阅读器，支持美化/原始模式、行号、颜色预览、主题、复制、下载和快捷键。',
        screenshotTitle: '可读 CSS 与颜色识别。',
        screenshotDescription: '用于样式表格式化和颜色预览的截图位置。',
        features: ['美化与原始视图', '行号开关', '颜色色块预览', '主题与字体控制', '复制与下载'],
      },
      'zh-Hant': {
        name: 'CSS Prettify',
        shortName: 'CSS',
        tagline: '讓樣式表重新像原始碼一樣可讀。',
        description: '將 CSS 回應變成清晰閱讀器，支援美化/原始模式、行號、顏色預覽、主題、複製、下載與快捷鍵。',
        screenshotTitle: '可讀 CSS 與顏色辨識。',
        screenshotDescription: '樣式表格式化與顏色預覽的截圖位置。',
        features: ['美化與原始視圖', '行號開關', '顏色色塊預覽', '主題與字體控制', '複製與下載'],
      },
      ja: {
        name: 'CSS Prettify',
        shortName: 'CSS',
        tagline: 'スタイルシートを再び読みやすく。',
        description: 'CSS レスポンスを読みやすいビューアに変換します。Pretty/Raw、行番号、色スウォッチ、テーマ、コピー、ダウンロード、ショートカットに対応します。',
        screenshotTitle: '色も見える読みやすい CSS。',
        screenshotDescription: 'CSS 整形と色スウォッチ用のスクリーンショット枠です。',
        features: ['Pretty と Raw', '行番号切り替え', '色スウォッチ表示', 'テーマとフォント設定', 'コピーとダウンロード'],
      },
      ko: {
        name: 'CSS Prettify',
        shortName: 'CSS',
        tagline: '스타일시트를 다시 소스처럼 읽기 쉽게.',
        description: 'CSS 응답을 보기 좋은 리더로 바꾸고, pretty/raw 모드, 줄 번호, 색상 미리보기, 테마, 복사, 다운로드, 단축키를 제공합니다.',
        screenshotTitle: '색상을 알아보는 읽기 쉬운 CSS.',
        screenshotDescription: 'CSS 포맷팅과 색상 미리보기용 스크린샷 자리입니다.',
        features: ['Pretty 및 원본 보기', '줄 번호 토글', '색상 스와치 미리보기', '테마와 글꼴 설정', '복사 및 다운로드'],
      },
    },
  },
  {
    id: 'xml',
    category: 'Browser Extension',
    platforms: ['Safari', 'macOS'],
    accent: '#0b7285',
    icon: 'xml.png',
    screenshot: 'xml-placeholder.svg',
    storeUrl: '#download-pending',
    permissions: [...sharedPermissions, 'host permission: lets XML viewer fetch same-page XML safely when needed'],
    copy: {
      en: {
        name: 'XML Prettify',
        shortName: 'XML',
        tagline: 'Navigate XML with structure and confidence.',
        description: 'Inspect XML-like responses with tree, raw, and graph modes. XPath search, semantic node visibility, and parse-warning fallback keep large documents readable.',
        screenshotTitle: 'XML tree, XPath, graph.',
        screenshotDescription: 'A screenshot slot for XML structure navigation.',
        features: ['Pretty, raw, and graph modes', 'XPath search and highlights', 'Element and attribute visibility', 'Readable parse fallback', 'Copy and download'],
      },
      'zh-Hans': {
        name: 'XML Prettify',
        shortName: 'XML',
        tagline: '有结构、有信心地浏览 XML。',
        description: '用树形、原始和图形模式检查 XML 类响应。XPath 搜索、语义节点显示和解析警告回退让大型文档保持可读。',
        screenshotTitle: 'XML 树、XPath、图形。',
        screenshotDescription: '用于 XML 结构导航的截图位置。',
        features: ['美化、原始、图形模式', 'XPath 搜索高亮', '元素和属性可见', '解析回退仍可读', '复制与下载'],
      },
      'zh-Hant': {
        name: 'XML Prettify',
        shortName: 'XML',
        tagline: '有結構、有信心地瀏覽 XML。',
        description: '用樹狀、原始與圖形模式檢查 XML 類回應。XPath 搜尋、語意節點顯示與解析警告回退讓大型文件保持可讀。',
        screenshotTitle: 'XML 樹狀、XPath、圖形。',
        screenshotDescription: 'XML 結構導覽的截圖位置。',
        features: ['美化、原始、圖形模式', 'XPath 搜尋高亮', '元素與屬性可見', '解析回退仍可讀', '複製與下載'],
      },
      ja: {
        name: 'XML Prettify',
        shortName: 'XML',
        tagline: '構造を保って XML を移動。',
        description: 'XML 系レスポンスをツリー、Raw、グラフで確認できます。XPath 検索、ノード表示、解析警告時のフォールバックで大きな文書も読みやすく保ちます。',
        screenshotTitle: 'XML ツリー、XPath、グラフ。',
        screenshotDescription: 'XML 構造ナビゲーション用のスクリーンショット枠です。',
        features: ['Pretty、Raw、グラフ', 'XPath 検索とハイライト', '要素と属性の表示', '読みやすい解析フォールバック', 'コピーとダウンロード'],
      },
      ko: {
        name: 'XML Prettify',
        shortName: 'XML',
        tagline: '구조를 보며 XML 탐색.',
        description: 'XML 응답을 트리, 원본, 그래프 모드로 확인합니다. XPath 검색, 의미 있는 노드 표시, 파싱 경고 대체 렌더링으로 큰 문서도 읽기 좋게 유지합니다.',
        screenshotTitle: 'XML 트리, XPath, 그래프.',
        screenshotDescription: 'XML 구조 탐색용 스크린샷 자리입니다.',
        features: ['Pretty, 원본, 그래프 모드', 'XPath 검색과 하이라이트', '요소와 속성 표시', '읽기 쉬운 파싱 대체 화면', '복사 및 다운로드'],
      },
    },
  },
  {
    id: 'html',
    category: 'Browser Extension',
    platforms: ['Safari', 'macOS'],
    accent: '#d9480f',
    icon: 'html.png',
    screenshot: 'html-placeholder.svg',
    storeUrl: '#download-pending',
    permissions: sharedPermissions,
    copy: {
      en: {
        name: 'HTML Prettify',
        shortName: 'HTML',
        tagline: 'View page source in a clean reader.',
        description: 'Capture rendered page source from the context menu or open raw HTML files, then search, format, copy, download, and switch themes in a focused Safari viewer.',
        screenshotTitle: 'Page source, formatted.',
        screenshotDescription: 'A screenshot slot for source inspection.',
        features: ['View Page Source context menu', 'Raw HTML file support', 'Syntax highlighting', 'Search navigation', 'Copy and download'],
      },
      'zh-Hans': {
        name: 'HTML Prettify',
        shortName: 'HTML',
        tagline: '用清晰阅读器查看网页源码。',
        description: '通过右键菜单捕获渲染页面源码，或打开原始 HTML 文件，然后搜索、格式化、复制、下载并切换主题。',
        screenshotTitle: '格式化后的网页源码。',
        screenshotDescription: '用于源码检查的截图位置。',
        features: ['查看网页源码菜单', '原始 HTML 文件支持', '语法高亮', '搜索导航', '复制与下载'],
      },
      'zh-Hant': {
        name: 'HTML Prettify',
        shortName: 'HTML',
        tagline: '用清晰閱讀器查看網頁原始碼。',
        description: '透過右鍵選單擷取渲染頁面原始碼，或開啟原始 HTML 檔案，然後搜尋、格式化、複製、下載並切換主題。',
        screenshotTitle: '格式化後的網頁原始碼。',
        screenshotDescription: '原始碼檢查的截圖位置。',
        features: ['查看網頁原始碼選單', '原始 HTML 檔案支援', '語法高亮', '搜尋導覽', '複製與下載'],
      },
      ja: {
        name: 'HTML Prettify',
        shortName: 'HTML',
        tagline: 'ページソースを整ったリーダーで。',
        description: 'コンテキストメニューからレンダリング済みページソースを取得し、Raw HTML ファイルも表示できます。検索、整形、コピー、ダウンロード、テーマ切り替えに対応します。',
        screenshotTitle: '整形されたページソース。',
        screenshotDescription: 'ソース確認用のスクリーンショット枠です。',
        features: ['ページソース表示メニュー', 'Raw HTML ファイル対応', 'シンタックスハイライト', '検索ナビゲーション', 'コピーとダウンロード'],
      },
      ko: {
        name: 'HTML Prettify',
        shortName: 'HTML',
        tagline: '페이지 소스를 깔끔한 리더로.',
        description: '컨텍스트 메뉴로 렌더링된 페이지 소스를 캡처하거나 원본 HTML 파일을 열고, 검색, 포맷팅, 복사, 다운로드, 테마 전환을 사용합니다.',
        screenshotTitle: '포맷팅된 페이지 소스.',
        screenshotDescription: '소스 검사용 스크린샷 자리입니다.',
        features: ['페이지 소스 보기 메뉴', '원본 HTML 파일 지원', '구문 강조', '검색 탐색', '복사 및 다운로드'],
      },
    },
  },
  {
    id: 'javascript',
    category: 'Browser Extension',
    platforms: ['Safari', 'macOS'],
    accent: '#e67700',
    icon: 'javascript.png',
    screenshot: 'javascript-placeholder.svg',
    storeUrl: '#download-pending',
    permissions: sharedPermissions,
    copy: {
      en: {
        name: 'JavaScript Prettify',
        shortName: 'JavaScript',
        tagline: 'Turn minified scripts into readable code.',
        description: 'Open JavaScript responses as a formatted viewer with pretty and raw modes, search navigation, line numbers, theme controls, copy, download, and shortcuts.',
        screenshotTitle: 'Readable JavaScript responses.',
        screenshotDescription: 'A screenshot slot for script inspection.',
        features: ['Pretty and raw views', 'Search with next and previous', 'Line number toggle', 'Theme and font settings', 'Copy and download'],
      },
      'zh-Hans': {
        name: 'JavaScript Prettify',
        shortName: 'JavaScript',
        tagline: '把压缩脚本变成可读代码。',
        description: '将 JavaScript 响应作为格式化阅读器打开，支持美化/原始模式、搜索导航、行号、主题、复制、下载和快捷键。',
        screenshotTitle: '可读的 JavaScript 响应。',
        screenshotDescription: '用于脚本检查的截图位置。',
        features: ['美化与原始视图', '上下条搜索', '行号开关', '主题与字体设置', '复制与下载'],
      },
      'zh-Hant': {
        name: 'JavaScript Prettify',
        shortName: 'JavaScript',
        tagline: '把壓縮腳本變成可讀程式碼。',
        description: '將 JavaScript 回應作為格式化閱讀器開啟，支援美化/原始模式、搜尋導覽、行號、主題、複製、下載與快捷鍵。',
        screenshotTitle: '可讀的 JavaScript 回應。',
        screenshotDescription: '腳本檢查的截圖位置。',
        features: ['美化與原始視圖', '上下筆搜尋', '行號開關', '主題與字體設定', '複製與下載'],
      },
      ja: {
        name: 'JavaScript Prettify',
        shortName: 'JavaScript',
        tagline: '圧縮スクリプトを読みやすいコードへ。',
        description: 'JavaScript レスポンスを整形ビューアで開きます。Pretty/Raw、検索、行番号、テーマ、コピー、ダウンロード、ショートカットに対応します。',
        screenshotTitle: '読みやすい JavaScript レスポンス。',
        screenshotDescription: 'スクリプト確認用のスクリーンショット枠です。',
        features: ['Pretty と Raw', '前後移動つき検索', '行番号切り替え', 'テーマとフォント設定', 'コピーとダウンロード'],
      },
      ko: {
        name: 'JavaScript Prettify',
        shortName: 'JavaScript',
        tagline: '압축 스크립트를 읽기 쉬운 코드로.',
        description: 'JavaScript 응답을 포맷팅된 뷰어로 열고 pretty/raw 모드, 검색, 줄 번호, 테마, 복사, 다운로드, 단축키를 사용합니다.',
        screenshotTitle: '읽기 쉬운 JavaScript 응답.',
        screenshotDescription: '스크립트 검사용 스크린샷 자리입니다.',
        features: ['Pretty 및 원본 보기', '이전/다음 검색', '줄 번호 토글', '테마와 글꼴 설정', '복사 및 다운로드'],
      },
    },
  },
  {
    id: 'yaml',
    category: 'Browser Extension',
    platforms: ['Safari', 'macOS'],
    accent: '#2b8a3e',
    icon: 'yaml.png',
    screenshot: 'yaml-placeholder.svg',
    storeUrl: '#download-pending',
    permissions: sharedPermissions,
    copy: {
      en: {
        name: 'YAML Prettify',
        shortName: 'YAML',
        tagline: 'Inspect YAML documents without visual noise.',
        description: 'Read single or multi-document YAML with a VS Code-style tree, search, collapse controls, timestamps, links, media previews, color previews, copy, and download.',
        screenshotTitle: 'YAML tree with useful hints.',
        screenshotDescription: 'A screenshot slot for YAML document navigation.',
        features: ['Single and multi-document YAML', 'YAML-style virtual tree', 'Search and collapse controls', 'Timestamp, link, media, and color hints', 'Copy and download'],
      },
      'zh-Hans': {
        name: 'YAML Prettify',
        shortName: 'YAML',
        tagline: '在少干扰的界面中检查 YAML。',
        description: '用 VS Code 风格树查看单文档或多文档 YAML，支持搜索、折叠、时间戳、链接、媒体预览、颜色预览、复制和下载。',
        screenshotTitle: '带实用提示的 YAML 树。',
        screenshotDescription: '用于 YAML 文档导航的截图位置。',
        features: ['单文档与多文档 YAML', 'YAML 风格虚拟树', '搜索与折叠控制', '时间戳、链接、媒体、颜色提示', '复制与下载'],
      },
      'zh-Hant': {
        name: 'YAML Prettify',
        shortName: 'YAML',
        tagline: '在少干擾的介面中檢查 YAML。',
        description: '用 VS Code 風格樹查看單文件或多文件 YAML，支援搜尋、折疊、時間戳、連結、媒體預覽、顏色預覽、複製與下載。',
        screenshotTitle: '帶實用提示的 YAML 樹。',
        screenshotDescription: 'YAML 文件導覽的截圖位置。',
        features: ['單文件與多文件 YAML', 'YAML 風格虛擬樹', '搜尋與折疊控制', '時間戳、連結、媒體、顏色提示', '複製與下載'],
      },
      ja: {
        name: 'YAML Prettify',
        shortName: 'YAML',
        tagline: 'ノイズを抑えて YAML を確認。',
        description: '単一または複数ドキュメントの YAML を VS Code 風ツリーで表示します。検索、折りたたみ、タイムスタンプ、リンク、メディア、色プレビュー、コピー、ダウンロードに対応します。',
        screenshotTitle: '便利なヒント付き YAML ツリー。',
        screenshotDescription: 'YAML 文書ナビゲーション用のスクリーンショット枠です。',
        features: ['単一/複数ドキュメント YAML', 'YAML らしい仮想ツリー', '検索と折りたたみ', 'タイムスタンプ、リンク、メディア、色ヒント', 'コピーとダウンロード'],
      },
      ko: {
        name: 'YAML Prettify',
        shortName: 'YAML',
        tagline: '시각적 잡음 없이 YAML 검사.',
        description: '단일 또는 다중 문서 YAML을 VS Code 스타일 트리로 읽고, 검색, 접기, 타임스탬프, 링크, 미디어, 색상 미리보기, 복사, 다운로드를 사용합니다.',
        screenshotTitle: '유용한 힌트가 있는 YAML 트리.',
        screenshotDescription: 'YAML 문서 탐색용 스크린샷 자리입니다.',
        features: ['단일 및 다중 문서 YAML', 'YAML 스타일 가상 트리', '검색과 접기 컨트롤', '타임스탬프, 링크, 미디어, 색상 힌트', '복사 및 다운로드'],
      },
    },
  },
];

export function getApp(id: AppId) {
  return apps.find((app) => app.id === id);
}

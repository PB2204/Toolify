import {
  type LucideIcon,
  CaseSensitive,
  Regex,
  Palette,
  Hash,
  Fingerprint,
  Link,
  QrCode,
  Text,
  FileCode,
  ArrowRightLeft,
  Scissors,
  Minimize,
  Maximize,
  FlipHorizontal,
  BoxSelect,
  Percent,
  Landmark,
  BookOpen,
  Milestone,
  Type,
  Trash2,
  ScanEye,
  Combine,
  Split,
  Image,
  Info,
  Package,
  Server,
  Network,
  Globe,
  Timer,
  Clock,
  CalendarDays,
  Scale,
  DollarSign,
  TestTube2,
  Bot,
  Columns,
  Sheet,
  Code2,
  Braces,
  TestTube,
  Book,
  Wand2,
  Lock
} from 'lucide-react';

export type Tool = {
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  category: string;
  isNew?: boolean;
};

export type ToolCategory = {
  name: string;
  tools: Tool[];
};

const toolsList: Tool[] = [
  // Text & Data
  { name: 'JSON Formatter & Validator', slug: 'json-formatter', description: 'Beautify and validate your JSON data.', icon: Braces, category: 'Text & Data' },
  { name: 'Lorem Ipsum Generator', slug: 'lorem-ipsum-generator', description: 'Generate placeholder text.', icon: Text, category: 'Text & Data' },
  { name: 'Case Converter', slug: 'case-converter', description: 'Convert text to various case formats.', icon: CaseSensitive, category: 'Text & Data' },
  { name: 'Text Cleaner', slug: 'text-cleaner', description: 'Remove extra spaces, lines, and HTML tags.', icon: Trash2, category: 'Text & Data', isNew: true },
  { name: 'Word & Character Counter', slug: 'word-character-counter', description: 'Count words, characters, and lines.', icon: Type, category: 'Text & Data' },
  { name: 'Readability Score Checker', slug: 'readability-score-checker', description: 'Check readability scores like Flesch-Kincaid.', icon: ScanEye, category: 'Text & Data', isNew: true },
  { name: 'Diff & Merge Checker', slug: 'diff-merge-checker', description: 'Compare two text files.', icon: FlipHorizontal, category: 'Text & Data', isNew: true },
  
  // Encoders & Decoders
  { name: 'Base64 Encode / Decode', slug: 'base64-encoder-decoder', description: 'Encode or decode Base64 strings.', icon: ArrowRightLeft, category: 'Encoders & Decoders' },
  { name: 'URL Encoder / Decoder', slug: 'url-encoder-decoder', description: 'Encode or decode URL components.', icon: Link, category: 'Encoders & Decoders' },
  { name: 'JWT Decoder', slug: 'jwt-decoder', description: 'Decode JSON Web Tokens.', icon: Fingerprint, category: 'Encoders & Decoders', isNew: true },
  { name: 'HTML Entity Encoder / Decoder', slug: 'html-entity-encoder-decoder', description: 'Convert characters to HTML entities.', icon: Code2, category: 'Encoders & Decoders', isNew: true },

  // Generators
  { name: 'UUID / GUID Generator', slug: 'uuid-guid-generator', description: 'Generate unique identifiers.', icon: Fingerprint, category: 'Generators' },
  { name: 'QR Code Generator', slug: 'qr-code-generator', description: 'Create QR codes from text or URLs.', icon: QrCode, category: 'Generators', isNew: true },
  { name: 'Password Generator', slug: 'password-generator', description: 'Generate secure, random passwords.', icon: Lock, category: 'Generators' },
  { name: 'Hash Generator', slug: 'hash-generator', description: 'Generate MD5, SHA1, SHA256 hashes.', icon: Hash, category: 'Generators' },
  { name: 'Random Data Generator', slug: 'random-data-generator', description: 'Generate random names, emails, etc.', icon: TestTube2, category: 'Generators' },
  { name: 'Favicon Generator', slug: 'favicon-generator', description: 'Create favicons from an image.', icon: Image, category: 'Generators' },
  
  // AI Tools
  { name: 'Paraphraser', slug: 'paraphraser', description: 'Rewrite text to avoid plagiarism.', icon: Wand2, category: 'AI Tools' },
  
  // Converters
  { name: 'Markdown to HTML', slug: 'markdown-to-html', description: 'Convert Markdown to HTML.', icon: FileCode, category: 'Converters', isNew: true },
  { name: 'HTML to Markdown', slug: 'html-to-markdown', description: 'Convert HTML to Markdown.', icon: FileCode, category: 'Converters' },
  { name: 'YAML to JSON Converter', slug: 'yaml-to-json-converter', description: 'Convert YAML data to JSON format.', icon: ArrowRightLeft, category: 'Converters', isNew: true },
  { name: 'JSON to YAML Converter', slug: 'json-to-yaml-converter', description: 'Convert JSON data to YAML format.', icon: ArrowRightLeft, category: 'Converters', isNew: true },
  { name: 'CSV to JSON Converter', slug: 'csv-to-json-converter', description: 'Convert CSV files to JSON.', icon: Sheet, category: 'Converters', isNew: true },
  { name: 'Epoch / Timestamp Converter', slug: 'epoch-timestamp-converter', description: 'Convert between Unix timestamps and dates.', icon: Timer, category: 'Converters', isNew: true },
  { name: 'Timezone Converter', slug: 'timezone-converter', description: 'Convert times across different timezones.', icon: Clock, category: 'Converters', isNew: true },
  { name: 'ISO Date Formatter', slug: 'iso-date-formatter', description: 'Format dates into ISO 8601 strings.', icon: CalendarDays, category: 'Converters' },
  { name: 'Unit Converter', slug: 'unit-converter', description: 'Convert length, weight, temp, etc.', icon: Scale, category: 'Converters', isNew: true },
  { name: 'Currency Converter', slug: 'currency-converter', description: 'Convert between world currencies.', icon: DollarSign, category: 'Converters' },

  // Image Tools
  { name: 'Image Compressor', slug: 'image-compressor', description: 'Reduce image file sizes.', icon: Minimize, category: 'Image Tools' },
  { name: 'Image Resizer & Cropper', slug: 'image-resizer-cropper', description: 'Resize and crop your images.', icon: Scissors, category: 'Image Tools' },
  { name: 'SVG Optimizer', slug: 'svg-optimizer', description: 'Optimize SVG code for smaller file size.', icon: Minimize, category: 'Image Tools' },
  { name: 'EXIF Metadata Viewer & Remover', slug: 'exif-metadata-viewer', description: 'View and remove EXIF data from images.', icon: Info, category: 'Image Tools' },
  { name: 'PDF to Images Converter', slug: 'pdf-to-images-converter', description: 'Convert PDF pages to images.', icon: Image, category: 'Image Tools' },

  // CSS Tools
  { name: 'Color Picker & Palette', slug: 'color-picker-palette', description: 'Pick colors and generate palettes.', icon: Palette, category: 'CSS Tools', isNew: true },
  { name: 'Gradient Generator', slug: 'gradient-generator', description: 'Create CSS gradients.', icon: Palette, category: 'CSS Tools' },
  { name: 'Box-Shadow Generator', slug: 'box-shadow-generator', description: 'Generate CSS box-shadow styles.', icon: BoxSelect, category: 'CSS Tools', isNew: true },
  { name: 'Border-Radius Generator', slug: 'border-radius-generator', description: 'Preview and generate CSS border-radius.', icon: BoxSelect, category: 'CSS Tools' },
  { name: 'Flexbox / Grid Playground', slug: 'css-playground', description: 'Visually learn and create CSS layouts.', icon: Columns, category: 'CSS Tools' },

  // Web & Development
  { name: 'Regex Tester', slug: 'regex-tester', description: 'Test and debug regular expressions.', icon: Regex, category: 'Web & Development', isNew: true },
  { name: 'URL Shortener', slug: 'url-shortener', description: 'Create short links for long URLs.', icon: Link, category: 'Web & Development' },
  { name: 'Responsive Breakpoint Tester', slug: 'responsive-tester', description: 'Test your site on different screen sizes.', icon: Maximize, category: 'Web & Development' },
  { name: 'Meta Tag / OG Previewer', slug: 'meta-tag-previewer', description: 'Preview how your page looks when shared.', icon: ScanEye, category: 'Web & Development' },
  { name: 'Robots.txt & Sitemap Generator', slug: 'robots-sitemap-generator', description: 'Generate robots.txt and sitemap.xml files.', icon: Bot, category: 'Web & Development' },
  { name: 'UTM Builder', slug: 'utm-builder', description: 'Build UTM tracking codes for URLs.', icon: Link, category: 'Web & Development' },
  { name: 'PWA Icons Generator', slug: 'pwa-icons-generator', description: 'Generate icons for your PWA.', icon: Package, category: 'Web & Development' },
  { name: 'HTTP Status Code Lookup', slug: 'http-status-code-lookup', description: 'Look up HTTP status code meanings.', icon: Server, category: 'Web & Development', isNew: true },
  { name: 'Cron Expression Builder', slug: 'cron-expression-builder', description: 'Build and parse cron expressions.', icon: Clock, category: 'Web & Development' },
  { name: 'Regex Cheat Sheet', slug: 'regex-cheat-sheet', description: 'An interactive regular expression guide.', icon: BookOpen, category: 'Web & Development' },
  { name: 'MIME Type Lookup', slug: 'mime-type-lookup', description: 'Find MIME types for file extensions.', icon: FileCode, category: 'Web & Development', isNew: true },
  { name: 'DNS / WHOIS Lookup', slug: 'dns-whois-lookup', description: 'Look up DNS and WHOIS records.', icon: Network, category: 'Web & Development' },
  { name: 'IP Geo Lookup', slug: 'ip-geo-lookup', description: 'Find the location of an IP address.', icon: Globe, category: 'Web & Development', isNew: true },
  { name: 'Ping / Traceroute Visualizer', slug: 'ping-visualizer', description: 'Simulate ping and traceroute.', icon: Network, category: 'Web & Development' },
  { name: 'HTTP Header Inspector', slug: 'http-header-inspector', description: 'Inspect HTTP headers of a request.', icon: Server, category: 'Web & Development' },
  { name: 'WebSocket Echo Tester', slug: 'websocket-tester', description: 'Test your WebSocket connections.', icon: TestTube, category: 'Web & Development' },
  { name: 'Unicode Inspector', slug: 'unicode-inspector', description: 'Inspect details of Unicode characters.', icon: CaseSensitive, category: 'Web & Development' },
  { name: 'Emoji Picker & Copier', slug: 'emoji-picker', description: 'Find and copy emojis.', icon: Book, category: 'Web & Development' },

  // Calculators
  { name: 'Percentage / Discount Calc', slug: 'percentage-calculator', description: 'Calculate percentages and discounts.', icon: Percent, category: 'Calculators', isNew: true },
  { name: 'Loan / EMI Calculator', slug: 'loan-calculator', description: 'Calculate loan payments.', icon: Landmark, category: 'Calculators', isNew: true },
  
  // Documents
  { name: 'PDF Merger / Splitter', slug: 'pdf-merger-splitter', description: 'Combine or split PDF files.', icon: Combine, category: 'Documents' },
  { name: 'CSV Cleaner', slug: 'csv-cleaner', description: 'Trim, dedupe, and reorder CSV columns.', icon: Split, category: 'Documents' },
];

export const getToolsByCategory = (): ToolCategory[] => {
  const categories: { [key: string]: Tool[] } = {};
  toolsList.forEach(tool => {
    if (!categories[tool.category]) {
      categories[tool.category] = [];
    }
    categories[tool.category].push(tool);
  });
  
  // Custom sort order for categories
  const categoryOrder = [
    'AI Tools',
    'Text & Data',
    'Web & Development',
    'Image Tools',
    'Converters',
    'Encoders & Decoders',
    'Generators',
    'CSS Tools',
    'Calculators',
    'Documents'
  ];

  return Object.keys(categories)
    .map(name => ({
      name,
      tools: categories[name].sort((a,b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.name);
      const indexB = categoryOrder.indexOf(b.name);
      if (indexA === -1 && indexB === -1) return a.name.localeCompare(b.name);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
};

export const allTools = toolsList;

export const getToolBySlug = (slug: string): Tool | undefined => {
    return allTools.find(tool => tool.slug === slug);
}
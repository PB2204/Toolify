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
  Lock,
  Smile,
  CircleOff,
  FileOutput,
  FileInput,
  Eraser,
  Shuffle,
  Calculator,
  CheckCircle,
  Binary,
  ListRestart,
  Repeat,
  Sigma,
  GanttChartSquare,
  Dice5,
  Coins,
  Gem,
  Cake,
  ClipboardCheck,
  ShieldCheck,
  KeyRound,
  Pin,
  Brush,
  Baseline,
  Paintbrush,
  Palette as PaletteIcon,
  View,
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
  { name: 'Word & Character Counter', slug: 'word-character-counter', description: 'Count words, characters, and lines.', icon: Type, category: 'Text & Data' },
  { name: 'Text Cleaner', slug: 'text-cleaner', description: 'Remove extra spaces, lines, and HTML tags.', icon: Eraser, category: 'Text & Data' },
  { name: 'Readability Score Checker', slug: 'readability-score-checker', description: 'Check readability scores like Flesch-Kincaid.', icon: ScanEye, category: 'Text & Data' },
  { name: 'Diff & Merge Checker', slug: 'diff-merge-checker', description: 'Compare two text files.', icon: FlipHorizontal, category: 'Text & Data' },
  { name: 'Palindrome Checker', slug: 'palindrome-checker', description: 'Check if a string is a palindrome.', icon: Milestone, category: 'Text & Data' },
  { name: 'Anagram Finder', slug: 'anagram-finder', description: 'Find anagrams from a word or sentence.', icon: Shuffle, category: 'Text & Data' },
  { name: 'Text Reverser', slug: 'text-reverser', description: 'Reverse entire text, words, or letters.', icon: Repeat, category: 'Text & Data' },
  { name: 'Case Counter', slug: 'case-counter', description: 'Count number of uppercase/lowercase characters.', icon: Sigma, category: 'Text & Data' },
  { name: 'Whitespace Remover', slug: 'whitespace-remover', description: 'Remove all whitespaces or trim them.', icon: Eraser, category: 'Text & Data' },
  
  // Math & Calculation
  { name: 'Simple Calculator', slug: 'simple-calculator', description: 'Basic calculator for simple arithmetic.', icon: Calculator, category: 'Math & Calculation' },
  { name: 'Prime Number Checker', slug: 'prime-number-checker', description: 'Check if a number is a prime number.', icon: CheckCircle, category: 'Math & Calculation' },
  { name: 'Factorial Calculator', slug: 'factorial-calculator', description: 'Find the factorial of a number.', icon: Binary, category: 'Math & Calculation' },
  { name: 'GCD & LCM Calculator', slug: 'gcd-lcm-calculator', description: 'Find greatest common divisor and least common multiple.', icon: GanttChartSquare, category: 'Math & Calculation' },
  { name: 'Percentage Calculator', slug: 'percentage-calculator', description: 'Calculate percentages and discounts.', icon: Percent, category: 'Math & Calculation' },
  { name: 'Loan Calculator', slug: 'loan-calculator', description: 'Calculate loan payments.', icon: Landmark, category: 'Math & Calculation' },
  
  // Number Tools
  { name: 'Roman Numeral Converter', slug: 'roman-numeral-converter', description: 'Convert numbers to and from Roman numerals.', icon: Book, category: 'Number Tools' },
  { name: 'Binary ↔ Decimal Converter', slug: 'binary-decimal-converter', description: 'Convert between binary and decimal numbers.', icon: ArrowRightLeft, category: 'Number Tools' },
  { name: 'Hex ↔ Decimal Converter', slug: 'hex-decimal-converter', description: 'Convert between hexadecimal and decimal numbers.', icon: ArrowRightLeft, category: 'Number Tools' },
  { name: 'Number to Words Converter', slug: 'number-to-words-converter', description: 'Convert numbers to written words.', icon: CaseSensitive, category: 'Number Tools' },

  // Encoders & Decoders
  { name: 'Base64 Encode / Decode', slug: 'base64-encoder-decoder', description: 'Encode or decode Base64 strings.', icon: ArrowRightLeft, category: 'Encoders & Decoders' },
  { name: 'URL Encoder / Decoder', slug: 'url-encoder-decoder', description: 'Encode or decode URL components.', icon: Link, category: 'Encoders & Decoders' },
  { name: 'JWT Decoder', slug: 'jwt-decoder', description: 'Decode JSON Web Tokens.', icon: Fingerprint, category: 'Encoders & Decoders' },
  { name: 'HTML Entity Encoder / Decoder', slug: 'html-entity-encoder-decoder', description: 'Convert characters to HTML entities.', icon: Code2, category: 'Encoders & Decoders' },

  // Generators
  { name: 'UUID / GUID Generator', slug: 'uuid-guid-generator', description: 'Generate unique identifiers.', icon: Fingerprint, category: 'Generators' },
  { name: 'QR Code Generator', slug: 'qr-code-generator', description: 'Create QR codes from text or URLs.', icon: QrCode, category: 'Generators' },
  { name: 'Password Generator', slug: 'password-generator', description: 'Generate secure, random passwords.', icon: Lock, category: 'Generators' },
  { name: 'Hash Generator', slug: 'hash-generator', description: 'Generate MD5, SHA1, SHA256 hashes.', icon: Hash, category: 'Generators' },
  { name: 'Random Data Generator', slug: 'random-data-generator', description: 'Generate random names, emails, etc.', icon: TestTube2, category: 'Generators' },
  { name: 'Passphrase Generator', slug: 'passphrase-generator', description: 'Generate memorable passphrases.', icon: KeyRound, category: 'Generators' },
  { name: 'PIN Generator', slug: 'pin-generator', description: 'Generate random 4–8 digit numeric PINs.', icon: Pin, category: 'Generators' },

  // Converters
  { name: 'Markdown to HTML', slug: 'markdown-to-html', description: 'Convert Markdown to HTML.', icon: FileOutput, category: 'Converters' },
  { name: 'HTML to Markdown', slug: 'html-to-markdown', description: 'Convert HTML to Markdown.', icon: FileInput, category: 'Converters' },
  { name: 'YAML to JSON Converter', slug: 'yaml-to-json-converter', description: 'Convert YAML data to JSON format.', icon: ArrowRightLeft, category: 'Converters' },
  { name: 'JSON to YAML Converter', slug: 'json-to-yaml-converter', description: 'Convert JSON data to YAML format.', icon: ArrowRightLeft, category: 'Converters' },
  { name: 'CSV to JSON Converter', slug: 'csv-to-json-converter', description: 'Convert CSV files to JSON.', icon: Sheet, category: 'Converters' },
  { name: 'Epoch / Timestamp Converter', slug: 'epoch-timestamp-converter', description: 'Convert between Unix timestamps and dates.', icon: Timer, category: 'Converters' },
  { name: 'Timezone Converter', slug: 'timezone-converter', description: 'Convert times across different timezones.', icon: Clock, category: 'Converters' },
  { name: 'ISO Date Formatter', slug: 'iso-date-formatter', description: 'Format dates into ISO 8601 strings.', icon: CalendarDays, category: 'Converters' },
  { name: 'Unit Converter', slug: 'unit-converter', description: 'Convert length, weight, temp, etc.', icon: Scale, category: 'Converters' },
  { name: 'Currency Converter', slug: 'currency-converter', description: 'Convert between world currencies.', icon: DollarSign, category: 'Converters' },

  // CSS & UI Tools
  { name: 'Color Picker & Palette', slug: 'color-picker-palette', description: 'Pick colors and generate palettes.', icon: Palette, category: 'CSS & UI Tools' },
  { name: 'Gradient Generator', slug: 'gradient-generator', description: 'Create CSS gradients.', icon: PaletteIcon, category: 'CSS & UI Tools' },
  { name: 'Box-Shadow Generator', slug: 'box-shadow-generator', description: 'Generate CSS box-shadow styles.', icon: BoxSelect, category: 'CSS & UI Tools' },
  { name: 'Border-Radius Generator', slug: 'border-radius-generator', description: 'Preview and generate CSS border-radius.', icon: BoxSelect, category: 'CSS & UI Tools' },
  { name: 'Glassmorphism CSS Generator', slug: 'glassmorphism-generator', description: 'Live preview and code generator.', icon: Brush, category: 'CSS & UI Tools' },
  { name: 'Neumorphism Generator', slug: 'neumorphism-generator', description: 'Stylish shadowed UI element generator.', icon: Paintbrush, category: 'CSS & UI Tools', isNew: true },
  { name: 'Font Style Previewer', slug: 'font-style-previewer', description: 'Preview text in Google Fonts.', icon: Baseline, category: 'CSS & UI Tools', isNew: true },
  { name: 'Tailwind Color Generator', slug: 'tailwind-color-generator', description: 'Pick Tailwind-compatible color shades.', icon: PaletteIcon, category: 'CSS & UI Tools', isNew: true },
  
  // Document Helpers
  { name: 'Base64 Image Viewer', slug: 'base64-image-viewer', description: 'Convert image to Base64 and preview it.', icon: Image, category: 'Document Helpers' },
  { name: 'Markdown Live Previewer', slug: 'markdown-live-previewer', description: 'Preview rendered Markdown instantly.', icon: View, category: 'Document Helpers' },
  { name: 'Code Formatter (HTML/CSS/JS)', slug: 'code-formatter', description: 'Beautify pasted code.', icon: Braces, category: 'Document Helpers', isNew: true },
  { name: 'Text Diff Highlighter', slug: 'text-diff-highlighter', description: 'Highlight changed lines with color codes.', icon: FlipHorizontal, category: 'Document Helpers', isNew: true },

  // Web & Development
  { name: 'Regex Tester', slug: 'regex-tester', description: 'Test and debug regular expressions.', icon: Regex, category: 'Web & Development' },
  { name: 'URL Shortener', slug: 'url-shortener', description: 'Create short links for long URLs.', icon: Link, category: 'Web & Development' },
  { name: 'Meta Tag / OG Previewer', slug: 'meta-tag-previewer', description: 'Preview how your page looks when shared.', icon: ScanEye, category: 'Web & Development' },
  { name: 'HTTP Status Code Lookup', slug: 'http-status-code-lookup', description: 'Look up HTTP status code meanings.', icon: Server, category: 'Web & Development' },
  { name: 'MIME Type Lookup', slug: 'mime-type-lookup', description: 'Find MIME types for file extensions.', icon: FileCode, category: 'Web & Development' },
  { name: 'DNS Lookup', slug: 'dns-whois-lookup', description: 'Look up DNS records.', icon: Network, category: 'Web & Development' },
  { name: 'IP Geo Lookup', slug: 'ip-geo-lookup', description: 'Find the location of an IP address.', icon: Globe, category: 'Web & Development' },
  { name: 'HTTP Header Inspector', slug: 'http-header-inspector', description: 'Inspect HTTP headers of a request.', icon: Server, category: 'Web & Development' },
  { name: 'Unicode Inspector', slug: 'unicode-inspector', description: 'Inspect details of Unicode characters.', icon: CaseSensitive, category: 'Web & Development' },
  { name: 'Emoji Picker', slug: 'emoji-picker', description: 'Find and copy emojis.', icon: Smile, category: 'Web & Development' },
  { name: 'Strong Password Evaluator', slug: 'strong-password-evaluator', description: 'Grade strength of any password.', icon: ShieldCheck, category: 'Web & Development', isNew: true },

  // Fun & Utility
  { name: 'Flip a Coin', slug: 'flip-a-coin', description: 'Simple coin flip simulator.', icon: Coins, category: 'Fun & Utility' },
  { name: 'Dice Roller', slug: 'dice-roller', description: 'Roll 1–3 virtual dice.', icon: Dice5, category: 'Fun & Utility' },
  { name: 'Random Picker', slug: 'random-picker', description: 'Paste list of items and randomly pick one.', icon: ListRestart, category: 'Fun & Utility' },
  { name: 'Age Calculator', slug: 'age-calculator', description: 'Calculate age from birthdate.', icon: Cake, category: 'Fun & Utility' },
  { name: 'Zodiac Finder', slug: 'zodiac-finder', description: 'Get Western zodiac sign based on date.', icon: Gem, category: 'Fun & Utility' },
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
    'Text & Data',
    'Math & Calculation',
    'Number Tools',
    'Web & Development',
    'CSS & UI Tools',
    'Converters',
    'Encoders & Decoders',
    'Generators',
    'Document Helpers',
    'Fun & Utility',
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

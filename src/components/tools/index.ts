import React from 'react';
import ComingSoon from './ComingSoon';
import JsonFormatter from './JsonFormatter';
import LoremIpsumGenerator from './LoremIpsumGenerator';
import CaseConverter from './CaseConverter';
import WordCharacterCounter from './WordCharacterCounter';
import PasswordGenerator from './PasswordGenerator';
import UuidGenerator from './UuidGenerator';
import HashGenerator from './HashGenerator';
import Base64Converter from './Base64Converter';
import UrlEncoderDecoder from './UrlEncoderDecoder';
import TextCleaner from './TextCleaner';
import JwtDecoder from './JwtDecoder';
import HtmlEntityEncoderDecoder from './HtmlEntityEncoderDecoder';
import QrCodeGenerator from './QrCodeGenerator';
import MarkdownToHtml from './MarkdownToHtml';
import YamlToJsonConverter from './YamlToJsonConverter';
import EpochTimestampConverter from './EpochTimestampConverter';
import TimezoneConverter from './TimezoneConverter';
import UnitConverter from './UnitConverter';
import ColorPickerPalette from './ColorPickerPalette';
import ReadabilityScoreChecker from './ReadabilityScoreChecker';
import DiffMergeChecker from './DiffMergeChecker';
import JsonToYamlConverter from './JsonToYamlConverter';
import CsvToJsonConverter from './CsvToJsonConverter';
import BoxShadowGenerator from './BoxShadowGenerator';
import RegexTester from './RegexTester';
import HttpStatusCodeLookup from './HttpStatusCodeLookup';
import MimeTypeLookup from './MimeTypeLookup';
import IpGeoLookup from './IpGeoLookup';
import PercentageCalculator from './PercentageCalculator';
import LoanCalculator from './LoanCalculator';
import HtmlToMarkdown from './HtmlToMarkdown';
import BorderRadiusGenerator from './BorderRadiusGenerator';
import UrlShortener from './UrlShortener';
import MetaTagPreviewer from './MetaTagPreviewer';
import DnsWhoisLookup from './DnsWhoisLookup';
import HttpHeaderInspector from './HttpHeaderInspector';
import UnicodeInspector from './UnicodeInspector';
import EmojiPicker from './EmojiPicker';
import RandomDataGenerator from './RandomDataGenerator';
import IsoDateFormatter from './IsoDateFormatter';
import CurrencyConverter from './CurrencyConverter';
import GradientGenerator from './GradientGenerator';
import PalindromeChecker from './PalindromeChecker';
import AnagramFinder from './AnagramFinder';
import TextReverser from './TextReverser';
import CaseCounter from './CaseCounter';
import WhitespaceRemover from './WhitespaceRemover';
import SimpleCalculator from './SimpleCalculator';
import PrimeNumberChecker from './PrimeNumberChecker';
import FactorialCalculator from './FactorialCalculator';
import GcdLcmCalculator from './GcdLcmCalculator';
import RomanNumeralConverter from './RomanNumeralConverter';
import BinaryDecimalConverter from './BinaryDecimalConverter';
import HexDecimalConverter from './HexDecimalConverter';
import NumberToWordsConverter from './NumberToWordsConverter';
import GlassmorphismGenerator from './GlassmorphismGenerator';
import NeumorphismGenerator from './NeumorphismGenerator';
import FontStylePreviewer from './FontStylePreviewer';
import TailwindColorGenerator from './TailwindColorGenerator';
import Base64ImageViewer from './Base64ImageViewer';
import MarkdownLivePreviewer from './MarkdownLivePreviewer';
import CodeFormatter from './CodeFormatter';
import TextDiffHighlighter from './TextDiffHighlighter';
import StrongPasswordEvaluator from './StrongPasswordEvaluator';
import PassphraseGenerator from './PassphraseGenerator';
import PinGenerator from './PinGenerator';
import FlipACoin from './FlipACoin';
import DiceRoller from './DiceRoller';
import RandomPicker from './RandomPicker';
import AgeCalculator from './AgeCalculator';
import ZodiacFinder from './ZodiacFinder';
import AlphabeticalSorter from './AlphabeticalSorter';
import DuplicateLineRemover from './DuplicateLineRemover';
import LetterCounter from './LetterCounter';
import TextToBinaryConverter from './TextToBinaryConverter';
import TemperatureConverter from './TemperatureConverter';
import TipCalculator from './TipCalculator';
import BmiCalculator from './BmiCalculator';
import DateToDayFinder from './DateToDayFinder';
import TimeElapsedCounter from './TimeElapsedCounter';
import CalendarEventCountdown from './CalendarEventCountdown';
import DaysBetweenDatesCalculator from './DaysBetweenDatesCalculator';
import PasswordStrengthVisualizer from './PasswordStrengthVisualizer';
import TypingSpeedTester from './TypingSpeedTester';
import NameInitialsGenerator from './NameInitialsGenerator';
import NumberPatternGenerator from './NumberPatternGenerator';
import ScrollProgressIndicator from './ScrollProgressIndicator';
import MirrorTextGenerator from './MirrorTextGenerator';
import TextEncryptionCaesarCipher from './TextEncryptionCaesarCipher';
import HtmlTagHighlighter from './HtmlTagHighlighter';
import TextToEmojiConverter from './TextToEmojiConverter';

// New placeholders for the 15 additional tools
import ShadowToTailwindConverter from './ShadowToTailwindConverter';
import ColorContrastChecker from './ColorContrastChecker';
import ResponsiveBreakpointTester from './ResponsiveBreakpointTester';
import StickyNotes from './StickyNotes';
import PixelToRemConverter from './PixelToRemConverter';
import ViewportSizeChecker from './ViewportSizeChecker';
import ClipboardHistory from './ClipboardHistory';
import FaviconGenerator from './FaviconGenerator';
import ComponentScreenshotTool from './ComponentScreenshotTool';
import CommitMessageGenerator from './CommitMessageGenerator';
import FolderStructureVisualizer from './FolderStructureVisualizer';
import CustomCursorPreviewer from './CustomCursorPreviewer';
import ViewportUnitsConverter from './ViewportUnitsConverter';
import DeveloperCheatsheet from './DeveloperCheatsheet';
import AsciiArtGenerator from './AsciiArtGenerator';


// Dynamically import all tool components. For now, most will be ComingSoon.
const toolComponents: { [key: string]: React.ComponentType } = {
  // Existing Tools
  'json-formatter': JsonFormatter,
  'lorem-ipsum-generator': LoremIpsumGenerator,
  'case-converter': CaseConverter,
  'text-cleaner': TextCleaner,
  'word-character-counter': WordCharacterCounter,
  'readability-score-checker': ReadabilityScoreChecker,
  'diff-merge-checker': DiffMergeChecker,
  'base64-encoder-decoder': Base64Converter,
  'url-encoder-decoder': UrlEncoderDecoder,
  'jwt-decoder': JwtDecoder,
  'html-entity-encoder-decoder': HtmlEntityEncoderDecoder,
  'uuid-guid-generator': UuidGenerator,
  'qr-code-generator': QrCodeGenerator,
  'password-generator': PasswordGenerator,
  'hash-generator': HashGenerator,
  'random-data-generator': RandomDataGenerator,
  'markdown-to-html': MarkdownToHtml,
  'html-to-markdown': HtmlToMarkdown,
  'yaml-to-json-converter': YamlToJsonConverter,
  'json-to-yaml-converter': JsonToYamlConverter,
  'csv-to-json-converter': CsvToJsonConverter,
  'epoch-timestamp-converter': EpochTimestampConverter,
  'timezone-converter': TimezoneConverter,
  'iso-date-formatter': IsoDateFormatter,
  'unit-converter': UnitConverter,
  'currency-converter': CurrencyConverter,
  'color-picker-palette': ColorPickerPalette,
  'gradient-generator': GradientGenerator,
  'box-shadow-generator': BoxShadowGenerator,
  'border-radius-generator': BorderRadiusGenerator,
  'regex-tester': RegexTester,
  'url-shortener': UrlShortener,
  'meta-tag-previewer': MetaTagPreviewer,
  'http-status-code-lookup': HttpStatusCodeLookup,
  'mime-type-lookup': MimeTypeLookup,
  'dns-whois-lookup': DnsWhoisLookup,
  'ip-geo-lookup': IpGeoLookup,
  'http-header-inspector': HttpHeaderInspector,
  'unicode-inspector': UnicodeInspector,
  'emoji-picker': EmojiPicker,
  'percentage-calculator': PercentageCalculator,
  'loan-calculator': LoanCalculator,

  // Implemented Tools
  'palindrome-checker': PalindromeChecker,
  'text-reverser': TextReverser,
  'whitespace-remover': WhitespaceRemover,
  'simple-calculator': SimpleCalculator,
  'prime-number-checker': PrimeNumberChecker,
  'factorial-calculator': FactorialCalculator,
  'roman-numeral-converter': RomanNumeralConverter,
  'passphrase-generator': PassphraseGenerator,
  'pin-generator': PinGenerator,
  'flip-a-coin': FlipACoin,
  'dice-roller': DiceRoller,
  'age-calculator': AgeCalculator,
  'markdown-live-previewer': MarkdownLivePreviewer,
  'anagram-finder': AnagramFinder,
  'case-counter': CaseCounter,
  'gcd-lcm-calculator': GcdLcmCalculator,
  'binary-decimal-converter': BinaryDecimalConverter,
  'hex-decimal-converter': HexDecimalConverter,
  'number-to-words-converter': NumberToWordsConverter,
  'glassmorphism-generator': GlassmorphismGenerator,
  'base64-image-viewer': Base64ImageViewer,
  'random-picker': RandomPicker,
  'zodiac-finder': ZodiacFinder,
  'neumorphism-generator': NeumorphismGenerator,
  'font-style-previewer': FontStylePreviewer,
  'tailwind-color-generator': TailwindColorGenerator,
  'code-formatter': CodeFormatter,
  'text-diff-highlighter': TextDiffHighlighter,
  'strong-password-evaluator': StrongPasswordEvaluator,
  'alphabetical-sorter': AlphabeticalSorter,
  'duplicate-line-remover': DuplicateLineRemover,
  'letter-counter': LetterCounter,
  'text-to-binary-converter': TextToBinaryConverter,
  'temperature-converter': TemperatureConverter,
  'tip-calculator': TipCalculator,
  'bmi-calculator': BmiCalculator,
  'date-to-day-finder': DateToDayFinder,
  'time-elapsed-counter': TimeElapsedCounter,
  'calendar-event-countdown': CalendarEventCountdown,

  // New Tools (implemented)
  'text-to-emoji-converter': TextToEmojiConverter,
  'days-between-dates-calculator': DaysBetweenDatesCalculator,
  'password-strength-visualizer': PasswordStrengthVisualizer,
  'typing-speed-tester': TypingSpeedTester,
  'name-initials-generator': NameInitialsGenerator,
  'number-pattern-generator': NumberPatternGenerator,
  'scroll-progress-indicator': ScrollProgressIndicator,
  'mirror-text-generator': MirrorTextGenerator,
  'text-encryption-caesar-cipher': TextEncryptionCaesarCipher,
  'html-tag-highlighter': HtmlTagHighlighter,

  // Newest Batch of Tools (placeholders)
  'shadow-to-tailwind-converter': ShadowToTailwindConverter,
  'color-contrast-checker': ColorContrastChecker,
  'responsive-breakpoint-tester': ResponsiveBreakpointTester,
  'sticky-notes': StickyNotes,
  'pixel-to-rem-converter': PixelToRemConverter,
  'viewport-size-checker': ViewportSizeChecker,
  'clipboard-history': ClipboardHistory,
  'favicon-generator': FaviconGenerator,
  'component-screenshot-tool': ComponentScreenshotTool,
  'commit-message-generator': CommitMessageGenerator,
  'folder-structure-visualizer': FolderStructureVisualizer,
  'custom-cursor-previewer': CustomCursorPreviewer,
  'viewport-units-converter': ViewportUnitsConverter,
  'developer-cheatsheet': DeveloperCheatsheet,
  'ascii-art-generator': AsciiArtGenerator,
};

export default toolComponents;

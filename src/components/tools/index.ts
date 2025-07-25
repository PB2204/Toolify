import React from 'react';
import ComingSoon from './ComingSoon';
import Paraphraser from './Paraphraser';
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

// Dynamically import all tool components. For now, most will be ComingSoon.
const toolComponents: { [key: string]: React.ComponentType } = {
  'paraphraser': Paraphraser,
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
  'responsive-tester': ComingSoon,
  'meta-tag-previewer': MetaTagPreviewer,
  'robots-sitemap-generator': ComingSoon,
  'utm-builder': ComingSoon,
  'pwa-icons-generator': ComingSoon,
  'http-status-code-lookup': HttpStatusCodeLookup,
  'cron-expression-builder': ComingSoon,
  'regex-cheat-sheet': ComingSoon,
  'mime-type-lookup': MimeTypeLookup,
  'dns-whois-lookup': DnsWhoisLookup,
  'ip-geo-lookup': IpGeoLookup,
  'ping-visualizer': ComingSoon,
  'http-header-inspector': HttpHeaderInspector,
  'websocket-tester': ComingSoon,
  'unicode-inspector': UnicodeInspector,
  'emoji-picker': EmojiPicker,
  'percentage-calculator': PercentageCalculator,
  'loan-calculator': LoanCalculator,
  'csv-cleaner': ComingSoon,
};

export default toolComponents;

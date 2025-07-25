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

// Dynamically import all tool components. For now, most will be ComingSoon.
const toolComponents: { [key: string]: React.ComponentType } = {
  'paraphraser': Paraphraser,
  'json-formatter': JsonFormatter,
  'lorem-ipsum-generator': LoremIpsumGenerator,
  'case-converter': CaseConverter,
  'text-cleaner': TextCleaner,
  'word-character-counter': WordCharacterCounter,
  'readability-score-checker': ComingSoon,
  'diff-merge-checker': ComingSoon,
  'base64-encoder-decoder': Base64Converter,
  'url-encoder-decoder': UrlEncoderDecoder,
  'jwt-decoder': JwtDecoder,
  'html-entity-encoder-decoder': HtmlEntityEncoderDecoder,
  'uuid-guid-generator': UuidGenerator,
  'qr-code-generator': QrCodeGenerator,
  'password-generator': PasswordGenerator,
  'hash-generator': HashGenerator,
  'random-data-generator': ComingSoon,
  'favicon-generator': ComingSoon,
  'markdown-to-html': MarkdownToHtml,
  'html-to-markdown': ComingSoon,
  'yaml-to-json-converter': YamlToJsonConverter,
  'json-to-yaml-converter': ComingSoon,
  'csv-to-json-converter': ComingSoon,
  'epoch-timestamp-converter': EpochTimestampConverter,
  'timezone-converter': TimezoneConverter,
  'iso-date-formatter': ComingSoon,
  'unit-converter': UnitConverter,
  'currency-converter': ComingSoon,
  'image-compressor': ComingSoon,
  'image-resizer-cropper': ComingSoon,
  'svg-optimizer': ComingSoon,
  'exif-metadata-viewer': ComingSoon,
  'pdf-to-images-converter': ComingSoon,
  'color-picker-palette': ColorPickerPalette,
  'gradient-generator': ComingSoon,
  'box-shadow-generator': ComingSoon,
  'border-radius-generator': ComingSoon,
  'css-playground': ComingSoon,
  'regex-tester': ComingSoon,
  'url-shortener': ComingSoon,
  'responsive-tester': ComingSoon,
  'meta-tag-previewer': ComingSoon,
  'robots-sitemap-generator': ComingSoon,
  'utm-builder': ComingSoon,
  'pwa-icons-generator': ComingSoon,
  'http-status-code-lookup': ComingSoon,
  'cron-expression-builder': ComingSoon,
  'regex-cheat-sheet': ComingSoon,
  'mime-type-lookup': ComingSoon,
  'dns-whois-lookup': ComingSoon,
  'ip-geo-lookup': ComingSoon,
  'ping-visualizer': ComingSoon,
  'http-header-inspector': ComingSoon,
  'websocket-tester': ComingSoon,
  'unicode-inspector': ComingSoon,
  'emoji-picker': ComingSoon,
  'percentage-calculator': ComingSoon,
  'loan-calculator': ComingSoon,
  'pdf-merger-splitter': ComingSoon,
  'csv-cleaner': ComingSoon,
};

export default toolComponents;

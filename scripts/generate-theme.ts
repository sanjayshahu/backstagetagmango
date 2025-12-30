/**
 * Theme Generator Script
 *
 * Parses Figma-exported design tokens and generates:
 * - theme-colors.css: CSS variables for Uniwind
 * - constants/theme/colors.ts: TypeScript color constants
 *
 * Includes:
 * - All Radix color scales (gray, mauve, red, blue, etc.)
 * - Semantic mappings (accent, neutral, error, success, warning, info)
 * - Special colors (background, surface, etc.)
 *
 * Prerequisites:
 * - Place Figma token exports in constants/theme/:
 *   - Light.tokens.json
 *   - Dark.tokens.json
 *   - Backstage.tokens.json (optional)
 *
 * Usage: bun scripts/generate-theme.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const CONSTANTS_DIR = path.join(__dirname, '../constants/theme');
const OUTPUT_CSS = path.join(__dirname, '../theme-colors.css');
const OUTPUT_TS = path.join(CONSTANTS_DIR, 'colors.ts');

// All Radix color scales to extract from Light/Dark.tokens.json
// These are under the "Colors" key
const RADIX_COLORS = [
  'Gray',
  'Mauve',
  'Slate',
  'Sage',
  'Olive',
  'Sand',
  'Gold',
  'Bronze',
  'Brown',
  'Yellow',
  'Amber',
  'Orange',
  'Tomato',
  'Red',
  'Ruby',
  'Crimson',
  'Pink',
  'Plum',
  'Purple',
  'Violet',
  'Iris',
  'Indigo',
  'Blue',
  'Cyan',
  'Teal',
  'Jade',
  'Green',
  'Grass',
  'Lime',
  'Mint',
  'Sky',
];

// Semantic color mappings from Backstage.tokens.json
// Maps our semantic names to paths in Backstage.tokens.json
const SEMANTIC_MAPPINGS = {
  // These come directly from Light/Dark.tokens.json root level
  accent: { source: 'light-dark', path: 'Backstage' },
  'accent-alpha': { source: 'light-dark', path: 'Backstage Alpha' },

  // These come from Backstage.tokens.json with light/dark overrides
  neutral: {
    source: 'backstage',
    path: 'Colors.Neutral.Neutral',
    lightDarkPath: 'Colors.Mauve',
  },
  'neutral-alpha': {
    source: 'backstage',
    path: 'Colors.Neutral.Neutral Alpha',
    lightDarkPath: 'Colors.Mauve Alpha',
  },
  error: {
    source: 'backstage',
    path: 'Colors.Semantic.Error',
    lightDarkPath: 'Colors.Red',
  },
  'error-alpha': {
    source: 'backstage',
    path: 'Colors.Semantic.Error Alpha',
    lightDarkPath: 'Colors.Red Alpha',
  },
  success: {
    source: 'backstage',
    path: 'Colors.Semantic.Success',
    lightDarkPath: 'Colors.Green',
  },
  'success-alpha': {
    source: 'backstage',
    path: 'Colors.Semantic.Success Alpha',
    lightDarkPath: 'Colors.Green Alpha',
  },
  warning: {
    source: 'backstage',
    path: 'Colors.Semantic.Warning',
    lightDarkPath: 'Colors.Amber',
  },
  'warning-alpha': {
    source: 'backstage',
    path: 'Colors.Semantic.Warning Alpha',
    lightDarkPath: 'Colors.Amber Alpha',
  },
  info: {
    source: 'backstage',
    path: 'Colors.Semantic.Info',
    lightDarkPath: 'Colors.Blue',
  },
  'info-alpha': {
    source: 'backstage',
    path: 'Colors.Semantic.Info Alpha',
    lightDarkPath: 'Colors.Blue Alpha',
  },
};

// Special colors (not on 1-12 scale)
const SPECIAL_COLORS = {
  white: 'Variables.Misc.white-to-dark',
  black: 'Variables.Misc.dark-to-white',
  background: 'Backstage.Background',
  backdrop: 'Variables.Misc.backdrop',
  surface: 'Variables.Effects.solid',
  'surface-translucent': 'Variables.Effects.translucent',
};

interface ColorValue {
  $type: 'color';
  $value: {
    hex: string;
    alpha?: number;
  };
}

interface TokenFile {
  [key: string]: unknown;
}

function loadTokenFile(filename: string): TokenFile {
  const filePath = path.join(CONSTANTS_DIR, filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

function getNestedValue(obj: TokenFile, path: string): unknown {
  const parts = path.split('.');
  let current: unknown = obj;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }

  return current;
}

function extractHex(colorValue: ColorValue): string {
  const hex = colorValue.$value.hex;
  const alpha = colorValue.$value.alpha;

  if (alpha !== undefined && alpha < 1) {
    // Convert alpha to hex
    const alphaHex = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, '0')
      .toUpperCase();
    return `${hex}${alphaHex}`;
  }

  return hex;
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function generateTheme(): void {
  console.log('Loading token files...');
  const lightTokens = loadTokenFile('Light.tokens.json');
  const darkTokens = loadTokenFile('Dark.tokens.json');
  const backstageTokens = loadTokenFile('Backstage.tokens.json');

  // Arrays for light and dark theme blocks
  const lightLines: string[] = [];
  const darkLines: string[] = [];
  const staticLines: string[] = [];

  const allColors: Record<
    string,
    Record<string, { light: string; dark: string }>
  > = {};

  // Helper to add color to both theme blocks
  const addColor = (name: string, lightHex: string, darkHex: string) => {
    lightLines.push(`  --color-${name}: ${lightHex};`);
    darkLines.push(`  --color-${name}: ${darkHex};`);
    staticLines.push(`  --color-static-${name}: ${lightHex};`);
  };

  // ============================================
  // 1. Process all Radix colors from Colors.*
  // ============================================
  console.log('\n--- Processing Radix Colors ---');

  for (const colorName of RADIX_COLORS) {
    const cssName = toKebabCase(colorName);
    console.log(`Processing ${colorName} -> ${cssName}...`);

    // Regular scale
    const lightScale = getNestedValue(lightTokens, `Colors.${colorName}`) as
      | Record<string, ColorValue>
      | undefined;
    const darkScale = getNestedValue(darkTokens, `Colors.${colorName}`) as
      | Record<string, ColorValue>
      | undefined;

    if (lightScale && darkScale) {
      allColors[cssName] = {};
      for (let i = 1; i <= 12; i++) {
        const key = String(i);
        const lightColor = lightScale[key];
        const darkColor = darkScale[key];

        if (lightColor && darkColor) {
          const lightHex = extractHex(lightColor);
          const darkHex = extractHex(darkColor);
          addColor(`${cssName}-${i}`, lightHex, darkHex);
          allColors[cssName][key] = { light: lightHex, dark: darkHex };
        }
      }
    }

    // Alpha scale
    const lightAlphaScale = getNestedValue(
      lightTokens,
      `Colors.${colorName} Alpha`,
    ) as Record<string, ColorValue> | undefined;
    const darkAlphaScale = getNestedValue(
      darkTokens,
      `Colors.${colorName} Alpha`,
    ) as Record<string, ColorValue> | undefined;

    if (lightAlphaScale && darkAlphaScale) {
      const alphaName = `${cssName}-alpha`;
      allColors[alphaName] = {};
      for (let i = 1; i <= 12; i++) {
        const key = String(i);
        const lightColor = lightAlphaScale[key];
        const darkColor = darkAlphaScale[key];

        if (lightColor && darkColor) {
          const lightHex = extractHex(lightColor);
          const darkHex = extractHex(darkColor);
          addColor(`${alphaName}-${i}`, lightHex, darkHex);
          allColors[alphaName][key] = { light: lightHex, dark: darkHex };
        }
      }
    }
  }

  // ============================================
  // 2. Process semantic colors
  // ============================================
  console.log('\n--- Processing Semantic Colors ---');

  for (const [semanticName, config] of Object.entries(SEMANTIC_MAPPINGS)) {
    console.log(`Processing semantic: ${semanticName}...`);
    allColors[semanticName] = {};

    let lightScale: Record<string, ColorValue> | undefined;
    let darkScale: Record<string, ColorValue> | undefined;

    if (config.source === 'light-dark') {
      // Direct from Light/Dark.tokens.json root
      lightScale = getNestedValue(lightTokens, config.path) as
        | Record<string, ColorValue>
        | undefined;
      darkScale = getNestedValue(darkTokens, config.path) as
        | Record<string, ColorValue>
        | undefined;
    } else if ('lightDarkPath' in config) {
      // Use lightDarkPath to get actual colors from Light/Dark
      lightScale = getNestedValue(lightTokens, config.lightDarkPath) as
        | Record<string, ColorValue>
        | undefined;
      darkScale = getNestedValue(darkTokens, config.lightDarkPath) as
        | Record<string, ColorValue>
        | undefined;
    }

    if (lightScale && darkScale) {
      for (let i = 1; i <= 12; i++) {
        const key = String(i);
        const lightColor = lightScale[key];
        const darkColor = darkScale[key];

        if (lightColor && darkColor) {
          const lightHex = extractHex(lightColor);
          const darkHex = extractHex(darkColor);
          addColor(`${semanticName}-${i}`, lightHex, darkHex);
          allColors[semanticName][key] = { light: lightHex, dark: darkHex };
        }
      }
    } else {
      console.warn(`  Warning: Could not find colors for ${semanticName}`);
    }
  }

  // ============================================
  // 3. Process special colors
  // ============================================
  console.log('\n--- Processing Special Colors ---');
  const specialColors: Record<string, { light: string; dark: string }> = {};

  for (const [cssName, tokenPath] of Object.entries(SPECIAL_COLORS)) {
    const lightColor = getNestedValue(lightTokens, tokenPath) as
      | ColorValue
      | undefined;
    const darkColor = getNestedValue(darkTokens, tokenPath) as
      | ColorValue
      | undefined;

    if (lightColor && darkColor) {
      const lightHex = extractHex(lightColor);
      const darkHex = extractHex(darkColor);
      addColor(cssName, lightHex, darkHex);
      specialColors[cssName] = { light: lightHex, dark: darkHex };
      console.log(`  ${cssName}: ${lightHex} / ${darkHex}`);
    } else {
      console.warn(`  Warning: Could not find ${tokenPath} for ${cssName}`);
    }
  }

  // Build @theme block for Tailwind v4 utility class generation
  const themeLines: string[] = [];
  for (const [scaleName, scale] of Object.entries(allColors)) {
    for (const step of Object.keys(scale)) {
      themeLines.push(`  --color-${scaleName}-${step}: var(--color-${scaleName}-${step});`);
      themeLines.push(`  --color-static-${scaleName}-${step}: var(--color-static-${scaleName}-${step});`);
    }
  }
  for (const cssName of Object.keys(specialColors)) {
    themeLines.push(`  --color-${cssName}: var(--color-${cssName});`);
    themeLines.push(`  --color-static-${cssName}: var(--color-static-${cssName});`);
  }

  // Build final CSS using standard :root and .dark selectors
  const cssLines: string[] = [
    '/* Auto-generated by scripts/generate-theme.ts */',
    '/* Do not edit manually - regenerate with: bun scripts/generate-theme.ts */',
    '',
    '@custom-variant dark (&:where(.dark, .dark *));',
    '',
    '/* Register colors with Tailwind v4 for utility class generation */',
    '@theme {',
    ...themeLines,
    '}',
    '',
    '/* Color values for light and dark themes */',
    '@layer theme {',
    '  :root {',
    ...lightLines.map(line => '  ' + line),
    '',
    '    /* Static colors (always light mode values, unaffected by theme) */',
    ...staticLines.map(line => '  ' + line),
    '  }',
    '',
    '  .dark {',
    ...darkLines.map(line => '  ' + line),
    '  }',
    '}',
  ];

  // Write CSS file
  const cssContent = cssLines.join('\n');
  fs.writeFileSync(OUTPUT_CSS, cssContent);
  console.log(`\n✓ Generated ${OUTPUT_CSS}`);

  // Count total colors
  let totalColors = 0;
  for (const scale of Object.values(allColors)) {
    totalColors += Object.keys(scale).length;
  }
  totalColors += Object.keys(specialColors).length;
  console.log(`  Total color variables: ${totalColors}`);

  // Generate TypeScript file
  const tsContent = `/**
 * Auto-generated color tokens
 * Do not edit manually - regenerate with: bun scripts/generate-theme.ts
 *
 * Available color scales:
 * - Radix colors: gray, mauve, slate, sage, olive, sand, gold, bronze, brown,
 *   yellow, amber, orange, tomato, red, ruby, crimson, pink, plum, purple,
 *   violet, iris, indigo, blue, cyan, teal, jade, green, grass, lime, mint, sky
 * - Alpha variants: {color}-alpha (e.g., gray-alpha, red-alpha)
 * - Semantic: accent, neutral, error, success, warning, info (+ alpha variants)
 * - Special: white, black, background, backdrop, surface, surface-translucent
 */

export const colors = ${JSON.stringify(allColors, null, 2)} as const;

export const specialColors = ${JSON.stringify(specialColors, null, 2)} as const;

// Type helpers
export type ColorScale = keyof typeof colors;
export type ColorStep = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";

/**
 * Get a specific color value
 * @param scale - The color scale (e.g., "accent", "neutral", "red", "blue")
 * @param step - The step in the scale (1-12)
 * @param theme - The theme ("light" or "dark")
 */
export function getColor(scale: ColorScale, step: ColorStep, theme: "light" | "dark"): string {
  return colors[scale]?.[step]?.[theme] ?? "#000000";
}

/**
 * Radix-style color scale usage guide:
 *
 * 1-2:   App background, subtle background
 * 3-4:   UI element background, hover states
 * 5:     Hovered UI element background
 * 6:     Active/selected state background
 * 7:     Subtle borders, separators
 * 8:     UI element border, focus ring
 * 9:     Solid background (buttons, badges)
 * 10:    Hovered solid background
 * 11:    Low-contrast text
 * 12:    High-contrast text
 */
`;

  fs.writeFileSync(OUTPUT_TS, tsContent);
  console.log(`✓ Generated ${OUTPUT_TS}`);

  console.log('\n✅ Done! Theme files generated successfully.');
  console.log('\nUsage examples:');
  console.log('  <Text className="text-neutral-12">High contrast</Text>');
  console.log('  <Text className="text-gray-11">Gray text</Text>');
  console.log('  <View className="bg-accent-9">Brand button</View>');
  console.log('  <View className="bg-red-3">Error background</View>');
  console.log('  <View className="border-mauve-7">Subtle border</View>');
}

// Run
generateTheme();

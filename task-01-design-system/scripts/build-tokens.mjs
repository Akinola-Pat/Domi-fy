/**
 * build-tokens.mjs
 * Zero-dependency ES module script to convert Figma design tokens to plain CSS custom properties.
 * 
 * Source: task-01-design-system/tokens/design-tokens.json
 * Output: task-01-design-system/css/tokens.css
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Repository root resolution
const repoRoot = resolve(__dirname, '../..');
const tokenPath = resolve(repoRoot, 'task-01-design-system/tokens/design-tokens.json');
const outputPath = resolve(repoRoot, 'task-01-design-system/css/tokens.css');

// MVP Light Roles Mapping (from context/design-system.md)
const MVP_ROLE_DEFINITIONS = [
  { tokenKey: 'primary - light', cssVar: '--color-primary' },
  { tokenKey: 'on-primary', cssVar: '--color-on-primary' },
  { tokenKey: 'primary container', cssVar: '--color-primary-container' },
  { tokenKey: 'on-primary container', cssVar: '--color-on-primary-container' },
  { tokenKey: 'secondary', cssVar: '--color-secondary' },
  { tokenKey: 'on-secondary', cssVar: '--color-on-secondary' },
  { tokenKey: 'error', cssVar: '--color-error' },
  { tokenKey: 'on-error', cssVar: '--color-on-error' },
  { tokenKey: 'error container', cssVar: '--color-error-container' },
  { tokenKey: 'on-error container', cssVar: '--color-on-error-container' },
  { tokenKey: 'success', cssVar: '--color-success' },
  { tokenKey: 'on-success', cssVar: '--color-on-success' },
  { tokenKey: 'warning state', cssVar: '--color-warning' },
  { tokenKey: 'on-warning state', cssVar: '--color-on-warning' },
  { tokenKey: 'surface', cssVar: '--color-surface' },
  { tokenKey: 'on-surface', cssVar: '--color-on-surface' },
  { tokenKey: 'surface variant', cssVar: '--color-surface-variant' },
  { tokenKey: 'on-surface variant', cssVar: '--color-on-surface-variant' },
  { tokenKey: 'surface container', cssVar: '--color-surface-container' },
  { tokenKey: 'outline', cssVar: '--color-outline' },
  { tokenKey: 'outline variant', cssVar: '--color-outline-variant' },
  { tokenKey: 'inverse surface', cssVar: '--color-inverse-surface' },
  { tokenKey: 'inverse on-surface', cssVar: '--color-inverse-on-surface' },
];

// Helper: Convert token name to primitive CSS variable name
// Rule: lowercase, hue word dropped, tone last.
// "primary blue - 40" -> "--primitive-primary-40"
// "neutral variant - 90" -> "--primitive-neutral-variant-90"
function tokenNameToPrimitiveVar(rawName) {
  const parts = rawName.toLowerCase().split('-').map(s => s.trim());
  if (parts.length !== 2) {
    throw new Error(`Unexpected primitive token name format: "${rawName}"`);
  }
  const [namePart, tonePart] = parts;
  // Drop known hue words: blue, gold, green
  const cleanedName = namePart
    .replace(/\bblue\b/g, '')
    .replace(/\bgold\b/g, '')
    .replace(/\bgreen\b/g, '')
    .trim()
    .replace(/\s+/g, '-');

  return `--primitive-${cleanedName}-${tonePart}`;
}

// Helper: Convert hex with potential alpha to 6-digit hex (drop ff alpha suffix)
function cleanHex(hexValue) {
  let hex = hexValue.toLowerCase().trim();
  if (hex.startsWith('#') && hex.length === 9 && hex.endsWith('ff')) {
    hex = hex.slice(0, 7);
  }
  return hex;
}

// Helper: Convert px value to rem (divided by 16)
function pxToRem(px) {
  const rem = px / 16;
  // Format cleanly (e.g. 1 instead of 1.0, 1.5, 0.875)
  return `${Number(rem.toFixed(4))}rem`;
}

// Track state for collision and alias validation
const declaredVariables = new Set();
const variableCollisions = [];
const unresolvedAliases = [];

function registerVariable(varName) {
  if (declaredVariables.has(varName)) {
    variableCollisions.push(varName);
  } else {
    declaredVariables.add(varName);
  }
}

function buildTokens() {
  const rawData = readFileSync(tokenPath, 'utf8');
  const tokens = JSON.parse(rawData);

  const primitiveLines = [];
  const roleLines = [];
  const typeLines = [];
  const shadowLines = [];

  // Map to resolve alias paths: e.g. "primitives.colour palettes.primary.primary.primary blue - 40" -> "--primitive-primary-40"
  const pathToPrimitiveVar = new Map();

  // 1. Process Primitives: colour palettes
  const colourPalettes = tokens?.primitives?.['colour palettes'] || {};
  
  // Recursively find all color tokens in colour palettes
  function extractPaletteTokens(obj, currentPath) {
    for (const [key, val] of Object.entries(obj)) {
      const nextPath = `${currentPath}.${key}`;
      if (val && typeof val === 'object') {
        if (val.type === 'color' && typeof val.value === 'string' && val.value.startsWith('#')) {
          const varName = tokenNameToPrimitiveVar(key);
          registerVariable(varName);
          const hex = cleanHex(val.value);
          pathToPrimitiveVar.set(nextPath, varName);
          primitiveLines.push({
            name: varName,
            value: hex,
            sortKey: nextPath,
          });
        } else {
          extractPaletteTokens(val, nextPath);
        }
      }
    }
  }

  extractPaletteTokens(colourPalettes, 'primitives.colour palettes');

  // Sort primitives deterministically by variable name
  primitiveLines.sort((a, b) => a.name.localeCompare(b.name));

  // 2. Process Colour Roles (23 MVP roles)
  const colourRoles = tokens?.['colour roles'] || {};

  for (const def of MVP_ROLE_DEFINITIONS) {
    const roleToken = colourRoles[def.tokenKey];
    if (!roleToken) {
      unresolvedAliases.push(`Role token key not found in JSON: "${def.tokenKey}"`);
      continue;
    }

    const rawRef = roleToken.value; // e.g. "{primitives.colour palettes.primary.primary.primary blue - 40}"
    const cleanRef = rawRef.replace(/^\{|\}$/g, '').trim();

    const targetPrimitiveVar = pathToPrimitiveVar.get(cleanRef);
    if (!targetPrimitiveVar) {
      unresolvedAliases.push(`Unresolved alias for role "${def.tokenKey}": points to "${cleanRef}"`);
      continue;
    }

    registerVariable(def.cssVar);
    roleLines.push({
      name: def.cssVar,
      value: `var(${targetPrimitiveVar})`,
    });
  }

  // 3. Process Typography (from font section)
  const fontSection = tokens?.font || {};
  registerVariable('--font-family-base');
  typeLines.push({
    name: '--font-family-base',
    value: `'Inter', sans-serif`,
  });

  const fontStyles = Object.keys(fontSection);
  for (const styleName of fontStyles) {
    const styleData = fontSection[styleName];
    const val = styleData?.value;
    if (!val) continue;

    const slug = styleName.toLowerCase().replace(/\s+/g, '-');
    const sizeVar = `--type-${slug}-size`;
    const lineVar = `--type-${slug}-line`;
    const weightVar = `--type-${slug}-weight`;
    const spacingVar = `--type-${slug}-spacing`;

    registerVariable(sizeVar);
    registerVariable(lineVar);
    registerVariable(weightVar);
    registerVariable(spacingVar);

    typeLines.push(
      { name: sizeVar, value: pxToRem(val.fontSize) },
      { name: lineVar, value: pxToRem(val.lineHeight) },
      { name: weightVar, value: `${val.fontWeight}` },
      { name: spacingVar, value: `${val.letterSpacing}px` }
    );
  }

  // 4. Process Effects (Shadows)
  const effectSection = tokens?.effect || {};
  const shadowMapping = [
    { key: 'soft shadow', varName: '--shadow-soft' },
    { key: 'medium shadow', varName: '--shadow-medium' },
    { key: 'hard shadow', varName: '--shadow-hard' },
  ];

  for (const item of shadowMapping) {
    const shadowData = effectSection[item.key];
    if (!shadowData) {
      unresolvedAliases.push(`Shadow effect not found: "${item.key}"`);
      continue;
    }

    registerVariable(item.varName);

    // Layer keys: "0", "1", ...
    const layerKeys = Object.keys(shadowData)
      .filter(k => !isNaN(Number(k)))
      .sort((a, b) => Number(a) - Number(b));

    const layers = layerKeys.map(k => {
      const layer = shadowData[k].value;
      const x = layer.offsetX === 0 ? '0' : `${layer.offsetX}px`;
      const y = layer.offsetY === 0 ? '0' : `${layer.offsetY}px`;
      const blur = layer.radius === 0 ? '0' : `${layer.radius}px`;
      const spread = layer.spread === 0 ? '0' : `${layer.spread}px`;
      const color = layer.color.toLowerCase();
      return `${x} ${y} ${blur} ${spread} ${color}`;
    });

    shadowLines.push({
      name: item.varName,
      value: layers.join(', '),
    });
  }

  // Validation Check: abort if unresolved aliases or collisions exist
  if (variableCollisions.length > 0) {
    console.error('ERROR: CSS variable name collisions detected:');
    for (const col of variableCollisions) {
      console.error(`  - ${col}`);
    }
  }

  if (unresolvedAliases.length > 0) {
    console.error('ERROR: Unresolved aliases detected:');
    for (const unres of unresolvedAliases) {
      console.error(`  - ${unres}`);
    }
  }

  if (variableCollisions.length > 0 || unresolvedAliases.length > 0) {
    process.exit(1);
  }

  // Construct CSS output
  const css = [
    '/*',
    ' * Generated file - do not edit by hand.',
    ' * Source: task-01-design-system/tokens/design-tokens.json',
    ' */',
    '',
    ':root {',
    '  /* -------------------------------------------------------------------------',
    '   * Primitives (Palette tones, 6-digit hex)',
    '   * ------------------------------------------------------------------------- */',
    ...primitiveLines.map(p => `  ${p.name}: ${p.value};`),
    '',
    '  /* -------------------------------------------------------------------------',
    '   * Colour Roles (Light mode MVP)',
    '   * ------------------------------------------------------------------------- */',
    ...roleLines.map(r => `  ${r.name}: ${r.value};`),
    '',
    '  /* -------------------------------------------------------------------------',
    '   * Typography (Font family, type styles)',
    '   * ------------------------------------------------------------------------- */',
    ...typeLines.map(t => `  ${t.name}: ${t.value};`),
    '',
    '  /* -------------------------------------------------------------------------',
    '   * Effects (Box shadows)',
    '   * ------------------------------------------------------------------------- */',
    ...shadowLines.map(s => `  ${s.name}: ${s.value};`),
    '}',
    '',
  ].join('\n');

  // Ensure output directory exists and write tokens.css
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, css, 'utf8');

  // Report counts
  console.log(`Primitives: ${primitiveLines.length}`);
  console.log(`Roles: ${roleLines.length}`);
  console.log(`Type styles: ${fontStyles.length}`);
  console.log(`Shadows: ${shadowLines.length}`);
  console.log(`Unresolved aliases: ${unresolvedAliases.length}`);
}

buildTokens();


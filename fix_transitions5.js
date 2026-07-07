import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// For the main steps, we can just remove `initial=...`, `animate=...`, `exit=...` and `transition=...`
code = code.replace(/initial=\{\{\s*opacity:\s*0\s*\}\}\s*transition=\{\{\s*duration:\s*0\s*\}\}\s*animate=\{\{\s*opacity:\s*1\s*\}\}\s*exit=\{\{\s*opacity:\s*0\s*\}\}/g, '');

// There might be some with y: 20 or x: 20
code = code.replace(/initial=\{\{([^}]+)\}\}\s*transition=\{\{\s*duration:\s*0\s*\}\}\s*animate=\{\{([^}]+)\}\}\s*exit=\{\{([^}]+)\}\}/g, '');

fs.writeFileSync('src/App.tsx', code);

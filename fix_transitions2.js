import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// replace all initial={{ opacity: 0 }} and exit={{ opacity: 0 }} on main page transitions
// with an immediate transition or very fast one.
code = code.replace(/initial=\{\{\s*opacity:\s*0\s*\}\}/g, 'initial={{ opacity: 0 }} transition={{ duration: 0.1 }}');

fs.writeFileSync('src/App.tsx', code);

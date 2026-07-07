import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /className="([^"]+)\s*\$\{textAlign\}"\s*dir=\{textDir\}/g,
  'className={`$1 ${textAlign}`} dir={textDir}'
);

fs.writeFileSync('src/App.tsx', code);

import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/<AnimatePresence mode="wait">/g, '<AnimatePresence>');
code = code.replace(/transition=\{\{\s*duration:\s*0\.3\s*\}\}/g, 'transition={{ duration: 0 }}');

// Let's replace any `initial={{ opacity: 0 }}` with `initial={{ opacity: 0 }}` and a duration: 0.
// Actually, if we just remove opacity transitions entirely, it would be immediate.
// But they want it "fast and smooth" without stagger. "بدون تدريج" means without staggering/gradual, at once.
// So let's make all page transitions very fast.

fs.writeFileSync('src/App.tsx', code);

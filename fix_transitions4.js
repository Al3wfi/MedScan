import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Restore mode="wait" to prevent layout jumping
code = code.replace(/<AnimatePresence>/g, '<AnimatePresence mode="wait">');

// We want duration to be 0 so it's instantaneous. 
// Or duration: 0.01 to be safe with framer-motion.
code = code.replace(/transition=\{\{\s*duration:\s*0\.05\s*\}\}/g, 'transition={{ duration: 0 }}');

// Let's also check if exit={{ opacity: 0 }} is everywhere
// Actually, if transition is duration: 0, it doesn't matter much.

fs.writeFileSync('src/App.tsx', code);

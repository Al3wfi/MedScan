import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The duplicate transition happens where there is already a transition prop.
// Let's just remove ALL transition props.
code = code.replace(/transition=\{\{.*?\}\}/g, '');
// Now add transition={{ duration: 0.05 }} right after exit={{ ... }} or animate={{ ... }}?
// Better: replace <motion.div ... > with <motion.div transition={{ duration: 0.05 }} ... > 
// No, the safest way is to remove all `transition={...}` and then add one after `initial={...}`.

code = code.replace(/transition=\{\{.*?\}\}/g, '');
code = code.replace(/initial=\{\{([^}]+)\}\}/g, 'initial={{$1}} transition={{ duration: 0.05 }}');

fs.writeFileSync('src/App.tsx', code);

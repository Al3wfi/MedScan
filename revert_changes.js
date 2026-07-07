import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Revert dir
code = code.replace(/const dir = lang === "ar" \? "rtl" : "ltr";/g, 'const dir = "ltr";');

// 2. Revert border
code = code.replace(/lg:border-r lg:rtl:border-r-0 lg:rtl:border-l/g, 'lg:border-l lg:rtl:border-l-0 lg:rtl:border-r');

// 3. Revert ArrowLeft
code = code.replace(/<ArrowLeft className=\{`w-6 h-6 \$\{dir === "rtl" \? "rotate-180" : ""\}`\} \/>/g, '<ArrowLeft className="w-6 h-6" />');

// 4. Revert Search
const currentSearch = `<div className={\`absolute inset-y-0 flex items-center pointer-events-none \${dir === 'rtl' ? 'right-0 pr-4' : 'left-0 pl-4'}\`}>
                    <Search className="w-5 h-5 text-slate-400" />
                  </div>`;
const originalSearch = `<div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Search className={\`w-5 h-5 text-slate-400 \${dir === 'rtl' ? 'right-4 left-auto' : 'left-4'}\`} />
                  </div>`;
code = code.replace(currentSearch, originalSearch);

// 5. Revert ltr:pr-2 rtl:pl-2
// They were on:
// <div className="flex items-center justify-between mb-2">
// <div className="flex flex-col gap-2 max-h-[40vh] overflow-y-auto">
code = code.replace('<div className="flex items-center justify-between mb-2">', '<div className="flex items-center justify-between mb-2 ltr:pr-2 rtl:pl-2">');
code = code.replace('<div className="flex flex-col gap-2 max-h-[40vh] overflow-y-auto">', '<div className="flex flex-col gap-2 max-h-[40vh] overflow-y-auto ltr:pr-2 rtl:pl-2">');

fs.writeFileSync('src/App.tsx', code);

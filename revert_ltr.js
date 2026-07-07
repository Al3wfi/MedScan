import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// I'll just use git checkout to be completely safe and accurate if it was a git repo, but it isn't.
// Let me look at the code to put back dir="ltr"

code = code.replace(
  '<div className="flex items-center gap-1 font-bold mt-2">',
  '<div className="flex items-center gap-1 font-bold mt-2" dir="ltr">'
);

code = code.replace(
  'placeholder={t.medicineNamePlaceholder}',
  'placeholder={t.medicineNamePlaceholder}\n                          dir="ltr"'
);

code = code.replace(
  '<div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 max-h-48 overflow-y-auto shadow-xl">',
  '<div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 max-h-48 overflow-y-auto shadow-xl" dir="ltr">'
);

code = code.replace(
  '<div className="text-sm font-medium text-slate-500 line-clamp-1">',
  '<div className="text-sm font-medium text-slate-500 line-clamp-1" dir="ltr">'
);

code = code.replace(
  '<div className="text-xs font-medium text-slate-500">',
  '<div className="text-xs font-medium text-slate-500" dir="ltr">'
);

code = code.replace(
  '<div className="flex gap-2">',
  '<div className="flex gap-2" dir="ltr">'
);


fs.writeFileSync('src/App.tsx', code);

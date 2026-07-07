import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace " er " with "" to clean up that typo
code = code.replace(/ er /g, ' ');
code = code.replace(/ er"/g, '"');
code = code.replace(/"er /g, '"');

// Add font-display to all <h1, <h2, <h3 that don't have it
code = code.replace(/<h([1-3])([^>]*?)className="(.*?)"/g, (match, tag, before, classNames) => {
    if (!classNames.includes('font-display')) {
        return `<h${tag}${before}className="${classNames} font-display"`;
    }
    return match;
});

// Also add font-display to the project name span
code = code.replace(/<span className="font-bold text-sm truncate w-full text-left">/g, '<span className="font-display font-bold text-lg truncate w-full text-left">');

fs.writeFileSync('src/App.tsx', code);

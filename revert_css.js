import fs from 'fs';
let code = fs.readFileSync('src/index.css', 'utf8');

const addedCss = `.report-excel-preview table {
  width: 100%;
  border-collapse: collapse;
}

.report-excel-preview th {
  background-color: #f8fafc;
  font-weight: bold;
  text-align: inherit;
  padding: 0.75rem 1rem;
  border-bottom: 2px solid #e2e8f0;
}

.dark .report-excel-preview th {
  background-color: #0f172a;
  border-bottom: 2px solid #1e293b;
}

.report-excel-preview td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.dark .report-excel-preview td {
  border-bottom: 1px solid #1e293b;
}

.report-excel-preview br {
  display: block;
  content: "";
  margin-top: 0.5rem;
}

.report-excel-preview font {
  display: inline-block;
  margin-top: 0.25rem;
}`;

code = code.replace(addedCss, '');

fs.writeFileSync('src/index.css', code);

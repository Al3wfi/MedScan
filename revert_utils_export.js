import fs from 'fs';
let code = fs.readFileSync('src/utils.ts', 'utf8');

const replacePDFEnd = `    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(\`medicines_\${new Date().toISOString().split("T")[0]}.pdf\`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  } finally {
    document.body.removeChild(tableContainer);
  }
  return true;
}`;

const targetPDFEnd = `    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    const filename = \`medicines_\${new Date().toISOString().split("T")[0]}.pdf\`;
    const blob = pdf.output('blob');
    const dataUrl = pdf.output('datauristring');
    return { blob, filename, dataUrl };
  } catch (error) {
    console.error("Error generating PDF:", error);
    return null;
  } finally {
    document.body.removeChild(tableContainer);
  }
}`;

code = code.replace(targetPDFEnd, replacePDFEnd);

const replacePDFStart = `export async function exportToPDF(
  medicines: Medicine[],
  lang: Language = "ar",
  employeeName?: string,
  projectName?: string,
): Promise<boolean> {
  if (medicines.length === 0) return false;`;

const targetPDFStart = `export async function generatePDFData(
  medicines: Medicine[],
  lang: Language = "ar",
  employeeName?: string,
  projectName?: string,
): Promise<{ blob: Blob, filename: string, dataUrl: string } | null> {
  if (medicines.length === 0) return null;`;

code = code.replace(targetPDFStart, replacePDFStart);

const replaceCSVStart = `export function exportToCSV(
  medicines: Medicine[],
  lang: Language = "ar",
): boolean {
  if (medicines.length === 0) return false;`;

const targetCSVStart = `export function generateExcelData(
  medicines: Medicine[],
  lang: Language = "ar",
): { blob: Blob, filename: string, html: string } | null {
  if (medicines.length === 0) return null;`;

code = code.replace(targetCSVStart, replaceCSVStart);

const replaceCSVEnd = `  const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    \`\${t.csvFilename}_\${new Date().toISOString().split("T")[0]}.xls\`,
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
}`;

const targetCSVEnd = `  const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" });
  const filename = \`\${t.csvFilename}_\${new Date().toISOString().split("T")[0]}.xls\`;
  return { blob, filename, html };
}`;

code = code.replace(targetCSVEnd, replaceCSVEnd);

fs.writeFileSync('src/utils.ts', code);

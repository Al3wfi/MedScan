import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Update imports from utils
code = code.replace(
  '  generateExcelData,\n  generatePDFData,',
  '  exportToCSV,\n  exportToPDF,'
);

// Remove icons from lucide-react import
code = code.replace(
  '  Search,\n  Share2,\n  Eye,\n  X,\n  Loader2\n} from "lucide-react";',
  '  Search,\n} from "lucide-react";'
);

// Remove state for preview
const stateCode = `  const [previewReport, setPreviewReport] = useState<{
    type: 'pdf' | 'excel';
    data: { blob: Blob, filename: string, dataUrl?: string, html?: string };
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);\n`;

code = code.replace(stateCode, '');

// Remove shareActionCode
const shareActionCode = `
  const handleShare = async () => {
    if (!previewReport) return;
    const { blob, filename } = previewReport.data;
    const file = new File([blob], filename, { type: blob.type });

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: t.appTitle,
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      // Fallback to download
      handleDownload();
    }
  };

  const handleDownload = () => {
    if (!previewReport) return;
    const { blob, filename } = previewReport.data;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
`;

code = code.replace(shareActionCode, '');

// Revert export buttons
const replaceExportButtons = `<button
                          disabled={isGenerating}
                          onClick={async () => {
                            setIsGenerating(true);
                            const data = generateExcelData(medicines, lang);
                            setIsGenerating(false);
                            if (!data) {
                              showError(t.noDataToExport);
                            } else {
                              setPreviewReport({ type: 'excel', data });
                            }
                          }}
                          className="flex items-center justify-center space-x-2 space-x-reverse bg-slate-900 dark:bg-slate-800 text-white dark:text-white px-4 py-3 font-bold text-xs uppercase  hover:bg-slate-800 dark:hover:opacity-90 transition-colors rounded-2xl disabled:opacity-50"
                        >
                          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin rtl:ml-2 ltr:mr-2" /> : <Eye className="w-4 h-4 rtl:ml-2 ltr:mr-2" />}
                          <span>{t.exportToExcel}</span>
                        </button>
                        <button
                          disabled={isGenerating}
                          onClick={async () => {
                            setIsGenerating(true);
                            // Set a small timeout to allow UI to show loader
                            setTimeout(async () => {
                              const data = await generatePDFData(
                                medicines,
                                lang,
                                employeeName,
                                currentProject?.name
                              );
                              setIsGenerating(false);
                              if (!data) {
                                showError(t.noDataToExport);
                              } else {
                                setPreviewReport({ type: 'pdf', data });
                              }
                            }, 50);
                          }}
                          className="flex items-center justify-center space-x-2 space-x-reverse border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white px-4 py-3 font-bold text-xs uppercase  hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors rounded-2xl disabled:opacity-50"
                        >
                          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin rtl:ml-2 ltr:mr-2" /> : <Eye className="w-4 h-4 rtl:ml-2 ltr:mr-2" />}
                          <span>{t.exportToPDF}</span>
                        </button>`;

const targetExportButtons = `<button
                          onClick={() => {
                            const success = exportToCSV(medicines, lang);
                            if (!success) showError(t.noDataToExport);
                          }}
                          className="flex items-center justify-center space-x-2 space-x-reverse bg-slate-900 dark:bg-slate-800 text-white dark:text-white px-4 py-3 font-bold text-xs uppercase  hover:bg-slate-800 dark:hover:opacity-90 transition-colors rounded-2xl"
                        >
                          <Download className="w-4 h-4 rtl:ml-2 ltr:mr-2" />
                          <span>{t.exportToExcel}</span>
                        </button>
                        <button
                          onClick={async () => {
                            const success = await exportToPDF(
                              medicines,
                              lang,
                              employeeName,
                              currentProject?.name
                            );
                            if (!success) showError(t.noDataToExport);
                          }}
                          className="flex items-center justify-center space-x-2 space-x-reverse border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white px-4 py-3 font-bold text-xs uppercase  hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors rounded-2xl"
                        >
                          <Download className="w-4 h-4 rtl:ml-2 ltr:mr-2" />
                          <span>{t.exportToPDF}</span>
                        </button>`;

code = code.replace(replaceExportButtons, targetExportButtons);

// Remove the modal
const previewModalCode = `
      {/* PREVIEW MODAL */}
      <AnimatePresence>
        {previewReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
              dir={dir}
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-black text-lg">
                  {lang === 'ar' ? 'معاينة التقرير' : 'Report Preview'}
                </h3>
                <button
                  onClick={() => setPreviewReport(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-auto bg-slate-100 dark:bg-slate-900 p-4">
                {previewReport.type === 'pdf' && previewReport.data.dataUrl && (
                  <iframe 
                    src={previewReport.data.dataUrl + '#toolbar=0'} 
                    className="w-full h-full min-h-[50vh] rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white"
                  />
                )}
                {previewReport.type === 'excel' && previewReport.data.html && (
                  <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm report-excel-preview" dangerouslySetInnerHTML={{ __html: previewReport.data.html }} />
                )}
              </div>

              <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3 justify-end bg-white dark:bg-slate-950">
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 px-6 py-3 font-bold uppercase text-xs border-2 border-slate-200 dark:border-slate-800 hover:border-slate-900 dark:hover:border-white transition-colors rounded-2xl"
                >
                  <Download className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'تحميل' : 'Download'}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 px-6 py-3 font-bold uppercase text-xs bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors rounded-2xl"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'مشاركة' : 'Share'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>`;

code = code.replace(previewModalCode, '');

fs.writeFileSync('src/App.tsx', code);

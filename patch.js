const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(
  `    if (scanSource === "new") {
      setActiveStep("edit-medicine");
    } else {
      setActiveStep("confirm-expiry");
    }
  };

  const handleCameraBarcode =`,
  `    if (scanSource === "new") {
      setActiveStep("edit-medicine");
    } else {
      if (initialExpiry && currentMed.expiryDates && currentMed.expiryDates.length > 0) {
        setCurrentMed(prev => ({
          ...prev,
          expiryDates: [...(prev.expiryDates || []), initialExpiry]
        }));
        setCurrentExpiryDate("");
        setActiveStep("edit-medicine");
      } else {
        setActiveStep("confirm-expiry");
      }
    }
  };

  const handleCameraBarcode =`
);
fs.writeFileSync('src/App.tsx', code);

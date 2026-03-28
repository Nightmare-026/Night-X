/**
 * Sovereign-Grade Standardized download utility for Night X Hub.
 * Optimized for Windows, Android, and iOS to ensure reliable "Save As" behavior.
 */

export const downloadBlob = (blob: Blob, fileName: string) => {
    try {
        // Fallback for legacy IE/Edge 
        if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
            return (window.navigator as any).msSaveOrOpenBlob(blob, fileName);
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        
        // Technical Hardening: No 'target' attribute. Using target="_blank" or "_self" 
        // forces the browser to navigate, which strips the 'download' attribute filename 
        // and results in downloaded files being named a generic UUID string (the blob ID).
        link.style.display = "none";
        link.href = url;
        link.download = fileName;
        
        document.body.appendChild(link);
        link.click();
        
        // Remove link immediately to keep DOM clean
        setTimeout(() => {
            if (document.body.contains(link)) {
                document.body.removeChild(link);
            }
        }, 100);

        // CRITICAL FIX: Android DownloadManager needs time to resolve the Blob URL.
        // If we revoke this URL too quickly, Android fails to download or downloads
        // a 0-byte corrupted file. We keep it alive for 60 seconds to ensure the OS has it.
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 60000); 

    } catch (error) {
        console.error("Night X Download Engine Error:", error);
    }
};

export const downloadDataUrl = async (dataUrl: string, fileName: string) => {
    try {
        // Convert DataURL to Blob to ensure maximum file system compatibility and OS hand-off
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        downloadBlob(blob, fileName);
    } catch (error) {
        console.error("Night X Download Engine Error (DataURL):", error);
        
        // Direct string fallback if conversion fails
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = dataUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            if (document.body.contains(link)) document.body.removeChild(link);
        }, 100);
    }
};


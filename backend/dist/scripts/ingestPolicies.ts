// scripts/ingestPolicies.js
import { fileURLToPath } from 'url';
import { loadAndEmbedDocuments } from '../services/embeddingService.js';
import { dirname, resolve } from 'path';
async function ingestPolicies() {
    try {
        // Derive the directory name from import.meta.url
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        // Define the absolute path to the PDF file
        const pdfFilePath = resolve(__dirname, '../../data', 'SOP.pdf');
        try{
            await loadAndEmbedDocuments(pdfFilePath);
            console.log("Documents loaded and embeddings generated successfully.");
        }catch(error) {
            console.log("getting error on embedding of Docs", error);
        }
        
    }
    catch (error) {
        console.error("Error loading and embedding documents:", error);
    }
}
ingestPolicies();
// export { ingestPolicies };

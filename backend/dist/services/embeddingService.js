import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import chromaConfig from "../config/chromaConfig.js";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";
const model = new HuggingFaceTransformersEmbeddings({
    model: "Xenova/all-MiniLM-L6-v2",
});
const loadAndEmbedDocuments = async (filePath) => {
    const loader = new PDFLoader(filePath);
    const docs = await loader.load(); //Document Loader
    // Splitter Function
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 20,
    });
    try {
        //Splitting pdf's Text in multiple Chunks
        const splittedDocs = await splitter.splitDocuments(docs);
        try {
            // Embed splittedDocs
            const embedDocumentsData = await model.embedDocuments(splittedDocs.map((doc) => doc.pageContent));
            const documentIds = splittedDocs.map((doc, index) => `id_${index}`);
            // Add documents with embeddings to the Chroma vector store
            await chromaConfig.addDocuments(splittedDocs, { ids: documentIds });
            // convert the Chroma vector store into a "retriever,
            return chromaConfig.asRetriever(splittedDocs, embedDocumentsData);
        }
        catch (newErr) {
            console.error("Error on splembedding Docs ----->", newErr);
        }
    }
    catch (err) {
        console.error("Error on splitting Docs ----->", err);
    }
};
export { loadAndEmbedDocuments };

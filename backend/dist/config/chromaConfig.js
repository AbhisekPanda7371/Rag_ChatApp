import { Chroma } from "@langchain/community/vectorstores/chroma";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";
import { Constants } from '../Constants.js';
import * as dotenv from "dotenv";
dotenv.config();
const model = new HuggingFaceTransformersEmbeddings({
    model: "Xenova/all-MiniLM-L6-v2",
});
if (!process.env.chroma_URL) {
    console.error("Chroma url is missing here!");
}
const chromaConfig = new Chroma(model, {
    collectionName: Constants.collectionName,
    url: process.env.chroma_URL,
    collectionMetadata: {
        "hnsw:space": "cosine",
    },
});
export default chromaConfig;

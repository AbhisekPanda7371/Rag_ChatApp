import { HuggingFaceInference } from "@langchain/community/llms/hf";
import { RetrievalQAChain } from "langchain/chains";
import chromaConfig from "../config/chromaConfig.js";
import dotenv from "dotenv";
dotenv.config();
if (!process.env.HUGGINGFACE_API_KEY) {
    console.error("HuggingFace API key is missing, please check and process!");
}
// Define a fallback function
// async function fallbackToGoogleVertexAI(query:string) {
//     const client = new VertexAIClient({
//         keyFile: keyFilePath,
//       });
//     const model = new GoogleVertexAI({
//         temperature: 0.7,
//     });
//     // Stream the response from Google Vertex AI
//     const stream = await model.stream(query);
//     let response = '';
//     for await (const chunk of stream) {
//         response += chunk;
//     }
//     return response;
// }
const queryPolicies = async (query) => {
    try {
        const retriever = chromaConfig.asRetriever(); //Return a retriever for querying
        const llmModel = new HuggingFaceInference({
            model: "gpt2",
            apiKey: process.env.HUGGINGFACE_API_KEY,
        });
        const chain = RetrievalQAChain.fromLLM(llmModel, retriever);
        const result = await chain.call({ query });
        // if(!result || !result.answer) {
        //     //Callback to Google Vertex AI
        //     console.log("No results found in vector Database. Falling back to Google Vertex AI...");
        //     return await fallbackToGoogleVertexAI(query);
        // }
        return result;
    }
    catch (error) {
    }
    return;
};
export { queryPolicies };

import { AxiosResponse } from "axios";

interface CallbackFunction {
    (results: any): void;
}

const bingAPIKey = process.env.BING_API_KEY;
const bingEndpoint = process.env.BING_ENDPOINT;

export function bingFallback(query: string, callback: CallbackFunction) {
    

}
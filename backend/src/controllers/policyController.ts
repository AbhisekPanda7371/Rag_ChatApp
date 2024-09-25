import { queryPolicies } from "../services/queryService.js";

const getPolicyAnswer = async (req:any, res:any) => {
    try {
        const query = req.body.message;
        console.log("Query:------------>", req)
        const result = await queryPolicies(query);
        res.json({ question: query, answer: result.text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve policy information." });
    }
};

export { getPolicyAnswer };
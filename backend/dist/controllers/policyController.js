import { queryPolicies } from "../services/queryService.js";
const getPolicyAnswer = async (req, res) => {
    try {
        const query = req.body.message;
        const result = await queryPolicies(query);
        console.log("result:------------>", result);
        res.json({ question: query, answer: result.text });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve policy information." });
    }
};
export { getPolicyAnswer };

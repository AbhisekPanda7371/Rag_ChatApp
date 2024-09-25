// const express = require('express');
// const bodyParser = require('body-parser');
// const policyRoutes = require('./routes/policyRoutes');
// const cors = require('cors');
// const app = express();
// // Enable CORS for all routes
// app.use(cors());
// app.use(bodyParser.json());
// app.use('/api/policies', policyRoutes);
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import policyRoutes from "./routes/policyRoutes.js";
import cors from 'cors';
import { ingestPolicies } from "./scripts/ingestPolicies.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
await ingestPolicies();
app.use("/api/policies", policyRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

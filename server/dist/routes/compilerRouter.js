"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilerRouter = void 0;
const express_1 = __importDefault(require("express"));
const node_worker_threads_1 = require("node:worker_threads");
exports.compilerRouter = express_1.default.Router();
exports.compilerRouter.post("/run", (req, res) => {
    const { language, code, input } = req.body;
    const cleanedInput = input.replace(/^\s+/gm, '').replace(/\s+/g, ' ');
    // console.log("ioeqdinqeod");
    if (!code || !code.length || !language.length) {
        return res.status(200).json({ success: false, message: "Code cannot be blank!" });
    }
    if (node_worker_threads_1.isMainThread) {
        const worker = new node_worker_threads_1.Worker(__dirname + '/../workers/worker.js');
        worker.postMessage({ cleanedInput, code, language });
        worker.on('message', (output) => {
            worker.terminate();
            return res.status(output.statusCode).json(output);
        });
    }
});

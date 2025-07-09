"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const compilerController_1 = require("../controllers/compilerController");
worker_threads_1.parentPort?.on('message', async (data) => {
    let res = await (0, compilerController_1.runCode)(data);
    worker_threads_1.parentPort?.postMessage(res);
});

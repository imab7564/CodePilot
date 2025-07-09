"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_child_process_1 = require("node:child_process");
const path_1 = __importDefault(require("path"));
const cppCompiler = (input, file) => {
    return new Promise((resolve, reject) => {
        try {
            const executableFileName = path_1.default.resolve(path_1.default.resolve() + "/runEnv/exe/a.exe");
            (0, node_child_process_1.exec)(`g++ -o ${executableFileName} ${file} `, (error, stdout, stderr) => {
                if (error) {
                    resolve({
                        success: true,
                        error: true,
                        message: "Compilation error",
                        data: error?.message || "Compilation Error",
                        time: 0,
                        statusCode: 200,
                    });
                }
                if (stderr) {
                    resolve({
                        success: true,
                        error: true,
                        message: "Runtime error",
                        data: error?.message || "Runtime Error",
                        time: 0,
                        statusCode: 200,
                    });
                }
                //execute .exe file
                const childProcess = (0, node_child_process_1.spawn)(`${executableFileName}`);
                let time = Date.now();
                let outputData = "";
                setTimeout(() => {
                    childProcess.kill();
                    resolve({
                        success: true,
                        error: true,
                        message: "Execution Time Out",
                        data: outputData.toString(),
                        time: 1000,
                        statusCode: 200,
                    });
                }, 1000);
                if (input.length)
                    childProcess.stdin.end(input);
                childProcess.stdout.on("data", (data) => {
                    if (outputData.length < 5000)
                        outputData += data;
                });
                childProcess.stdout.on("close", () => {
                    resolve({
                        success: true,
                        error: false,
                        data: outputData.toString(),
                        time: Date.now() - time,
                        message: "Run successfully",
                        statusCode: 200,
                    });
                });
                childProcess.stderr.on("data", (data) => {
                    resolve({
                        success: true,
                        error: true,
                        message: "Execution error",
                        data: data.toString(),
                        time: 0,
                        statusCode: 200,
                    });
                });
            });
        }
        catch (err) {
            resolve({
                success: true,
                error: true,
                message: "Server Error!",
                time: 0,
                data: "Server Error",
                statusCode: 500,
            });
        }
    });
};
exports.default = cppCompiler;

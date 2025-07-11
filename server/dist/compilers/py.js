"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const pyCompiler = (input, file) => {
    return new Promise((resolve, reject) => {
        try {
            const pythonProcess = (0, child_process_1.spawn)('python3', [file]);
            pythonProcess.on('error', (err) => {
                resolve({
                    success: true,
                    error: true,
                    message: err.message,
                    time: 0,
                    data: "Compilation Error",
                    statusCode: 200
                });
            });
            let time = Date.now();
            let outputData = '';
            setTimeout(() => {
                pythonProcess.kill();
                resolve({
                    success: true,
                    error: true,
                    message: 'Execution Time Out',
                    data: outputData.toString(),
                    time: 2000,
                    statusCode: 200
                });
            }, 2000);
            if (input.length)
                pythonProcess.stdin.write(input);
            pythonProcess.stdin.end();
            pythonProcess.stdout.on('data', (data) => {
                if (outputData.length < 5000)
                    outputData += data;
            });
            pythonProcess.on('close', () => {
                resolve({
                    success: true,
                    error: false,
                    message: "Run Successfully",
                    data: outputData.toString(),
                    time: Date.now() - time,
                    statusCode: 200
                });
            });
            pythonProcess.stderr.on('data', (data) => {
                outputData += Buffer.from("STD-Error\n");
                outputData += data;
            });
        }
        catch (err) {
            resolve({
                success: true,
                error: true,
                message: 'Server Error!',
                data: "Server Error",
                time: 0,
                statusCode: 500
            });
        }
    });
};
exports.default = pyCompiler;

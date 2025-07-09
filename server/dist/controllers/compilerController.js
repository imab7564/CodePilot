"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCode = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cpp_1 = __importDefault(require("../compilers/cpp"));
const py_1 = __importDefault(require("../compilers/py"));
const java_1 = __importDefault(require("../compilers/java"));
const c_1 = __importDefault(require("../compilers/c"));
const extensionMapper = (language) => {
    switch (language) {
        case "c":
            return ".c";
        case "cpp":
            return ".cpp";
        case "python":
            return '.py';
        case "java":
            return '.java';
        default:
            return ".txt";
    }
};
const runCode = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const { cleanedInput, code, language } = data;
            const codeFileName = path_1.default.resolve(path_1.default.resolve() + '/runEnv/code/Main' + extensionMapper(language));
            let wsCode = fs_1.default.createWriteStream(codeFileName);
            wsCode.write(code);
            wsCode.end();
            wsCode.on('close', async () => {
                let result;
                if (language === 'cpp') {
                    result = await (0, cpp_1.default)(cleanedInput, codeFileName);
                }
                else if (language === 'c') {
                    result = await (0, c_1.default)(cleanedInput, codeFileName);
                }
                else if (language === 'python') {
                    result = await (0, py_1.default)(cleanedInput, codeFileName);
                }
                else if (language === 'java') {
                    result = await (0, java_1.default)(cleanedInput, codeFileName);
                }
                else {
                    result = {
                        success: true,
                        error: true,
                        message: "Unsupported Language",
                        data: "Unsupported Language",
                        time: 0,
                        statusCode: 200
                    };
                }
                resolve(result);
            });
            wsCode.on('error', (err) => {
                reject({
                    success: false,
                    data: "Server Error",
                    message: "Error saving code",
                    error: true,
                    time: 0,
                    statusCode: 500
                });
            });
        }
        catch (error) {
            reject({
                success: false,
                data: "Server Error",
                message: "Error saving code",
                error: true,
                time: 0,
                statusCode: 500
            });
        }
    });
};
exports.runCode = runCode;

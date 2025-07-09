"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compilerRouter_1 = require("./routes/compilerRouter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const node_path_1 = __importDefault(require("node:path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(node_path_1.default.resolve(__dirname + '/../../client/dist/')));
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:5173", "https://codyssey-ide.vercel.app/"],
}));
app.use("/compiler", compilerRouter_1.compilerRouter);
app.use('/', (req, res) => {
    res.sendFile(node_path_1.default.resolve(__dirname + '/../../client/dist/index.html'));
});
app.listen(4320, () => {
    console.log("http://localhost:4320");
});

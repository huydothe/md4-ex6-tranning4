"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const responseTime_1 = require("./src/middleware/responseTime");
const axios_1 = __importDefault(require("axios"));
const router_1 = __importDefault(require("./src/router/router"));
const port = 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(responseTime_1.responseTime);
app.get('/', async (req, res) => {
    try {
        const url = 'https://pokeapi.co/api/v2/ability/?limit=100&offset=0';
        const response = await axios_1.default.get(url);
        const data = response.data;
        if (data) {
            res.status(200).json({
                data: data
            });
        }
        else {
            res.end("<h2>Error</h2>");
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Error'
        });
    }
});
app.use(router_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map
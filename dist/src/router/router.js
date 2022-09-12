"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const on_headers_1 = __importDefault(require("on-headers"));
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
router.use((req, res, next) => {
    let start = new Date().getTime();
    (0, on_headers_1.default)(res, () => {
        let duration = new Date().getTime() - start;
        console.log("Router-level middleware url: " + req.url + " có duration " + duration + "ms");
    });
    next();
});
router.get('/pokemon/list', async (req, res) => {
    try {
        const url = 'https://pokeapi.co/api/v2/ability/?limit=100&offset=0';
        const response = await axios_1.default.get(url);
        const data = response.data;
        if (data) {
            res.status(200).json({ data: data });
        }
        else {
            res.end('<h1>Error<h1>');
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
exports.default = router;
//# sourceMappingURL=router.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const express = require("express");
const assets = path_1.join(__dirname, '..', '..', 'assets');
const app = express();
app.use('/assets', express.static(assets));
app.get('*', (_req, res) => {
    res.sendFile(path_1.join(assets, 'index.html'));
});
app.listen(3000, function () {
    console.log('listening on *:3000');
});
//# sourceMappingURL=index.js.map
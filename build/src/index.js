"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const kafkaMessage_1 = __importDefault(require("./controllers/kafkaMessage"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const jsonParser = body_parser_1.default.json();
app.post("/send", jsonParser, kafkaMessage_1.default.sendMessageKafka);
const kafkaConfig = new config_1.default();
kafkaConfig.consume("my-topic", (value) => {
    console.log(`Received message ${value}`);
});
app.listen(8080, () => {
    console.log(`Listen in the port 8080`);
});

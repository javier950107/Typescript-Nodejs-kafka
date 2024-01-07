"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
class KafkaConfig {
    constructor() {
        this.kafka = new kafkajs_1.Kafka({
            clientId: "nodejs-kafka",
            brokers: ["localhost:9092"],
        });
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: "test-group" });
    }
    produce(topic, messages) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.producer.connect();
                yield this.producer.send({
                    topic: topic,
                    messages: messages,
                });
            }
            catch (error) {
                console.error(error);
            }
            finally {
                yield this.producer.disconnect();
            }
        });
    }
    consume(topic, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.consumer.connect();
                yield this.consumer.subscribe({ topic: topic, fromBeginning: true });
                yield this.consumer.run({
                    eachMessage: ({ message }) => __awaiter(this, void 0, void 0, function* () {
                        const value = message.value.toString();
                        callback(value);
                    }),
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.default = KafkaConfig;

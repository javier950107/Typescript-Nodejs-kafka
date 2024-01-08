import { Kafka } from "kafkajs";
import { DataMessages } from "../types";

class KafkaConfig {

    private kafka:any;
    private producer: any;
    private consumer: any;

    constructor() {
        this.kafka = new Kafka({
            clientId: "nodejs-kafka",
            brokers: ["localhost:9092"],
        });
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: "test-group" });
    }

    async produce(topic:string, messages:DataMessages[]) {
        try {
            await this.producer.connect();
            await this.producer.send({
                topic: topic,
                messages: messages,
            });
        } catch (error) {
            console.log(error);
        } finally {
            await this.producer.disconnect();
        }
    }

    async consume(topic:string, callback: (value:string)=>void) {
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic: topic, fromBeginning: true });
            await this.consumer.run({
                eachMessage: async ({ message } : {topic:string, partition:string, message:any}) => {
                    const value = message.value.toString();
                    callback(value);
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default KafkaConfig;
import express from "express";
import KafkaConfig from "./config/config";
import kafkaMessage from "./controllers/kafkaMessage";
import bodyParser from "body-parser";

const app = express();
const jsonParser = bodyParser.json();

app.post("/send",jsonParser,kafkaMessage.sendMessageKafka);

const kafkaConfig = new KafkaConfig();
kafkaConfig.consume("my-topic", (value:string)=>{
  console.log(`Received message ${value}`);
});

app.listen(8080, ()=>{
    console.log(`Listen in the port 8080`);
});
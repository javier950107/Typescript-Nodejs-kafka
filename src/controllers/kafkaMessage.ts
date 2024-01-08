import KafkaConfig from "../config/config";
import { Request, Response } from "express";

const sendMessageKafka = async (req:Request, res:Response) =>{
    try{
        const {message} = req.body;
        const kafkaConfig = new KafkaConfig();
        const messages = [{key: "key1", value:message}];
        kafkaConfig.produce("my-topic", messages);

        res.status(200).json({
            status: "Ok",
            message : "Success!!"
        });

    }catch(err){
        console.log(err);
    }
}

const messageKafka = (req: Request, res : Response) => {
    try {
        const {message} = req.body;
        const upperCase : string = message.toUpperCase();

        res.status(200).json({
            status : 1,
            msg : "Success!",
            data : upperCase
        });

    } catch (err) {
        console.log(err);
    }
}

export default{
    sendMessageKafka,
    messageKafka
}
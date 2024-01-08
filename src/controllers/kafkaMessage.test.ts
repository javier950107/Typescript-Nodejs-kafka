import kafkaMessage from "./kafkaMessage";
import { Request , Response } from "express";

describe("SendMessageKafka give an response", ()=>{
    it("should response with message", async()=>{
        //Given
        const message : string = "Hola";
        const req = {
            body :{
                message : message
            }
        } as Request;

        const res = {
            "status": jest.fn().mockReturnThis(),
            "json" : jest.fn()
        } as unknown as Response

        //When
        kafkaMessage.messageKafka(req, res);

        //Then
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status : 1,
            msg : "Success!",
            data : message.toUpperCase()
        });

    })
})
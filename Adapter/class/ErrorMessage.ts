import { IErrorMessage } from "../interface/ErrorMessage";

export class ErrorMessage implements IErrorMessage{
    public sendError(message: string){
        return message
    }
}
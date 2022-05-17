import { ISuccessMessage } from "../interface/SuccessMessage";

export class SuccessMessage implements ISuccessMessage{
    public sendSuccessMessage(message: string){
        return {success: true, message}
    }
}
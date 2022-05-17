import { IErrorMessage } from '../interface/ErrorMessage';
import {SuccessMessage} from './SuccessMessage';
import {ErrorMessage} from './ErrorMessage'
export class Message implements SuccessMessage{
    sendSuccessMessage(message: string){
        return {
            success: true, 
            message
        }
    }
    sendErrorMessage(message: string){
        return {
            success: false,
            message: new ErrorMessage().sendError(message)
        }
    }
}
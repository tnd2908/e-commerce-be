import express from 'express'
import { Router, RequestHandler, Request, Response, NextFunction} from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'

type UploadedFile = fileUpload.UploadedFile;

export const uploadRouter: Router = express.Router()

function isSingleFile(file: UploadedFile | UploadedFile[]): file is UploadedFile {
    return typeof file === 'object' && (file as UploadedFile).name !== undefined;
}

function isFileArray(file: UploadedFile | UploadedFile[]): file is UploadedFile[] {
    return Array.isArray(file);
}

const uploadHandler: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.files === 'object') {
        const file = req.files.file;
        if (isSingleFile(file)) {
            file.mv(path.join(__dirname, '/../public/')+ file.name, err => {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Fail to upload',
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: 'Uploaded successful',
                    image: file.name
                })
            });
        }

        if (isFileArray(file)) {
            console.log(file[0].name);
            file[0].mv(path.join(__dirname, '/../public/')+ file[0].name, err => {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Fail to upload'
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: 'Uploaded successful',
                    image: file.map(image=> image.name)
                })
            });
        }

        const fileList = req.files.fileList;
        if (Array.isArray(fileList)) {
            for (const file of fileList) {
                console.log(file.name);
            }
        }
    }
};

uploadRouter.post('/', uploadHandler)
uploadRouter.get('/:name', (req: Request, res:Response)=>{
    const {name} = req.params
    return res.sendFile(path.join(__dirname, '/../public/')+name)
})
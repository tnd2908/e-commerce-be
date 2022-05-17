import { Request, Response, NextFunction } from "express";
import News from "../Model/news";

class NewsController {
    public static async AddNewsController(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body;
            const mappingData = {
                title: data?.title || "",
                description: data?.description || "",
                content: data?.content || "",
                author: data?.author || "",
                status: data?.status || 1
            }

            News.create(mappingData).then(() => {
                res.status(200).json({
                    message: "Add new success"
                })
            });
            
        } catch(e) {
            console.log(e);
            res.status(400).json({
                message: "Add new failed"
            })
        }
    }

    public static async GetListNewsController(req: Request, res: Response, next: NextFunction) {
        try {
            const filterParams = req.query;
            // const mappingFilters = {
            //     title: filterParams?.title || "",
            //     status: filterParams?.status || 1,
            //     created_at: filterParams?.created_at || "",
            //     updated_at: filterParams?.updated_at || ""
            // }
            const result = await News.find(req.query);
            res.status(200).json({
                message: "Get news success",
                result
            })
        } catch(e) {
            console.log(e);
            res.status(400).json({
                message: "Get news failed"
            })
        }
    }

    public static async GetDetailNewsController(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const result = await News.findById(id);
            res.status(200).json({
                message: "Get news success",
                result
            })
        } catch(e) {
            console.log(e);
            res.status(400).json({
                message: "Get news failed"
            })
        }
    }
}

export default NewsController;
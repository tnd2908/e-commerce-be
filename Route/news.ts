import { Router } from "express";
import NewsController from "../Controller/newsControll";

const newsRouter: Router = Router();

newsRouter.post("/", NewsController.AddNewsController);
newsRouter.get("/", NewsController.GetListNewsController);
newsRouter.get("/detail/:id", NewsController.GetDetailNewsController);

export default newsRouter;
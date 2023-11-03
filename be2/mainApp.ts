import { Application, Request, Response } from "express";
import todo from "./router/todoRouter";

export const mainApp = (app: Application) => {
  try {
    app.use("/api/v1", todo);
    app.get("/", (req: Request, res: Response): Response => {
      try {
        return res.status(200).json({
          message: "Entry to my server...!",
        });
      } catch (error) {
        return res.status(404).json({
          message: "Errror",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

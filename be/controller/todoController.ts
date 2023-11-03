import { Response, Request } from "express";
import { client, db } from "../utils/dbConfig";
import { todoModel } from "../model/todoModel";
import moment from "moment";
import { ObjectId } from "mongodb";

export const createTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await client.connect();
    const { task, timer } = req.body;

    let newTime = timer * 1000;
    // let newTime = timer * 86400000;

    let time = new Date().getTime() + newTime;

    let createdAt = moment(new Date().getTime()).format("LLL");
    let achievedAt = moment(time).format("LLL");
    let achieved = null;

    let todo: any = new todoModel(task, achieved, createdAt, achievedAt);

    let timmer = setTimeout(async () => {
      await db.updateOne(
        { _id: new ObjectId(todo._id) },
        { $set: { achieved: true } }
      );
      clearTimeout(timmer);
    }, newTime);

    await db.insertOne(todo);

    return res.status(201).json({
      message: "creating todo",
      data: todo,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating",
    });
  }
};

export const readAllTodos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await client.connect();

    let todo = await db.find().toArray();

    return res.status(201).json({
      message: "find todo",
      data: todo,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating",
    });
  }
};

export const readTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await client.connect();

    const { todoID } = req.params;

    let todo = await db.findOne({ _id: new ObjectId(todoID) });

    return res.status(201).json({
      message: "creating todo",
      data: todo,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating",
    });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await client.connect();

    const { todoID } = req.params;

    let findTodo: any = await db.findOne({ _id: new ObjectId(todoID) });

    if (findTodo.achieved) {
      return res.status(200).json({
        message: "time for Editing has passed",
      });
    } else {
      let todo = await db.updateOne(
        { _id: new ObjectId(todoID) },
        { $set: { done: true } }
      );
      return res.status(201).json({
        message: "updating todo",
        data: todo,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating",
    });
  }
};

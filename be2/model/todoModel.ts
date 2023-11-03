import { Document, Schema, model } from "mongoose";
import { iTodo } from "../utils/interfaces";

export interface iTodoData extends iTodo, Document {}

// schema
const todoModel = new Schema<iTodoData>(
  {
    task: {
      type: String,
    },
    achieved: {
      type: String || null,
      default: null,
    },
    deadLine: {
      type: String,
    },
    done: {
      type: String,
      default: "start",
    },
  },
  {
    timestamps: true,
  }
);

// converting it to model
export default model<iTodoData>("todos", todoModel);

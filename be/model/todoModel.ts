import { ObjectId } from "mongodb";

export class todoModel {
  public _id: ObjectId;
  public task: string;
  public done: boolean;
  public createdAt: string;
  public achievedAt: string;
  public achieved: boolean | null;

  constructor(
    task: string,
    achieved: boolean | null,
    createdAt: string,
    achievedAt: string
  ) {
    this._id = new ObjectId();
    this.task = task;
    this.done = false;
    this.achieved = achieved;
    this.achievedAt = achievedAt;
    this.createdAt = createdAt;
  }
}

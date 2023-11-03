import { MongoClient } from "mongodb";

const URL: string = "mongodb://127.0.0.1:27017";

export const client = new MongoClient(URL);

const mainConnection = async () => {
  try {
    await client.connect();
    return "db connected...!!!";
  } catch (error) {
    console.log(error);
  }
};

mainConnection()
  .then((res) => {
    console.log(res);
  })
  .catch(() => {
    console.error();
  })
  .finally(() => {
    client.close();
  });

export const db = client.db("taskedDB").collection("taskes");

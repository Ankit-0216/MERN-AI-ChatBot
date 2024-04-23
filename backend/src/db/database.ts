import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);

    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB Connection Failed", error);
    throw new Error("Cannot connect to MongoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();

    console.log("DB Disconnected");
  } catch (error) {
    console.log("DB Connection Failed", error);
    throw new Error("Cannot Disconnect from MongoDB");
  }
}

export { connectToDatabase, disconnectFromDatabase };

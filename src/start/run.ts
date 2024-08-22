import { Express } from "express";
import { DataSource } from "typeorm";
import { Contact, Project, Worker } from "../entities";

export const runner = async (app: Express) => {
  try {
    const db = new DataSource({
      type: "postgres",
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: [Contact, Project, Worker],
    });

    await db.initialize();

    app.listen(process.env.PORT);
    console.log(`Server is running on port: ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

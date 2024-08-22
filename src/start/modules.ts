import "dotenv/config";
import { Express } from "express";
import contactsRoute from "../routes/contacts.route";
import projectsRoute from "../routes/projects.route";
import workersRoute from "../routes/workers.route";

export const modules = async (app: Express, express: any) => {
  app.use(express.json());
  app.use("/contacts", contactsRoute);
  app.use("/projects", projectsRoute);
  app.use("/workers", workersRoute);
};

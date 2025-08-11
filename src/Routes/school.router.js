import { Router } from "express";

const schoolRouter = Router();

import { addSchool } from "../controllers/school.controller.js";

// Route to add a new school
schoolRouter.post("/addSchool", addSchool);

export default schoolRouter;
import { Router } from "express";

const schoolRouter = Router();

import { addSchool,getAllSchools } from "../controllers/school.controller.js";

// Route to add a new school
schoolRouter.post("/addSchool", addSchool);
schoolRouter.get("/getAllSchools", getAllSchools);

export default schoolRouter;
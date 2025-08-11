import {asyncHandler} from '../utils/asyncHandler.js';
import { connection } from '../db/db.js';
import { schoolSchema } from '../validations/school.validation.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js';

export const addSchool = asyncHandler(async (req, res) => {
    // Validate request body
    const validation = schoolSchema.safeParse(req.body);
   if (!validation.success) {
  const err = validation.error;

  // ZodError.issues is the array of errors
  const errors = err.issues.map(issue => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));

  console.log("Messages:", errors.map(e => e.message)); // ["Address is required"]

  throw new ApiError(400, errors);
}
    // if (!validation.success) {
    //     // console.log("Validation error:", validation.error?.errors[0]?.message);
    //      const errors = validation.error.errors.map((err) => ({
    //   path: err.path.join('.'),
    //   message: err.message,
    // }));
    //     throw new ApiError(400, errorMessage);
    // }

    const { name, address, latitude, longitude } = validation.data;
    // Check if school already exists
           const [existing] = await connection.execute(
        `SELECT id FROM schools WHERE name = ? AND address = ?`,
        [name, address]
    );
    if (existing.length > 0) {
        throw new ApiError(409, "School with this name and address already exists");
    }
   
    const [result] = await connection.execute(
        `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`,
        [name, address, latitude, longitude]
    );



   const [schoolRows] = await connection.execute(
        `SELECT id,name,address FROM schools WHERE id = ?`,
        [result.insertId]
    );
  

    res.status(201).json(new ApiResponse(201,schoolRows[0], "School added successfully",  true));
     
});

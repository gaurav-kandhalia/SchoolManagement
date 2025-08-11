import {asyncHandler} from '../utils/asyncHandler.js';
import {pool} from '../db/db.js';
import { schoolSchema, userCoordinatesSchema } from '../validations/school.validation.js';
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

  console.log("Messages:", errors.map(e => e.message)); 
  throw new ApiError(400, errors);
}


    const { name, address, latitude, longitude } = validation.data;
    // Check if school already exists
           const [existing] = await pool.execute(
        `SELECT id FROM schools WHERE name = ? AND address = ?`,
        [name, address]
    );
    if (existing.length > 0) {
        throw new ApiError(409, "School with this name and address already exists");
    }
   
    const [result] = await pool.execute(
        `INSERT INTO schools (name, address,latitude,longitude) VALUES (?, ?, ?, ?)`,
        [name, address, latitude, longitude]
    );



   const [schoolRows] = await pool.execute(
        `SELECT id,name,address FROM schools WHERE id = ?`,
        [result.insertId]
    );
  

    res.status(201).json(new ApiResponse(201,schoolRows[0], "School added successfully",  true));
     
});


export const getAllSchools = asyncHandler(async (req, res) => {
    const { userLatitude, userLongitude } = req.query;

    // Validate query parameters using Zod
    const validation = userCoordinatesSchema.safeParse({
        latitude: Number(userLatitude),
        longitude: Number(userLongitude)
    });

   if (!validation.success) {
  const err = validation.error;

  // ZodError.issues is the array of errors
  const errors = err.issues.map(issue => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));

  console.log("Messages:", errors.map(e => e.message)); 
  throw new ApiError(400, errors);
}

    const { latitude, longitude } = validation.data;

    const [rows] = await pool.execute(
        `
        SELECT
            id,
            name,
            address,
            ROUND(
                6371 * ACOS(
                    COS(RADIANS(?)) *
                    COS(RADIANS(latitude)) *
                    COS(RADIANS(longitude) - RADIANS(?)) +
                    SIN(RADIANS(?)) *
                    SIN(RADIANS(latitude))
                )
            ) AS distance_km
        FROM schools
        ORDER BY distance_km ASC;
        `,
        [latitude, longitude, latitude]
    );

    if (rows.length === 0) {
        return res.status(200).json(new ApiResponse(200, [], "No schools found", true));
    }

    res.status(200).json(new ApiResponse(200, rows, "Schools retrieved successfully", true));
});
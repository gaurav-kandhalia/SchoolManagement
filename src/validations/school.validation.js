import {z} from 'zod';

export const schoolSchema = z.object({
    name: z.string().min(1, "School name is required"),
    address: z.string().min(1, "Address is required"),
    latitude: z.number().refine(val => Number.isFinite(val), {
        message: "Latitude must be a valid floating number"
    }),
    longitude: z.number().refine(val => Number.isFinite(val), {
        message: "Longitude must be a valid floating number"
    })
});

export const userCoordinatesSchema = z.object({
    latitude: z.coerce.number().refine(val => Number.isFinite(val), {
        message: "Latitude must be a valid floating number"
    }),
    longitude: z.coerce.number().refine(val => Number.isFinite(val), {
        message: "Longitude must be a valid floating number"
    })
});
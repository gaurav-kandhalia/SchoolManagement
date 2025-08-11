# School Locator Project

## Overview
This project provides an API and/or frontend to list schools along with their geographic locations. Users can provide their current coordinates (latitude and longitude) to find nearby schools. The project is built with Node.js, Express (or your backend framework), and can be integrated with a frontend like React or any other client.

## Features
- Store and retrieve school information including name, address, latitude, and longitude.
- Accept user location coordinates as input.
- Return a list of schools (can be filtered or sorted by proximity to the user).
- Easy to extend for features like distance calculations, search, and filtering.

## Sample Data
Example of school data used:
```json
[
  {
    "name": "Greenwood High School",
    "address": "123 Maple Street, Springfield",
    "latitude": 37.2153,
    "longitude": -93.2982
  },
  {
    "name": "Sunrise Elementary School",
    "address": "456 Oak Avenue, Rivertown",
    "latitude": 34.1028,
    "longitude": -118.3267
  }
]
 

 user Coordinates used {
  "latitude": 37.7749,
  "longitude": -122.4194
}


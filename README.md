# School Locator & Management API

## Overview
This project provides a backend API for managing schools and retrieving school data based on user location. Users can add new schools and fetch all schools, sorted by proximity to their coordinates. Built with Node.js, Express, MySQL, and Zod for validation, it is ready for integration with any frontend (e.g., React).

## Live Demo
[https://schoolmanagement-ncvm.onrender.com](https://schoolmanagement-ncvm.onrender.com)

## Features
- Add new schools with name, address, latitude, and longitude.
- Retrieve all schools, sorted by proximity to user coordinates.
- Data validation using Zod.
- Persistent storage with MySQL (hosted on Railway).
- Deployed on Render.

## API Endpoints

### Add a School
`POST https://schoolmanagement-ncvm.onrender.com/api/v1/schools/addSchool`

**Request Body:**
```json
{
  "name": "Greenwood High School",
  "address": "123 Maple Street, Springfield",
  "latitude": 37.2153,
  "longitude": -93.2982
}
```

### Get All Schools by Location
`GET https://schoolmanagement-ncvm.onrender.com/api/v1/schools/getAllSchools?userLatitude=37.7749&userLongitude=-122.4194`

**Response:**
```json
[
  {
    "id": 1,
    "name": "Greenwood High School",
    "address": "123 Maple Street, Springfield",
    "distance_km": 50
  },
  ...
]
```

## Sample Data
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
```

**Sample User Coordinates:**
```json
{
  "latitude": 37.7749,
  "longitude": -122.4194
}
```

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- npm
- MySQL database

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/gaurav-kandhalia/SchoolManagement.git
   cd SchoolManagement
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```
   DB_HOST=your_host
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=your_db
   DB_PORT=your_port
   ```

4. Run the server:
   ```bash
   npm run dev
   ```

## Technologies Used
- Node.js
- Express
- MySQL2
- Zod (validation)
- Railway (database hosting)
- Render (deployment)

## Security Notice
**Do not share your database credentials publicly.**  
Use environment variables and `.env` files to keep sensitive information secure.

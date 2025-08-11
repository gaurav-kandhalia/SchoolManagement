import mysql from "mysql2/promise";

let connection;

const connectDB = async () => {
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "school_management",
            port: process.env.DB_PORT || 3306
        });

        console.log("Database Connected");

        // Create table if not exists
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS schools (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                address VARCHAR(255),
                latitude FLOAT,
                longitude FLOAT
            );
        `);

        console.log("Schools table ready");

        return connection;
    } catch (err) {
        console.error("Error connecting to the database:", err);
        throw err;
    }
};

export default connectDB;
export { connection };

import express from "express";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to the School Management System API");
});



export { app };

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.use((req, res, next) => {
    res.status(404).send('Sorry, can\'t find that!');
    }
);  
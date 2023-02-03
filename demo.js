const express = require("express");

const app = express();

app.use(express.json());

app.listen("8080", () => console.log("connected"));

function NotFoundException(message) {
    this.message = message;
    this.name = "NoFoundException";
}

var cars = [
    {
        name: "BMW",
        color: "Black",
    },
    {
        name: "TATA",
        color: "Silver",
    },
    {
        name: "Jaguar",
        color: "Blue",
    },
    {
        name: "Mercedes",
        color: "Red",
    },
];

app.get("/cars", (req, res) => {
    res.json(cars);
});

app.delete("/cars/:name", (req, res) => {
    const car = cars.find((x) => x.name === req.params.name);
    try {
        if (car) {
            cars = cars.filter((x) => x !== car);
            res.status(200).json({ Message: "Car info cleared." });
        } else {
            throw new NotFoundException("Car not found.");
        }
    } catch (err) {
        res.status(404).json(err);
    }
});

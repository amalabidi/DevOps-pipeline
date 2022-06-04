var express = require("express");
var router = express.Router();
const { Reservation } = require("../models/Reservation");
const { Space } = require("../models/Space");
const Crypto = require("crypto");
router.post("/", async(req, res) => {
    const { date, time, guests, NumberOfHours, AllSpace, spaceId } = req.body;

    try {
        var identity = Crypto.randomBytes(9).toString("hex");
        const reservation = new Reservation({
            date,
            time,
            guests,
            NumberOfHours,
            AllSpace,
            spaceId,
            identity,
        });

        const result = await reservation.save();

        res.send({ success: "done" });
    } catch (e) {
        console.log(e);
        res.send("error:");
    }
});

router.post("/reserv", async(req, res) => {
    const { id } = req.body;

    try {
        var somme = 0;
        var reserv = await Reservation.find({ spaceId: id /*, date: date*/ });

        if (reserv.length == 0) {
            res.send({ error: "reservation doesn't exist" });
        } else {
            const spaces = await Space.find({ _id: id });

            var tab = [{
                capacity: spaces[0].capacity,
                exists: 3,
                reserved: false,
            }, ];

            res.send(tab);
        }
    } catch (e) {
        console.log("eee", e);
    }
});

router.get("/:id", async(req, res) => {
    try {
        console.log(req.params.id);
        const reservations = await Reservation.find({ spaceId: req.params.id });
        console.log("ok");
        res.send(reservations);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

router.delete("/:id", async(req, res) => {
    try {
        console.log(req.params.id);
        const removedReservation = await Reservation.remove({ _id: req.params.id });
        console.log("iikkk");
        res.status(200).json(removedReservation);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

module.exports = router;
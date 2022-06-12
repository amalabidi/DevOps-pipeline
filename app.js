var express = require("express");
var cors = require("cors");

var dotenv = require("dotenv");
var mongoose = require("mongoose");

var usersRouter = require("./routes/users");
var reservationsRouter = require("./routes/reservations");
var spacesRouter = require("./routes/spaces");

var reviewsRouter = require("./routes/reviews");

var app = express();
app.use(cors());
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", usersRouter);
app.use("/spaces", spacesRouter);
app.use("/reservations", reservationsRouter);
app.use("/review", reviewsRouter);
app.use("/uploads", express.static("uploads"));

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
const PORT = process.env.PORT || 5000;
mongoose
    .connect(`mongodb+srv://***@cluster0.d62xefd.mongodb.net/test`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connected to mongodb successfully "))
    .catch((err) => console.log("couldnt connect to mongodb" + err));

mongoose.set("useFindAndModify", false);
app.listen(PORT, () => console.log("listening on port:" + PORT));
module.exports = app;

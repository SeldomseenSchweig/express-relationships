const express = require("express");
const app = express();
const ExpressError = require("./expressError")

//parse request bodies for json
app.use(express.json())

const uRoutes = require("./routes/users")
app.use("/users",uRoutes)
const mRoutes = require("./routes/messages")
app.use("/messages", mRoutes)

// 404 handler

app.use(function(req,res,next){

    const err = new ExpressError("Not Found", 404)

    // pass err to middle error
    return next(err)

})

app.use(function(err, req, res, next){

    let status = err.status || 500;

    // set status and alert user
    return res.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    });
});

app.listen(3000, function () {
    console.log('Server started on 3000');
  });
  


module.exports = app;
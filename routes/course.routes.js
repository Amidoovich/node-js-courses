
    const courses = require("../controllers/course.controller");
    const verifyToken = require("../middlewares/verifyToken");
    const userRoles = require("../utils/userRoles");
    const allowedTo = require("../middlewares/allowedTo");
    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/",verifyToken , allowedTo(userRoles.admin,userRoles.manager) , courses.create);

    // Retrieve all Tutorials
    router.get("/", courses.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", courses.findOne);

    // Update a Tutorial with id
    router.patch("/:id", courses.update);

    // Delete a Tutorial with id
    router.delete("/:id", courses.delete);

    // Create a new Tutorial
    router.delete("/",verifyToken,allowedTo(userRoles.admin,userRoles.manager),courses.deleteAll);

    // app.use('/api/courses', router);
    module.exports = router;

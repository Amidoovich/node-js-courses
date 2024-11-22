module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("course", {
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.STRING
    }
    });
    return Course;
};
// const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Img = sequelize.define('images', {

        typeof_image:{
            type: DataTypes.STRING,
        },
        image_name:{
            type: DataTypes.STRING,
            allowNull:false
        }
    });
    return Img;
}
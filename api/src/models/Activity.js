const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("activity", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allownNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allownNull: false,
        },
        difficulty: {
            type: DataTypes.ENUM("1", "2", "3", "4", "5"),
            allownNull: false,
        },
        durtion: {
            type: DataTypes.STRING,
            allownNull: false,
        },
        season: {
            type: DataTypes.ENUM("Summer", "Spring", "Autum", "Winter")
        }
    })
}
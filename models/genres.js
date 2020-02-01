module.exports = function (sequelize, DataTypes) {

    const Model = sequelize.define('genre', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Model
}
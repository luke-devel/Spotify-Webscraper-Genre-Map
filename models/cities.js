module.exports = function (sequelize, DataTypes) {
    const Model = sequelize.define('city', {
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        region: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        lon: {
            type: DataTypes.DECIMAL,
            allowNull: true
        }
    });
    return Model
}
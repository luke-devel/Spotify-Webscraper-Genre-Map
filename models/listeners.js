module.exports = function (sequelize, DataTypes) {
    const Model = sequelize.define('listener', {
        count: { type: DataTypes.INTEGER, allowNull: false }
    });

    Model.associate = function (models) {
        models.listener.belongsTo(models.genre);
        models.genre.hasMany(models.listener);
        models.listener.belongsTo(models.city);
        models.city.hasMany(models.listener);
    }

    return Model
}
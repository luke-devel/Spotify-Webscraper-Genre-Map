module.exports = function(sequelize,DataTypes){
    const Model = sequelize.define('location', {
        id: {type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
            },
        genreID: {
            type: Sequelize.INTEGER,
            references: 'genres',
            referencesKey: 'id',
            allowNull: true
            },
        cityID: {
            type: Sequelize.INTEGER,
            references: 'cities',
            referencesKey: 'id',
            allowNull: true
            },
        count: {type: Sequelize.INTEGER,allowNull: false}
    },{timestamps: false});
    return Model
}
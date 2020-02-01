module.exports = function(sequelize,DataTypes){
    const Model = sequelize.define('location', {
        id: {type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
            },
        genre: {
            type: DataTypes.STRING, 
            allowNull: false,
            },
        lat: {
            type: DataTypes.DECIMAL, 
            allowNull: false,
            },
        lat: {
            type: DataTypes.DECIMAL, 
            allowNull: false,
            },
        count: {
            type: Sequelize.INTEGER,
            allowNull: false
            }

    },{timestamps: false});
    return Model
}
module.exports = function(sequelize,DataTypes){

    const Model = sequelize.define('genre', {
        id: {type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
            },
        genre1: {type: DataTypes.STRING, 
                allowNull: true
            }
    },{timestamps: false});


    return Model
}
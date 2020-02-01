module.exports = function(sequelize,DataTypes){
    const Model = sequelize.define('location', {
        id: {type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
            },
        country: {type: DataTypes.STRING, 
            allowNull: false
            },
        region: {type: DataTypes.STRING,
            defaultValue: false
            },
        city: {type: DataTypes.STRING, 
            allowNull: false
            },
        lat: {type: DataTypes.DECIMAL, 
            allowNull: false
            },
        lon: {type: DataTypes.DECIMAL,
            allowNull: false
            }
    },{timestamps: false});
    return Model
}
module.exports = function(sequelize,DataTypes){

    const Model = sequelize.define('genre', {
        id: {type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
            },
        // artistID: {type: DataTypes.STRING, 
        //     allowNull: true
        //     },
        genre1: {type: DataTypes.STRING, 
                allowNull: true
            },
        genre2: {type: DataTypes.STRING,
                allowNull: true
            },
        genre3: {type: DataTypes.STRING, 
                allowNull: true
            },
        genre4: {type: DataTypes.STRING, 
                allowNull: true
            },
        genre5: {type: DataTypes.STRING, 
                allowNull: true
            },
        genre6: {type: DataTypes.STRING, 
                allowNull: true
            },
        genre7: {type: DataTypes.STRING, 
                allowNull: true
            },
        genre8: {type: DataTypes.STRING, 
                allowNull: true
            },
        genre9: {type: DataTypes.STRING, 
                allowNull: true
            },
        genre10: {type: DataTypes.STRING, 
                allowNull: true
            },
        genre11: {type: DataTypes.STRING, 
                allowNull: true
            }
    },{timestamps: false});


    return Model
}
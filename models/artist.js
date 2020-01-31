module.exports = function(sequelize,DataTypes){
    const Model = sequelize.define('artist', {
        id: {type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
            },
        artist: {type: DataTypes.STRING, 
            allowNull: false,
            },
        artistID: {type: DataTypes.STRING,
            defaultValue: false,
            allowNull: false
            },
        genreID: {
            type: Sequelize.INTEGER,
            references: 'genres',
            referencesKey: 'id'
            },
        country: {type: DataTypes.STRING,  //array of values
            allowNull: false
            },
        region: {type: DataTypes.STRING, //array of values
            defaultValue: false
            },
        city: {type: DataTypes.STRING,  //array of values
                allowNull: false
            },
        listeners: {type: DataTypes.STRING,  //array of values
                allowNull: false
            }
    },{timestamps: false});
    return Model
}
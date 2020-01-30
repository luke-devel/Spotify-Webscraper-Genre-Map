module.exports = function(sequelize,DataTypes){

    const Genre = sequelize.define('genre', {
        id: {type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
            },
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

    const Artist = sequelize.define('artist', {
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
        locationID: {
            type: Sequelize.INTEGER,
            references: 'locations',
            referencesKey: 'id'
            }
    },{timestamps: false});


    const Location = sequelize.define('location', {
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
        listeners: {type: DataTypes.STRING, 
            allowNull: false
            }
    },{timestamps: false});


const Model = {
    Artist:Artist,
    Genre:Genre,
    Location:Location
}



    return Model
}
module.exports = (sequelize, DataTypes) => {

    const Model = sequelize.define("Spotify", {
        artist_ID: DataTypes.STRING,
        artist_name: DataTypes.STRING,
        artist_genres: DataTypes.STRING,
        country: DataTypes.STRING,
        city: DataTypes.STRING,
        listeners: DataTypes.INTEGER
    })

    return Model;

} 
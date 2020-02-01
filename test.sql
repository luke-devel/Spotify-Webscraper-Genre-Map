SELECT sum(listeners), city, artist_genres FROM spotify_db.Spotifies group by city,artist_genres;

SELECT distinct artist_genres, city, listeners FROM spotify_db.Spotifies;



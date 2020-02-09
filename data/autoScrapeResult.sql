SELECT id, artist_name, artist_genres, city, country, sum(listeners)
FROM spotify_db.spotifies
GROUP BY artist_genres, city
ORDER BY artist_genres, sum(listeners) DESC;

select distinct artist_genres
FROM spotify_db.spotifies
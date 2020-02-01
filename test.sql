SELECT sum(listeners), city, artist_genres FROM spotify_db.Spotifies group by city,artist_genres;

SELECT distinct artist_genres, city, listeners FROM spotify_db.Spotifies;


INSERT INTO cities(city, country, createdAt, updatedAt)
SELECT distinct city, country, now(), now() FROM spotify_db.Spotifies;


-- Fill in genre table
-- Fill in listeners

SELECT 
    count, cities.id as cityId, now(), now()
FROM
    (SELECT sum(listeners) as count, city, country, artist_genres FROM spotify_db.Spotifies group by city, country, artist_genres) a
        INNER JOIN
    cities ON a.city = cities.city
        AND a.country = cities.country;
        
-- add lat long
UPDATE cities a
        INNER JOIN
    cityCoords ON cityCoords.city = a.city
        AND cityCoords.country = a.country 
SET 
    lat = latitude,
    lon = longitude

        

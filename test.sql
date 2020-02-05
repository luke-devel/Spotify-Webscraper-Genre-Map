-- populates city table
INSERT INTO cities
    (city, country, createdAt, updatedAt)
SELECT distinct city, country, now(), now()
FROM spotify_db.Spotifies;

-- add lat long to cities table
UPDATE cities a
        INNER JOIN
    cityCoords ON cityCoords.city = a.city
        AND cityCoords.country = a.country
SET 
    lat = latitude,
    lon = longitude

--populates genres table
INSERT INTO genres
	(name, createdAt, updatedAt)
SELECT DISTINCT artist_genres, now(), now()
FROM Spotifies;

-- -- adds listeners and groups by city/genre
-- SELECT sum(listeners), city, artist_genres
-- FROM Spotifies
-- GROUP BY city, artist_genres;
-- SELECT distinct artist_genres, city, listeners
-- FROM Spotifies;

-- ???
-- SELECT
--     count, cities.id as cityId, now(), now()
-- FROM
--     (SELECT sum(listeners) as count, city, country, artist_genres
--     FROM Spotifies
--     group by city, country, artist_genres) a
--     INNER JOIN
--     cities ON a.city = cities.city
--         AND a.country = cities.country;

-- -- populates listeners table
INSERT INTO listeners
	(count, cityId, genreId, createdAt, updatedAt)
SELECT 
    count, cities.id as cityid, genres.id as genreid, now(), now()
FROM
    (SELECT 
        SUM(listeners) AS count, city, country, artist_genres
    FROM
        Spotifies
    GROUP BY city , country , artist_genres) yonge
        INNER JOIN
    genres ON artist_genres = name
        INNER JOIN
    cities ON cities.city = yonge.city and cities.country = yonge.country        

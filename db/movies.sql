-- sql script 
-- elimina la base de datos para eviar error
DROP DATABASE IF EXISTS moviesdb;
-- Creacion de la base de datos
CREATE DATABASE moviesdb ; 

-- usar
USE moviesdb;

-- crear la tabla movies
CREATE TABLE movie (
    id BINARY(16),
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director VARCHAR (255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(2, 1) UNSIGNED NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE genre (
    id INT AUTO_INCREMENT ,
    genre VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

-- relacion pelicula genero
CREATE TABLE movie_genres (
    movie_id BINARY(16) REFERENCES movie(id),
    genre_id INT REFERENCES genre(id),
    PRIMARY KEY (movie_id, genre_id)
); 

-- agregando generos 
INSERT INTO genre (genre) VALUES 
('Action'),
('Adventure'), 
('Comedy'), 
('Drama'), 
('Crime'), 
('Fantasy'), 
('Horror'), 
('Thriller'), 
('Sci-Fi');

-- agregando peliculas
INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), "Inception", 2010, "Christopher Nolan", 148, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 8.8),
(UNHEX(REPLACE(UUID(), '-', '')), "The Shawshank Redemption", 1994, "Frank Darabont", 142, "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp", 9.3),
(UNHEX(REPLACE(UUID(), '-', '')), "The Dark Knight", 2008, "Christopher Nolan", 152, "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg", 9.0);
 
-- agregando ids en la relacion 
INSERT INTO movie_genres (movie_id, genre_id) VALUES
((SELECT id FROM movie WHERE title = "Inception"), (SELECT id FROM genre WHERE genre = "Action")),
((SELECT id FROM movie WHERE title = "Inception"), (SELECT id FROM genre WHERE genre = "Adventure")),
((SELECT id FROM movie WHERE title = "The Shawshank Redemption"), (SELECT id FROM genre WHERE genre = "Drama")),
((SELECT id FROM movie WHERE title = "The Dark Knight"), (SELECT id FROM genre WHERE genre = "Action")),
((SELECT id FROM movie WHERE title = "The Dark Knight"), (SELECT id FROM genre WHERE genre = "Drama"));

SELECT  HEX(id) AS id, title, year, director, duration, poster, rate FROM movie;
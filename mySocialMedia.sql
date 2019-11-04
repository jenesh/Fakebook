DROP DATABASE IF EXISTS mySocialMedia;

CREATE DATABASE mysocialmedia;

\c mysocialmedia

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    has_posted INT
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id) ON DELETE CASCADE,
    body TEXT
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id) ON DELETE CASCADE,
    post_id INT REFERENCES posts (id) ON DELETE CASCADE
);

-- Adding Mock data for testing

INSERT INTO users(username, password, has_posted) VALUES 
('red', '123', 0),
('blue', '123', 0),
('green', '123', 0),
('orange', '123', 0),
('purple', '123', 0),
('brown', '123', 0);

INSERT INTO posts(user_id, body) VALUES
(1, 'My favorite color is red'),
(2, 'My favorite color is blue'),
(3, 'My favorite color is green'),
(4, 'My favorite color is orange'),
(5, 'My favorite color is purple'),
(1, 'Its so cold outside today!'),
(1, 'Winter is definately not my season'),
(1, 'Next winter im moving to Texas'),
(2, 'Dont you just love the color of the sky?'),
(3, 'Eat your veggies kids!'),
(4, 'Can you guess my favorite fruit?'),
(5, 'Purple rain, purple rainnn.....');

UPDATE users SET has_posted = 1 WHERE id = 1;
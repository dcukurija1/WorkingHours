CREATE TABLE hours (
	id SERIAL PRIMARY KEY,
	user_is INT,
	date VARCHAR(300),
	duration FLOAT,
	report VARCHAR(500)
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email VARCHAR(255),
	password VARCHAR(255),
	name VARCHAR(30)
);
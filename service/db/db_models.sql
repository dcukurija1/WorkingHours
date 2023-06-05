CREATE TABLE hours_event (
	id SERIAL PRIMARY KEY,
	user_id INT,
	date TIMESTAMP,
	duration FLOAT, 
	report VARCHAR(3000)
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email VARCHAR(255),
	password VARCHAR(255),
	name VARCHAR(30)
);
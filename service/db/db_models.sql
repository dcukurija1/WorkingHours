CREATE TABLE hours_event (
	id SERIAL PRIMARY KEY,
	user_id INT,
	title VARCHAR(50)
	start TIMESTAMP,
	end TIMESTAMP
	report VARCHAR(3000)
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email VARCHAR(255),
	password VARCHAR(255),
	name VARCHAR(30)
);
-- Users Table
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR NOT NULL,
	last_name VARCHAR NOT NULL,
	email VARCHAR UNIQUE NOT NULL,
	password VARCHAR NOT NULL,
	created_at TIMESTAMP
);

-- Videos Table
CREATE TABLE videos (
	id SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	url VARCHAR NOT NULL,
	user_id INTEGER REFERENCES users (id)
);

-- Matches Table
CREATE TABLE public.matches (
		id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users (id),
    receiver_id INTEGER REFERENCES users (id),
    status INTEGER NOT NULL
);

include .env

.PHONY: createdb dropdb create_users_table drop_users_table populate_users view_users create_raffles_table drop_raffles_table populate_raffles view_raffles create_participants_table drop_participants_table populate_participants view_participants start shut status


all: view_users

# Database management
createdb:
	psql -U $(DB_USERNAME) -tc "SELECT 1 FROM pg_database WHERE datname = '$(DB_NAME)';"\
		| grep -q 1\
		|| psql -U $(DB_USERNAME) -c "CREATE DATABASE $(DB_NAME);"

dropdb:
	psql -U $(DB_USERNAME) -c 'DROP DATABASE IF EXISTS $(DB_NAME);'


# User table
create_users_table:
	psql -U $(DB_USERNAME) -d $(DB_NAME) -c "CREATE TABLE IF NOT EXISTS users ( \
		id INT PRIMARY KEY, \
		username VARCHAR(100) UNIQUE NOT NULL, \
		email VARCHAR(100) UNIQUE NOT NULL, \
		password VARCHAR(100) NOT NULL, \
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP \
	);"

drop_users_table:
	psql -U $(DB_USERNAME) -d $(DB_NAME) -c "DROP TABLE IF EXISTS users;"

populate_users:
	psql -U $(DB_USERNAME) -d $(DB_NAME) -c "INSERT INTO users (id, username, email, password) VALUES \
		(10000, 'john_doe', 'john_doe@example.com', 'XyZ9@qwe'), \
		(25000, 'jane_doe', 'jane_doe@example.com', 'P@ssw0rd'), \
		(37000, 'alice_smith', 'alice_smith@example.com', 'Secret123'), \
		(48000, 'bob_johnson', 'bob_johnson@example.com', 'Qwerty!23'), \
		(55000, 'emily_wilson', 'emily_wilson@example.com', 'Welcome123'), \
		(62000, 'michael_brown', 'michael_brown@example.com', 'Password!'), \
		(73000, 'sarah_jackson', 'sarah_jackson@example.com', 'Test@1234'), \
		(81000, 'chris_miller', 'chris_miller@example.com', 'Ch@ngeMe'), \
		(92000, 'laura_taylor', 'laura_taylor@example.com', 'Summer2023'), \
		(99000, 'ryan_clark', 'ryan_clark@example.com', 'Rainbow#42');"

view_users:
	psql -U $(DB_USERNAME) -d $(DB_NAME) -c "SELECT * FROM users;"


# Raffles table
create_raffles_table: 
	psql -U $(DB_USERNAME) -d $(DB_NAME) -c "CREATE TABLE IF NOT EXISTS raffles (\
		id INT PRIMARY KEY, \
		title VARCHAR(100), \
		description TEXT, \
		form JSONB, \
		author_id INT, \
		CONSTRAINT fk_author_user \
			FOREIGN KEY (author_id) \
			REFERENCES users(id)\
		);"

drop_raffles_table:
	psql -U $(DB_USERNAME) -d $(DB_NAME) -c 'DROP TABLE IF EXISTS raffles;'

populate_raffles:
	psql -U $(DB_USERNAME) -d $(DB_NAME) -c "INSERT INTO raffles (id, title, description, author_id) VALUES \
		(1, 'Raffle 1', 'Testing raffle 1', 10000), \
		(123, 'Big Raffle', 'Testing raffle 2', 62000), \
		(124, 'Big Raffle 2', 'Testing raffle 3', 62000), \
		(125, 'Big Raffle 3', 'Testing raffle 4', 62000), \
		(666, 'Hell Raffle', 'Testing raffle 5', 99000);"

view_raffles:
	psql -U $(DB_USERNAME) -d $(DB_NAME) -c "SELECT * FROM raffles;"


# Participants tables
create_participants_table:
	psql -U $(DB_USERNAME) -d $(DB_NAME) -c "CREATE TABLE IF NOT EXISTS participants ( \
		id INT PRIMARY KEY, \
		info JSONB, \
		raffle_id INT, \
		CONSTRAINT fk_raffle_participants \
			FOREIGN KEY (raffle_id) \
			REFERENCES raffles(raffle_id) \
		);"

drop_participants_table:
	psql -U $(DB_USERNAME) -d $(DB_NAME) -c 'DROP TABLE IF EXISTS participants;'

populate_participants:
	psql -U $(DB_USERNAME) -d $(DB_NAME) -c "INSERT INTO participants (id, info, raffle_id) VALUES \
		(1, '{\"name\": \"John Doe\", \"phone_number\": \"+1234567890\", \"email\": \"john.doe@example.com\", \"student_id\": \"A12345\"}', 1), \
		(2, '{\"name\": \"Alice Smith\", \"phone_number\": \"+1987654321\", \"email\": \"alice.smith@example.com\", \"student_id\": \"B54321\"}', 123), \
		(3, '{\"name\": \"Bob Johnson\", \"phone_number\": \"+1122334455\", \"email\": \"bob.johnson@example.com\"}', 123), \
		(4, '{\"name\": \"Emily Brown\", \"student_id\": \"C67890\"}', 123);"

view_participants:
	psql -U $(DB_USERNAME) -d $(DB_NAME) -c 'SELECT * FROM participants;'


# Service management
start:
	sudo systemctl start postgresql

shut:
	sudo systemctl stop postgresql

status:
	sudo systemctl status postgresql

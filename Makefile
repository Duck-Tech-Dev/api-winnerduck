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
		status VARCHAR(20), \
		form JSONB, \
		author_id INT, \
		CONSTRAINT fk_author_user \
			FOREIGN KEY (author_id) \
			REFERENCES users(id)\
		);"

drop_raffles_table:
	psql -U $(DB_USERNAME) -d $(DB_NAME) -c 'DROP TABLE IF EXISTS raffles;'

populate_raffles:
	psql -U $(DB_USERNAME) -d $(DB_NAME) -c "INSERT INTO raffles (id, title, description, status, author_id) VALUES \
		(1, 'Summer Bonanza', 'Enter for a chance to win a summer getaway package!', 'draft', 10000), \
		(123, 'Holiday Extravaganza', 'Win amazing holiday gifts and surprises!', 'ready', 62000), \
		(124, 'Mega Raffle', 'Massive prizes await in our biggest raffle yet!', 'running', 62000), \
		(125, 'New Year Raffle', 'Celebrate the new year with fantastic prizes!', 'finished', 62000), \
		(666, 'Halloween Special', 'Spooky prizes for a frightfully fun Halloween!', 'archived', 99000), \
		(2, 'Spring Fling', 'Fresh prizes for a blooming spring season.', 'draft', 25000), \
		(3, 'Back to School Raffle', 'Gear up for school with exciting prizes.', 'ready', 37000), \
		(4, 'Tech Giveaway', 'Win the latest gadgets and electronics!', 'running', 48000), \
		(5, 'Fitness Frenzy', 'Get fit with our awesome fitness gear prizes.', 'finished', 55000), \
		(6, 'Foodie Delight', 'Win gourmet meals and culinary experiences.', 'archived', 62000), \
		(7, 'Adventure Awaits', 'Outdoor gear and travel prizes up for grabs!', 'draft', 73000), \
		(8, 'Fashion Fiesta', 'Stylish prizes for the fashion-forward.', 'ready', 81000), \
		(9, 'Music Mania', 'Win concert tickets and music gear.', 'running', 92000), \
		(10, 'Artistic Expression', 'Art supplies and creative tools await!', 'finished', 99000), \
		(11, 'Home Sweet Home', 'Win amazing home improvement prizes.', 'archived', 10000), \
		(12, 'Winter Wonderland', 'Cozy up with our winter-themed prizes.', 'draft', 25000), \
		(13, 'Pet Lover’s Paradise', 'Prizes for you and your furry friends.', 'ready', 37000), \
		(14, 'Eco-Friendly Raffle', 'Sustainable prizes for a greener world.', 'running', 48000), \
		(15, 'Gamer’s Delight', 'Win the latest gaming consoles and games.', 'finished', 55000), \
		(16, 'Bookworm Bonanza', 'A collection of best-selling books up for grabs.', 'archived', 62000), \
		(17, 'Movie Magic', 'Win movie tickets and home entertainment systems.', 'draft', 73000), \
		(18, 'Luxury Lifestyle', 'Exclusive luxury prizes just for you.', 'ready', 81000), \
		(19, 'Health & Wellness', 'Pamper yourself with our wellness prizes.', 'running', 92000), \
		(20, 'Car Enthusiast Raffle', 'Win car accessories and auto services.', 'finished', 99000), \
		(21, 'Charity Raffle', 'Support a good cause and win prizes.', 'archived', 10000), \
		(22, 'Family Fun', 'Prizes for the whole family to enjoy.', 'draft', 25000), \
		(23, 'DIY Dream', 'Win tools and materials for your next project.', 'ready', 37000), \
		(24, 'Travel Bug', 'Amazing travel packages to win.', 'running', 48000), \
		(25, 'Fitness Challenge', 'Enter to win fitness equipment and memberships.', 'finished', 55000), \
		(26, 'Music Lovers Raffle', 'Win instruments and concert tickets.', 'archived', 62000), \
		(27, 'Holiday Cheer', 'Festive prizes for a joyous holiday season.', 'draft', 73000), \
		(28, 'Techie’s Choice', 'Latest gadgets and tech gear up for grabs.', 'ready', 81000), \
		(29, 'Chef’s Special', 'Gourmet cooking equipment and classes.', 'running', 92000), \
		(30, 'New Year’s Eve Bash', 'Celebrate with exclusive party prizes.', 'finished', 99000), \
		(31, 'Spring Renewal', 'Win prizes to refresh your life this spring.', 'archived', 10000);"


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
			REFERENCES raffles(id) \
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


# One for all restart
do_over: dropdb createdb create_users_table populate_users create_raffles_table populate_raffles create_participants_table populate_participants

# Service management
start:
	sudo systemctl start postgresql

shut:
	sudo systemctl stop postgresql

status:
	sudo systemctl status postgresql

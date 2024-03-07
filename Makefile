TEST_DB_NAME := test_db_2


.PHONY: createdb dropdb create_user_table drop_user_table add_random_users view_users start shut status


all: start


createdb:
	createdb $(TEST_DB_NAME)


dropdb:
	dropdb $(TEST_DB_NAME)


create_user_table:
	sudo -u postgres psql -d $(TEST_DB_NAME) -c "CREATE TABLE users ( \
		id INT PRIMARY KEY, \
		username VARCHAR(100) UNIQUE NOT NULL, \
		email VARCHAR(100) UNIQUE NOT NULL, \
		password VARCHAR(100) NOT NULL, \
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP \
	);"


drop_user_table:
	sudo -u postgres psql -d $(TEST_DB_NAME) -c "DROP TABLE users;"


add_random_users:
	sudo -u postgres psql -d $(TEST_DB_NAME) -c "INSERT INTO users (id, username, email, password) VALUES \
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
	sudo -u postgres psql -d $(TEST_DB_NAME) -c "SELECT * FROM users;"


start:
	sudo systemctl start postgresql
	sudo systemctl enable postgresql


shut:
	sudo systemctl stop postgresql
	sudo systemctl disable postgresql


status:
	sudo systemctl status postgresql

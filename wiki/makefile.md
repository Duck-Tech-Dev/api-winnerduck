The repo contains a Makefile which is used to automate some of the tasks. To use these, please install `make` from your favorite package manager.

## Database
Since the project uses PostgreSQL databases, there are some automation scripts for it in the Makefile:

```
make createdb
```
This will create an empty test database.

```
make dropdb
```
This will drop (delete) the test database. Please be careful while using this command as it can drop any database that has the name specified in the .env file

```
make create_user_table
```
This will create the `users` table in the test database.
```
make drop_user_table
```
This will drop the `users` table in the test database.

```
make add_random_users
```
This will create several random users inside the `users` table.

```
make view_users
```
This will show all the users.

```
start
```
This will start the postgresql service using systemctl. Please remember that this requires a valid postgresql installation.
```
stop
```
This will stop the postgresql service using systemctl. Please remember that this requires a valid postgresql installation.

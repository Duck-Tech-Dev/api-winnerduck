The repo contains a Makefile which is used to automate some of the tasks. To use these, please install `make` from your favorite package manager (which obviously is `pacman`).

## Database and table management commands

```
make createdb
```
This will create an empty test database.

```
make dropdb
```
This will drop (delete) the test database. Please be careful while using this command as it can drop any database that has the name specified in the .env file

```
make create_[users/raffles/participants]_table
```
This will create an empty table for the entry type.

```
make drop_[users/raffles/participants]_table
```
This will drop (delete) the specified table.

```
make populate_[users/raffles/participants]
```
This will fill the specified table with example values.

```
make view_[users/raffles/participants]
```
This will print the contents of a table from the database.

## PostgreSQL service commands
```
make start
```
This will start the postgresql service using systemctl. Please remember that this requires a valid postgresql installation.

```
make stop
```
This will stop the postgresql service using systemctl. Please remember that this requires a valid postgresql installation.

```
make status
```
This shows whether or not the postgresql service is currently active.

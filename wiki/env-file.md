NOTE: This wiki should be updated.

This project requires several environment variables to be set. These are set using the _.env_ file.

To start, please create ./.env.

Then you can insert this.
```
database=test_db # database name
host=localhost # currently we are running on local
port=5432 # default for psql
user=<change_me> # user that has all the permissions for the selected db
password=<change_me>
```

`user` and `password` must be set to the username and password of the postgres user.

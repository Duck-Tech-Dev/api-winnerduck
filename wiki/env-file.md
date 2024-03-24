NOTE: This wiki should be updated.

This project requires several environment variables to be set. These are set using the _.env_ file.

To start, please create _./.env_.

Then you can insert this inside the file.

```
DB_NAME=test_db         # a test database name, can be changed
DB_HOST=localhost       # currently the project just runs on local
DB_PORT=5432            # default for the psql
DB_USERNAME=<changeme>  # the username of the postgres user
DB_PASSWORD=<changeme>  # the password of the postgres user
```

Please notice the `<changeme>`'s and replace them with the appropriate values.

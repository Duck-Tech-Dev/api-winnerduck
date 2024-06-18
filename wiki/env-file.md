NOTE: This wiki should be updated.

This project requires several environment variables to be set. These are set using the _.env_ file.

To start, please create _./.env_.

Then you can insert this inside the file.

```
DB_NAME=test_db         # a test database name, can be changed
DB_HOST=            # currently the project just runs on local
DB_PORT=            # default for the psql
DB_USERNAME=        # the username of the postgres user
DB_PASSWORD=        # the password of the postgres user

jwt_secret=         # can be a random value
```

Please notice the `<changeme>`'s and replace them with the appropriate values.

# Setup

## config/database.js
```
module.exports = {
    database: 'mongodb://localhost:27017/<db_name>',
    secret: '<secret>'
}
```

## config/twitch.js
```
module.exports = {
    client_id: '<client_id>'
}
```

# Running the project

```
cd angular-src && npx ng build && cd ..
node app.js
```
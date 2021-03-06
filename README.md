# smm
Social Media Manager

`docker run -p 5984:5984 -d couchdb`

## secret.js

```JavaScript
module.exports = {
  facebookAppSecret: '',
  twitterApiKey: '',
  twitterApiSecret: '',
  twitterAccessToken: '',
  twitterTokenSecret: '',
  redisServerIP: '',
  redisPort: 6379
}
```

## scripts

### start

Starts the server in dev mode.

### test

Tests the code using Jest

### lint

Lints the code for coding errors

### seed

Seeds the databases for dev

## lib

Contains all the code to perform stuff.

### express

The Express JS Server

#### assets

Static assets (css, js, images) that will be shared through the site on the /assets/ url

#### views

The pug views that will be shared with the world

* **layout.pug**: The default layout every webpage should reference

### db

Contains code and data for the database.

**Database Structure**
* Users - List of all users
* Workspace - tenants that link users to everything
* Connectors - Accounts that link to social media (for example gruberjl's twitter account)
* Channels - A place where you can view all the data that comes from the connectors
* Workflows - A way to get information from the connectors, filter by these like hashtags, then output to a channel
* streams - a connection from a social media platform that connects to the active users

#### Redis

To setup a dev environment you'll need to install docker then run:

`docker run -p 6379:6379 --name redis01 -d redis`

run the following PowerShell command to determine the docker ip:

`Get-NetIPAddress | ft IPAddress, InterfaceAlias`

It should be labeled something like `vEthernet (DockerNAT)`

Once you have the IP address update

#### data

Contains the data code.

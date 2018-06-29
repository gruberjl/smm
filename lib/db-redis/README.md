# Database

## Connector

```JavaScript
const connector = {
  id: 'uuid',
  name: 'Name of connector to be used in app.',
  account: 'uuid pointing to token + secret',
  provider: 'oneOf: twitter, facebook, linkedin, etc.',
  accountName: 'name of account at provider (@gruberjl)',
  image: 'url to image for profile'
}
```

## Things I need to be able to do

## Create Workspace

Create a new workspace from a template.

```JavaScript
const template = {
  id: 0,
  connectors: {},
  channels: {},
  workflows: {}
}
```

## Connectors, Channels, and Workflows

(in this section item means connector, channel, and workflow)

### Create a new item

* Request comes from client to `/api/v1/update`
* Express validates the user is authenticated and can edit the workspace
* API reviews the request data and verifies it doesn't have an ID (which indicates it's a new item)
* API get's a new item ID from db (Redis). (ID must be unique to the workspace)
* API updates the request with the ID then calls db update
* DB saves the item to Redis and returns result to API.
* if success: all connected clients must receive the updated workspace.
* API returns the status to the client.

* Create a new item
* Delete an item
* Change an item

# API

## get

Get a workspace

* Request for workspace comes in
* User is verified they can read workspace
* API get's workspace
* API returns workspace

## update

Update a workspace

### Create a new item (connector, workflow, or channel)

* Request to update workspace comes in
* New item is validated against JSON schema
* User is verified they can create an item in the workspace
* ID is added to item
* Item is saved
* Item is returned to the requestor
* Workspace is retrieved from database
* Workspace is pushed through the web sockets to all connected users.

### Update an existing item

* Request to update workspace comes in.
* Item is validated against JSON schema
* User is verified they can edit the item
* Item is saved
* Item is returned to the requestor
* Workspace is retrieved from database
* Workspace is pushed through the web sockets to all connected users.

### Remove an existing item

* Request to update workspace comes in.
* Item is validated against JSON schema
* User is verified they can edit the item
* Handle any linking to the item. (Do I need to update any workflows when a connector is removed)
* Item is removed
* Status is returned to the user
* Workspace is retrieved from database
* Workspace is pushed through the web sockets to all connected users.

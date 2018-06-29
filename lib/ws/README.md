# ws

ws server receives connection

## clustering ws

redis > server > client

client
workspace
server

## Actions

* When server goes down: Clear clients from the server
* When first client connects from workspace: Start streams
* When first client connects from workspace to server: start listening for messages
* When last client disconnects from workspace: stop streams
* When last client disconnects from workspace to server: stop listening for messages

Redis will maintain a 'active_workspaces' set. It will list each workspace

Each workspace will have it's own Redis set.
when a client connects/authenticates
  * Server checks if set exists
  * If set doesn't exist:
    * Create set
    * Add own IP to set
    * Add workspace to 'active_workspaces' set
    * Publish 'ACTIVATE_WORKSPACE'
    * Subscribe to 'NEW_MESSAGES_WORKSPACE-ID'
  * If set does exist
    * Add own IP to set
    * Subscribe to 'NEW_MESSAGES_WORKSPACE-ID'
when a client disconnects:
  * Server removes self from redis set
  * Server checks if redis set is empty
  * If set is empty
    * Delete the redis set
    * Remove workspace from 'active_workspaces'
    * Publish 'DEACTIVATED_WORKSPACE'
When a server shuts down
  * disconnects each client
  * Removes self from each active_workspace
When a server boots
  * Loop through every active_workspace and verify it's current IP isn't listed.
  * If it is listed, remove it.
When a ws server goes down
  * How do I detect a down server?
  * Another server will loop through all 'active_workspaces' and remove the server
    * Perform any additional clean up on the 'active_workspaces' sets

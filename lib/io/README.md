# io

## Namespacing

Each tenant would receive their own namespace.
The namespace is created when the workspace is created.

The namespace will be used to send workspace updates.

## Rooms

Each channel will receive it's own room to send social media messages to the clients.
A room is created when the channel is created on the workspace.

## Client Connects

When a client connects they'll connect to their workspaces namespace.
For now, they'll automatically connect to all rooms.
Once implemented, a client will only connect to the rooms they're following.

When a new channel is created, the client will connect to the new room.

## Streams

When a client connects to a room, and they're the first person in the room:

* The server will initiate the streams that are associated with the channel.

When a client disconnects:

* Each room will be checked for the number of clients.
* If the room is empty: disconnect the streams.

# social

Responsible for getting data from the providers (twitter) and sending it to the clients through Redis > ws

When the server boots:

* Get every workspace > connector > workflow and run through the syncs
* Run through the syncs on a schedule (roughly every minute to avoid limits)
* When a workflow is created, update the syncs.
* When a workflow is removed, update the syncs.

## Actions and Events

### workflow created

* If client is connected: create new stream
* If client is not connected: do nothing

### workflow updated

* If client is connected: delete streams and create new stream
* If client is not connected: do nothing

### workflow deleted

* remove stream

### client connects

* If first client, create streams for each workflow
* If second client, do nothing

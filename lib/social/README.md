# social

Responsible for getting data from the providers (twitter) and sending it to the clients through Redis > ws

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

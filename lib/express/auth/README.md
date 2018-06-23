# Auth

Used to authenticate and link provider (twitter, facebook) accounts to a workspace.

## Process

* User starts creating a new connector
* User selects a social media provider (for example Twitter)
* They directed to `/auth/${provider}` (example: `/auth/twitter`)
  * Authenticates the user
  * Verifies they can make the requested add/change to the workspace
  * Gets the workspace and sets it at `req.workspace`
  * Set the connector object at `req.connector`
* They redirected to the providers auth site where they give the app permissions
* They get redirected back to the providers callback (`/auth/twitter/callback`)
* Creates the connector & the account objects in the database
* Forms a pretty response

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

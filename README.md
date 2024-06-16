# ts-blog
A simple but efficient blog back-end implementation made using TypeScript, Express, TypeORM and MongoDB.

## purpose
The whole point of this back-end application is to learn more about JWT, authentication, and back-end itself.

## endpoints
You can view details on how they work at the `src/routes/index.ts` file. 

> [!NOTE]
> Endpoints marked with `*` require you to be authenticated in order to access them.

### create account
`POST` /users

> Example request body:
> ```json
> {
>   "username": "joaomanxxl",
>   "password": "12345678"
> }
> ```
>
> Example response:
> ```json
> {
>   "token": "account_token"
> }
> ```

### list all users*
`GET` /users

> Example response:
> ```json
> {
>   "users": [
>      {
>       "_id": "e9e84c2a-178c-46b1-8c40-6552c92af04c",
>        "username": "joaomanxxl",
>        "password": "$2b$10$YCMeeNxWXa2XaYDRTAr7/OMVsXyEheKxK4cniUIb7616oIEqZNeSe",
>        "created_at": "2024-06-11T00:46:19.161Z",
>        "token": "account_token"
>        "articles": [],
>     }
>   ]
> }
> ```

### get user by their username*
`GET` /users/:username

> Example response:
> ```json
> {
>   "user": {
>     "_id": "e9e84c2a-178c-46b1-8c40-6552c92af04c",
>     "username": "joaomanxxl",
>     "password": "$2b$10$YCMeeNxWXa2XaYDRTAr7/OMVsXyEheKxK4cniUIb7616oIEqZNeSe",
>     "created_at": "2024-06-11T00:46:19.161Z",
>     "token": "account_token",
>     "articles": []
>   }
> }
> ```

### update user password*
`POST` /users/recover

> Example request body:
> ```json
> {
>   "oldPassword": "12345678",
>   "newPassword": "abcdefgh"
> }
> ```

### delete user*
`DELETE` /users/:username

> Example response:
> ```json
> {
>   "acknowledged": true
> }
> ```

## contributing
I don't really think anyone will contribute to this as it's mainly a learning project. Though, if you have any suggestions,
you can either open an issue here or e-mail me at [dev@akkih.com](mailto:dev@akkih.com).

You can also take this code as "inspiration" or whatever, if it fits what you're looking for.

### thanks for reading :wave:

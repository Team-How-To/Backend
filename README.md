# Backend Documentation

Hosted with Heroku on: https://how-too.herokuapp.com/


endpoint example: https://how-too.herokuapp.com/api/users/login

<h1>Register</h1>

*`HTTP method:`***`POST`**

*`URL:`***`/api/users/register`**

| Name           | Type   | Required | Unique | Description           |
| :------------- | :----- | :------: | :----: | :-------------------- |
| username       | String |   YES    |  YES   |                       |
| password       | String |   YES    |   NO   |                       |
| name           | String |   YES    |   NO   |                       |
| email          | String |   NO     |  YES   |                       |
| location       | String |   NO     |  NO    |                       |
| user_type      | Integer|   YES    |  NO    | 1 is a creator, 2 is a consumer. front end should ask user and set type based upon selection                      |
| user_avatar    | String |   NO     |  NO    |                       |

example
```
{
	"username": "freddiet803",
	"password": "123",
	"name": "freddie",
	"email": "freddie@email.com",
	"locaion": "savannah, ga",
  	"user_type": 1,
  	"user_avatar": null
}
```

returns their token and all user info except for their hashed password


<h1>Login</h1>

*`HTTP method:`***`POST`**

*`URL:`***`/api/users/login`**

| Name           | Type   | Required | Unique | Description           |
| :------------- | :----- | :------: | :----: | :-------------------- |
| username       | String |   YES    |  YES   |                       |
| password       | String |   YES    |   NO   |                       |

example
```
{
	"username": "freddiet803",
	"password": "123"
}
```

returns their token and all user info except for their hashed password


<h1>Get list of all users</h1>

*`HTTP method:`***`GET`**

*`URL:`***`/api/users/`**

requires valid token passed in through Authorization header

shows all user info except for passwords (passwords are also hashed)


<h1>Get user by id</h1>

*`HTTP method:`***`GET`**

*`URL:`***`/api/users/singleuser/:id`**

pass in the user id through url

returns user info for single user


<h1>Edit User</h1>

requires valid token

*`HTTP method:`***`PUT`**

*`URL:`***`/api/users/edituser/:id`**

| Name           | Type   | Required | Unique | Description           |
| :------------- | :----- | :------: | :----: | :-------------------- |
| name           | String |   NO     |   NO   |                       |
| email          | String |   NO     |  YES   |                       |
| location       | String |   NO     |  NO    |                       |
| user_avatar    | String |   NO     |  NO    |                       |

example
```
{
	
	"name": " updated freddie",
	
}
```


user id passed in through url and user edits passed in through request body

<h1>Delete User</h1>

requires valid token

*`HTTP method:`***`DEL`**

*`URL:`***`/api/users/deleteuser/:id`**

user id passed in through url


<h1>Get all how to guides</h1>

*`HTTP method:`***`GET`**

*`URL:`***`/api/howto`**


returns all how to guides in database


<h1>Get how to guide by id</h1>

*`HTTP method:`***`GET`**

*`URL:`***`/api/howto/:id`**


returns one how to guide from database


<h1>Get all user how to guides</h1>

*`HTTP method:`***`GET`**

*`URL:`***`/api/howto/userhowto/:id`**


returns all how to guides for specific user in database


<h1>Create How To</h1>

*`HTTP method:`***`POST`**

*`URL:`***`/api/howto/newhowto`**

| Name           | Type   | Required | Unique | Description           |
| :------------- | :----- | :------: | :----: | :-------------------- |
| title          | String |   YES    |   NO   |                       |
| steps          | String |   YES    |   NO   |                       |
| ht_pic         | String |   NO     |   NO   | picture url           |
| user_id        | Integer|   YES    |  YES   |  current user id      |

example
```
{
	"title": " New how to",
	"steps": "1. do this.  2. do that"
	"ht_pic": null
	"user_id": 1
	
}
```

creates and returns newly created how to 

<h1>Delete How to</h1>

requires valid token
require valid creator account, which needs user_id passed in req.body

*`HTTP method:`***`DEL`**

*`URL:`***`/api/howto/delete/:id`**

| Name           | Type   | Required | Unique | Description           |
| :------------- | :----- | :------: | :----: | :-------------------- |
| user_id        | Integer|   YES    |  YES   |    current user id    |

example
```
{

	"user_id": 1
	
}
```

how to  id passed in through url

<h1>Edit how to</h1>

requires valid token
requires valid creator account, which needs user_id in req.body

*`HTTP method:`***`PUT`**

*`URL:`***`/api/howto/edithowto/:id`**
| Name           | Type   | Required | Unique | Description           |
| :------------- | :----- | :------: | :----: | :-------------------- |
| user_id        | Integer|   YES    |  YES   |   current user id     |
| title          | String |   NO     |   NO   |                       |
| steps          | String |   NO     |   NO   |                       |
| ht_pic         | String |   NO     |   NO   | picture url           |

example
```
{

	"user_id": 1
	"title": "updated title"
	
}
```

how to id passed in through url and user edits passed in through request body




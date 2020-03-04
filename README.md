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

user id passed in through url and user edits passed in through request body

<h1>Delete User</h1>

requires valid token

*`HTTP method:`***`DEL`**

*`URL:`***`/api/users/deleteuser/:id`**

user id passed in through url

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
| user_type      | Integer|   YES    |  NO    |                       |
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

const Users = require('./user-model.js');
const db = require('../data/dbConfig.js');
const request = require('supertest');
const server = require('../server.js');

// beforeAll(async (done) => {
//   await Users.add({
//     username: "aiden",
//     password: "123",
//     city: "gilbert",
//     name: "aiden",
//     email: "aiden@aiden.com"
//   })

//   request(server)
//   .post("/api/users/login")
//   .send({
//     username: "aiden",
//     password: "123",
//   })
//   .end((err, response) => {
//     token = response.body.token
//     done()
//   })
// })

describe('user_router_model', () => {
  it('should be test environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('register', () => {
    it('should register a new user to the db', async () => {
      await Users.addUser({
        username: 'testenv',
        password: '123',
        name: 'tester',
        email: 'aol@aol.com',
        user_type: 1
      });

      const users = await db('users');
      expect(users).toHaveLength(1);
    });

    it('should return registered user', async () => {
      await Users.addUser({
        username: 'testenv',
        password: '123',
        name: 'tester',
        email: 'aol@aol.com',
        user_type: 1
      });
      let user = await db('users');
      expect(user[0].username).toBe('testenv');
    });

    beforeEach(async () => {
      await db('users').truncate();
    });
  });

  describe('login', () => {
    it('should return user information', async () => {
      await request(server)
        .post('/api/users/register')
        .send({
          username: 'testenv',
          password: '123',
          name: 'tester',
          email: 'aol@aol.com',
          user_type: 1
        });

      const response = await request(server)
        .post('/api/users/login')
        .send({ username: 'testenv', password: '123' });

      expect(response.text).toContain(
        'id',
        'username',
        'name',
        'email',
        'user_type'
      );
    });

    it('should return token', async () => {
      await request(server)
        .post('/api/users/register')
        .send({
          username: 'testenv',
          password: '123',
          name: 'tester',
          email: 'aol@aol.com',
          user_type: 1
        });

      const response = await request(server)
        .post('/api/users/login')
        .send({ username: 'testenv', password: '123' });

      expect(response.text).toContain('token');
    });
    beforeEach(async () => {
      await db('users').truncate();
    });
  });

  describe('user editing', () => {
    it('should return 200', async () => {
      let register = await request(server)
        .post('/api/users/register')
        .send({
          username: 'testenv',
          password: '123',
          name: 'tester',
          email: 'aol@aol.com',
          user_type: 1
        });
      let data = JSON.parse(register.text);
      expect(data.token).toBeDefined();

      const response = await request(server)
        .put('/api/users/edituser/1')
        .set('Authorization', data.token)
        .send({ name: 'phoenix' });

      expect(response.status).toBe(201);
    });

    beforeEach(async () => {
      await db('users').truncate();
    });
  });

  describe('user deleting', () => {
    it('should return 200', async () => {
      let register = await request(server)
        .post('/api/users/register')
        .send({
          username: 'testenv',
          password: '123',
          name: 'tester',
          email: 'aol@aol.com',
          user_type: 1
        });
      let data = JSON.parse(register.text);
      expect(data.token).toBeDefined();

      const response = await request(server)
        .delete('/api/users/deleteuser/1')
        .set('Authorization', data.token)
        .send({ name: 'phoenix' });

      expect(response.status).toBe(200);
    });

    beforeEach(async () => {
      await db('users').truncate();
    });
  });
});

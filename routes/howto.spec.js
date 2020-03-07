const HowTo = require('./how-to-model.js');
const db = require('../data/dbConfig.js');
const request = require('supertest');
const server = require('../server.js');

describe('how_to_model', () => {
  it('should be test environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  beforeEach(async () => {
    await db('how_to_guides').truncate();
  });

  describe('create a how-to', () => {
    it('unauthorized should return 401', async () => {
      let response = await request(server)
        .post('/api/howto/newhowto')
        .set('Authorization', 'none')
        .send({
          title: 'New how to',
          steps: '1. do this.  2. do that',
          ht_pic: null,
          user_id: 1
        });

      expect(response.status).toBe(401);
    });

    it('authorized,but not created should return 500', async () => {
      let register = await request(server)
        .post('/api/users/register')
        .send({
          username: 'testenvhow',
          password: '123',
          name: 'tester',
          email: 'aool@aol.com',
          user_type: 1
        });
      let data = JSON.parse(register.text);
      console.log(data);

      expect(data.token).toBeDefined();

      let response = await request(server)
        .post('/api/howto/newhowto')
        .set('Authorization', data.token)
        .send({
          title: 'New how to',
          steps: '1. do this.  2. do that',
          ht_pic: null,
          user_id: 2,
          user_type: 1
        });

      expect(response.status).toBe(500);
    });

    beforeEach(async () => {
      await db('users').truncate();
      await db('how_to_guides').truncate();
    });
  });

  describe('get how-tos', () => {
    it('should return how to guides', async () => {
      await HowTo.addHowTo({
        title: 'New how to',
        steps: '1. do this.  2. do that',
        ht_pic: null,
        user_id: 1
      });

      let register = await request(server)
        .post('/api/users/register')
        .send({
          username: 'testenvhow',
          password: '123',
          name: 'tester',
          email: 'aool@aol.com',
          user_type: 1
        });
      let data = JSON.parse(register.text);

      let response = await request(server)
        .get('/api/howto')
        .set('Authorization', data.token);
      let parsedResponse = await JSON.parse(response.text);
      expect(parsedResponse[0].title).toBe('New how to');
    });

    beforeEach(async () => {
      await db('how_to_guides').truncate();
    });
  });
});

//   it('authorized should return 200', async () => {
//     let register = await request(server)
//       .post('/api/users/register')
//       .send({
//         username: 'testenv',
//         password: '123',
//         name: 'tester',
//         email: 'aol@aol.com',
//         user_type: 1
//       });
//     let data = JSON.parse(register.text);

//     expect(data.token).toBeDefined();

//     let response = await request(server)
//       .post('/api/howto/newhowto')
//       .set('Authorization', data.token)
//       .send({
//         title: 'New how to',
//         steps: '1. do this.  2. do that',
//         ht_pic: null,
//         user_id: 1
//       });

//     expect(response.status).toBe(200);
//   });

//   beforeEach(async () => {
//     await db('users').truncate();
//     await db('how_to_guides').truncate();
//   });
// });

//   describe('get how-tos', () => {
//     it('should return how to guides', async () => {
//       await HowTo.addHowTo({
//         title: 'New how to',
//         steps: '1. do this.  2. do that',
//         ht_pic: null,
//         user_id: 1
//       });

//       let response = await request(server).get('/api/howto');
//       let parsedResponse = await JSON.parse(response.text);
//       expect(parsedResponse[0].title).toBe('New how to');
//     });

//     beforeEach(async () => {
//       await db('how_to_guides').truncate();
//     });
//   });
//});

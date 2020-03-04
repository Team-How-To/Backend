const db = require('../data/dbConfig.js');

module.exports = {
  addUser,
  findUserName,
  findBy,
  deleteUser,
  editUser,
  find,
  findById
};

// function addUser(user) {
//   return db('users').insert(user);
// }

async function addUser(user) {
  const [id] = await db('users').insert(user);

  return findBy({ id });
} //add a user to the database

function find() {
  return db('users');
}

function findUserName(username) {
  return db('users').where(username);
} // find a user by username

function findBy(filter) {
  return db('users')
    .where(filter)
    .first();
} //find a user by the filter set

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function deleteUser(id) {
  return db('users')
    .del()
    .where({ id });
} //delete a user, by id only

function editUser(data, id) {
  return db('users')
    .where({ id })
    .first()
    .update(data);
} //edit a user, by id only

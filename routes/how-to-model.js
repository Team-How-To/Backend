const db = require('../data/dbConfig.js');

module.exports = {
  addHowTo,
  findBy,
  find,
  deleteHowTo,
  editHowTo,
  showUserHowTos,
  findById
};

// function addHowTo(howto){
//     return db('how_to_guides').insert(howto);
// }

async function addHowTo(howto) {
  const [id] = await db('how_to_guides').insert(howto);

  return findBy({ id });
}

function findBy(filter) {
  return db('how_to_guides')
    .where(filter)
    .first();
}

function find() {
  return db('how_to_guides');
}
function findById(id) {
  return db('how_to_guides').where({ id });
}

function editHowTo(data, id) {
  return db('how_to_guides')
    .where({ id })
    .first()
    .update(data);
}
function deleteHowTo(id) {
  return db('how_to_guides')
    .del()
    .where({ id });
}

function showUserHowTos(id) {
  return db('how_to_guides as hg')
    .join('users as u', 'u.id', 'hg.user_id')
    .where('hg.user_id', '=', id);
}

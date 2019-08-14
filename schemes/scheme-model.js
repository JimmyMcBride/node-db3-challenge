const db = require('../data/db-config.js')

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  update,
  remove
}

function find() {
  return db('schemes')
}

function findById(id) {
  return db('schemes').where({ id }).first()
}

function findSteps(scheme_id) {
  return db('steps as t')
    .join('schemes as c', 't.scheme_id', 'c.id')
    .select('t.id', 'c.scheme_name', 't.step_number', 't.instructions')
    .where({ scheme_id })
}

async function add({ scheme_name }) {
  const [id] = await db('schemes').insert({ scheme_name });

  return findById(id);
}

async function addStep(step, scheme_id) {
  const [id] = await db('steps').insert({ ...step, scheme_id });

  return findStep(id);
}

async function update({ scheme_name }, id) {
  return await db('schemes')
    .where({ id })
    .update({ scheme_name })
}

async function remove(id) {
  const scheme = await findById(id)

  await db('schemes')
    .where({ id })
    .del();

  return scheme;
}
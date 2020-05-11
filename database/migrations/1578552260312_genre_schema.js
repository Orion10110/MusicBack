'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GenreSchema extends Schema {
  up () {
    this.create('genres', (table) => {
      table.increments()
      table.string('name', 120).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('ganres')
  }
}

module.exports = GenreSchema

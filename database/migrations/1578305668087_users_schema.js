'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.string('firstname', 80).notNullable().after('username')
      table.string('secondname', 80).notNullable().after('firstname')
      table.dropColumn('email')
    })
  }

  down () {
    this.table('users', (table) => {
      table.string('email', 254).notNullable().unique()
      table.dropColumns(['firstname', 'secondname'])
    })
  }
}

module.exports = UsersSchema

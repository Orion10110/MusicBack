'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserPlaylistRelationSchema extends Schema {
  up () {
    this.table('playlists', (table) => {
      // alter table
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  down () {
    this.table('playlists', (table) => {
      // reverse alternations
      table.dropColumn('user_id')
    })
  }
}

module.exports = UserPlaylistRelationSchema

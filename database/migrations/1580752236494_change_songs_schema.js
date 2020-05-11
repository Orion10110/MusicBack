'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChangeSongsSchema extends Schema {
  up () {
    this.table('songs', (table) => {
      // alter table
      table.dropForeign('playlist_id')
      table.dropColumn('playlist_id')
    })
  }

  down () {
    this.table('change_songs', (table) => {
      // reverse alternations
      table.integer('playlist_id').unsigned().references('id').inTable('users')
    })
  }
}

module.exports = ChangeSongsSchema

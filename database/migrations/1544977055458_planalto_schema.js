'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlanaltoSchema extends Schema {
  up () {
    this.create('planaltos', (table) => {
      table.increments()
      table.string('nome')
      table.integer('largura')
      table.integer('altura')
      table.timestamps()
    })
  }

  down () {
    this.drop('planaltos')
  }
}

module.exports = PlanaltoSchema

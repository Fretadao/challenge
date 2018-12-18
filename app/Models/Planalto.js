'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Planalto extends Model {
    
    static get visible(){
     
        return ['id', 'nome', 'altura', 'largura']
    }
}

module.exports = Planalto

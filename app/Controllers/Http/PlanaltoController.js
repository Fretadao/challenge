'use strict'

const Planalto = use('App/Models/Planalto')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with planaltos
 */
class PlanaltoController {
  /**
   * Show a list of all planaltos.
   * GET planaltos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let planaltos = await Planalto.all()
    
    if(planaltos.rows.length == 0){
      response.status(204).send()
    }else{
      response.send(planaltos)
    }
  }

  /**
   * Create/save a new planalto.
   * POST planaltos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let nome = request.input('nome')
    let largura = request.input('largura')
    let altura = request.input('altura')

    let retorno = await this.verificaDados(nome, largura, altura)

    if(retorno.falha){
      response.status(400).send(retorno.msg)
    }else{
      const planalto = new Planalto()
      planalto.nome = nome
      planalto.largura = largura
      planalto.altura = altura
      await planalto.save()
  
      return planalto
    }   
  }
  
  async verificaDados(nome, largura, altura){
    if(!nome){
      return { msg: 'Necessario informar um nome para o planalto', falha: true}
    }

    if(!altura){
      return { msg: 'Necessario informar a altura para o planalto', falha: true}
    }
    
    if(!largura){
      return { msg: 'Necessario informar a largura para o planalto', falha: true}
    }

    if(typeof altura != "number"){
      return {msg: 'Altura do planalto precisa ser numerica', falha: true}
    }

    if(typeof largura != "number"){
      return {msg: 'Largura do planalto precisa ser numerica', falha: true}
    }
  
    return {falha: false}
  }

}

module.exports = PlanaltoController

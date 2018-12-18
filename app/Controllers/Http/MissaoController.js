'use strict'

const Missao = use('App/Operacao/Missao')

class MissaoController {
    
    async registrar ({ request, response }) {

        let planalto = request.input('planalto_id')
        let navegacao = request.input('navegacao')
        let direcao = request.input('direcao')
        let posicao = request.input('posicao')
         
        let missao = new Missao(navegacao, direcao, planalto, posicao)

        let retorno = await missao.verificaDados()

        if(retorno.falha){
            response.status(400).send(retorno.msg)
        }else{
            if(missao.transmitirInformacoesParaRover()){
                let resposta = missao.iniciarRover();
                if(resposta.falha){
                    response.status(400).send(resposta.msg)
                }else{
                    response.send(resposta.msg)
                }
                
            }
        }
      
    }
}

module.exports = MissaoController

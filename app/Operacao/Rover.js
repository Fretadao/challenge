'use strict'

class Rover {

    constructor(posicao, orientacao, navegacao, planalto){
        this.posicao = posicao
        this.orientacao = this.constructor.converterOrientacaoParaGraus(orientacao)
        this.navegacao = navegacao
        this.planalto = planalto
    }

    /**
     *  Verifica as informacoes transmitidas pela missao
     */
    verificarInformacoesRecebidas(){

        return this.posicao != null && this.orientacao != null
    }

    /**
     *  Inicia processo de locomocao do rover no planalto
     */
    iniciar(){
        let navegacao = this.navegacao.split('')

        navegacao.forEach(function(comando) {

            if(comando == 'M'){
                this.mover()
            }else{
                this.corrigirOrientacao(comando)
            }
   
         }, this)

         return this.localizacao()
    }

    /**
     *  Retorna a posicao do rover no planalto ou caso ele tenha saido do mesmo
     */
    localizacao(){
    
        if(this.posicao.eixo_x >= this.planalto.largura || this.posicao.eixo_y >= this.planalto.altura){
            return {falha: true, msg: 'Rover esta inoperante, navegacao informada excedeu o tamanho do planalto'}
        }

        return { falha: false, msg: { posicao : { eixo_x : this.posicao.eixo_x, eixo_y : this.posicao.eixo_y}, direcao: this.constructor.converterOrientacaoParaCardeais(this.orientacao)}}
    }

    /**
     *  Corrigi a orientacao/direcao do rover conforme os comandos da navegacao 
     * @param {*} comando  
     */
    corrigirOrientacao(comando){

        if(comando == 'L'){
            if(this.orientacao == 0){
                this.orientacao = 360
            }
            this.orientacao = this.orientacao - 90
        }else if(comando == 'R'){
            if(this.orientacao == 360){
                this.orientacao = 0
            }
            this.orientacao = this.orientacao + 90
        }
    }

    /**
     * Método que faz o movimento do rover no planalto
     */
    mover(){

        switch(this.orientacao){
            case 0:
            case 360:
                this.posicao.eixo_y++ 
                break
            case 90:
                this.posicao.eixo_x++
                break
            case 180:
                this.posicao.eixo_y--
                break
            case 270:
                this.posicao.eixo_x--    
                break
        }
    }
    
    /**
     * Converte a orientacao para graus
     * 
     * @param {*} orientacao 
     */
    static converterOrientacaoParaGraus(orientacao){
        switch(orientacao){
            case 'N':
                return 0
            case 'E':
                return 90        
            case 'S':
                return 180
            case 'W':
                return 270
        }
    }
    /**
     * Converte a orientacao para pontos cardeais
     * 
     * @param {*} orientacao 
     */
    static converterOrientacaoParaCardeais(orientacao){
        switch(orientacao){
            case 0:
            case 360:
                return 'N'
            case 90:
                return 'E'        
            case 180:
                return 'S'
            case 270:
                return 'W'
        }
    }
}

module.exports = Rover

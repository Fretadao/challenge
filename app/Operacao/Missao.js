'use strict'

const Rover = use('App/Operacao/Rover')

const Planalto = use('App/Models/Planalto')

class Missao {
    
    constructor(navegacao, direcao, planalto, posicao){
        this.posicao = posicao
        this.navegacao = navegacao
        this.direcao = direcao
        this.planalto = planalto
    }

    /**
     * Envia as informacoes necessarias para o rover cumprir a missao
     */
    transmitirInformacoesParaRover(){
        this.navegacao = this.navegacao.toUpperCase()
        this.direcao = this.direcao.toUpperCase()
        
        this.rover = new Rover(this.posicao, this.direcao, this.navegacao, this.planalto)

        return this.rover.verificarInformacoesRecebidas()
    }
    /**
     *  Solicita que o rover comece a missao
     */
    iniciarRover(){

        return this.rover.iniciar()
    }

    /**
     * Verifica dados antes de passar para o rover
     */
    async verificaDados(){

        if(!this.posicao){
            return {msg: 'Para missao prosseguir e necessario informar a posicao', falha: true}
        }

        if(!this.posicao.eixo_x){
            return {msg: 'Para missao prosseguir e necessario informar o eixo_x da posicao', falha: true}
        }

        if(!this.posicao.eixo_y){
            return {msg: 'Para missao prosseguir e necessario informar o eixo_y da posicao', falha: true}
        }
        
        if(!this.navegacao){
            return {msg: 'Para missao prosseguir e necessario informar a navegacao', falha: true}
        } 
        
        if(!this.direcao){
            return {msg: 'Para missao prosseguir e necessario informar a direcao', falha: true}
        }
        
        if(!this.planalto){
            return {msg: 'Para missao prosseguir e necessario informar o planalto', falha: true}
        }
        
        if(this.posicao.eixo_x < 0 || this.posicao.eixo_y < 0 ){
            return {msg: 'Para missao prosseguir a posicao informada nao pode ter um numero negativo', falha: true}
        } 

        if(this.direcao.length > 1){
            return {msg: 'A direcao e composta apenas por um ponto cardeal', falha: true}
        }

        if(this.direcao.match(/[^N|S|E|W]/gi)){
            return {msg: 'Direcao invalida(Use: N (Norte), S (Sul), E (Leste), W (Oeste))', falha: true}
        }

        if(this.navegacao.match(/[^L|R|M]/gi)){
            return {msg: 'Navegacao invalida(Use : L (Esquerda), R (Direita), M (Ir para frente))', falha: true}
        }
       
        if(typeof this.planalto != "number"){
            return {msg: 'Identificacao do planalto e numerica', falha: true}
        }

        this.planalto = await Planalto.find(this.planalto);
    
        if(!this.planalto){
            return {msg: 'Planalto informado nao foi encontrado no banco de dados da NASA', falha: true}
        }

        if(this.planalto.altura < this.posicao.eixo_y || this.planalto.largura < this.posicao.eixo_x){
            return {msg: 'Posicao informada do rover menor que o planalto', falha: true}
        }

        return {falha: false}
    }
}

module.exports = Missao

'use strict'

const { test } = use('Test/Suite')('Rover')

const Rover = use('App/Operacao/Rover')

const Posicao = use('App/Operacao/Posicao')

/**
 * Verifica se esta correto a conversao de pontos cardeais para graus
 */
test('conversor de orientacao para graus', async ({ assert }) => {

   assert.equal(Rover.converterOrientacaoParaGraus('N'), 0)
     
   assert.equal(Rover.converterOrientacaoParaGraus('E'), 90)
     
   assert.equal(Rover.converterOrientacaoParaGraus('S'), 180)
     
   assert.equal(Rover.converterOrientacaoParaGraus('W'), 270)

})

/**
 * Verifica se esta correto a conversao de graus para pontos cardeais
 */
test('conversor de orientacao para pontos cardeais', async ({ assert }) => {

   assert.equal(Rover.converterOrientacaoParaCardeais(0), 'N')

   assert.equal(Rover.converterOrientacaoParaCardeais(360), 'N')
     
   assert.equal(Rover.converterOrientacaoParaCardeais(90), 'E')
     
   assert.equal(Rover.converterOrientacaoParaCardeais(180), 'S')
     
   assert.equal(Rover.converterOrientacaoParaCardeais(270), 'W')
   
})

/**
 *  Verifica se a orientacao do rover esta certa ao virar para esquerda
 */
test('Orientacao quando navegar para L', async ({ assert }) => {

  let rover = new Rover(null, 'N', null, null)

  rover.corrigirOrientacao('L')
  assert.equal(Rover.converterOrientacaoParaCardeais(rover.orientacao), 'W')

})

/**
 *  Verifica se a orientacao do rover esta certa ao virar duas vezes para esquerda
 */
test('Orientacao quando navegar para LL', async ({ assert }) => {

  let rover = new Rover(null, 'N', null, null)

  rover.corrigirOrientacao('L')
  rover.corrigirOrientacao('L')
  assert.equal(Rover.converterOrientacaoParaCardeais(rover.orientacao), 'S')

})

/**
 *  Verifica se a orientacao do rover esta certa ao virar para esquerda e para direita
 */
test('Orientacao quando navegar para LR', async ({ assert }) => {

  let rover = new Rover(null, 'N', null, null)

  rover.corrigirOrientacao('L')
  rover.corrigirOrientacao('R')
  assert.equal(Rover.converterOrientacaoParaCardeais(rover.orientacao), 'N')

})

/**
 *  Verifica se a orientacao do rover esta certa ao virar para direita
 */
test('Orientacao quando navegar para R', async ({ assert }) => {

  let rover = new Rover(null, 'N', null, null)

  rover.corrigirOrientacao('R')
  assert.equal(Rover.converterOrientacaoParaCardeais(rover.orientacao), 'E')

})

/**
 *  Verifica se a orientacao do rover esta certa ao virar duas vezes para direita
 */
test('Orientacao quando navegar para RR', async ({ assert }) => {

  let rover = new Rover(null, 'N', null, null)

  rover.corrigirOrientacao('R')
  rover.corrigirOrientacao('R')
  assert.equal(Rover.converterOrientacaoParaCardeais(rover.orientacao), 'S')

})

/**
 *  Verifica se a orientacao do rover esta certa ao virar para direita e para esquerda
 */
test('Orientacao quando navegar para RL', async ({ assert }) => {

  let rover = new Rover(null, 'N', null, null)

  rover.corrigirOrientacao('R')
  rover.corrigirOrientacao('L')
  assert.equal(Rover.converterOrientacaoParaCardeais(rover.orientacao), 'N')

})

/**
 *  Verifica se o rover esta andando para o norte conforme roteiro
 */
test('movimento para N (Norte)', async ({ assert }) => {

  let posicao = new Posicao(3,3)
  let rover = new Rover(posicao, 'N', null, null)
  rover.mover()
  assert.equal(rover.posicao.eixo_y, 4)

})

/**
 *  Verifica se o rover esta andando para o oeste conforme roteiro
 */
test('movimento para W (Oeste)', async ({ assert }) => {

  let posicao = new Posicao(3,3)
  let rover = new Rover(posicao, 'W', null, null)
  rover.mover()
  assert.equal(rover.posicao.eixo_x, 2)

})

/**
 *  Verifica se o rover esta andando para o sul conforme roteiro
 */
test('movimento para S (Sul)', async ({ assert }) => {

  let posicao = new Posicao(3,3)
  let rover = new Rover(posicao, 'S', null, null)
  rover.mover()
  assert.equal(rover.posicao.eixo_y, 2)

})

/**
 *  Verifica se o rover esta andando para o leste conforme roteiro
 */
test('movimento para E (Leste)', async ({ assert }) => {

  let posicao = new Posicao(3,3)
  let rover = new Rover(posicao, 'E', null, null)
  rover.mover()
  assert.equal(rover.posicao.eixo_x, 4)

})
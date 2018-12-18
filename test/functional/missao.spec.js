'use strict'

const { test, trait, before, after } = use('Test/Suite')('Missao')

const Missao = use('App/Operacao/Missao')

const DataBase = use('Database')

trait('Test/ApiClient')

test('registrar missao 1', async ({ client }) => {

  const response = await client.post('/missao/registrar').send({
    "planalto_id": 9999999,
    "navegacao": "LMLMLMLMM",
    "direcao": "N",
    "posicao": 
    {
      "eixo_x" : 1, 
      "eixo_y" : 2
    }
  }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    "posicao": {
      "eixo_x": 1,
      "eixo_y": 3
    },
    "direcao": "N"
  })

})

test('registrar missao 2', async ({ client }) => {

  const response = await client.post('/missao/registrar').send({
    "planalto_id": 9999999,
    "navegacao": "MMRMMRMRRM",
    "direcao": "E",
    "posicao": 
    {
      "eixo_x" : 3, 
      "eixo_y" : 3
    }
  }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    "posicao": {
      "eixo_x": 5,
      "eixo_y": 1
    },
    "direcao": "E"
  })

})

before(async () => {
 
  await DataBase.table('planaltos').insert({ 
    id: 9999999,
    nome: 'Teste',
    largura: 7,
    altura: 7})

})

after(async () => {
  
  await DataBase.table('planaltos').where('id', 9999999).delete()
})
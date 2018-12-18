'use strict'

const { test, trait, after } = use('Test/Suite')('Planalto')

const Planalto = use('App/Models/Planalto')

const DataBase = use('Database')

trait('Test/ApiClient')

test('busca lista de planaltos', async ({ client }) => {

  await Planalto.create({
    id: 9999999,
    nome: 'Teste',
    largura: 7,
    altura: 7
  })

  const response = await client.get('/planaltos').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    nome: 'Teste',
    largura: 7,
    altura: 7
  }])

})

after(async () => {
  
  await DataBase.table('planaltos').where('id', 9999999).delete()
})

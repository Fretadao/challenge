# Mars-Rover Fretadão

Esse é um projeto em NodeJs feito com o framework AdonisJs.

O mesmo foi escolhido entre as duas opções por alguns motivos:

1. Gosto de Astronomia
2. Me lembrou um livro que eu gosto(Perdido em Marte)
3. Parecia ser um bom desafio

## Como executar remoto

Para executar remotamente tem duas maneiras:

1. Acessar pelo [Swaggerhub Mars-Rover](https://app.swaggerhub.com/apis/bmalmeida/mars-rover/1.0.0)

2. Usar o Postman, Insomnia ou qualquer uma ferramenta para testes de API e seguir as instruções do próximo tópico

### Vamos lá

1. Para buscar os planaltos

Basta dar um GET em: https://bemalmeida-mars-rover.herokuapp.com/planaltos

#### Retorno:

```
[
  {
    "id": 1,
    "nome": "Planum",
    "largura": 10,
    "altura": 10
  }
]
```

2. Para cadastrar novos planaltos

Basta dar um POST em: https://bemalmeida-mars-rover.herokuapp.com/planaltos

#### Exemplo:

```
{
  "nome": "Planum",
  "largura": 10,
  "altura": 10
}
```

#### Retorno:

``` 
{
  "id": 1,
  "nome": "Planum",
  "largura": 10,
  "altura": 10
}
```

3. Para registrar uma missão

Basta dar um POST em: https://bemalmeida-mars-rover.herokuapp.com/missao/registrar

#### Exemplo:

```
{
    "planalto_id": 1,
    "navegacao": "LMLMLMLMMM",
    "direcao": "N",
    "posicao": {
        "eixo_x": 1,
        "eixo_y": 2
        }
    }
```

#### Retorno:

```
{
    "posicao": {
        "eixo_x": 1,
        "eixo_y": 4
    },
    "direcao": "N"
    }
```

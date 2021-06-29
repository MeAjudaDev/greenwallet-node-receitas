# RECEITAS

## BASE URLs

Para instalar as dependencias basta rodar
## Instalação
```shell
npm i
```

## Rodando o projeto
```shell
npm run dev
```

> [Documentação Completa](https://documenter.getpostman.com/view/14040132/TzedfPGb)

## Alguns Endpoints

### Categorias

#### Cadastrar nova categoria
> POST - /categories

Request
  ```json
  {
    "user_id": 1,
    "name": "Money",
    "type": "R",
    "state": "A"
  }
```

#### Listar categorias
> GET - /categories/user/:user_id

Response
```json
{
  "msg": "success",
  "data": [
    {
      "id": 1,
      "name": "nome categoria",
      "description": "descrição categoria",
      "state": "A",
      "type": "R",
      "user_id": 1,
      "update_at": null,
      "created_at": "2021-04-29T22:17:44.000Z"
    }
  ]
}
```

Listar categoria especifica
> GET categories/user/:user_id/category/:category_id
```json
{
  "message": "success",
  "body": [
    {
      "id": 2,
      "description": "description2",
      "state": "A",
      "type": "R",
      "user_id": 1,
      "update_at": null,
      "created_at": "2021-04-28T01:06:20.000Z"
    }
  ]
}
```

#### Atualizar categoria
> PUT - /categories/user/:user_id/category/:category_id

Request
```json
{
	"name": "Categoria1 não usada",
	"state": "R",
	"type": "A"
}
```

#### Deletar categoria
> PUT - /categories/user/:user_id/category/:category_id

## Receitas

#### Listar receitas
Listar todas as receitas
> GET - /transactions/:user_id

Response
```json
{
  "message": "Success",
  "body": [
    {
      "id": 198,
      "user_id": "10",
      "category_id": 75,
      "description": "Whatsapp 2",
      "value": "10.00",
      "is_fixed": true,
      "due_date": "2021-06-24T03:00:00.000Z",
      "type": "R",
      "state": "A"
    },
    {
      "id": 3,
      "description": "LUZ",
      "value": "800.90",
      "is_fixed": 1,
      "due_date": "2021-04-08T03:00:00.000Z",
      "update_at": null,
      "created_at": "2021-05-06T22:45:21.000Z",
      "user_id": 1,
      "category_id": 1
    }
  ]
}
```

Listar uma receita especifica
> GET - /receipts/user/:user_id/transaction/:receita_id

Response
```json
{
  "message": "success",
  "body": [
      {
          "id": 198,
          "user_id": "10",
          "category_id": 75,
          "description": "Whatsapp 2",
          "value": "10.00",
          "is_fixed": true,
          "due_date": "2021-06-24T03:00:00.000Z",
          "type": "R",
          "state": "A"
      }
  ]
}
```

#### Criar receita
> POST - /transactions
Request
```json
{
    "user_id": "10",
    "category_id": "75",
    "description": "Whatsapp 2",
    "value": 10,
    "is_fixed": true,
    "due_date": "24/06/2021",
    "state": "A",
    "type": "R"
}
```

Response
```json
{
  "message": "success",
  "body": [
      {
          "user_id": "10",
          "category_id": "75",
          "description": "Whatsapp 2",
          "value": 10,
          "is_fixed": true,
          "due_date": "2021-06-24T03:00:00.000Z",
          "state": "A",
          "type": "R",
          "id": 199
      }
  ]
}
```

#### Atualizar receita
> PUT - transactions/user/:user_id/transaction/:transaction_id

Request
```json
{
  "user_id": "10",
  "category_id": "74",
  "description": "Jailson Mendes",
  "value": 10,
  "is_fixed": true,
  "due_date": "28/03/2021",
  "state": "A",
  "type": "R"
}
```

### Profile

#### Deletar profile
> DELETE - /transactions/user/:user_id/transaction/:transaction_id

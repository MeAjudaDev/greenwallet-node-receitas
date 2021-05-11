# RECEITAS

## BASE URLs

Para instalar as dependencias basta rodar
## Instalação
```shell
npm i
```

## Rodando o projeto
```shell
npm start
```
>dev
```shell
npm dev
```

## Endpoints

### Categorias

#### Cadastrar nova categoria
> POST - /categories/:user_id

Request
  ```json
  {
    "name": "Teste1",
    "state": "A",
    "type": "R"
  }
```

#### Listar categorias
> GET - /categories

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
> GET categories/:categorie_id
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
> PUT - /categories/:user_id/categorie_id

Request
```json
{
	"name": "Categoria1 não usada",
	"state": "W",
	"type": "RZ"
}
```

#### Deletar categoria
> PUT - /categories/:user_id

## Receitas

#### Listar receitas
Listar todas as receitas
> GET - /receipts/

Query Params
```
user_id: 1
```

Response
```json
{
  "message": "Success",
  "body": [
    {
      "id": 2,
      "description": "Internet",
      "value": "99.90",
      "is_fixed": 1,
      "due_date": "2021-04-08T03:00:00.000Z",
      "update_at": null,
      "created_at": "2021-05-06T22:44:32.000Z",
      "user_id": 1,
      "category_id": 1
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
> GET - /receipts//:receita_id

Query Params
```
user_id: 1
```

Response
```json
{
  "message": "Success",
  "body": {
    "id": 2,
    "description": "Internet",
    "value": "99.90",
    "is_fixed": 1,
    "due_date": "2021-04-08T03:00:00.000Z",
    "update_at": null,
    "created_at": "2021-05-06T22:44:32.000Z",
    "user_id": 1,
    "category_id": 1
  }
}
```

#### Criar receita
> POST - /receipts/create
Request
```json
{
    "description": "LUZ",
    "value": 800.90,
    "is_fixed": true,
    "due_date": "2021-04-08",
    "category_id": 1,
    "user_id": 1
}
```

Response
```json
{
  "message": "Success"
}
```

#### Atualizar receita
> PUT - /receipts/edit

Request
```json
{
	// opcional
	"description": "Jailson Mendes",
	"is_fixed": 1,
	"value": 13.37,

	//obrigatorios
	"id": 1,
	"user_id": 1,
	"category_id": 1
}
```

### Profile

#### Deletar profile
> DELETE - /receipts/delete/1

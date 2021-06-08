const request = require('supertest')
const app = require("../mockApp")
import Category from '../../models/CategoriesModel'
import connection from '../mockConnection'
import fillDatabase from './db-helper'

describe("GET Endpoints", () =>{
  beforeAll(async ()=>{
    await connection.create()
    await connection.clear()
    await fillDatabase()
  });
  
  afterAll(async ()=>{
    await connection.clear();
    await connection.close()
  });

  it('should statusCode 500 if didnt found a category', async() => {
    const res = await request(app)
    .get('/categories/user/1337/category/99999')
    expect(res.statusCode).toEqual(404)
  });

  it('should return a single category', async() => {
    const res = await request(app)
    .get('/categories/user/1/category/1')
    expect(res.statusCode).toEqual(200)
    expect(res.body.body[0]).toBeInstanceOf(Object)
  });

  it('should return multiple categories from a user', async() =>{
    const res = await request(app)
    .get('/categories/user/1')
    expect(res.statusCode).toEqual(200)
    expect(res.body.body.length).toBeGreaterThan(0)
  })

  it('should return empty body and statusCode 404 if user has no categories', async() =>{
    const res = await request(app)
    .get('/categories/user/1337')

    expect(res.statusCode).toEqual(404)
    expect(res.body.body.length).toBeLessThan(1)
  })
})

describe("POST Endpoints", () =>{
  beforeAll(async ()=>{
    await connection.create()
    await connection.clear()
  });
  
  afterAll(async ()=>{
    await connection.clear();
    await connection.close()
  });

  it('should return code 200 and body response if it added the category with success', async()=>{
    const sentBody = {
      "user_id": 1,
      "name": "Categoria",
      "type": "E",
      "state": "A",
      "id": 1,
    }

    const res = await request(app)
    .post('/categories/')
    .send(sentBody)

    expect(res.statusCode).toEqual(200)
    expect(res.body.body).toEqual(sentBody)
  })
})

describe("DELETE Endpoints", () =>{
  beforeAll(async ()=>{
    await connection.create()
    await connection.clear()
    await fillDatabase()
  });
  
  afterAll(async ()=>{
    await connection.clear();
    await connection.close()
  });

  it('should return status code 200 if the delete operation was successful', async()=>{

    const res = await request(app)
    .delete(`/categories/user/1/category/1`)
    
    expect(res.statusCode).toEqual(200)
  })

  it('should return status code 404 if the delete operation wasnt successful', async ()=>{

    const res = await request(app)
    .delete(`/categories/user/1337/category/696969`)

    expect(res.statusCode).toEqual(404)
  })
})

describe("PUT Endpoints", () =>{
  beforeAll(async ()=>{
    await connection.create()
    await connection.clear()
    await fillDatabase()
  });
  
  afterAll(async ()=>{
    await connection.clear();
    await connection.close()
  });

  it('should return status code 200 if the PUT operation was successful', async()=>{

    const res = await request(app)
    .put(`/categories/user/1/category/1`)
    .send({
      "name": "Coisas fúteis",
      "state": "E",
      "type": "R"
    })
    expect(res.statusCode).toEqual(200)
  })
})


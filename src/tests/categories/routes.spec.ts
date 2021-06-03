const request = require('supertest')
const app = require("../mockApp")
import Category from '../../models/CategoriesModel'
import connection from '../mockConnection'

describe("GET Endpoints", () =>{
  beforeAll(async ()=>{
    await connection.create();
  });
  
  afterAll(async ()=>{
    await connection.close();
  });

  it('should return a single category', async() => {
    const res = await request(app)
    .get('/categories/user/1/category/4')
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
})

describe("DELETE Endpoints", () =>{
})

describe("PUT Endpoints", () =>{
})


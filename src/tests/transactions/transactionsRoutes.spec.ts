import request from "supertest"
const app = require("../mockApp")
import { getCustomRepository } from 'typeorm'
import crypto from "crypto"
import CategoriesRepository from '../../repositories/CategoriesRepository'
import TransactionsRepository from '../../repositories/TransactionsRepository'
import connection from '../mockConnection'

const categoryData = {
    user_id: "1",
    name: crypto.randomBytes(6).toString("hex"),
    state: "A",
    type: "R"
}

const transactionData = {
    id: "0",
    description: crypto.randomBytes(16).toString("hex"),
    value: 1000,
    is_fixed: true,
    due_date: "08/04/2021",
    category_id: "0",
    user_id: "1",
    type: "R",
    state: "A"
}

const createCategory = async () => {
    await getCustomRepository(CategoriesRepository).save(categoryData)

}
const createTransaction = async (transactionData: object) => {
    return await getCustomRepository(TransactionsRepository).save(transactionData)
}

const findCategoryName: any = async (name: string) => {
    return await getCustomRepository(CategoriesRepository).findOne({ name })
}

const findTransactionDescription: any = async (description: string) => {
    return await getCustomRepository(TransactionsRepository).findOne({ description })
}

beforeAll(async ()=>{
    await connection.create();
    await createCategory()
    const getIdCategory = await findCategoryName(categoryData.name)
    transactionData.category_id = getIdCategory.id 
    await createTransaction(transactionData)
    const getIdTransaction = await findTransactionDescription(transactionData.description)
    transactionData.id = getIdTransaction.id 
});

describe("Tests Routes GET Transactions", () => {
    it("Should return statusCode 200 if list all transactions of user_id", async () => {
        const response = await request(app)
            .get(`/transactions/user/${transactionData.user_id}`)
          
        expect(response.statusCode).toBe(200)
    })

    it("Should return statusCode 200 if find transaction", async () => {
      const response = await request(app)
          .get(`/transactions/user/1/transaction/${transactionData.id}`)
        
      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({ message: "success" })
    })

    it("Should return statusCode 404 if not find transaction", async () => {
      const response = await request(app)
          .get(`/transactions/user/1/transaction/0`)
      
      expect(response.statusCode).toBe(404)
      expect(response.body).toMatchObject({ message: 'transaction not found' })
    })
}) 

describe("Tests Routes: POST Transactions", () => {
    it("Should return statusCode 201 and return message success with body if transaction was successfully created", async () => {
        const response = await request(app)
            .post("/transactions")
            .send(transactionData)
        
        expect(response.statusCode).toBe(201)
        expect(response.body).toMatchObject({ message: "success", body: [transactionData] })
    })

    it("Should return statusCode 422 if has errors in body", async () => {
        const response = await request(app)
          .post("/transactions")
          .send("")
        
        expect(response.statusCode).toBe(422)
    })
}) 

describe("Tests Routes: PUT Transactions", () => {
    it("Should return stausCode 200 if update was successfully", async () => {
        const response = await request(app)
            .put(`/transactions/user/1/transaction/${transactionData.id}`)
            .send(transactionData)

        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({ message: "success"})
    })
    
    it("Should return statusCode 404 if not found transaction in routes update", async () => {
      const response = await request(app)
      .put(`/transactions/user/0/transaction/0`)
      .send(transactionData)

      expect(response.statusCode).toBe(404)
      expect(response.body).toMatchObject({ message: 'transaction not found' })
    })
}) 

describe("Test Routes: DELETE Transactions", () => {
  it("Should return statusCode 200 if delete was successfully", async () => {
    const response = await request(app).delete(`/transactions/user/1/transaction/${transactionData.id}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject({ message: "success" })
  })

  it("Should return statusCode 404 if not found transaction in route delete", async () => {
    const response = await request(app).delete(`/transactions/user/1/transaction/0`)

    expect(response.statusCode).toBe(404)
    expect(response.body).toMatchObject({ message: 'transaction not found' })
  })
  
})
 

afterAll(async ()=>{
    await getCustomRepository(CategoriesRepository).delete({ id: transactionData.category_id })
    await connection.close();
})
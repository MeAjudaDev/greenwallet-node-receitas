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

beforeAll(async ()=>{
    await connection.create();
    await getCustomRepository(CategoriesRepository).save(categoryData)
    //const getIdCategory = await getCustomRepository(CategoriesRepository).findOne({ name: categoryData.name })
    //transactionData.category_id = getIdCategory!.id 
    //await getCustomRepository(TransactionsRepository).save(transactionData)
    /* const getIdTransaction = await getCustomRepository(TransactionsRepository).findOne({ description: transactionData.description })
    transactionData.id = getIdTransaction!.id */
});

describe("Test Routes GET Transactions", () => {
    it("Should return statusCode 200 if exist user_id", async () => {
        const response = await request(app)
            .get(`/transactions/user/${transactionData.user_id}`)
            
            console.log(response.body)
        expect(response.statusCode).toBe(200)
    })
}) 

/* describe("Test Routes: POST Transactions", () => {
    it("Should return statusCode 201 if transaction was sucessfully created", async () => {
        const response = await request(app)
            .post("/transactions")
            .send(transactionData)
        
        expect(response.statusCode).toBe(201)
        expect(response.body).toMatchObject({ message: "success", body: [] })
    })

    it("Should return statusCode 422 if has errors in body", (done) => {
        request(app)
            .post("/transactions")
            .send("")
            .expect(422)
            .end((error, resp) => {
                if(error) return done(error)
                return done()
            })
    })
})  */
/* 
describe("Test Routes: PUT Transactions", () => {
    it("Should return stausCode 200 if update was sucessfully", async () => {
        const response = await request(app)
            .put(`/transactions/user/1/transaction/${transactionData.id}`)
            .send(transactionData)

        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({ message: "success"})
 
    })  
})
 */

afterAll(async ()=>{
    //await getCustomRepository(CategoriesRepository).delete({ id: transactionData.category_id })
    await connection.close();
})
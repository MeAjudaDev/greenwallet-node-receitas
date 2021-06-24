import 'reflect-metadata'
import './database/connect'
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import transactionsRoutes from './routes/transactionsRoutes'
import categoriesRoutes from './routes/categoriesRoutes'

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

app.use('/transactions', transactionsRoutes)
app.use('/categories', categoriesRoutes)

export default app

import { parseAsync } from 'json2csv'
import { convertDBDateToNormal } from '../helpers/datesHelpers'
import Transactions from '../models/TransactionsModel'

export const generateCSV = async(data: Array<Transactions>) =>{

  //parse dates to dd-mm-yyyy format
  const parsedData = data.map((value)=>{
    return {...value, due_date: convertDBDateToNormal(String(value.due_date))}
  })

  //fields that goes into the csv
  const fields: any = ['description', 'value', 'is_fixed', 'due_date']
  const opts = {fields}
  
  //use parseAsync, so that it doesn't stops nodejs event loop
  return await parseAsync(parsedData, opts)
}
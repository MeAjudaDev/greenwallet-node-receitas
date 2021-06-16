import PDFDocument from 'pdfkit'
import path from 'path'
import { convertDBDateToNormal } from '../helpers/datesHelpers';
import Transactions from '../models/TransactionsModel';

export const generatePDF = async(data:Array<Transactions>) =>{
  const doc = new PDFDocument();
  createDocumentLayout(doc)

  for(const transaction of data){
    createTransactionBlock(doc,transaction)
  }
  return doc
} 

const createTransactionBlock = (doc: any, data: Transactions) =>{
  doc.text('Description: ' + data.description)
  doc.text('Value: ' + data.value)
  doc.text('Due date: ' + convertDBDateToNormal(String(data.due_date)))
  doc.moveDown()
}

const createDocumentLayout = (doc: any) =>{
  //each time a new page is added, the logo is inserted on the top left
  doc.on('pageAdded', ()=>{
    doc.image(path.join(__dirname, '../assets/images/logo.png'), {
      fit: [40, 40],
      align:'left',
      valign:'left'
    })
  })

  //add the logo to the first page
  doc.image(path.join(__dirname, '../assets/images/logo.png'), {
    fit: [40, 40],
    align:'left',
    valign:'left'
  })

  //add margin down
  doc.moveDown()
  doc.fontSize(20)
}
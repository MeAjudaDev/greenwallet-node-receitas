import PDFDocument from 'pdfkit'
import Transactions from '../models/TransactionsModel';
import path from 'path'

export const generatePDF = async(data:Array<Transactions>) =>{
  const doc = new PDFDocument();

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


  for(const transaction of data){
    doc.fontSize(20)
    doc.text('Description: ' + transaction.description)
    doc.text('Value: ' + transaction.value)
    doc.text('Due date: ' + transaction.due_date.getMonth() + '/' + transaction.due_date.getDate() + '/' + transaction.due_date.getFullYear())
    doc.moveDown()
    console.log('a')
  }
  return doc
} 


const ReceiptsService = require('../services/ReceiptsService')

const createReceipt = async (req, res) => {
    try{
        const status = await ReceiptsService.create(req.body)
        return res.status(status).json({message: 'Success'})
    }catch(e){
        return res.status(400).json({message: 'Error while trying to create receipt', error: e.message})
    }
}

const editReceipt = async (req, res) => {
    try {
        const update = await ReceiptsService.edit(req.body)
        const status = update.affectedRows == 1 ? { code:200, message: 'Success'} : { code: 500, message: "Couldn't edit any receipt with the given id" } 
        return res.status(status.code).json({ message: status.message })
    
    } catch (error) {
        return res.status(500).json({ message: 'Error while trying to edit receipt', error: error.message })
    }
}

const getSingleReceipt = async (req, res) => {
    try{
        const receipt = await ReceiptsService.list({data:req.params, single:true})
        const status = receipt.length > 0 ? { code: 200, message: 'Success', body: receipt[0] } : { code: 500, message: "Couldn't find a receipt with the given id" }
        return res.status(status.code).json({ message: status.message, body: status.body })
    }catch(e){
        return res.status(400).json({message: 'Error while trying to get a single receipt', error: e.message})
    }
}

const getMultipleReceipts = async (req, res) => {
    try{
        const receipts = await ReceiptsService.list({data:req.query, single:false}) 
        if(receipts.length < 1){
            return res.status(500).json({ message: "Couldn't find any receipts with the given parameters"})
        }else{
            return res.status(200).json({ message: 'Success', body: receipts})
        }
    }catch(e){
        return res.status(400).json({message:'Error while trying to get multiple receipts', error: e.message})
    }
}

const deleteReceipt = async (req, res) => {
    try{
        const del = await ReceiptsService.del({id:req.params.id})
        const status = del.affectedRows == 1 ? { code:200, message: 'Delete with success' } : { code: 500, message: "Couldn't find any receipt with the given id"}
        return res.status(status.code).json({ message: status.message })
    }catch(e){
        return res.json({message: 'Erro while trying to delete the receipt', error: e.message})
    }
}

module.exports = {
    createReceipt,
    editReceipt,
    getSingleReceipt,
    getMultipleReceipts,
    deleteReceipt,
}
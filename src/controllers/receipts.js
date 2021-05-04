const ReceiptsService = require('../services/ReceiptsService')

const createReceipt = async (req, res, next) => {
    try{
        const status = await ReceiptsService.create(req.body)
        return res.status(status).json({message: 'Request done'})
    }catch(e){
        return res.status(400).json({message: e.message})
    }
}

const editReceipt = async (req, res, next) => {
    try {
        const update = await ReceiptsService.edit(req.body)
        const status = update.affectedRows == 1 ? { code:200, message: 'Request done'} : { code: 500, message: "Couldn't edit any receipt with the given id" } 
        return res.status(status.code).json({ message: status.message })
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({ err: error })
    }
}

const getSingleReceipt = async (req, res, next) => {
    try{
        if(!req.params.id){
            return res.status(422).json({message: 'Missing params'})
        }
        const receipt = await ReceiptsService.list({data:req.params, single:true})
        const status = receipt.length > 0 ? { code: 200, message: receipt[0] } : { code: 500, message: "Couldn't find a receipt with the given id" }
        return res.status(status.code).json({ message: status.message })
    }catch(e){
        return res.status(400).json({message: e.message})
    }
}

const getMultipleReceipts = async (req, res, next) => {
    try{
        if(!req.query.user_id){
            return res.status(422).json({message: 'Missing params'})
        }
        const receipts = await ReceiptsService.list({data:req.query, single:false}) 
        if(receipts.length < 1){
            return res.status(500).json({ message: "Couldn't find any receipts with the given parameters"})
        }else{
            return res.status(200).json({receipts})
        }
    }catch(e){
        return res.status(400).json({message: e.message})
    }
}

const deleteReceipt = async (req, res, next) => {
    try{
        const id = req.params.id
        if(!id) {
            return res.status(422).json({message: 'Invalid params'})
        }
        const del = await ReceiptsService.del({id})
        const status = del.affectedRows == 1 ? { code:200, message: 'Request done!' } : { code: 500, message: "Couldn't find any receipt with the given id"}
        return res.status(status.code).json({ message: status.message })
    }catch(e){
        return res.json({message: e.message})
    }
}

module.exports = {
    createReceipt,
    editReceipt,
    getSingleReceipt,
    getMultipleReceipts,
    deleteReceipt,
}
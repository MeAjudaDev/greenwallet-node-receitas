const ReceiptsService = require('../services/ReceiptsService')

const createReceipt = async (req, res, next) => {
    try{
        //  todo validation on a different folder
        if(!req.body.description || !req.body.value || !req.body.due_date ||! req.body.category_id || !req.body.user_id){
            return res.status(422).send({ message: 'Invalid params!' });
        }

        const status = await ReceiptsService.create(req.body)
        return res.status(status).json({message: 'Request done'})
    }catch(e){
        return res.status(400).json({message: e.message})
    }
}

const editReceipt = async (req, res, next) => {
    try{
        
    }catch(e){
        
    }
}

const getReceipts = async (req, res, next) => {
    try{
        if(req.params && !req.query){
            const receipt = await ReceiptsService.list({data:req.params, single:true})
            const status = receipt.length > 0 ? { code: 200, message: receipt[0] } : { code: 500, message: "Couldn't find a receipt with the given id" }
            return res.status(status.code).json({ message: status.message })
        }else if(!req.params && req.query){

        }else{
            return res.status(400).json({message: 'Invalid request'})
        }
    }catch(e){
        return res.status(400).json({message: e.message})
    }
}

const deleteReceipt = async (req, res, next) => {
    try{

    }catch(e){
        
    }
}

module.exports = {
    createReceipt,
    editReceipt,
    getReceipts,
    deleteReceipt
}
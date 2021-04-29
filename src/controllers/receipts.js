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
    try {
        //  todo validation on a different folder
        if(!req.body.description || !req.body.value || !req.body.due_date ||! req.body.category_id || !req.body.user_id || !req.body.is_fixed){
            return res.status(422).send({ message: 'Invalid params!' });
        }

        const update = await ReceiptsService.edit(req.body)
        const status = update.affectedRows == 1 ? { code:200, message: 'Request done'} : { code: 500, message: "Couldn't edit any receipt with the given id" } 
        return res.status(status.code).json({ message: status.message })
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({ err: error })
    }
}

const getReceipts = async (req, res, next) => {
    try{

    }catch(e){
        
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
    getReceipts,
    deleteReceipt
}
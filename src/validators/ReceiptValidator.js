
const ValidatorMiddleware = async (req, res, next) =>{
    let errors = []
    let errMessage = ''
    switch (req.method){
        case "GET":{
            message += 'list'
        }
        case "POST":{
            message += 'add'
        }
        case "PUT":{
            message += 'edit'
        }
        case "DELETE":{
            message += 'delete'
        }
    }
    if(erros){
        return
    }
    next()
}

const validateCreateReceipt = () =>{

}

const validateEditReceipt = () =>{
    
}

const validateGetSingleReceipt = () =>{

}

const validateGetMultipleReceipts = () =>{

}

const validateDeleteReceipt = () =>{

}


module.exports = {
    ValidatorMiddleware
}
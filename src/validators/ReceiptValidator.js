
const ValidatorMiddleware = async (req, res, next) =>{
    let errorJson = {
        message: 'Error on ',
        errors: {
            missingParams:[]
        }
    }
    switch (req.method){
        case "GET":{
            break
        }
        case "POST":{
            const neededParams = [
                "description",
                "value",
                "due_date",
                "category_id",
                "user_id"
            ]
            const checkParams = checkHasParams({neededParams, reqParams: req.body})
            if(checkParams.hasError){
                errorJson.errors.missingParams = checkParams.errors
                errorJson.message += 'create receipt'
            }
            break
        }
        case "PUT":{
            validateEditReceipt(errorJson, req.body)
            break
        }
        case "DELETE":{
            validateDeleteReceipt(errorJson, req.body)
            break
        }
    }
    if(errorJson.errors.missingParams.length >= 1){
        return res.status(422).json(errorJson)
    }
    next()
}

const validateEditReceipt = (errJson, reqParams) =>{
    const checkParams = checkHasParams({neededParams, reqParams})
    if(checkParams.hasError){
        errJson.errors = checkParams.errors
        errJson.message += 'edit'
    }
}

const validateGetSingleReceipt = (errJson, reqParams) =>{
    const checkParams = checkHasParams({neededParams, reqParams})
    if(checkParams.hasError){
        errJson.errors = checkParams.errors
        errJson.message += 'list'
    }
}

const validateGetMultipleReceipts = (errJson, reqParams) =>{
    const checkParams = checkHasParams({neededParams, reqParams})
    if(checkParams.hasError){
        errJson.errors = checkParams.errors
        errJson.message += 'list'
    }
}

const validateDeleteReceipt = (errJson, reqParams) =>{
    const checkParams = checkHasParams({neededParams, reqParams})
    if(checkParams.hasError){
        errJson.errors = checkParams.errors
        errJson.message += 'delete'
    }
}

const checkHasParams = ({neededParams, reqParams}) =>{
    let res = {
        errors: [],
        hasError: false
    }
    for(p of neededParams){
        if(typeof reqParams[p] == 'undefined' || reqParams[p] == null){
            res.errors.push(p)
            res.hasError = true
        }
    }
    return res
}

module.exports = {
    ValidatorMiddleware
}
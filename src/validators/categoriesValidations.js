const db = require("../helpers/database")

function ValidationCategories(name, state, type){

    const stateAllowed = ["A", "D", "E"]
    const typesAllowed = ["E", "R"]

    if(name.length > 100){
        return { message: "allowed limit up to 100 characters in name" }
    }

    if(!stateAllowed.includes(state)){
        return { message: "Invalid params in state" }
    }

    if(!typesAllowed.includes(type)){
        return { message: "Invalid params in type" }
    }

    return { message: "" }
}

async function ValidationNameAllowed (idUser, idCategory, name){
    const verifyNameallowed = await db.findSpecificRow({ table: "categories", params: `where user_id=${idUser} and id !=${idCategory}` })

    const verifyName = verifyNameallowed.filter(result => {
        if(result.name === name){
            return result
        }

        return 0
    }) 

    if(verifyName.length !== 0){
        return { message: "name already used" }
    }

    return { message: "" }
}

module.exports = {
    ValidationNameAllowed,
    ValidationCategories
}
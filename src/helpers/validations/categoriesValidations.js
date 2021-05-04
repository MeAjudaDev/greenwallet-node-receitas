
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

module.exports = ValidationCategories
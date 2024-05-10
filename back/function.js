function saveName(name){
    const savedNames = getName()
    if(savedNames.some(item=>item.name!==name)){
        const newNames = [...savedNames,name]
        save(newNames)
    }else{
        return false
    }
}

function getName(){
    const savedNames = localStorage.getItem("names")
    if(savedNames){
        return JSON.parse(savedNames)
    }
    else{
        return []
    }
}

function deleteName(id){
    const savedNames = getName()
    savedNames.splice(id,1)
    save(savedNames)
}

function updateName(id,name){
    const savedNames = getName()
    savedNames[id] = {name:name,checked:savedNames[id].checked}
    save(savedNames)
}

function updateCheck(id){
    const savedNames = getName()
    savedNames[id] = {...savedNames[id],checked:!savedNames[id].checked}
    save(savedNames)
}

function save(arr){
    try {
        localStorage.setItem("names", JSON.stringify(arr))
        return true
    } catch (error) {
        return false
    }
}

module.exports = {
    saveName,
    getName,
    deleteName,
    updateName,
    updateCheck,
    save
};
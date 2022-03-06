var Choice = -1
//Local storage handlers
let possibleItems = []
possibleItems = JSON.parse(localStorage.getItem("contacts"))
if(possibleItems !== "undefined" && possibleItems !== null){
    for(let i = 0; i < possibleItems.length; i++) {
        newItem = document.createElement("div")
        newItem.classList.add("item")
        newItem.innerHTML = possibleItems[i]
        document.querySelector(".contentArea").appendChild(newItem)
    }
}

function addLocalStorage(item){

    let possibleItems = []
    if(localStorage.getItem("contacts") === "undefined" || localStorage.getItem("contacts") === null) {
        possibleItems.push(item.innerHTML)
        localStorage.setItem("contacts", JSON.stringify(possibleItems))
    }
    else {
        possibleItems = JSON.parse(localStorage.getItem("contacts"))
        possibleItems.push(item.innerHTML)
        localStorage.setItem("contacts", JSON.stringify(possibleItems))
    }
}
function deleteLocalStorage(item){

    let possibleItems = []
    if(!(localStorage.getItem("contacts") === "undefined" || localStorage.getItem("contacts") === null)) {
        possibleItems = JSON.parse(localStorage.getItem("contacts"))
        for(i = 0; i < possibleItems.length; i++)
            if(possibleItems[i] === item)
                possibleItems.splice(i,1)
        localStorage.setItem("contacts", JSON.stringify(possibleItems))
    }


}


//Inpute handlers
function handleInput(){
    const inputArea = document.querySelector(".inputArea")
    // console.log(inputArea.children)
    if(inputArea.classList[1] === "visible") {
        const name1 = inputArea.children[1].value
        const name2 = inputArea.children[3].value
        const phone = inputArea.children[5].value
        let addContent = []
        addContent.push(name1)
        addContent.push(name2)
        addContent.push(phone)
        inputArea.children[1].value =""
        inputArea.children[3].value =""
        inputArea.children[5].value =""
        return addContent
    }
}
//Keyboard events
document.addEventListener("keydown",function(event){
    if(event.key === "Enter" && Choice === 0)
        addContact(handleInput())
    else if(event.key === "Enter" && Choice === 1)
        removeContact(handleInput())
     else if(event.key === "Enter" && Choice === 2) {
        showContacts(handleInput())
    }
})

//Menu handlers
const menu = document.querySelector(".menu")
menu.addEventListener("click", function(event){
    const target = event.target
    const inputArea = document.querySelector(".inputArea")
    if(target.classList[0] === "add") {
        Choice = 0
        document.querySelector(".current").textContent = "Add."
        inputArea.classList.replace("hidden","visible")
    }
    else if(target.classList[0] === "remove") {
        Choice = 1
        document.querySelector(".current").textContent = "Remove."
        inputArea.classList.replace("hidden","visible")
    }

    else if(target.classList[0] === "show") {
        Choice = 2
        document.querySelector(".current").textContent = "Search."
        inputArea.classList.replace("hidden","visible")
    }
})
//Add handlers
function addContact(addContent){
    //Validation
    const validationResult = validate(addContent)
    if(validationResult === 1) {
        Choice = -1
        const contentArea = document.querySelector(".contentArea")
        const newItem = document.createElement("div")
        newItem.classList.add("item")
        newItem.innerHTML = "<h4>Name: </h4><p>" + addContent[0] + "</p>" + "<h4>Last name: </h4><p>" + addContent[1] + "</p>" + "<h4>Phone: </h4><p>" + addContent[2] + "</p>"
        contentArea.appendChild(newItem)
        addLocalStorage(newItem)
        document.querySelector(".inputArea").classList.replace("visible","hidden")
    }
    else{
        validationResult.classList.add("red")
        setTimeout(function(){alreadyAdded(validationResult)},1000)
    }

}
//Validation handlers
function validate(newItem){
    for(i = 0; i < newItem.length; i++)
        if (newItem[i] === "")
            return 0

    const searchResult = hardSearchItem(newItem,2)
    if(searchResult === 0)
        return 1
    else
        return searchResult
}
//Already added handlers
function alreadyAdded(item){
    item.classList.remove("red")
}
//Show contacts handlers
function showContacts(targetContent){
    const items = document.querySelectorAll(".item")
    if(typeof items === undefined) {
        const menu = document.querySelector(".menu")
        menu.classList.add("bounce")
        setTimeout(function(){removeClass(menu)}, 500)
    }
    else {
        const searchResult = hardSearchItem(targetContent,2)
        if(searchResult === 0) {
            const menu = document.querySelector(".menu")
            menu.classList.add("bounce")
            setTimeout(function(){removeClass(menu)}, 500)
        }
        else {
            searchResult.classList.add("bounce")
            setTimeout(function(){removeClass(searchResult)}, 500)
            Choice = -1
            document.querySelector(".inputArea").classList.replace("visible","hidden")
        }
    }

}

//Search items handlers
// function searchItem(newItem){
//     let items = document.querySelectorAll(".item")
//     let i = 0
//     for(i = 0; i < newItem.length; i++) {
//         if (typeof items !== undefined)
//             for (let j = 0; j < items.length; j++) {
//                 // console.log(newItem[i],items[j])
//                 if (i === 0) {
//                     if (items[j].children[1].textContent === newItem[i])
//                         return items[j]
//                 } else if (i === 1) {
//                     if (items[j].children[3].textContent === newItem[i])
//                         return items[j]
//                 } else if (i === 2)
//                     if (items[j].children[5].textContent === newItem[i])
//                         return items[j]
//
//             }
//     }
//
//     return 0
// }

//remove class helpers
function removeClass(target){
    target.classList.remove("bounce")
}
//Remove contact handlers
function removeContact(targetContent){
    const items = document.querySelectorAll(".item")
    if(typeof items === undefined) {
        const menu = document.querySelector(".menu")
        menu.classList.add("bounce")
        setTimeout(function(){removeClass(menu)}, 500)
    }
    else {
        const searchResult = hardSearchItem(targetContent,3)
        if(searchResult === 0) {
            const menu = document.querySelector(".menu")
            menu.classList.add("bounce")
            setTimeout(function(){removeClass(menu)}, 500)
        }
        else {
            searchResult.remove()
            deleteLocalStorage(searchResult.innerHTML)
            Choice = -1
            document.querySelector(".inputArea").classList.replace("visible","hidden")
        }
    }

}
//Hard search handlers
function hardSearchItem(newItem,no){
    let items = document.querySelectorAll(".item")
    let i = 0
    if (typeof items !== undefined)
    for (let j = 0; j < items.length; j++) {
        let nr = 0
        for(i = 0; i < newItem.length; i++) {
                if (i === 0) {
                    if (items[j].children[1].textContent === newItem[i])
                        nr++;
                } else if (i === 1) {
                    if (items[j].children[3].textContent === newItem[i])
                        nr++
                } else if (i === 2)
                    if (items[j].children[5].textContent === newItem[i])
                        nr++
            }
        if(nr >= no)
            return items[j]
    }

    return 0
}
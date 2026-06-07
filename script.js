let total=0
document.querySelector(".e-add").addEventListener("click", add_expense)
function add_expense(){
    let name=document.querySelector(".e-name").value 
    let amnt=document.querySelector(".e-amnt").value

    if (name==='' || amnt===''){
        alert("Please fill both fields")
        return
    }

    let li=document.createElement("li")
    li.innerText= name + "- Rs " + amnt 

    let deletebtn=document.createElement("button")
    deletebtn.innerHTML="&#128465;"

    deletebtn.addEventListener("click", function(){
        li.remove()
        total-=Number(amnt)
        document.querySelector(".e-total").innerText="Total Expenditure -- Rs " + total
    })
    deletebtn.classList.add("delete-btn")

    li.appendChild(deletebtn)

    document.querySelector(".e-list").appendChild(li)

    document.querySelector(".e-name").value=''
    document.querySelector(".e-amnt").value=''

    total+=Number(amnt)
    document.querySelector(".e-total").innerText="Total Expenditure -- Rs " + total

}

document.querySelector(".t-add").addEventListener("click", add_task)

function add_task(){
    let task= document.querySelector(".t-name").value

    if (task===''){
        alert("Please Enter a Task")
        return
    }

    let li= document.createElement("li")
    li.innerText=task

    let checkbox= document.createElement("input")
    checkbox.type= "checkbox"
    checkbox.addEventListener("change", function(){
        if (checkbox.checked){ li.style.textDecoration="line-through"}
        else{li.style.textDecoration= "none"}
    })
    checkbox.classList.add("checkbox")

    let deletebtn= document.createElement("button")
    deletebtn.innerHTML="&#128465;"

    deletebtn.addEventListener("click", function(){
        li.remove()
    })
    deletebtn.classList.add("delete-btn")

    li.appendChild(checkbox)
    li.appendChild(deletebtn)

    document.querySelector(".t-list").appendChild(li)

    document.querySelector(".t-name").value=''

}
const API = "http://127.0.0.1:5000"

// ── EXPENSES ──────────────────────────────

function loadExpenses() {
    fetch(API + "/expenses")
        .then(r => r.json())
        .then(data => {
            document.querySelector(".e-list").innerHTML = ""
            let total = 0
            data.forEach(expense => {
                displayExpense(expense)
                total += expense.amount
            })
            document.querySelector(".e-total").innerText = "Total: Rs " + total
        })
}

function displayExpense(expense) {
    let li = document.createElement("li")
    li.innerText = expense.name + " - Rs " + expense.amount

    let deletebtn = document.createElement("button")
    deletebtn.innerHTML = "&#128465;"
    deletebtn.classList.add("delete-btn")
    deletebtn.addEventListener("click", function() {
        fetch(API + "/expenses/" + expense.id, { method: "DELETE" })
            .then(() => loadExpenses())
    })

    li.appendChild(deletebtn)
    document.querySelector(".e-list").appendChild(li)
}

document.querySelector(".e-add").addEventListener("click", function() {
    let name = document.querySelector(".e-name").value
    let amnt = document.querySelector(".e-amnt").value

    if (name === '' || amnt === '') {
        alert("Please fill both fields")
        return
    }

    fetch(API + "/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, amount: Number(amnt) })
    })
    .then(r => r.json())
    .then(data => {
        displayExpense(data)
        document.querySelector(".e-name").value = ''
        document.querySelector(".e-amnt").value = ''
        loadExpenses()
    })
})

// ── TASKS ──────────────────────────────

function loadTasks() {
    fetch(API + "/tasks")
        .then(r => r.json())
        .then(data => {
            document.querySelector(".t-list").innerHTML = ""
            data.forEach(task => {
                displayTask(task)
            })
        })
}

function displayTask(task) {
    let li = document.createElement("li")
    li.innerText = task.name

    if (task.done) {
        li.style.textDecoration = "line-through"
    }

    let checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = task.done
    checkbox.classList.add("checkbox")

    checkbox.addEventListener("change", function() {
        fetch(API + "/tasks/" + task.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ done: checkbox.checked })
        })
        .then(() => loadTasks())
    })

    let deletebtn = document.createElement("button")
    deletebtn.innerHTML = "&#128465;"
    deletebtn.classList.add("delete-btn")
    deletebtn.addEventListener("click", function() {
        fetch(API + "/tasks/" + task.id, { method: "DELETE" })
            .then(() => loadTasks())
    })

    li.appendChild(checkbox)
    li.appendChild(deletebtn)
    document.querySelector(".t-list").appendChild(li)
}

document.querySelector(".t-add").addEventListener("click", function() {
    let task = document.querySelector(".t-name").value

    if (task === '') {
        alert("Please Enter a Task")
        return
    }

    fetch(API + "/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: task })
    })
    .then(r => r.json())
    .then(data => {
        document.querySelector(".t-name").value = ''
        loadTasks()
    })
})

// load tasks when page opens
loadTasks()


// load everything when page opens
loadExpenses()
loadTasks()
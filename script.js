let balance = 0;

let expenses = [];

let editingIndex = null;

const balanceElement = document.getElementById("balance");

const form = document.getElementById("expenseForm");

const titleInput = document.getElementById("title");

const amountInput = document.getElementById("amount");

const expenseList = document.getElementById("expenseList");


// ==============================
// CLEAR ALL BUTTON
// ==============================

const clearAllButton = document.createElement("button");

clearAllButton.textContent = "Clear All";

clearAllButton.type = "button";

expenseList.parentElement.appendChild(clearAllButton);


// ==============================
// DISPLAY EXPENSES
// ==============================

function displayExpenses() {

    expenseList.innerHTML = "";

    expenses.forEach(function (expense, index) {

        const li = document.createElement("li");

        li.innerHTML = `
            ${expense.title} - ₹${expense.amount}

            <button data-index="${index}" data-action="edit">
                Edit
            </button>

            <button data-index="${index}" data-action="delete">
                Delete
            </button>
        `;

        expenseList.appendChild(li);

    });

}


// ==============================
// CALCULATE TOTAL
// ==============================

function calculateTotal() {

    const total = expenses.reduce(function (sum, expense) {

        return sum + expense.amount;

    }, 0);

    balance = -total;

    balanceElement.textContent = `₹${balance}`;

}


// ==============================
// ADD / UPDATE EXPENSE
// ==============================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const title = titleInput.value.trim();

    const amount = Number(amountInput.value);

    if (title === "" || amount <= 0 || !Number.isFinite(amount)) {

        return;

    }


    const expense = {

        title: title,

        amount: Number(amount.toFixed(2)),

    };


    // EDIT MODE
    if (editingIndex !== null) {

        expenses[editingIndex] = expense;

        editingIndex = null;

    }

    // ADD MODE
    else {

        expenses.push(expense);

    }


    displayExpenses();

    calculateTotal();

    form.reset();

});


// ==============================
// EDIT + DELETE
// ==============================

expenseList.addEventListener("click", function (event) {

    if (event.target.tagName !== "BUTTON") {

        return;

    }


    const index = Number(event.target.dataset.index);

    const action = event.target.dataset.action;


    // EDIT
    if (action === "edit") {

        const expense = expenses[index];

        titleInput.value = expense.title;

        amountInput.value = expense.amount;

        editingIndex = index;

        titleInput.focus();

    }


    // DELETE
    if (action === "delete") {

        expenses = expenses.filter(function (expense, expenseIndex) {

            return expenseIndex !== index;

        });

        displayExpenses();

        calculateTotal();

    }

});


// ==============================
// CLEAR ALL
// ==============================

clearAllButton.addEventListener("click", function () {

    if (expenses.length === 0) {

        return;

    }


    const confirmDelete = confirm(
        "Are you sure you want to delete all expenses?"
    );


    if (confirmDelete) {

        expenses = [];

        editingIndex = null;

        displayExpenses();

        calculateTotal();

        form.reset();

    }

});
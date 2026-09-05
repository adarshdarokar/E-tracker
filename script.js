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
// SEARCH INPUT
// ==============================

const searchInput = document.createElement("input");

searchInput.type = "text";

searchInput.placeholder = "Search expenses...";

expenseList.parentElement.insertBefore(searchInput, expenseList);


// ==============================
// EXPENSE SUMMARY
// ==============================

const summaryElement = document.createElement("div");

summaryElement.innerHTML = `
    <p>Total Expenses: <span id="expenseCount">0</span></p>
    <p>Total Spent: ₹<span id="totalSpent">0</span></p>
`;

expenseList.parentElement.appendChild(summaryElement);

const expenseCountElement = document.getElementById("expenseCount");

const totalSpentElement = document.getElementById("totalSpent");


// ==============================
// DISPLAY EXPENSES
// ==============================

function displayExpenses() {

    expenseList.innerHTML = "";

    const searchText = searchInput.value.toLowerCase().trim();

    expenses.forEach(function (expense, index) {

        if (!expense.title.toLowerCase().includes(searchText)) {

            return;

        }

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
// UPDATE SUMMARY
// ==============================

function updateSummary() {

    const total = expenses.reduce(function (sum, expense) {

        return sum + expense.amount;

    }, 0);

    expenseCountElement.textContent = expenses.length;

    totalSpentElement.textContent = total.toFixed(2);

}


// ==============================
// ADD / UPDATE EXPENSE
// ==============================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const title = titleInput.value.trim();

    const amount = Number(amountInput.value);


    // VALIDATION

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

    updateSummary();

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

        updateSummary();

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

        updateSummary();

        form.reset();

    }

});


// ==============================
// SEARCH EXPENSES
// ==============================

searchInput.addEventListener("input", function () {

    displayExpenses();

});


// ==============================
// INITIAL SUMMARY
// ==============================

updateSummary();
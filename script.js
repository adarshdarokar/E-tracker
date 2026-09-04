let balance = 0;

let expenses = [];

let editingIndex = null;

const balanceElement = document.getElementById("balance");

const form = document.getElementById("expenseForm");

const titleInput = document.getElementById("title");

const amountInput = document.getElementById("amount");

const expenseList = document.getElementById("expenseList");


function displayExpenses() {

    expenseList.innerHTML = "";

    expenses.forEach(function (expense, index) {

        const li = document.createElement("li");

        li.innerHTML = `${expense.title} - ₹${expense.amount}

            <button data-index="${index}">Delete</button>

        `;

        expenseList.appendChild(li);

    });

}


function calculateTotal() {

    const total = expenses.reduce(function (sum, expense) {

        return sum + expense.amount;

    }, 0);

    balance = -total;

    balanceElement.textContent = `₹${balance}`;

}


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

    expenses.push(expense);

    displayExpenses();

    calculateTotal();

    form.reset();

});


expenseList.addEventListener("click", function (event) {

    if (event.target.tagName === "BUTTON") {

        const index = Number(event.target.dataset.index);

        expenses = expenses.filter(function (expense, expenseIndex) {

            return expenseIndex !== index;

        });

        displayExpenses();

        calculateTotal();

    }

});
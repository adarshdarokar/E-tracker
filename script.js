let balance = 0;

const expenses = [];

const balanceElement = document.getElementById("balance");
const form = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expenseList");


function displayExpenses() {

    expenseList.innerHTML = "";

    expenses.forEach(function (expense) {

        const li = document.createElement("li");

        li.textContent = `${expense.title} - ₹${expense.amount}`;

        expenseList.appendChild(li);

    });

}

  function calculateTotal(){
    const total = expenses.reduce(function(sum, expense){
        return sum + expense.amount
    }, 0)

    balance = -total;
    balanceElement.textContent = `₹${balance}`
  }

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const title = titleInput.value;
    const amount = Number(amountInput.value);

    const expense = {
        title: title,
        amount: amount
    };

    expenses.push(expense);

    displayExpenses();
    calculateTotal()

});
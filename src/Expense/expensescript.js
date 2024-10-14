function logOut(){
    localStorage.setItem('loggedUser',"")
    window.location.href="../../index.html"
}

function cancel(){
    document.getElementById('expenseSection').reset();
}

function radioclick(type){
    const value= document.getElementById(type).checked;
    if(type=="income"){
        document.getElementById("expense").checked=false;
    }else{
        document.getElementById("income").checked=false;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('amount').addEventListener('keypress',function(e) {
        const charCode = e.charCode;
        const char = String.fromCharCode(charCode);
        
        // Allow backspace and delete (for IE/Edge) and other control characters
        if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            return;
        }

        // Prevent non-numeric characters except for a single dot (.)
        if (!/[0-9.]/.test(char)) {
            e.preventDefault();
            return;
        }

        // Ensure only one decimal point is allowed
        if (char === '.' &&  document.getElementById('amount').value.includes('.')) {
            e.preventDefault();
        }
    });

    document.getElementById('expenseSection').addEventListener('submit',function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        if(data.income){
            data.expensetype="income"
            delete data.income
        }else{
            data.expensetype="expense"
            delete data.expense
        }
        let StoredData  = localStorage.getItem('Expensedata') ? JSON.parse(localStorage.getItem('Expensedata')): [];
        StoredData.push(data);
        localStorage.setItem('Expensedata',JSON.stringify(StoredData)); 
        document.getElementById('expenseSection').reset();
    });
});

function Showexpenses(){
    const data = localStorage.getItem('Expensedata') ? JSON.parse(localStorage.getItem('Expensedata')): [];
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';  // Clear any existing rows


    let income=0;
    let expense=0;
    let balance=0;

    data.forEach(item => {
        const row = document.createElement('tr');

        // Create and append cells with data
        Object.values(item).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });

        // Append the row to the table body
        tableBody.appendChild(row); 
        if(item.expensetype=="income"){
            income += Number(item.amount);
        }else if(item.expensetype=="expense"){
            expense += Number(item.amount);
        }
    });
    
    balance=income-expense;
    document.getElementById("incomevalue").innerHTML=income;
    document.getElementById("expensevalue").innerHTML=expense;
    document.getElementById("balancevalue").innerHTML=balance;

    let expenseInput = document.getElementById('expenseid');
    let expenseTable = document.getElementById('expensedetails');

    expenseInput.classList.add('hidden')
    expenseTable.classList.remove('hidden')
}

function BacktoInput(){
    let expenseInput = document.getElementById('expenseid');
    let expenseTable = document.getElementById('expensedetails');

    expenseInput.classList.remove('hidden')
    expenseTable.classList.add('hidden')
}
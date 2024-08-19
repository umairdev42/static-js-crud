const form = document.getElementById('form');
const tbody = document.querySelector('tbody');


function loadfromLS() {
    const storedData = JSON.parse(localStorage.getItem('records')) || [];
    tbody.innerHTML = '';
    storedData.forEach(record => {
        addDatatoTable(record.name, record.email);
    });
}


document.addEventListener('DOMContentLoaded', loadfromLS);

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('name');
    const uname = username.value;

    const useremail = document.getElementById('email');
    const uemail = useremail.value;

    addDatatoTable(uname, uemail);

    saveDatatoLS(uname, uemail);
    loadfromLS();

    username.value = '';
    useremail.value = '';
});

function addDatatoTable(name, email) {
    const newRow = document.createElement('tr');

    const displayName = document.createElement('td');
    displayName.textContent = name;

    const displayEmail = document.createElement('td');
    displayEmail.textContent = email;

    const editRecord = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function () {
        const newName = prompt('Enter new name:', name);
        const newEmail = prompt('Enter new email:', email);
        if (newName !== null && newEmail !== null) {
            displayName.textContent = newName;
            displayEmail.textContent = newEmail;
            updateDatatoLS(name, email, newName, newEmail);
            loadfromLS()
        }
    });
    editRecord.appendChild(editButton);

    const removeRecord = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function () {
        this.parentElement.parentElement.remove();

        removeDatafromLS(name, email);
        loadfromLS();
    });
    removeRecord.appendChild(removeButton);

    newRow.appendChild(displayName);
    newRow.appendChild(displayEmail);
    newRow.appendChild(editRecord);
    newRow.appendChild(removeRecord);

    tbody.appendChild(newRow);
}

function saveDatatoLS(name, email) {
    const existingRecords = JSON.parse(localStorage.getItem('records')) || [];
    const newRecord = { name: name, email: email };
    existingRecords.push(newRecord);
    localStorage.setItem('records', JSON.stringify(existingRecords));
}

function removeDatafromLS(name, email) {
    const existingRecords = JSON.parse(localStorage.getItem('records')) || [];
    const updatedRecords = existingRecords.filter(record => !(record.name === name && record.email === email));
    localStorage.setItem('records', JSON.stringify(updatedRecords));
}

function updateDatatoLS(oldName, oldEmail, newName, newEmail) {
    const existingRecords = JSON.parse(localStorage.getItem('records')) || [];
    const updatedRecords = existingRecords.map(record => {
        if (record.name === oldName && record.email === oldEmail) {
            return { name: newName, email: newEmail };
        } else {
            return record;
        }
    });
    localStorage.setItem('records', JSON.stringify(updatedRecords));
}
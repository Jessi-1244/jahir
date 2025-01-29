// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEgnecR63RJ_pe-2r4pOnpEDv5qLUl2jU",
    authDomain: "nurafiq-recycling.firebaseapp.com",
    projectId: "nurafiq-recycling",
    storageBucket: "nurafiq-recycling.appspot.com",
    messagingSenderId: "583278888482",
    appId: "1:583278888482:web:c401301f1e08fb8ee4ac7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Check if user is authenticated
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'auth-sign-in.html';
    } else {
        console.log('User is logged in:', user);
    }
});

// Fetch total expenses
async function fetchTotalExpenses() {
    const totalExpensesElement = document.getElementById('totalExpenseValue');
    const expenseCollection = collection(db, 'expenses');
    const expenseSnapshot = await getDocs(expenseCollection);

    let totalExpenses = 0;

    expenseSnapshot.forEach((doc) => {
        const expense = doc.data();
        totalExpenses += parseFloat(expense.expenseAmount) || 0;
    });

    totalExpensesElement.innerText = totalExpenses.toFixed(2); // Display with 2 decimal points
}

fetchTotalExpenses();

// Fetch and display expenses
async function fetchExpenses() {
    const expenseTableBody = document.getElementById('expenseTableBody');
    const expenseCollection = collection(db, 'expenses');
    const expenseSnapshot = await getDocs(expenseCollection);

    expenseSnapshot.forEach((docSnapshot) => {
        const expense = docSnapshot.data();
        const row = document.createElement('tr');
        row.innerHTML = `
            <td></td>
            <td>${expense.expenseDate}</td>
            <td>${expense.expenseCategory}</td>
            <td>${expense.expenseAmount}</td>
            <td>${expense.note}</td>
            <td>
                <div class="d-flex align-items-center list-action">
                    <a class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" title="View" href="#" data-id="${docSnapshot.id}">
                        <i class="ri-eye-line mr-0"></i>
                    </a>
                    <a class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="Edit" href="#" data-id="${docSnapshot.id}">
                        <i class="ri-pencil-line mr-0"></i>
                    </a>
                    <a class="badge bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="Delete" href="#" data-id="${docSnapshot.id}">
                        <i class="ri-delete-bin-line mr-0"></i>
                    </a>
                </div>
            </td>
        `;
        expenseTableBody.appendChild(row);
    });
}

// Event listener for action buttons (View, Edit, Delete)
document.addEventListener('click', async (e) => {
    if (e.target.closest('a[data-id]')) {
        const docId = e.target.closest('a').getAttribute('data-id');
        const actionType = e.target.closest('a').classList.contains('badge-info') ? 'view' :
                           e.target.closest('a').classList.contains('bg-success') ? 'edit' : 'delete';
        handleAction(actionType, docId);
    }
});

// Handle actions (View, Edit, Delete)
async function handleAction(actionType, docId) {
    switch (actionType) {
        case 'view':
            viewExpense(docId);
            break;
        case 'edit':
            editExpense(docId);
            break;
        case 'delete':
            showDeleteConfirmation(docId); // Show confirmation before deleting
            break;
    }
}

// View Expense details
async function viewExpense(docId) {
    const docRef = doc(db, 'expenses', docId);
    const docSnapshot = await getDoc(docRef);
    const expense = docSnapshot.data();

    document.getElementById('viewExpenseDate').textContent = expense.expenseDate;
    document.getElementById('viewCategory').textContent = expense.expenseCategory;
    document.getElementById('viewAmount').textContent = expense.expenseAmount;
    document.getElementById('viewDetails').textContent = expense.note;

    $('#viewExpenseModal').modal('show');
}

// Edit Expense details
async function editExpense(docId) {
    const docRef = doc(db, 'expenses', docId);
    const docSnapshot = await getDoc(docRef);
    const expense = docSnapshot.data();

    document.getElementById('editExpenseDate').value = expense.expenseDate;
    document.getElementById('editExpenseCategory').value = expense.expenseCategory;
    document.getElementById('editExpenseAmount').value = expense.expenseAmount;
    document.getElementById('editExpenseDetails').value = expense.note;
    document.getElementById('editExpenseId').value = docId;

    $('#editExpenseModal').modal('show');
}

// Save edited Expense data
document.getElementById('editExpenseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const expenseId = document.getElementById('editExpenseId').value;
    const expenseRef = doc(db, 'expenses', expenseId);

    const updatedData = {
        expenseDate: document.getElementById('editExpenseDate').value,
        expenseCategory: document.getElementById('editExpenseCategory').value,
        expenseAmount: parseFloat(document.getElementById('editExpenseAmount').value),
        note: document.getElementById('editExpenseDetails').value
    };

    await updateDoc(expenseRef, updatedData);

    alert('Expense updated successfully!');
    $('#editExpenseModal').modal('hide');
    fetchExpenses();  // Reload the expense table after update
});

// Show Delete Confirmation Modal
let expenseIdToDelete = null;
function showDeleteConfirmation(docId) {
    expenseIdToDelete = docId;
    $('#deleteConfirmationModal').modal('show');
}

// Confirm Deletion
document.getElementById('confirmDeleteBtn').addEventListener('click', async () => {
    if (expenseIdToDelete) {
        try {
            const docRef = doc(db, 'expenses', expenseIdToDelete);
            await deleteDoc(docRef);
            alert('Expense deleted successfully!');
            fetchExpenses(); // Reload expenses after deletion
            $('#deleteConfirmationModal').modal('hide');
        } catch (error) {
            console.error("Error deleting expense:", error);
            alert('Error deleting expense');
        }
    }
});

// Fetch and display expenses on page load
fetchExpenses();

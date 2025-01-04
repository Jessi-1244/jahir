// JavaScript to handle form submission and save sale data in localStorage

document.getElementById('addSaleForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the form data
    const saleData = {
        date: document.getElementById('saleDate').value,
        referenceNo: document.getElementById('referenceNo').value,
        customer: document.getElementById('customer').value,
        biller: document.getElementById('biller').value,
        orderTax: document.getElementById('orderTax').value,
        discount: document.getElementById('orderDiscount').value,
        shipping: document.getElementById('shipping').value,
        status: document.getElementById('saleStatus').value,
        paymentStatus: document.getElementById('paymentStatus').value,
        saleNote: document.getElementById('saleNote').value
    };

    // Save the data in localStorage (or sessionStorage)
    let salesList = JSON.parse(localStorage.getItem('salesList')) || [];
    salesList.push(saleData);
    localStorage.setItem('salesList', JSON.stringify(salesList));

    // Redirect to the sale list page
    window.location.href = 'page-list-sales.html';
});

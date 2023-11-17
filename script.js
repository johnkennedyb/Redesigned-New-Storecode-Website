// Check if user data exists in localStorage
var users = JSON.parse(localStorage.getItem('users')) || [];
var authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser')) || null;


// script.js




function saveUser(username, password) {
    var newUser = { username, password, products: [] };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
}

function authenticateUser() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Check if the user is already registered
    var existingUser = users.find(user => user.username === username && user.password === password);

    if (existingUser) {
        // Store the authenticated user and redirect to the dashboard page
        authenticatedUser = existingUser;
        localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
        window.location.href = 'dashboard.html';
    } else {
        // Sign up the new user, store the authenticated user, and then redirect to the dashboard page
        saveUser(username, password);
        authenticatedUser = { username, password, products: [] };
        localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
        alert('Account created successfully!');
        window.location.href = 'dashboard.html';
    }
}

// Function to check if the user is authenticated before accessing the dashboard
function checkAuthentication() {
    if (!authenticatedUser) {
        alert('Please log in to access the dashboard.');
        window.location.href = 'login.html';
    }
}

// Function to log out the user
function logout() {
    localStorage.removeItem('authenticatedUser');
    window.location.href = 'login.html';
}

// Function to save a new product to localStorage
function saveProduct(productName, productLink) {
    var newProduct = { productName, productLink };

    // Check if the authenticated user is available
    if (authenticatedUser && authenticatedUser.products) {
        // Save the product to the authenticated user's products array
        authenticatedUser.products.push(newProduct);
        localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));

        // After saving the product, display the updated list of products on the dashboard
        displayProducts();
    }
}



function displayProducts() {
    var dashboardContent = document.getElementById('dashboard-content');

    // Log the dashboardContent to the console
    console.log('Dashboard Content:', dashboardContent);

    // Check if the dashboard content element is available
    if (dashboardContent) {
        // Clear existing content
        dashboardContent.innerHTML = '';

        // Display products
        if (authenticatedUser && authenticatedUser.products && authenticatedUser.products.length > 0) {
            // Create an unordered list to hold the products
            var productsList = document.createElement('ul');

            // Iterate through each product and create a list item for it
            authenticatedUser.products.forEach(product => {
                var listItem = document.createElement('li');

                // Display product details
                listItem.innerHTML = `<strong>${product.productName}:</strong> <a href="${product.productLink}" target="_blank">${product.productLink}</a>`;

                // Append the list item to the products list
                productsList.appendChild(listItem);
            });

            // Append the products list to the dashboard content
            dashboardContent.appendChild(productsList);
        } else {
            // Display a message if no products are available
            var noProductsMessage = document.createElement('p');
            noProductsMessage.textContent = 'No products added yet.';
            dashboardContent.appendChild(noProductsMessage);
        }
    } else {
        console.error("Error: 'dashboard-content' element not found");
    }
}

// Call displayProducts on page load
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve and display the authenticated user's information
    var usernameDisplay = document.getElementById('username-display');
    var userUsernameDisplay = document.getElementById('user-username');

    if (authenticatedUser) {
        usernameDisplay.textContent = authenticatedUser.username;
        userUsernameDisplay.textContent = authenticatedUser.username;

        // Call displayProducts on page load
        displayProducts();
    } else {
        // Redirect to the login page if the user is not logged in
        window.location.href = 'login.html';
    }
});




// ... existing code ...

// Call displayProducts on page load
displayProducts();

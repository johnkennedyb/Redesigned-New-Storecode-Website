// Check if user data exists in localStorage
const users = JSON.parse(localStorage.getItem('users')) || [];
let authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser')) || null;

function saveUser(username, password) {
    const newUser = { username, password, products: [] };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
}

function createUserAndAuthenticate(username, password) {
    saveUser(username, password);
    authenticatedUser = { username, password, products: [] };
    localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
    alert('Account created successfully!');
    window.location.href = 'dashboard.html';
}

function authenticateUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const existingUser = users.find(user => user.username === username && user.password === password);

    if (existingUser) {
        authenticatedUser = existingUser;
        localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
        window.location.href = 'dashboard.html';
    } else {
        createUserAndAuthenticate(username, password);
    }
}

function checkAuthentication() {
    if (!authenticatedUser) {
        alert('Please log in to access the dashboard.');
        window.location.href = 'login.html';
    }
}


function saveProduct(productName, productLink) {
    const newProduct = { productName, productLink };

    if (authenticatedUser && authenticatedUser.products) {
        authenticatedUser.products.push(newProduct);
        localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
        displayUserProducts(); // Call displayUserProducts instead of displayProducts
    }
}

function displayUserProducts() {
    const dashboardContent = document.getElementById('dashboard-content');

    if (dashboardContent) {
        dashboardContent.innerHTML = '';

        if (authenticatedUser && authenticatedUser.products && authenticatedUser.products.length > 0) {
            const productsList = document.createElement('ul');

            authenticatedUser.products.forEach(product => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${product.productName}:</strong> <a href="${product.productLink}" target="_blank">${product.productLink}</a>`;
                productsList.appendChild(listItem);
            });

            dashboardContent.appendChild(productsList);
        } else {
            const noProductsMessage = document.createElement('p');
            noProductsMessage.textContent = 'No products added yet.';
            dashboardContent.appendChild(noProductsMessage);
        }
    } else {
        console.error("Error: 'dashboard-content' element not found");
    }
}

// Call displayProducts on page load
document.addEventListener('DOMContentLoaded', function () {
    const usernameDisplay = document.getElementById('username-display');
    const userUsernameDisplay = document.getElementById('user-username');

    if (usernameDisplay && userUsernameDisplay) {
        if (authenticatedUser) {
            usernameDisplay.textContent = authenticatedUser.username;
            userUsernameDisplay.textContent = authenticatedUser.username;
            displayUserProducts();  // Moved displayProducts call here
        } else {
            window.location.href = 'login.html';
        }
    // } else {
    //     console.error("Error: 'username-display' or 'user-username' element not found");
    // }
}  //);

function logout() {
    localStorage.removeItem('authenticatedUser');
    window.location.href = 'login.html';
}

// function saveProduct(productName, productLink) {
//     const newProduct = { productName, productLink };

//     if (authenticatedUser && authenticatedUser.products) {
//         authenticatedUser.products.push(newProduct);
//         localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
//         displayUserProducts();
//     }
// }



// function displayUserProducts() {
//     const dashboardContent = document.getElementById('dashboard-content');

//     if (dashboardContent) {
//         dashboardContent.innerHTML = '';

//         if (authenticatedUser && authenticatedUser.products && authenticatedUser.products.length > 0) {
//             const productsList = document.createElement('ul');

//             authenticatedUser.products.forEach(product => {
//                 const listItem = document.createElement('li');
//                 listItem.innerHTML = `<strong>${product.productName}:</strong> <a href="${product.productLink}" target="_blank">${product.productLink}</a>`;
//                 productsList.appendChild(listItem);
//             });

//             dashboardContent.appendChild(productsList);
//         } else {
//             const noProductsMessage = document.createElement('p');
//             noProductsMessage.textContent = 'No products added yet.';
//             dashboardContent.appendChild(noProductsMessage);
//         }
//     } else {
//         console.error("Error: 'dashboard-content' element not found");
//     }
// }

// 
// document.addEventListener('DOMContentLoaded', function () {
//     const usernameDisplay = document.getElementById('username-display');
//     const userUsernameDisplay = document.getElementById('user-username');

//     if (usernameDisplay && userUsernameDisplay) {
//         if (authenticatedUser) {
//             usernameDisplay.textContent = authenticatedUser.username;
//             userUsernameDisplay.textContent = authenticatedUser.username;
//             displayUserProducts();
//         } else {
//             window.location.href = 'login.html';
//         }
//     } else {
//         console.error("Error: 'username-display' or 'user-username' element not found");
//     }
});

function addProduct() {
    // Retrieve values from the form
    var productName = document.getElementById('product-name').value;
    var productLink = document.getElementById('product-link').value;

    // Check if both product name and link are provided
    if (productName && productLink) {
        // Save the product to localStorage
        saveProduct(productName, productLink);

        // Display the updated list of products on the dashboard
        displayUserProducts(); // Corrected function name

        // Display a success message
        var resultMessage = document.getElementById('result-message');
        resultMessage.textContent = 'Product added successfully!';
        resultMessage.style.color = 'green';

        // Clear the form fields
        document.getElementById('product-name').value = '';
        document.getElementById('product-link').value = '';
    } else {
        // Display an error message if either the name or link is missing
        var resultMessage = document.getElementById('result-message');
        resultMessage.textContent = 'Please enter both product name and link.';
        resultMessage.style.color = 'red';
    }
}

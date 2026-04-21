const user = JSON.parse(localStorage.getItem('user')) || { name: "Guest", role_id: 3 };

document.getElementById('user-name').innerText = "Welcome, " + user.name;

// Role Control
if(user.role_id !== 1){
    document.querySelectorAll('.admin').forEach(el => el.style.display = 'none');
}

if(user.role_id !== 2){
    document.querySelectorAll('.farmer').forEach(el => el.style.display = 'none');
}

// Load Pages
function loadPage(page){

    document.getElementById('page-title').innerText = page.toUpperCase();

    if(page === 'dashboard'){
        loadDashboard();
    }

    if(page === 'products'){
        loadProducts();
    }

    if(page === 'orders'){
        loadOrders();
    }

    if(page === 'users'){
        loadUsers();
    }
}

// DASHBOARD
function loadDashboard(){
    document.getElementById('main-content').innerHTML = `
        <div class="row">

            <div class="col-md-4">
                <div class="card p-3 shadow">
                    <h5>Total Products</h5>
                    <h2>120</h2>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card p-3 shadow">
                    <h5>Total Orders</h5>
                    <h2>75</h2>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card p-3 shadow">
                    <h5>Revenue</h5>
                    <h2>₱15,000</h2>
                </div>
            </div>

        </div>
    `;
}

// PRODUCTS
function loadProducts(){
    fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {

        let html = `
            <button class="btn btn-success mb-3" onclick="addProduct()">+ Add Product</button>
            <div class="row">
        `;

        data.forEach(p => {
            html += `
                <div class="col-md-4">
                    <div class="card p-3 shadow mb-3">
                        <h5>${p.name}</h5>
                        <p>₱${p.price}</p>
                        <p>Stock: ${p.stock}</p>
                    </div>
                </div>
            `;
        });

        html += '</div>';

        document.getElementById('main-content').innerHTML = html;
    });
}

// ORDERS
function loadOrders(){
    document.getElementById('main-content').innerHTML = `
        <table class="table">
            <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Total</th>
            </tr>
            <tr>
                <td>1</td>
                <td>Pending</td>
                <td>₱500</td>
            </tr>
        </table>
    `;
}

// USERS (ADMIN)
function loadUsers(){
    document.getElementById('main-content').innerHTML = `
        <h5>User Management</h5>
        <table class="table">
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr>
            <tr>
                <td>Juan</td>
                <td>juan@email.com</td>
            </tr>
        </table>
    `;
}

// LOGOUT
function logout(){
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// DEFAULT LOAD
loadDashboard();

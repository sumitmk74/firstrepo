document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        console.log('Products fetched:', products);
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>${product.description}</td>
            <td>
                <button onclick="editProduct(${product.id})">Edit</button>
                <button onclick="deleteProduct(${product.id})">Delete</button>
                <button onclick="readProduct(${product.id})">Read</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function createProduct() {
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    try {
        const response = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                price,
                category,
                description
            })
        });

        const newProduct = await response.json();
        console.log('Product created:', newProduct);
        fetchProducts();  // Refresh the product list
    } catch (error) {
        console.error('Error creating product:', error);
    }
}

async function editProduct(id) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await response.json();
        console.log('Editing product:', product);

        document.getElementById('id').value = product.id;
        document.getElementById('title').value = product.title;
        document.getElementById('price').value = product.price;
        document.getElementById('category').value = product.category;
        document.getElementById('description').value = product.description;
    } catch (error) {
        console.error('Error editing product:', error);
    }
}

async function updateProduct() {
    const id = document.getElementById('id').value;
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                price,
                category,
                description
            })
        });

        const updatedProduct = await response.json();
        console.log('Product updated:', updatedProduct);
        fetchProducts();  // Refresh the product list
    } catch (error) {
        console.error('Error updating product:', error);
    }
}

async function deleteProduct(id) {
    try {
        await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'DELETE'
        });
        console.log('Product deleted:', id);
        fetchProducts();  // Refresh the product list
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}

async function readProduct(id) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await response.json();
        console.log('Reading product:', product);

        // Display product details in the form fields
        document.getElementById('id').value = product.id;
        document.getElementById('title').value = product.title;
        document.getElementById('price').value = product.price;
        document.getElementById('category').value = product.category;
        document.getElementById('description').value = product.description;
    } catch (error) {
        console.error('Error reading product:', error);
    }
}

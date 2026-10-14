
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";

const API = "https://worksheet-catalogue.mashupstack.com/products";


const getId = (product) => product.id ?? product._id;

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();


  const getProducts = async () => {
    try {
      const response = await axios.get(API);
      setProducts(response.data);
    } catch (error) {
      alert("Failed to load products");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);


  const deleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await axios.delete(`${API}/${id}`);
        getProducts();
      } catch (error) {
        alert("Failed to delete product");
      }
    }
  };


  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Electronics Product Catalog</h2>

      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link to="/add" className="btn btn-success text-nowrap">
          Add Product
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={getId(product)}>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2 mb-1"
                    onClick={() =>
                      navigate(`/edit/${getId(product)}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm mb-1"
                    onClick={() => deleteProduct(getId(product))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<ProductForm />} />
      <Route path="/edit/:id" element={<ProductForm />} />
    </Routes>
  );
}

export default App;

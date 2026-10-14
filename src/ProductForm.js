
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const API = "https://worksheet-catalogue.mashupstack.com/products";

function ProductForm() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    // Load product details when editing
    useEffect(() => {
        if (id) {
            axios.get(`${API}/${id}`)
                .then((response) => {
                    const product = response.data;

                    setName(product.name);
                    setPrice(product.price);
                    setCategory(product.category);
                    setQuantity(product.quantity);
                })
                .catch(() => alert("Failed to load product"));
        }
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const product = {
            name: name,
            price: Number(price),
            category: category,
            quantity: Number(quantity)
        };

        try {
            if (id) {
                await axios.put(`${API}/${id}`, product);
                alert("Product updated successfully");
            } else {
                await axios.post(API, product);
                alert("Product added successfully");
            }

            navigate("/");
        } catch (error) {
            alert("Failed to save product");
        }
    };

    return (
        <div className="container mt-4">
            <div className="card p-4 mx-auto" style={{ maxWidth: "500px" }}>
                <h2 className="text-center mb-4">
                    {id ? "Edit Product" : "Add Product"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <input
                            type="text"
                            className="form-control"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Available Quantity</label>
                        <input
                            type="number"
                            min="0"
                            className="form-control"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-success me-2">
                        {id ? "Update Product" : "Add Product"}
                    </button>

                    <Link to="/" className="btn btn-secondary">
                        Cancel
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default ProductForm;

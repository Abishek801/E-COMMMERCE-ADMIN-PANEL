import React, { useState } from 'react';
import { createProduct } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

const ProductForm = ({ onSave, onCancel }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stockQuantity: '',
    imageUrl: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formatted = {
        ...product,
        price: parseFloat(product.price) || 0,
        stockQuantity: parseInt(product.stockQuantity) || 0,
      };
      const response = await createProduct(formatted);
      if (onSave) onSave(response);
      navigate('/admin/products');
    } catch (err) {
      setError('Invalid product data. Please check your inputs.');
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    navigate('/admin/products');
  };

  const fields = [
    { key: 'name', label: 'Product Name', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'text', required: true },
    { key: 'price', label: 'Price ($)', type: 'number', required: true },
    { key: 'category', label: 'Category', type: 'text', required: true },
    { key: 'stockQuantity', label: 'Stock Quantity', type: 'number', required: true },
    { key: 'imageUrl', label: 'Image URL', type: 'text', required: false },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#1f1f2e] text-white rounded-lg shadow-lg border border-[#2d2d44]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Add New Product</h2>
        <button
          onClick={handleCancel}
          className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-600 text-white rounded-md border border-red-400">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ key, label, type, required }) => (
          <div key={key} className="space-y-1">
            <label htmlFor={key} className="block text-sm font-medium text-gray-300">
              {label} {required && <span className="text-red-400">*</span>}
            </label>
            <input
              id={key}
              name={key}
              value={product[key]}
              onChange={handleChange}
              type={type}
              required={required}
              className="w-full px-3 py-2 bg-[#2d2d44] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              data-testid={`${key}-input`}
            />
          </div>
        ))}

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-500 rounded-md text-sm font-medium text-gray-300 bg-[#2d2d44] hover:bg-[#393963] focus:outline-none focus:ring-2 focus:ring-blue-600"
            data-testid="form-cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600"
            data-testid="form-save"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

// src/components/PropertyFormPage.jsx
import React, { useState } from "react";
import Button from './Button'; // ✅ Import Button
import Card from './Card'; // ✅ Import Card
import { FaUser } from 'react-icons/fa';

export default function PropertyFormPage() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    rentAmount: "",
    bedrooms: "",
    status: "available",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/properties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Property registered successfully!");
        setFormData({
          name: "",
          address: "",
          rentAmount: "",
          bedrooms: "",
          status: "available",
        });
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Network error");
      console.error(err);
    }
  };

  return (
    <Card title="Register Property">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g. Camden Apartments"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g. 123 Main St, Nairobi"
          />
        </div>

        {/* Rent Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Rent (KES) *
          </label>
          <input
            type="number"
            name="rentAmount"
            value={formData.rentAmount}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g. 15000"
          />
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bedrooms (Optional)
          </label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="success"
          size="lg"
          fullWidth
        >
          Register Property
        </Button>
      </form>
    </Card>
  );
}
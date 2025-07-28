import React, { useState } from 'react';
import Card from './Card';
import Button from './Button'; // ✅ Import Button
import { FaSave } from 'react-icons/fa'; // ✅ Import FaSave icon

export default function TenantForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    moveInDate: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/tenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Tenant registered successfully!');
        setFormData({ name: '', phone: '', email: '', moveInDate: new Date().toISOString().split('T')[0] });
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      alert('Network error');
      console.error(err);
    }
  };

  return (
    <Card title="Register Tenant">
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g. John Doe"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g. 0712345678"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g. john@example.com"
          />
        </div>

        {/* Move-in Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Move-in Date</label>
          <input
            type="date"
            name="moveInDate"
            value={formData.moveInDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="success"
          size="lg"
          iconLeft={<FaSave />}
          fullWidth
        >
          Register Tenant
        </Button>
      </form>
    </Card>
  );
}
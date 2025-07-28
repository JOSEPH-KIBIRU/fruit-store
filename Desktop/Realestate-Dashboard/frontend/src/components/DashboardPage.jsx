// src/components/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';    

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalTenants: 0,
    totalPayments: 0,
    totalRevenue: 0
  });

  const [recentPayments, setRecentPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propertyRes, tenantRes, paymentRes] = await Promise.all([
          axios.get('http://localhost:5000/api/properties'),
          axios.get('http://localhost:5000/api/tenants'),
          axios.get('http://localhost:5000/api/payments')
        ]);

        const payments = paymentRes.data;

        // Calculate stats
        const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

        setStats({
          totalProperties: propertyRes.data.length,
          totalTenants: tenantRes.data.length,
          totalPayments: payments.length,
          totalRevenue
        });

        // Get latest 5 payments
        const latest = [...payments]
          .sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate))
          .slice(0, 5);

        setRecentPayments(latest);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800 ">Eagle Realtors Ltd</h1>
          <p className="text-gray-600">Manage tenants, properties, and payments</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Properties */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-medium text-gray-500">Total Properties</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalProperties}</p>
          </div>

          {/* Total Tenants */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-medium text-gray-500">Total Tenants</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.totalTenants}</p>
          </div>

          {/* Total Payments */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-medium text-gray-500">Payments Received</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalPayments}</p>
          </div>

          {/* Total Revenue */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-medium text-gray-500">Total Revenue</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">
              KES {stats.totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white p-6 rounded-lg shadow-md border mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Payments</h2>
          {recentPayments.length === 0 ? (
            <p className="text-gray-500">No payments recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Tenant</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Property</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Amount</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentPayments.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm">
                        {new Date(p.paymentDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-sm">{p.tenantName}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {p.propertyName || 'N/A'}
                      </td>
                      <td className="px-4 py-2 text-sm font-medium">
                        KES {p.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-sm">{p.paymentFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => document.getElementById('property-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold shadow-md transition"
          >
            + Register Property
          </button>

          <button
            onClick={() => document.getElementById('tenant-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold shadow-md transition"
          >
            + Register Tenant
          </button>

          <button
            onClick={() => document.getElementById('payment-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold shadow-md transition"
          >
            + Receive Payment
          </button>
        </div>
      </div>
    </div>
  );
}
// src/components/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { FaBuilding, FaUser, FaMoneyBill, FaPrint, FaFileAlt } from 'react-icons/fa';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-pink-600 via-blue-700 to-gray-800 text-white py-24 px-6 text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Eagles Realtors Ltd Dashboard</h1>
        <p className="text-xl md:text-2xl opacity-90 mb-8">Manage tenants, properties, and payments with ease</p>
        <Button
          variant="light"
          size="lg"
          as={Link}
          to="/dashboard"
          iconRight={<FaUser />}
        >
          Go to Dashboard
        </Button>
      </header>

      {/* Key Actions Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-10">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Register Property */}
          <ActionCard
            title="Register Property"
            description="Add a new property to your portfolio"
            icon={<FaBuilding className="text-4xl text-blue-600" />}
            to="/property"
          />

          {/* Register Tenant */}
          <ActionCard
            title="Register Tenant"
            description="Add a new tenant and assign them to a property"
            icon={<FaUser className="text-4xl text-green-600" />}
            to="/tenant"
          />

          {/* Receive Payment */}
          <ActionCard
            title="Receive Payment"
            description="Record rent, utilities, or deposit payments"
            icon={<FaMoneyBill className="text-4xl text-purple-600" />}
            to="/payment"
          />

          {/* Print Payment Voucher */}
          <ActionCard
            title="Print Payment Voucher"
            description="Generate and print a payment voucher"
            icon={<FaPrint className="text-4xl text-indigo-600" />}
            to="/voucher"
          />

          {/* Generate Rent Statement */}
          <ActionCard
            title="Rent Statement"
            description="View or print a tenant's rent history"
            icon={<FaFileAlt className="text-4xl text-orange-600" />}
            to="/statement"
          />

          {/* Dashboard */}
          <ActionCard
            title="View Dashboard"
            description="See stats, recent payments, and summaries"
            icon={<div className="text-4xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center">📊</div>}
            to="/dashboard"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 text-center">
        <p>PropertyParams Dashboard by <strong>Eagles Realtors Ltd</strong></p>
        <p className="text-sm mt-2">© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </div>
  );
}

// Reusable Action Card (now uses Link)
function ActionCard({ title, description, icon, to }) {
  return (
    <Link
      to={to}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-1 transition-all duration-300 flex items-start gap-4"
    >
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
      </div>
    </Link>
  );
}
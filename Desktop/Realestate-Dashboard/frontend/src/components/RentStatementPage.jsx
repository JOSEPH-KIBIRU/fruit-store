import React, { useState } from 'react';
import Card from './Card'; // ✅ Import Card
import Button from './Button'; // ✅ Import Button
import { FaUser } from 'react-icons/fa';

const samplePayments = [
  { date: '2025-01-05', amount: 15000, receipt: 'REC-001' },
  { date: '2025-02-05', amount: 15000, receipt: 'REC-002' },
  { date: '2025-03-05', amount: 15000, receipt: 'REC-003' }
];

export default function RentStatementPage() {
  const [tenantName, setTenantName] = useState('John Doe');
  const [propertyName, setPropertyName] = useState('Camden Apartments');
  const [period, setPeriod] = useState('January - March 2025');

  const totalPaid = samplePayments.reduce((sum, p) => sum + p.amount, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card title="Rent Statement">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tenant Name</label>
          <input
            type="text"
            value={tenantName}
            onChange={(e) => setTenantName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
          <input
            type="text"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
          <input
            type="text"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <Button
        onClick={handlePrint}
        variant="warning"
        size="lg"
        className="mb-6"
      >
        Print Statement
      </Button>

      {/* Statement */}
      <div className="border border-gray-300 p-6 bg-gray-50" id="statement">
        <h3 className="text-xl font-bold text-center mb-2">Eagle Realtors Ltd</h3>
        <p className="text-center text-gray-600 mb-6">Rent Statement</p>

        <div className="mb-4">
          <p><strong>Tenant:</strong> {tenantName}</p>
          <p><strong>Property:</strong> {propertyName}</p>
          <p><strong>Period:</strong> {period}</p>
        </div>

        <table className="w-full border-collapse border border-gray-400 mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Date</th>
              <th className="border border-gray-400 px-4 py-2">Amount (KES)</th>
              <th className="border border-gray-400 px-4 py-2">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {samplePayments.map((p, i) => (
              <tr key={i}>
                <td className="border border-gray-400 px-4 py-2">{p.date}</td>
                <td className="border border-gray-400 px-4 py-2 text-right">{p.amount.toLocaleString()}</td>
                <td className="border border-gray-400 px-4 py-2">{p.receipt}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold">
              <td className="border border-gray-400 px-4 py-2">Total</td>
              <td className="border border-gray-400 px-4 py-2 text-right">{totalPaid.toLocaleString()}</td>
              <td className="border border-gray-400 px-4 py-2"></td>
            </tr>
          </tfoot>
        </table>

        <p className="text-sm text-gray-600 mt-6">
          This is a computer-generated statement. No signature required.
        </p>
      </div>
    </Card>
  );
}
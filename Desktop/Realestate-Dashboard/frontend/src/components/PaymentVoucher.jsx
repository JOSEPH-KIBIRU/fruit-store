import React, { useState } from "react";
import Card from './Card'; // ✅ Import Card
import Button from './Button';
import { FaSave, FaPrint } from 'react-icons/fa';

export default function PaymentVoucher() {
  const [formData, setFormData] = useState({
    tenantName: "",
    propertyName: "",
    amount: "",
    paymentDate: new Date().toISOString().split("T")[0],
    receiptNumber: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card title="Payment Voucher">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tenant Name
          </label>
          <input
            type="text"
            name="tenantName"
            value={formData.tenantName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property
          </label>
          <input
            type="text"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (KES)
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Receipt No.
          </label>
          <input
            type="text"
            name="receiptNumber"
            value={formData.receiptNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        <Button
          onClick={handlePrint}
          variant="warning"
          size="lg"
          iconLeft={<FaPrint />}
          fullWidth
        >
          Print Voucher
        </Button>
      </form>

      {/* Voucher Preview */}
      <div className="border-2 border-gray-800 p-6 bg-white" id="voucher">
        <h3 className="text-center text-2xl font-bold mb-2">PAYMENT VOUCHER</h3>
        <p className="text-center text-gray-600 mb-6">
          Eagles Realtors Ltd
        </p>

        <div className="border-b border-dashed pb-4 mb-4">
          <p>
            <strong>Voucher No:</strong> {formData.receiptNumber || "---"}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(formData.paymentDate).toLocaleDateString()}
          </p>
        </div>

        <div className="mb-4">
          <p>
            <strong>Tenant:</strong> {formData.tenantName || "---"}
          </p>
          <p>
            <strong>Property:</strong> {formData.propertyName || "---"}
          </p>
          <p>
            <strong>Amount:</strong> KES{" "}
            {parseFloat(formData.amount || 0).toLocaleString()}
          </p>
        </div>

        <div className="mb-6">
          <p>
            <strong>Notes:</strong> {formData.notes || "No additional notes."}
          </p>
        </div>

        <div className="flex justify-between text-sm mt-8">
          <div>
            <p>
              <strong>Received By:</strong> _______________
            </p>
            <p className="text-gray-500 text-xs">Signature & Date</p>
          </div>
          <div>
            <p>
              <strong>Approved By:</strong> _______________
            </p>
            <p className="text-gray-500 text-xs">Manager</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
// src/components/ReceivePaymentsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfReceipt from './PdfReceipt';
import Card from './Card';
import Modal from './Modal';
import Button from './Button';
import { FaUser } from 'react-icons/fa';

export default function ReceivePaymentsPage() {
  const [tenants, setTenants] = useState([]);
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    tenantId: '',
    propertyId: '',
    amount: '',
    paymentFor: 'Rent',
    notes: ''
  });

  const [showModal, setShowModal] = useState(false); // For confirmation

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [tRes, pRes] = await Promise.all([
          await fetch`${import.meta.env.VITE_API_URL}/api/tenants`,
          await fetch`${import.meta.env.VITE_API_URL}/api/tenants`,
        ]);
        setTenants(tRes.data);
        setProperties(pRes.data);
      } catch (err) {
        console.error('Error loading options:', err);
      }
    };
    loadOptions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true); // Show confirmation modal
  };

  const handleConfirmSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/payments', formData);
      alert('Payment recorded successfully!');
      setFormData({ tenantId: '', propertyId: '', amount: '', paymentFor: 'Rent', notes: '' });
    } catch (err) {
      alert('Failed to save payment');
      console.error(err);
    } finally {
      setShowModal(false);
    }
  };

  // Get selected tenant/property names for PDF
  const selectedTenant = tenants.find(t => t._id === formData.tenantId);
  const selectedProperty = properties.find(p => p._id === formData.propertyId);

  const pdfData = {
    tenantName: selectedTenant?.name || 'Unknown',
    propertyName: selectedProperty?.name || selectedProperty?.address || 'N/A',
    amount: formData.amount,
    paymentFor: formData.paymentFor,
    notes: formData.notes,
    receiptNumber: `REC-${Date.now()}`,
    paymentDate: new Date().toLocaleDateString()
  };

  return (
    <Card title="Receive Payment">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tenant */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Tenant *</label>
          <select
            name="tenantId"
            value={formData.tenantId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">-- Choose Tenant --</option>
            {tenants.map(tenant => (
              <option key={tenant._id} value={tenant._id}>
                {tenant.name} ({tenant.phone || 'No phone'})
              </option>
            ))}
          </select>
        </div>

        {/* Property */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Property (Optional)</label>
          <select
            name="propertyId"
            value={formData.propertyId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">-- No Property --</option>
            {properties.map(property => (
              <option key={property._id} value={property._id}>
                {property.name || property.address}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount Paid (KES) *</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter amount"
          />
        </div>

        {/* Purpose */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment For</label>
          <select
            name="paymentFor"
            value={formData.paymentFor}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Deposit">Deposit</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Any additional details..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="success"
          size="lg"
          fullWidth
        >
          Record Payment
        </Button>
      </form>

      {/* PDF Download */}
      {formData.tenantId && formData.amount > 0 && (
        <div className="mt-8">
          <PDFDownloadLink
            document={<PdfReceipt payment={pdfData} />}
            fileName={`Receipt_${selectedTenant?.name.replace(/\s+/g, '_')}_${Date.now()}.pdf`}
          >
            {({ loading }) => (
              <Button
                variant="warning"
                size="md"
                iconLeft={<FaFilePdf />}
                disabled={loading}
                fullWidth
              >
                {loading ? 'Generating PDF...' : '📄 Download Receipt PDF'}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      )}

      {/* ✅ Confirmation Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Confirm Payment"
        onConfirm={handleConfirmSubmit}
        confirmText="Yes, Record Payment"
        cancelText="Cancel"
        confirmVariant="danger"
      >
        <p className="text-gray-700 dark:text-gray-300">
          Are you sure you want to record a payment of{' '}
          <strong>KES {formData.amount}</strong> for{' '}
          <strong>{selectedTenant?.name || 'this tenant'}</strong>?
        </p>
      </Modal>
    </Card>
  );
}
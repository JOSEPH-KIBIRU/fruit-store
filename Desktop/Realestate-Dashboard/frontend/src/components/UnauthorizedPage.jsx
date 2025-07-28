// src/components/UnauthorizedPage.jsx
export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-sm">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-6">You don't have permission to view this page.</p>
        <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
      </div>
    </div>
  );
}
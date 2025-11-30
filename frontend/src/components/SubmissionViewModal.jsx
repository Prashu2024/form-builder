import React from 'react';
import { X } from 'lucide-react';

const SubmissionViewModal = ({ submission, onClose }) => {
  if (!submission) return null;

  // Field labels mapping for better display
  const fieldLabels = {
    fullName: 'Full Name',
    email: 'Email Address',
    age: 'Age',
    department: 'Department',
    skills: 'Technical Skills',
    startDate: 'Start Date',
    bio: 'Brief Bio',
    agreeToTerms: 'Terms and Conditions'
  };

  // Department values mapping
  const departmentLabels = {
    engineering: 'Engineering',
    marketing: 'Marketing',
    sales: 'Sales',
    hr: 'Human Resources',
    finance: 'Finance'
  };

  // Skills values mapping
  const skillLabels = {
    javascript: 'JavaScript',
    python: 'Python',
    java: 'Java',
    react: 'React',
    django: 'Django',
    sql: 'SQL'
  };

  const formatValue = (key, value) => {
    if (value === null || value === undefined) return 'N/A';
    
    if (key === 'agreeToTerms') {
      return value ? 'Yes' : 'No';
    }
    
    if (key === 'department') {
      return departmentLabels[value] || value;
    }
    
    if (key === 'skills' && Array.isArray(value)) {
      return value.map(skill => skillLabels[skill] || skill).join(', ');
    }
    
    if (key === 'startDate') {
      return new Date(value).toLocaleDateString();
    }
    
    return value;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold text-gray-800 mb-6 pr-8">Submission Details</h3>
        
        <div className="space-y-4">
          {/* Metadata Section */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Submission ID</p>
                <p className="font-mono text-sm text-gray-800">{submission.id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Submitted On</p>
                <p className="text-sm text-gray-800">{new Date(submission.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Form Data Section */}
          <div className="border-t pt-4">
            {/* <h4 className="font-semibold text-lg text-gray-800 mb-4">Form Information</h4> */}
            <div className="space-y-3">
              {Object.entries(submission)
                .filter(([key]) => key !== 'id' && key !== 'createdAt')
                .map(([key, value]) => (
                  <div key={key} className="flex border-b border-gray-100 pb-3">
                    <div className="w-1/3">
                      <p className="text-sm font-medium text-gray-600">
                        {fieldLabels[key] || key}
                      </p>
                    </div>
                    <div className="w-2/3">
                      <p className="text-sm text-gray-800">
                        {formatValue(key, value)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SubmissionViewModal;


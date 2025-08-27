import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import { LEAD_SOURCES, LEAD_STATUSES } from '../../utils/constants';
import { validateForm } from '../../utils/validation';
import { generateId } from '../../utils/helpers';

const LeadCaptureForm = ({ onSubmit, onCancel, editingLead = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    source: 'Website',
    status: 'New',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingLead) {
      setFormData(editingLead);
    }
  }, [editingLead]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const { isValid, errors: validationErrors } = validateForm(formData);
    
    if (isValid) {
      const leadData = {
        ...formData,
        id: editingLead?.id || generateId(),
        createdAt: editingLead?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await onSubmit(leadData);
    } else {
      setErrors(validationErrors);
    }
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
  <div className="flex flex-col max-h-[75vh]">
    {/* Scrollable section for inputs */}
    <div className="flex-1 overflow-y-auto space-y-4 p-4">
      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Enter full name"
        required
      />
      
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Enter email address"
        required
      />

      <Input
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        placeholder="Enter phone number"
        required
      />

      <Input
        label="Company"
        name="company"
        value={formData.company}
        onChange={handleChange}
        error={errors.company}
        placeholder="Enter company name"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Source */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Source</label>
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {LEAD_SOURCES.map(source => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {LEAD_STATUSES.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter any additional notes..."
        />
      </div>
    </div>

    {/* Buttons pinned at bottom */}
    <div className="flex gap-3 p-4 border-t shrink-0">
      <Button 
        onClick={handleSubmit} 
        className="flex-1"
        disabled={isSubmitting}
      >
        <Check size={16} className="mr-2" />
        {isSubmitting ? 'Saving...' : (editingLead ? 'Update Lead' : 'Save Lead')}
      </Button>
      <Button 
        variant="secondary" 
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
    </div>
  </div>
);

    
};

export default LeadCaptureForm;
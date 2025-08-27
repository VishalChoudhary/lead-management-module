import React from 'react';
import { Edit2, Building, Mail, Phone, Calendar, Tag, FileText } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { STATUS_COLORS } from '../../utils/constants';

const LeadDetailModal = ({ isOpen, onClose, lead, onEdit }) => {
  if (!lead) return null;

  const getStatusColor = (status) => {
    return STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Lead Details"
      size="md"
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{lead.name}</h3>
            <div className="flex items-center text-gray-600 mt-1">
              <Building size={16} className="mr-2" />
              {lead.company}
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(lead.status)}`}>
            {lead.status}
          </span>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-500 mb-1">
                <Mail size={14} className="mr-2" />
                Email
              </label>
              <p className="text-gray-900">{lead.email}</p>
            </div>
            
            <div>
              <label className="flex items-center text-sm font-medium text-gray-500 mb-1">
                <Phone size={14} className="mr-2" />
                Phone
              </label>
              <p className="text-gray-900">{lead.phone}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-500 mb-1">
                <Tag size={14} className="mr-2" />
                Source
              </label>
              <p className="text-gray-900">{lead.source}</p>
            </div>
            
            <div>
              <label className="flex items-center text-sm font-medium text-gray-500 mb-1">
                <Calendar size={14} className="mr-2" />
                Created
              </label>
              <p className="text-gray-900">{new Date(lead.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        {lead.notes && (
          <div>
            <label className="flex items-center text-sm font-medium text-gray-500 mb-2">
              <FileText size={14} className="mr-2" />
              Notes
            </label>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-900 whitespace-pre-wrap">{lead.notes}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={() => {
            onClose();
            onEdit(lead);
          }}>
            <Edit2 size={16} className="mr-2" />
            Edit Lead
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LeadDetailModal;
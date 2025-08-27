import React from 'react';
import { Building, Mail, Phone, Calendar, Edit2, Trash2, Eye } from 'lucide-react';
import Button from '../common/Button';
import { STATUS_COLORS } from '../../utils/constants';

const LeadCard = ({ lead, onEdit, onDelete, onView }) => {
  const getStatusColor = (status) => {
    return STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      onDelete(lead.id);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg truncate">{lead.name}</h3>
          <div className="flex items-center text-gray-600 text-sm mt-1">
            <Building size={14} className="mr-1 flex-shrink-0" />
            <span className="truncate">{lead.company}</span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${getStatusColor(lead.status)}`}>
          {lead.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600 text-sm">
          <Mail size={14} className="mr-2 text-gray-400 flex-shrink-0" />
          <span className="truncate">{lead.email}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Phone size={14} className="mr-2 text-gray-400 flex-shrink-0" />
          <span className="truncate">{lead.phone}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Calendar size={14} className="mr-2 text-gray-400 flex-shrink-0" />
          <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {lead.notes && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2" title={lead.notes}>
          {lead.notes}
        </p>
      )}

      <div className="flex gap-2 pt-2 border-t border-gray-100">
        <Button size="sm" variant="ghost" onClick={() => onView(lead)}>
          <Eye size={14} className="mr-1" />
          View
        </Button>
        <Button size="sm" variant="ghost" onClick={() => onEdit(lead)}>
          <Edit2 size={14} className="mr-1" />
          Edit
        </Button>
        <Button size="sm" variant="ghost" onClick={handleDelete}>
          <Trash2 size={14} className="mr-1" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default LeadCard;
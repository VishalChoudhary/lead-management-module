import React from 'react';
import { Users, Plus } from 'lucide-react';
import LeadCard from './LeadCard';
import Button from '../common/Button';

const LeadList = ({ leads, onEdit, onDelete, onView, onAddNew }) => {
  if (leads.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
        <Users size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
        <p className="text-gray-600 mb-6">
          No leads match your current search criteria.
        </p>
        <Button onClick={onAddNew}>
          <Plus size={16} className="mr-2" />
          Add New Lead
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {leads.map(lead => (
        <LeadCard
          key={lead.id}
          lead={lead}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default LeadList;
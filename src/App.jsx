import React, { useState } from 'react';
import { Plus, Download, Users, Phone, Check } from 'lucide-react';

import Button from './components/common/Button';
import Modal from './components/common/Modal';
import StatsCard from './components/common/StatsCard';
import LeadCaptureForm from './components/forms/LeadCaptureForm';
import LeadList from './components/leads/LeadList';
import LeadFilters from './components/leads/LeadFilters';
import LeadDetailModal from './components/leads/LeadDetailModal';

import useLocalStorage from './hooks/useLocalStorage';

import { INITIAL_LEADS } from './utils/constants';
import { filterLeads, calculateStats, exportToCSV } from './utils/helpers';

import './App.css';

const App = () => {
  const [leads, setLeads] = useLocalStorage('leads', INITIAL_LEADS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [viewingLead, setViewingLead] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterSource, setFilterSource] = useState('All');

  const filteredLeads = filterLeads(leads, { searchTerm, filterStatus, filterSource });
  const stats = calculateStats(leads);

  const handleSubmit = (leadData) => {
    if (editingLead) {
      setLeads(prev => prev.map(lead => 
        lead.id === editingLead.id ? leadData : lead
      ));
    } else {
      setLeads(prev => [...prev, leadData]);
    }
    handleCloseForm();
  };

  const handleEdit = (lead) => {
    setEditingLead(lead);
    setIsFormOpen(true);
  };

  const handleDelete = (leadId) => {
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
  };

  const handleView = (lead) => {
    setViewingLead(lead);
    setIsDetailModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingLead(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingLead(null);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setViewingLead(null);
  };

  const handleExport = () => {
    exportToCSV(filteredLeads);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterStatus('All');
    setFilterSource('All');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
              <p className="mt-2 text-gray-600">
                Manage and track your sales leads efficiently
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
              {filteredLeads.length > 0 && (
                <Button onClick={handleExport} variant="secondary">
                  <Download size={16} className="mr-2" />
                  Export CSV ({filteredLeads.length})
                </Button>
              )}
              <Button onClick={handleAddNew}>
                <Plus size={16} className="mr-2" />
                Add New Lead
              </Button>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Total Leads" 
            value={stats.total} 
            icon={Users} 
            color="blue" 
          />
          <StatsCard 
            title="New Leads" 
            value={stats.new} 
            icon={Plus} 
            color="green" 
          />
          <StatsCard 
            title="Contacted" 
            value={stats.contacted} 
            icon={Phone} 
            color="yellow" 
          />
          <StatsCard 
            title="Qualified" 
            value={stats.qualified} 
            icon={Check} 
            color="red" 
          />
        </section>

        {/* Filters Section */}
        <LeadFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterSource={filterSource}
          setFilterSource={setFilterSource}
        />

        {(searchTerm || filterStatus !== 'All' || filterSource !== 'All') && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-blue-800">
                Showing {filteredLeads.length} of {leads.length} leads
                {searchTerm && ` matching "${searchTerm}"`}
                {filterStatus !== 'All' && ` with status "${filterStatus}"`}
                {filterSource !== 'All' && ` from source "${filterSource}"`}
              </p>
              <Button size="sm" variant="ghost" onClick={resetFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        )}

        <main>
          {leads.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
              <Users size={64} className="mx-auto text-gray-300 mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Welcome to Lead Management
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start building your customer base by adding your first lead. 
                Track their progress from initial contact to closed deal.
              </p>
              <Button onClick={handleAddNew} size="lg">
                <Plus size={20} className="mr-2" />
                Add Your First Lead
              </Button>
            </div>
          ) : (
            // Lead List
            <LeadList
              leads={filteredLeads}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
              onAddNew={handleAddNew}
            />
          )}
        </main>

        {/* Modals */}
        {/* Lead Form Modal */}
        <Modal
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          title={editingLead ? 'Edit Lead' : 'Add New Lead'}
          size="lg"
        >
          <LeadCaptureForm
            onSubmit={handleSubmit}
            onCancel={handleCloseForm}
            editingLead={editingLead}
          />
        </Modal>

        {/* Lead Detail Modal */}
        <LeadDetailModal
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          lead={viewingLead}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default App;
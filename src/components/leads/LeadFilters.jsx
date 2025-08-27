import React from 'react';
import { Search } from 'lucide-react';
import { FILTER_OPTIONS } from '../../utils/constants';

const LeadFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus, 
  filterSource, 
  setFilterSource 
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div>
        <label className="block text-xs text-gray-500 mb-1 font-medium invisible">Search</label>
        <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
            type="text"
            placeholder="Search leads by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
        </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-xs text-gray-500 mb-1 font-medium">Filter by Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            {FILTER_OPTIONS.statuses.map(status => (
              <option key={status} value={status}>
                {status === 'All' ? 'All Statuses' : status}
              </option>
            ))}
          </select>
        </div>

        {/* Source Filter */}
        <div>
          <label className="block text-xs text-gray-500 mb-1 font-medium">Filter by Source</label>
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            {FILTER_OPTIONS.sources.map(source => (
              <option key={source} value={source}>
                {source === 'All' ? 'All Sources' : source}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default LeadFilters;
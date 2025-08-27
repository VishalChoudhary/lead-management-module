export const generateId = () => Math.random().toString(36).substr(2, 9);

export const exportToCSV = (leads, filename = 'leads.csv') => {
  const headers = ['Name', 'Email', 'Phone', 'Company', 'Source', 'Status', 'Created Date'];
  const csvContent = [
    headers.join(','),
    ...leads.map(lead => [
      lead.name,
      lead.email,
      lead.phone,
      lead.company,
      lead.source,
      lead.status,
      new Date(lead.createdAt).toLocaleDateString()
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const filterLeads = (leads, { searchTerm, filterStatus, filterSource }) => {
  return leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
    const matchesSource = filterSource === 'All' || lead.source === filterSource;
    
    return matchesSearch && matchesStatus && matchesSource;
  });
};

export const calculateStats = (leads) => {
  return {
    total: leads.length,
    new: leads.filter(lead => lead.status === 'New').length,
    contacted: leads.filter(lead => lead.status === 'Contacted').length,
    qualified: leads.filter(lead => lead.status === 'Qualified').length
  };
};
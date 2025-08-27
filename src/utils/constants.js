export const LEAD_SOURCES = ['Website', 'LinkedIn', 'Facebook', 'Google Ads', 'Referral', 'Other'];

export const LEAD_STATUSES = ['New', 'Contacted', 'Qualified', 'Proposal', 'Closed Won', 'Closed Lost'];

export const FILTER_OPTIONS = {
  statuses: ['All', ...LEAD_STATUSES],
  sources: ['All', ...LEAD_SOURCES]
};

export const STATUS_COLORS = {
  'New': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-yellow-100 text-yellow-800',
  'Qualified': 'bg-green-100 text-green-800',
  'Proposal': 'bg-purple-100 text-purple-800',
  'Closed Won': 'bg-emerald-100 text-emerald-800',
  'Closed Lost': 'bg-red-100 text-red-800'
};

export const INITIAL_LEADS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    company: 'TechCorp',
    source: 'Website',
    status: 'New',
    notes: 'Interested in premium plan',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@company.com',
    phone: '+0987654321',
    company: 'DataFlow Inc',
    source: 'LinkedIn',
    status: 'Contacted',
    notes: 'Follow up next week',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];
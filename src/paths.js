export const paths = {
  index: '/',
  dashboard: {
    admin: 'dashboard/admin', 
    employee: 'dashboard/employee', 
    user: 'dashboard/user', 
  },
  employees: {
    index: '/employees',
    details: '/employees/:employeeId',
    edit: '/employees/:employeeId/edit'
  },
  members: {
    index: 'members',
    details: '/members/:memberId',
    edit: '/members/:memberId/edit'
  },
  gyms: {
    index: 'gyms',
    details: '/gyms/:memberId',
    edit: '/gyms/:memberId/edit'
  },
  
  401: '/401',
  404: '/404',
  500: '/500'
};

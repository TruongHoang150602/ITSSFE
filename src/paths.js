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
  users: {
    index: 'users',
    details: '/users/:memberId',
    edit: '/users/:memberId/edit'
  },
  gyms: {
    index: 'gyms',
    details: '/gyms/:gymId',
    create: '/gyms/:gymId/create'
  },

  feedback: {
    index: '/feedback',
  },
  packages: {
    index: 'packages',
    create: '/packages/create',
  },
  
  401: '/401',
  404: '/404',
  500: '/500'
};

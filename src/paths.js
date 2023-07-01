export const paths = {
  index: '/',
  dashboard: {
    admin: 'dashboard/admin', 
    employee: 'dashboard/employee', 
    user: 'dashboard/user', 
  },
  employees: {
    index: '/employees',
    details: (id) => `/employees/${id}`,
    edit: (id) => `/employees/${id}/edit`,
  },
  users: {
    index: 'users',
    details: (id) => `/users/${id}`,
    edit: (id) => `/users/${id}/edit`,
  },
  gyms: {
    index: 'gyms',
    details: (id) => `/gyms/${id}`,
    create: (id) => `/gyms/${id}/create`,
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

export const routes = {
  users: {
    getAll: '/api/users',
    getById: (id: string) => `/api/users/${id}`,
    create: '/api/users',
    update: (id: string) => `/api/users/${id}`,
    delete: (id: string) => `/api/users/${id}`
  }
}
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  // Simulate network delay of 1 second
  await new Promise(resolve => setTimeout(resolve, 1000))

  const todayDate = new Date()
  const offsetDay = (days: number) => {
    const d = new Date(todayDate)
    d.setDate(d.getDate() + days)
    return d.toISOString().split('T')[0]!
  }

  const tasks = [
    { id: '1', title: 'Setup project repository', description: 'Initialize Git, configure Nuxt and Tailwind.', status: 'Done', priority: 'High', startDate: offsetDay(-10), dueDate: offsetDay(-8), createdAt: new Date(todayDate.getTime() - 864000000).toISOString(), logs: [], duration: 60 },
    { id: '2', title: 'Design Database Schema', description: 'Draft the ERD and setup initial Prisma schema.', status: 'Done', priority: 'High', startDate: offsetDay(-7), dueDate: offsetDay(-5), createdAt: new Date(todayDate.getTime() - 604800000).toISOString(), logs: [], duration: 180 },
    { id: '3', title: 'Implement Auth API', description: 'Create login, register, and refresh token endpoints.', status: 'Done', priority: 'High', startDate: offsetDay(-4), dueDate: offsetDay(-1), createdAt: new Date(todayDate.getTime() - 345600000).toISOString(), logs: [], duration: 240 },
    { id: '4', title: 'Develop UI Components', description: 'Build reusable buttons, cards, and input fields.', status: 'In Progress', priority: 'Medium', startDate: offsetDay(0), dueDate: offsetDay(4), createdAt: new Date().toISOString(), logs: [], duration: 300 },
    { id: '5', title: 'Integrate Stripe Payments', description: 'Setup webhook and checkout session.', status: 'Pending', priority: 'High', startDate: offsetDay(2), dueDate: offsetDay(6), createdAt: new Date().toISOString(), logs: [], duration: 200 },
    { id: '6', title: 'Write Unit Tests', description: 'Cover all critical path functions with Vitest.', status: 'Pending', priority: 'Medium', startDate: offsetDay(5), dueDate: offsetDay(10), createdAt: new Date().toISOString(), logs: [], duration: 400 },
    { id: '7', title: 'Deploy to Vercel', description: 'Configure environment variables and setup CI/CD pipeline.', status: 'Pending', priority: 'High', startDate: offsetDay(12), dueDate: offsetDay(14), createdAt: new Date().toISOString(), logs: [], duration: 120 },
    { id: '8', title: 'Draft User Documentation', description: 'Write down instructions for onboarding new users.', status: 'In Progress', priority: 'Low', startDate: offsetDay(-2), dueDate: offsetDay(15), createdAt: new Date(todayDate.getTime() - 172800000).toISOString(), logs: [], duration: 360 },
    { id: '9', title: 'Optimize Images', description: 'Compress hero images and update formats to WebP.', status: 'Pending', priority: 'Low', startDate: offsetDay(16), dueDate: offsetDay(18), createdAt: new Date().toISOString(), logs: [], duration: 90 },
    { id: '10', title: 'Fix Navigation Bug', description: 'Resolve issue where mobile menu does not close on click.', status: 'Done', priority: 'High', startDate: offsetDay(-1), dueDate: offsetDay(0), createdAt: new Date(todayDate.getTime() - 86400000).toISOString(), logs: [], duration: 45 },
    { id: '11', title: 'Update Privacy Policy', description: 'Add new GDPR compliance clauses.', status: 'Pending', priority: 'Low', startDate: offsetDay(20), dueDate: offsetDay(25), createdAt: new Date().toISOString(), logs: [], duration: 60 },
    { id: '12', title: 'Refactor Task Store', description: 'Improve state management by splitting into multiple smaller stores.', status: 'Pending', priority: 'Medium', startDate: offsetDay(22), dueDate: offsetDay(28), createdAt: new Date().toISOString(), logs: [], duration: 240 }
  ]

  return tasks
})

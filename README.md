# Full-Stack TypeScript Starter

A modern web application starter kit built with React, tRPC, and MongoDB.

## Tech Stack

### Frontend
- React 19
- TailwindCSS
- React Router 7
- Tanstack React Query
- HeadlessUI components
- Vite build system

### Backend
- Node.js with TypeScript
- tRPC for type-safe APIs
- MongoDB for database
- JWT authentication
- AWS integrations (S3, SES)
- Stripe payments

### Shared
- TypeScript types
- Zod schemas for validation

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or remote)
- Git

### Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd starter-react-trpc
   ```

2. Install dependencies:
   ```
   # Install shared dependencies
   cd shared && npm install && npm run build
   
   # Install backend dependencies
   cd ../server && npm install
   
   # Install frontend dependencies
   cd ../browser && npm install
   ```

3. Environment Setup:
   - Create `.env` files in both server and browser directories
   - Server `.env`:
     ```
     PORT=3001
     APP_NAME=AppStarter
     JWT_SECRET=your_secret_here
     URL_CLIENT=http://localhost:3000
     MONGO_URI=mongodb://localhost:27017/app-starter
     ```
   - Browser `.env`:
     ```
     VITE_SERVER_URL=http://localhost:4000
     VITE_BROWSER_URL=http://localhost:3000
     ```

4. Start Development Servers:
   ```
   # Start backend (in server directory)
   npm run dev
   
   # Start frontend (in browser directory)
   npm run dev
   ```

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:4000

## Project Structure

This is a monorepo with three main directories:
- `browser/`: Frontend React application
- `server/`: Backend tRPC API server
- `shared/`: Common code shared between frontend and backend

## License

[MIT](LICENSE)

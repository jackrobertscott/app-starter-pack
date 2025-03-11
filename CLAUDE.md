# STARTER PROJECT GUIDE

This guide provides essential information for Claude to help with this project.

## Project Overview

Full-stack TypeScript application with three main packages:

1. **Browser**: React 19 frontend
2. **Server**: Node.js backend with tRPC and MongoDB
3. **Shared**: Common TypeScript types and utilities

## Key Technologies

### Frontend (Browser)

- React 19
- TailwindCSS for styling
- React Router 7 for routing
- Tanstack Query for data fetching
- HeadlessUI components
- shadcn/ui components (based on Radix UI)
- tRPC client for type-safe API calls
- Vite for building and bundling

### Backend (Server)

- Node.js with TypeScript
- tRPC for type-safe API endpoints
- MongoDB for database
- JWT for authentication
- AWS SDK (S3, SES) for cloud services
- Stripe integration for payments

### Shared

- TypeScript types shared between frontend and backend
- Zod schemas for validation
- Utilities for error handling and case conversion

## Development Commands

### Setup Commands

```bash
# Initial setup of all packages (run from project root)
cd shared && npm install && npm run build
cd ../server && npm install
cd ../browser && npm install
```

### Frontend Commands

```bash
# Start development server (from browser directory)
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

### Backend Commands

```bash
# Start development server (from server directory)
npm run dev

# Run server once without watch mode
npm run now

# Build for production
npm run build
```

## Environment Variables

### Server (.env)

```
PORT=4000
APP_NAME=AppStarter
JWT_SECRET=your_secret_here
URL_CLIENT=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/app-starter
AWS_ACCESS_KEY_ID=your_key (optional)
AWS_SECRET_ACCESS_KEY=your_secret (optional)
AWS_DEFAULT_REGION=region
AWS_SES_FROM_EMAIL=email@example.com
AWS_S3_BUCKET=your-bucket
AWS_S3_BUCKET_FOLDER=folder-name
STRIPE_SECRET_KEY=your_stripe_key
```

### Browser (.env)

```
VITE_SERVER_URL=http://localhost:4000
VITE_BROWSER_URL=http://localhost:3000
VITE_STRIPE_KEY=your_stripe_public_key
```

## Database Structure

### MongoDB Collections

#### Users Collection

```typescript
interface UserDocument {
  _id?: string // MongoDB document ID
  id: string // Application-specific UUID
  email: string // User's email (for login)
  firstName: string // User's first name
  lastName: string // User's last name
  password: string // Hashed password
  createdAt: Date // Creation timestamp
  updatedAt: Date // Last update timestamp
}
```

## Code Conventions

### File Naming

- All files use kebab-case (e.g., `file-name.ts`)
- Components: `component-name.tsx`
- Utilities: `utils-purpose.ts`
- Schemas: `schemas-entity.ts`
- Routers: `router-entity.ts`

### Component Structure

- React functional components with TypeScript
- Props interface defined above component
- Component export at bottom of file

### API Structure

- tRPC routers organized by domain (users, auth, etc.)
- Zod schemas used for validation
- MongoDB access through utility functions

## Common Tasks

### Adding a New Component

1. Create new file in `browser/src/components/`
2. Follow naming convention: `component-name.tsx`
3. Import required dependencies from React, HeadlessUI, shadcn/ui, etc.
4. Define component props interface
5. Implement component using TailwindCSS and the `cn()` utility for styling
6. Export component

### Using shadcn/ui Components

1. Import the component from the relevant shadcn package
2. Use the component with appropriate props and styling
3. Customize styling using the `cn()` utility function
4. For new shadcn components, install them using the CLI or create component files manually

### Adding a New API Endpoint

1. Identify the appropriate router file in `server/src/`
2. Add new procedure to the tRPC router
3. Implement validation using Zod schemas
4. Implement business logic and database access
5. Test the endpoint using the frontend or API client

### Styling Guidelines

- Use TailwindCSS utility classes
- Use the `cn()` utility function for combining and merging classes
- Leverage shadcn/ui components for consistent UI elements
- Follow the existing component patterns
- Prefer composition over inheritance

### Authentication Flow

- JWT-based authentication
- Login/signup through auth router
- Token stored in local storage
- Protected routes in frontend using React Router

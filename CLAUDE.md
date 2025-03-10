# APP STARTER PACK

This file contains important information about the project structure and common commands.

## Project Structure

This is a monorepo with three main folders:

### Browser (Frontend)

- **Purpose**: Web application frontend that provides the user interface
- **Tech Stack**:
  - React 19 for UI components
  - Vite as the build tool and dev server
  - TailwindCSS for styling
  - React Router for client-side routing
  - tRPC client for type-safe API communication
- **Key Files**:
  - `src/browser-entry.tsx`: Main entry point
  - `src/app-component.tsx`: Main application component
  - `src/browser-config.ts`: Configuration for connecting to the backend
  - `src/utils-trpc-client.ts`: tRPC client setup

### Server (Backend)

- **Purpose**: Backend API server that handles business logic and data persistence
- **Tech Stack**:
  - Node.js with TypeScript
  - tRPC for creating type-safe API endpoints
  - MongoDB for database storage
  - AWS SDK for cloud services (S3, SES)
  - JWT for authentication
- **Key Files**:
  - `src/server.ts`: Main server entry point
  - `src/server-config.ts`: Server configuration
  - `src/router-user.ts`: User-related API endpoints
  - `src/utils-trpc.ts`: tRPC server setup
  - `src/utils-mongodb.ts`: MongoDB utilities and connection management

### Shared (Common)

- **Purpose**: Common code, types, and utilities shared between frontend and backend
- **Tech Stack**:
  - TypeScript for type definitions
  - Zod for schema validation
- **Key Files**:
  - `src/schemas-user.ts`: User-related schema definitions
  - `src/utils-change-case.ts`: Case conversion utilities
  - `src/utils-zod-error.ts`: Zod error handling utilities

## Common Commands

### Browser Commands

```bash
# Install dependencies
cd browser && npm install

# Start development server
cd browser && npm run dev

# Build for production
cd browser && npm run build
```

### Server Commands

```bash
# Install dependencies
cd server && npm install

# Start development server
cd server && npm run dev

# Build for production
cd server && npm run build
```

### Shared Commands

```bash
# Install dependencies
cd shared && npm install

# Build shared library
cd shared && npm run build
```

## MongoDB Setup

The server uses MongoDB for data storage. By default, it connects to a local MongoDB instance.

### Local Development
1. Install MongoDB locally or use Docker:
   ```bash
   # Run MongoDB with Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. Set the MongoDB URI in your `.env` file:
   ```
   MONGODB_URI=mongodb://localhost:27017/app-starter
   ```

### Environment Variables
Add these to your `.env` file in the server directory:
```
# Required for all environments
MONGODB_URI=mongodb://localhost:27017/app-starter

# For production, use your actual MongoDB connection string
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/app-name
```

### User Collection Structure
The application uses a `users` collection with the following structure:

```typescript
interface UserDocument {
  _id?: string;          // MongoDB document ID
  id: string;            // Application-specific UUID
  name: string;          // User's name
  email?: string;        // User's email (optional)
  createdAt: Date;       // Creation timestamp
  updatedAt: Date;       // Last update timestamp
}
```

## Code Style and Naming Conventions

### File Naming Conventions
- **All files**: Use kebab-case for all file names (e.g., `file-name.ts`)
- **Components**: React component files should use kebab-case (e.g., `user-profile.tsx`, `login-form.tsx`)
- **Utilities**: Utility files should be prefixed with `utils-` and use kebab-case (e.g., `utils-formatting.ts`)
- **Schemas**: Schema files should be prefixed with `schemas-` and use kebab-case (e.g., `schemas-user.ts`)
- **Routers**: Router files should be prefixed with `router-` and use kebab-case (e.g., `router-user.ts`)

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
  - `src/browser.tsx`: Main entry point
  - `src/app.tsx`: Main application component
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

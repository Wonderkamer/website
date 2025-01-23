# Stage 0: Node.js install the node dependencies
FROM node:22.13.1-alpine AS base-installer

# Installs pnpm
RUN corepack enable

# Set working directory
WORKDIR /app

# Stage 1: Node.js install the node dependencies
FROM base-installer AS node-installer

COPY apps/frontend/package.json                 /app/apps/frontend/
COPY apps/backend/package.json                  /app/apps/backend/
COPY apps/email-templates/package.json          /app/apps/email-templates/
COPY packages/@wonderkamer-common/package.json  /app/packages/@wonderkamer-common/
COPY packages/tsconfig/package.json             /app/packages/tsconfig/
COPY package.json                               /app/
COPY pnpm-workspace.yaml                        /app/
COPY pnpm-lock.yaml                             /app/
COPY .npmrc                                     /app/
COPY turbo.json                                 /app/

# Install Node.js dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

#
# Stage 2.1: Building the backend
#
FROM node-installer AS backend-builder

# Copy installed from node-installer
COPY apps/backend/ /app/apps/backend/
COPY packages/ /app/packages/

COPY --from=node-installer /app /app/

# Build the all packages
RUN pnpm run build:backend

#
# Stage 2.2: Building the frontend
#
FROM node-installer AS frontend-builder

COPY apps/frontend/ /app/apps/frontend/
COPY packages/ /app/packages/
COPY --from=node-installer /app /app/

# Build the all packages
RUN pnpm run build:frontend

#
# Stage 2.3: Building the email templates
#
FROM node-installer AS email-template-builder

COPY --from=node-installer /app /app/
COPY apps/email-templates/ /app/apps/email-templates/

# Build the all packages
RUN pnpm run build:email-templates

#
# Stage 3: Assemble the runtime
#
FROM base-installer AS node-runtime

# Copy pnpm stuff for to build the backend in production
COPY apps/backend/package.json /app/apps/backend/
COPY packages/@wonderkamer-common/package.json /app/packages/@wonderkamer-common/
COPY package.json /app/
COPY pnpm-workspace.yaml /app/
COPY pnpm-lock.yaml /app/
COPY .npmrc /app/

# Copy dist/** files from the builders
COPY --from=frontend-builder /app/apps/frontend/dist/ /app/apps/frontend/dist/
COPY --from=backend-builder /app/apps/backend/dist/ /app/apps/backend/dist/
COPY --from=backend-builder /app/packages/@wonderkamer-common/dist/ /app/packages/@wonderkamer-common/dist/
COPY --from=email-template-builder /app/apps/email-templates/dist/ /app/apps/email-templates/dist/

# Install pnpm
RUN corepack prepare

# Install Node.js dependencies for production
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --filter=@wonderkamer/backend --frozen-lockfile --ignore-scripts --prod

# Set working directory
WORKDIR /app/apps/backend

# Expose the necessary ports
EXPOSE 3000

LABEL org.opencontainers.image.source=https://github.com/wonderkamer/website

# Start the Nest.js server
CMD ["sh", "-c", "/usr/local/bin/pnpm run start:docker"]

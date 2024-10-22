# Staple.IO Take-Home Assignment by Harshit Doshi

Welcome to WOAH(!)LLET! This project is designed to demonstrate a full-stack application where users can track their personal finances within a unique session-based space. Each session represents a dedicated workspace where users can add, manage, and visualize their financial transactions, enabling users to gain insight into their financial habits.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Deployment Setup](#deployment-setup)
- [Development](#development)
- [Testing](#testing)
- [State Management](#state-management)
- [Data Visualization](#data-visualization)
- [Responsive Design](#responsive-design)
- [Bonus Features](#bonus-features)
- [Acknowledgments](#acknowledgments)

## Project Overview

WOAH(!)LLET allows users to create a dedicated space for managing financial transactions. Users start by creating a unique session, which will generate a unique URL to manage their finances. Users can add transactions, edit, delete them, and visualize income vs. expenses or spending by category.

This project is built as a full-stack application, including a PostgreSQL database for transaction management, REST API for backend services, and a ReactJS front-end with TypeScript for the UI.

## Features

### 1. Landing Page

- A visually appealing landing page built with Material-UI (MUI).
- A prominent "Get Started!" button that initiates the creation of a unique user session.
- Redirects to a unique URL for each user session in the format `/space/<random-spaceId>`.

### 2. Transaction Management

- View a list of all transactions for the specific session.
- Add transactions.
- Support for transaction filtering by type (income/expense), category, and date.
- Pagination to handle a large number of transactions.
- Charts for data visualization to help users understand income, expenses, and spending trends.

### 3. Backend Services

- REST API endpoints for managing spaces and transactions.
- PostgreSQL for storing session and transaction data.
- APIs include creating sessions, managing transactions, and retrieving financial data.

### 4. Responsive UI

- A responsive design that works seamlessly on desktops, tablets, and mobile devices.

### 5. Data Visualization

- Beautiful charts and graphs implemented using Recharts to visualize financial transactions.
- Visual indicators for spending categories and income vs. expense comparison.

## Tech Stack

- **Database**: PostgreSQL, PGAdmin
- **Back-End**: Python, FastAPI, Pydantic, SQLAlchemy, Swagger-UI
- **Front-End**: JavaScript/TypeScript, NodeJS, ReactJS, ViteJS, Material-UI, TanStack-Query, Axios,
  React-Router
- **Containerization**: Docker, Docker-Compose, Kompose, Kubernetes
- **Infrastructure**: TypeScript, NodeJS, Pulumi, AWS, EKS, awscli

## Project Structure

The project follows best practices for structuring both frontend and backend code, ensuring components are modular and easy to maintain. TypeScript & Python are used throughout for type safety.

## API Documentation

### Spaces API

- **POST /spaces**: Create a new space and generate a unique `spaceId`.
- **GET /spaces/:spaceId/transactions**: Retrieve all transactions for a specific `spaceId`. Supports pagination and filters.
- **POST /spaces/:spaceId/transactions**: Add a new transaction.
- **PUT /spaces/:spaceId/transactions/:transactionId**: Edit an existing transaction.
- **DELETE /spaces/:spaceId/transactions/:transactionId**: Delete a transaction.

## Setup Instructions

### Prerequisites

- NodeJS v20 or higher (use FNM or NVM for version management)
- Python 3.12 or higher (use pyenv and poetry for version management and dependency management)
- Docker or Podman for containerization (Docker is recommended) and Docker-Compose
- PostgreSQL instance (with PGAdmin for database management)
- AWS CLI (for deployment to AWS)
- Pulumi (for infrastructure as code)
- MiniKube (for local Kubernetes cluster) or EKS (for AWS Kubernetes cluster)
- kubectl (for managing Kubernetes cluster)

### Backend Setup

1. **Install Dependencies**

   ```bash
   cd server
   pyenv local 3.12
   poetry install
   ```

2. **Environment Variables**
   Set up environment variables in a `.env` file in the `backend` directory:

   ```env
   DATABASE_TYPE=postgresql
   DATABASE_DRIVER=psycopg
   DATABASE_USER=<user>
   DATABASE_PASSWORD=<secret>
   DATABASE_HOST=database
   DATABASE_PORT=5432
   DATABASE_NAME=<db>
   ```

3. **Run the Backend Locally**
   ```bash
   poetry run fastapi run main.py
   ```

### Frontend Setup

1. **Install Dependencies**

   ```bash
   cd client
   npm install
   ```

2. **Run the Frontend Locally**
   ```bash
   npm run dev
   ```

### Deployment Setup

1. **Containerize the Application**
   Use Docker or Podman to build the images for both backend and frontend.

   ```bash
   docker buildx build --file Containerfile --tag siowebclient --platform=linux/amd64 .
   docker buildx build --file Containerfile --tag siowebserver --platform=linux/amd64 .
   ```

2. **Tag the Images**

   ```bash
   docker tag siowebclient ghcr.io/harshitdoshi/sio-tha/siowebclient:siowebclient
   docker tag siowebserver ghcr.io/harshitdoshi/sio-tha/siowebserver:siowebserver
   ```

3. **Push to GitHub Container Registry**

   ```bash
   docker push ghcr.io/harshitdoshi/sio-tha/siowebclient:siowebclient
   docker push ghcr.io/harshitdoshi/sio-tha/siowebserver:siowebserver
   ```

4. **Kubernetes Deployment**
   Use the provided Kubernetes YAML files to deploy the services:
   ```bash
   cd infrastructure
   kubectl apply -f .
   ```

## Development

- **Code Quality**: Follows industry best practices with ESLint, Prettier, and type safety through TypeScript.
- **Commit Style**: Conventional Commits for meaningful commit messages.
- **Version Control**: Git for version control with a clean commit history.

## State Management

The application uses **TanStack-Query** for state management, providing a robust and efficient way to manage data fetching, caching, and updating. This ensures that the application remains performant and responsive, even with large datasets.

## Data Visualization

The application uses **MUI-X Charts** for creating interactive and responsive charts. Users can visualize their financial transactions with charts depicting income vs. expenses, spending by category, and trends over time.

## Responsive Design

The entire front-end is built with responsiveness in mind, ensuring compatibility with desktop, tablet, and mobile screens. This is achieved using **Material-UI** and custom CSS for consistent cross-platform design.

## Bonus Features

The following bonus features are included to enhance user experience:

1. **Enhanced Data Visualization**: Pie charts, and bar charts for visualizing financial data.
2. **Session Persistence**: SpaceId is stored in local storage for reusability across browser sessions.
3. **Docker Support**: Dockerized backend, frontend, and PostgreSQL with `docker-compose` for easy deployment.

## Acknowledgments

This project was built as part of a take-home assignment for Staple AI's Frontend Engineering role. Special thanks to the Staple AI team for providing the guidelines and support throughout the project.

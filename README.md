# JUP Real Estate Backend 🏠

<div align="center">

**RESTful API for JUP Propiedades - Modern real estate platform backend**

[![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey?logo=express)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.9-green?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-Private-red.svg)](#-license)

[Website](https://www.jup.cl) • [Report Bug](https://github.com/Thomas465xd/JUP-RealEstate_Backend/issues) • [Request Feature](https://github.com/Thomas465xd/JUP-RealEstate_Backend/issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Technologies](#️-technologies)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Docker](#-docker)
- [Deployment](#-deployment)
- [License](#-license)

---

## 🏠 About the Project

**JUP Real Estate Backend** is a RESTful API built with Node.js, Express, and MongoDB that powers the JUP Propiedades real estate platform. It provides comprehensive endpoints for property management, search functionality, and featured property handling, with robust authentication and authorization.

### Purpose

This backend provides:
- **Property Management**: Complete CRUD operations for property listings with validation
- **Advanced Search**: Filter properties by type, operation, region, price range, and more
- **Authentication**: Secure user authentication and authorization using Clerk
- **Featured Properties**: Special management for highlighted property listings
- **Email Integration**: Communication capabilities using Resend
- **Type Safety**: Built with TypeScript for robust and maintainable code

---

## ✨ Features

### 🏘️ Property Management
- **CRUD Operations**: Create, read, update, and delete properties
- **Detailed Information**: Comprehensive property data including:
  - Title, description, and type (casa, departamento, parcela, etc.)
  - Operation type (En Arriendo, En Venta)
  - Price, address, and location (region, city area)
  - Specifications (dorms, bathrooms, parking spaces, area)
  - Status tracking (disponible, vendida, pendiente)
  - Multiple image URLs (minimum 4 images required)
  - Condominium designation
- **Search by Name**: Find properties by partial title matching
- **Chilean Regions**: Full support for all 16 regions of Chile

### 🔍 Advanced Search
- **Filter by Type**: casa, departamento, parcela, sitio, oficina, comercial
- **Filter by Operation**: En Arriendo (rent) or En Venta (sale)
- **Filter by Region**: All 16 Chilean regions supported
- **Price Range**: Min/max price filtering
- **Area Range**: Min/max area filtering
- **Multiple Criteria**: Combine filters for precise results

### ⭐ Featured Properties
- **Highlight Management**: Mark properties as featured
- **Dedicated Endpoints**: Separate API for featured property listings
- **CRUD Operations**: Full management of featured property designations

### 🔐 Authentication & Security
- **Clerk Integration**: Secure authentication using Clerk
- **Role-Based Access**: Admin-only routes for property management
- **Optional Auth**: Public access for viewing, protected routes for modifications
- **Input Validation**: Comprehensive validation using express-validator

### 📧 Additional Features
- **Email Integration**: Resend service for email communications
- **CORS Configuration**: Secure cross-origin resource sharing
- **Request Logging**: Morgan middleware for detailed request logging
- **Error Handling**: Robust error handling and validation

---

## 🛠️ Technologies

### Core Framework
- **[Node.js 20](https://nodejs.org/)** - JavaScript runtime
- **[Express 4.21](https://expressjs.com/)** - Web application framework
- **[TypeScript 5.7](https://www.typescriptlang.org/)** - Type safety and better developer experience

### Database
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database
- **[Mongoose 8.9](https://mongoosejs.com/)** - MongoDB object modeling

### Authentication & Security
- **[Clerk](https://clerk.com/)** - User authentication and management
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Password hashing
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** - JWT token management

### Validation & Middleware
- **[express-validator](https://express-validator.github.io/)** - Request validation
- **[cors](https://www.npmjs.com/package/cors)** - Cross-origin resource sharing
- **[morgan](https://www.npmjs.com/package/morgan)** - HTTP request logger
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Environment variable management

### Email Services
- **[Resend](https://resend.com/)** - Modern email API
- **[Nodemailer](https://nodemailer.com/)** - Email sending library

### Development Tools
- **[nodemon](https://nodemon.io/)** - Auto-restart during development
- **[ts-node](https://typestrong.org/ts-node/)** - TypeScript execution
- **[colors](https://www.npmjs.com/package/colors)** - Console styling

---

## 📁 Project Structure

```
JUP-RealEstate_Backend/
├── src/
│   ├── config/               # Configuration files
│   │   ├── cors.ts          # CORS configuration
│   │   ├── db.ts            # MongoDB connection
│   │   └── resend.ts        # Email service configuration
│   │
│   ├── controllers/          # Request handlers
│   │   ├── FeaturedController.ts    # Featured property logic
│   │   ├── PropertyController.ts    # Property CRUD logic
│   │   └── SearchController.ts      # Search logic
│   │
│   ├── models/               # Database schemas
│   │   ├── Featured.ts      # Featured property model
│   │   └── Property.ts      # Property model
│   │
│   ├── routes/               # API routes
│   │   ├── featuredRouter.ts        # Featured property routes
│   │   ├── propertyRouter.ts        # Property routes
│   │   └── searchRouter.ts          # Search routes
│   │
│   ├── middleware/           # Custom middleware
│   │   ├── auth.ts          # Authentication middleware
│   │   └── validation.ts    # Input validation middleware
│   │
│   ├── emails/               # Email templates (if applicable)
│   │
│   ├── server.ts             # Express app configuration
│   └── index.ts              # Application entry point
│
├── types/                    # TypeScript type definitions
├── Dockerfile                # Docker container configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
└── .gitignore                # Git ignore patterns
```

---

## 🔌 API Endpoints

### Properties

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/properties` | Get all properties | No |
| GET | `/api/properties/:id` | Get property by ID | No |
| GET | `/api/properties/name/:searchTerm` | Search properties by name | No |
| POST | `/api/properties/create` | Create new property | Yes (Admin) |
| PATCH | `/api/properties/edit/:id` | Update property | Yes (Admin) |
| DELETE | `/api/properties/delete/:id` | Delete property | Yes (Admin) |

### Search

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/search` | Search with filters | No |

**Query Parameters:**
- `type`: casa, departamento, parcela, sitio, oficina, comercial
- `operation`: En Arriendo, En Venta
- `region`: Chilean region name
- `minPrice`: Minimum price
- `maxPrice`: Maximum price
- `minArea`: Minimum area (m²)
- `maxArea`: Maximum area (m²)

### Featured Properties

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/featured` | Get all featured properties | No |
| POST | `/api/featured/create` | Create featured property | Yes (Admin) |
| DELETE | `/api/featured/delete/:id` | Remove featured property | Yes (Admin) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- MongoDB instance (local or cloud)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Thomas465xd/JUP-RealEstate_Backend.git
   cd JUP-RealEstate_Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory (see [Environment Variables](#-environment-variables))

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:4000` (or your configured PORT)

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=4000

# Database
DATABASE_URL=mongodb://localhost:27017/jup-realestate
# OR for MongoDB Atlas:
# DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/jup-realestate

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key

# CORS (Optional - Frontend URL)
FRONTEND_URL=http://localhost:3000
```

### Required Variables

- `DATABASE_URL`: MongoDB connection string
- `CLERK_PUBLISHABLE_KEY`: Clerk publishable key for authentication
- `CLERK_SECRET_KEY`: Clerk secret key for authentication
- `RESEND_API_KEY`: Resend API key for email functionality

### Optional Variables

- `PORT`: Server port (defaults to 4000)
- `FRONTEND_URL`: Frontend application URL for CORS configuration

---

## 💻 Usage

### Development

```bash
# Start development server with hot reload
npm run dev

# The API will be available at http://localhost:4000
```

### Production

```bash
# Build TypeScript to JavaScript
npm run build

# The compiled code will be in the dist/ directory

# Start production server
node dist/index.js
```

### Testing API Endpoints

You can test the API using tools like:
- **Postman**: Import and test endpoints
- **cURL**: Command-line testing
- **Frontend Application**: Connect your frontend

**Example cURL request:**
```bash
# Get all properties
curl http://localhost:4000/api/properties

# Search properties
curl "http://localhost:4000/api/search?type=casa&operation=En%20Venta&region=Metropolitana%20de%20Santiago"
```

---

## 🐳 Docker

### Building the Image

```bash
docker build -t jup-realestate-backend .
```

### Running the Container

```bash
docker run -p 4000:4000 \
  -e DATABASE_URL=your_mongodb_url \
  -e CLERK_PUBLISHABLE_KEY=your_key \
  -e CLERK_SECRET_KEY=your_secret \
  -e RESEND_API_KEY=your_key \
  jup-realestate-backend
```

---

## 🚀 Deployment

This application is deployed on **[Render](https://render.com/)**, a modern cloud platform that provides seamless deployment for web services.

### Render Deployment Features

- **Automatic Deployments**: Connected to the GitHub repository for automatic builds on push
- **Environment Variables**: Securely configured through Render's dashboard
- **Managed Database**: MongoDB Atlas integration for production database
- **SSL Certificates**: Automatic HTTPS with free SSL certificates
- **Health Checks**: Automatic service health monitoring
- **Zero Downtime**: Rolling deployments ensure continuous availability

### Deployment Configuration

The application is configured for Render deployment with:

1. **Build Command**: `npm install && npm run build`
2. **Start Command**: `node dist/index.js`
3. **Environment**: Node.js 20
4. **Health Check Path**: `/api/properties` (returns 200 for healthy service)

### Setting Up on Render

To deploy your own instance:

1. **Create a new Web Service** on Render
2. **Connect your GitHub repository**
3. **Configure the service**:
   - **Name**: `jup-realestate-backend`
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node dist/index.js`
4. **Add Environment Variables**:
   - `DATABASE_URL`
   - `CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `RESEND_API_KEY`
   - `FRONTEND_URL` (optional)
5. **Deploy**: Render will automatically build and deploy your application

### Production URL

The production API is available at: **[Your Render URL]**

---

## 📄 License

This project is **private** and belongs to **JUP Propiedades**. All rights reserved.

For use, distribution, or modification of this code, please contact the owner directly.

---

<div align="center">

**Made with ❤️ for JUP Propiedades**

*Providing robust backend services for Chile's modern real estate platform*

</div>

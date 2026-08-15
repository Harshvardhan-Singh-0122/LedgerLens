# LedgerLens

### See Where Your Money Goes

LedgerLens is a full-stack personal finance management platform that helps users track income and expenses, import transactions from UPI/bank CSV statements, automatically categorize spending, detect duplicate transactions, and understand their financial behavior through interactive dashboards and analytics.

Instead of manually entering every transaction, LedgerLens is designed around a simple workflow:

**Upload Statement → Parse Transactions → Categorize → Review → Import → Analyze**

---

## Live Demo

**Live Application:**
https://use-ledgerlens.vercel.app/signup

**GitHub Repository:**
https://github.com/Harshvardhan-Singh-0122/LedgerLens

---

## Overview

Managing personal finances often becomes difficult when transactions are spread across UPI apps, bank statements, and manually maintained records.

LedgerLens provides a centralized place to manage these transactions and turn raw transaction data into useful financial information.

The application supports both:

* **Manual transaction management**
* **CSV-based bulk transaction import**

The CSV workflow is one of the key features of LedgerLens. Users can upload a supported transaction statement, preview the parsed transactions, review automatically assigned categories, make corrections when required, and import the final data into their account.

Once transactions are stored, LedgerLens provides dashboards and analytics that help users understand:

* Total income
* Total expenses
* Spending by category
* Income vs. expenses
* Savings rate
* Remaining balance
* Daily spending
* Highest spending days
* Lowest spending days
* Top spending categories

---

# Key USP

## Automated CSV-to-Transaction Workflow

Traditional expense trackers often require users to manually enter every transaction.

LedgerLens reduces this effort by allowing users to upload transaction statements in CSV format.

The application processes the uploaded file through a workflow that:

1. Accepts the uploaded CSV file.
2. Parses the transaction records.
3. Extracts the required transaction information.
4. Determines the transaction type.
5. Automatically assigns an expense category where applicable.
6. Checks for duplicate transactions.
7. Shows a preview before importing.
8. Allows users to review and modify categories.
9. Imports the finalized transactions into MongoDB.

This makes LedgerLens more than a basic CRUD expense tracker.

---

# Features

## 1. User Authentication

LedgerLens provides authenticated access to personal financial data.

Features include:

* User registration
* User login
* Password hashing
* JWT-based authentication
* Protected application routes
* User-specific transaction access

Authentication ensures that a user's financial records are isolated from other users.

---

## 2. Transaction Management

Users can manually manage their financial transactions.

Supported operations include:

* Add income
* Add expense
* Edit transaction
* Delete transaction
* View transaction history
* Filter transactions by month and year

Each transaction contains the information required to maintain a structured financial record.

---

## 3. CSV Transaction Import

LedgerLens supports bulk transaction import through CSV statements.

Instead of entering transactions individually, users can upload a transaction statement and process multiple records together.

### Import workflow

```text
CSV File
   ↓
File Upload
   ↓
CSV Parsing
   ↓
Transaction Extraction
   ↓
Automatic Categorization
   ↓
Duplicate Detection
   ↓
Preview
   ↓
User Review / Category Editing
   ↓
Import
   ↓
MongoDB
```

This workflow is designed to reduce repetitive manual data entry.

---

## 4. Automatic Expense Categorization

One of LedgerLens's core features is automatic transaction categorization.

Transactions can be classified into categories such as:

* Food
* Shopping
* Transport
* Bills
* Entertainment
* Health
* Travel
* Other

The categorization process helps convert raw transaction descriptions into structured financial information.

Users can also review and modify categories during the CSV preview stage before final import.

---

## 5. Duplicate Transaction Detection

Bulk imports can potentially contain transactions that already exist in the user's account.

LedgerLens includes duplicate detection during the CSV import workflow to help prevent the same transaction from being imported multiple times.

This is particularly useful when users download overlapping transaction statements from their UPI or banking applications.

---

## 6. CSV Preview Before Import

Transactions are not immediately inserted into the database after uploading a CSV.

The application provides a preview stage where users can:

* Review parsed transactions
* Check transaction details
* Review automatically assigned categories
* Edit categories when required
* Confirm the transactions before importing

This provides an additional layer of control over imported financial data.

---

## 7. Dashboard

The dashboard provides a high-level overview of the user's finances.

It can be used to quickly understand:

* Income
* Expenses
* Financial balance
* Spending distribution
* Recent transactions
* Monthly financial activity

The dashboard is designed to provide important information without requiring the user to inspect individual transactions.

---

## 8. Analytics

LedgerLens includes a dedicated analytics experience for understanding financial behavior.

The analytics system provides information such as:

### Income

Total income for the selected month and year.

### Expense

Total expense for the selected month and year.

### Expense Distribution

A circular/donut chart showing the percentage distribution of expenses across categories.

Categories with zero expenses are excluded from the chart.

### Income vs Expense

A visual comparison between total income and total expenses.

### Expense by Category

Expense categories are displayed from highest spending to lowest spending.

### Savings Rate

The percentage of income remaining after expenses.

```text
Savings Rate =
((Total Income - Total Expense) / Total Income) × 100
```

### Remaining Balance

```text
Remaining Balance =
Total Income - Total Expense
```

### Average Daily Expense

Average spending is calculated using the number of calendar days in the selected month rather than only the days containing transactions.

### Highest Spending Day

Identifies the day with the highest total expense.

### Lowest Spending Day

Identifies the day with the lowest total expense, including days with zero spending.

### Top Spending Category

Identifies the category with the highest total expense for the selected period.

---

# 9. Month and Year Filtering

LedgerLens provides a shared month/year filtering mechanism.

Users can select a specific:

* Month
* Year

The selected period is used consistently across financial views.

This allows users to analyze their finances month by month rather than mixing transactions from different periods.

---

# 10. Transaction Deletion

Users can delete individual transactions.

LedgerLens also supports bulk deletion of transactions for a selected month, allowing users to remove a complete month's transaction records when necessary.

---

# 11. Responsive UI

LedgerLens is designed to work across different screen sizes.

The interface is designed for:

* Mobile devices
* Tablets
* Desktop screens

The application follows a mobile-first approach while maintaining a dashboard-oriented desktop layout.

---

# Technology Stack

## Frontend

* React
* Vite
* JavaScript
* Tailwind CSS
* React Router
* Axios
* Recharts
* React Hook Form
* Zod
* Lucide React
* Sonner

The current frontend dependency configuration can be seen in `client/package.json`.

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer
* csv-parser
* Nodemailer
* Zod
* CORS
* Cookie Parser
* dotenv

The current backend dependency configuration can be seen in `server/package.json`.

## Deployment

* Vercel — Frontend
* Backend deployment configured separately

---

# Architecture

LedgerLens follows a structured full-stack architecture.

```text
                    ┌─────────────────────┐
                    │       React UI      │
                    │                     │
                    │ Dashboard           │
                    │ Transactions        │
                    │ Analytics           │
                    │ CSV Import          │
                    └──────────┬──────────┘
                               │
                               │ HTTP / Axios
                               ▼
                    ┌─────────────────────┐
                    │    Express Server   │
                    │                     │
                    │ Routes              │
                    │ Middleware          │
                    │ Controllers         │
                    │ Services            │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Mongoose       │
                    │                     │
                    │ Models              │
                    │ Validation          │
                    │ Aggregations         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      MongoDB        │
                    │                     │
                    │ Users               │
                    │ Transactions        │
                    └─────────────────────┘
```

---

# Backend Architecture

The backend follows an MVC + Service Layer approach.

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
MongoDB
```

## Routes

Routes define API endpoints and connect requests to the appropriate controllers.

## Controllers

Controllers are responsible for:

* Receiving requests
* Reading authenticated user information
* Validating request data
* Calling service functions
* Returning responses

Business logic is kept outside controllers wherever possible.

## Services

Services contain the main application/business logic.

Examples include:

* Transaction operations
* Dashboard calculations
* CSV processing
* Analytics aggregation
* Authentication-related operations

## Models

Mongoose models define the structure of stored data.

The transaction model is used as the main source of financial data for dashboard and analytics operations.

---

# Frontend Architecture

The frontend is organized around reusable React components and service-based API communication.

Conceptually:

```text
React Page
    ↓
Components
    ↓
Frontend Service
    ↓
Axios
    ↓
Backend API
```

The application also uses React Context for shared application state.

Important shared state areas include:

* Authentication
* Dashboard month/year filtering
* Transaction modal state
* Application refresh state

---

# CSV Processing Architecture

The CSV import system is one of the main processing workflows in LedgerLens.

```text
             User Uploads CSV
                    │
                    ▼
             Multer Upload
                    │
                    ▼
              CSV Parser
                    │
                    ▼
           Data Extraction
                    │
                    ▼
         Transaction Processing
                    │
             ┌──────┴──────┐
             ▼             ▼
        Categorization   Duplicate Check
             │             │
             └──────┬──────┘
                    ▼
               CSV Preview
                    │
                    ▼
            User Verification
                    │
                    ▼
               Final Import
                    │
                    ▼
                 MongoDB
```

This separation allows users to verify imported financial data before it becomes part of their permanent transaction history.

---

# Analytics Architecture

Analytics are generated from transaction data stored in MongoDB.

The system uses aggregation logic to calculate financial information for the selected user and time period.

Conceptually:

```text
Authenticated User
       +
Selected Month
       +
Selected Year
       │
       ▼
Transaction Filtering
       │
       ├── Income Aggregation
       │
       ├── Expense Aggregation
       │
       ├── Category Aggregation
       │
       ├── Daily Expense Aggregation
       │
       └── Financial Statistics
              │
              ▼
         Analytics UI
```

This approach allows the application to calculate financial information dynamically instead of storing hardcoded analytical values.

---

# Project Structure

The repository is divided into two major applications:

```text
LedgerLens/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

The repository currently contains separate `client` and `server` directories.

> The exact internal files may evolve as the application continues to be developed.

---

# Installation and Local Setup

## Prerequisites

Before running LedgerLens locally, make sure the following are installed:

* Node.js
* npm
* MongoDB
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/Harshvardhan-Singh-0122/LedgerLens.git
cd LedgerLens
```

---

# 2. Frontend Setup

Move into the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend uses Vite for development and production builds. The available scripts include `dev`, `build`, `lint`, and `preview`.

---

# 3. Backend Setup

Open another terminal and move into the server directory:

```bash
cd LedgerLens/server
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

For production-style execution:

```bash
npm start
```

The backend scripts currently use Nodemon for development and Node.js for normal server execution.

---

# Environment Variables

LedgerLens uses environment variables for configuration and sensitive credentials.

Create a `.env` file inside the `server` directory.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Use the exact variable names expected by the current server configuration.

### Important

Do not commit `.env` files to GitHub.

Sensitive information such as:

* Database credentials
* JWT secrets
* Email credentials
* API keys

should always remain in environment variables.

---

# Running the Complete Application

After installing dependencies and configuring environment variables:

### Terminal 1 — Backend

```bash
cd server
npm run dev
```

### Terminal 2 — Frontend

```bash
cd client
npm run dev
```

Then open the local frontend URL provided by Vite.

---

# Typical User Workflow

## New User

```text
Open LedgerLens
      ↓
Create Account
      ↓
Login
      ↓
Dashboard
      ↓
Add Transactions
```

## Manual Transaction Workflow

```text
Add Transaction
      ↓
Select Income / Expense
      ↓
Enter Transaction Details
      ↓
Save
      ↓
Dashboard / Transactions Updated
```

## CSV Workflow

```text
Upload CSV
      ↓
Parse Statement
      ↓
Automatically Categorize
      ↓
Detect Duplicates
      ↓
Preview Transactions
      ↓
Edit Categories if Required
      ↓
Import
      ↓
Transactions Saved
      ↓
Dashboard & Analytics Refreshed
```

## Analytics Workflow

```text
Select Month / Year
        ↓
Filter Transactions
        ↓
Calculate Financial Metrics
        ↓
Generate Charts
        ↓
Analyze Spending
```

---

# Data Privacy and Security

LedgerLens handles personal financial information, so data isolation is an important part of the application design.

The application uses:

* JWT-based authentication
* Password hashing with bcrypt
* Protected routes
* Authenticated user identification
* User-specific transaction queries
* Environment variables for secrets
* Request validation

Financial aggregation should always be scoped to the authenticated user.

---

# Input Validation

Validation is used to prevent malformed data from entering the application.

The project uses Zod on both the frontend and backend dependency stacks for schema-based validation.

Validation is particularly important for:

* Authentication forms
* Transaction data
* CSV-related input
* API requests

---

# Error Handling

LedgerLens handles application errors at different levels.

The application uses:

* Backend error handling
* API response handling
* Form validation
* User-facing notifications
* Loading states
* Empty states

The frontend uses Sonner for toast-style notifications.

---

# Financial Calculation Logic

LedgerLens calculates financial information from actual transaction data.

## Remaining Balance

```text
Remaining Balance =
Total Income - Total Expense
```

## Savings Rate

```text
Savings Rate =
((Total Income - Total Expense) / Total Income) × 100
```

If income is zero, the application avoids division-by-zero calculations.

## Category Spending

```text
Category Total =
Sum of all expense transactions belonging to that category
```

Categories with no expense are excluded from expense-focused visualizations.

## Average Daily Expense

```text
Average Daily Expense =
Total Monthly Expense / Number of Days in Selected Month
```

This means days without transactions are still considered.

---

# Design

LedgerLens uses a dark, modern financial dashboard interface.

The primary design direction includes:

* Dark background
* Card-based layout
* Rounded components
* Violet accent color
* Responsive layouts
* Mobile-first design
* Clean financial visualizations
* Minimal unnecessary animations

The goal is to make financial information easy to scan without overwhelming the user.

---

# Why LedgerLens?

Many personal finance applications focus primarily on manually recording expenses.

LedgerLens focuses on reducing the effort required to create a structured financial record.

The central idea is:

> **Turn existing transaction statements into organized financial information instead of making users manually enter everything.**

The CSV workflow combined with categorization, duplicate detection, transaction management, and analytics creates an end-to-end financial tracking experience.

---

# Engineering Highlights

The project demonstrates several full-stack engineering concepts:

### Frontend

* Component-based React development
* Context API
* Responsive UI
* Form handling
* API integration
* Client-side validation
* Data visualization

### Backend

* RESTful API development
* MVC architecture
* Service Layer architecture
* JWT authentication
* Password hashing
* Middleware
* File upload handling
* CSV parsing
* Request validation

### Database

* MongoDB
* Mongoose
* Transaction modeling
* User-specific queries
* Aggregation pipelines
* Financial data aggregation

### Application Engineering

* CRUD operations
* Bulk data import
* Duplicate detection
* Error handling
* Loading states
* Empty states
* Shared application refresh handling
* Responsive design

---

# Future Improvements

Possible future improvements include:

* Support for more bank/UPI CSV formats
* Custom user-defined categories
* Recurring transaction detection
* Budget planning
* Monthly budget limits
* Exporting filtered transactions
* More advanced spending trends
* Multi-currency support
* Financial goals
* Notification and reminder system
* Improved CSV format detection
* More detailed financial reports

These features are potential future extensions and are not required for the current version.

---

# Development Philosophy

LedgerLens was developed with a focus on:

* Simple and maintainable React code
* Clear backend separation
* Reusable components
* Service-based business logic
* Secure user-specific data access
* Practical financial workflows
* Responsive design
* Real-world data processing

The project intentionally avoids unnecessary complexity and focuses on building understandable, maintainable full-stack functionality.

---

# Deployment

The frontend is deployed using Vercel.

Production application:

https://use-ledgerlens.vercel.app/signup

The repository contains the frontend and backend as separate applications, allowing each part of the stack to be configured and deployed independently.

---

# Screenshots

Screenshots can be added here to showcase the main application screens.

Recommended screenshots:

1. Login / Signup
2. Dashboard
3. Transactions
4. Add Transaction
5. CSV Upload
6. CSV Preview
7. Analytics
8. Mobile Dashboard

Example structure:

```text
docs/
├── login.png
├── dashboard.png
├── transactions.png
├── csv-upload.png
├── csv-preview.png
└── analytics.png
```

Then they can be embedded using:

```markdown
![LedgerLens Dashboard](docs/dashboard.png)
```

---

# Contributing

LedgerLens is currently maintained as a personal project.

If you want to experiment with the project:

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Test the application locally.
5. Commit your changes.

```bash
git add .
git commit -m "Add your feature"
```

6. Push the branch.

```bash
git push origin feature/your-feature
```

7. Open a Pull Request.

---

# License

This project is currently maintained as a personal portfolio project.

If you intend to reuse or distribute the code, review and add an appropriate license to the repository before doing so.

---

# Author

## Harshvardhan Singh

B.Tech Information Technology

Swami Keshvanand Institute of Technology, Jaipur

### Profiles

* GitHub: https://github.com/Harshvardhan-Singh-0122
* LinkedIn: https://www.linkedin.com/in/harshvardhan-singh-465080422/
* LeetCode: https://leetcode.com/u/Harshvardhan-Singh-0122/
* Codolio: https://codolio.com/profile/Mrhvsd01

---

# Project Links

| Resource  | Link                                                  |
| --------- | ----------------------------------------------------- |
| Live Demo | https://use-ledgerlens.vercel.app/signup              |
| GitHub    | https://github.com/Harshvardhan-Singh-0122/LedgerLens |

---

## LedgerLens

**See Where Your Money Goes.**

A full-stack personal finance application built to make transaction tracking easier through automated CSV importing, transaction categorization, duplicate detection, and financial analytics.

```
```

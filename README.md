💰 Personal Finance Visualizer
A simple and intuitive web application for tracking personal finances, built with Next.js, React, Recharts, MongoDB, and shadcn/ui.
Track your expenses, view insights, and manage monthly budgets with ease.

🧩 Features by Stage
✅ Stage 1: Basic Transaction Tracking
Add, edit, and delete transactions
View transactions in a list format
Monthly expense bar chart using Recharts
Form validation for transaction inputs

✅ Stage 2: Categories
Predefined categories for each transaction (e.g., Food, Rent, Utilities)
Category-wise pie chart visualization
Dashboard with: Total expenses, Category breakdown, Most recent transactions

✅ Stage 3: Budgeting
Set monthly budgets per category
Budget vs Actual comparison chart
Basic spending insights and tips

🛠️ Tech Stack
Frontend: Next.js, React, TypeScript
UI: shadcn/ui, Tailwind CSS, Lucide Icons
Charts: Recharts
Database: MongoDB (Mongoose/MongoDB Atlas)
Deployment: Vercel (for frontend), MongoDB Atlas (cloud database)

🚀 Getting Started

1. Clone the Repository
   git clone https://github.com/Indu61/Personal-Finance-Visualizer1.git
   cd personal-finance-visualizer

2. Install Dependencies
   npm install

3. Setup Environment Variables
   Create a .env.local file and add:
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_BASE_URL=http://localhost:3000

4. Run the App
   npm run dev
   App will be running on: http://localhost:3000

📊 Sample Data Structure
{
"amount": 250,
"date": "2025-04-17",
"description": "Groceries",
"category": "Food"
}

🌐 Live Demo
Live URL (Vercel)
https://personal-finance-visualizer1.vercel.app/Dashboard

✅ Submission Checklist
GitHub Repository: https://github.com/Indu61/Personal-Finance-Visualizer1.git

Live Deployment URL: https://personal-finance-visualizer1.vercel.app/Dashboard

# Jarvis Frontend

A modern expense tracking application built with React 19 and Next.js 15.

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.13-06B6D4?style=flat&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-000000?style=flat&logo=shadcnui&logoColor=white)

## Features

- 📊 Expense tracking and management
- 📅 Monthly expense filtering
- 📈 Expense statistics and analytics
- 🎨 Dark mode UI with shadcn/ui components
- 🚀 Built with Next.js App Router

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd jarvis-frontend

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## Project Structure

```
src/
├── app/                # Next.js App Router
├── components/         # React components
│   └── ui/            # shadcn/ui components
├── types/             # TypeScript types
└── lib/               # Utility functions
```
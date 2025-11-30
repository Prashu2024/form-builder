# Dynamic Form Builder - Frontend

A React-based dynamic form builder with real-time validation, submissions table, and interactive UI.

##  Tech Stack

- React 18
- TanStack Query (React Query)
- TanStack Form
- TanStack Table
- Tailwind CSS
- Vite
- Lucide React (Icons)

##  Project Structure
frontend/
├── src/
│   ├── components/          
│   │   ├── DynamicForm.jsx
│   │   ├── FormField.jsx
│   │   ├── SubmissionsTable.jsx
│   │   └── SubmissionViewModal.jsx
│   ├── services/           
│   │   └── apiService.js
│   ├── utils/               
│   │   └── validators.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── tailwind.config.js

##  Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to frontend directory:**
```bash
   cd frontend
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Configure API URL:**
   
   Update `src/services/apiService.js`:
```javascript
   const API_BASE_URL = 'http://localhost:8000/api';
```

4. **Start development server:**
```bash
   npm run dev
```

   Application runs on: `http://localhost:5173`

##  Features

- **Dynamic Form Rendering** - Schema-driven form generation
- **8 Field Types** - Text, Number, Select, Multi-Select, Date, Textarea, Switch
- **Real-time Validation** - Inline error messages
- **Submissions Table** - Paginated with sorting
- **Interactive Modal** - View submission details
- **Responsive Design** - Mobile-friendly UI

##  Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

##  Configuration

### Tailwind CSS
Configured in `tailwind.config.js` with utility-first approach.

### Vite
Fast build tool configured in `vite.config.js`.

##  API Integration

The frontend connects to the backend API with three endpoints:

- `GET /api/form-schema` - Fetch form schema
- `POST /api/submissions` - Submit form data
- `GET /api/submissions` - Get paginated submissions

##  Dependencies
```json
{
  "@tanstack/react-query": "^5.56.2",
  "@tanstack/react-form": "^0.33.0",
  "@tanstack/react-table": "^8.20.5",
  "lucide-react": "^0.263.1",
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
}
```

##  Component Overview

- **App.jsx** - Main container with view routing
- **DynamicForm** - Form with schema fetching and submission
- **FormField** - Reusable field renderer for all types
- **SubmissionsTable** - Table with pagination and sorting
- **SubmissionViewModal** - Detailed submission view

##  Troubleshooting

**CORS Errors:**
- Ensure backend is running on `http://localhost:8000`
- Check CORS configuration in Django settings

**Port Already in Use:**
```bash
# Change port in vite.config.js or use:
npm run dev -- --port 3000
```


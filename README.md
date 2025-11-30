# Dynamic Form Builder
A full-stack application for creating, submitting, and managing dynamic forms with real-time validation.

##  Overview
Frontend: React application with TanStack libraries and Tailwind CSS
Backend: Django REST API with comprehensive validation and data persistence

##  Quick Start

### Prerequisites

Python 3.8+
Node.js 16+
pip and npm

### Backend Setup
```bash
   cd backend
   python -m venv venv
```
# Activate virtual environment

## Windows:
venv\Scripts\activate
## macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
# Username: Prashant
# Password: Prashant

python manage.py runserver
Backend runs on: http://localhost:8000

## Frontend Setup
```bash
  cd frontend
  npm install
  npm run dev
```  
Frontend runs on: http://localhost:5173


##  Tech Stack

# Frontend

React 18
TanStack Query (data fetching)
TanStack Form (form management)
TanStack Table (table management)
Tailwind CSS (styling)
Vite (build tool)

# Backend

Django 5.0.1
Django REST Framework
django-cors-headers
SQLite (database)

##  Project Structure
form-builder-system/
├── frontend/
│   ├── src/
│   │   ├── components/      # UI Components
│   │   ├── services/        # API calls
│   │   ├── utils/           # Helpers
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── backend/             # Django settings
│   ├── forms_api/           # API app
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── validators.py
│   │   └── urls.py
│   └── requirements.txt
├── .gitignore
└── README.md


##  API Endpoints
1. Get Form Schema
httpGET /api/form-schema
Returns the Employee Onboarding form schema with fields and validation rules.
2. Submit Form
httpPOST /api/submissions
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "department": "engineering",
  "skills": ["javascript", "react"],
  "startDate": "2024-01-15",
  "bio": "Software engineer",
  "agreeToTerms": true
}
3. Get Submissions
httpGET /api/submissions?page=1&limit=10&sortBy=createdAt&sortOrder=desc
Returns paginated list of submissions with sorting.

##  Admin Access

URL: http://localhost:8000/admin
Username: Prashant
Password: Prashant

##  Form Validation Rules
FieldTypeValidationFull NameTextRequired, 2-100 charactersEmailTextRequired, valid email formatAgeNumberRequired, 18-100 rangeDepartmentSelectRequired, one of 5 optionsTechnical SkillsMulti-SelectRequired, 1-4 selectionsStart DateDateRequired, after 2024-01-01Brief BioTextareaOptional, max 500 charactersTerms & ConditionsSwitchRequired boolean

##  Testing
Test Backend API
bash# Get form schema
curl http://localhost:8000/api/form-schema

# Get submissions
curl http://localhost:8000/api/submissions?page=1&limit=10
Test Frontend

Open http://localhost:5173
Fill out the form
Submit and check validation
Navigate to Submissions tab
View submission details

##  Troubleshooting

# Backend Issues:

Ensure virtual environment is activated
Check if port 8000 is free
Run migrations: python manage.py migrate

# Frontend Issues:

Check if backend is running on port 8000
Verify API_BASE_URL in src/services/apiService.js
Clear node_modules and reinstall: rm -rf node_modules && npm install

## CORS Errors:

Ensure backend CORS settings include frontend URL
Check backend/settings.py CORS_ALLOWED_ORIGINS

##  Dependencies
Backend (requirements.txt)
Django==5.0.1
djangorestframework==3.14.0
django-cors-headers==4.3.1
python-dateutil==2.8.2

Frontend (package.json)
json{
  "@tanstack/react-query": "^5.56.2",
  "@tanstack/react-form": "^0.33.0",
  "@tanstack/react-table": "^8.20.5",
  "lucide-react": "^0.263.1",
  "react": "^18.3.1"
}


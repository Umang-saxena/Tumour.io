# Brain Tumour Detection

A full-stack web application for detecting brain tumors from MRI scans using a pre-trained ResNet50V2 machine learning model. The application allows users to upload brain MRI images and receive predictions for tumor types including glioma, meningioma, pituitary, or no tumor.

## Features

- **User Authentication**: Secure login and registration using Clerk
- **Image Upload**: Drag-and-drop interface for uploading MRI scans
- **AI Prediction**: Real-time tumor detection using TensorFlow/Keras model
- **Prediction History**: Store and view previous predictions in MongoDB
- **Responsive Design**: Modern UI built with Next.js and Tailwind CSS
- **RESTful API**: FastAPI backend for efficient model inference

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Clerk** - Authentication and user management
- **MongoDB/Mongoose** - Database for storing prediction history
- **Radix UI** - Accessible UI components

### Backend
- **FastAPI** - Modern Python web framework
- **TensorFlow/Keras** - Machine learning framework
- **Uvicorn** - ASGI server
- **PIL/Pillow** - Image processing
- **NumPy** - Numerical computing

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **Python** (version 3.8 or higher)
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud instance)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd tumour.io
   ```

2. **Set up the backend:**

   ```bash
   cd backend

   # Create virtual environment
   python -m venv venv

   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate

   # Install dependencies
   pip install -r requirements.txt
   ```

3. **Set up the frontend:**

   ```bash
   cd ../frontend

   # Install dependencies
   npm install
   ```

## Environment Variables

Create the following environment files:

### Frontend (.env.local in frontend/)
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth
MONGODB_URI=your_mongodb_connection_string
```

### Backend (.env in backend/)
```env
# Add any backend-specific environment variables if needed
```

## Running the Application

1. **Start the backend server:**

   ```bash
   cd backend
   # Activate virtual environment if not already activated
   venv\Scripts\activate  # Windows
   # source venv/bin/activate  # macOS/Linux

   # Run the server
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

   The backend API will be available at `http://localhost:8000`

2. **Start the frontend development server:**

   ```bash
   cd frontend
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## API Endpoints

### POST /predict
Upload an MRI image for tumor detection.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (image file, JPG/PNG)

**Response:**
```json
{
  "prediction": "glioma",
  "confidence": 95.67
}
```

**Possible predictions:** glioma, meningioma, notumor, pituitary

## Project Structure

```
tumour.io/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application
│   │   ├── routers/
│   │   │   └── predict.py       # Prediction endpoint
│   │   └── models/
│   │       └── brain_tumor_resnet50v2_model.keras  # Pre-trained model
│   └── requirements.txt         # Python dependencies
├── frontend/
│   ├── app/                     # Next.js app directory
│   ├── components/              # React components
│   ├── lib/                     # Utilities and database connection
│   └── package.json             # Node dependencies
└── README.md                    # Project documentation
```

## Usage

1. Navigate to the application in your browser
2. Sign up or log in using Clerk authentication
3. Go to the upload page
4. Drag and drop or select an MRI brain scan image
5. View the prediction results with confidence score
6. Access your prediction history from the dashboard

## Development

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend Scripts
- `uvicorn app.main:app --reload` - Start development server with auto-reload

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Pre-trained model based on ResNet50V2 architecture
- Brain tumor dataset from medical imaging sources
- Built with modern web technologies for accessibility and performance

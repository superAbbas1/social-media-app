# Scalable Media Sharing Platform

A full-stack web application for sharing photos and videos, similar to Instagram, built for the "Scalable Advanced Software Solutions" academic module.

## Features

### Creator Features
- Upload images (JPG, PNG) and videos (MP4)
- Add metadata: title, caption, location, people present
- View list of uploaded media
- Analytics dashboard with view counts, ratings, and media type distribution

### Consumer Features
- Browse media feed (images and videos)
- View media details and play videos inline
- Search media by title, location, or people
- Rate media (1-5 stars)

## Tech Stack

### Frontend
- React.js
- Basic CSS (no UI frameworks)
- Axios for API calls

### Backend
- Node.js with Express
- REST API architecture
- Environment variables for configuration
- Multer for file uploads

### Database
- MongoDB (local) with Mongoose
- Schema compatible with Azure Cosmos DB (MongoDB API)

### Storage
- Local filesystem for media files
- Ready for Azure Blob Storage migration

## Project Structure

```
social-media-app/
├── backend/
│   ├── controllers/
│   │   ├── analyticsController.js
│   │   └── mediaController.js
│   ├── models/
│   │   └── Media.js
│   ├── routes/
│   │   ├── analyticsRoutes.js
│   │   └── mediaRoutes.js
│   ├── services/
│   │   └── mediaService.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── config/
│   │   └── database.js
│   ├── uploads/          # Media files stored here
│   ├── app.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnalyticsDashboard.jsx
│   │   │   ├── MediaFeed.jsx
│   │   │   ├── MediaItem.jsx
│   │   │   ├── MediaList.jsx
│   │   │   ├── MediaSearch.jsx
│   │   │   └── MediaUpload.jsx
│   │   ├── pages/
│   │   │   ├── ConsumerView.jsx
│   │   │   └── CreatorView.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── .env                 # Environment variables
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or cloud instance)
- npm or yarn

## Installation and Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB (if running locally):
   ```bash
   mongod
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The backend will run on http://localhost:5000

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```
   The frontend will run on http://localhost:3000

## Usage

1. Open your browser and go to http://localhost:3000
2. Switch between Consumer View and Creator View using the navigation buttons
3. In Creator View:
   - Upload media files with metadata
   - View analytics dashboard
   - See list of uploaded media
4. In Consumer View:
   - Browse the media feed
   - Click on images/videos to view details
   - Use the search bar to find specific media
   - Rate media using the dropdown

## API Endpoints

- `GET /api/media` - Get all media
- `POST /api/media` - Upload new media (multipart/form-data)
- `GET /api/media/search?q=` - Search media
- `POST /api/media/:id/view` - Increment view count
- `POST /api/media/:id/rate` - Add rating
- `GET /api/analytics` - Get analytics data

## Data Model

The Media model includes:
- `id`: Unique identifier
- `mediaType`: "image" or "video"
- `fileUrl`: Path to the uploaded file
- `title`: Media title
- `caption`: Media description
- `location`: Location where media was taken
- `people`: Array of people present
- `views`: Number of views
- `ratings`: Array of rating objects with value and timestamp
- `createdAt`: Creation timestamp

## Deployment to Azure

This application is designed to be easily deployed to Azure:

1. **Azure App Service**: Deploy the backend Node.js app
2. **Azure Cosmos DB**: Replace local MongoDB with Cosmos DB (MongoDB API)
3. **Azure Blob Storage**: Replace local file storage with Blob Storage
4. **Environment Variables**: Update .env with Azure connection strings

## Future Enhancements

- User authentication and authorization
- Comments and likes
- User profiles
- Real-time notifications
- Advanced analytics
- Mobile app version

## License

This project is for academic purposes as part of the "Scalable Advanced Software Solutions" module.
# Internship Analytics Microservice

A REST API backend microservice built with Node.js and Express.js that performs analytics on internship applicant and feedback data stored in local JSON files.

## Tech Stack

* **Runtime**: Node.js (v14+)
* **Framework**: Express.js
* **Data Storage**: In-memory JSON files
* **Environment**: dotenv for configuration
* **CORS**: Cross-Origin Resource Sharing enabled
* **Architecture**: MVC pattern with services layer

## Project Structure

```
internship-analytics-microservice/
├── controllers/
│   └── analyticsController.js    # Request/Response logic
├── services/
│   └── analyticsService.js       # Business logic & data processing
├── routes/
│   └── analyticsRoutes.js        # API endpoint definitions
├── data/
│   ├── applicants.json           # Sample applicant data
│   └── feedback.json             # Sample feedback data
├── index.js                      # Main server file
├── package.json                  # Dependencies & scripts
├── .env.sample                   # Environment variables template
└── README.md                     # This file
```

## Setup Instructions

### Prerequisites

* Node.js (v14 or higher)
* npm or yarn package manager

### Installation

1. **Clone or download the project files**

   ```bash
   mkdir internship-analytics-microservice
   cd internship-analytics-microservice
   ```

2. **Create the folder structure and add all the files**

   ```bash
   mkdir controllers services routes data
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Set up environment variables**

   ```bash
   cp .env.sample .env
   ```

5. **Start the server**

   ```bash
   npm run dev     # For development
   npm start       # For production
   ```

6. **Verify the server is running**

   ```bash
   curl http://localhost:5000/health
   ```

## API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### 1. Get Top Applicants

**GET** `/api/applicants/top`

Returns the top 5 applicants based on average mentor feedback scores in descending order.

**Response Example:**

```json
{
  "success": true,
  "data": [
    {
      "id": "A001",
      "name": "John Doe",
      "score": 4.5
    }
  ],
  "message": "Top 5 applicants retrieved successfully"
}
```

#### 2. Get Daily Applicant Statistics

**GET** `/api/applicants/stats?date=YYYY-MM-DD`

**Query Parameters:**

* `date` (required): Date in YYYY-MM-DD format

**Response Example:**

```json
{
  "success": true,
  "data": {
    "date": "20250615",
    "total": 3,
    "accepted": 1,
    "rejected": 1,
    "pending": 1
  },
  "message": "Daily statistics for 2025-06-15 retrieved successfully"
}
```

#### 3. Get Feedback Summary

**GET** `/api/feedback/summary`

**Response Example:**

```json
{
  "success": true,
  "data": {
    "positive": 10,
    "neutral": 4,
    "negative": 4
  },
  "message": "Feedback summary retrieved successfully"
}
```

### Rating Categories

* Positive: Ratings 4 or 5
* Neutral: Rating 3
* Negative: Ratings 1 or 2

## Testing with Postman or Insomnia

### Sample Requests

1. **Health Check**

   ```
   GET http://localhost:5000/health
   ```

2. **Top Applicants**

   ```
   GET http://localhost:5000/api/applicants/top
   ```

3. **Daily Statistics**

   ```
   GET http://localhost:5000/api/applicants/stats?date=2025-06-15
   ```

4. **Feedback Summary**

   ```
   GET http://localhost:5000/api/feedback/summary
   ```

### Response Format

```json
{
  "success": boolean,
  "data": object | array,
  "message": string,
  "error": string (only present on errors)
}
```

## Sample Data Overview

### Applicants Data

* 10 applicants
* Statuses: accepted, pending, rejected
* Dates: 2025-06-11 to 2025-06-15

### Feedback Data

* 18 feedback entries
* Ratings from 1 to 5
* Multiple entries per applicant

## Available Scripts

```bash
npm start        # Start production server
npm run dev      # Start development server
```

## Error Handling

* **400**: Invalid input or parameters
* **404**: Endpoint not found
* **500**: Internal server error

## Sample Output Screenshots

### Health Check

```json
{
  "status": "OK",
  "message": "Internship Analytics Microservice is running",
  "timestamp": "2025-06-15T10:30:00.000Z"
}
```

### Top Applicants

```json
{
  "success": true,
  "data": [
    { "id": "A010", "name": "Anna Rodriguez", "score": 4.5 },
    { "id": "A001", "name": "John Doe", "score": 4.5 }
  ],
  "message": "Top 5 applicants retrieved successfully"
}
```

### Daily Stats

```json
{
  "success": true,
  "data": {
    "date": "20250615",
    "total": 3,
    "accepted": 1,
    "rejected": 1,
    "pending": 1
  },
  "message": "Daily statistics for 2025-06-15 retrieved successfully"
}
```

### Feedback Summary

```json
{
  "success": true,
  "data": {
    "positive": 10,
    "neutral": 4,
    "negative": 4
  },
  "message": "Feedback summary retrieved successfully"
}
```

## Security Considerations

* CORS enabled
* Basic validation for query params

**To improve:**

* Use Helmet for headers
* Add rate limiting
* Add request validation
* Input sanitization
* Use API keys for access control

## Environment Variables

`.env.sample`


## Version and License

**Version**: 1.0.0
**Last Updated**: June 15, 2025
**License**: MIT


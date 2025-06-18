## README.md
```markdown
# MiniBlog API

A simple blog backend built with Node.js, Express, MongoDB and TypeScript.

## Features
- JWT-based authentication
- Blog creation, listing, fetching, and updating
- MongoDB integration

## Getting Started

### Prerequisites
- Node.js v22+
- MongoDB running locally or on Atlas

### Installation
```bash
git clone https://github.com/lohitmuniraman/miniblog-api.git
cd miniblog-api
npm install
```

### Environment Variables
Create a `.env` file and set the following:
```
PORT=6123
MONGODB_URI=mongodb://localhost:27017/miniblog
JWT_SECRET=your_jwt_secret
```

### Run Server
```bash
npm run dev
```

## API Docs
Once running, you can view the Swagger docs at `/api-docs` if Swagger UI is set up.

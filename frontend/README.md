# Klickks Frontend

This is the frontend for the Klickks e-commerce platform, built with React, Redux, and modern web technologies.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or Yarn
- Backend server (see backend README for setup)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Klickks-Assignment/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```
   This will install all required packages including:
   - React
   - React Router DOM
   - Redux
   - Axios
   - React Icons
   - Styled Components
   - Other UI and utility libraries

3. **Environment Setup**
   Create a `.env` file in the frontend directory with the following variables:
   ```env
   REACT_APP_API_URL=http://localhost:3001
   REACT_APP_GOOGLE_ANALYTICS_ID=your-ga-id  # Optional
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```
   This will start the development server on [http://localhost:3000](http://localhost:3000)

## Available Scripts

In the project directory, you can run:

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (Note: this is a one-way operation)

## Project Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── redux/           # Redux store and slices
│   ├── services/        # API services
│   ├── styles/          # Global styles and themes
│   ├── utils/           # Utility functions
│   ├── App.js           # Main App component
│   └── index.js         # Entry point
├── .env                # Environment variables
├── package.json        # Project dependencies
└── README.md           # This file
```

## Features

- User authentication (login/register)
- Product browsing and search
- Shopping cart functionality
- Responsive design
- Order management
- Admin dashboard

## Environment Variables

- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:3001)
- `REACT_APP_GOOGLE_ANALYTICS_ID` - Google Analytics Tracking ID (optional)

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

This will create an optimized production build in the `build` folder.

## Deployment

You can deploy the frontend to any static file hosting service, such as:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

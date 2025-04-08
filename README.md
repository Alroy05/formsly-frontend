# Formsly Frontend

This repository contains the frontend code for Formsly, a web application built using React and Vite.

   ```bash
    https://formsly.netlify.app/
   ```


## Project Structure

The project is organized as follows:

```
formsly-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
|   |   ├──AdminLogin.jsx
|   |   ├──FeedbackForm.jsx
|   |   └──FeedbackList.jsx
│   ├── App.jsx
|   ├── store.js
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

- `public/`: Contains static assets and the main `index.html` file.
- `src/`: Contains the React application source code.
  - `assets/`: Stores images, fonts, and other static assets.
  - `components/`: Contains reusable React components.
  - `pages/`: Contains React components that represent different pages.
  - `App.jsx`: The root component that defines the main application structure.
  - `main.jsx`: The entry point that renders the `App` component.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `index.html`: The main HTML file that includes the React application.
- `package.json`: Manages project dependencies and scripts.
- `vite.config.js`: Configuration file for Vite.
- `README.md`: This file.

## Tech Stack

The project utilizes the following technologies:

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server for modern web projects.
- **ESLint**: A tool for identifying and fixing linting issues in JavaScript code.

## Deployment Steps

To deploy the Formsly frontend application, follow these steps:

1. **Install Dependencies**: Ensure you have [Node.js](https://nodejs.org/) installed. Then, run:

   ```bash
   npm install
   ```

2. **Build the Application**: Create an optimized production build:

   ```bash
   npm run build
   ```

   This will generate a `dist/` directory containing the compiled files.

3. **Deploy to Production**: Upload the contents of the `dist/` directory to your preferred hosting service, such as [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/).

## Development

To start the development server:

```bash
npm run dev
```

This will start the Vite development server, and you can view the application at `http://localhost:5173`.


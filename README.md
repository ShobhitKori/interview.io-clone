# Interview.io Clone

## Project Overview  
Interview.io Clone is a technical interview outsourcing platform that facilitates conducting, scheduling, and managing technical interviews efficiently. The platform includes a client-side application built with React and Tailwind CSS and a server-side application using Node.js.<br>

## Folder Structure  
```
interview.io-clone/
│── client/                 # Frontend application
│   ├── src/                # Source code for the client
│   ├── components.json     # Component mapping
│   ├── eslint.config.js    # ESLint configuration
│   ├── index.html          # Main HTML file
│   ├── jsconfig.json       # JavaScript configuration
│   ├── package.json        # Frontend dependencies
│   ├── postcss.config.js   # PostCSS configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── vite.config.js      # Vite configuration
│── server/                 # Backend application
│   ├── configuration/      # Configuration files
│   ├── controllers/        # API controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── services/           # Business logic services
│   ├── utils/              # Utility functions
│   ├── .env                # Environment variables (ignored by Git)
│   ├── db.js               # Database connection
│── .gitignore              # Ignored files and folders
│── README.md               # Project documentation
```

## Features  
- Conduct live technical interviews with code execution support.<br>
- Schedule and manage interview sessions.<br>
- Store interview results and feedback.<br>
- Secure authentication for interviewers and candidates.<br>
- Real-time collaboration with video and code editor integration.<br>

## Tech Stack  
### Frontend:  
- React.js<br>
- Tailwind CSS<br>
- Vite.js<br>

### Backend:  
- Node.js<br>
- Express.js<br>
- MongoDB<br>

## Installation & Setup  
### Prerequisites:  
- Node.js (v16 or later)<br>
- MongoDB<br>
- Git<br>

### Steps to Run the Project  
#### 1. Clone the repository:  
```sh
git clone https://github.com/your-username/interview.io-clone.git
cd interview.io-clone
```

#### 2. Install dependencies  
For client:  
```sh
cd client
npm install
```
For server:  
```sh
cd server
npm install
```

#### 3. Set up environment variables  
Create a `.env` file inside the `server/` directory and configure your database and other environment settings.<br>

#### 4. Run the application  
Start the backend server:  
```sh
cd server
npm start
```
Start the frontend:  
```sh
cd client
npm run dev
```

## Contribution  
Feel free to contribute to the project by submitting issues or pull requests. Follow the standard Git workflow:<br>
1. Fork the repository<br>
2. Create a feature branch (`git checkout -b feature-name`)<br>
3. Commit your changes (`git commit -m 'Add new feature'`)<br>
4. Push to the branch (`git push origin feature-name`)<br>
5. Open a pull request<br>

## License  
This project is licensed under the MIT License.<br>

---  
For any questions or discussions, feel free to open an issue or reach out. 🚀


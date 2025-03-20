// const express = require("express")
// const http = require("http")
// const { Server } = require("socket.io")
// const cors = require("cors")
// const { ExpressPeerServer } = require("peer")
// const axios = require("axios")
// const dotenv = require("dotenv")

// // Load environment variables
// dotenv.config()

// const app = express()
// const server = http.createServer(app)

// // Configure CORS
// app.use(cors())
// app.use(express.json())

// // Set up Socket.io
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// })

// // Set up PeerJS server
// const peerServer = ExpressPeerServer(server, {
//   debug: true,
//   path: "/peerjs",
// })

// app.use("/peerjs", peerServer)

// // Judge0 API configuration
// const JUDGE0_API = process.env.JUDGE0_API || "https://judge0-ce.p.rapidapi.com"
// const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY
// const JUDGE0_API_HOST = process.env.JUDGE0_API_HOST || "judge0-ce.p.rapidapi.com"

// // Language ID mapping for Judge0
// const LANGUAGE_ID_MAP = {
//   javascript: 63, // Node.js
//   python: 71, // Python 3
//   cpp: 54, // C++ (GCC 9.2.0)
//   java: 62, // Java (OpenJDK 13.0.1)
// }

// // Socket.io connection handling
// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id)

//   // Join a room
//   socket.on("join-room", (roomId, userId, username) => {
//     socket.join(roomId)
//     socket.to(roomId).emit("user-connected", userId, username)

//     console.log(`User ${username} (${userId}) joined room ${roomId}`)

//     // Handle disconnection
//     socket.on("disconnect", () => {
//       socket.to(roomId).emit("user-disconnected", userId)
//       console.log(`User ${username} (${userId}) left room ${roomId}`)
//     })
//   })

//   // Handle code changes
//   socket.on("code-change", (roomId, code) => {
//     socket.to(roomId).emit("code-change", code)
//   })

//   // Handle language changes
//   socket.on("language-change", (roomId, language) => {
//     socket.to(roomId).emit("language-change", language)
//   })

//   // Handle code execution
//   socket.on("run-code", async (roomId, { code, language }) => {
//     try {
//       const languageId = LANGUAGE_ID_MAP[language]

//       if (!languageId) {
//         throw new Error(`Unsupported language: ${language}`)
//       }

//       // Create submission
//       const createResponse = await axios({
//         method: "POST",
//         url: `${JUDGE0_API}/submissions`,
//         params: { base64_encoded: "false", wait: "false" },
//         headers: {
//           "content-type": "application/json",
//           "X-RapidAPI-Key": JUDGE0_API_KEY,
//           "X-RapidAPI-Host": JUDGE0_API_HOST,
//         },
//         data: {
//           source_code: code,
//           language_id: languageId,
//           stdin: "",
//         },
//       })

//       const token = createResponse.data.token

//       // Poll for results
//       let result = null
//       let attempts = 0
//       const maxAttempts = 10

//       while (!result && attempts < maxAttempts) {
//         await new Promise((resolve) => setTimeout(resolve, 1000))

//         const getResponse = await axios({
//           method: "GET",
//           url: `${JUDGE0_API}/submissions/${token}`,
//           params: { base64_encoded: "false" },
//           headers: {
//             "X-RapidAPI-Key": JUDGE0_API_KEY,
//             "X-RapidAPI-Host": JUDGE0_API_HOST,
//           },
//         })

//         if (getResponse.data.status.id > 2) {
//           // If status is not "In Queue" or "Processing"
//           result = getResponse.data
//         }

//         attempts++
//       }

//       if (!result) {
//         throw new Error("Execution timed out")
//       }

//       // Format the output
//       let output = ""

//       if (result.compile_output) {
//         output += `Compilation Error:\n${result.compile_output}\n`
//       }

//       if (result.stdout) {
//         output += result.stdout
//       }

//       if (result.stderr) {
//         output += `\nError:\n${result.stderr}`
//       }

//       if (result.message) {
//         output += `\nMessage:\n${result.message}`
//       }

//       // Send the result back to the room
//       io.to(roomId).emit("execution-result", output || "No output")
//     } catch (error) {
//       console.error("Error executing code:", error)
//       io.to(roomId).emit("execution-result", `Error: ${error.message}`)
//     }
//   })
// })

// // Default route
// app.get("/", (req, res) => {
//   res.send("CodeCollab Server is running")
// })

// // Start the server
// const PORT = process.env.PORT || 5000
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })



const dotenv = require('dotenv')
dotenv.config()

const { Server } = require('socket.io');
const io = new Server(8000, {
  cors: true
})
const http = require('http');
const os = require('os');
const axios = require('axios');

const emailToSocketIdMap = new Map()
const socketIdToEmailMap = new Map()
const roomCodeMap = new Map();

io.on("connection", (socket) => {
  console.log(`User connected`, socket.id)
  socket.on('room:join', (data) => {
    // User joins a room
    const { email, room } = data
    emailToSocketIdMap.set(email, socket.id)
    socketIdToEmailMap.set(socket.id, email)
    socket.join(room)

    // Emit the latest code for the room if it exists
    const latestCode = roomCodeMap.get(room);
    if (latestCode) {
      io.to(socket.id).emit("room:latestCode", { code: latestCode });
    }

    io.to(room).emit('user:joined', { email, id: socket.id })
    io.to(socket.id).emit("room:join", data)
  })

  socket.on('user:call', ({ to, offer }) => {
    console.log("user:call offer", offer); 
    io.to(to).emit('incoming:call', { from: socket.id, offer: offer })
  })

  socket.on('call:accepted', ({ to, ans }) => {
    console.log(`Call accepted by ${socket.id}, sending answer to ${to}`);
    io.to(to).emit('call:accepted', { from: socket.id, ans: ans })
  })

  socket.on('peer:nego:needed', ({ to, offer }) => {
    console.log('peer:nego:needed', offer)
    io.to(to).emit('peer:nego:needed', { from: socket.id, offer: offer })
  })

  socket.on('peer:nego:done', ({ to, ans }) => {
    console.log('peer:nego:done', ans)
    io.to(to).emit('peer:nego:final', { from: socket.id, ans: JSON.stringify(ans) })
  })

  socket.on('code-change', ({ roomid, code }) => {
    roomCodeMap.set(roomid, code); // Update the code for the room
    io.to(roomid).emit('code-change', code); // Broadcast the change
  });

  socket.on('language-change', ({ roomid, language }) => {
    io.to(roomid).emit('language-change', language); // Broadcast the change
  });

  socket.on("output-change", ({ roomid, output}) => {
    io.to(roomid).emit("output-change", output)
  })

  socket.on('run-code', async (roomid, { code, language }) => {
    try {
      // Store the latest code for the room
      roomCodeMap.set(roomid, code);
      // Call your execution API
      const response = await executeCode(code, language)
      console.log(response)
      // Send result back to all clients in the room
      io.to(roomid).emit('execution-result', response);
    } catch (error) {
      io.to(roomid).emit('execution-result', `Error: ${error.message}`);
    }
  });

  socket.on('disconnect', () => {
    const email = socketIdToEmailMap.get(socket.id);
    if (email) {
      emailToSocketIdMap.delete(email);
      socketIdToEmailMap.delete(socket.id);
    }
  });
})


async function executeCode(code, language) {
  if (!language) {
    throw new Error("Unsupported language");
  }

  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: {
      base64_encoded: 'false',
      wait: 'false',
      fields: '*'
    },
    headers: {
      'x-rapidapi-key': process.env.JUDGE0_API_KEY,
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      source_code: code,
      language_id: language,
      stdin: '',
    }
    
  };

  try {
    const response = await axios.request(options);
    return fetchResult(response.data.token);
  } catch (error) {
    console.error(error);
  }
}

async function fetchResult(token) {
  const options = {
    method: 'GET',
    url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
    params: {
      base64_encoded: 'false',
      fields: '*'
    },
    headers: {
      'x-rapidapi-key': process.env.JUDGE0_API_KEY,
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.stdout;
  } catch (error) {
    console.error(error);
  }
}


// const express = require("express")
// const http = require("http")
// const { Server } = require("socket.io")
// const cors = require("cors")
// const { ExpressPeerServer } = require("peer")
// const axios = require("axios")
// const dotenv = require("dotenv")

// // Load environment variables
// dotenv.config()

// const app = express()
// const server = http.createServer(app)

// // Configure CORS
// app.use(cors())
// app.use(express.json())

// // Set up Socket.io
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// })

// // Set up PeerJS server
// const peerServer = ExpressPeerServer(server, {
//   debug: true,
//   path: "/peerjs",
// })

// app.use("/peerjs", peerServer)

// // Judge0 API configuration
// const JUDGE0_API = process.env.JUDGE0_API || "https://judge0-ce.p.rapidapi.com"
// const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY
// const JUDGE0_API_HOST = process.env.JUDGE0_API_HOST || "judge0-ce.p.rapidapi.com"

// // Language ID mapping for Judge0
// const LANGUAGE_ID_MAP = {
//   javascript: 63, // Node.js
//   python: 71, // Python 3
//   cpp: 54, // C++ (GCC 9.2.0)
//   java: 62, // Java (OpenJDK 13.0.1)
// }

// // Socket.io connection handling
// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id)

//   // Join a room
//   socket.on("join-room", (roomId, userId, username) => {
//     socket.join(roomId)
//     socket.to(roomId).emit("user-connected", userId, username)

//     console.log(`User ${username} (${userId}) joined room ${roomId}`)

//     // Handle disconnection
//     socket.on("disconnect", () => {
//       socket.to(roomId).emit("user-disconnected", userId)
//       console.log(`User ${username} (${userId}) left room ${roomId}`)
//     })
//   })

//   // Handle code changes
//   socket.on("code-change", (roomId, code) => {
//     socket.to(roomId).emit("code-change", code)
//   })

//   // Handle language changes
//   socket.on("language-change", (roomId, language) => {
//     socket.to(roomId).emit("language-change", language)
//   })

//   // Handle code execution
//   socket.on("run-code", async (roomId, { code, language }) => {
//     try {
//       const languageId = LANGUAGE_ID_MAP[language]

//       if (!languageId) {
//         throw new Error(`Unsupported language: ${language}`)
//       }

//       // Create submission
//       const createResponse = await axios({
//         method: "POST",
//         url: `${JUDGE0_API}/submissions`,
//         params: { base64_encoded: "false", wait: "false" },
//         headers: {
//           "content-type": "application/json",
//           "X-RapidAPI-Key": JUDGE0_API_KEY,
//           "X-RapidAPI-Host": JUDGE0_API_HOST,
//         },
//         data: {
//           source_code: code,
//           language_id: languageId,
//           stdin: "",
//         },
//       })

//       const token = createResponse.data.token

//       // Poll for results
//       let result = null
//       let attempts = 0
//       const maxAttempts = 10

//       while (!result && attempts < maxAttempts) {
//         await new Promise((resolve) => setTimeout(resolve, 1000))

//         const getResponse = await axios({
//           method: "GET",
//           url: `${JUDGE0_API}/submissions/${token}`,
//           params: { base64_encoded: "false" },
//           headers: {
//             "X-RapidAPI-Key": JUDGE0_API_KEY,
//             "X-RapidAPI-Host": JUDGE0_API_HOST,
//           },
//         })

//         if (getResponse.data.status.id > 2) {
//           // If status is not "In Queue" or "Processing"
//           result = getResponse.data
//         }

//         attempts++
//       }

//       if (!result) {
//         throw new Error("Execution timed out")
//       }

//       // Format the output
//       let output = ""

//       if (result.compile_output) {
//         output += `Compilation Error:\n${result.compile_output}\n`
//       }

//       if (result.stdout) {
//         output += result.stdout
//       }

//       if (result.stderr) {
//         output += `\nError:\n${result.stderr}`
//       }

//       if (result.message) {
//         output += `\nMessage:\n${result.message}`
//       }

//       // Send the result back to the room
//       io.to(roomId).emit("execution-result", output || "No output")
//     } catch (error) {
//       console.error("Error executing code:", error)
//       io.to(roomId).emit("execution-result", `Error: ${error.message}`)
//     }
//   })
// })

// // Default route
// app.get("/", (req, res) => {
//   res.send("CodeCollab Server is running")
// })

// // Start the server
// const PORT = process.env.PORT || 5000
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

// // Socket.io server
// const io = new Server(8000, {
//   cors: true
// })

// const emailToSocketIdMap = new Map()
// const socketIdToEmailMap = new Map()
// const roomCodeMap = new Map()

// io.on("connection", (socket) => {
//   console.log(`User connected`, socket.id)
//   socket.on('room:join', (data) => {
//     // User joins a room
//     const { email, room } = data
//     emailToSocketIdMap.set(email, socket.id)
//     socketIdToEmailMap.set(socket.id, email)
//     socket.join(room)

//     // Emit the latest code for the room if it exists
//     const latestCode = roomCodeMap.get(room);
//     if (latestCode) {
//       io.to(socket.id).emit("room:latestCode", { code: latestCode });
//     }

//     io.to(room).emit('user:joined', { email, id: socket.id })
//     io.to(socket.id).emit("room:join", data)
//   })

//   socket.on('user:call', ({ to, offer }) => {
//     io.to(to).emit('incoming:call', { from: socket.id, offer })
//   })

//   socket.on('call:accepted', ({ to, ans }) => {
//     console.log(`Call accepted by ${socket.id}, sending answer to ${to}`);
//     io.to(to).emit('call:accepted', { from: socket.id, ans })
//   })

//   socket.on('peer:nego:needed', ({ to, offer }) => {
//     console.log('peer:nego:needed', offer)
//     io.to(to).emit('peer:nego:needed', { from: socket.id, offer })
//   })

//   socket.on('peer:nego:done', ({ to, ans }) => {
//     console.log('peer:nego:done', ans)
//     io.to(to).emit('peer:nego:final', { from: socket.id, ans })
//   })

//   socket.on('code-change', ({ roomid, code }) => {
//     roomCodeMap.set(roomid, code); // Update the code for the room
//     io.to(roomid).emit('code-change', code); // Broadcast the change
//   });

//   socket.on('language-change', ({ roomid, language }) => {
//     io.to(roomid).emit('language-change', language); // Broadcast the change
//   });

//   socket.on("output-change", ({ roomid, output}) => {
//     io.to(roomid).emit("output-change", output)
//   })

//   socket.on('run-code', async (roomid, { code, language }) => {
//     try {
//       // Store the latest code for the room
//       roomCodeMap.set(roomid, code);
//       // Call your execution API
//       const response = await executeCode(code, language)
//       io.to(roomid).emit('execution-result', response);
//       // Send result back to all clients in the room
//     } catch (error) {
//       io.to(roomid).emit('execution-result', `Error: ${error.message}`);
//     }
//   });

//   socket.on('disconnect', () => {
//     const email = socketIdToEmailMap.get(socket.id);
//     if (email) {
//       emailToSocketIdMap.delete(email);
//       socketIdToEmailMap.delete(socket.id);
//     }
//   });
// })

// async function executeCode(code, language) {
//   if (!language) {
//     throw new Error("Unsupported language");
//   }

//   const options = {
//     method: 'POST',
//     url// const express = require("express")
// const http = require("http")
// const { Server } = require("socket.io")
// const cors = require("cors")
// const { ExpressPeerServer } = require("peer")
// const axios = require("axios")
// const dotenv = require("dotenv")

// // Load environment variables
// dotenv.config()

// const app = express()
// const server = http.createServer(app)

// // Configure CORS
// app.use(cors())
// app.use(express.json())

// // Set up Socket.io
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// })

// // Set up PeerJS server
// const peerServer = ExpressPeerServer(server, {
//   debug: true,
//   path: "/peerjs",
// })

// app.use("/peerjs", peerServer)

// // Judge0 API configuration
// const JUDGE0_API = process.env.JUDGE0_API || "https://judge0-ce.p.rapidapi.com"
// const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY
// const JUDGE0_API_HOST = process.env.JUDGE0_API_HOST || "judge0-ce.p.rapidapi.com"

// // Language ID mapping for Judge0
// const LANGUAGE_ID_MAP = {
//   javascript: 63, // Node.js
//   python: 71, // Python 3
//   cpp: 54, // C++ (GCC 9.2.0)
//   java: 62, // Java (OpenJDK 13.0.1)
// }

// // Socket.io connection handling
// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id)

//   // Join a room
//   socket.on("join-room", (roomId, userId, username) => {
//     socket.join(roomId)
//     socket.to(roomId).emit("user-connected", userId, username)

//     console.log(`User ${username} (${userId}) joined room ${roomId}`)

//     // Handle disconnection
//     socket.on("disconnect", () => {
//       socket.to(roomId).emit("user-disconnected", userId)
//       console.log(`User ${username} (${userId}) left room ${roomId}`)
//     })
//   })

//   // Handle code changes
//   socket.on("code-change", (roomId, code) => {
//     socket.to(roomId).emit("code-change", code)
//   })

//   // Handle language changes
//   socket.on("language-change", (roomId, language) => {
//     socket.to(roomId).emit("language-change", language)
//   })

//   // Handle code execution
//   socket.on("run-code", async (roomId, { code, language }) => {
//     try {
//       const languageId = LANGUAGE_ID_MAP[language]

//       if (!languageId) {
//         throw new Error(`Unsupported language: ${language}`)
//       }

//       // Create submission
//       const createResponse = await axios({
//         method: "POST",
//         url: `${JUDGE0_API}/submissions`,
//         params: { base64_encoded: "false", wait: "false" },
//         headers: {
//           "content-type": "application/json",
//           "X-RapidAPI-Key": JUDGE0_API_KEY,
//           "X-RapidAPI-Host": JUDGE0_API_HOST,
//         },
//         data: {
//           source_code: code,
//           language_id: languageId,
//           stdin: "",
//         },
//       })

//       const token = createResponse.data.token

//       // Poll for results
//       let result = null
//       let attempts = 0
//       const maxAttempts = 10

//       while (!result && attempts < maxAttempts) {
//         await new Promise((resolve) => setTimeout(resolve, 1000))

//         const getResponse = await axios({
//           method: "GET",
//           url: `${JUDGE0_API}/submissions/${token}`,
//           params: { base64_encoded: "false" },
//           headers: {
//             "X-RapidAPI-Key": JUDGE0_API_KEY,
//             "X-RapidAPI-Host": JUDGE0_API_HOST,
//           },
//         })

//         if (getResponse.data.status.id > 2) {
//           // If status is not "In Queue" or "Processing"
//           result = getResponse.data
//         }

//         attempts++
//       }

//       if (!result) {
//         throw new Error("Execution timed out")
//       }

//       // Format the output
//       let output = ""

//       if (result.compile_output) {
//         output += `Compilation Error:\n${result.compile_output}\n`
//       }

//       if (result.stdout) {
//         output += result.stdout
//       }

//       if (result.stderr) {
//         output += `\nError:\n${result.stderr}`
//       }

//       if (result.message) {
//         output += `\nMessage:\n${result.message}`
//       }

//       // Send the result back to the room
//       io.to(roomId).emit("execution-result", output || "No output")
//     } catch (error) {
//       console.error("Error executing code:", error)
//       io.to(roomId).emit("execution-result", `Error: ${error.message}`)
//     }
//   })
// })

// // Default route
// app.get("/", (req, res) => {
//   res.send("CodeCollab Server is running")
// })

// // Start the server
// const PORT = process.env.PORT || 5000
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

// // Socket.io server
// const io = new Server(8000, {
//   cors: true
// })

// const emailToSocketIdMap = new Map()
// const socketIdToEmailMap = new Map()
// const roomCodeMap = new Map()

// io.on("connection", (socket) => {
//   console.log(`User connected`, socket.id)
//   socket.on('room:join', (data) => {
//     // User joins a room
//     const { email, room } = data
//     emailToSocketIdMap.set(email, socket.id)
//     socketIdToEmailMap.set(socket.id, email)
//     socket.join(room)

//     // Emit the latest code for the room if it exists
//     const latestCode = roomCodeMap.get(room);
//     if (latestCode) {
//       io.to(socket.id).emit("room:latestCode", { code: latestCode });
//     }

//     io.to(room).emit('user:joined', { email, id: socket.id })
//     io.to(socket.id).emit("room:join", data)
//   })

//   socket.on('user:call', ({ to, offer }) => {
//     io.to(to).emit('incoming:call', { from: socket.id, offer })
//   })

//   socket.on('call:accepted', ({ to, ans }) => {
//     console.log(`Call accepted by ${socket.id}, sending answer to ${to}`);
//     io.to(to).emit('call:accepted', { from: socket.id, ans })
//   })

//   socket.on('peer:nego:needed', ({ to, offer }) => {
//     console.log('peer:nego:needed', offer)
//     io.to(to).emit('peer:nego:needed', { from: socket.id, offer })
//   })

//   socket.on('peer:nego:done', ({ to, ans }) => {
//     console.log('peer:nego:done', ans)
//     io.to(to).emit('peer:nego:final', { from: socket.id, ans })
//   })

//   socket.on('code-change', ({ roomid, code }) => {
//     roomCodeMap.set(roomid, code); // Update the code for the room
//     io.to(roomid).emit('code-change', code); // Broadcast the change
//   });

//   socket.on('language-change', ({ roomid, language }) => {
//     io.to(roomid).emit('language-change', language); // Broadcast the change
//   });

//   socket.on("output-change", ({ roomid, output}) => {
//     io.to(roomid).emit("output-change", output)
//   })

//   socket.on('run-code', async (roomid, { code, language }) => {
//     try {
//       // Store the latest code for the room
//       roomCodeMap.set(roomid, code);
//       // Call your execution API
//       const response = await executeCode(code, language)
//       io.to(roomid).emit('execution-result', response);
//       // Send result back to all clients in the room
//     } catch (error) {
//       io.to(roomid).emit('execution-result', `Error: ${error.message}`);
//     }
//   });

//   socket.on('disconnect', () => {
//     const email = socketIdToEmailMap.get(socket.id);
//     if (email) {
//       emailToSocketIdMap.delete(email);
//       socketIdToEmailMap.delete(socket.id);
//     }
//   });
// })

// async function executeCode(code, language) {
//   if (!language) {
//     throw new Error("Unsupported language");
//   }

//   const options = {
//     method: 'POST',
//     url
// fetchDatas();


// import axios from 'axios';

// const API_HOST = 'judge0-ce.p.rapidapi.com';
// const API_KEY = '1a7014c87fmshe9bc420d45465f3p1e1e25jsn6456d4e269e1'; // Keep this secret!

// async function submitCode() {
//     try {
//         const submissionResponse = await axios.post(
//             `https://${API_HOST}/submissions`,
//             {
//                 source_code: 'print("Hello, World!")',
//                 language_id: 71, // Python 3
//                 stdin: ''
//             },
//             {
//                 params: { base64_encoded: 'false', wait: 'false', fields: '*' },
//                 headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': API_HOST }
//             }
//         );

//         const token = submissionResponse.data.token;
//         console.log(`Submission Token: ${token}`);

//         if (token) {
//             setTimeout(() => fetchResult(token), 3000); // Wait 3 seconds before fetching results
//         } else {
//             console.error('Failed to get submission token');
//         }
//     } catch (error) {
//         console.error('Error submitting code:', error);
//     }
// }

// async function fetchResult(token) {
//     try {
//         const resultResponse = await axios.get(
//             `https://${API_HOST}/submissions/${token}`,
//             {
//                 params: { base64_encoded: 'false', fields: '*' },
//                 headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': API_HOST }
//             }
//         );

//         console.log('Execution Result:', resultResponse.data);

//         // Handle possible statuses
//         if (resultResponse.data.status.id !== 3) {
//             console.error(`Execution failed: ${resultResponse.data.status.description}`);
//         } else {
//             console.log(`Output: ${resultResponse.data.stdout}`);
//         }
//     } catch (error) {
//         console.error('Error fetching execution result:', error);
//     }
// }

// submitCode();


// function getLocalIP() {
//   const interfaces = os.networkInterfaces();
//   for (const interfaceName in interfaces) {
//     const interfaceInfo = interfaces[interfaceName];
//     for (const info of interfaceInfo) {
//       if (info.family === 'IPv4' && !info.internal) {
//         return info.address;
//       }
//     }
//   }
//   return '127.0.0.1'; // Default to localhost if no external IP is found
// }

// const localIP = getLocalIP();
// const port = 8000;

// const httpServer = http.createServer(); // Create a regular http server.
// const io = new Server(httpServer, {
//   cors: {
//     origin: '*', // Be cautious with '*' in production.
//   },
// });

// // io.on('connection', (socket) => {
// //   console.log(`User connected`, socket.id);
// //   // ... your existing Socket.IO logic ...
// // });

// httpServer.listen(port, localIP, () => {
//   console.log(`Socket.IO server listening on ${localIP}:${port}`);
// });
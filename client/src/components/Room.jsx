"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Editor from "../components/Editor";
import VideoCall from "../components/VideoCall";
import LanguageSelector from "../components/LanguageSelector";
import OutputPanel from "../components/OutputPanel";
import { languages } from "../utils/languages";

import { useSocket } from "../context/SocketProvider";
import ReactPlayer from "react-player";
import peer from "../service/peer";

const Room = () => {
  const { roomid } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "John Doe";

  const [peerId, setPeerId] = useState("");
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [code, setCode] = useState("// Start coding here...");
  const [language, setLanguage] = useState(languages[0]);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState();

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const socket = useSocket();

  const codeRef = useRef(code);
  const editorRef = useRef(null);

  const handleUserJoined = useCallback(({ email, id }) => {
    setRemoteSocketId(id);
    console.log(`User ${email} joined the room ${id}`);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncomingCall = useCallback(
    async (from, offer) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call from`, from, ` Offer: `, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    async ({ from, ans }) => {
      console.log(`Call accepted by: ${from}, Answer received:`, ans);
      await peer.setLocalDescription(ans);
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  const handleNegoNeedIncoming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  // Toggle audio
  const toggleAudio = useCallback(() => {
    if (myStream) {
      myStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  }, [myStream, isMuted]);

  // Toggle video
  const toggleVideo = useCallback(() => {
    if (myStream) {
      myStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  }, [myStream, isVideoOff]);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      console.log("Received remote track:", ev.streams);
      if (ev.streams && ev.streams[0]) {
        setRemoteStream(ev.streams[0]); // Fix the way we set remote stream
      }
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncoming);
    socket.on("peer:nego:final", handleNegoFinal);
    socket.on("room:latestCode", ({ code }) => {
      setCode(code);
    });

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncoming);
      socket.off("peer:nego:final", handleNegoFinal);
      socket.off("room:latestCode");
    };
    // Initialize PeerJS
    // const newPeer = new Peer(undefined, {
    //   host: "localhost",
    //   port: 5173,
    //   path: "/peerjs",
    // });

    // newPeer.on("open", (id) => {
    //   setPeerId(id);
    //   newSocket.emit("join-room", roomId, id, username);
    // });

    // setPeer(newPeer);

    // return () => {
    //   newSocket.disconnect();
    //   newPeer.destroy();
    // };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeedIncoming,
    handleNegoFinal,
  ]);

  // Handle socket events
  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("room:join", { room: roomid, email: username }); // Join room on connect
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("user-connected", (userId, userName) => {
      setRemoteUsers((prev) => [...prev, { id: userId, name: userName }]);
    });

    socket.on("user-disconnected", (userId) => {
      setRemoteUsers((prev) => prev.filter((user) => user.id !== userId));
    });

    socket.on("code-change", (newCode) => {
      setCode(newCode);
    });

    socket.on("language-change", (newLanguage) => {
      setLanguage(newLanguage);
      if (editorRef.current && editorRef.current.getEditor()) {
        const model = editorRef.current.getEditor().getModel();
        monaco.editor.setModelLanguage(model, newLanguage.value);
      }
    });

    socket.on("execution-result", (result) => {
      setOutput(result);
      setIsRunning(false);
      socket?.emit("output-change", { roomid, output: result }); // reflect output change
    });

    socket.on("output-change", (output) => {
      setOutput(output);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("user-connected");
      socket.off("user-disconnected");
      socket.off("code-change");
      socket.off("language-change");
      socket.off("execution-result");
      socket.off("output-change");
    };
  }, [socket, roomid, username, editorRef]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket?.emit("code-change", { roomid, code: newCode });
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    socket?.emit("language-change", { roomid, language: newLanguage });
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput("Running code...");
    socket?.emit("run-code", roomid, { code, language: language.id });
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomid);
    alert("Room ID copied to clipboard!");
  };

  const leaveRoom = () => {
    navigate("/");
  };
  
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);

  return (
    <div className="flex flex-col h-screen bg-[#343a40]">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-black border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-white">Intervue.io</h1>
          <div className="flex items-center px-3 py-1 space-x-2 bg-[#343a40] rounded-md">
            <span className="text-sm text-gray-300">Room:</span>
            <span className="text-sm font-medium text-white">{roomid}</span>
            <button
              onClick={copyRoomId}
              className="p-1 text-gray-400 hover:text-white"
              title="Copy Room ID"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center px-3 py-1 space-x-2 bg-[#343a40] rounded-md">
            <span className="text-sm text-gray-300">Status:</span>
            <span
              className={`text-sm font-medium ${
                remoteSocketId ? "text-green-400" : "text-red-400"
              }`}
            >
              {remoteSocketId ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-300">
            {remoteSocketId ? "Connected" : `No one else is here`}
          </span>
          <button
            onClick={() => {
              leaveRoom();
              if (parsedUser.role === "interviewer") {
                setTimeout(() => {
                  navigate("/candidate-report");
                }, 1);
              } else {
                navigate('/profile/candidate')
              }
            }}
            className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Leave Room
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Video Call */}
        <div className="w-1/4 p-4 overflow-y-auto bg-[#343a40] border-r border-gray-700 text-white">
          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-semibold text-white">Video Call</h2>

            {/* Call Controls */}
            <div className="flex items-center justify-center space-x-2 mb-4">
              {remoteSocketId && (
                <button
                  onClick={handleCallUser}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Start Call
                </button>
              )}
              {myStream && (
                <button
                  onClick={sendStreams}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Share Video
                </button>
              )}
            </div>

            {/* My Stream */}
            {myStream && (
              <div className="relative rounded-lg overflow-hidden shadow-lg bg-black">
                <div className="aspect-video">
                  <ReactPlayer
                    playing
                    muted
                    width="100%"
                    height="100%"
                    url={myStream}
                    className="absolute top-0 left-0"
                  />
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-1 text-xs font-medium text-white bg-black bg-opacity-50 rounded">
                  You ({username})
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-2 right-2 flex space-x-2">
                  <button
                    onClick={toggleAudio}
                    className={`p-2 rounded-full ${
                      isMuted ? "bg-red-600" : "bg-gray-700"
                    }`}
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={toggleVideo}
                    className={`p-2 rounded-full ${
                      isVideoOff ? "bg-red-600" : "bg-gray-700"
                    }`}
                    title={isVideoOff ? "Turn on camera" : "Turn off camera"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Remote Stream */}
            {remoteStream && (
              <div className="relative rounded-lg overflow-hidden shadow-lg bg-black mt-4">
                <div className="aspect-video">
                  <ReactPlayer
                    playing
                    width="100%"
                    height="100%"
                    url={remoteStream}
                    className="absolute top-0 left-0"
                  />
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-1 text-xs font-medium text-white bg-black bg-opacity-50 rounded">
                  Remote User
                </div>
              </div>
            )}

            {!myStream && !remoteStream && (
              <div className="flex items-center justify-center h-40 bg-[#495057] rounded-lg border border-gray-600">
                <p className="text-gray-400">No video streams available</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor and Output */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Editor Controls */}
          <div className="flex text-white items-center justify-between p-4 bg-[#495057] border-b border-gray-700">
            <LanguageSelector
              language={language}
              languages={languages}
              onChange={handleLanguageChange}
            />
            <button
              onClick={runCode}
              disabled={isRunning}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                isRunning
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isRunning ? "Running..." : "Run Code"}
            </button>
          </div>

          {/* Editor and Output */}
          <div className="flex flex-1 overflow-hidden">
            <div className="w-2/3 overflow-hidden border-r border-gray-700">
              <Editor
                code={code}
                language={language.value}
                onChange={handleCodeChange}
                editorRef={editorRef}
              />
            </div>
            <div className="w-1/3 overflow-hidden">
              <OutputPanel output={output} isRunning={isRunning} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;

// <div className="flex flex-col flex-1 overflow-hidden">
//           {/* Editor Controls */}
//           <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
//             <LanguageSelector
//               language={language}
//               languages={languages}
//               onChange={handleLanguageChange}
//             />
//             <button
//               onClick={runCode}
//               disabled={isRunning}
//               className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
//                 isRunning
//                   ? "bg-gray-600 cursor-not-allowed"
//                   : "bg-green-600 hover:bg-green-700"
//               }`}
//             >
//               {isRunning ? "Running..." : "Run Code"}
//             </button>
//           </div>

//           {/* Editor and Output */}
//           <div className="flex flex-1 overflow-hidden">
//             <div className="w-2/3 overflow-hidden border-r border-gray-700">
//               <Editor
//                 code={code}
//                 language={language.value}
//                 onChange={handleCodeChange}
//               />
//             </div>
//             <div className="w-1/3 overflow-hidden">
//               <OutputPanel output={output} isRunning={isRunning} />
//             </div>
//           </div>
//         </div>

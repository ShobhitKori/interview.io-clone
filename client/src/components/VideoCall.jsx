"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { v4 as uuidv4 } from "uuid";
import { parse } from "postcss";

export default function VideoCall() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const videoRef = useRef(null);

  // Initialize video stream
  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    initializeMedia();
  }, []);

  // Toggle audio
  const toggleAudio = () => {
    setIsMuted(!isMuted);
  };

  // Toggle video
  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
  };

  const [buttonText, setButtonText] = useState("Join Interview");
  const navigate = useNavigate();

  const onInterviewClick = () => {
    setButtonText("Joining...");
    setTimeout(() => {
      navigate("/room/1234");
    }, 2000);
  };

  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  console.log("Socket: ", socket);
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);
  const handleRoomCodeChange = (event) => {
    setRoom(event.target.value);
  };

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      let generatedRoomId = room;
      if (!generatedRoomId) {
        generatedRoomId = uuidv4();
        setRoom(generatedRoomId);
      }
      socket.emit("room:join", {
        email: parsedUser.email,
        room: generatedRoomId,
      });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      console.log(email, room);
      setTimeout(() => {
        navigate(`/room/${room}`);
      }, 2000);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div>
      <div className="form">
        <h1>Lobby</h1>
        {parsedUser.role === "interviewer" && (
          <div>
            <button onClick={handleSubmitForm}>Create Room</button>
          </div>
        )}
        {parsedUser.role === "candidate" && (
          <div>
            Enter a Room Code to join:
            <input
              type="text"
              id="room-code"
              value={room}
              onChange={handleRoomCodeChange}
            />
          <button onClick={handleSubmitForm}>Join Interview</button>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row h-screen bg-black">
        {/* Left side - Video call */}
        <div className="w-full md:w-[40%] p-4 flex flex-col">
          <div className="relative bg-black rounded-lg overflow-hidden flex-grow">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover rounded-lg"
            />

            {/* "You are the first one to join" message */}
            <div className="absolute top-4 left-4 bg-black/50 text-white text-sm px-2 py-1 rounded">
              You are the first one to join
            </div>

            {/* Control buttons */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <button
                onClick={toggleAudio}
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center"
              >
                <Mic className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={toggleVideo}
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center"
              >
                <Video className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Video settings text */}
            <div className="absolute bottom-0 left-0 right-0 text-center text-white text-sm py-2">
              Video and Audio Settings
            </div>
          </div>
        </div>

        {/* Right side - Hiring criteria */}
        <div className="w-full md:w-[60%] bg-white p-6 overflow-y-auto">
          {/* Header with logo and interviewer */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-2xl font-bold">
              Int<span className="text-gray-500">ə</span>rvu
              <span className="text-gray-500">ə</span>
            </div>
          </div>

          {/* Seniority */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Seniority</h3>
            <div className="bg-black text-white px-4 py-2 inline-block">
              Intermediate (1-3 years)
            </div>
          </div>

          {/* Difficulty level */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Difficulty level</h3>
              <a href="#" className="text-xs underline">
                view all difficulty levels
              </a>
            </div>
            <div className="bg-black text-white px-4 py-2 flex justify-between items-center">
              <span>Hard - Ask coding questions</span>
              <a href="#" className="text-xs underline">
                view sample questions
              </a>
            </div>
          </div>

          {/* Question details */}
          <div className="bg-gray-50 p-4 rounded-sm mb-8">
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-1">Boundary conditions</h4>
              <p>3</p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium mb-1">Type of question</h4>
              <p>Hands on with in-depth</p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1">
                Practicality of question
              </h4>
              <p>Issue that can be encountered in real-engineering work</p>
            </div>
          </div>

          {/* Hiring Criteria */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-6">Hiring Criteria</h2>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Skill rubrics (8)</h3>
              <p className="text-sm text-gray-600 mb-4">
                Just quick pulse checks to check if the candidate has knowledge
                of these topics
              </p>

              {/* Browser knowledge */}
              <div className="mb-2">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-black text-white flex items-center justify-center text-xs mr-2">
                    1
                  </div>
                  <span className="font-medium">Browser knowledge</span>
                </div>

                {/* Browser storage */}
                <div className="bg-gray-100 p-3 rounded-sm">
                  <h4 className="font-medium mb-1">Browser storage</h4>
                  <p className="text-sm text-gray-600">
                    Local storage, Session storage, Cookies, Cache etc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 text-white h-16 w-full flex items-center justify-end px-4">
        <div className="text-xs text-gray-400 text-right">
          <p>
            Joining as <span className="text-white ">Interviewer</span>
          </p>
          <p>
            Not Interviewer?{" "}
            <a href="/" className="underline">
              Signout
            </a>
          </p>
        </div>
        <button
          className="ml-4 bg-green-600 text-white px-4 py-1 rounded"
          onClick={handleSubmitForm}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

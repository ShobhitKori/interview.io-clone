"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, Video, MicOff, VideoOff, Users, Calendar, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { v4 as uuidv4 } from "uuid";

export default function VideoCallCandidate() {
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

        // Update tracks based on mute/video state
        if (stream) {
          stream.getAudioTracks().forEach(track => {
            track.enabled = !isMuted;
          });
          stream.getVideoTracks().forEach(track => {
            track.enabled = !isVideoOff;
          });
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    initializeMedia();
  }, []);

  // Toggle audio
  const toggleAudio = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getAudioTracks().forEach(track => {
        track.enabled = !newMutedState;
      });
    }
  };

  // Toggle video
  const toggleVideo = () => {
    const newVideoState = !isVideoOff;
    setIsVideoOff(newVideoState);
    
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getVideoTracks().forEach(track => {
        track.enabled = !newVideoState;
      });
    }
  };

  const [buttonText, setButtonText] = useState("Join Room");
  const [isJoining, setIsJoining] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const candidate = localStorage.getItem("candidate");
  const parsedCandidate = candidate ? JSON.parse(candidate) : { email: "" };
  
  const handleRoomCodeChange = (event) => {
    setRoom(event.target.value);
  };

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      let generatedRoomId = room;
      if (!room.trim()) {
        // Input is empty or contains only whitespace
        alert("Please enter a room code."); // Or display an error message
        return; // Prevent further execution of the function
      }
      setIsJoining(true);
      setButtonText("Joining...");
      socket.emit("room:join", {
        email: parsedCandidate.email,
        room: generatedRoomId,
      });
    },
    [email, room, socket, parsedCandidate]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      console.log(email, room);
      setButtonText("Joining...");

      setTimeout(() => {
        navigate(`/room/${room}`, { state: { username: parsedCandidate.name } });
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

  // Interview tips and platform benefits
  const interviewTips = [
    { icon: <CheckCircle size={18} />, text: "Test your camera and microphone before the interview" },
    { icon: <CheckCircle size={18} />, text: "Find a quiet, well-lit environment" },
    { icon: <CheckCircle size={18} />, text: "Have your resume and notes ready" },
    { icon: <CheckCircle size={18} />, text: "Dress professionally, even for remote interviews" }
  ];

  const platformFeatures = [
    { icon: <Users size={20} />, text: "Seamless video interviews with HD quality" },
    { icon: <Calendar size={20} />, text: "Integrated scheduling and reminders" },
    { icon: <Clock size={20} />, text: "Time-boxed interview sessions" }
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left side - Video call (keeping as is) */}
        <div className="w-full md:w-[40%] p-4 flex flex-col bg-black">
          <div className="relative bg-black rounded-lg overflow-hidden flex-grow">
            {isVideoOff && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="text-center">
                  <VideoOff size={40} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-400">Camera is off</p>
                </div>
              </div>
            )}
            <video
              ref={videoRef}
              autoPlay={true}
              muted
              playsInline
              className="w-full h-full object-cover rounded-lg"
            />

            {/* Control buttons (keeping as is, just updating icons) */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <button
                onClick={toggleAudio}
                className={`w-10 h-10 ${isMuted ? 'bg-red-500' : 'bg-gray-600'} rounded-full flex items-center justify-center`}
              >
                {isMuted ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-white" />}
              </button>
              <button
                onClick={toggleVideo}
                className={`w-10 h-10 ${isVideoOff ? 'bg-red-500' : 'bg-gray-600'} rounded-full flex items-center justify-center`}
              >
                {isVideoOff ? <VideoOff className="w-5 h-5 text-white" /> : <Video className="w-5 h-5 text-white" />}
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Keeping white background and adding content */}
        <div className="w-full md:w-[60%] bg-white p-6 overflow-y-auto">
          {/* Header with logo and interviewer */}
          <div 
            className="h-8 w-32 bg-no-repeat bg-contain pb-20" 
            style={{backgroundImage: "url(https://d2b1cooxpkirg1.cloudfront.net/publicAssets/intervue.svg)"}}
            aria-label="Intervue"
          />

          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold">Lobby</div>
          </div>

          {/* Join Interview Form */}
          <div className="mb-8">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Join Interview
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="room-code"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enter Room Code:
                </label>
                <input
                  type="text"
                  id="room-code"
                  required={true}
                  value={room}
                  onChange={handleRoomCodeChange}
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 outline-none"
                  placeholder="e.g., ABC-123"
                />
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors duration-200 w-full"
                  onClick={handleSubmitForm}
                  disabled={isJoining}
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </div>

          {/* Interview Tips */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Interview Tips</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <ul className="space-y-2">
                {interviewTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-green-600 mt-0.5">{tip.icon}</span>
                    <span className="text-sm text-gray-700">{tip.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Platform Features */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Why Intervue.io?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {platformFeatures.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                    <span className="text-green-600">{feature.icon}</span>
                  </div>
                  <p className="text-sm text-gray-700">{feature.text}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                Intervue.io provides a seamless platform for remote technical interviews with built-in code editors, 
                whiteboarding tools, and AI-assisted evaluation to help companies find the best talent efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer - keeping as is */}
      <div className="bg-black text-white h-16 w-full flex items-center justify-end px-4">
        <div className="text-xs text-gray-400 text-right">
          <p>
            Joining as <span className="text-white">{parsedCandidate.email || 'Candidate'}</span>
          </p>
          <p>
            Not Candidate?{" "}
            <a href="/" className="underline hover:text-green-400">
              Signout
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
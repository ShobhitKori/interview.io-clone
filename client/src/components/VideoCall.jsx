"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, Video, VideoOff, MicOff } from "lucide-react";
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

  const [buttonText, setButtonText] = useState("Create Room and Join");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  console.log("Socket: ", socket);
  const candidate = localStorage.getItem("candidate");
  const parsedCandidate = JSON.parse(candidate);
  const interviewer = localStorage.getItem("interviewer");
  const company = localStorage.getItem("company");
  const parsedInterviewer = JSON.parse(interviewer);

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      let generatedRoomId = room;
      if (!generatedRoomId) {
        generatedRoomId = uuidv4();
        setRoom(generatedRoomId);
      }
      socket.emit("room:join", {
        email: parsedCandidate.email,
        room: generatedRoomId,
      });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      console.log(email, room);
      setButtonText("Joining...");

      setTimeout(() => {
        navigate(`/room/${room}`, { state: { username: parsedInterviewer.name, email: parsedInterviewer.email } });
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

  const [interviewData, setInterviewData] = useState(null);

  const fetchEvaluationCriteria = async () => {
    if (company && parsedInterviewer.role === "interviewer") {
      try {
        const body = {
          interviewer: {
            name: parsedInterviewer.name,
            email: parsedInterviewer.email,
          },
          candidate: {
            name: parsedCandidate.name,
            email: parsedCandidate.email,
          },
        };
        const response = await fetch(
          "http://localhost:5000/interviews/interviewer-candidate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch evaluation criteria.");
        }
        const data = await response.json();
        setInterviewData(data);
      } catch (error) {
        console.error("Error fetching interview data:", error);
      }
    }
  };

  useEffect(() => {
    fetchEvaluationCriteria();
  }, [parsedCandidate, parsedInterviewer, fetchEvaluationCriteria]);

  return (
    <div>
      <div className="flex flex-col md:flex-row h-screen bg-black">
        {/* Left side - Video call */}
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
                className={`w-10 h-10 ${
                  isMuted ? "bg-red-500" : "bg-gray-600"
                } rounded-full flex items-center justify-center`}
              >
                {isMuted ? (
                  <MicOff className="w-5 h-5 text-white" />
                ) : (
                  <Mic className="w-5 h-5 text-white" />
                )}
              </button>
              <button
                onClick={toggleVideo}
                className={`w-10 h-10 ${
                  isVideoOff ? "bg-red-500" : "bg-gray-600"
                } rounded-full flex items-center justify-center`}
              >
                {isVideoOff ? (
                  <VideoOff className="w-5 h-5 text-white" />
                ) : (
                  <Video className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Hiring criteria */}
        <div className="w-full md:w-[60%] bg-white p-6 overflow-y-auto">
          {/* Header with logo and interviewer */}
          <div
            className="h-8 w-32 bg-no-repeat bg-contain pb-10"
            style={{
              backgroundImage:
                "url(https://d2b1cooxpkirg1.cloudfront.net/publicAssets/intervue.svg)",
            }}
            aria-label="Intervue"
          />

          <div className="flex justify-between items-center mb-8">
            <div className="text-2xl font-bold">Lobby</div>
          </div>

          <div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Role</h3>
              </div>
              <div className="bg-black text-white px-4 py-2 flex justify-between items-center">
                <span>{interviewData && interviewData.role}</span>{" "}
              </div>
            </div>

            {/* Hiring Criteria */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-6">Hiring Criteria</h2>

              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Skill rubrics</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Just quick pulse checks to check if the candidate has
                  knowledge of these topics
                </p>

                {interviewData && interviewData.evaluationCriteria && (
                  <>
                    {Object.entries(interviewData.evaluationCriteria).map(
                      ([key, value], index) => {
                        if (value) {
                          let criteriaDescription = "";
                          let criteriaTitle = "";

                          switch (key) {
                            case "browserStorage":
                              criteriaTitle = "Browser knowledge";
                              criteriaDescription =
                                "Local storage, Session storage, Cookies, Cache etc.";
                              break;
                            case "functionallyCorrect":
                              criteriaTitle = "Functionally Correct";
                              criteriaDescription =
                                "Code produces the expected output.";
                              break;
                            case "performant":
                              criteriaTitle = "Performance";
                              criteriaDescription =
                                "Efficient code execution and resource usage.";
                              break;
                            case "pseudoCode":
                              criteriaTitle = "Pseudo Code";
                              criteriaDescription =
                                "Logical steps before actual coding.";
                              break;
                            case "cornerCases":
                              criteriaTitle = "Corner Cases";
                              criteriaDescription =
                                "Handling edge cases and unexpected inputs.";
                              break;
                            case "dataStructures":
                              criteriaTitle = "Data Structures";
                              criteriaDescription =
                                "Knowledge and application of data structures.";
                              break;
                            case "htmlCssBasic":
                              criteriaTitle = "HTML/CSS Basics";
                              criteriaDescription =
                                "Understanding of fundamental HTML and CSS.";
                              break;
                            case "htmlCssResponsive":
                              criteriaTitle = "HTML/CSS Responsiveness";
                              criteriaDescription =
                                "Creating responsive and adaptable layouts.";
                              break;
                            case "js":
                              criteriaTitle = "JavaScript";
                              criteriaDescription =
                                "Proficiency in JavaScript concepts.";
                              break;
                            default:
                              criteriaTitle = key; // Use the key if no specific description is found
                              criteriaDescription = "No description available.";
                          }

                          return (
                            <div className="mb-2" key={key}>
                              <div className="flex items-center mb-2">
                                <div className="w-6 h-6 bg-black text-white flex items-center justify-center text-xs mr-2">
                                  {index + 1}
                                </div>
                                <span className="font-medium">
                                  {criteriaTitle}
                                </span>
                              </div>

                              <div className="bg-gray-100 p-3 rounded-sm">
                                <h4 className="font-medium mb-1">
                                  {criteriaTitle}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {criteriaDescription}
                                </p>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black text-white h-16 w-full flex items-center justify-end px-4">
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

        {parsedInterviewer.role === "interviewer" && (
          <div>
            <button
              className="ml-4 bg-green-600 text-white px-4 py-1 rounded"
              onClick={handleSubmitForm}
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

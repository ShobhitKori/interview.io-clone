"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const company = JSON.parse(localStorage.getItem("company"));

const candidate = JSON.parse(localStorage.getItem("candidate"));

const interviewer = JSON.parse(localStorage.getItem("interviewer"));

const CandidateReport = () => {
  const [formData, setFormData] = useState({
    browserStorage: 0,
    functionallyCorrect: 0,
    performant: 0,
    pseudoCode: 0,
    cornerCases: 0,
    dataStructures: 0,
    htmlCssBasic: 0,
    htmlCssResponsive: 0,
    js: 0,
    finalSuggestion: "",
    feedback: "",
    business: {
      name: company.name,
      email: company.email,
    },
    candidate: {
      name: candidate.name,
      email: candidate.email,
    },
    interviewer: {
      name: interviewer.name,
      email: interviewer.email,
    },
  });

  const navigate = useNavigate();
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("candidateReport");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleRatingChange = (category, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      browserStorage: 0,
      functionallyCorrect: 0,
      performant: 0,
      pseudoCode: 0,
      cornerCases: 0,
      dataStructures: 0,
      htmlCssBasic: 0,
      htmlCssResponsive: 0,
      js: 0,
      finalSuggestion: "",
      feedback: "",
    });
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);

  const submitReport = async (event) => {
    console.log("FORM DATA", formData);
    event.preventDefault();
    // Validation
    let isValid = true;
    let errorMessage = "";

    // Check star ratings (assuming all are required)
    const ratingKeys = Object.keys(formData).filter(
      (key) =>
        !["feedback", "business", "candidate", "finalSuggestion"].includes(key)
    );
    for (const key of ratingKeys) {
      if (!formData[key] || formData[key] === 0) {
        isValid = false;
        errorMessage = "Please provide ratings for all performance. ";
        break;
      }
    }
    // Check finalSuggestion
    if (!formData.finalSuggestion) {
      isValid = false;
      errorMessage += "Please select a final suggestion.";
    }
    setIsFormValid(isValid);

    if (!isValid) {
      setErrorMessage(errorMessage); // error display
      return; // Prevent submission
    }
    setErrorMessage("");
    try {
      const response = await fetch("http://localhost:5000/report/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add data.");
      }
      console.log("Data added successfully.");
      console.log("RESPONSE:", response.json());
      //reset the form.
      handleReset();
    } catch (error) {
      console.error("Error adding data:", error);
    }
    toast.success("Report submitted Successfully");
    setTimeout(() => {

      navigate("/profile/interviewer");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">
            Candidate Performance Report
          </h1>
        </div>
        <ToastContainer />
        <form onSubmit={submitReport} className="px-6 py-4 space-y-6">
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-700">
              Performance Ratings
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(formData)
                .filter(
                  ([key]) =>
                    ![
                      "finalSuggestion",
                      "feedback",
                      "business",
                      "candidate",
                    ].includes(key)
                )
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <label className="text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </label>
                    <StarRating
                      rating={value}
                      onRatingChange={(newRating) =>
                        handleRatingChange(key, newRating)
                      }
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-700">
              Final Evaluation
            </h2>

            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Final Suggestion:
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="finalSuggestion"
                    value="Hire"
                    checked={formData.finalSuggestion === "Hire"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">Hire</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="finalSuggestion"
                    value="NotHire"
                    checked={formData.finalSuggestion === "NotHire"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">Not Hire</span>
                </label>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <label
                htmlFor="feedback"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Feedback:
              </label>
              <textarea
                id="feedback"
                name="feedback"
                rows={4}
                value={formData.feedback}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Provide detailed feedback about the candidate..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateReport;

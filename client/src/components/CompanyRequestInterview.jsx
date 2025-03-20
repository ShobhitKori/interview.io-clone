"use client";

import { useState } from "react";
import {
  Cloud,
  Plus,
  Check,
  Search,
  ChevronRight,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyRequestInterview = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("roles");
  const [open, setOpen] = useState(false);

  const roles = [
    { title: "Devops Engineer", candidates: 0 },
    { title: "Fullstack Developer", candidates: 0 },
    { title: "Fullstack engineer (3-6 years)", candidates: 0 },
    { title: "Java Developer", candidates: 0 },
    { title: "FullStack Developer", candidates: 0 },
  ];

  const rolesLevel = [
    { title: "Frontend Developer", level: "Mid-senior (3-5 yrs)" },
    { title: "Backend Java", level: "Senior (5-8 yrs)" },
    {
      title: "Fullstack Developer for enParadigm",
      level: "Mid-senior (3-5 yrs)",
    },
    { title: "DevOps Engineer", level: "Mid-senior (3-5 yrs)" },
  ];

  const Icon = ({ d }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );

  const icons = {
    chevronLeft: "M15 18l-6-6 6-6",
    chevronRight: "M9 18l6-6-6-6",
    camera:
      "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z",
    users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2",
    home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    fileQuestion:
      "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",
    barChart: "M18 20V10M12 20V4M6 20v-6",
    search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    moreVertical:
      "M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  };

  const user = JSON.parse(
    localStorage.getItem("user") || '{"name":"User","email":"user@example.com"}'
  );

  const [interviewData, setInterviewData] = useState([]);
  const RequestPanel = () => {
    const [csvModalOpen, setCsvModalOpen] = useState(false);
    const [manualModalOpen, setManualModalOpen] = useState(false);
    const [interviewerSelectionOpen, setInterviewerSelectionOpen] =
      useState(false);
    const [candidateData, setCandidateData] = useState({
      name: "",
      email: "",
      phoneNumber: "",
      timezone: "",
    });

    const [formData, setFormData] = useState({
      role: "",
      round: "",
      business: {
        name: user.name,
        email: user.email,
      },
      candidate: {
        name: "",
        email: "",
        phone: "",
        timeZone: "",
      },
      interviewer: {
        name: "",
        email: "",
      },
      evaluationCriteria: {
        browserStorage: false,
        functionallyCorrect: false,
        performant: false,
        pseudoCode: false,
        cornerCases: false,
        dataStructures: false,
        htmlCssBasic: false,
        htmlCssResponsive: false,
        js: false,
      },
      interviewSchedule: {
        date: "",
        time: "",
        duration: "60", // Default duration
      },
    });

    const [availableInterviewers, setAvailableInterviewers] = useState([]);
    const [selectedInterviewer, setSelectedInterviewer] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      console.log("File selected:", file);
      setCsvModalOpen(false);
    };

    const handleInputChange = (e) => {
      setCandidateData({ ...candidateData, [e.target.name]: e.target.value });
    };

    const handleSelectInterviewer = (interviewer) => {
      setSelectedInterviewer(interviewer);
      setFormData((prevFormData) => ({
        ...prevFormData,
        interviewer: {
          name: interviewer.name,
          email: interviewer.email,
          _id: interviewer._id, //add id here, for backend purposes.
        },
      }));
    };

    const handleAddCandidate = async () => {
      try {
        const response = await fetch("http://localhost:5000/interviewers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch interviewers.");
        }

        const interviewers = await response.json();
        setAvailableInterviewers(interviewers);
        console.log(interviewers);
        setManualModalOpen(false);
        setInterviewerSelectionOpen(true);
      } catch (error) {
        console.error("Error fetching interviewers:", error);
      }
    };

    const finalizeCandidateAddition = async () => {
      console.log("FORM DATA", formData);
      try {
        const response = await fetch("http://localhost:5000/interviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Send the entire formData object
        });

        if (!response.ok) {
          throw new Error("Failed to add data.");
        }
        console.log("Data added successfully.");
        console.log("RESPONSE:", response.json());
        //reset the form.
        setFormData({
          role: "",
          round: "",
          candidates: {
            name: "",
            email: "",
            phone: "",
            timeZone: "",
          },
          interviewer: {
            name: "",
            email: "",
          },
          evaluationCriteria: {
            browserStorage: false,
            functionallyCorrect: false,
            performant: false,
            pseudoCode: false,
            cornerCases: false,
            dataStructures: false,
            htmlCssBasic: false,
            htmlCssResponsive: false,
            js: false,
          },
          interviewSchedule: {
            date: "",
            time: "",
            duration: "60",
          },
        });
      } catch (error) {
        console.error("Error adding data:", error);
      }
    };
    const timezones = [
      { value: "UTC+05:30", label: "(GMT+05:30) New Delhi, Mumbai" },
      { value: "UTC+00:00", label: "(GMT+00:00) London, Dublin, Edinburgh" },
      { value: "UTC-12:00", label: "(GMT-12:00) International Date Line West" },
      { value: "UTC+04:00", label: "(GMT+04:00) Dubai, Abu Dhabi" },
      { value: "UTC-11:00", label: "(GMT-11:00) Midway Island, Samoa" },
      { value: "UTC-08:00", label: "(GMT-08:00) Pacific Time (US & Canada)" },
    ];

    const nextStep = () => {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    };

    const prevStep = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };

    return (
      <>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent className="w-[400px] p-0 sm:max-w-md">
            <SheetHeader className="p-6 pb-4 border-b">
              <div className="flex items-center gap-2 text-sm">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                >
                  <path
                    d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="font-medium">On-demand</span>
              </div>
              <SheetTitle className="text-sm font-normal text-muted-foreground">
                Schedule
              </SheetTitle>

              {/* Progress indicator */}
              <div className="flex items-center justify-between mt-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step === currentStep
                          ? "bg-primary text-primary-foreground"
                          : step < currentStep
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step < currentStep ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        step
                      )}
                    </div>
                    <span className="text-xs mt-1 text-muted-foreground">
                      {step === 1
                        ? "Role"
                        : step === 2
                        ? "Candidates"
                        : step === 3
                        ? "Skill Rubrics"
                        : "Schedule"}
                    </span>
                  </div>
                ))}
                <div className="absolute left-[calc(16.67%-8px)] right-[calc(16.67%-8px)] h-[2px] top-[29px] bg-muted">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${(currentStep - 1) * 100}%` }}
                  />
                </div>
              </div>
            </SheetHeader>

            <div
              className="p-6 space-y-6 overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              {currentStep === 1 && (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">
                        Select role you are hiring for
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, role: value })
                        }
                      >
                        <SelectTrigger id="role" className="w-full">
                          <SelectValue placeholder="Please select hiring role" />
                        </SelectTrigger>
                        <SelectContent>
                          {rolesLevel.map((role, index) => (
                            <SelectItem key={index} value={role.title}>
                              {role.title} - {role.level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="round">Select round</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, round: value })
                        }
                      >
                        <SelectTrigger id="round" className="w-full">
                          <SelectValue placeholder="Please select round" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="first">First Round</SelectItem>
                          <SelectItem value="second">Second Round</SelectItem>
                          <SelectItem value="final">Final Round</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <Label>Candidates</Label>

                  <Button
                    variant="outline"
                    className="w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
                    onClick={() => setCsvModalOpen(true)}
                  >
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <Cloud className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <span className="text-sm">Upload csv file</span>
                  </Button>

                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-sm text-muted-foreground">OR</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <Button
                    variant="outline"
                    className="w-full h-16 border-2 border-dashed rounded-lg flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
                    onClick={() => setManualModalOpen(true)}
                  >
                    <span className="text-sm">Add candidates manually</span>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <Label>Candidate Evaluation Rubric</Label>
                  <div className="gap-4">
                    {" "}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="browser-storage">Browser Storage</Label>
                        <input
                          type="checkbox"
                          id="browser-storage"
                          checked={formData.evaluationCriteria.browserStorage}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              evaluationCriteria: {
                                ...formData.evaluationCriteria,
                                browserStorage: e.target.checked,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="functionally-correct">
                          Functionally Correct Solution
                        </Label>
                        <input
                          type="checkbox"
                          id="functionally-correct"
                          checked={
                            formData.evaluationCriteria.functionallyCorrect
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              evaluationCriteria: {
                                ...formData.evaluationCriteria,
                                functionallyCorrect: e.target.checked,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="performant">Performant</Label>
                        <input
                          type="checkbox"
                          id="performant"
                          checked={formData.evaluationCriteria.performant}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              evaluationCriteria: {
                                ...formData.evaluationCriteria,
                                performant: e.target.checked,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pseudo-code">
                          Pseudo Code/Logical Thinking
                        </Label>
                        <input
                          type="checkbox"
                          id="pseudo-code"
                          checked={formData.evaluationCriteria.pseudoCode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              evaluationCriteria: {
                                ...formData.evaluationCriteria,
                                pseudoCode: e.target.checked,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="corner-cases">
                          Corner Cases/Error Handling
                        </Label>
                        <input
                          type="checkbox"
                          id="corner-cases"
                          checked={formData.evaluationCriteria.cornerCases}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              evaluationCriteria: {
                                ...formData.evaluationCriteria,
                                cornerCases: e.target.checked,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="data-structures">Data Structures</Label>
                        <input
                          type="checkbox"
                          id="data-structures"
                          checked={formData.evaluationCriteria.dataStructures}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              evaluationCriteria: {
                                ...formData.evaluationCriteria,
                                dataStructures: e.target.checked,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="html-css-basic">
                          HTML/CSS Basic & Advanced
                        </Label>
                        <input
                          type="checkbox"
                          id="html-css-basics"
                          checked={formData.evaluationCriteria.htmlCssBasic}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              evaluationCriteria: {
                                ...formData.evaluationCriteria,
                                htmlCssBasic: e.target.checked,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="html-css-responsive">
                          HTML/CSS Responsive & Grid
                        </Label>
                        <input
                          type="checkbox"
                          id="html-css-responsive"
                          checked={
                            formData.evaluationCriteria.htmlCssResponsive
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              evaluationCriteria: {
                                ...formData.evaluationCriteria,
                                htmlCssResponsive: e.target.checked,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="js">JavaScript Fundamentals</Label>
                        <input
                          type="checkbox"
                          id="js"
                          checked={formData.evaluationCriteria.js}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              evaluationCriteria: {
                                ...formData.evaluationCriteria,
                                js: e.target.checked,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <Label>Schedule Interview</Label>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Select Date</Label>
                      <Input
                        type="date"
                        id="date"
                        className="w-full"
                        value={formData.interviewSchedule.date}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            interviewSchedule: {
                              ...formData.interviewSchedule,
                              date: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Select Time</Label>
                      <Input
                        type="time"
                        id="time"
                        className="w-full"
                        value={formData.interviewSchedule.time}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            interviewSchedule: {
                              ...formData.interviewSchedule,
                              time: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Select
                        defaultValue="60"
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            interviewSchedule: {
                              ...formData.interviewSchedule,
                              duration: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger id="duration" className="w-full">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full py-4 px-6 border-t flex justify-between items-center">
              {currentStep > 1 && (
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
              )}
              {currentStep < totalSteps ? (
                <Button
                  className={`${currentStep > 1 ? "ml-auto" : "w-full"}`}
                  onClick={nextStep}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button
                  className="ml-auto"
                  onClick={() => {
                    finalizeCandidateAddition();
                    setOpen(false);
                    setCurrentStep(1);
                  }}
                >
                  Submit
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* CSV Upload Modal */}
        <Dialog open={csvModalOpen} onOpenChange={setCsvModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload CSV</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <label
                htmlFor="csvFile"
                className="block w-full h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-primary cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <Cloud className="h-8 w-8 mb-2 text-muted-foreground" />
                <span className="text-sm font-medium">Upload CSV file</span>
                <span className="text-xs text-muted-foreground mt-1">
                  Click to browse files
                </span>
              </label>
              <input
                type="file"
                id="csvFile"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />

              <a
                href="/path/to/sample.csv"
                download
                className="block text-center text-sm text-primary hover:underline"
              >
                Download sample csv
              </a>
            </div>
            <DialogFooter className="sm:justify-between">
              <Button variant="outline" onClick={() => setCsvModalOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={() => setCsvModalOpen(false)}>
                Upload
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Manual Candidate Modal */}
        <Dialog open={manualModalOpen} onOpenChange={setManualModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Candidate</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.candidate.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      candidate: {
                        ...formData.candidate,
                        name: e.target.value,
                      },
                    })
                  }
                  placeholder="Enter candidate name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.candidate.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      candidate: {
                        ...formData.candidate,
                        email: e.target.value,
                      },
                    })
                  }
                  placeholder="Enter candidate email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">
                  Phone Number (with country code)
                </Label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.candidate.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      candidate: {
                        ...formData.candidate,
                        phone: e.target.value,
                      },
                    })
                  }
                  placeholder="+1 (123) 456-7890"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={formData.candidate.timeZone}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      candidate: {
                        ...formData.candidate,
                        timeZone: value,
                      },
                    })
                  }
                >
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz, index) => (
                      <SelectItem key={index} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="sm:justify-between">
              <Button
                variant="outline"
                onClick={() => setManualModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleAddCandidate}
                disabled={
                  !formData.candidate.name ||
                  !formData.candidate.email ||
                  !formData.candidate.phone ||
                  !formData.candidate.timeZone
                }
              >
                Check Interviewer Availability
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Interviewer Selection Modal */}
        <Dialog
          open={interviewerSelectionOpen}
          onOpenChange={setInterviewerSelectionOpen}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Select Interviewer</DialogTitle>
            </DialogHeader>
            <div className="py-2">
              <div className="mb-4">
                <Label className="text-sm text-muted-foreground mb-2 block">
                  Available interviewers for {candidateData.name}
                </Label>
                <Input
                  type="text"
                  placeholder="Search interviewers..."
                  className="mb-2"
                />
                <div className="max-h-[300px] overflow-y-auto space-y-2 mt-4">
                  {availableInterviewers.length > 0 ? (
                    availableInterviewers.map((interviewer) => (
                      <Card
                        key={interviewer._id}
                        className={`cursor-pointer transition-colors ${
                          selectedInterviewer &&
                          selectedInterviewer._id === interviewer._id
                            ? "border-primary bg-primary/5"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => handleSelectInterviewer(interviewer)}
                      >
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {interviewer.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{interviewer.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {interviewer.email}
                              </p>
                            </div>
                          </div>
                          {selectedInterviewer &&
                            selectedInterviewer._id === interviewer._id && (
                              <Check className="h-5 w-5 text-primary" />
                            )}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No interviewers available at the moment
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter className="sm:justify-between">
              <Button
                variant="outline"
                onClick={() => setInterviewerSelectionOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => {
                  nextStep();
                  setInterviewerSelectionOpen(false);
                }}
                disabled={!selectedInterviewer}
              >
                Next
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const [activeIndex, setActiveIndex] = useState(1); // Initialize to "On demand" (index 1)
  const companyDetails = {
    name: user.name,
    email: user.email,
  };
  const fetchInterviewData = async () => {
    try {
      const response = await fetch("http://localhost:5000/interviews/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyDetails),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch interview data.");
      }
      const data = await response.json();
      setInterviewData(data);
    } catch (error) {
      console.error("Error fetching interview data:", error);
    }
  };
  const handleInterviewsClick = async (index) => {
    setActiveIndex(index);
    await fetchInterviewData();
  };

  const handleReportsClick = async (index) => {
    setActiveIndex(index);
    await fetchReportData();
  };

  const [reportData, setReportData] = useState([]);
  const companyInfo = {
    name: user.name,
    email: user.email,
  };

  const fetchReportData = async () => {
    try {
      console.log(companyInfo);
      const response = await fetch("http://localhost:5000/report/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyInfo),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch interview data.");
      }
      const data = await response.json();
      setReportData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching interview data:", error);
    }
  };

  const SkillScore = ({ label, value }) => {
    let scoreColor = "text-gray-700"; // Default color

    if (parseInt(value) >= 4) {
      scoreColor = "text-green-600"; // High score
    } else if (parseInt(value) <= 1) {
      scoreColor = "text-red-600"; // Low score
    }

    return (
      <p className={`text-gray-700 ${scoreColor}`}>
        <span className="font-semibold">{label}:</span> {value}
      </p>
    );
  };

  const MainContent = () => (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-white border-r transition-all duration-300 ${
          isSidebarVisible ? "w-60" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex h-14 items-center border-b px-4">
          <span className="text-xl font-semibold">Intervue</span>
          <button
            className="ml-auto p-1 rounded-full hover:bg-gray-100"
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            aria-label={isSidebarVisible ? "Hide sidebar" : "Show sidebar"}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
        <nav className="space-y-1 p-2">
          {[
            { icon: icons.camera, label: "Interviews" },
            { icon: icons.users, label: "On demand" },
            { icon: icons.fileQuestion, label: "Candidate Reports" },
            { icon: icons.home, label: "Home assignments" },
            { icon: icons.barChart, label: "Analytics" },
          ].map(({ icon, label }, index) => (
            <button
              onClick={
                label === "Interviews"
                  ? () => handleInterviewsClick(index)
                  : label === "Candidate Reports"
                  ? () => handleReportsClick(index)
                  : () => setActiveIndex(index)
              }
              key={index}
              className={`w-full flex items-center space-x-2 px-2 py-2 rounded-md ${
                activeIndex === index
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon d={icon} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="user-info border-t p-4 sticky bottom-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="overflow-hidden">
              <p className="font-medium text-sm truncate">
                {user.name || "User"}
              </p>
              <p className="text-gray-500 text-xs truncate">
                {user.email || "user@example.com"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => logOut()}
        className="absolute top-4 right-4 gap-2 text-muted-foreground hover:text-white hover:bg-black"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </Button>

      <ToastContainer />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="flex items-center border-b p-4">
          <button
            className="p-1 rounded-full hover:bg-gray-100 mr-2"
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            aria-label={isSidebarVisible ? "Hide sidebar" : "Show sidebar"}
          >
            {isSidebarVisible ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          <div className="relative max-w-xl flex-1">
            <Input
              type="text"
              placeholder="Search what you are looking for"
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="p-6">
          {activeIndex === 0 ? (
            // Interviews Content
            <div>
              <h1 className="text-2xl font-semibold">Created Interviews</h1>
              {interviewData.length > 0 ? (
                <ul className="space-y-4">
                  {interviewData.map((interview) => (
                    <li
                      key={interview._id}
                      className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
                    >
                      <div className="flex-grow">
                        <p className="text-gray-700">
                          <span className="font-semibold">Candidate:</span>{" "}
                          {interview.candidate.name} (
                          {interview.candidate.email})
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Interviewer:</span>{" "}
                          {interview.interviewer.name} (
                          {interview.interviewer.email})
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Schedule:</span>{" "}
                          {interview.interviewSchedule.date}{" "}
                          {interview.interviewSchedule.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No interview data available.</p>
              )}
            </div>
          ) : activeIndex === 2 ? (
            <div>
              <div>
                <h1 className="text-3xl font-semibold mb-6">
                  Candidate Reports
                </h1>
                {reportData && reportData.length > 0 ? (
                  <ul className="space-y-4">
                    {reportData.map((report) => (
                      <li
                        key={report._id}
                        className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                      >
                        <div className="mb-4">
                          <p className="text-lg font-semibold">
                            Candidate: {report.candidate?.name || "N/A"}
                          </p>
                          <p className="text-gray-600">
                            Interviewer: {report.business?.name || "N/A"}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Skill Scores */}
                          <div>
                            <SkillScore
                              label="Browser Storage"
                              value={report.browserStorage}
                            />
                            <SkillScore
                              label="Functionally Correct"
                              value={report.functionallyCorrect}
                            />
                            <SkillScore
                              label="Performant"
                              value={report.performant}
                            />
                            <SkillScore
                              label="Pseudocode"
                              value={report.pseudoCode}
                            />
                            <SkillScore
                              label="Corner Cases"
                              value={report.cornerCases}
                            />
                          </div>
                          <div>
                            <SkillScore
                              label="Data Structures"
                              value={report.dataStructures}
                            />
                            <SkillScore
                              label="HTML CSS Basics"
                              value={report.htmlCssBasic}
                            />
                            <SkillScore
                              label="HTML CSS Responsive"
                              value={report.htmlCssResponsive}
                            />
                            <SkillScore label="JavaScript" value={report.js} />
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-gray-700">
                            <span className="font-semibold">
                              Final Suggestion:
                            </span>{" "}
                            {report.finalSuggestion}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-semibold">Feedback:</span>{" "}
                            {report.feedback}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-2xl font-semibold text-center mt-8">
                    No Reports available.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-semibold">On demand</h1>
                  <p className="mt-1 text-muted-foreground">
                    Find expert interviewers to take interviews on your behalf •
                    1500+ active interviewers
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="gap-2" onClick={() => setOpen(true)}>
                    <Plus className="h-4 w-4" />
                    Request an interview
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create job role
                  </Button>
                </div>
              </div>

              <div className="mt-8">
                <Tabs defaultValue="roles" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="roles">Roles</TabsTrigger>
                    <TabsTrigger value="templates">Role templates</TabsTrigger>
                  </TabsList>
                  <TabsContent value="roles">
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        Explore roles created by your team
                      </p>

                      <div className="relative mb-6">
                        <Input
                          type="text"
                          placeholder="Search roles..."
                          className="pl-10"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>

                      <div className="grid gap-4">
                        {roles.map((role, index) => (
                          <Card key={index} className="overflow-hidden">
                            <CardContent className="p-0">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4">
                                <div>
                                  <h3 className="font-medium">{role.title}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {role.candidates > 0
                                      ? `${role.candidates} candidates`
                                      : "No candidates"}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  className="text-primary justify-start sm:justify-center mt-2 sm:mt-0 px-0 sm:px-4"
                                  onClick={() => setOpen(true)}
                                >
                                  Request an interview
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="templates">
                    <div className="text-center py-8 text-muted-foreground">
                      No role templates available
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 overflow-auto">
        <MainContent />
      </div>
      <RequestPanel />
    </div>
  );
};

export default CompanyRequestInterview;

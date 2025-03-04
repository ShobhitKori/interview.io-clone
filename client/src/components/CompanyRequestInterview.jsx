import React, { useState } from "react";
import { Cloud, ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
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

const CompanyRequestInterview = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("roles");
  const [isRequestPanelOpen, setIsRequestPanelOpen] = useState(false);
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

  const RequestPanel = () => {
    // const handleRoleSelect = (role) => {
    //   setSelectedRole(role);
    //   setIsRoleListOpen(false);
    // };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      console.log("File selected:", file);
      handleCloseModal();
    };

    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[400px] p-0">
          <SheetHeader className="p-6 pb-4">
            <div className="flex items-center gap-2 text-sm">
              <svg
                width="16"
                height="16"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-600"
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
          </SheetHeader>

          <div className="p-6 pt-2 space-y-6">
            <div className="space-y-2">
              <label className="text-sm">Select role you are hiring for</label>
              <Select>
                <SelectTrigger className="w-full bg-muted">
                  <SelectValue placeholder="Please select hiring role" />
                </SelectTrigger>
                <SelectContent>
                  {rolesLevel.map((role, index) => (
                    <SelectItem value={role.title}>
                      {role.title} - {role.level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm">Select round</label>
              <Select>
                <SelectTrigger className="w-full bg-muted">
                  <SelectValue placeholder="Please select round" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first">First Round</SelectItem>
                  <SelectItem value="second">Second Round</SelectItem>
                  <SelectItem value="final">Final Round</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <label className="text-sm">Candidates</label>

              <button
                className="w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
                onClick={handleOpenModal}
              >
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <Cloud className="w-6 h-6 text-muted-foreground" />
                </div>
                <span className="text-sm">Upload csv file</span>
              </button>

              {isModalOpen && (
                <div
                  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                  onClick={handleCloseModal}
                >
                  <div
                    className="bg-white p-6 rounded-lg shadow-lg w-80 relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                    <h2 className="text-xl font-semibold mb-4">Upload CSV</h2>

                    <label
                      htmlFor="csvFile"
                      className="block w-full h-10 border-2 border-dashed rounded-lg flex items-center justify-center text-blue-500 cursor-pointer hover:bg-gray-100"
                    >
                      Upload CSV file
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
                      className="block mt-4 text-center text-sm text-blue-500 hover:underline"
                    >
                      Download sample csv
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-sm text-muted-foreground">OR</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <button className="w-full h-16 border-2 border-dashed rounded-lg flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors">
                <span className="text-sm">Add candidates manually</span>
                <span className="text-sm text-muted-foreground">+</span>
              </button>
            </div>
          </div>

          <div className="w-full py-4 border-t fixed bottom-0 flex justify-center">
            <button className="w-[350px] flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md">
              Next
              <ChevronDown className="h-4 mt-1 ml-1 rotate-[-90deg]" />
            </button>
          </div>
        </SheetContent>
      </Sheet>
    );
  };

  const MainContent = () => (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white border-r transition-all duration-300 ${
          isSidebarVisible ? "w-60" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex h-14 items-center border-b px-4">
          <span className="text-xl font-semibold">Intervue</span>
          <button
            className="ml-auto p-1 rounded-full hover:bg-gray-200"
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            aria-label={isSidebarVisible ? "Hide sidebar" : "Show sidebar"}
          >
            <Icon d={icons.chevronLeft} />
          </button>
        </div>
        <nav className="space-y-1 p-2">
          {[
            { icon: icons.camera, label: "Interviews" },
            { icon: icons.users, label: "On demand", active: true },
            { icon: icons.home, label: "Home assignments" },
            { icon: icons.fileQuestion, label: "Question bank" },
            { icon: icons.barChart, label: "Analytics" },
          ].map(({ icon, label, active }, index) => (
            <button
              key={index}
              className={`w-full flex items-center space-x-2 px-2 py-2 rounded-md ${
                active ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`}
            >
              <Icon d={icon} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => logOut()}
        className="absolute top-4 right-4 gap-2 text-muted-foreground hover:text-foreground"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </Button>
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <button
          className="m-2 p-1 rounded-full hover:bg-gray-200"
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          aria-label={isSidebarVisible ? "Hide sidebar" : "Show sidebar"}
        >
          <Icon d={isSidebarVisible ? icons.chevronLeft : icons.chevronRight} />
        </button>
        <div className="border-b p-4">
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search what you are looking for"
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
            <Icon
              d={icons.search}
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            />
          </div>
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-semibold">On demand</h1>
          <p className="mt-2 text-gray-600">
            Find expert interviewers to take interviews on your behalf • 1500+
            active interviewers
          </p>

          <div className="mt-6 flex gap-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setOpen(true)}
            >
              + Request an interview
            </button>
            <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
              + Create job role
            </button>
          </div>

          <div className="mt-8">
            <div className="border-b">
              <button
                className={`px-4 py-2 ${
                  activeTab === "roles"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : ""
                }`}
                onClick={() => setActiveTab("roles")}
              >
                Roles
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === "templates"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : ""
                }`}
                onClick={() => setActiveTab("templates")}
              >
                Role templates
              </button>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Explore roles created by your team
              </p>

              <div className="relative mt-4">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
                />
                <Icon
                  d={icons.search}
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                />
              </div>

              <div className="mt-6 space-y-4">
                {roles.map((role, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm"
                  >
                    <div>
                      <h3 className="font-medium">{role.title}</h3>
                      <p className="text-sm text-gray-600">No candidates</p>
                    </div>
                    <div className="flex gap-4">
                      <button
                        className="text-blue-500 px-4 py-2 font-bold"
                        onClick={() => setOpen(true)}
                      >
                        Request an interview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 overflow-auto">
        <MainContent />
      </div>
      <RequestPanel />
      {isRequestPanelOpen && (
        <div
          className="fixed inset-0"
          onClick={() => setIsRequestPanelOpen(false)}
        />
      )}
    </div>
  );
};

export default CompanyRequestInterview;

// PortfolioGenerator.jsx
import React, { useState } from "react";
import { Clipboard, Eye, Download } from "lucide-react";
import axios from 'axios'
const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 rounded-2xl shadow hover:shadow-md transition font-medium border border-gray-200 bg-white ${className}`}
    {...props}
  >
    {children}
  </button>
);
const Input = (props) => (
  <input
    className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
    {...props}
  />
);
const Textarea = (props) => (
  <textarea
    className="w-full p-2 border rounded-lg font-mono resize-none focus:outline-none focus:ring focus:border-blue-300"
    {...props}
  />
);
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-xl ${className}`}>{children}</div>
);
const CardHeader = ({ children }) => (
  <div className="p-4 border-b border-gray-100">{children}</div>
);
const CardTitle = ({ children, className = "" }) => (
  <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>
);
const CardContent = ({ children }) => <div className="p-4">{children}</div>;

export default function App() {
  const [form, setForm] = useState({
    name: "",
    title: "",
    bio: "",
    skills: "",
    email: "",
    github: "",
    linkedin: "",
  });
  const [code, setCode] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const fetchGeneratedCode = async () => {
    // Replace with your actual backend API call
    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.text();
    setCode(data);
  };

  const copyCode = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
  };

  const previewCode = () => {
    if (!code) return;
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const downloadCode = () => {
    if (!code) return;
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Portfolio Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
            <Input name="title" placeholder="Professional Title" value={form.title} onChange={handleChange} />
            <Textarea
              name="bio"
              placeholder="Short bio..."
              rows={3}
              value={form.bio}
              onChange={handleChange}
              className="md:col-span-2"
            />
            <Input
              name="skills"
              placeholder="Skills (comma separated)"
              value={form.skills}
              onChange={handleChange}
              className="md:col-span-2"
            />
            <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <Input name="github" placeholder="GitHub URL" value={form.github} onChange={handleChange} />
            <Input name="linkedin" placeholder="LinkedIn URL" value={form.linkedin} onChange={handleChange} />
          </div>
          <Button onClick={fetchGeneratedCode} className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700">
            Generate Code
          </Button>
        </CardContent>
      </Card>

      {code && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Generated HTML
              <div className="flex space-x-2">
                <Button
                  onClick={copyCode}
                  title="Copy"
                  className="p-2 bg-gray-50 hover:bg-gray-100"
                >
                  <Clipboard className="h-5 w-5" />
                </Button>
                <Button
                  onClick={previewCode}
                  title="Preview"
                  className="p-2 bg-gray-50 hover:bg-gray-100"
                >
                  <Eye className="h-5 w-5" />
                </Button>
                <Button
                  onClick={downloadCode}
                  title="Download"
                  className="p-2 bg-gray-50 hover:bg-gray-100"
                >
                  <Download className="h-5 w-5" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={code} readOnly rows={20} className="h-64" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import axios from 'axios';

const PortfolioForm = () => {
  const [form, setForm] = useState({
    name: '',
    title: '',
    bio: '',
    skills: '',
    email: '',
    github: '',
    linkedin: '',
  });

  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/user/portfolio', form);
      setGeneratedCode(response.data.portfolio);
    } catch (error) {
      console.error("Error generating portfolio:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Generate Portfolio</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'title', 'bio', 'skills', 'email', 'github', 'linkedin'].map((field) => (
          <div key={field}>
            <label className="block mb-1 font-medium capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Portfolio"}
        </button>
      </form>

      {generatedCode && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Generated HTML:</h3>
          <textarea
            className="w-full h-96 p-4 border border-gray-300 rounded-md font-mono"
            value={generatedCode}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default PortfolioForm;

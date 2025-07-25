import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [form, setForm] = useState({
    name: '',
    about: '',
    skills: '',
    projects: '',
    contact: '',
    image: '',
  });

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchGeneratedCode = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/user/portfolio', form);
      setCode(response.data.portfolio); // Assuming backend sends { portfolio: "<html>...</html>" }
    } catch (err) {
      console.error('Error generating portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadHtml = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `${form.name || 'portfolio'}.html`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '1rem' }}>
      <h1>🚀 Portfolio Generator</h1>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <textarea name="about" placeholder="About" value={form.about} onChange={handleChange} />
        <input type="text" name="skills" placeholder="Skills (comma-separated)" value={form.skills} onChange={handleChange} />
        <input type="text" name="projects" placeholder="Projects (comma-separated)" value={form.projects} onChange={handleChange} />
        <input type="text" name="contact" placeholder="Contact Info" value={form.contact} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />

        <button onClick={fetchGeneratedCode} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Portfolio'}
        </button>
      </div>

      {code && (
        <div style={{ marginTop: '2rem' }}>
          <h2>🎉 Generated Portfolio</h2>
          <iframe
            srcDoc={code}
            title="Portfolio Preview"
            style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}
          ></iframe>
          <button onClick={downloadHtml} style={{ marginTop: '1rem' }}>
            ⬇️ Download HTML
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

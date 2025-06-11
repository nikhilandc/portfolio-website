import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';

const ContactEditor: React.FC = () => {
  const { content, updateContact } = useContent();
  const [formData, setFormData] = useState({
    email: content.contact.email,
    phone: content.contact.phone || '',
    linkedin: content.contact.linkedin || '',
    github: content.contact.github || '',
  });
  
  const [saved, setSaved] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact(formData);
    setSaved(true);
    
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };
  
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">Edit Contact Information</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-white mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg py-3 px-4 text-white"
            placeholder="your@email.com"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-white mb-2">
            Phone (optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg py-3 px-4 text-white"
            placeholder="+1 234 567 8900"
          />
        </div>
        
        <div>
          <label htmlFor="linkedin" className="block text-white mb-2">
            LinkedIn Profile URL (optional)
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg py-3 px-4 text-white"
            placeholder="https://linkedin.com/in/username"
          />
        </div>
        
        <div>
          <label htmlFor="github" className="block text-white mb-2">
            GitHub Profile URL (optional)
          </label>
          <input
            type="url"
            id="github"
            name="github"
            value={formData.github}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg py-3 px-4 text-white"
            placeholder="https://github.com/username"
          />
        </div>
        
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Save Changes
          </button>
          
          {saved && (
            <span className="text-green-500">Changes saved successfully!</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactEditor;
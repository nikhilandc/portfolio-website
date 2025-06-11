import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';

const AboutEditor: React.FC = () => {
  const { content, updateAbout } = useContent();
  const [formData, setFormData] = useState({
    title: content.about.title,
    description: content.about.description,
    image: content.about.image || '',
  });
  
  const [saved, setSaved] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAbout(formData);
    setSaved(true);
    
    // Reset saved state after 3 seconds
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };
  
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">Edit About Section</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-white mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg py-3 px-4 text-white"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-white mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            className="w-full bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg py-3 px-4 text-white"
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="image" className="block text-white mb-2">
            Image URL (optional)
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg py-3 px-4 text-white"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        {formData.image && (
          <div className="mt-4">
            <p className="text-white mb-2">Preview:</p>
            <img
              src={formData.image}
              alt="Profile preview"
              className="w-64 h-64 object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/600x400/333/white?text=Invalid+URL';
              }}
            />
          </div>
        )}
        
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

export default AboutEditor;
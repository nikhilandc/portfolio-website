import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { Hackathon } from '../../../types';
import { Plus, Trash } from 'lucide-react';

const HackathonsEditor: React.FC = () => {
  const { content, updateHackathons } = useContent();
  const [hackathons, setHackathons] = useState<Hackathon[]>(content.hackathons);
  const [newHackathon, setNewHackathon] = useState<Hackathon>({
    id: '',
    name: '',
    date: '',
    position: '',
    description: '',
    image: '',
    projectLink: '',
  });
  
  const [saved, setSaved] = useState(false);
  
  const handleAddHackathon = () => {
    if (!newHackathon.name || !newHackathon.description) return;
    
    setHackathons([
      ...hackathons,
      {
        ...newHackathon,
        id: Date.now().toString(),
      },
    ]);
    
    setNewHackathon({
      id: '',
      name: '',
      date: '',
      position: '',
      description: '',
      image: '',
      projectLink: '',
    });
    
    setSaved(false);
  };
  
  const handleRemoveHackathon = (id: string) => {
    const updatedHackathons = hackathons.filter((hackathon) => hackathon.id !== id);
    setHackathons(updatedHackathons);
    setSaved(false);
  };
  
  const handleHackathonChange = (id: string, field: keyof Hackathon, value: string) => {
    const updatedHackathons = hackathons.map((hackathon) => {
      if (hackathon.id === id) {
        return { ...hackathon, [field]: value };
      }
      return hackathon;
    });
    
    setHackathons(updatedHackathons);
    setSaved(false);
  };
  
  const handleNewHackathonChange = (field: keyof Hackathon, value: string) => {
    setNewHackathon((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHackathons(hackathons);
    setSaved(true);
    
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };
  
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">Edit Hackathons</h3>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h4 className="text-xl text-white mb-4">Current Hackathons</h4>
          
          {hackathons.length === 0 ? (
            <p className="text-gray-400">No hackathons added yet. Add your first hackathon below.</p>
          ) : (
            <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
              {hackathons.map((hackathon) => (
                <div key={hackathon.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-white text-sm mb-1">Name</label>
                      <input
                        type="text"
                        value={hackathon.name}
                        onChange={(e) => handleHackathonChange(hackathon.id, 'name', e.target.value)}
                        className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white text-sm mb-1">Date</label>
                      <input
                        type="text"
                        value={hackathon.date}
                        onChange={(e) => handleHackathonChange(hackathon.id, 'date', e.target.value)}
                        className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                        placeholder="March 2023"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-white text-sm mb-1">Position</label>
                      <input
                        type="text"
                        value={hackathon.position}
                        onChange={(e) => handleHackathonChange(hackathon.id, 'position', e.target.value)}
                        className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                        placeholder="1st Place"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white text-sm mb-1">Image URL</label>
                      <input
                        type="text"
                        value={hackathon.image}
                        onChange={(e) => handleHackathonChange(hackathon.id, 'image', e.target.value)}
                        className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-white text-sm mb-1">Description</label>
                    <textarea
                      value={hackathon.description}
                      onChange={(e) => handleHackathonChange(hackathon.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                    ></textarea>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-white text-sm mb-1">Project Link</label>
                    <input
                      type="text"
                      value={hackathon.projectLink}
                      onChange={(e) => handleHackathonChange(hackathon.id, 'projectLink', e.target.value)}
                      className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveHackathon(hackathon.id)}
                      className="flex items-center text-red-400 hover:text-red-300"
                    >
                      <Trash className="w-4 h-4 mr-1" />
                      <span>Remove Hackathon</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <h4 className="text-xl text-white mb-4">Add New Hackathon</h4>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white text-sm mb-1">Name</label>
                <input
                  type="text"
                  value={newHackathon.name}
                  onChange={(e) => handleNewHackathonChange('name', e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                  placeholder="Hackathon Name"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm mb-1">Date</label>
                <input
                  type="text"
                  value={newHackathon.date}
                  onChange={(e) => handleNewHackathonChange('date', e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                  placeholder="March 2023"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white text-sm mb-1">Position</label>
                <input
                  type="text"
                  value={newHackathon.position}
                  onChange={(e) => handleNewHackathonChange('position', e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                  placeholder="1st Place"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm mb-1">Image URL</label>
                <input
                  type="text"
                  value={newHackathon.image}
                  onChange={(e) => handleNewHackathonChange('image', e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-white text-sm mb-1">Description</label>
              <textarea
                value={newHackathon.description}
                onChange={(e) => handleNewHackathonChange('description', e.target.value)}
                rows={3}
                className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                placeholder="Hackathon description..."
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-white text-sm mb-1">Project Link</label>
              <input
                type="text"
                value={newHackathon.projectLink}
                onChange={(e) => handleNewHackathonChange('projectLink', e.target.value)}
                className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                placeholder="https://github.com/username/repo"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAddHackathon}
                className="flex items-center text-purple-500 hover:text-purple-400"
              >
                <Plus className="w-4 h-4 mr-1" />
                <span>Add Hackathon</span>
              </button>
            </div>
          </div>
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

export default HackathonsEditor;
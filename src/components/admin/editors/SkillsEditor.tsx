import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { Skill } from '../../../types';
import { Plus, Trash } from 'lucide-react';

const SkillsEditor: React.FC = () => {
  const { content, updateSkills } = useContent();
  const [skills, setSkills] = useState<Skill[]>(content.skills);
  const [newSkill, setNewSkill] = useState<Skill>({
    name: '',
    level: 50,
    category: 'technical',
  });
  
  const [saved, setSaved] = useState(false);
  
  const handleAddSkill = () => {
    if (!newSkill.name) return;
    
    setSkills([...skills, { ...newSkill }]);
    setNewSkill({
      name: '',
      level: 50,
      category: 'technical',
    });
    setSaved(false);
  };
  
  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
    setSaved(false);
  };
  
  const handleSkillChange = (index: number, field: keyof Skill, value: string | number) => {
    const updatedSkills = [...skills];
    if (field === 'level') {
      updatedSkills[index][field] = Number(value);
    } else if (field === 'category') {
      updatedSkills[index][field] = value as 'technical' | 'soft' | 'tools';
    } else {
      updatedSkills[index][field] = value as string;
    }
    setSkills(updatedSkills);
    setSaved(false);
  };
  
  const handleNewSkillChange = (field: keyof Skill, value: string | number) => {
    if (field === 'level') {
      setNewSkill((prev) => ({ ...prev, [field]: Number(value) }));
    } else if (field === 'category') {
      setNewSkill((prev) => ({ ...prev, [field]: value as 'technical' | 'soft' | 'tools' }));
    } else {
      setNewSkill((prev) => ({ ...prev, [field]: value as string }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSkills(skills);
    setSaved(true);
    
    // Reset saved state after 3 seconds
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };
  
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">Edit Skills</h3>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h4 className="text-xl text-white mb-4">Current Skills</h4>
          
          {skills.length === 0 ? (
            <p className="text-gray-400">No skills added yet. Add your first skill below.</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {skills.map((skill, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-white text-sm mb-1">Name</label>
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                        className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white text-sm mb-1">Level ({skill.level}%)</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill.level}
                        onChange={(e) => handleSkillChange(index, 'level', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white text-sm mb-1">Category</label>
                      <select
                        value={skill.category}
                        onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                        className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                      >
                        <option value="technical">Technical</option>
                        <option value="soft">Soft Skills</option>
                        <option value="tools">Tools</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="flex items-center text-red-400 hover:text-red-300"
                    >
                      <Trash className="w-4 h-4 mr-1" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <h4 className="text-xl text-white mb-4">Add New Skill</h4>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white text-sm mb-1">Name</label>
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => handleNewSkillChange('name', e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                  placeholder="e.g., JavaScript"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm mb-1">Level ({newSkill.level}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newSkill.level}
                  onChange={(e) => handleNewSkillChange('level', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm mb-1">Category</label>
                <select
                  value={newSkill.category}
                  onChange={(e) => handleNewSkillChange('category', e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                >
                  <option value="technical">Technical</option>
                  <option value="soft">Soft Skills</option>
                  <option value="tools">Tools</option>
                </select>
              </div>
            </div>
            
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={handleAddSkill}
                className="flex items-center text-purple-500 hover:text-purple-400"
              >
                <Plus className="w-4 h-4 mr-1" />
                <span>Add Skill</span>
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

export default SkillsEditor;
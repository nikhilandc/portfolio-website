import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Skill } from '../../types';

const SkillBar: React.FC<{ skill: Skill }> = ({ skill }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-white">{skill.name}</span>
        <span className="text-purple-400">{skill.level}%</span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-purple-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const { content } = useContent();
  const { skills } = content;
  
  const [activeCategory, setActiveCategory] = useState<'all' | 'technical' | 'soft' | 'tools'>('all');
  
  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'technical', name: 'Technical' },
    { id: 'soft', name: 'Soft Skills' },
    { id: 'tools', name: 'Tools' },
  ];
  
  const filteredSkills = skills.filter(
    (skill) => activeCategory === 'all' || skill.category === activeCategory
  );
  
  return (
    <section id="skills" className="py-24 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Skills</h2>
          <div className="w-20 h-1 bg-purple-500 mb-8"></div>
        </div>
        
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as any)}
                className={`px-4 py-2 rounded-full text-sm transition-colors duration-300 ${
                  activeCategory === category.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredSkills.map((skill, index) => (
            <SkillBar key={index} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';
import { Settings, User, Briefcase, Code, Award, Mail, FileText } from 'lucide-react';
import HeroEditor from './editors/HeroEditor';
import AboutEditor from './editors/AboutEditor';
import SkillsEditor from './editors/SkillsEditor';
import ProjectsEditor from './editors/ProjectsEditor';
import HackathonsEditor from './editors/HackathonsEditor';
import ContactEditor from './editors/ContactEditor';
import ResumeEditor from './editors/ResumeEditor';

type EditorTab = 'hero' | 'about' | 'skills' | 'projects' | 'hackathons' | 'contact' | 'resume';

const AdminPanel: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<EditorTab>('hero');
  
  if (!isAuthenticated) {
    return null;
  }
  
  const tabs = [
    { id: 'hero' as EditorTab, name: 'Hero', icon: <User className="w-5 h-5" /> },
    { id: 'about' as EditorTab, name: 'About', icon: <User className="w-5 h-5" /> },
    { id: 'skills' as EditorTab, name: 'Skills', icon: <Settings className="w-5 h-5" /> },
    { id: 'projects' as EditorTab, name: 'Projects', icon: <Code className="w-5 h-5" /> },
    { id: 'hackathons' as EditorTab, name: 'Hackathons', icon: <Award className="w-5 h-5" /> },
    { id: 'contact' as EditorTab, name: 'Contact', icon: <Mail className="w-5 h-5" /> },
    { id: 'resume' as EditorTab, name: 'Resume', icon: <FileText className="w-5 h-5" /> },
  ];
  
  return (
    <section id="admin" className="py-24 bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Admin Panel</h2>
          <div className="w-20 h-1 bg-purple-500 mb-8"></div>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-64 bg-gray-900 p-6">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors duration-300 ${
                      activeTab === tab.id
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 p-6">
              {activeTab === 'hero' && <HeroEditor />}
              {activeTab === 'about' && <AboutEditor />}
              {activeTab === 'skills' && <SkillsEditor />}
              {activeTab === 'projects' && <ProjectsEditor />}
              {activeTab === 'hackathons' && <HackathonsEditor />}
              {activeTab === 'contact' && <ContactEditor />}
              {activeTab === 'resume' && <ResumeEditor />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
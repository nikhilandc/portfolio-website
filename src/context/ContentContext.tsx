import React, { createContext, useState, useContext, useEffect } from 'react';
import { SiteContent } from '../types';
import { defaultContent } from '../data/initialData';

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  updateHero: (hero: SiteContent['hero']) => void;
  updateAbout: (about: SiteContent['about']) => void;
  updateSkills: (skills: SiteContent['skills']) => void;
  updateProjects: (projects: SiteContent['projects']) => void;
  updateHackathons: (hackathons: SiteContent['hackathons']) => void;
  updateEducation: (education: SiteContent['education']) => void;
  updateContact: (contact: SiteContent['contact']) => void;
  updateResumeLink: (link: string) => void;
}

const ContentContext = createContext<ContentContextType>({
  content: defaultContent,
  updateContent: () => {},
  updateHero: () => {},
  updateAbout: () => {},
  updateSkills: () => {},
  updateProjects: () => {},
  updateHackathons: () => {},
  updateEducation: () => {},
  updateContact: () => {},
  updateResumeLink: () => {}
});

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    // Load content from localStorage if it exists
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const saveContent = (newContent: SiteContent) => {
    localStorage.setItem('siteContent', JSON.stringify(newContent));
  };

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    saveContent(newContent);
  };

  const updateHero = (hero: SiteContent['hero']) => {
    const newContent = { ...content, hero };
    setContent(newContent);
    saveContent(newContent);
  };

  const updateAbout = (about: SiteContent['about']) => {
    const newContent = { ...content, about };
    setContent(newContent);
    saveContent(newContent);
  };

  const updateSkills = (skills: SiteContent['skills']) => {
    const newContent = { ...content, skills };
    setContent(newContent);
    saveContent(newContent);
  };

  const updateProjects = (projects: SiteContent['projects']) => {
    const newContent = { ...content, projects };
    setContent(newContent);
    saveContent(newContent);
  };

  const updateHackathons = (hackathons: SiteContent['hackathons']) => {
    const newContent = { ...content, hackathons };
    setContent(newContent);
    saveContent(newContent);
  };

  const updateEducation = (education: SiteContent['education']) => {
    const newContent = { ...content, education };
    setContent(newContent);
    saveContent(newContent);
  };

  const updateContact = (contact: SiteContent['contact']) => {
    const newContent = { ...content, contact };
    setContent(newContent);
    saveContent(newContent);
  };

  const updateResumeLink = (resumeLink: string) => {
    const newContent = { ...content, resumeLink };
    setContent(newContent);
    saveContent(newContent);
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        updateHero,
        updateAbout,
        updateSkills,
        updateProjects,
        updateHackathons,
        updateEducation,
        updateContact,
        updateResumeLink
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
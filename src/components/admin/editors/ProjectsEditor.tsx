import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { Project } from '../../../types';
import { Plus, Trash, X } from 'lucide-react';

const ProjectsEditor: React.FC = () => {
  const { content, updateProjects } = useContent();
  const [projects, setProjects] = useState<Project[]>(content.projects);
  const [newProject, setNewProject] = useState<Project>({
    id: '',
    title: '',
    description: '',
    image: '',
    tags: [],
    demoLink: '',
    githubLink: '',
  });
  const [newTag, setNewTag] = useState('');
  const [saved, setSaved] = useState(false);
  
  const handleAddProject = () => {
    if (!newProject.title || !newProject.description) return;
    
    setProjects([
      ...projects,
      {
        ...newProject,
        id: Date.now().toString(),
      },
    ]);
    
    setNewProject({
      id: '',
      title: '',
      description: '',
      image: '',
      tags: [],
      demoLink: '',
      githubLink: '',
    });
    
    setSaved(false);
  };
  
  const handleRemoveProject = (id: string) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    setSaved(false);
  };
  
  const handleProjectChange = (id: string, field: keyof Project, value: string | string[]) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === id) {
        return { ...project, [field]: value };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    setSaved(false);
  };
  
  const handleNewProjectChange = (field: keyof Project, value: string | string[]) => {
    setNewProject((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleAddTag = () => {
    if (!newTag) return;
    
    setNewProject((prev) => ({
      ...prev,
      tags: [...prev.tags, newTag],
    }));
    
    setNewTag('');
  };
  
  const handleRemoveTag = (index: number) => {
    const updatedTags = [...newProject.tags];
    updatedTags.splice(index, 1);
    
    setNewProject((prev) => ({
      ...prev,
      tags: updatedTags,
    }));
  };
  
  const handleAddTagToProject = (id: string, tag: string) => {
    if (!tag) return;
    
    const updatedProjects = projects.map((project) => {
      if (project.id === id) {
        return {
          ...project,
          tags: [...project.tags, tag],
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    setSaved(false);
  };
  
  const handleRemoveTagFromProject = (id: string, index: number) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === id) {
        const updatedTags = [...project.tags];
        updatedTags.splice(index, 1);
        
        return {
          ...project,
          tags: updatedTags,
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    setSaved(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProjects(projects);
    setSaved(true);
    
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };
  
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">Edit Projects</h3>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h4 className="text-xl text-white mb-4">Current Projects</h4>
          
          {projects.length === 0 ? (
            <p className="text-gray-400">No projects added yet. Add your first project below.</p>
          ) : (
            <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-white text-sm mb-1">Title</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)}
                        className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white text-sm mb-1">Image URL</label>
                      <input
                        type="text"
                        value={project.image}
                        onChange={(e) => handleProjectChange(project.id, 'image', e.target.value)}
                        className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-white text-sm mb-1">Description</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-white text-sm mb-1">Demo Link</label>
                      <input
                        type="text"
                        value={project.demoLink}
                        onChange={(e) => handleProjectChange(project.id, 'demoLink', e.target.value)}
                        className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                        placeholder="https://example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white text-sm mb-1">GitHub Link</label>
                      <input
                        type="text"
                        value={project.githubLink}
                        onChange={(e) => handleProjectChange(project.id, 'githubLink', e.target.value)}
                        className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                        placeholder="https://github.com/username/repo"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-white text-sm mb-1">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-purple-500 bg-opacity-20 text-purple-300 rounded-full px-3 py-1 text-sm flex items-center"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTagFromProject(project.id, index)}
                            className="ml-2 text-purple-300 hover:text-purple-200"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Add a tag"
                        className="flex-grow bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-l py-2 px-3 text-white"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTagToProject(project.id, newTag);
                            setNewTag('');
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          handleAddTagToProject(project.id, newTag);
                          setNewTag('');
                        }}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(project.id)}
                      className="flex items-center text-red-400 hover:text-red-300"
                    >
                      <Trash className="w-4 h-4 mr-1" />
                      <span>Remove Project</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <h4 className="text-xl text-white mb-4">Add New Project</h4>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white text-sm mb-1">Title</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => handleNewProjectChange('title', e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                  placeholder="Project Title"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm mb-1">Image URL</label>
                <input
                  type="text"
                  value={newProject.image}
                  onChange={(e) => handleNewProjectChange('image', e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-white text-sm mb-1">Description</label>
              <textarea
                value={newProject.description}
                onChange={(e) => handleNewProjectChange('description', e.target.value)}
                rows={3}
                className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                placeholder="Project description..."
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white text-sm mb-1">Demo Link</label>
                <input
                  type="text"
                  value={newProject.demoLink}
                  onChange={(e) => handleNewProjectChange('demoLink', e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                  placeholder="https://example.com"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm mb-1">GitHub Link</label>
                <input
                  type="text"
                  value={newProject.githubLink}
                  onChange={(e) => handleNewProjectChange('githubLink', e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded py-2 px-3 text-white"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-white text-sm mb-1">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newProject.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-purple-500 bg-opacity-20 text-purple-300 rounded-full px-3 py-1 text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className="ml-2 text-purple-300 hover:text-purple-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  placeholder="Add a tag"
                  className="flex-grow bg-gray-600 border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-l py-2 px-3 text-white"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r"
                >
                  Add
                </button>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAddProject}
                className="flex items-center text-purple-500 hover:text-purple-400"
              >
                <Plus className="w-4 h-4 mr-1" />
                <span>Add Project</span>
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

export default ProjectsEditor;
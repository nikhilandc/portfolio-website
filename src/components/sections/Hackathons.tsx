import React from 'react';
import { useContent } from '../../context/ContentContext';
import { ExternalLink, Trophy, Calendar } from 'lucide-react';

const Hackathons: React.FC = () => {
  const { content } = useContent();
  const { hackathons } = content;
  
  return (
    <section id="hackathons" className="py-24 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Hackathon Journey</h2>
          <div className="w-20 h-1 bg-purple-500 mb-8"></div>
        </div>
        
        <div className="space-y-12">
          {hackathons.map((hackathon) => (
            <div
              key={hackathon.id}
              className="flex flex-col md:flex-row bg-gray-900 rounded-lg overflow-hidden shadow-lg"
            >
              {hackathon.image && (
                <div className="md:w-1/3">
                  <img
                    src={hackathon.image}
                    alt={hackathon.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6 md:w-2/3">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{hackathon.name}</h3>
                  
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      hackathon.position.includes('1st')
                        ? 'bg-yellow-500 bg-opacity-20 text-yellow-300'
                        : hackathon.position.includes('2nd')
                        ? 'bg-gray-500 bg-opacity-20 text-gray-300'
                        : hackathon.position.includes('3rd')
                        ? 'bg-orange-500 bg-opacity-20 text-orange-300'
                        : 'bg-purple-500 bg-opacity-20 text-purple-300'
                    }`}
                  >
                    {hackathon.position}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-400 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{hackathon.date}</span>
                </div>
                
                <p className="text-gray-300 mb-4">{hackathon.description}</p>
                
                {hackathon.projectLink && (
                  <a
                    href={hackathon.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-purple-500 hover:text-purple-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    <span>View Project</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hackathons;
import { SiteContent } from '../types';

export const defaultContent: SiteContent = {
  hero: {
    title: 'Nikhil Kumar',
    subtitle: 'Electronics Engineer | Full-Stack Developer | Tech Innovator',
    backgroundImage: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg'
  },
  about: {
    title: 'About Me',
    description: `As an Electronics Engineer and Full-Stack Developer, I bridge the gap between hardware and software to create innovative solutions. My passion lies in embedded systems, IoT, and cutting-edge web technologies.

    With a strong foundation in both electronics and computer science, I specialize in developing integrated systems that combine hardware expertise with modern software development practices. From designing PCBs to building scalable web applications, I bring a unique perspective to every project.

    Currently exploring the intersection of AI, IoT, and cloud computing to build next-generation smart systems that make a real impact.`,
    image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  skills: [
    { name: 'Embedded Systems', level: 90, category: 'technical' },
    { name: 'PCB Design', level: 85, category: 'technical' },
    { name: 'Arduino/ESP32', level: 88, category: 'technical' },
    { name: 'React.js', level: 85, category: 'technical' },
    { name: 'Node.js', level: 80, category: 'technical' },
    { name: 'Python', level: 85, category: 'technical' },
    { name: 'IoT Protocols', level: 82, category: 'technical' },
    { name: 'Circuit Design', level: 88, category: 'technical' },
    { name: 'Problem Solving', level: 90, category: 'soft' },
    { name: 'Project Management', level: 85, category: 'soft' },
    { name: 'KiCad', level: 80, category: 'tools' },
    { name: 'Altium Designer', level: 75, category: 'tools' },
    { name: 'Git', level: 85, category: 'tools' },
    { name: 'MATLAB', level: 80, category: 'tools' }
  ],
  projects: [
    {
      id: '1',
      title: 'Smart Energy Monitor',
      description: 'IoT-based energy monitoring system with real-time analytics and mobile app integration',
      image: 'https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg',
      tags: ['IoT', 'ESP32', 'React Native', 'MQTT'],
      demoLink: 'https://example.com',
      githubLink: 'https://github.com'
    },
    {
      id: '2',
      title: 'Automated Greenhouse',
      description: 'Smart greenhouse system with environmental monitoring and automated control',
      image: 'https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg',
      tags: ['Arduino', 'Sensors', 'Web Dashboard', 'IoT'],
      demoLink: 'https://example.com',
      githubLink: 'https://github.com'
    },
    {
      id: '3',
      title: 'Wearable Health Monitor',
      description: 'Custom-designed wearable device for health monitoring with cloud integration',
      image: 'https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg',
      tags: ['PCB Design', 'BLE', 'React', 'Node.js'],
      demoLink: 'https://example.com',
      githubLink: 'https://github.com'
    }
  ],
  hackathons: [
    {
      id: '1',
      name: 'IoT Innovation Challenge',
      date: 'March 2023',
      position: '1st Place',
      description: 'Developed a smart waste management system using IoT sensors and ML',
      image: 'https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg',
      projectLink: 'https://github.com'
    },
    {
      id: '2',
      name: 'Hardware Hackathon',
      date: 'September 2022',
      position: '2nd Place',
      description: 'Built an automated plant care system with custom PCB and mobile app',
      image: 'https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg',
      projectLink: 'https://github.com'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'Technical University',
      degree: 'Bachelor of Engineering',
      field: 'Electronics and Communication',
      startDate: '2019',
      endDate: '2023',
      description: 'Specialized in embedded systems and IoT technologies'
    }
  ],
  resumeLink: 'https://bthvqumxmfcgtqntpzek.supabase.co/storage/v1/object/public/resume//resume.pdf',
  contact: {
    email: 'nikhil05966@gmail.com',
    phone: '+91 9876543210',
    linkedin: 'https://linkedin.com/in/nikhilkumar',
    github: 'https://github.com/nikhilkumar'
  }
};
# Portfolio Website - Nikhil Kumar

A modern, dark-themed portfolio website built with React, TypeScript, and Supabase. Features a complete admin panel for content management, contact form, and file upload capabilities.

🔗 Live Preview
👉[Portfolio Preview](https://portfolio-website-fgo5.vercel.app/)

## 🚀 Features

### Frontend
- **Modern Design**: Dark theme with purple accent colors and smooth animations
- **Responsive Layout**: Optimized for all device sizes
- **Interactive Sections**: Hero, About, Skills, Projects, Hackathons, Contact
- **Smooth Navigation**: Animated header with smooth scrolling
- **Contact Form**: Integrated with Supabase for message storage
- **Resume Download**: Direct download functionality

### Admin Panel
- **Secure Authentication**: Supabase Auth with role-based access
- **Content Management**: Edit all sections through intuitive forms
- **File Upload**: Resume upload and management
- **Real-time Updates**: Changes reflect immediately on the site
- **Message Management**: View and manage contact form submissions

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Supabase Integration**: Database, authentication, and file storage
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Utility-first styling with custom design system
- **React Context**: State management for content and authentication
- **Local Storage**: Content persistence between sessions

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Supabase (Database, Auth, Storage)
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd portfolio-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Supabase Setup

1. Create a new Supabase project
2. Run the provided migrations in the `supabase/migrations` folder
3. Set up the storage bucket for file uploads
4. Configure authentication settings

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🗄️ Database Schema

### Tables

- **messages**: Contact form submissions
- **projects**: Project data (if using database storage)
- **project_purchases**: Purchase tracking for sellable projects

### Storage Buckets

- **resume**: For resume file uploads
- **project-files**: For project-related files

## 🔐 Authentication

The admin panel uses Supabase Auth with role-based access control:

- **Admin Role**: Full access to content management
- **User Role**: Limited access (if implemented)

### Default Admin Credentials
- Email: `nikhil05966@gmail.com`
- Password: `Nikhil@05966`

> **Security Note**: Change the default admin credentials in production!

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/           # Admin panel components
│   │   ├── editors/     # Content editors
│   │   ├── AdminLogin.tsx
│   │   └── AdminPanel.tsx
│   ├── layout/          # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── sections/        # Main sections
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Skills.tsx
│       ├── Projects.tsx
│       ├── Hackathons.tsx
│       └── Contact.tsx
├── context/             # React Context providers
│   ├── AuthContext.tsx
│   └── ContentContext.tsx
├── data/                # Initial data
│   └── initialData.ts
├── lib/                 # Utilities
│   └── supabase.ts
├── types/               # TypeScript types
│   ├── index.ts
│   └── supabase.ts
└── App.tsx
```

## 🎨 Customization

### Colors
The design system uses custom colors defined in `tailwind.config.js`:
- **Dark**: `#0F0F13` (Background)
- **Dark Accent**: `#1A1A23` (Cards/Sections)
- **Primary**: `#6D28D9` (Purple)
- **Primary Light**: `#7C3AED`
- **Accent**: `#F59E0B` (Orange)

### Content
All content can be modified through:
1. **Admin Panel**: Real-time editing interface
2. **Initial Data**: `src/data/initialData.ts` for default content
3. **Local Storage**: Persisted changes between sessions

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Connect your repository
2. Set environment variables
3. Deploy with build command: `npm run build`
4. Set publish directory: `dist`

### Environment Variables for Production

```env
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 Content Management

### Admin Panel Access
1. Navigate to the login section
2. Use admin credentials
3. Access the admin panel
4. Edit content in real-time

### Sections You Can Edit
- **Hero**: Title, subtitle, background image
- **About**: Description, profile image
- **Skills**: Add/remove skills with levels and categories
- **Projects**: Manage project portfolio
- **Hackathons**: Track hackathon achievements
- **Contact**: Update contact information
- **Resume**: Upload and manage resume files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support or questions:
- Email: nikhil05966@gmail.com
- GitHub Issues: Create an issue in the repository

## 🙏 Acknowledgments

- **Supabase** for backend services
- **Tailwind CSS** for styling system
- **Framer Motion** for animations
- **Lucide React** for icons
- **Pexels** for stock images

---

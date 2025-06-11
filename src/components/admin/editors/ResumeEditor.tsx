import React, { useState, useRef, useEffect } from 'react';
import { useContent } from '../../../context/ContentContext';
import { Upload, Download, Trash2, FileText, Check, X } from 'lucide-react';
import { uploadFile, downloadFile, deleteFile, getFileUrl } from '../../../lib/supabase';
import { toast } from 'sonner';

const ResumeEditor: React.FC = () => {
  const { content, updateResumeLink } = useContent();
  const [resumeLink, setResumeLink] = useState(content.resumeLink);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set initial resume link if available
    if (!resumeLink) {
      setResumeLink('https://bthvqumxmfcgtqntpzek.supabase.co/storage/v1/object/public/resume//resume.pdf');
      updateResumeLink('https://bthvqumxmfcgtqntpzek.supabase.co/storage/v1/object/public/resume//resume.pdf');
    }
  }, []);
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Upload file to Supabase storage
      const fileName = `resume.pdf`;
      await uploadFile(file, fileName);
      
      // Get the public URL
      const publicUrl = getFileUrl(fileName);
      
      // Update the resume link
      setResumeLink(publicUrl);
      updateResumeLink(publicUrl);
      
      toast.success('Resume uploaded successfully!');
      setSaved(true);
      
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error: any) {
      console.error('Error uploading resume:', error);
      toast.error(error.message || 'Failed to upload resume');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const handleDownload = async () => {
    if (!resumeLink) {
      toast.error('No resume available to download');
      return;
    }
    
    try {
      // For the public URL, we can directly download it
      const link = document.createElement('a');
      link.href = resumeLink;
      link.download = 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Resume downloaded successfully!');
    } catch (error: any) {
      console.error('Error downloading resume:', error);
      toast.error(error.message || 'Failed to download resume');
    }
  };
  
  const handleDelete = async () => {
    if (!resumeLink) {
      toast.error('No resume to delete');
      return;
    }
    
    try {
      setIsDeleting(true);
      
      // Extract file name from URL
      const fileName = 'resume.pdf';
      
      await deleteFile(fileName);
      
      setResumeLink('');
      updateResumeLink('');
      
      toast.success('Resume deleted successfully!');
      setSaved(true);
      
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error: any) {
      console.error('Error deleting resume:', error);
      toast.error(error.message || 'Failed to delete resume');
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">Manage Resume</h3>
      
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FileText className="w-6 h-6 text-purple-500 mr-2" />
              <h4 className="text-lg font-semibold text-white">Current Resume</h4>
            </div>
            {saved && (
              <div className="flex items-center text-green-500">
                <Check className="w-4 h-4 mr-1" />
                <span>Saved</span>
              </div>
            )}
          </div>
          
          {resumeLink ? (
            <div className="space-y-4">
              <p className="text-gray-300 break-all">{resumeLink}</p>
              
              <div className="flex gap-4">
                <button
                  onClick={handleDownload}
                  className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
                
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No resume uploaded yet</p>
          )}
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Upload className="w-6 h-6 text-purple-500 mr-2" />
            <h4 className="text-lg font-semibold text-white">Upload New Resume</h4>
          </div>
          
          <div className="space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf"
              onChange={handleFileUpload}
              className="block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:cursor-pointer"
            />
            
            <p className="text-sm text-gray-400">
              Maximum file size: 5MB. Only PDF files are accepted.
            </p>
            
            {isUploading && (
              <div className="flex items-center text-purple-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500 mr-2"></div>
                <span>Uploading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
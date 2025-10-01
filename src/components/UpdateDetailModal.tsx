'use client';

import { useState } from 'react';
import { X, Share2, Heart, MessageCircle, Eye, Calendar, User, Tag } from 'lucide-react';

interface Update {
  _id: string;
  title: string;
  content: string;
  type: string;
  priority: string;
  status: string;
  targetAudience: string;
  tags: string[];
  author: {
    id: string;
    name: string;
    email: string;
  };
  publishedAt: string;
  isPinned: boolean;
  views: number;
  likes: number;
  comments: any[];
  createdAt: string;
  updatedAt: string;
}

interface UpdateDetailModalProps {
  update: Update | null;
  isOpen: boolean;
  onClose: () => void;
  onLike?: (updateId: string) => void;
  onShare?: (update: Update) => void;
}

export default function UpdateDetailModal({ 
  update, 
  isOpen, 
  onClose, 
  onLike, 
  onShare 
}: UpdateDetailModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  if (!isOpen || !update) return null;

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(update._id);
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
    onShare?.(update);
  };

  const copyToClipboard = async () => {
    const url = `${window.location.origin}/update/${update._id}`;
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareToSocial = (platform: string) => {
    const url = encodeURIComponent(`${window.location.origin}/update/${update._id}`);
    const title = encodeURIComponent(update.title);
    const text = encodeURIComponent(update.content.substring(0, 100) + '...');
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      announcement: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      news: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      update: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      event: (
        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    };
    return icons[type as keyof typeof icons] || icons.announcement;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      announcement: 'bg-blue-100 text-blue-800',
      news: 'bg-green-100 text-green-800',
      update: 'bg-purple-100 text-purple-800',
      event: 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-blue-100 text-blue-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
              {getTypeIcon(update.type)}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{update.title}</h1>
              <div className="flex items-center space-x-4 text-sm opacity-90">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(update.publishedAt)}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {update.author.name}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(update.type)}`}>
              {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(update.priority)}`}>
              {update.priority.charAt(0).toUpperCase() + update.priority.slice(1)} Priority
            </span>
            {update.isPinned && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                Pinned
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {update.content}
            </div>
          </div>

          {/* Tags */}
          {update.tags.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center mb-3">
                <Tag className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {update.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isLiked 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{update.likes + (isLiked ? 1 : 0)}</span>
              </button>
              
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
                <MessageCircle className="w-5 h-5" />
                <span>{update.comments.length}</span>
              </div>
              
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
                <Eye className="w-5 h-5" />
                <span>{update.views}</span>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>

              {showShareOptions && (
                <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 min-w-[200px]">
                  <button
                    onClick={() => shareToSocial('twitter')}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm flex items-center"
                  >
                    <span className="mr-2">🐦</span> Twitter
                  </button>
                  <button
                    onClick={() => shareToSocial('facebook')}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm flex items-center"
                  >
                    <span className="mr-2">📘</span> Facebook
                  </button>
                  <button
                    onClick={() => shareToSocial('linkedin')}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm flex items-center"
                  >
                    <span className="mr-2">💼</span> LinkedIn
                  </button>
                  <button
                    onClick={() => shareToSocial('whatsapp')}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm flex items-center"
                  >
                    <span className="mr-2">📱</span> WhatsApp
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm flex items-center"
                  >
                    <span className="mr-2">📋</span> Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

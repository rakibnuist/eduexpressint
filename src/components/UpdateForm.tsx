'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Update {
  _id?: string;
  title: string;
  content: string;
  type: string;
  status: string;
  priority: string;
  targetAudience: string;
  isPinned: boolean;
  views?: number;
  likes?: number;
  publishedAt?: string;
  createdAt?: string;
  tags: string[];
}

interface UpdateFormProps {
  update?: Update | null;
  onSubmit: (updateData: Update) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function UpdateForm({ update, onSubmit, onCancel, isLoading = false }: UpdateFormProps) {
  const [formData, setFormData] = useState<Update>({
    title: '',
    content: '',
    type: 'announcement',
    status: 'draft',
    priority: 'medium',
    targetAudience: 'all',
    isPinned: false,
    tags: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagsInput, setTagsInput] = useState('');
  const [editorMode, setEditorMode] = useState<'text' | 'html'>('text');
  const [htmlContent, setHtmlContent] = useState('');
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (update) {
      setFormData(update);
      setTagsInput(update.tags?.join(', ') || '');
      // Check if content contains HTML tags
      const hasHtmlTags = /<[^>]*>/g.test(update.content);
      if (hasHtmlTags) {
        setEditorMode('html');
        setHtmlContent(update.content);
      }
    }
  }, [update]);

  // HTML Sanitization function
  const sanitizeHtml = (html: string): string => {
    // Remove potentially dangerous tags and attributes
    const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre'];
    const allowedAttributes = ['href', 'target', 'rel'];
    
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Remove script tags and other dangerous elements
    const scripts = tempDiv.querySelectorAll('script, style, iframe, object, embed, form, input, button');
    scripts.forEach(el => el.remove());
    
    // Remove dangerous attributes
    const allElements = tempDiv.querySelectorAll('*');
    allElements.forEach(el => {
      const attributes = Array.from(el.attributes);
      attributes.forEach(attr => {
        if (!allowedAttributes.includes(attr.name) || 
            (attr.name === 'href' && (attr.value.startsWith('javascript:') || attr.value.startsWith('data:')))) {
          el.removeAttribute(attr.name);
        }
      });
    });
    
    return tempDiv.innerHTML;
  };

  // HTML Validation function
  const validateHtml = (html: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // Check for dangerous tags
    const dangerousTags = ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button'];
    dangerousTags.forEach(tag => {
      if (html.includes(`<${tag}`)) {
        errors.push(`Dangerous tag '${tag}' is not allowed`);
      }
    });
    
    // Check for dangerous attributes
    const dangerousAttributes = ['onclick', 'onload', 'onerror', 'onmouseover', 'javascript:'];
    dangerousAttributes.forEach(attr => {
      if (html.toLowerCase().includes(attr)) {
        errors.push(`Dangerous attribute '${attr}' is not allowed`);
      }
    });
    
    // Check for malformed HTML (basic check)
    const openTags = (html.match(/<[^/][^>]*>/g) || []).length;
    const closeTags = (html.match(/<\/[^>]*>/g) || []).length;
    
    if (Math.abs(openTags - closeTags) > 2) {
      errors.push('HTML structure may be malformed. Please check your tags.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (formData.content.trim().length < 50) {
      newErrors.content = 'Content must be at least 50 characters long';
    }

    // HTML validation for HTML mode
    if (editorMode === 'html') {
      const htmlValidation = validateHtml(formData.content);
      if (!htmlValidation.isValid) {
        newErrors.content = `HTML validation failed: ${htmlValidation.errors.join(', ')}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Process tags
    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

    // Sanitize HTML content if in HTML mode
    let sanitizedContent = formData.content;
    if (editorMode === 'html') {
      sanitizedContent = sanitizeHtml(formData.content);
    }

    try {
      await onSubmit({
        ...formData,
        content: sanitizedContent,
        tags,
      });
    } catch (error) {
    }
  };

  const handleInputChange = (field: keyof Update, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // HTML Editor Functions
  const handleHtmlPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const html = e.clipboardData.getData('text/html');
    const text = e.clipboardData.getData('text/plain');
    
    if (html && html !== text) {
      // Paste HTML content
      setHtmlContent(prev => prev + html);
      setFormData(prev => ({ ...prev, content: prev.content + html }));
    } else {
      // Paste plain text
      setHtmlContent(prev => prev + text);
      setFormData(prev => ({ ...prev, content: prev.content + text }));
    }
  };

  const handleHtmlChange = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerHTML;
    setHtmlContent(content);
    setFormData(prev => ({ ...prev, content }));
  };

  const handleEditorModeChange = (mode: 'text' | 'html') => {
    setEditorMode(mode);
    if (mode === 'html' && !htmlContent) {
      setHtmlContent(formData.content);
    } else if (mode === 'text' && htmlContent) {
      // Convert HTML to plain text for text mode
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      setFormData(prev => ({ ...prev, content: tempDiv.textContent || tempDiv.innerText || '' }));
    }
  };

  const insertHtmlTag = (tag: string) => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        const htmlTag = selectedText ? `<${tag}>${selectedText}</${tag}>` : `<${tag}></${tag}>`;
        
        range.deleteContents();
        const fragment = range.createContextualFragment(htmlTag);
        range.insertNode(fragment);
        
        // Update content
        const newContent = editorRef.current.innerHTML;
        setHtmlContent(newContent);
        setFormData(prev => ({ ...prev, content: newContent }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={errors.title ? 'border-red-500' : ''}
                placeholder="Enter update title"
              />
              {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleInputChange('priority', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Select
                value={formData.targetAudience}
                onValueChange={(value) => handleInputChange('targetAudience', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="students">Students</SelectItem>
                  <SelectItem value="parents">Parents</SelectItem>
                  <SelectItem value="partners">Partners</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="education, scholarship, deadline (comma-separated)"
              />
              <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="isPinned">Pin to Top</Label>
                <p className="text-sm text-gray-500">Show this update at the top of the list</p>
              </div>
              <Switch
                id="isPinned"
                checked={formData.isPinned}
                onCheckedChange={(checked) => handleInputChange('isPinned', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="content">Content *</Label>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant={editorMode === 'text' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleEditorModeChange('text')}
                >
                  Text
                </Button>
                <Button
                  type="button"
                  variant={editorMode === 'html' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleEditorModeChange('html')}
                >
                  HTML
                </Button>
              </div>
            </div>

            {editorMode === 'text' ? (
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className={errors.content ? 'border-red-500' : ''}
                placeholder="Enter the update content..."
                rows={8}
              />
            ) : (
              <Tabs defaultValue="edit" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="edit">Edit HTML</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                
                <TabsContent value="edit" className="space-y-2">
                  {/* HTML Toolbar */}
                  <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded-t-md bg-gray-50">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insertHtmlTag('strong')}
                      title="Bold"
                    >
                      <strong>B</strong>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insertHtmlTag('em')}
                      title="Italic"
                    >
                      <em>I</em>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insertHtmlTag('u')}
                      title="Underline"
                    >
                      <u>U</u>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insertHtmlTag('h2')}
                      title="Heading 2"
                    >
                      H2
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insertHtmlTag('h3')}
                      title="Heading 3"
                    >
                      H3
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insertHtmlTag('p')}
                      title="Paragraph"
                    >
                      P
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insertHtmlTag('ul')}
                      title="Unordered List"
                    >
                      • List
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insertHtmlTag('ol')}
                      title="Ordered List"
                    >
                      1. List
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insertHtmlTag('a')}
                      title="Link"
                    >
                      🔗 Link
                    </Button>
                  </div>

                  {/* HTML Editor */}
                  <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleHtmlChange}
                    onPaste={handleHtmlPaste}
                    className={`min-h-[200px] p-3 border border-gray-200 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.content ? 'border-red-500' : ''
                    }`}
                    style={{ minHeight: '200px' }}
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />

                  {/* HTML Paste Instructions */}
                  <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                    <strong>HTML Paste:</strong> You can paste HTML content directly into the editor. 
                    Use the toolbar buttons above to format text, or paste formatted content from other sources.
                    <br />
                    <strong>Security:</strong> Dangerous tags (script, iframe, etc.) and attributes (onclick, etc.) are automatically removed for security.
                  </div>
                </TabsContent>
                
                <TabsContent value="preview" className="space-y-2">
                  <div className="min-h-[200px] p-4 border border-gray-200 rounded-md bg-white">
                    <div className="text-sm text-gray-500 mb-2 border-b pb-2">
                      <strong>Preview:</strong> This is how your content will appear to users
                    </div>
                    <div 
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: htmlContent || formData.content || '<p class="text-gray-400 italic">No content to preview</p>' 
                      }}
                    />
                  </div>
                  
                  {/* Preview Instructions */}
                  <div className="text-xs text-gray-500 bg-green-50 p-2 rounded">
                    <strong>Preview Mode:</strong> This shows how your HTML content will be rendered. 
                    Switch back to "Edit HTML" to make changes.
                  </div>
                </TabsContent>
              </Tabs>
            )}

            {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content}</p>}
            <p className="text-xs text-gray-500 mt-1">
              {formData.content.length} characters (minimum 50 required)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : update ? 'Update' : 'Create Update'}
        </Button>
      </div>
    </form>
  );
}

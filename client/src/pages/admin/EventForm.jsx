import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import eventsService from '../../services/eventsService';
import toast, { Toaster } from 'react-hot-toast';
import { FiArrowLeft, FiUploadCloud, FiX } from 'react-icons/fi';

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('technical');
  const [day, setDay] = useState('1');
  const [date, setDate] = useState('7 April 2026');
  const [time, setTime] = useState('11:00 AM - 01:00 PM');
  const [venue, setVenue] = useState('GEC Jamui Campus');
  const [googleFormUrl, setGoogleFormUrl] = useState('');
  const [rulebookUrl, setRulebookUrl] = useState('');
  const [isActive, setIsActive] = useState(true);
  
  // Tags & Rules State
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [rules, setRules] = useState([]);
  const [ruleInput, setRuleInput] = useState('');

  // Image State
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Load existing data if editing
  useEffect(() => {
    const fetchEvent = async () => {
      if (!isEditing) return;
      try {
        const eventData = await eventsService.getById(id);
        setTitle(eventData.title || '');
        setDescription(eventData.description || '');
        setCategory(eventData.category || 'technical');
        setDay(eventData.day || '1');
        setDate(eventData.date || '7 April 2026');
        setTime(eventData.time || '11:00 AM - 01:00 PM');
        setVenue(eventData.venue || 'GEC Jamui Campus');
        setGoogleFormUrl(eventData.googleFormUrl || '');
        setRulebookUrl(eventData.rulebookUrl || '');
        setIsActive(eventData.isActive !== false); 
        setTags(eventData.tags || []);
        setRules(eventData.rules || []);
        
        const imgUrl = eventData.imageUrl;
        if (imgUrl && imgUrl.startsWith('/uploads')) {
          const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
          setImagePreview(`${baseUrl}${imgUrl}`);
        } else {
          setImagePreview(imgUrl || '');
        }
      } catch (error) {
        toast.error('Failed to load event data');
        console.error(error);
        navigate('/admin/events');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchEvent();
  }, [id, isEditing, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.trim().toLowerCase();
      if (val && !tags.includes(val) && tags.length < 5) {
        setTags([...tags, val]);
        setTagInput('');
      } else if (tags.length >= 5) {
        toast.error('Maximum 5 tags allowed');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !description || !category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('day', day);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('venue', venue);
    formData.append('googleFormUrl', googleFormUrl);
    formData.append('rulebookUrl', rulebookUrl);
    formData.append('isActive', isActive);
    formData.append('tags', JSON.stringify(tags));
    formData.append('rules', JSON.stringify(rules));
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (isEditing) {
        await eventsService.update(id, formData);
        toast.success('Event updated successfully');
      } else {
        await eventsService.create(formData);
        toast.success('Event created successfully');
      }
      navigate('/admin/events');
    } catch (error) {
      toast.error(error.response?.data?.error || `Failed to ${isEditing ? 'update' : 'create'} event`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-fade-in">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 border-b border-gray-200 dark:border-dark-border pb-6">
        <Link 
          to="/admin/events" 
          className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-border rounded-full transition-colors"
        >
          <FiArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
            {isEditing ? 'Edit Event' : 'Create New Event'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {isEditing ? 'Update event details and registration status.' : 'Publish a new technical or cultural event.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Main Details Card */}
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Event Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Code Relay 3.0"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Detailed explanation of the event, rules, rounds, etc."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              >
                <option value="technical">Technical</option>
                <option value="cultural">Cultural</option>
                <option value="sports">Sports</option>
                <option value="creative">Creative</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Day *
              </label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              >
                <option value="1">Day 1</option>
                <option value="2">Day 2</option>
                <option value="3">Day 3</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date (e.g. 7 April 2026) *
              </label>
              <input
                type="text"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time (e.g. 11:00 AM - 01:00 PM) *
              </label>
              <input
                type="text"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Venue *
              </label>
              <input
                type="text"
                required
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                External Rulebook URL (PDF/Drive Link)
              </label>
              <input
                type="url"
                value={rulebookUrl}
                onChange={(e) => setRulebookUrl(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Itemized Rules (Main Card Highlights)
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={ruleInput}
                  onChange={(e) => setRuleInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (ruleInput.trim() && !rules.includes(ruleInput.trim())) {
                        setRules([...rules, ruleInput.trim()]);
                        setRuleInput('');
                      }
                    }
                  }}
                  placeholder="e.g. Teams of 2 to 4 members"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (ruleInput.trim() && !rules.includes(ruleInput.trim())) {
                      setRules([...rules, ruleInput.trim()]);
                      setRuleInput('');
                    }
                  }}
                  className="px-6 py-3 bg-gray-100 dark:bg-dark-border text-gray-700 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-200 transition-all"
                >
                  Add
                </button>
              </div>
              {rules.length > 0 && (
                <div className="space-y-2 max-h-48 overflow-y-auto p-4 bg-gray-50 dark:bg-dark-bg/50 rounded-xl border border-gray-100 dark:border-dark-border">
                  {rules.map((rule, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 p-2 bg-white dark:bg-dark-card rounded-lg border border-gray-100 dark:border-dark-border shadow-sm">
                      <span className="text-sm text-gray-600 dark:text-gray-300 flex-1">{rule}</span>
                      <button 
                        type="button" 
                        onClick={() => setRules(rules.filter((_, i) => i !== idx))}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags (Press Enter or Comma to add)
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="e.g. coding, team, 24hrs"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm font-medium rounded-full dark:text-gray-200">
                      #{tag}
                      <button type="button" onClick={() => removeTag(tag)} className="text-gray-400 hover:text-red-500">
                        <FiX size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-2 mt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <div>
                  <span className="block font-medium text-gray-900 dark:text-white">Active Event</span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400">Uncheck to mark registration as closed. Event will still be visible.</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Media Card */}
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Event Image/Poster</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Upload Area */}
            <div className="w-full">
              <label className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary rounded-xl cursor-pointer bg-gray-50 dark:bg-dark-bg/50 hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                  <FiUploadCloud className="w-10 h-10 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">SVG, PNG, JPG or WebP (Max 5MB)</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/jpeg, image/png, image/webp"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* Preview Area */}
            <div className="w-full flex justify-center border border-gray-100 dark:border-dark-border rounded-xl p-4 bg-gray-50 dark:bg-dark-bg/20 min-h-[16rem]">
              {imagePreview ? (
                <div className="relative w-full overflow-hidden rounded-lg aspect-auto">
                   <img 
                     src={imagePreview} 
                     alt="Preview" 
                     className="object-contain w-full h-full max-h-[14rem]" 
                   />
                </div>
              ) : (
                <div className="flex items-center justify-center text-gray-400">
                  <p>Image preview will appear here</p>
                </div>
              )}
            </div>
            
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link 
            to="/admin/events"
            className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors border border-gray-200 dark:border-dark-border"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-primary hover:bg-yellow-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[150px]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              isEditing ? 'Save Changes' : 'Create Event'
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default EventForm;

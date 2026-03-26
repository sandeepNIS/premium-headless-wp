"use client";

import { useState } from 'react';

interface ContactFormProps {
  formId: string;
}

export default function ContactForm({ formId }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.currentTarget);
    
    // Add required CF7 hidden fields for headless submission
    formData.append('_wpcf7', formId);
    formData.append('_wpcf7_unit_tag', `wpcf7-f${formId}-p1-o1`);
    formData.append('_wpcf7_locale', 'en_US');
    
    // Robustly handle the API URL
    let apiBase = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '';
    if (apiBase.includes('/wp/v2')) {
      apiBase = apiBase.replace('/wp/v2', '/contact-form-7/v1');
    } else if (!apiBase.includes('/contact-form-7/v1')) {
      apiBase = apiBase.replace(/\/$/, '') + '/contact-form-7/v1';
    }
    
    const endpoint = `${apiBase}/contact-forms/${formId}/feedback`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status === 'mail_sent') {
        setStatus('success');
        setMessage(data.message);
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
        setMessage(data.message || 'Validation failed. Please check your fields.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-3xl text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-2xl font-black text-white mb-2">Message Received!</h3>
        <p className="text-emerald-400/80 mb-6">{message}</p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-white underline font-bold"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted ml-2">Full Name</label>
          <input 
            type="text" 
            name="your-name" 
            required 
            placeholder="John Doe"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted ml-2">Email Address</label>
          <input 
            type="email" 
            name="your-email" 
            required 
            placeholder="john@example.com"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-muted ml-2">Subject</label>
        <input 
          type="text" 
          name="your-subject" 
          required 
          placeholder="How can we help?"
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-muted ml-2">Your Message</label>
        <textarea 
          name="your-message" 
          required 
          rows={5}
          placeholder="Tell us about your project..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors resize-none"
        />
      </div>

      {status === 'error' && (
        <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-rose-400 text-sm">
          {message}
        </div>
      )}

      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className={`w-full bg-gradient-to-r from-primary to-secondary py-5 rounded-2xl text-white font-black text-lg transition-all active:scale-[0.98] shadow-2xl shadow-primary/20 hover:shadow-primary/40 ${status === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {status === 'submitting' ? 'Sending Message...' : 'Send Message →'}
      </button>
    </form>
  );
}

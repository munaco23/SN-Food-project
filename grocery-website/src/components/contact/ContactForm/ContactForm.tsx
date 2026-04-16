import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../../../utils/api';
import './ContactForm.css';

export const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.ok) {
        setStatus('success');
        setResponseMessage(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setResponseMessage(data.message || 'Failed to send message.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
      setResponseMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="contact-form-container">
      <div className="contact-form-header">
        <h2>{t('contact_page.form.title')}</h2>
        <p>{t('contact_page.form.subtitle')}</p>
      </div>
      
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="name">{t('contact_page.form.full_name')}</label>
            <input 
              type="text" 
              id="name" 
              placeholder={t('contact_page.form.full_name_ph')} 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">{t('contact_page.form.email')}</label>
            <input 
              type="email" 
              id="email" 
              placeholder={t('contact_page.form.email_ph')} 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="subject">{t('contact_page.form.subject')}</label>
          <input 
            type="text" 
            id="subject" 
            placeholder={t('contact_page.form.subject_ph')} 
            value={formData.subject}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">{t('contact_page.form.message')}</label>
          <textarea 
            id="message" 
            rows={6} 
            placeholder={t('contact_page.form.message_ph')} 
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        
        {responseMessage && (
          <div className={`form-response-message ${status}`}>
            {responseMessage}
          </div>
        )}

        <button type="submit" className="contact-submit-btn" disabled={status === 'loading'}>
          {status === 'loading' ? t('common.loading') || 'Sending...' : t('contact_page.form.submit')}
          <i className="fa-solid fa-paper-plane" />
        </button>
      </form>
    </div>
  );
};

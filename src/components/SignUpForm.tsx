import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SignUpForm.css';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  school: string;
  why: string;
}

const CheckIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const SignUpForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    school: '',
    why: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network request
    await new Promise(res => setTimeout(res, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="signup-success"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
      >
        <motion.div
          className="signup-success__icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        >
          <CheckIcon />
        </motion.div>
        <h3 className="signup-success__title">You're on the Manifest!</h3>
        <p className="signup-success__text">
          Welcome to Moonshot, {form.firstName}. We'll be in touch soon with mission briefings and next steps.
        </p>
        <motion.button
          className="btn-secondary"
          onClick={() => { setSubmitted(false); setForm({ firstName: '', lastName: '', email: '', school: '', why: '' }); }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Submit another
        </motion.button>
      </motion.div>
    );
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
      <div className="signup-form__row">
        <div className={`signup-form__field ${focused === 'firstName' || form.firstName ? 'is-active' : ''}`}>
          <label className="signup-form__label" htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="signup-form__input"
            value={form.firstName}
            onChange={handleChange}
            onFocus={() => setFocused('firstName')}
            onBlur={() => setFocused(null)}
            required
            autoComplete="given-name"
          />
        </div>
        <div className={`signup-form__field ${focused === 'lastName' || form.lastName ? 'is-active' : ''}`}>
          <label className="signup-form__label" htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className="signup-form__input"
            value={form.lastName}
            onChange={handleChange}
            onFocus={() => setFocused('lastName')}
            onBlur={() => setFocused(null)}
            required
            autoComplete="family-name"
          />
        </div>
      </div>

      <div className={`signup-form__field ${focused === 'email' || form.email ? 'is-active' : ''}`}>
        <label className="signup-form__label" htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          className="signup-form__input"
          value={form.email}
          onChange={handleChange}
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused(null)}
          required
          autoComplete="email"
        />
      </div>

      <div className={`signup-form__field ${focused === 'school' || form.school ? 'is-active' : ''}`}>
        <label className="signup-form__label" htmlFor="school">School / Institution</label>
        <input
          id="school"
          name="school"
          type="text"
          className="signup-form__input"
          value={form.school}
          onChange={handleChange}
          onFocus={() => setFocused('school')}
          onBlur={() => setFocused(null)}
          autoComplete="organization"
        />
      </div>

      <div className={`signup-form__field signup-form__field--textarea ${focused === 'why' || form.why ? 'is-active' : ''}`}>
        <label className="signup-form__label" htmlFor="why">Why do you want to join Moonshot?</label>
        <textarea
          id="why"
          name="why"
          className="signup-form__input signup-form__textarea"
          value={form.why}
          onChange={handleChange}
          onFocus={() => setFocused('why')}
          onBlur={() => setFocused(null)}
          rows={4}
          required
        />
      </div>

      <motion.button
        type="submit"
        className="signup-form__submit"
        disabled={loading}
        whileHover={!loading ? { scale: 1.02 } : {}}
        whileTap={!loading ? { scale: 0.98 } : {}}
      >
        <AnimatePresence mode="wait" initial={false}>
          {loading ? (
            <motion.span
              key="loading"
              className="signup-form__spinner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <svg className="spinner-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0" strokeDasharray="56.5" strokeDashoffset="28" />
              </svg>
              Launching...
            </motion.span>
          ) : (
            <motion.span
              key="submit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Join the Mission
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </form>
  );
};

export default SignUpForm;

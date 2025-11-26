import React, { useState } from 'react';
import emailjs from "emailjs-com";   // ⬅ required import
import {
  Linkedin,
  Github,
  Instagram,
  Gamepad2,
  CalendarDays,
  MailCheck,
  UserCircle,
  Briefcase,
  Code2,
} from "lucide-react";




export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const validateForm = () => {
    const newErrors = { name: '', email: '', phone: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 2500);
  };

  const handleSubmit = () => {
  if (validateForm()) {
    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      user_phone: formData.phone,
      user_message: formData.message,
      time: new Date().toLocaleString(),
    };

    showToast("Sending message...", "loading");

    emailjs
      .send(
        "service_6fkazye",
        "template_60vj7e6",
        templateParams,
        "cTaAVEF1AOLtWuEv4"
      )
      .then(
        () => {
          showToast("Message sent successfully! 💌", "success");

          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        },
        () => {
          showToast("Failed to send message ❌", "error");
        }
      );
  }
};


  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

 
  return (
    <section className="contact-wrapper" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">Contact Me</h2>

        <p className="contact-info">
          <strong>Email:</strong>{" "}
          <span className="highlight">anushikabalamurgan.f@northeastern.edu</span>{" "}
          || <span className="highlight">anushiikabala@gmail.com</span>
          <br />
          <strong>Phone:</strong>{" "}
          <span className="highlight">463-320-4816</span>
        </p>

        <p className="contact-subtext">
          ...or feel free to get in touch with me by filling out this form.
        </p>

        <div className="contact-form">
          <div className="left-form">
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Your Name *"
                className="form-input"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="Your Email *"
                className="form-input"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Your Phone"
                className="form-input"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}

              />
              {errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>
          </div>
          <div className="textarea-wrapper">
            <textarea
              placeholder="Your Message *"
              className="form-textarea"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
            ></textarea>
            {errors.message && <div className="error-message">{errors.message}</div>}
          </div>
        </div>

        <button className="send-button" onClick={handleSubmit}>Send Message</button>

        <footer className="contact-footer">
          <h3 className="footer-name">Anushika Balamurgan</h3>
          <p className="footer-tagline">
            Creating Beautiful and Intelligent Solutions with Code
          </p>

          <div className="footer-links">
            <a href="#about" className="footer-link">
              <UserCircle size={18} /> About
            </a>
            <a href="#skills" className="footer-link">
              <Code2 size={18} /> Skills
            </a>
            <a href="#projects" className="footer-link">
              <Briefcase size={18} /> Projects
            </a>
            <a href="#experience" className="footer-link">
              <CalendarDays size={18} /> Experience
            </a>
            <a href="#admin" className="footer-link">
              <Gamepad2 size={18} /> Admin
            </a>
          </div>

          <div className="footer-socials">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin size={22} color="#3f2f44" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Github size={22} color="#3f2f44" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram size={22} color="#3f2f44" />
            </a>
            <a href="mailto:anushiikabala@gmail.com">
              <MailCheck size={22} color="#3f2f44" />
            </a>
          </div>

          <p className="footer-copyright">
            © 2025 Anushika Balamurgan. All rights reserved.
          </p>
        </footer>
      </div>
      {toast.show && (
  <div className={`custom-toast ${toast.type}`}>
    {toast.message}
  </div>
)}


      <style>{`
      :root {
  --bg-grad: linear-gradient(180deg, #0d1b2a, #1b263b, #2a9d8f);
  --surface: rgba(255,255,255,0.08);
  --surface-strong: rgba(255,255,255,0.14);
  --glass-border: rgba(255,255,255,0.22);
  --shadow: 0 10px 28px rgba(0,0,0,0.28);

  --text-strong: #e0fbfc;
  --text: #bcd4e6;
  --text-muted: #95a8bb;

  --accent: #2a9d8f;
  --accent-2: #38b2ac;
  --accent-3: #48c6b5;
  --chip-bg: rgba(42,157,143,0.12);
  --chip-border: rgba(42,157,143,0.35);
}
        .contact-wrapper {
          background: var(--bg-grad);
          min-height: 100vh;
          padding: 2rem 1.5rem 2rem;
          color: var(--text);
          font-family: 'Poppins', sans-serif;
          text-align: center;
        }

        .contact-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .contact-title {
          font-size: 2.6rem;
          font-weight: 700;
          color: var(--accent-3);
          margin-bottom: 1.5rem;
        }

        .contact-info {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--text);
        }

        .highlight {
          color: var(--accent-3);
          font-weight: 600;
        }

        .contact-subtext {
          margin-top: 0.8rem;
          margin-bottom: 2.5rem;
          color: var(--text);
          font-size: 0.95rem;
        }

        .contact-form {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 1.5rem;
          flex-wrap: wrap;
          max-width: 900px;
          margin: 0 auto;
        }

        .left-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex: 1;
          min-width: 260px;
        }

        .input-wrapper {
          width: 100%;
        }

        .textarea-wrapper {
          flex: 1;
          width: 100%;
        }

        .error-message {
          color: red;
          font-size: 10px;
          text-align: left;
          margin-top: 4px;
          margin-left: 10px;
        }

        .form-input {
          padding: 0.9rem 1.1rem;
          border-radius: 10px;
          border: 1px solid var(--glass-border);
          outline: none;
          font-size: 0.95rem;
          background: var(--surface-strong);
          color: var(--text-strong);
          box-shadow: var(--shadow);
          font-family: 'Poppins', sans-serif;
          width: 100%;
          box-sizing: border-box;
        }

        .form-input:focus {
          border-color: var(--accent-3);
          box-shadow: 0 4px 12px rgba(42, 157, 143, 0.3);
        }

        .form-textarea {
          width: 100%;
          min-height: 140px;
          padding: 1rem 1.1rem;
          border-radius: 10px;
          border: 1px solid var(--glass-border);
          outline: none;
          font-size: 0.95rem;
          resize: none;
          background: var(--surface-strong);
          color: var(--text-strong);
          box-shadow: var(--shadow);
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }

        .form-textarea:focus {
          border-color: var(--accent-3);
          box-shadow: 0 4px 12px rgba(42, 157, 143, 0.3);
        }

        .send-button {
          background: var(--accent);
          color: var(--text-strong);
          font-weight: 600;
          border: none;
          border-radius: 10px;
          padding: 0.9rem 2.4rem;
          margin-top: 2rem;
          cursor: pointer;
          box-shadow: var(--shadow);
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
        }

        .send-button:hover {
          background: var(--accent-3);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(42, 157, 143, 0.4);
        }

        .contact-footer {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid var(--glass-border);
        }

        .footer-name {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--accent-3);
        }

        .footer-tagline {
          font-size: 0.95rem;
          color: var(--text);
          margin-bottom: 1.5rem;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2.5rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .footer-link {
          text-decoration: none;
          color: var(--accent-3);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .footer-link:hover {
          color: var(--accent-2);
          transform: translateY(-2px);
        }

        .footer-socials {
          display: flex;
          justify-content: center;
          gap: 1.2rem;
          margin-top: 1.2rem;
        }

        .footer-socials a {
          transition: transform 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-socials a:hover {
          transform: scale(1.15);
        }

        .footer-copyright {
          margin-top: 1.8rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        /* Tablet Responsive (600px - 820px) */
        @media (min-width: 600px) and (max-width: 820px) {
          .contact-wrapper {
            min-height: 100%;
            padding: 2rem 2rem;
          }

          .contact-title {
            font-size: 2.2rem;
          }

          .contact-info {
            font-size: 0.95rem;
          }

          .contact-form {
            gap: 1.2rem;
          }

          .left-form {
            min-width: 240px;
          }

          .form-textarea {
            min-height: 140px;
          }

          .footer-links {
            gap: 2rem;
          }

          .footer-link {
            font-size: 0.9rem;
          }
        }

        /* Mobile Responsive (≤ 600px) */
        @media (max-width: 600px) {
          .contact-wrapper {
    padding: 1.5rem 1rem;
  }

  .contact-title {
    font-size: 1.8rem;
    margin-bottom: 1.2rem;
  }

  .contact-info {
    font-size: 0.85rem;
    line-height: 1.6;
  }

  .contact-info br {
    display: block;
    margin-bottom: 0.5rem;
  }

  .contact-subtext {
    font-size: 0.85rem;
    margin-bottom: 2rem;
  }

  .contact-form {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
  }

  .left-form {
    width: 95%;
    min-width: unset;
  }

  .form-input,
  .form-textarea {
    width: 95%;
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
    box-sizing: border-box;
  }

  .form-textarea {
    min-height: 120px;
    resize: none;
  }

  .send-button {
    width: 95%;
    padding: 0.85rem 1.5rem;
    font-size: 0.95rem;
    margin-top: 1.5rem;
  }

  .contact-footer {
    margin-top: 3rem;
    padding-top: 1.5rem;
  }

  .footer-name {
    font-size: 1.15rem;
  }

  .footer-tagline {
    font-size: 0.85rem;
    margin-bottom: 1.2rem;
  }

  .footer-links {
    flex-wrap: nowrap;
    justify-content: center;
    gap: 1rem;
  }

  .footer-link {
    font-size: 0.85rem;
    gap: 0.4rem;
  }

  .footer-socials {
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .footer-socials a svg {
    width: 20px;
    height: 20px;
  }

  .footer-copyright {
    margin-top: 1.5rem;
    font-size: 0.8rem;
  }
}

        /* Extra Small Mobile (≤ 380px) */
@media (max-width: 380px) {
  .contact-title {
    font-size: 1.6rem;
  }

  .contact-info {
    font-size: 0.8rem;
  }

  .highlight {
    display: inline-block;
    word-break: break-all;
  }

  .form-input,
  .form-textarea {
    width: 88%;
    max-width: 330px;
    font-size: 0.85rem;
    padding: 0.75rem 0.9rem;
    box-sizing: border-box;
    margin: 0 auto;
  }

  .form-textarea {
    min-height: 15px;
  }

  .send-button {
    font-size: 0.9rem;
    padding: 0.8rem 1.2rem;
    width: 90%;
    max-width: 330px;
  }

  .footer-name {
    font-size: 1rem;
  }

  .footer-tagline {
    font-size: 0.8rem;
  }

  .footer-link {
    font-size: 0.6rem;
  }

  .footer-socials a svg {
    width: 15px;
    height: 15px;
  }
}
.custom-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 14px 22px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  animation: fadeSlide 0.4s ease, fadeOut 0.4s ease 2s forwards;
  z-index: 9999;
  backdrop-filter: blur(8px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

/* Toast Types */
.custom-toast.success {
  background: linear-gradient(135deg, #2a9d8f, #48c6b5);
}

.custom-toast.error {
  background: linear-gradient(135deg, #d9534f, #ff6b6b);
}

.custom-toast.loading {
  background: linear-gradient(135deg, #4b79a1, #283e51);
}

/* Animations */
@keyframes fadeSlide {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
}

      `}</style>

      
    </section>
  );
}
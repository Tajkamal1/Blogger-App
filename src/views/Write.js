import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Write.css';
import { useUser } from '../UserContext'; // Adjust the path as needed

function Write() {
  const { userEmail ,logout} = useUser(); // Use the useUser hook to access userEmail
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      setImage(base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, title, content, image }), // Use userEmail from the context
      });

      if (response.ok) {
        console.log('Blog data saved successfully');
        setTitle('');
        setContent('');
        setImage(null);

        // Navigate to the Home page after a successful blog post
        navigate('/home');
      } else {
        console.error('Failed to save blog data');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar-write">
        <img id="icon-write" src={require('../images/blogger.png')} alt="Icon" />
        <ul>
          <li><Link to={'/home'}><img className='home-icon' src={require('../icons/home1.png')} alt="Icon" /></Link></li>
          <div onClick={handleLogout}>
              <img className='logout-icon1' src={require("../icons/logout.png")} alt="Icon" />
            </div>
        </ul>
      </nav>
      <img src={require("../images/background-image.png")}id="background-video" alt='img'/>
      <div className="container-write">
        <div className="form-container-write">
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              className="write-input"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              className="write-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              className="write-input"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <button className='write' onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Write;

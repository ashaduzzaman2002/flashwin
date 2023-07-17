import React, { useState } from 'react';
import './About.css';
import { dbObject } from '../../helper/constant';
import { useEffect } from 'react';

const About = () => {
const [aboutUsHTML, setAboutUsHTML] = useState('');
  const fetchAboutUs = async () => {
    const { data } = await dbObject.get("/more/about");
    setAboutUsHTML(data.data);
  }
  useEffect(() => {
    fetchAboutUs();
  }, []);

  return (
    <div className="container">
      <div className="about-container">
        <h2>About Us</h2>

        <div className='about-para'>
          <div className="content" dangerouslySetInnerHTML={{__html: aboutUsHTML}}></div>
        </div>
      </div>

    </div>
  );
};

export default About;

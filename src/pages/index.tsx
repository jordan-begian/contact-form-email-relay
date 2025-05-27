import React from 'react';
import ContactForm from './components/ContactForm';
import Heading from './components/PageHeader';
import Footer from './components/PageFooter';

const Home: React.FC = () => {
  return (
    <div className='canvas-background'>
      <div className='contact-container'>
        <Heading />
        <ContactForm />
      </div>
      <div className='flex xs:flex-col justify-center md:justify-end'>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/common/Header';
import { UI } from 'utils/constants';
import developerCoding from '../images/developer-coding.png';
import collaboration from '../images/collaboration.png';
import resume from '../images/resume.png';
import logo from '../images/logo.png'
import { log } from 'console';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBrowseProjects = () => {
    navigate('/search');
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  return (
    <div className="min-h-screen bg-secondary-100">
      <Header />

      <main className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full py-16">
            <div className={`${UI.MAX_WIDTH} mx-auto ${UI.DEFAULT_PADDING}`}>
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="max-w-3xl">
                    <h1 className="text-4xl font-heading text-primary mb-6">Find your next open source contribution</h1>
                    <p className="text-xl text-neutral-black mb-8">
                    GitGood helps you discover beginner-friendly issues in open source projects 
                    that match your skills and interests.
                    </p>
                    <div className="flex space-x-4">
                        <button 
                            onClick={handleBrowseProjects} 
                            className="bg-primary text-neutral-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
                        >
                            Start Exploring
                        </button>
                        <button 
                            onClick={handleLearnMore} 
                            className="border border-primary text-primary px-6 py-3 rounded-full hover:bg-secondary-200 transition-colors"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
                    <div className="flex-1 flex justify-center">
                        <img 
                        src={logo} 
                        alt="GitGood Logo"
                        className="w-64 h-64 object-contain"
                    />
                </div>
                </div>
            </div>
        </section>

        <div className="flex items-center justify-center w-full my-2">
            <div className="w-24 h-1 bg-primary rounded-full"></div>
            <div className="w-3 h-3 bg-accent rounded-full mx-3"></div>
            <div className="w-24 h-1 bg-primary rounded-full"></div>
        </div>

        {/* Numbered Facts Section - similar to recycl-e */}
        <section className="w-full py-16">
          <div className={`${UI.MAX_WIDTH} mx-auto ${UI.DEFAULT_PADDING}`}>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="text-9xl font-heading text-primary opacity-80">01</div>
                <div className="ml-4 mt-4">
                  <p className="text-xl text-primary">
                    Studies show that contributing to open source can help developers land better jobs. 
                    For every hour spent on open source contributions, developers report gaining four hours 
                    worth of practical experience.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center items-center">
                    <img 
                        src={developerCoding} 
                        alt="Developer coding" 
                        className="w-72 h-72 object-cover"
                    />
                </div>
            </div>
            
            <div className="relative mt-16">
              <div className="border-l-2 border-primary-light absolute h-16 left-1/2 -top-16"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16 items-center mt-16">
              <div className="flex justify-center items-center">
                <img 
                  src={collaboration} 
                  alt="Developers collaborating" 
                  className="w-72 h-72 object-cover"
                />
              </div>
              
              <div className="relative md:order-2">
                <div className="text-9xl font-heading text-primary opacity-80">02</div>
                <div className="ml-4 mt-4">
                  <p className="text-xl text-primary">
                    People can learn directly from experienced developers by contributing to 
                    open source projects. It's a fantastic way to improve your coding skills 
                    while building meaningful connections in the tech community.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative mt-16">
              <div className="border-l-2 border-primary-light absolute h-16 left-1/2 -top-16"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16 items-center mt-16">
              <div className="relative">
                <div className="text-9xl font-heading text-primary opacity-80">03</div>
                <div className="ml-4 mt-4">
                  <p className="text-xl text-primary">
                    Open source contributions stand out on your resume. GitHub reported that 
                    93% of hiring managers consider open source contributions an important factor 
                    when evaluating candidates for technical positions.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center items-center">
                <img 
                  src={resume}
                  alt="Resume" 
                  className="w-72 h-72 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase Section - similar to the cap showcase */}
        <section className="w-full py-16 bg-secondary-50">
          <div className={`${UI.MAX_WIDTH} mx-auto ${UI.DEFAULT_PADDING}`}>
            <h2 className="text-3xl font-heading text-primary mb-12 text-center">What Makes GitGood Special</h2>
            
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="relative mx-auto w-64 h-64">
                  <div className="absolute inset-0 border-2 border-primary rounded-full flex items-center justify-center">
                    <div className="bg-white p-8 rounded-full shadow-lg">
                      <svg className="w-24 h-24 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute -right-12 top-8 border border-primary px-4 py-2 rounded-full bg-white">
                    <span className="text-primary font-medium">Smart Filtering</span>
                  </div>
                  <div className="absolute -left-12 bottom-8 border border-primary px-4 py-2 rounded-full bg-white">
                    <span className="text-primary font-medium">Beginner Friendly</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-heading text-primary mb-4">Intelligent Project Matching</h3>
                <p className="text-lg text-neutral-black mb-4">
                  GitGood uses smart algorithms to match you with open source projects that align with 
                  your skills and interests. Our platform focuses on finding truly beginner-friendly 
                  issues that are perfect for first-time contributors.
                </p>
                <p className="text-lg text-neutral-black">
                  Unlike traditional GitHub searches, GitGood analyzes project activity, 
                  maintainer responsiveness, and documentation quality to ensure you have 
                  a positive first contribution experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section with Wave Pattern */}
        <section className="wave-bottom mt-16 pb-24 pt-12 bg-white relative w-full">
          <div className={`${UI.MAX_WIDTH} mx-auto ${UI.DEFAULT_PADDING}`}>
            <h2 className="text-2xl font-heading text-primary mb-4">Ready to contribute?</h2>
            <p className="text-neutral-black max-w-2xl">
              Find open source projects that match your skills and interests. 
              GitGood makes it easy to discover beginner-friendly issues and start 
              your open source journey today.
            </p>
            
            <div className="mt-8 flex">
              <button 
                onClick={handleBrowseProjects} 
                className="bg-primary text-neutral-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors mr-4"
              >
                Start on Your First Project Today!
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
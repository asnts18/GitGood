import React from 'react';
import Header from 'components/common/Header';
import { UI } from 'utils/constants';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-secondary-100">
      <Header />
      
      <main className={`${UI.MAX_WIDTH} mx-auto ${UI.DEFAULT_PADDING} py-12`}>
        <div className="p-8 rounded-2xl bg-white shadow-lg border border-secondary-200/30 mb-8 transition-all duration-300 hover:shadow-xl">
          <h1 className="text-4xl font-heading text-primary-dark mb-8 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-24 after:h-1 after:bg-accent after:rounded-full">
            About GitGood
          </h1>
          
          <section className="mb-12 transition-all duration-300 transform hover:translate-x-1">
            <h2 className="text-2xl font-heading text-primary mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-sm">01</span>
              Our Mission
            </h2>
            <div className="pl-11">
              <p className="text-neutral-black mb-4 text-lg leading-relaxed">
                GitGood was created to help new developers find meaningful open source projects to contribute to.
                We believe that contributing to open source is one of the best ways to grow as a developer,
                build your portfolio, and give back to the community.
              </p>
              <p className="text-neutral-black text-lg leading-relaxed">
                Our platform makes it easy to discover beginner-friendly issues across GitHub repositories,
                filtering by programming language, difficulty level, and more.
              </p>
            </div>
          </section>
          
          <section className="mb-12 transition-all duration-300 transform hover:translate-x-1">
            <h2 className="text-2xl font-heading text-primary mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-sm">02</span>
              How It Works
            </h2>
            <div className="pl-11">
              <ol className="list-none space-y-3 text-neutral-black relative" >
                {[
                  "Search for repositories or issues using our advanced search",
                  "Filter by programming language, difficulty level, and other criteria",
                  "Browse issues marked as \"good first issue\" or \"beginner friendly\"",
                  "Find a project you're interested in and start contributing"
                ].map((item, index) => (
                  <li key={index} className="pl-8 relative">
                    <span className="absolute left-0 top-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center text-xs text-white font-medium">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-heading text-primary mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-sm">03</span>
              Why Open Source?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 pl-11">
              <div className="bg-secondary-50 p-6 rounded-xl shadow-sm border border-secondary-200/50 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <h3 className="text-xl font-heading text-primary mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 text-xs">B</span>
                  For Beginners
                </h3>
                <ul className="list-none space-y-2 text-neutral-black">
                  {[
                    "Build real-world experience",
                    "Learn from experienced developers",
                    "Enhance your coding portfolio",
                    "Join a supportive community"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-accent mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-secondary-50 p-6 rounded-xl shadow-sm border border-secondary-200/50 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <h3 className="text-xl font-heading text-primary mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 text-xs">P</span>
                  For Projects
                </h3>
                <ul className="list-none space-y-2 text-neutral-black">
                  {[
                    "Get help with smaller tasks",
                    "Increase community engagement",
                    "Mentor new developers",
                    "Improve project quality"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-accent mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          
          <div className="mt-12 text-center">
            <button 
              onClick={() => navigate('/search')} 
              className="bg-primary text-neutral-white px-8 py-4 rounded-full hover:bg-primary-dark hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group"
            >
              <span className="flex items-center justify-center">
                Start Exploring Projects
                <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
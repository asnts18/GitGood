import React from 'react';
import Header from 'components/common/Header';
import { UI } from 'utils/constants';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-secondary-100">
      <Header />
      
      <main className={`${UI.MAX_WIDTH} mx-auto ${UI.DEFAULT_PADDING}`}>
        <div className="p-6 rounded-xl bg-white shadow-sm mb-8">
          <h1 className="text-3xl font-heading text-primary mb-4">About GitGood</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-heading text-primary mb-3">Our Mission</h2>
            <p className="text-neutral-black mb-4">
              GitGood was created to help new developers find meaningful open source projects to contribute to.
              We believe that contributing to open source is one of the best ways to grow as a developer,
              build your portfolio, and give back to the community.
            </p>
            <p className="text-neutral-black">
              Our platform makes it easy to discover beginner-friendly issues across GitHub repositories,
              filtering by programming language, difficulty level, and more.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-heading text-primary mb-3">How It Works</h2>
            <ol className="list-decimal list-inside space-y-2 text-neutral-black">
              <li>Search for repositories or issues using our advanced search</li>
              <li>Filter by programming language, difficulty level, and other criteria</li>
              <li>Browse issues marked as "good first issue" or "beginner friendly"</li>
              <li>Find a project you're interested in and start contributing</li>
            </ol>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-heading text-primary mb-3">Why Open Source?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-secondary-50 p-4 rounded-lg">
                <h3 className="text-xl font-heading text-primary mb-2">For Beginners</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-black">
                  <li>Build real-world experience</li>
                  <li>Learn from experienced developers</li>
                  <li>Enhance your coding portfolio</li>
                  <li>Join a supportive community</li>
                </ul>
              </div>
              <div className="bg-secondary-50 p-4 rounded-lg">
                <h3 className="text-xl font-heading text-primary mb-2">For Projects</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-black">
                  <li>Get help with smaller tasks</li>
                  <li>Increase community engagement</li>
                  <li>Mentor new developers</li>
                  <li>Improve project quality</li>
                </ul>
              </div>
            </div>
          </section>
          
          <div className="mt-8">
            <button 
              onClick={() => navigate('/search')} 
              className="bg-primary text-neutral-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
            >
              Start Exploring Projects
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
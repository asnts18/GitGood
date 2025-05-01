import React from 'react';
import Header from 'components/common/Header';
import { UI } from 'utils/constants';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/ButtonComponent';

const GettingStartedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-secondary-100">
      <Header />
      
      <main className={`${UI.MAX_WIDTH} mx-auto ${UI.DEFAULT_PADDING}`}>
        <div className="space-y-8">
          <div className="p-6 rounded-xl bg-secondary-50 shadow-sm">
            <h1 className="text-3xl font-heading text-primary mb-4">Getting Started with Open Source</h1>
            <p className="text-lg text-neutral-black">
              Learn how to contribute to open source projects and start your journey as a contributor.
            </p>
          </div>
          
          {/* Introduction Section */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-heading text-primary mb-4">Why Contribute to Open Source?</h2>
            <div className="space-y-4 text-neutral-black">
              <p>
                Contributing to open source projects is a fantastic way to improve your coding skills, 
                gain real-world experience, and build your portfolio. It also allows you to collaborate 
                with other developers, learn from experienced programmers, and give back to the community.
              </p>
              <p>
                Open source contributions are highly valued by employers and can help you stand out in job applications. 
                They demonstrate your ability to work with existing codebases, collaborate with others, and 
                contribute to larger projects.
              </p>
            </div>
          </section>
          
          {/* Prerequisites Section */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-heading text-primary mb-4">Before You Begin</h2>
            <div className="space-y-4 text-neutral-black">
              <p>
                Before you start contributing to open source projects, you should have:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Basic knowledge of version control with Git</li>
                <li>A GitHub account</li>
                <li>Understanding of the programming language used in the project</li>
                <li>Familiarity with the command line interface</li>
              </ul>
              <p>
                Don't worry if you're still learning! Many projects welcome beginners and have 
                issues labeled as "good first issue" or "beginner friendly" specifically for newcomers.
              </p>
            </div>
          </section>
          
          {/* Step-by-Step Guide */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-heading text-primary mb-6">Step-by-Step Guide to Making Your First Contribution</h2>
            
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-heading text-primary-dark mb-2">Step 1: Find a Project</h3>
                <div className="space-y-2 text-neutral-black">
                  <p>
                    Use GitGood to find a project that interests you and matches your skills. Look for 
                    repositories with clear documentation, active maintainers, and issues labeled for beginners.
                  </p>
                  <div className="mt-2">
                    <Link to="/search">
                      <Button variant="accent" size="sm">
                        Search Projects
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-heading text-primary-dark mb-2">Step 2: Fork the Repository</h3>
                <div className="space-y-2 text-neutral-black">
                  <p>
                    Go to the repository on GitHub and click the "Fork" button in the top-right corner. 
                    This creates a copy of the repository in your GitHub account.
                  </p>
                  <div className="bg-secondary-50 p-4 rounded-lg">
                    <code className="text-primary">
                      # Clone your forked repository to your local machine<br/>
                      git clone https://github.com/your-username/repository-name.git<br/>
                      <br/>
                      # Navigate to the repository folder<br/>
                      cd repository-name<br/>
                      <br/>
                      # Add the original repository as an upstream remote<br/>
                      git remote add upstream https://github.com/original-owner/repository-name.git
                    </code>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-heading text-primary-dark mb-2">Step 3: Create a Branch</h3>
                <div className="space-y-2 text-neutral-black">
                  <p>
                    Create a new branch for your changes. Use a descriptive name that reflects what you're working on.
                  </p>
                  <div className="bg-secondary-50 p-4 rounded-lg">
                    <code className="text-primary">
                      # Create a new branch<br/>
                      git checkout -b fix-login-button<br/>
                      <br/>
                      # Make sure you're on the new branch<br/>
                      git status
                    </code>
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-heading text-primary-dark mb-2">Step 4: Make Your Changes</h3>
                <div className="space-y-2 text-neutral-black">
                  <p>
                    Make the changes you want to contribute. Follow the project's code style and guidelines.
                    Test your changes to make sure they work as expected.
                  </p>
                  <div className="bg-secondary-50 p-4 rounded-lg">
                    <code className="text-primary">
                      # Check what files you've modified<br/>
                      git status<br/>
                      <br/>
                      # Add your changes<br/>
                      git add file-you-changed.js<br/>
                      <br/>
                      # Commit your changes with a descriptive message<br/>
                      git commit -m "Fix login button styling"
                    </code>
                  </div>
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-heading text-primary-dark mb-2">Step 5: Push Your Changes</h3>
                <div className="space-y-2 text-neutral-black">
                  <p>
                    Push your changes to your forked repository on GitHub.
                  </p>
                  <div className="bg-secondary-50 p-4 rounded-lg">
                    <code className="text-primary">
                      # Push your branch to your fork<br/>
                      git push origin fix-login-button
                    </code>
                  </div>
                </div>
              </div>
              
              {/* Step 6 */}
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-heading text-primary-dark mb-2">Step 6: Create a Pull Request</h3>
                <div className="space-y-2 text-neutral-black">
                  <p>
                    Go to the original repository on GitHub. You should see a prompt to create a new pull request
                    from your recently pushed branch. Click on it and fill out the pull request form.
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Provide a clear title that describes your changes</li>
                    <li>Add a detailed description of what you did and why</li>
                    <li>Reference any related issues (e.g., "Fixes #123")</li>
                    <li>Follow any pull request templates provided by the project</li>
                  </ul>
                </div>
              </div>
              
              {/* Step 7 */}
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-heading text-primary-dark mb-2">Step 7: Address Feedback</h3>
                <div className="space-y-2 text-neutral-black">
                  <p>
                    Maintainers may ask you to make changes to your pull request. This is normal and part of the
                    collaboration process. Respond to their comments, make the requested changes, and push them
                    to your branch.
                  </p>
                  <div className="bg-secondary-50 p-4 rounded-lg">
                    <code className="text-primary">
                      # After making the requested changes<br/>
                      git add file-you-changed.js<br/>
                      git commit -m "Address feedback from PR review"<br/>
                      git push origin fix-login-button
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Best Practices */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-heading text-primary mb-4">Best Practices for Contributors</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-secondary-50 p-4 rounded-lg">
                <h3 className="text-lg font-heading text-primary mb-2">Before Contributing</h3>
                <ul className="list-disc pl-5 space-y-1 text-neutral-black">
                  <li>Read the project's README and CONTRIBUTING guides</li>
                  <li>Understand the project's code of conduct</li>
                  <li>Search for existing issues or pull requests similar to yours</li>
                  <li>Start small with simple fixes or improvements</li>
                  <li>Join the project's communication channels (Discord, Slack, etc.)</li>
                </ul>
              </div>
              <div className="bg-secondary-50 p-4 rounded-lg">
                <h3 className="text-lg font-heading text-primary mb-2">During Contribution</h3>
                <ul className="list-disc pl-5 space-y-1 text-neutral-black">
                  <li>Keep pull requests focused on a single issue or feature</li>
                  <li>Write clear commit messages</li>
                  <li>Follow the project's coding style and conventions</li>
                  <li>Test your changes thoroughly</li>
                  <li>Be responsive to feedback</li>
                  <li>Be patient - maintainers are often volunteers</li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* Final CTA */}
          <section className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-8 text-neutral-white">
            <h2 className="text-2xl font-heading mb-4">Ready to Start Contributing?</h2>
            <p className="mb-6">
              Now that you know the basics, it's time to find your first project and make your contribution!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/search">
                <Button variant="accent" size="lg">
                  Find a Project
                </Button>
              </Link>
              <a href="https://github.com/topics/good-first-issue" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="bg-transparent border-neutral-white text-neutral-white hover:bg-white/10">
                  Explore Good First Issues
                </Button>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default GettingStartedPage;
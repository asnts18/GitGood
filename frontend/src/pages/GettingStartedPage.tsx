import React from 'react';
import Header from 'components/common/Header';
import { UI } from 'utils/constants';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/ButtonComponent';
import { 
  ArrowRight, 
  Github, 
  GitBranch, 
  Terminal, 
  Code, 
  GitPullRequest, 
  MessageSquare,
  BookOpen,
  CheckCircle
} from 'lucide-react';

import browseProj from '../images/browse-projects.png'
import forkButtonImg from '../images/github-fork-button.png';
import cloneRepoImg from '../images/github-clone-repo.png';
import createBranchImg from '../images/github-create-branch.png';
import commitChangesImg from '../images/github-commit-changes.png';
import pushChangesImg from '../images/github-push-changes.png';
import createPrImg from '../images/github-create-pr.png';
import prFeedbackImg from '../images/github-pr-feedback.png';

const IMAGES = {
    FORK_BUTTON: forkButtonImg,
    CLONE_REPO: cloneRepoImg,
    CREATE_BRANCH: createBranchImg,
    COMMIT_CHANGES: commitChangesImg,
    PUSH_CHANGES: pushChangesImg,
    CREATE_PR: createPrImg,
    PR_FEEDBACK: prFeedbackImg,
    BROWSE_PROJ:browseProj,
  };

const GettingStartedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-secondary-100">
      <Header />
      
      <main className={`${UI.MAX_WIDTH} mx-auto ${UI.DEFAULT_PADDING}`}>
        <div className="space-y-8 pb-12">
          {/* Hero Section with improved styling */}
          <div className="p-8 rounded-xl bg-gradient-to-r from-secondary-50 to-secondary-100 shadow-sm border border-secondary-200/40">
            <h1 className="text-3xl md:text-4xl font-heading text-primary mb-4">Getting Started with Open Source</h1>
            <p className="text-lg text-neutral-black max-w-3xl">
              Follow this visual guide to make your first open source contribution.
            </p>
          </div>
          
          {/* Introduction Section - Streamlined */}
          <section className="bg-white rounded-xl p-8 shadow-sm border border-secondary-200/30">
            <h2 className="text-2xl font-heading text-primary mb-6 flex items-center">
              <Github className="h-6 w-6 mr-2 text-primary-light" />
              Why Contribute to Open Source?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-secondary-50/70 p-5 rounded-lg border border-secondary-200/40 hover:shadow-md transition-all duration-300">
                <h3 className="font-heading text-primary-dark text-lg mb-2">Build Your Skills</h3>
                <p className="text-neutral-black text-sm">Improve your coding abilities by working on real-world projects with experienced developers.</p>
              </div>
              
              <div className="bg-secondary-50/70 p-5 rounded-lg border border-secondary-200/40 hover:shadow-md transition-all duration-300">
                <h3 className="font-heading text-primary-dark text-lg mb-2">Enhance Your Portfolio</h3>
                <p className="text-neutral-black text-sm">Showcase your work to potential employers and demonstrate your ability to collaborate.</p>
              </div>
              
              <div className="bg-secondary-50/70 p-5 rounded-lg border border-secondary-200/40 hover:shadow-md transition-all duration-300">
                <h3 className="font-heading text-primary-dark text-lg mb-2">Join the Community</h3>
                <p className="text-neutral-black text-sm">Connect with other developers, learn from peers, and give back to the software you use.</p>
              </div>
            </div>
          </section>
          
          {/* Step-by-Step Guide - With Images */}
          <section className="bg-white rounded-xl p-8 shadow-sm border border-secondary-200/30">
            <h2 className="text-2xl font-heading text-primary mb-6 flex items-center">
              <BookOpen className="h-6 w-6 mr-2 text-primary-light" />
              Step-by-Step Contribution Guide
            </h2>
            
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/2 space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md">1</div>
                      <h3 className="text-xl font-heading text-primary-dark ml-3">Find a Project</h3>
                    </div>
                    <p className="text-neutral-black ml-13">
                      Use GitGood to find beginner-friendly issues that match your skills and interests.
                    </p>
                    <div className="ml-13">
                      <Link to="/search">
                        <Button variant="accent" size="sm" className="group">
                          Search Projects
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 bg-secondary-50 p-2 rounded-lg border border-secondary-200/50 shadow-sm hover:shadow-md transition-all duration-300">
                    <img 
                      src={IMAGES.BROWSE_PROJ}
                      alt="GitGood project browser showing beginner-friendly issues"
                      className="w-full h-auto rounded shadow-inner"
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/2 space-y-4 md:order-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md">2</div>
                      <h3 className="text-xl font-heading text-primary-dark ml-3">Fork the Repository</h3>
                    </div>
                    <p className="text-neutral-black ml-13">
                      Find the "Fork" button at the top-right of the GitHub repository page to create your own copy.
                    </p>
                  </div>
                  
                  <div className="md:w-1/2 bg-secondary-50 p-2 rounded-lg border border-secondary-200/50 shadow-sm hover:shadow-md transition-all duration-300 md:order-1">
                    <img 
                      src={IMAGES.FORK_BUTTON}
                      alt="GitHub fork button location"
                      className="w-full h-auto rounded shadow-inner"
                    />
                    <div className="mt-2 p-3 bg-secondary-200/30 rounded text-sm text-primary-dark">
                      <Terminal className="inline-block h-4 w-4 mr-1" />
                      <code>git clone https://github.com/your-username/repository-name.git</code>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/2 space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md">3</div>
                      <h3 className="text-xl font-heading text-primary-dark ml-3">Create a Branch</h3>
                    </div>
                    <p className="text-neutral-black ml-13">
                      Create a new branch with a descriptive name for your changes.
                    </p>
                  </div>
                  
                  <div className="md:w-1/2 bg-secondary-50 p-2 rounded-lg border border-secondary-200/50 shadow-sm hover:shadow-md transition-all duration-300">
                    <img 
                      src={IMAGES.CREATE_BRANCH}
                      alt="GitHub create branch interface"
                      className="w-full h-auto rounded shadow-inner"
                    />
                    <div className="mt-2 p-3 bg-secondary-200/30 rounded text-sm text-primary-dark">
                      <GitBranch className="inline-block h-4 w-4 mr-1" />
                      <code>git checkout -b fix-login-button</code>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/2 space-y-4 md:order-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md">4</div>
                      <h3 className="text-xl font-heading text-primary-dark ml-3">Make Changes</h3>
                    </div>
                    <p className="text-neutral-black ml-13">
                      Edit files to make your changes, following the project's coding style.
                    </p>
                  </div>
                  
                  <div className="md:w-1/2 bg-secondary-50 p-2 rounded-lg border border-secondary-200/50 shadow-sm hover:shadow-md transition-all duration-300 md:order-1">
                    <img 
                      src={IMAGES.COMMIT_CHANGES}
                      alt="GitHub committing changes interface"
                      className="w-full h-auto rounded shadow-inner"
                    />
                    <div className="mt-2 p-3 bg-secondary-200/30 rounded text-sm text-primary-dark">
                      <Code className="inline-block h-4 w-4 mr-1" />
                      <code>git add file-you-changed.js</code><br/>
                      <code>git commit -m "Fix login button styling"</code>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/2 space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md">5</div>
                      <h3 className="text-xl font-heading text-primary-dark ml-3">Push Changes</h3>
                    </div>
                    <p className="text-neutral-black ml-13">
                      Push your changes to your forked repository on GitHub.
                    </p>
                  </div>
                  
                  <div className="md:w-1/2 bg-secondary-50 p-2 rounded-lg border border-secondary-200/50 shadow-sm hover:shadow-md transition-all duration-300">
                    <img 
                      src={IMAGES.PUSH_CHANGES}
                      alt="GitHub pushing changes interface"
                      className="w-full h-auto rounded shadow-inner"
                    />
                    <div className="mt-2 p-3 bg-secondary-200/30 rounded text-sm text-primary-dark">
                      <Terminal className="inline-block h-4 w-4 mr-1" />
                      <code>git push origin fix-login-button</code>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 6 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/2 space-y-4 md:order-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md">6</div>
                      <h3 className="text-xl font-heading text-primary-dark ml-3">Create a Pull Request</h3>
                    </div>
                    <p className="text-neutral-black ml-13">
                      Submit your changes to the original project by creating a pull request.
                    </p>
                    <ul className="ml-13 text-sm text-neutral-black space-y-1 list-disc pl-5">
                      <li>Use a clear title describing your changes</li>
                      <li>Reference related issues (e.g., "Fixes #123")</li>
                      <li>Follow the project's pull request template</li>
                    </ul>
                  </div>
                  
                  <div className="md:w-1/2 bg-secondary-50 p-2 rounded-lg border border-secondary-200/50 shadow-sm hover:shadow-md transition-all duration-300 md:order-1">
                    <img 
                      src={IMAGES.CREATE_PR}
                      alt="GitHub create pull request interface"
                      className="w-full h-auto rounded shadow-inner"
                    />
                    <div className="mt-2 p-3 bg-secondary-200/30 rounded text-sm text-primary-dark flex items-start">
                      <GitPullRequest className="h-4 w-4 mr-1 mt-1 flex-shrink-0" />
                      <span>Look for the "Compare & pull request" button that appears at the top of your repository page after pushing changes</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 7 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/2 space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md">7</div>
                      <h3 className="text-xl font-heading text-primary-dark ml-3">Address Feedback</h3>
                    </div>
                    <p className="text-neutral-black ml-13">
                      Respond to reviewer comments and make requested changes.
                    </p>
                  </div>
                  
                  <div className="md:w-1/2 bg-secondary-50 p-2 rounded-lg border border-secondary-200/50 shadow-sm hover:shadow-md transition-all duration-300">
                    <img 
                      src={IMAGES.PR_FEEDBACK}
                      alt="GitHub pull request review interface"
                      className="w-full h-auto rounded shadow-inner"
                    />
                    <div className="mt-2 p-3 bg-secondary-200/30 rounded text-sm text-primary-dark flex items-start">
                      <MessageSquare className="h-4 w-4 mr-1 mt-1 flex-shrink-0" />
                      <span>Make new commits to address feedback, then push to the same branch - your PR will update automatically</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Best Practices - More Visual */}
          <section className="bg-white rounded-xl p-8 shadow-sm border border-secondary-200/30">
            <h2 className="text-2xl font-heading text-primary mb-6">Best Practices</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 p-6 rounded-xl border border-secondary-200/40 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-heading text-primary mb-3 pb-2 border-b border-secondary-200/50">Before Contributing</h3>
                <ul className="space-y-2 text-neutral-black">
                  {[
                    "Read the project's README and CONTRIBUTING guides",
                    "Understand the project's code of conduct",
                    "Search for existing issues or PRs similar to yours",
                    "Start small with simple fixes or improvements",
                    "Join the project's communication channels"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 p-6 rounded-xl border border-secondary-200/40 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-heading text-primary mb-3 pb-2 border-b border-secondary-200/50">During Contribution</h3>
                <ul className="space-y-2 text-neutral-black">
                  {[
                    "Keep pull requests focused on a single issue or feature",
                    "Write clear commit messages",
                    "Follow the project's coding style and conventions",
                    "Test your changes thoroughly",
                    "Be responsive to feedback and be patient"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          
          {/* Final CTA */}
          <section className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-8 text-neutral-white shadow-md">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl font-heading mb-4">Ready to Start Contributing?</h2>
                <p className="mb-6 text-neutral-white/90">
                  Now that you know the process, it's time to find your first project and make your contribution!
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/search">
                    <Button variant="accent" size="lg" className="group">
                      Find a Project
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <a href="https://github.com/topics/good-first-issue" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg" className="bg-transparent border-neutral-white text-neutral-white hover:bg-white/10 group">
                      <Github className="mr-2 h-4 w-4" />
                      Explore Good First Issues
                    </Button>
                  </a>
                </div>
              </div>
              
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                  <img 
                    src="/images/contribution-success.png" 
                    alt="Successful GitHub contribution" 
                    className="w-full h-auto rounded shadow-md"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default GettingStartedPage;
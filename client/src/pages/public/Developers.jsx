import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiInstagram, FiCode, FiGitCommit, FiUsers, FiStar } from 'react-icons/fi';
import SectionHeading from '../../components/SectionHeading';

const GITHUB_USERNAME = 'anikeshroyy';
const GITHUB_REPO = `${GITHUB_USERNAME}/aarambhgecjamui`;

const Developers = () => {
  const [profile, setProfile] = useState({
    name: 'Anikesh Roy',
    bio: 'Crafting digital excellence with code and creativity.',
    avatar: '',
    htmlUrl: `https://github.com/${GITHUB_USERNAME}`,
    location: '',
    publicRepos: '—',
    followers: '—',
  });

  const [repoStats, setRepoStats] = useState({
    commits: '—',
    contributors: '—',
    stars: '—',
    linesOfCode: '12K+',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch GitHub user profile
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const userData = await userRes.json();
        if (userData.login) {
          setProfile({
            name: userData.name || userData.login,
            bio: userData.bio || 'Crafting digital excellence with code and creativity.',
            avatar: userData.avatar_url || '',
            htmlUrl: userData.html_url || `https://github.com/${GITHUB_USERNAME}`,
            location: userData.location || '',
            publicRepos: userData.public_repos?.toString() || '—',
            followers: userData.followers?.toString() || '—',
          });
        }

        // Fetch repo info (stars)
        const repoRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`);
        const repoData = await repoRes.json();
        
        // Fetch contributors
        const contribRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contributors?per_page=100`);
        const contribData = await contribRes.json();

        // Fetch commit count from default branch
        const commitsRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/commits?per_page=1`);
        let commitCount = '100+';
        const linkHeader = commitsRes.headers.get('Link');
        if (linkHeader) {
          const match = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (match) commitCount = match[1];
        }

        setRepoStats({
          commits: commitCount,
          contributors: Array.isArray(contribData) ? contribData.length.toString() : '1',
          stars: repoData.stargazers_count?.toString() || '0',
          linesOfCode: '12K+',
        });
      } catch (err) {
        console.error('Failed to fetch GitHub data:', err);
      }
    };

    fetchData();
  }, []);

  const devStats = [
    { label: 'Total Commits', value: repoStats.commits, icon: <FiGitCommit />, color: 'purple' },
    { label: 'Contributors', value: repoStats.contributors, icon: <FiUsers />, color: 'blue' },
    { label: 'GitHub Stars', value: repoStats.stars, icon: <FiStar />, color: 'green' },
    { label: 'Lines of Code', value: repoStats.linesOfCode, icon: <FiCode />, color: 'primary' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300 py-24 overflow-hidden relative">
      {/* Background Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] -ml-48 -mb-48" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <SectionHeading 
            title="The Developer" 
            subtitle="Meet the mind behind the digital experience of Aarambh 3.0."
            centered
          />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
            {/* Developer Profile Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-white dark:bg-dark-card rounded-[40px] shadow-2xl border border-gray-100 dark:border-dark-border overflow-hidden sticky top-32">
                <div className="h-32 bg-gradient-to-r from-primary to-yellow-500" />
                <div className="px-8 pb-10 text-center -mt-16">
                  <div className="w-32 h-32 rounded-3xl border-4 border-white dark:border-dark-card bg-gray-200 mx-auto overflow-hidden shadow-xl mb-6 relative group">
                    {profile.avatar ? (
                      <img 
                        src={profile.avatar} 
                        alt={profile.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/30 to-yellow-500/30 flex items-center justify-center">
                        <FiGithub className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-3xl font-display font-black text-gray-900 dark:text-white mb-2">{profile.name}</h3>
                  <p className="text-primary font-bold tracking-widest text-xs uppercase mb-6">Lead Developer & UI/UX Architect</p>
                  
                  <p className="text-gray-500 dark:text-gray-400 font-light mb-8 leading-relaxed">
                    {profile.bio}
                  </p>

                  <div className="flex justify-center gap-4">
                    {[
                      { icon: <FiLinkedin />, link: 'https://linkedin.com/' },
                      { icon: <FiInstagram />, link: 'https://instagram.com/' },
                      { icon: <FiGithub />, link: `https://github.com/anikeshroyy` }
                    ].map((item, idx) => (
                      <motion.a 
                        key={idx}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, scale: 1.1 }}
                        className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors border border-transparent hover:border-primary/20"
                      >
                        {item.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="lg:col-span-2 space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {devStats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 rounded-[32px] bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-lg group hover:border-primary/30 transition-all"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-500 mb-6 group-hover:scale-110 transition-transform`}>
                      {stat.icon}
                    </div>
                    <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{stat.label}</h4>
                    <p className="text-4xl font-display font-black text-gray-900 dark:text-white tracking-tight">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* GitHub Repo Link Card */}
              <motion.a
                href={`https://github.com/${GITHUB_REPO}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="block bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-dark-card rounded-[40px] border border-gray-700 dark:border-dark-border shadow-xl overflow-hidden p-10 text-center group"
              >
                <FiGithub className="w-12 h-12 text-white/60 mx-auto mb-4 group-hover:text-primary transition-colors" />
                <h3 className="text-2xl font-display font-bold text-white mb-2">View Source Code</h3>
                <p className="text-gray-400 text-sm mb-4">github.com/{GITHUB_REPO}</p>
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full text-sm font-bold group-hover:bg-primary group-hover:text-white transition-all">
                  <FiGithub className="w-4 h-4" /> Open Repository
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;

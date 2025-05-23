import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="mb-8">
                <motion.img
                  src="https://avatars.githubusercontent.com/u/135146527"
                  alt="JaeTheTech"
                  className="w-32 h-32 rounded-full mx-auto shadow-xl border-4 border-white dark:border-gray-800"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                />
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  JaeTheTech
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                A passionate Full Stack Developer specializing in creating dynamic web applications
              </p>

              <div className="flex justify-center space-x-6 mb-12">
                <motion.a
                  href="https://github.com/JaeTheTech"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400"
                >
                  <FaGithub className="w-8 h-8" />
                </motion.a>
                <motion.a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  <FaLinkedin className="w-8 h-8" />
                </motion.a>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects"
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
                >
                  View My Projects
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="px-8 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-all"
                >
                  Get in Touch
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Projects */}
        <section id="projects" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Project cards will be added dynamically */}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">Skills & Technologies</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <SkillCard icon={FaCode} name="JavaScript" />
                <SkillCard icon={FaCode} name="Python" />
                <SkillCard icon={FaCode} name="React" />
                <SkillCard icon={FaCode} name="Node.js" />
                <SkillCard icon={FaCode} name="HTML/CSS" />
                <SkillCard icon={FaCode} name="Git" />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

const SkillCard = ({ icon: Icon, name }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md text-center"
  >
    <Icon className="w-8 h-8 mx-auto mb-2 text-purple-500" />
    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{name}</p>
  </motion.div>
);
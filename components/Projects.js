import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function Projects({ projects }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {project.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 h-20 overflow-hidden">
              {project.description || 'No description available'}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.topics?.map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
                {project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    <FaExternalLinkAlt className="w-5 h-5" />
                  </a>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <span>⭐ {project.stargazers_count}</span>
                <span>🔄 {project.forks_count}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
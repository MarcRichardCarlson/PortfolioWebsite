import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

interface Project {
  title: string;
  description: string;
  image: StaticImageData | string;
  tag: {
    text: string;
    color: string;
  };
}

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-6 md:px-8">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          className="flex flex-col overflow-hidden cursor-pointer rounded-3xl bg-light-grey dark:bg-dark-grey shadow-lg hover:shadow-xl transition-shadow duration-300"
          whileHover={{ scale: 1.02 }} // Subtle hover scaling
          whileTap={{ scale: 0.98 }} // Press-down effect
        >
          {/* Project Image */}
          <div className="relative w-full h-64 sm:h-96 md:h-64 lg:h-96 overflow-hidden rounded-t-3xl">
            <Image
              src={project.image}
              alt={project.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Project Content */}
          <div className="p-6 flex flex-col gap-4">
            {/* Title and Tag */}
            <div className="flex flex-wrap gap-4 lg:flex-row justify-between items-start lg:items-center">
              <h3 className="text-xl font-semibold text-black dark:text-white whitespace-nowrap">
                {project.title}
              </h3>
              <span
                className="mt-2 lg:mt-0 py-1 px-3 text-xs font-semibold rounded-full whitespace-nowrap"
                style={{
                  color: project.tag.color,
                  backgroundColor: `${project.tag.color}33`, // Transparent background
                }}
              >
                {project.tag.text}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {project.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Projects;

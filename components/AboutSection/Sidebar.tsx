"use client";

import React from 'react';
import { motion } from 'framer-motion';

const techStacks: string[] = [
    'UI/UX Design',
    'Responsive Design',
    'WireFraming',
    'Figma',
    'WordPress',
    'Next.JS',
    'TypeScript',
    'JavaScript',
    'React.JS',
    'Tailwind CSS',
    'HTML',
    'CSS/SASS',
    'Bootstrap',
    'Framer Motion',
    'Node.js',
    'Express.JS',
    'MongoDB',
    'Vercel',
    'NoSQL',
    'Cloudflare',
    'Azure',
    'Firebase',
    'Postman',
    'Git / GitHub',
];

// Function to split array into 4 columns
const splitIntoColumns = (arr: string[], columns: number): string[][] => {
    const perColumn = Math.ceil(arr.length / columns);
    return Array.from({ length: columns }, (_, i) =>
        arr.slice(i * perColumn, i * perColumn + perColumn)
    );
};

const columns = splitIntoColumns(techStacks, 4);

interface SidebarProps {
    columnNames: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ columnNames }) => {
    return (
    <div className="flex flex-col gap-8 min-w-64 max-w-full h-fit p-0 md:p-6 rounded-lg">
      <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-black'>Skills
        <span className='text-indigo-700'>.</span>
      </h2>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
          {columns.map((column, colIndex) => (
              <div key={colIndex}>
                  <h3 className="text-black font-extrabold text-2xl mb-4">{columnNames[colIndex]}</h3>
                  {column.map((tech, index) => (
                      <motion.div
                          key={tech}
                          className="flex flex-col gap-2 text-neutral-800 text-lg font-inter"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.3 }}
                      >
                          {tech}
                      </motion.div>
                  ))}
              </div>
          ))}
      </div>
    </div>
    );
};

export default Sidebar;

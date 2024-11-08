import React from 'react';
import CircularProgress from './CircularProgress';

const skills = [
  { name: 'Nature & Wild', level: 71 },
  { name: 'Art & Design', level: 46 },
  { name: 'Tech Trends', level: 52 },
  { name: 'Traveling', level: 100 },
  { name: 'Music & Audio', level: 93 },
];

const SkillDashboard: React.FC = () => {
  return (
    <div className='px-4 sm:px-6 md:px-8'>
      <div className='flex flex-col gap-10 border-t border-b py-12'>
        <h3 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white-grey'>
          What Inspires Me
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:flex lg:flex-row lg:justify-between items-center gap-4">
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-row md:flex-col items-center justify-start xl:justify-center gap-4 m-0 p-0">
              <CircularProgress value={skill.level} text={`${skill.level}%`} size={120} />
              <p className="text-white text-sm lg:text-lg font-targa">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillDashboard;

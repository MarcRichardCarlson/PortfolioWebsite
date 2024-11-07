import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const skills = [
  { name: 'Nature & Outdoors', level: 71 },
  { name: 'Art & Design', level: 46 },
  { name: 'Tech Trends', level: 52 },
  { name: 'Traveling', level: 100 },
  { name: 'Music & Soundscapes', level: 93 },
];

const SkillDashboard: React.FC = () => {
  return (
    <div className='px-4 sm:px-6 md:px-8'>
      <div className='flex flex-col gap-10 border-t border-b py-12'>
        <h3 className='text-3xl font-bold font-targa text-white'>What Inspires Me</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:flex lg:flex-row lg:justify-between items-center gap-4">
        {skills.map((skill) => (
            <div className='grid grid-cols-2 md:grid-cols-2 lg:flex lg:flex-col lg:justify-between items-center gap-4 whitespace-nowrap m-0 p-0'>
              <div className="flex flex-col justify-center items-center gap-2 h-24 lg:h-36 xl:h-48" key={skill.name}>
                <CircularProgressbar
                  value={skill.level}
                  text={`${skill.level}%`}
                  styles={buildStyles({
                    textColor: 'white',
                    pathColor: '#4ade80',
                    trailColor: '#fff',
                  })}
                />
              </div>
                <p className="text-white text-sm lg:text-lg font-targa">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillDashboard;

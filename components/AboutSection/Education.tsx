import React from 'react';

const Education: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-black'>Education
        <span className='text-indigo-700'>.</span>
      </h2>
      <div className='flex flex-col md:flex-row md:justify-between gap-2 md:gap-4'>
        <div className="flex flex-col gap-2 rounded-lg bg-neutral-200 border-2 border-neutral-300 p-4 md:w-1/2">
          <h2 className="text-2xl font-bold text-black">KYH Liljeholmen -  
            <span className='text-indigo-700'>Stockholm</span></h2>
          <p className="text-neutral-600 font-semibold">Vocational Higher Education Diploma specializing in Front End Development. This diploma comprises a total of 405 YH credits.</p>
        </div>
        <div className="flex flex-col gap-2 rounded-lg bg-neutral-200 border-2 border-neutral-300 p-4 md:w-1/2">
          <h2 className="text-2xl font-bold text-black">NTI -  
            <span className='text-indigo-700'>Stockholm</span></h2>
          <p className="text-neutral-600 font-semibold">Vocational training in C# programming and computer and network technology. This training program covered a total of 250 study hours.</p>
        </div>
      </div>
    </div>
  );
}

export default Education;

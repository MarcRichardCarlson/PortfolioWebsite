import React from 'react';

interface CircularProgressProps {
  value: number;
  text: string;
  size?: number; // Size of the circular progress bar
  strokeWidth?: number; // Width of the stroke
  pathColor?: string; // Color of the progress path
  trailColor?: string; // Color of the trail
  textColor?: string; // Color of the text
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  text,
  size = 100,
  strokeWidth = 8,
  pathColor = '#4ade80',
  trailColor = 'rgba(255, 255, 255, 0.9) dark:rgba(255, 255, 255, 0.2)',
  textColor = 'text-black dark:text-white-grey',
}) => {
  // Calculate the radius and circumference
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="circular-progress">
      {/* Trail circle (background) */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={trailColor}
        strokeWidth={strokeWidth}
        style={{
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
        }}
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={pathColor}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
          transition: 'stroke-dashoffset 0.5s ease',
        }}
      />
      {/* Center text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill={textColor}
        fontSize={size / 8}
        fontWeight="bold"
      >
        {text}
      </text>
    </svg>
  );
};

export default CircularProgress;

import React from 'react';

interface TagProps {
  text: string;
  onRemove: () => void;
}

const Tag: React.FC<TagProps> = ({ text, onRemove }) => {
  return (
    <div className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      {text}
      <button onClick={onRemove} className="ml-2 bg-gray-400 rounded-full px-2 py-1 text-xs text-white">x</button>
    </div>
  );
};

export default Tag;
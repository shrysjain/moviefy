import React from 'react';

interface SoundtrackListProps {
  soundtrack: string[];
}

const SoundtrackList: React.FC<SoundtrackListProps> = ({ soundtrack }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Soundtrack</h2>
      <ul className="list-disc pl-8">
        {soundtrack.map((song, index) => (
          <li key={index} className="mb-2">{song}</li>
        ))}
      </ul>
    </div>
  );
};

export default SoundtrackList;

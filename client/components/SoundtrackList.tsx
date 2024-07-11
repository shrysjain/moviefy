import React from 'react';

interface Song {
  id: string;
  title: string;
  artist: string;
}

interface SoundtrackListProps {
  songs: Song[];
}

const SoundtrackList: React.FC<SoundtrackListProps> = ({ songs }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-2">Soundtrack</h2>
      <ul className="divide-y divide-gray-200">
        {songs.map((song) => (
          <li key={song.id} className="py-2">
            <p className="text-gray-800">{song.title} - {song.artist}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SoundtrackList;
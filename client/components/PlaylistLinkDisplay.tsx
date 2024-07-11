import React from 'react';

interface PlaylistLinkDisplayProps {
  playlistLink: string;
}

const PlaylistLinkDisplay: React.FC<PlaylistLinkDisplayProps> = ({ playlistLink }) => {
  return (
    <div className="mt-8">
      <p className="text-xl font-semibold mb-4">Playlist Created!</p>
      <a
        href={playlistLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {playlistLink}
      </a>
    </div>
  );
};

export default PlaylistLinkDisplay;

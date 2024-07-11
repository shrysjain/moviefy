import React from 'react';

interface PlaylistLinkDisplayProps {
  playlistLink: string;
}

const PlaylistLinkDisplay: React.FC<PlaylistLinkDisplayProps> = ({ playlistLink }) => {
  return (
    <div className="mt-4">
      <p className="text-lg font-bold">Your Spotify Playlist:</p>
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
import React from 'react';

interface PlaylistInfo {
  name: string;
  description: string;
  coverArt: string;
  link: string;
}

interface PlaylistModalProps {
  playlistInfo: PlaylistInfo;
  onClose: () => void;
}

const PlaylistModal: React.FC<PlaylistModalProps> = ({ playlistInfo, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Playlist Created!</h2>
        <img src={playlistInfo.coverArt} alt="Cover Art" className="w-32 h-32 mb-4" />
        <p className="mb-2"><strong>Name:</strong> {playlistInfo.name}</p>
        <p className="mb-2"><strong>Description:</strong> {playlistInfo.description}</p>
        <a href={playlistInfo.link} target="_blank" className="text-blue-500 underline">Open Playlist on Spotify</a>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PlaylistModal;

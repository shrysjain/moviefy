import React from 'react';

interface CreatePlaylistButtonProps {
  onCreatePlaylist: () => void;
}

const CreatePlaylistButton: React.FC<CreatePlaylistButtonProps> = ({ onCreatePlaylist }) => {
  return (
    <div className="mt-4">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
        onClick={onCreatePlaylist}
      >
        Create Playlist
      </button>
    </div>
  );
};

export default CreatePlaylistButton;

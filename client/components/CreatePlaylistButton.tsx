import React from 'react';

interface CreatePlaylistButtonProps {
  onClick: () => void;
}

const CreatePlaylistButton: React.FC<CreatePlaylistButtonProps> = ({ onClick }) => {
  return (
    <div className="mt-4">
      <button
        onClick={onClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Create Playlist
      </button>
    </div>
  );
};

export default CreatePlaylistButton;
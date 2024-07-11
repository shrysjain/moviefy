# Moviefy 🎥🎵

Moviefy is a web application that allows users to search for movies and automatically generate a Spotify playlist with the movie's soundtrack. The application leverages the OMDb and TMDb APIs for movie data and the Spotify API for creating playlists.

## Key Features

- **Integrated Client/Server**: Seamless communication between the React/Next.js frontend and Node.js/Express backend.
- **Working Endpoints**: Fully functional endpoints for searching movies and handling Spotify authentication.
- **Movie Searching**: Search for movies using the OMDb API & JSON queries.
- **Spotify OAuth**: Authenticate with Spotify to create and manage playlists.

## Work In Progress Features

- **Fetching Soundtrack**: Retrieve the soundtrack of a movie (currently a work in progress).
- **Creating Playlist**: Automatically create a Spotify playlist with the retrieved soundtrack (currently a work in progress).

## Built With

- **Client**: React, Next.js, TypeScript, TailwindCSS, DaisyUI, Axios
- **Server**: Node.js, Express, Axios, dotenv, cors
- **APIs**: OMDb API, TMDb API, Spotify Web API

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js and npm installed on your machine
- Spotify Developer Account for creating and managing apps
- OMDb API key
- TMDb API key

### Installation

1. **Clone the Repository**:

```bash
git clone https://github.com/shrysjain/moviefy.git
cd moviefy
```

*Alternatively, clone via SSH, the GitHub CLI, or GitHub desktop*

2. **Set up the client**:

```bash
cd client
npm install
```

3. **Set up the server**:

```bash
cd ../server
npm install
```

4. **Configure environmental variables**:

Create a file at `server/.env`....

```env
PORT=3001
SESSION_SECRET=<randomized string>
SPOTIFY_CLIENT=<spotify application client id>
SPOTIFY_CLIENT_SECRET=<spotify application client secret token>
OMDB_API_KEY=
TMDB_API_KEY=
```

### Running the Application

1. **Start the server**:

```sh
cd server
npm start
```

2. **Start the server**:

```sh
cd ../client
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000` to access Moviefy.

## Contributing

1. Fork the repository

2. Create your feature branch

```bash
git checkout -b feature/your-feature
```

1. Commit your changes

2. Push to the branch

```bash
git push origin feature/your-feature
```

5. Open a pull request

## Licensing

This project is licensed under the MIT license - see the [LICENSE](./LICENSE) file for details.

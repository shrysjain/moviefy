import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Moviefy</title>
        <meta name="description" content="Create Spotify playlists from movie soundtracks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center">
        <h1 className="text-5xl font-bold text-green-600">
          Welcome to Moviefy
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Search for any movie and automagically generate a Spotify playlist from its soundtrack.
        </p>
      </main>
    </div>
  )
}

/* eslint-disable @typescript-eslint/no-require-imports */
const fw = require('fs/promises');

const titles = [
  "Harry Potter",
  "Avatar Fire and Ash",
  "Superman 2025",
  "Avengers Doomsday",
  "The Batman Part II",
  "Stranger Things",
  "The Last of Us",
  "Deadpool Wolverine",
  "Joker Folie",
  "Gladiator II",
  "Dune Part Two",
  "Oppenheimer",
  "Moana 2",
  "Sonic 3",
  "Spider-Man Across the Spider-Verse",
  "Avengers Endgame",
  "Interstellar",
  "Titanic",
  "The Lion King",
  "Breaking Bad",
  "House of the Dragon",
  "Squid Game",
  "Wednesday",
  "The Boys",
  "Fallout",
  "One Piece",
  "Game of Thrones",
  "Vikings",
  "The Walking Dead",
  "The Bear",
  "Succession"
];

async function fetchPoster(title) {
  try {
    const res = await fetch(`https://www.themoviedb.org/search?query=${encodeURIComponent(title)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });
    if (!res.ok) return null;
    const html = await res.text();
    const match = html.match(/\/t\/p\/w[0-9]+_and_h[0-9]+_bestv2(\/[^"]+\.jpg)/);
    if (match && match[1]) {
      return `https://image.tmdb.org/t/p/w500${match[1]}`;
    }
  } catch (e) {
    console.error(`Error fetching ${title}:`, e);
  }
  return null;
}

async function run() {
  const results = [];
  for (const title of titles) {
    const url = await fetchPoster(title);
    results.push({ title, url });
    // Be nice to the server
    await new Promise(r => setTimeout(r, 200));
  }
  await fw.writeFile('posters.json', JSON.stringify(results, null, 2));
  console.log('Done mapping posters!');
}

run();

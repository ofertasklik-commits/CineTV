/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

const titles = [
  'Harry Potter a serie hbo',
  'Avatar Fogo e Cinzas',
  'Superman 2025',
  'Vingadores Doomsday',
  'Batman Parte 2',
  'Stranger Things 5',
  'The Last of Us Serie',
  'Deadpool e Wolverine',
  'Coringa Delirio a Dois',
  'Gladiador 2',
  'Duna Parte 2',
  'Oppenheimer',
  'Moana 2',
  'Sonic 3',
  'Homem-Aranha Através do Aranhaverso',
  'Vingadores Ultimato',
  'Interestelar',
  'Titanic',
  'O Rei Leao',
  'Breaking Bad',
  'A Casa do Dragao',
  'Round 6',
  'Wandinha',
  'The Boys',
  'Fallout serie',
  'One Piece A Serie',
  'Game of Thrones',
  'Vikings',
  'The Walking Dead',
  'O Urso',
  'Succession'
];

async function run() {
  const results = [];
  for (const t of titles) {
    try {
      const res = await fetch('https://www.adorocinema.com/busca/?q=' + encodeURIComponent(t), {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      const html = await res.text();
      const match = html.match(/src="([^"]+br\.web\.img[A-Za-z0-9\.\/]+pictures[A-Za-z0-9\.\/]+\.jpg)"/);
      let target = match ? match[1] : null;
      if (target) {
        // Upgrade resolution if it's a thumbnail
        target = target.replace(/c_[0-9]+_[0-9]+\//, '');
      }
      results.push({ title: t, url: target });
    } catch {
      results.push({ title: t, url: null });
    }
  }
  fs.writeFileSync('ac_posters.json', JSON.stringify(results, null, 2));
}
run();

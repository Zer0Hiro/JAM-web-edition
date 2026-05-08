import Footer from "./Footer";

import bachCode from "../assets/music/bach-toccata.jem?raw";
import bachCover from "../assets/music/bach-toccata.jpg";
import marioCode from "../assets/music/mario-theme.jem?raw";
import marioCover from "../assets/music/mario-theme.png";
import bloodyTearsCode from "../assets/music/bloody-tears.jem?raw";
import bloodyTearsCover from "../assets/music/bloody-tears.jpg";
import nirvanaCode from "../assets/music/smells-like-teen-spirit.jem?raw";
import nirvanaCover from "../assets/music/smells-like-teen-spirit.jpg";
import megalovaniaCode from "../assets/music/megalovania.jem?raw";
import megalovaniaCover from "../assets/music/megalovania.jpg";
import pacmanCode from "../assets/music/pacman-theme.jem?raw";
import pacmanCover from "../assets/music/pacman-theme.jpg";
import smokeCode from "../assets/music/smoke-on-the-water.jem?raw";
import smokeCover from "../assets/music/smoke-on-the-water.jpg";
import harryPotterCode from "../assets/music/harry-potter-theme.jem?raw";
import harryPotterCover from "../assets/music/harry-potter-theme.jpg";

function dedent(str) {
  const lines = str.replace(/\r\n/g, "\n").split("\n");
  const nonEmpty = lines.filter((l) => l.trim().length > 0);
  if (nonEmpty.length === 0) return str;
  const minIndent = Math.min(...nonEmpty.map((l) => l.match(/^(\s*)/)[1].length));
  if (minIndent === 0) return str.replace(/\r\n/g, "\n");
  return lines.map((l) => l.slice(minIndent)).join("\n");
}

const tracks = [
  {
    id: "bach-toccata",
    title: "Toccata and Fugue in D Minor",
    artist: "Johann Sebastian Bach",
    cover: bachCover,
    code: dedent(bachCode),
    accent: "var(--color-accent-cyan)",
  },
  {
    id: "mario-theme",
    title: "Super Mario Bros. Theme",
    artist: "Koji Kondo",
    cover: marioCover,
    code: dedent(marioCode),
    accent: "var(--color-accent-magenta)",
  },
  {
    id: "bloody-tears",
    title: "Bloody Tears",
    artist: "Konami Kukeiha Club",
    cover: bloodyTearsCover,
    code: dedent(bloodyTearsCode),
    accent: "var(--color-accent-purple)",
  },
  {
    id: "smells-like-teen-spirit",
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    cover: nirvanaCover,
    code: dedent(nirvanaCode),
    accent: "var(--color-accent-orange)",
  },
  {
    id: "megalovania",
    title: "Megalovania",
    artist: "Toby Fox",
    cover: megalovaniaCover,
    code: dedent(megalovaniaCode),
    accent: "var(--color-accent-cyan)",
  },
  {
    id: "pacman-theme",
    title: "Pac-Man Theme",
    artist: "Toru Iwatani / Namco",
    cover: pacmanCover,
    code: dedent(pacmanCode),
    accent: "var(--color-accent-magenta)",
  },
  {
    id: "smoke-on-the-water",
    title: "Smoke on the Water",
    artist: "Deep Purple",
    cover: smokeCover,
    code: dedent(smokeCode),
    accent: "var(--color-accent-purple)",
  },
  {
    id: "harry-potter-theme",
    title: "Harry Potter Theme",
    artist: "John Williams",
    cover: harryPotterCover,
    code: dedent(harryPotterCode),
    accent: "var(--color-accent-cyan)",
  },
];

function TrackCard({ track, onOpen }) {
  return (
    <div
      className="group rounded-2xl border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
      style={{
        background: "linear-gradient(180deg, var(--color-bg-card), var(--color-bg-secondary))",
        borderColor: `${track.accent}55`,
        boxShadow: `0 0 18px ${track.accent}12`,
      }}
    >
      {/* Cover image — square */}
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={track.cover}
          alt={track.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* JEM badge */}
        <span
          className="absolute top-2 end-2 text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{
            background: "var(--color-bg-primary)",
            color: track.accent,
            border: `1px solid ${track.accent}55`,
          }}
        >
          JEM
        </span>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-sm font-bold text-[var(--color-text-primary)] leading-snug mb-0.5 line-clamp-2">
          {track.title}
        </h3>
        <p className="text-xs text-[var(--color-text-secondary)] mb-3">
          {track.artist}
        </p>

        <button
          type="button"
          onClick={() => onOpen(track.code)}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-bold text-white cursor-pointer border-0 transition-all duration-150 bg-orange-500 hover:bg-orange-400 hover:shadow-[0_0_12px_rgba(249,115,22,0.55)]"
        >
          Open in Editor
        </button>
      </div>
    </div>
  );
}

export default function MusicLibrary({ onOpenInEditor }) {
  return (
    <div
      className="pt-16 min-h-screen"
      style={{ background: "var(--color-bg-primary)" }}
    >
      <section className="relative px-4 py-16 overflow-hidden">
        {/* Decorative background */}
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(0,240,255,0.12) 0%, transparent 50%), radial-gradient(ellipse at 85% 30%, rgba(255,0,170,0.08) 0%, transparent 45%)",
          }}
        />

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/20 mb-5">
              Ready-made songs
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Music <span className="gradient-text">Library</span>
            </h1>

            <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
              Explore ready-made JEM songs and open their code in the editor.
            </p>
          </div>

          {/* Grid — 4 columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {tracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                onOpen={onOpenInEditor}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

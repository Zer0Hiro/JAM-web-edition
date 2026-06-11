import { Play, ArrowRight } from "lucide-react";
import Footer from "./Footer";
import PageHeader from "./PageHeader";
import useStaggerReveal from "../hooks/useStaggerReveal";

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
import bellWaltzCode from "../assets/music/bell-waltz.jem?raw";
import bellWaltzCover from "../assets/music/bell-waltz.svg";

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
  {
    id: "bell-waltz",
    title: "Bell Waltz in 3/4",
    artist: "JAM Original",
    cover: bellWaltzCover,
    code: dedent(bellWaltzCode),
    accent: "var(--color-accent-orange)",
  },
];

function TrackCard({ track, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(track.code)}
      className="track-card card-spotlight group w-full text-start rounded-2xl border overflow-hidden
                 cursor-pointer relative transition-all duration-300
                 bg-[var(--color-bg-card)] border-[var(--color-border)]
                 hover:-translate-y-1.5"
      style={{
        "--spot-color": `${track.accent}14`,
        "--track-accent": track.accent,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${track.accent}66`;
        e.currentTarget.style.boxShadow = `0 16px 40px -16px ${track.accent}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* Cover */}
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={track.cover}
          alt={track.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        {/* Bottom gradient so info reads over busy art */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{ background: "linear-gradient(to top, var(--color-bg-card), transparent)" }}
          aria-hidden="true"
        />
        {/* Play chip slides in on hover */}
        <span
          className="absolute bottom-2 end-2 inline-flex items-center justify-center w-9 h-9 rounded-full
                     opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                     transition-all duration-300"
          style={{
            background: track.accent,
            color: "var(--color-bg-primary)",
            boxShadow: `0 4px 16px ${track.accent}66`,
          }}
          aria-hidden="true"
        >
          <Play size={15} fill="currentColor" />
        </span>
        {/* Format tag */}
        <span
          className="absolute top-2 start-2 text-[10px] font-bold px-2 py-0.5 rounded-md tracking-widest"
          style={{
            fontFamily: "var(--font-mono)",
            background: "color-mix(in srgb, var(--color-bg-primary) 75%, transparent)",
            color: track.accent,
            border: `1px solid ${track.accent}44`,
            backdropFilter: "blur(6px)",
          }}
        >
          JEM
        </span>
      </div>

      {/* Info */}
      <div className="relative p-3.5">
        <h3 className="text-sm font-bold text-[var(--color-text-primary)] leading-snug mb-0.5 line-clamp-2">
          {track.title}
        </h3>
        <p
          className="text-[11px] text-[var(--color-text-muted)] mb-3 truncate"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {track.artist}
        </p>

        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
          style={{ color: track.accent }}
        >
          Open in Editor
          <ArrowRight
            size={13}
            className="rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
          />
        </span>
      </div>
    </button>
  );
}

export default function MusicLibrary({ onOpenInEditor }) {
  const gridRef = useStaggerReveal(".track-card", { y: 44, stagger: 0.06 });

  return (
    <div className="pt-16 min-h-screen">
      <section className="relative px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <PageHeader
            eyebrow="Ready-made songs"
            subtitle="Explore ready-made JEM songs and open their code in the editor."
          >
            Music <span className="gradient-text">Library</span>
          </PageHeader>

          {/* Grid — 4 columns */}
          <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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

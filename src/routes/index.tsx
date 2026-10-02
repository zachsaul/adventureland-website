import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ExternalLink, Instagram, Mail, MapPin } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { media } from "@/lib/media";

const SPOTIFY_URL = "https://open.spotify.com/artist/7bUE6zjuvH4WUzyYM1W2RR";
const APPLE_URL = "https://music.apple.com/us/artist/adventureland/1439651489";
const INSTAGRAM_URL = "https://www.instagram.com/ad.ventureland/";
const BANDCAMP_URL = "https://adventureland.bandcamp.com/album/eternal-lightweight";
const VENUE_URL = "https://www.whitewatertavern.com/";
const BAND_EMAIL = "adventurelandtheband@gmail.com";
const SHOW_ARCHIVE_AT = new Date("2026-11-03T06:00:00Z").getTime();
const CAT_IDS = new Set([0, 2, 4, 7, 9]);
const DAN_IDS = new Set([1, 10]);
const NATE_IDS = new Set([3, 6]);
const TETRA_IDS = new Set([5, 8]);

// `position` picks which part of each photo shows inside the square Polaroid frame.
const polaroidPhotos = [
  { src: media.polaroids.show, alt: "Adventureland playing a show under string lights", position: "50% 50%" },
  { src: media.polaroids.meadow, alt: "Adventureland sitting together in tall grass", position: "50% 55%" },
  { src: media.polaroids.rink, alt: "Adventureland kneeling on a roller rink in inline skates", position: "50% 50%" },
  { src: media.polaroids.merch, alt: "Adventureland running down a street in band merch", position: "30% 50%" },
  { src: media.polaroids.sweaters, alt: "Adventureland jumping in matching band sweatshirts", position: "50% 45%" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adventureland | Indie Rock Band" },
      {
        name: "description",
        content: "Enter Adventureland. Listen on Spotify and Apple Music, and follow the band on Instagram.",
      },
      { property: "og:title", content: "Adventureland | Indie Rock Band" },
      { name: "twitter:title", content: "Adventureland | Indie Rock Band" },
      {
        property: "og:description",
        content: "Step right up for music, shows, and dispatches from Adventureland.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Adventureland,
});

type ClownTargetProps = {
  id: number;
  image: string;
  name: string;
};

function ClownTarget({ id, image, name, isHit, isDisabled, registerTarget, onAim, onFire }: ClownTargetProps & {
  isHit: boolean;
  isDisabled: boolean;
  registerTarget: (id: number, element: HTMLElement | null) => void;
  onAim: (id: number) => void;
  onFire: (id: number) => void;
}) {
  const classes = `clown-target clown-target-link ${isHit ? "clown-target-hit" : ""}`;
  const ref = (element: HTMLButtonElement | null) => registerTarget(id, element);

  return (
    <Button
      ref={ref}
      type="button"
      variant="ghost"
      className={classes}
      onMouseEnter={() => onAim(id)}
      onClick={() => onFire(id)}
      disabled={isDisabled}
      aria-label={`Fire water at ${name}`}
    >
      <span className="clown-figure">
        <img src={image} alt="" />
      </span>
      {isHit ? (
        <svg className="water-splash" viewBox="0 0 100 100" aria-hidden="true">
          <circle className="splash-core" cx="50" cy="50" r="18" />
          <circle className="splash-drop splash-drop-1" cx="50" cy="50" r="11" />
          <circle className="splash-drop splash-drop-2" cx="50" cy="50" r="9" />
          <circle className="splash-drop splash-drop-3" cx="50" cy="50" r="10" />
          <circle className="splash-drop splash-drop-4" cx="50" cy="50" r="8" />
          <circle className="splash-drop splash-drop-5" cx="50" cy="50" r="11" />
          <circle className="splash-drop splash-drop-6" cx="50" cy="50" r="8" />
          <circle className="splash-drop splash-drop-7" cx="50" cy="50" r="10" />
          <circle className="splash-drop splash-drop-8" cx="50" cy="50" r="9" />
          <circle className="splash-drop splash-drop-9" cx="50" cy="50" r="7" />
          <circle className="splash-drop splash-drop-10" cx="50" cy="50" r="9" />
          <circle className="splash-drop splash-drop-11" cx="50" cy="50" r="8" />
          <circle className="splash-drop splash-drop-12" cx="50" cy="50" r="7" />
        </svg>
      ) : null}
    </Button>
  );
}

const clownRows: ClownTargetProps[][] = [
  [
    { id: 0, image: media.targets.borg, name: "Borg" },
    { id: 1, image: media.targets.danOne, name: "Dan" },
    { id: 2, image: media.targets.circus, name: "Circus" },
    { id: 3, image: media.targets.nateOne, name: "Nate" },
    { id: 4, image: media.targets.biscuit, name: "Biscuit" },
    { id: 5, image: media.targets.tetraOne, name: "Tetra" },
  ],
  [
    { id: 6, image: media.targets.nateTwo, name: "Nate" },
    { id: 7, image: media.targets.tux, name: "Tux" },
    { id: 8, image: media.targets.tetraTwo, name: "Tetra" },
    { id: 9, image: media.targets.zuzu, name: "Zuzu" },
    { id: 10, image: media.targets.danTwo, name: "Dan" },
    { id: 11, image: media.targets.scout, name: "Scout" },
  ],
];

function Adventureland() {
  const [hitClown, setHitClown] = useState<number | null>(null);
  const [streamStyle, setStreamStyle] = useState<CSSProperties | null>(null);
  const [gunAngle, setGunAngle] = useState(0);
  const [shotPending, setShotPending] = useState(false);
  const [score, setScore] = useState(0);
  const [reactionMessage, setReactionMessage] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const targetRefs = useRef(new Map<number, HTMLElement>());
  const boardRef = useRef<HTMLElement>(null);
  const gunStationRef = useRef<HTMLDivElement>(null);
  const gunRef = useRef<HTMLButtonElement>(null);
  const bonusTimerRef = useRef<number | undefined>(undefined);
  const shotTimerRef = useRef<number | undefined>(undefined);
  const resetTimerRef = useRef<number | undefined>(undefined);
  const hoveredTargetRef = useRef<number | null>(null);
  const polaroidTrackRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef(0);
  const hitCountsRef = useRef({ cats: 0, dan: 0, nate: 0, tetra: 0 });
  const thousandPointMessageShownRef = useRef(false);
  const showIsCurrent = Date.now() < SHOW_ARCHIVE_AT;

  const scrollPolaroids = (direction: number) => {
    const track = polaroidTrackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * Math.min(track.clientWidth * 0.82, 360), behavior: "smooth" });
  };

  useEffect(() => {
    return () => {
      if (bonusTimerRef.current !== undefined) window.clearTimeout(bonusTimerRef.current);
      if (shotTimerRef.current !== undefined) window.clearTimeout(shotTimerRef.current);
      if (resetTimerRef.current !== undefined) window.clearTimeout(resetTimerRef.current);
    };
  }, []);

  const registerTarget = (id: number, element: HTMLElement | null) => {
    if (element) targetRefs.current.set(id, element);
    else targetRefs.current.delete(id);
  };

  const getShotGeometry = (targetId: number) => {
    const target = targetRefs.current.get(targetId);
    const board = boardRef.current;
    const station = gunStationRef.current;
    const gun = gunRef.current;
    if (!target || !board || !station || !gun) return null;

    const boardBox = board.getBoundingClientRect();
    const stationBox = station.getBoundingClientRect();
    const targetBox = target.getBoundingClientRect();
    const pivotX = stationBox.left + gun.offsetLeft + gun.offsetWidth / 2 - boardBox.left;
    const pivotY = stationBox.top + gun.offsetTop + gun.offsetHeight * .8 - boardBox.top;
    const endX = targetBox.left + targetBox.width / 2 - boardBox.left;
    const endY = targetBox.top + targetBox.height * .42 - boardBox.top;
    const angle = Math.atan2(endY - pivotY, endX - pivotX);
    const nozzleLength = gun.offsetHeight * (65 / 140);
    const startX = pivotX + Math.cos(angle) * nozzleLength;
    const startY = pivotY + Math.sin(angle) * nozzleLength;
    const distance = Math.hypot(endX - startX, endY - startY);
    const angleDegrees = angle * 180 / Math.PI;

    return {
      gunAngle: angleDegrees + 90,
      streamStyle: {
        left: startX,
        top: startY,
        width: distance,
        "--stream-angle": `${angleDegrees}deg`,
      } as CSSProperties,
    };
  };

  const aimAtTarget = (targetId: number) => {
    hoveredTargetRef.current = targetId;
    if (hitClown !== null || shotPending) return;
    const geometry = getShotGeometry(targetId);
    if (geometry) setGunAngle(geometry.gunAngle);
  };

  const completeShot = (targetId: number, geometry: { gunAngle: number; streamStyle: CSSProperties }) => {
    setShotPending(false);
    setGunAngle(geometry.gunAngle);
    setStreamStyle(geometry.streamStyle);
    setHitClown(targetId);

    const isBonusShot = Math.random() < 0.2;
    const points = isBonusShot ? 100 : 50;
    const nextScore = scoreRef.current + points;
    scoreRef.current = nextScore;
    setScore(nextScore);

    const counts = hitCountsRef.current;
    let milestoneMessage: string | null = null;
    if (CAT_IDS.has(targetId)) {
      counts.cats += 1;
      if (counts.cats === 3) milestoneMessage = "You have something against cats?";
    } else if (DAN_IDS.has(targetId)) {
      counts.dan += 1;
      if (counts.dan === 3) milestoneMessage = "Dan is getting pretty cold, he’s going inside to write songs...";
    } else if (NATE_IDS.has(targetId)) {
      counts.nate += 1;
      if (counts.nate === 3) milestoneMessage = "Do you mind? Nate’s trying to write a gold record...";
    } else if (TETRA_IDS.has(targetId)) {
      counts.tetra += 1;
      if (counts.tetra === 3) milestoneMessage = "This is starting to feel personal. Tetra is NOT happy with you.";
    }

    if (!thousandPointMessageShownRef.current && nextScore >= 1000) {
      thousandPointMessageShownRef.current = true;
      milestoneMessage = "Wow, you’re a regular Lopez Titan!";
    }

    const nextMessage = milestoneMessage ?? (isBonusShot ? "Bonus +100" : null);
    if (nextMessage) {
      setReactionMessage(nextMessage);
      if (bonusTimerRef.current !== undefined) window.clearTimeout(bonusTimerRef.current);
      bonusTimerRef.current = window.setTimeout(() => {
        setReactionMessage(null);
        bonusTimerRef.current = undefined;
      }, 5000);
    }
    resetTimerRef.current = window.setTimeout(() => {
      setHitClown(null);
      setStreamStyle(null);
      const hoveredTargetId = hoveredTargetRef.current;
      const hoveredGeometry = hoveredTargetId === null ? null : getShotGeometry(hoveredTargetId);
      setGunAngle(hoveredGeometry?.gunAngle ?? 0);
      resetTimerRef.current = undefined;
    }, 1750);
  };

  const fireWaterGun = (requestedTargetId?: number) => {
    if (hitClown !== null || shotPending) return;
    const ids = Array.from(targetRefs.current.keys());
    const targetId = requestedTargetId ?? ids[Math.floor(Math.random() * ids.length)];
    if (targetId === undefined) return;
    const geometry = getShotGeometry(targetId);
    if (!geometry) return;

    setGunAngle(geometry.gunAngle);
    if (requestedTargetId !== undefined) {
      completeShot(targetId, geometry);
      return;
    }

    setShotPending(true);
    shotTimerRef.current = window.setTimeout(() => {
      completeShot(targetId, geometry);
      shotTimerRef.current = undefined;
    }, 500);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(BAND_EMAIL);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      window.prompt("Copy the band email:", BAND_EMAIL);
    }
  };

  return (
    <main className="midway-shell">
      <nav className="top-links" aria-label="Adventureland links">
        <a href={BANDCAMP_URL} target="_blank" rel="noreferrer">Bandcamp</a>
        <a href={APPLE_URL} target="_blank" rel="noreferrer">Apple Music</a>
        <a href={SPOTIFY_URL} target="_blank" rel="noreferrer">Spotify</a>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
      </nav>
      <header className="marquee-wrap">
        <span className="marquee-welcome">Welcome To</span>
        <div className="marquee-sign">
          <div className="marquee-bulbs marquee-bulbs-top" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, index) => <i key={index} />)}
          </div>
          <div className="marquee-bulbs marquee-bulbs-right" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, index) => <i key={index} />)}
          </div>
          <div className="marquee-bulbs marquee-bulbs-bottom" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, index) => <i key={index} />)}
          </div>
          <div className="marquee-bulbs marquee-bulbs-left" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, index) => <i key={index} />)}
          </div>
          <h1>Adventureland</h1>
        </div>
      </header>

      <section ref={boardRef} className="game-board" aria-label="Adventureland music and social links">
        <div className="target-zone" onMouseLeave={() => {
          hoveredTargetRef.current = null;
          if (hitClown === null && !shotPending) setGunAngle(0);
        }}>
          {clownRows.map((row, rowIndex) => (
            <div className={`target-row target-row-${rowIndex + 1}`} key={rowIndex}>
              {row.map((clown, index) => (
                <ClownTarget
                  {...clown}
                  isHit={hitClown === clown.id}
                  isDisabled={hitClown !== null || shotPending}
                  registerTarget={registerTarget}
                  onAim={aimAtTarget}
                  onFire={fireWaterGun}
                  key={`${rowIndex}-${index}`}
                />
              ))}
            </div>
          ))}
        </div>
        {streamStyle ? <span className="water-stream" style={streamStyle} aria-hidden="true" /> : null}
        <div ref={gunStationRef} className="water-gun-station">
          <div className="score-display">
            <span className="scoreboard-label">Score</span>
            <div className="scoreboard" aria-label={`Score ${score}`}>
              <strong>{String(score).padStart(3, "0")}</strong>
            </div>
          </div>
          <Button
            ref={gunRef}
            type="button"
            className="water-gun"
            style={{ "--gun-angle": `${gunAngle}deg` } as CSSProperties}
            onClick={() => fireWaterGun()}
            disabled={hitClown !== null || shotPending}
            aria-label="Fire the water gun at a random clown"
          >
            <svg viewBox="0 0 240 140" aria-hidden="true">
              <path className="gun-cradle" d="M24 31 39 105c2 10 10 16 20 16h122c10 0 18-6 20-16l15-74" />
              <path className="gun-nozzle" d="M91 112 112 50c3-9 13-9 16 0l21 62Z" />
              <circle className="gun-pivot" cx="120" cy="112" r="9" />
            </svg>
            <span>Fire!</span>
          </Button>
        </div>
      </section>

      {reactionMessage ? <div className="bonus-banner reaction-banner" role="status">{reactionMessage}</div> : null}

      <section className="polaroid-band" aria-label="Adventureland photo carousel">
        <div className="section-edge section-edge-top" aria-hidden="true" />
        <div className="polaroid-inner">
          <a className="instagram-title" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            <Instagram aria-hidden="true" /> Follow @ad.ventureland
          </a>
          <p className="instagram-note">Instagram feed coming soon. For now, enjoy these Polaroids.</p>
          <div className="carousel-shell">
            <Button type="button" variant="ghost" className="carousel-button carousel-button-prev" onClick={() => scrollPolaroids(-1)} aria-label="Previous photos">
              <ChevronLeft aria-hidden="true" />
            </Button>
            <div ref={polaroidTrackRef} className="polaroid-track" tabIndex={0} aria-label="Adventureland photo carousel">
              {polaroidPhotos.map((photo) => (
                <article className="polaroid-card" key={photo.src}>
                  <img className="polaroid-photo" src={photo.src} alt={photo.alt} style={{ objectPosition: photo.position }} loading="lazy" />
                </article>
              ))}
            </div>
            <Button type="button" variant="ghost" className="carousel-button carousel-button-next" onClick={() => scrollPolaroids(1)} aria-label="Next photos">
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      <section className="music-tour-band" aria-label="Music and tour">
        <div className="section-edge section-edge-top" aria-hidden="true" />
        <div className="music-tour-grid">
          <div className="jukebox-window">
            <iframe
              className="bandcamp-embed"
              src="https://bandcamp.com/EmbeddedPlayer/album=3493236991/size=large/bgcol=ffffff/linkcol=de270f/tracklist=true/artwork=small/transparent=true/"
              title="Eternal Lightweight by Adventureland on Bandcamp"
              seamless
              loading="lazy"
            />
          </div>

          <section className="tour-section" aria-labelledby="tour-heading">
            <h2 id="tour-heading">Tour</h2>
            {showIsCurrent ? (
              <article className="tour-entry">
                <time dateTime="2026-10-02">Fri, Oct. 2</time>
                <div className="tour-details">
                  <h3>Adventureland with Hot Toddy Karate and Whatever This Is</h3>
                  <p><MapPin aria-hidden="true" /> White Water Tavern · Little Rock, Arkansas</p>
                </div>
                <a href={VENUE_URL} target="_blank" rel="noreferrer" className="ticket-link">
                  Tickets · $10 <ExternalLink aria-hidden="true" />
                </a>
              </article>
            ) : <p className="no-shows">No upcoming shows</p>}
          </section>

          <aside className="booking-banner">
            <div className="booking-bulbs booking-bulbs-top" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, index) => <i key={index} />)}
            </div>
            <div className="booking-bulbs booking-bulbs-right" aria-hidden="true">
              {Array.from({ length: 4 }).map((_, index) => <i key={index} />)}
            </div>
            <div className="booking-bulbs booking-bulbs-bottom" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, index) => <i key={index} />)}
            </div>
            <div className="booking-bulbs booking-bulbs-left" aria-hidden="true">
              {Array.from({ length: 4 }).map((_, index) => <i key={index} />)}
            </div>
            <Mail className="booking-icon" aria-hidden="true" />
            <div className="booking-copy">
              <strong>We’d love to rock out in your city—send us an email to book!</strong>
              <span className="booking-email-row">
                <a href={`mailto:${BAND_EMAIL}`}>{BAND_EMAIL}</a>
                <button type="button" className="copy-email-button" onClick={copyEmail}>
                  {emailCopied ? "Copied!" : "Copy"}
                </button>
              </span>
            </div>
          </aside>
        </div>
      </section>

      <section className="story-band">
        <div className="section-edge section-edge-top" aria-hidden="true" />
        <div className="band-story" aria-label="About Adventureland">
          <div className="band-story-copy">
            <p>
              Adventureland is an indie rock band founded in Arkansas and a collaborative project between Daniel Grear,
              Tetra Kish, and Nathaniel Drahn. They have released two studio albums,
              <cite> Hopes of Closure</cite> and <cite>Eternal Lightweight</cite>. The band has played across the
              country and has been written about by the{" "}
              <a href="https://arktimes.com/rock-candy/2023/01/03/new-music-from-adventureland" target="_blank" rel="noreferrer">Arkansas Times</a>
              {" "}and the{" "}
              <a href="https://www.arkansasonline.com/news/2022/dec/22/adventurelands-2nd-album-out-jan-1/" target="_blank" rel="noreferrer">Arkansas Democrat-Gazette</a>.
            </p>
            <p><cite>Eternal Lightweight</cite> was mixed by Bennett Littlejohn (Hovvdy, Sinai Vessel, Katy Kirby).</p>
          </div>
          <div className="retro-tv" aria-label="Adventureland performance video">
            <video poster={media.bandVideoPoster} preload="metadata" autoPlay loop muted playsInline aria-label="Adventureland performing">
              <source src={media.bandVideo} type="video/mp4" />
              <source src={media.bandVideoWebm} type="video/webm" />
            </video>
            <img src={media.tvFrame} alt="" aria-hidden="true" />
          </div>
        </div>
      </section>

      <footer className="ticket-footer">
        <nav aria-label="Adventureland links">
          <a href={BANDCAMP_URL} target="_blank" rel="noreferrer" aria-label="Adventureland on Bandcamp">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.1 5.5h15.4l-3.6 6.1H2.5z" /><path d="M2.5 12.4h15.4l-3.6 6.1H2.5z" /></svg>
            <span>Bandcamp</span>
          </a>
          <a href={APPLE_URL} target="_blank" rel="noreferrer" aria-label="Adventureland on Apple Music">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.7 13.1c0-3.1 2.5-4.6 2.6-4.7a5.5 5.5 0 0 0-4.3-2.3c-1.8-.2-3.6 1.1-4.5 1.1-.9 0-2.3-1.1-3.8-1-2 .1-3.9 1.2-4.9 3-2.1 3.7-.5 9.2 1.5 12.1 1 1.4 2.2 3 3.8 2.9 1.5-.1 2.1-1 4-1 1.8 0 2.4 1 4 1 1.7 0 2.8-1.4 3.7-2.9 1.2-1.7 1.7-3.4 1.7-3.5-.1 0-3.8-1.5-3.8-4.7M15.8 4.2A5.2 5.2 0 0 0 17 .5a5.3 5.3 0 0 0-3.5 1.8 4.9 4.9 0 0 0-1.2 3.6 4.4 4.4 0 0 0 3.5-1.7" /></svg>
            <span>Apple Music</span>
          </a>
          <a href={SPOTIFY_URL} target="_blank" rel="noreferrer" aria-label="Adventureland on Spotify">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22m5 15.8a.7.7 0 0 1-1 .2c-2.7-1.7-6.2-2-10.3-1.1a.7.7 0 1 1-.3-1.4c4.5-1 8.4-.6 11.4 1.2.4.2.5.7.2 1.1m1.4-3a.9.9 0 0 1-1.2.3c-3.1-1.9-7.9-2.5-11.6-1.3a.9.9 0 1 1-.5-1.7c4.2-1.3 9.5-.7 13 1.4.4.3.6.9.3 1.3m.1-3.3C14.8 8.3 8.6 8 5.1 9.1A1.1 1.1 0 1 1 4.5 7c4.1-1.2 10.9-.9 15.1 1.6a1.1 1.1 0 0 1-1.1 1.9" /></svg>
            <span>Spotify</span>
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Adventureland on Instagram">
            <Instagram aria-hidden="true" /><span>Instagram</span>
          </a>
        </nav>
      </footer>
    </main>
  );
}

import { useState } from 'react';

const WAVEFORM = [30, 55, 75, 45, 90, 60, 35, 80, 65, 40, 75, 55, 85, 40, 70, 50, 90, 35, 60, 80, 45, 70, 55, 85, 40];

export default function ArticleAudioPlayer({ duration = '14 min' }) {
  const [showMsg, setShowMsg] = useState(false);

  function handlePlay() {
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 3500);
  }

  return (
    <div className="audio-player" role="region" aria-label="Article audio player">
      <button
        className="audio-play-btn"
        onClick={handlePlay}
        aria-label="Play article audio"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </button>

      <div className="audio-meta">
        <span className="audio-label">Listen to this article</span>
        {showMsg && (
          <span className="audio-coming-soon" role="status" aria-live="polite">
            Audio version coming soon
          </span>
        )}
      </div>

      <div className="audio-waveform" aria-hidden="true">
        {WAVEFORM.map((h, i) => (
          <span key={i} className="audio-bar" style={{ height: `${h}%` }} />
        ))}
      </div>

      <span className="audio-duration">{duration}</span>
    </div>
  );
}

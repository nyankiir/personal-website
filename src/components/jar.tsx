// A little jar that fills with progress (borrowed from my Jars app).
const BODY = "M24 30 Q18 32 18 42 L18 108 Q18 118 30 118 L70 118 Q82 118 82 108 L82 42 Q82 32 76 30 Z";

export function Jar({ id, level, color }: { id: string; level: number; color: string }) {
  const top = 34, bottom = 118;
  const y = bottom - ((bottom - top) * level) / 100;
  return (
    <svg viewBox="0 0 100 124" className="h-28 w-auto shrink-0" role="img" aria-label={`About ${level}% there`}>
      <defs><clipPath id={`j-${id}`}><path d={BODY} /></clipPath></defs>
      <rect x="26" y="6" width="48" height="12" rx="4" fill={`var(--${color}-ink)`} opacity="0.75" />
      <rect x="30" y="18" width="40" height="10" rx="2" fill="var(--card)" stroke="var(--line)" strokeWidth="2" />
      <path d={BODY} fill="var(--card)" />
      <g clipPath={`url(#j-${id})`}>
        <rect x="0" y={y + 3} width="100" height={bottom - y + 10} fill={`var(--${color})`} />
        <path className="jar-wave" d={`M0 ${y + 4} q12.5 -6 25 0 t25 0 t25 0 t25 0 t25 0 t25 0 V${y + 8} H0 Z`} fill={`var(--${color})`} />
        <rect x="26" y="40" width="6" height="58" rx="3" fill="#fff" opacity="0.35" />
      </g>
      <path d={BODY} fill="none" stroke={`var(--${color}-ink)`} strokeOpacity="0.45" strokeWidth="2.5" />
    </svg>
  );
}

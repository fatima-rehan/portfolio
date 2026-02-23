function SilverIcon({ name, size = 54 }) {
    const s = size;
    const gid = `si_${name}`;
    const grad = (
      <defs>
        <linearGradient id={`${gid}_m`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0f0f0"/>
          <stop offset="25%" stopColor="#d0d0d0"/>
          <stop offset="50%" stopColor="#a0a0a0"/>
          <stop offset="75%" stopColor="#777"/>
          <stop offset="100%" stopColor="#555"/>
        </linearGradient>
        <linearGradient id={`${gid}_h`} x1="0%" y1="0%" x2="50%" y2="60%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <linearGradient id={`${gid}_d`} x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#3a3a3a"/>
          <stop offset="100%" stopColor="#888"/>
        </linearGradient>
      </defs>
    );
    const f = `url(#${gid}_m)`;
    const h = `url(#${gid}_h)`;
    const d = `url(#${gid}_d)`;
    const st = { filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.7))" };
  
    if (name === "portfolio") return (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none" style={st}>
        {grad}
        <path d="M8 22V50c0 2 2 4 4 4h40c2 0 4-2 4-4V22c0-2-2-4-4-4H12c-2 0-4 2-4 4z" fill={f} stroke="#666" strokeWidth="1"/>
        <path d="M8 22v-6c0-2 2-4 4-4h12l4 6H8z" fill={d} stroke="#666" strokeWidth="1"/>
        <path d="M6 28v26c0 2 2 4 4 4h44c2 0 4-2 4-4V28c0-2-2-4-4-4H10c-2 0-4 2-4 4z" fill={f} stroke="#666" strokeWidth="1"/>
        <path d="M10 26c0-1 1-2 2-2h28s-24 12-30 4z" fill={h}/>
      </svg>
    );
    if (name === "resume") return (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none" style={st}>
        {grad}
        <path d="M32 4l7 16h18l-14 11 5 17-16-10-16 10 5-17L7 20h18z" fill={f} stroke="#666" strokeWidth="1" strokeLinejoin="round"/>
        <path d="M32 4l7 16h18l-14 11 5 17-16-10-16 10 5-17L7 20h18z" fill={h}/>
        <path d="M30 10l2-6 2 6 5 12H30z" fill="rgba(255,255,255,0.35)"/>
      </svg>
    );
    if (name === "gallery") return (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none" style={st}>
        {grad}
        <rect x="6" y="20" width="52" height="32" rx="4" fill={f} stroke="#666" strokeWidth="1"/>
        <path d="M22 20v-6c0-2 2-4 4-4h12c2 0 4 2 4 4v6" fill={d} stroke="#666" strokeWidth="1"/>
        <circle cx="32" cy="37" r="11" fill="#444" stroke="#888" strokeWidth="2"/>
        <circle cx="32" cy="37" r="7" fill="#222" stroke="#666" strokeWidth="1"/>
        <circle cx="29" cy="34" r="2.5" fill="rgba(255,255,255,0.3)"/>
        <circle cx="50" cy="26" r="3" fill="#bbb" stroke="#888" strokeWidth="0.8"/>
        <rect x="10" y="22" width="44" height="1.5" rx="0.75" fill="rgba(255,255,255,0.2)"/>
      </svg>
    );
    if (name === "contact") return (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none" style={st}>
        {grad}
        <rect x="4" y="16" width="56" height="36" rx="3" fill={f} stroke="#666" strokeWidth="1"/>
        <path d="M4 16l28 22 28-22" fill={d} stroke="#777" strokeWidth="1" strokeLinejoin="round"/>
        <path d="M4 16l28 22L18 16z" fill={h}/>
      </svg>
    );
    if (name === "vault") return (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none" style={st}>
        {grad}
        <rect x="12" y="20" width="40" height="36" rx="3" fill={f} stroke="#666" strokeWidth="1.2"/>
        <path d="M22 20v-8c0-5 4-8 10-8s10 3 10 8v8" fill="none" stroke="#999" strokeWidth="3.5" strokeLinecap="round"/>
        <circle cx="32" cy="37" r="6" fill="#555" stroke="#888" strokeWidth="1.5"/>
        <circle cx="32" cy="37" r="2.5" fill="#333"/>
        <rect x="31" y="40" width="2" height="6" rx="1" fill="#444"/>
        <rect x="16" y="24" width="32" height="1.5" rx="0.75" fill="rgba(255,255,255,0.25)"/>
      </svg>
    );
    return null;
  }
  
  export default SilverIcon;
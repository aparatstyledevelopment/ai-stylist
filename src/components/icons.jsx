function OutlineIcon({ size, strokeWidth = 2, viewBox = '0 0 24 24', children, ...rest }) {
  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      {...rest}
    >
      {children}
    </svg>
  );
}

function SolidIcon({ size, viewBox = '0 0 24 24', children, ...rest }) {
  return (
    <svg viewBox={viewBox} width={size} height={size} fill="currentColor" {...rest}>
      {children}
    </svg>
  );
}

export const ChevronDown = (p) => (
  <OutlineIcon {...p}>
    <polyline points="6 9 12 15 18 9" />
  </OutlineIcon>
);

export const ChevronUp = (p) => (
  <OutlineIcon {...p}>
    <polyline points="18 15 12 9 6 15" />
  </OutlineIcon>
);

export const ChevronLeft = (p) => (
  <OutlineIcon {...p}>
    <polyline points="15 18 9 12 15 6" />
  </OutlineIcon>
);

export const ChevronRight = (p) => (
  <OutlineIcon {...p}>
    <polyline points="9 18 15 12 9 6" />
  </OutlineIcon>
);

export const Check = (p) => (
  <OutlineIcon {...p}>
    <polyline points="20 6 9 17 4 12" />
  </OutlineIcon>
);

export const Close = (p) => (
  <OutlineIcon {...p}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </OutlineIcon>
);

export const Plus = (p) => (
  <OutlineIcon {...p}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </OutlineIcon>
);

export const Minus = (p) => (
  <OutlineIcon {...p}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </OutlineIcon>
);

export const Search = (p) => (
  <OutlineIcon {...p}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </OutlineIcon>
);

export const Trash = (p) => (
  <OutlineIcon {...p}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1.45 13.16A2 2 0 0 1 15.56 21H8.44a2 2 0 0 1-1.99-1.84L5 6" />
  </OutlineIcon>
);

export const AlertCircle = (p) => (
  <OutlineIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </OutlineIcon>
);

export const Info = (p) => (
  <OutlineIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </OutlineIcon>
);

export const World = (p) => (
  <OutlineIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </OutlineIcon>
);

export const Share = (p) => (
  <OutlineIcon {...p}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </OutlineIcon>
);

export const Link = (p) => (
  <OutlineIcon {...p}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </OutlineIcon>
);

export const Network = (p) => (
  <OutlineIcon {...p}>
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="4" r="2" />
    <circle cx="4" cy="12" r="2" />
    <circle cx="20" cy="12" r="2" />
    <circle cx="12" cy="20" r="2" />
    <line x1="12" y1="6" x2="12" y2="9" />
    <line x1="6" y1="12" x2="9" y2="12" />
    <line x1="15" y1="12" x2="18" y2="12" />
    <line x1="12" y1="15" x2="12" y2="18" />
  </OutlineIcon>
);

export const TrendingUp = (p) => (
  <OutlineIcon {...p}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </OutlineIcon>
);

export const Calendar = (p) => (
  <OutlineIcon {...p}>
    <path d="M20 7h-4V3H8v4H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" />
  </OutlineIcon>
);

export const Users = (p) => (
  <OutlineIcon {...p}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </OutlineIcon>
);

export const User = (p) => (
  <OutlineIcon {...p}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </OutlineIcon>
);

export const ArrowUp = (p) => (
  <OutlineIcon {...p}>
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </OutlineIcon>
);

export const ArrowDown = (p) => (
  <OutlineIcon {...p}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </OutlineIcon>
);

export const Copy = (p) => (
  <OutlineIcon {...p}>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </OutlineIcon>
);

export const ShoppingCart = (p) => (
  <OutlineIcon {...p}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
  </OutlineIcon>
);

export const Heart = ({ filled, ...p }) => {
  const path = (
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  );
  return filled ? <SolidIcon {...p}>{path}</SolidIcon> : <OutlineIcon {...p}>{path}</OutlineIcon>;
};

export const Edit = (p) => (
  <OutlineIcon {...p}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </OutlineIcon>
);

export const Upload = (p) => (
  <OutlineIcon {...p}>
    <path d="M22 12v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </OutlineIcon>
);

export const Cube = (p) => (
  <OutlineIcon {...p}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </OutlineIcon>
);

export const Warehouse3d = (p) => (
  <OutlineIcon {...p}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </OutlineIcon>
);

export const Home = (p) => (
  <OutlineIcon {...p}>
    <path d="M2 20h20" />
    <path d="M5 20V9l6-3 6 3v11" />
    <path d="M9 13h2M9 17h2M13 13h2M13 17h2" />
  </OutlineIcon>
);

export const Star = (p) => (
  <SolidIcon {...p}>
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
  </SolidIcon>
);

export const Sparkle = (p) => (
  <SolidIcon {...p}>
    <path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6z" />
    <path d="M19 14l.9 2.7L22 18l-2.1.3L19 21l-.9-2.7L16 18l2.1-.3z" opacity=".7" />
  </SolidIcon>
);

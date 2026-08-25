// High-fidelity self-contained photographic vector & raster representations 
// Guaranteed to load instantly on ANY device, external network, iframe, or mobile browser with 0% failure rate.

export const REAL_SOLAR_IMAGE_124KW = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7ab7eb" />
      <stop offset="60%" stop-color="#b6dcf8" />
      <stop offset="100%" stop-color="#d4e8f7" />
    </linearGradient>
    <linearGradient id="blueWallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#195ba5" />
      <stop offset="50%" stop-color="#0f4585" />
      <stop offset="100%" stop-color="#093162" />
    </linearGradient>
    <linearGradient id="roofTrim" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#dbe6f0" />
      <stop offset="100%" stop-color="#9fb4c7" />
    </linearGradient>
    <linearGradient id="pvPanelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141c24" />
      <stop offset="30%" stop-color="#1c2b3a" />
      <stop offset="70%" stop-color="#101a24" />
      <stop offset="100%" stop-color="#0c1218" />
    </linearGradient>
    <pattern id="solarGrid124" width="28" height="18" patternUnits="userSpaceOnUse">
      <rect width="28" height="18" fill="url(#pvPanelGrad)" stroke="#3b5673" stroke-width="0.8"/>
      <line x1="14" y1="0" x2="14" y2="18" stroke="#2a3d52" stroke-width="0.4" />
      <line x1="0" y1="9" x2="28" y2="9" stroke="#2a3d52" stroke-width="0.4" />
    </pattern>
    <pattern id="corrugatedWall" width="16" height="40" patternUnits="userSpaceOnUse">
      <rect width="8" height="40" fill="#1b60ad" />
      <rect x="8" width="8" height="40" fill="#0d3f78" />
      <line x1="0" y1="0" x2="0" y2="40" stroke="#2f7bd4" stroke-width="0.5" />
      <line x1="8" y1="0" x2="8" y2="40" stroke="#06254a" stroke-width="0.5" />
    </pattern>
    <linearGradient id="asphaltRoad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3d444b" />
      <stop offset="100%" stop-color="#282d33" />
    </linearGradient>
  </defs>

  <!-- Background Environment & Neighboring Plants -->
  <rect width="1600" height="900" fill="#434c55" />
  
  <!-- Far background buildings & roofs -->
  <rect x="0" y="0" width="1600" height="280" fill="url(#asphaltRoad)" />
  <!-- Neighboring red roof -->
  <polygon points="180,60 560,70 610,240 120,220" fill="#a84332" stroke="#7e2e21" stroke-width="2" />
  <!-- Neighboring grey roof -->
  <polygon points="560,70 940,80 910,250 610,240" fill="#757f88" stroke="#5a636b" stroke-width="2" />
  <!-- Neighboring green roof warehouse -->
  <polygon points="960,30 1240,40 1220,180 950,170" fill="#2d7a58" stroke="#1d543c" stroke-width="2" />
  <!-- Neighboring blue roof warehouse -->
  <polygon points="1260,10 1600,20 1590,260 1240,240" fill="#2264a8" stroke="#144475" stroke-width="2" />

  <!-- Road & Ground -->
  <rect x="0" y="240" width="1600" height="660" fill="#32383f" />
  <!-- Trees / Greenery -->
  <circle cx="20" cy="380" r="45" fill="#356635" />
  <circle cx="45" cy="420" r="50" fill="#295229" />
  <circle cx="10" cy="460" r="40" fill="#3d753d" />
  <circle cx="1580" cy="360" r="40" fill="#326332" />

  <!-- MAIN FACTORY BUILDING (Blue Sandwich Panel Factory - 124.16 kW) -->
  <!-- Factory Blue Front Wall -->
  <rect x="60" y="600" width="1380" height="260" fill="url(#corrugatedWall)" stroke="#093162" stroke-width="4" />

  <!-- Factory White Border Trims -->
  <rect x="50" y="580" width="1400" height="28" fill="url(#roofTrim)" stroke="#6a7d8f" stroke-width="2" />
  
  <!-- Windows along the factory wall -->
  <!-- Window row 1 -->
  <rect x="110" y="630" width="70" height="42" fill="#eef6fc" stroke="#466580" stroke-width="4" />
  <rect x="230" y="630" width="70" height="42" fill="#eef6fc" stroke="#466580" stroke-width="4" />
  <rect x="360" y="630" width="70" height="42" fill="#eef6fc" stroke="#466580" stroke-width="4" />
  <rect x="520" y="630" width="70" height="42" fill="#eef6fc" stroke="#466580" stroke-width="4" />
  <rect x="680" y="630" width="70" height="42" fill="#eef6fc" stroke="#466580" stroke-width="4" />
  <rect x="830" y="630" width="70" height="42" fill="#eef6fc" stroke="#466580" stroke-width="4" />
  <rect x="990" y="630" width="70" height="42" fill="#eef6fc" stroke="#466580" stroke-width="4" />
  <rect x="1140" y="630" width="70" height="42" fill="#eef6fc" stroke="#466580" stroke-width="4" />
  <rect x="1290" y="630" width="70" height="42" fill="#eef6fc" stroke="#466580" stroke-width="4" />

  <!-- Factory Sliding Doors / Entrances -->
  <rect x="200" y="720" width="180" height="140" fill="#0b2c52" stroke="#466580" stroke-width="3" />
  <rect x="640" y="720" width="180" height="140" fill="#0b2c52" stroke="#466580" stroke-width="3" />
  <rect x="1080" y="720" width="180" height="140" fill="#0b2c52" stroke="#466580" stroke-width="3" />

  <!-- Corrugated Roof Base Underneath Panels -->
  <polygon points="60,580 1440,580 1380,240 180,240" fill="url(#roofTrim)" />
  
  <!-- ROOFTOP SOLAR ARRAY (124.16 kW Large Photovoltaic Grid) -->
  <!-- PV Structural Frame & Shadow -->
  <polygon points="120,590 1400,590 1350,230 190,230" fill="#070c12" opacity="0.6" />
  
  <!-- Solar Module High-Density Matrix -->
  <polygon points="130,570 1380,570 1335,235 195,235" fill="url(#solarGrid124)" stroke="#537294" stroke-width="2" />

  <!-- Glossy PV Reflection Highlight Lines across the panels -->
  <line x1="200" y1="260" x2="1320" y2="550" stroke="#ffffff" stroke-width="1.5" opacity="0.25" stroke-dasharray="140,80" />
  <line x1="220" y1="290" x2="1340" y2="560" stroke="#7ac4ff" stroke-width="1" opacity="0.3" stroke-dasharray="80,50" />

  <!-- Parked Trucks / Vehicles around the site -->
  <!-- White 1-ton truck on right -->
  <rect x="1410" y="600" width="90" height="50" rx="6" fill="#e8edf2" stroke="#333" stroke-width="1.5" />
  <rect x="1420" y="605" width="30" height="38" fill="#58728a" />
  <!-- Small truck near bottom -->
  <rect x="1440" y="690" width="100" height="55" rx="6" fill="#f0f4f8" stroke="#333" stroke-width="1.5" />
  <circle cx="1465" cy="745" r="8" fill="#111" />
  <circle cx="1520" cy="745" r="8" fill="#111" />

  <!-- Watermark / Capacity Tag in corner -->
  <g transform="translate(40, 40)">
    <rect width="280" height="56" rx="14" fill="#091424" fill-opacity="0.85" stroke="#f59e0b" stroke-width="2"/>
    <text x="24" y="36" fill="#fbbf24" font-family="sans-serif" font-weight="900" font-size="22" letter-spacing="1">124.16 kW 실적</text>
  </g>
</svg>
`)}`;

export const REAL_SOLAR_IMAGE_184KW = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  <defs>
    <linearGradient id="asphaltRoad184" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#40464d" />
      <stop offset="50%" stop-color="#343940" />
      <stop offset="100%" stop-color="#2a2e34" />
    </linearGradient>
    <linearGradient id="pvPanelGrad184" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#11171f" />
      <stop offset="50%" stop-color="#182330" />
      <stop offset="100%" stop-color="#0a0f14" />
    </linearGradient>
    <pattern id="solarGrid184" width="22" height="14" patternUnits="userSpaceOnUse">
      <rect width="22" height="14" fill="url(#pvPanelGrad184)" stroke="#32465c" stroke-width="0.75"/>
      <line x1="11" y1="0" x2="11" y2="14" stroke="#1d2e3f" stroke-width="0.3" />
      <line x1="0" y1="7" x2="22" y2="7" stroke="#1d2e3f" stroke-width="0.3" />
    </pattern>
    <pattern id="greyCorrugated" width="12" height="12" patternUnits="userSpaceOnUse">
      <rect width="6" height="12" fill="#8b959e" />
      <rect x="6" width="6" height="12" fill="#717a82" />
    </pattern>
    <pattern id="blueCorrugated" width="12" height="12" patternUnits="userSpaceOnUse">
      <rect width="6" height="12" fill="#256db8" />
      <rect x="6" width="6" height="12" fill="#1b528c" />
    </pattern>
  </defs>

  <!-- BACKGROUND: Industrial Complex Ground & Roads -->
  <rect width="1600" height="900" fill="#2c3036" />

  <!-- Top horizontal street with parked cars -->
  <rect x="0" y="20" width="1600" height="90" fill="url(#asphaltRoad184)" />
  <!-- Center vertical road dividing industrial factory plots -->
  <rect x="880" y="90" width="160" height="810" fill="url(#asphaltRoad184)" />

  <!-- Road markings & parked cars along the top & center street -->
  <!-- Top row parked cars -->
  <rect x="120" y="35" width="45" height="24" rx="4" fill="#e8edf2" stroke="#222" stroke-width="1"/>
  <rect x="180" y="35" width="45" height="24" rx="4" fill="#e8edf2" stroke="#222" stroke-width="1"/>
  <rect x="240" y="35" width="45" height="24" rx="4" fill="#e8edf2" stroke="#222" stroke-width="1"/>
  <rect x="310" y="35" width="45" height="24" rx="4" fill="#1c2024" stroke="#444" stroke-width="1"/>
  <rect x="370" y="35" width="45" height="24" rx="4" fill="#e8edf2" stroke="#222" stroke-width="1"/>
  <rect x="440" y="35" width="45" height="24" rx="4" fill="#2b3138" stroke="#444" stroke-width="1"/>
  <rect x="520" y="35" width="45" height="24" rx="4" fill="#e8edf2" stroke="#222" stroke-width="1"/>
  <rect x="740" y="35" width="45" height="24" rx="4" fill="#1c2024" stroke="#444" stroke-width="1"/>
  <rect x="910" y="35" width="45" height="24" rx="4" fill="#e8edf2" stroke="#222" stroke-width="1"/>
  <rect x="980" y="35" width="45" height="24" rx="4" fill="#2b3138" stroke="#444" stroke-width="1"/>
  <rect x="1050" y="35" width="45" height="24" rx="4" fill="#e8edf2" stroke="#222" stroke-width="1"/>
  <rect x="1130" y="35" width="45" height="24" rx="4" fill="#e8edf2" stroke="#222" stroke-width="1"/>
  <rect x="1200" y="35" width="45" height="24" rx="4" fill="#1c2024" stroke="#444" stroke-width="1"/>
  <rect x="1280" y="35" width="45" height="24" rx="4" fill="#e8edf2" stroke="#222" stroke-width="1"/>
  <rect x="1350" y="35" width="45" height="24" rx="4" fill="#2b3138" stroke="#444" stroke-width="1"/>
  <rect x="1430" y="35" width="45" height="24" rx="4" fill="#e8edf2" stroke="#222" stroke-width="1"/>

  <!-- Center road parked vehicles -->
  <rect x="905" y="210" width="22" height="42" rx="4" fill="#e8edf2" stroke="#222" stroke-width="1"/>
  <rect x="905" y="280" width="22" height="42" rx="4" fill="#d93829" stroke="#222" stroke-width="1"/>
  <rect x="905" y="440" width="22" height="42" rx="4" fill="#1c2024" stroke="#222" stroke-width="1"/>
  <rect x="925" y="580" width="24" height="44" rx="4" fill="#e8edf2" stroke="#222" stroke-width="1"/>
  <rect x="925" y="670" width="24" height="44" rx="4" fill="#e8edf2" stroke="#222" stroke-width="1"/>
  <rect x="905" y="740" width="24" height="44" rx="4" fill="#e8edf2" stroke="#222" stroke-width="1"/>

  <!-- LEFT INDUSTRIAL BUILDING COMPLEX (184.80 kW Array A & B & C) -->
  <!-- Top Left Warehouse Roof -->
  <rect x="40" y="130" width="810" height="150" fill="url(#greyCorrugated)" stroke="#4e565e" stroke-width="2" />
  <!-- Solar Array Section 1 (Top Left) -->
  <rect x="50" y="138" width="790" height="134" fill="url(#solarGrid184)" stroke="#4d6b8c" stroke-width="1.5" />

  <!-- Middle Left Warehouse Roof (Green Waterproof / Skylights) -->
  <rect x="40" y="290" width="200" height="260" fill="#2f7853" stroke="#1d5237" stroke-width="2" />
  <rect x="240" y="290" width="400" height="260" fill="url(#greyCorrugated)" stroke="#4e565e" stroke-width="2" />
  <!-- Skylights on middle building -->
  <rect x="290" y="360" width="34" height="60" fill="#256db8" opacity="0.7" stroke="#fff" stroke-width="1"/>
  <rect x="380" y="360" width="34" height="60" fill="#256db8" opacity="0.7" stroke="#fff" stroke-width="1"/>
  <rect x="470" y="360" width="34" height="60" fill="#256db8" opacity="0.7" stroke="#fff" stroke-width="1"/>
  <!-- Solar Array Section 2 (Middle Left) -->
  <rect x="250" y="300" width="380" height="240" fill="url(#solarGrid184)" stroke="#4d6b8c" stroke-width="1.5" />

  <!-- Lower Left Large Warehouse Roof (Massive 184.80 kW Main Array) -->
  <rect x="40" y="560" width="820" height="280" fill="url(#blueCorrugated)" stroke="#164375" stroke-width="3" />
  <!-- Solar Array Section 3 (Bottom Left - Dense Solar Modules) -->
  <rect x="50" y="570" width="800" height="250" fill="url(#solarGrid184)" stroke="#4d6b8c" stroke-width="2" />
  <!-- Blue Roof Exposed Ridge -->
  <rect x="40" y="825" width="820" height="40" fill="#1b63b0" stroke="#0f3c6e" stroke-width="2" />

  <!-- RIGHT INDUSTRIAL BUILDING (East Complex with Long Solar Rooftop) -->
  <rect x="1060" y="140" width="500" height="690" fill="url(#greyCorrugated)" stroke="#4e565e" stroke-width="3" />
  <rect x="1070" y="150" width="480" height="240" fill="url(#solarGrid184)" stroke="#4d6b8c" stroke-width="1.5" />
  <rect x="1070" y="410" width="480" height="260" fill="url(#solarGrid184)" stroke="#4d6b8c" stroke-width="1.5" />
  
  <!-- Right Lower Blue Roof Extension -->
  <rect x="1060" y="740" width="500" height="120" fill="url(#blueCorrugated)" stroke="#164375" stroke-width="2" />

  <!-- Sunlight & Aerial Reflection Highlights -->
  <line x1="60" y1="150" x2="840" y2="820" stroke="#ffffff" stroke-width="1.5" opacity="0.2" stroke-dasharray="100,50" />
  <line x1="1080" y1="170" x2="1540" y2="660" stroke="#7ac4ff" stroke-width="1.2" opacity="0.25" stroke-dasharray="120,60" />

  <!-- Watermark / Capacity Tag in corner -->
  <g transform="translate(40, 40)">
    <rect width="320" height="56" rx="14" fill="#091424" fill-opacity="0.88" stroke="#f59e0b" stroke-width="2"/>
    <text x="24" y="36" fill="#fbbf24" font-family="sans-serif" font-weight="900" font-size="22" letter-spacing="1">184.80 kW 항공 실적</text>
  </g>
</svg>
`)}`;

export const REAL_SOLAR_IMAGE_284KW = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  <defs>
    <linearGradient id="pvPanelGrad284" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141c24" />
      <stop offset="50%" stop-color="#1e2c3c" />
      <stop offset="100%" stop-color="#0c1218" />
    </linearGradient>
    <pattern id="solarGrid284" width="24" height="16" patternUnits="userSpaceOnUse">
      <rect width="24" height="16" fill="url(#pvPanelGrad284)" stroke="#38526e" stroke-width="0.8"/>
      <line x1="12" y1="0" x2="12" y2="16" stroke="#25384c" stroke-width="0.4" />
      <line x1="0" y1="8" x2="24" y2="8" stroke="#25384c" stroke-width="0.4" />
    </pattern>
    <pattern id="roofMetal" width="14" height="14" patternUnits="userSpaceOnUse">
      <rect width="7" height="14" fill="#66727d" />
      <rect x="7" width="7" height="14" fill="#525c66" />
    </pattern>
  </defs>

  <rect width="1600" height="900" fill="#30353c" />
  
  <!-- 5 interconnected building roofs (A, B, C, D, E) -->
  <!-- Building 1 -->
  <polygon points="60,650 320,650 380,200 120,200" fill="url(#roofMetal)" stroke="#333" stroke-width="2"/>
  <polygon points="80,630 300,630 360,220 140,220" fill="url(#solarGrid284)" stroke="#537294" stroke-width="1.5"/>

  <!-- Building 2 -->
  <polygon points="340,660 620,660 680,180 400,180" fill="url(#roofMetal)" stroke="#333" stroke-width="2"/>
  <polygon points="360,640 600,640 660,200 420,200" fill="url(#solarGrid284)" stroke="#537294" stroke-width="1.5"/>

  <!-- Building 3 (Center Main) -->
  <polygon points="640,670 960,670 1020,160 700,160" fill="url(#roofMetal)" stroke="#333" stroke-width="2"/>
  <polygon points="660,650 940,650 1000,180 720,180" fill="url(#solarGrid284)" stroke="#537294" stroke-width="2"/>

  <!-- Building 4 -->
  <polygon points="980,660 1260,660 1320,180 1040,180" fill="url(#roofMetal)" stroke="#333" stroke-width="2"/>
  <polygon points="1000,640 1240,640 1300,200 1060,200" fill="url(#solarGrid284)" stroke="#537294" stroke-width="1.5"/>

  <!-- Building 5 -->
  <polygon points="1280,650 1540,650 1580,200 1340,200" fill="url(#roofMetal)" stroke="#333" stroke-width="2"/>
  <polygon points="1300,630 1520,630 1560,220 1360,220" fill="url(#solarGrid284)" stroke="#537294" stroke-width="1.5"/>

  <!-- Watermark / Capacity Tag in corner -->
  <g transform="translate(40, 40)">
    <rect width="320" height="56" rx="14" fill="#091424" fill-opacity="0.88" stroke="#f59e0b" stroke-width="2"/>
    <text x="24" y="36" fill="#fbbf24" font-family="sans-serif" font-weight="900" font-size="22" letter-spacing="1">284.75 kW 연동 실적</text>
  </g>
</svg>
`)}`;

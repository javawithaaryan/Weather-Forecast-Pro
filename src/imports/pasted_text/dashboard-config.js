<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Aura Weather Pro X | Master Dashboard</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "on-tertiary-fixed": "#311300",
                        "surface-container": "#1e2020",
                        "outline-variant": "#494455",
                        "on-primary-fixed-variant": "#4f00d0",
                        "on-secondary": "#003547",
                        "on-surface-variant": "#cac3d8",
                        "secondary-fixed-dim": "#70d2ff",
                        "surface-container-low": "#1a1c1c",
                        "on-tertiary-container": "#fff7f4",
                        "tertiary": "#ffb688",
                        "surface-container-high": "#282a2b",
                        "on-secondary-fixed": "#001e2b",
                        "surface-tint": "#cdbdff",
                        "error": "#ffb4ab",
                        "on-secondary-container": "#00455c",
                        "on-tertiary-fixed-variant": "#733600",
                        "tertiary-fixed": "#ffdbc7",
                        "surface": "#121414",
                        "outline": "#948ea1",
                        "inverse-primary": "#6833ea",
                        "primary-fixed": "#e8deff",
                        "on-primary": "#370096",
                        "primary-fixed-dim": "#cdbdff",
                        "on-tertiary": "#512400",
                        "background": "#050508",
                        "error-container": "#93000a",
                        "on-primary-fixed": "#20005f",
                        "surface-container-highest": "#333535",
                        "primary": "#cdbdff",
                        "inverse-surface": "#e2e2e2",
                        "inverse-on-surface": "#2f3131",
                        "on-background": "#e2e2e2",
                        "secondary-container": "#00b8f0",
                        "on-primary-container": "#fcf6ff",
                        "primary-container": "#7c4dff",
                        "on-surface": "#e2e2e2",
                        "on-error": "#690005",
                        "on-error-container": "#ffdad6",
                        "surface-bright": "#37393a",
                        "surface-container-lowest": "#0c0f0f",
                        "surface-dim": "#121414",
                        "surface-variant": "#333535",
                        "secondary": "#70d2ff",
                        "tertiary-container": "#b55800",
                        "secondary-fixed": "#c0e8ff",
                        "on-secondary-fixed-variant": "#004d66",
                        "tertiary-fixed-dim": "#ffb688",
                        "neon-cyan": "#00f2ff",
                        "sun-amber": "#FFB800",
                        "storm-indigo": "#4f00d0",
                        "rain-blue": "#00b8f0"
                    },
                    borderRadius: {
                        "DEFAULT": "0.5rem",
                        "lg": "1rem",
                        "xl": "1.5rem",
                        "2xl": "2rem",
                        "full": "9999px"
                    },
                    spacing: {
                        "gutter": "1rem",
                        "stack-gap": "2rem",
                        "glass-padding": "1.5rem",
                        "container-padding": "2.5rem"
                    },
                    fontFamily: {
                        "label-sm": ["Inter"],
                        "body-lg": ["Inter"],
                        "hero": ["Inter"],
                        "headline-md": ["Inter"],
                        "headline-lg-mobile": ["Inter"],
                        "headline-lg": ["Inter"]
                    },
                    animation: {
                        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        'float': 'float 8s ease-in-out infinite',
                        'radar': 'radar 3s linear infinite',
                        'mesh': 'mesh 20s ease infinite alternate',
                        'breathe': 'breathe 4s ease-in-out infinite',
                        'omni-glow': 'omni-glow 12s infinite linear',
                        'scanline': 'scanline 8s linear infinite',
                        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
                        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0) scale(1)' },
                            '50%': { transform: 'translateY(-20px) scale(1.05)' },
                        },
                        radar: {
                            '0%': { transform: 'scale(0)', opacity: '1' },
                            '100%': { transform: 'scale(2.5)', opacity: '0' },
                        },
                        mesh: {
                            '0%': { transform: 'scale(1) translate(0, 0)' },
                            '100%': { transform: 'scale(1.2) translate(-5%, 5%)' }
                        },
                        breathe: {
                            '0%, 100%': { opacity: '0.7', transform: 'scale(0.98)' },
                            '50%': { opacity: '1', transform: 'scale(1.02)' }
                        },
                        'omni-glow': {
                            '0%, 100%': { filter: 'drop-shadow(0 0 30px rgba(0, 242, 255, 0.6))', background: 'radial-gradient(circle at 40% 40%, #00f2ff, #7c4dff, #20005f)' },
                            '33%': { filter: 'drop-shadow(0 0 40px rgba(255, 184, 0, 0.6))', background: 'radial-gradient(circle at 40% 40%, #FFB800, #FF8A00, #4f00d0)' },
                            '66%': { filter: 'drop-shadow(0 0 35px rgba(0, 184, 240, 0.6))', background: 'radial-gradient(circle at 40% 40%, #00b8f0, #00455c, #001B4B)' }
                        },
                        scanline: {
                            '0%': { transform: 'translateY(-100%)' },
                            '100%': { transform: 'translateY(100%)' }
                        },
                        heartbeat: {
                            '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
                            '15%': { transform: 'scale(1.3)', opacity: '1' },
                            '30%': { transform: 'scale(1)', opacity: '0.5' },
                            '45%': { transform: 'scale(1.3)', opacity: '1' }
                        },
                        fadeInUp: {
                            '0%': { opacity: '0', transform: 'translateY(30px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' }
                        }
                    }
                }
            }
        }
    </script>
<style>
        body {
            background-color: #050508;
            color: #e2e2e2;
            overflow-x: hidden;
            font-family: 'Inter', sans-serif;
        }

        /* Cinematic Atmospheric Environment */
        .animated-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -2;
            background: #050508;
            overflow: hidden;
        }

        .mesh-blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(120px);
            opacity: 0.4;
            animation: mesh 25s infinite alternate ease-in-out;
            mix-blend-mode: screen;
        }

        .mesh-1 { width: 70vw; height: 70vw; background: radial-gradient(circle, #ff8a00, transparent 70%); top: -10%; left: -10%; animation-delay: 0s; }
        .mesh-2 { width: 60vw; height: 60vw; background: radial-gradient(circle, #4f00d0, transparent 70%); bottom: -10%; right: -10%; animation-delay: -5s; animation-direction: reverse; }
        .mesh-3 { width: 50vw; height: 50vw; background: radial-gradient(circle, #004d66, transparent 70%); top: 30%; left: 30%; animation-delay: -10s; }

        .fog-overlay {
            position: fixed;
            inset: 0;
            z-index: -1;
            background-image: radial-gradient(circle at center, transparent 0%, rgba(5,5,8,0.8) 100%);
            pointer-events: none;
            transition: background-position 0.3s ease-out;
        }

        /* High-Refraction Glassmorphism */
        .glass-card {
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
            backdrop-filter: blur(30px);
            -webkit-backdrop-filter: blur(30px);
            border: 1px solid rgba(255, 255, 255, 0.12);
            box-shadow: 
                0 10px 40px rgba(0, 0, 0, 0.6),
                inset 0 0 30px rgba(255, 255, 255, 0.02);
            position: relative;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
        }

        .glass-card::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 1.5px;
            background: linear-gradient(to bottom right, rgba(255,255,255,0.25), rgba(255,255,255,0.02));
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
            opacity: 0.6;
        }

        .glass-card:hover {
            transform: translateY(-8px);
            border-color: rgba(0, 242, 255, 0.4);
            box-shadow: 0 20px 50px rgba(0, 242, 255, 0.15);
        }

        /* Omni-Intelligence Core */
        .omni-core {
            width: 160px;
            height: 160px;
            border-radius: 50%;
            position: relative;
            animation: float 6s ease-in-out infinite, omni-glow 12s infinite linear;
        }
        .omni-core::before, .omni-core::after {
            content: '';
            position: absolute;
            inset: -20px;
            border-radius: 50%;
            border: 2px solid rgba(255, 255, 255, 0.1);
            animation: pulse-slow 3s infinite;
        }
        .omni-core::after {
            inset: -40px;
            border-color: rgba(255, 255, 255, 0.05);
            animation-delay: 1.5s;
        }

        /* Cinematic Text */
        .text-glow {
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
        }
        .temp-glow {
            color: transparent;
            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.9);
            background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.2) 100%);
            -webkit-background-clip: text;
            filter: drop-shadow(0 0 40px rgba(124, 77, 255, 0.5));
        }

        /* Radar Scanning */
        .radar-container {
            border: 1px solid rgba(0, 242, 255, 0.2);
        }
        .scan-line {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(to right, transparent, #00f2ff, transparent);
            box-shadow: 0 0 15px #00f2ff;
            animation: scanline 4s linear infinite;
            z-index: 20;
            opacity: 0.6;
        }

        /* Shimmer Effects */
        .shimmer-hover::after {
            content: '';
            position: absolute;
            top: 0;
            left: -150%;
            width: 80%;
            height: 100%;
            background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
            transform: skewX(-25deg);
            transition: all 0.9s ease;
        }
        .glass-card:hover .shimmer-hover::after {
            left: 200%;
        }

        .stagger-1 { opacity: 0; animation: fade-in-up 0.8s ease-out 0.1s forwards; }
        .stagger-2 { opacity: 0; animation: fade-in-up 0.8s ease-out 0.2s forwards; }
        .stagger-3 { opacity: 0; animation: fade-in-up 0.8s ease-out 0.3s forwards; }
        .stagger-4 { opacity: 0; animation: fade-in-up 0.8s ease-out 0.4s forwards; }
        .stagger-5 { opacity: 0; animation: fade-in-up 0.8s ease-out 0.5s forwards; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .magnetic-btn {
            transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .magnetic-btn:hover {
            transform: scale(1.1);
        }
        .magnetic-btn:active {
            transform: scale(0.9);
        }
    </style>
</head>
<body class="min-h-screen pb-32">
<!-- Atmospheric Layering -->
<div class="animated-bg">
<div class="mesh-blob mesh-1"></div>
<div class="mesh-blob mesh-2"></div>
<div class="mesh-blob mesh-3"></div>
<div class="fog-overlay" id="fog"></div>
<canvas class="absolute inset-0 opacity-40" id="particles-canvas"></canvas>
</div>
<!-- Top AppBar Component -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 py-6 backdrop-blur-xl border-b border-white/5 stagger-1">
<div class="flex items-center gap-5">
<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-neon-cyan flex items-center justify-center shadow-[0_0_25px_rgba(0,242,255,0.4)] animate-pulse">
<span class="material-symbols-outlined text-white font-bold text-3xl">cloud_sync</span>
</div>
<h1 class="text-3xl font-hero font-bold tracking-tighter text-white drop-shadow-[0_0_20px_rgba(205,189,255,0.6)]">
                Aura Weather Pro X
            </h1>
</div>
<div class="flex items-center gap-4">
<div class="hidden md:flex bg-black/40 border border-white/10 rounded-full px-6 py-2 items-center gap-3 glass-card">
<span class="material-symbols-outlined text-neon-cyan text-sm">search</span>
<input class="bg-transparent border-none focus:ring-0 text-sm text-white w-48 placeholder:text-white/20" placeholder="Global Sat-Link Search..." type="text"/>
</div>
<button class="magnetic-btn w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:border-neon-cyan/50 transition-all">
<span class="material-symbols-outlined text-white">location_on</span>
</button>
<button class="magnetic-btn w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:border-neon-cyan/50 transition-all">
<span class="material-symbols-outlined text-white">settings</span>
</button>
</div>
</header>
<main class="container mx-auto px-10 pt-32 flex flex-col gap-10 max-w-[1600px]">
<!-- Hero Section: Current Atmospheric Status -->
<div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
<!-- Weather Hero (7 Columns) -->
<section class="xl:col-span-7 stagger-2">
<div class="glass-card rounded-[3.5rem] p-12 h-full flex flex-col justify-between group shimmer-hover">
<div class="absolute top-12 right-12 opacity-80 group-hover:opacity-100 transition-all duration-1000 transform group-hover:scale-110 group-hover:rotate-6">
<span class="material-symbols-outlined text-[240px] text-tertiary/40 fill filter drop-shadow-[0_0_60px_rgba(255,182,136,0.5)]">wb_sunny</span>
</div>
<div class="relative z-10">
<div class="flex items-center gap-4 mb-8">
<div class="px-5 py-2 bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan text-xs font-bold tracking-[0.3em] rounded-full uppercase flex items-center gap-3">
<div class="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-pulse"></div>
                                Live Sat-Com Feed
                            </div>
</div>
<h2 class="text-8xl font-hero font-bold text-white mb-6 text-glow tracking-tighter">San Francisco</h2>
<p class="text-3xl text-on-surface-variant font-light opacity-90">Mostly Clear • Low humidity levels • UV 4</p>
</div>
<div class="flex items-end justify-between relative z-10 mt-12">
<div class="flex items-baseline gap-6">
<span class="text-[180px] font-hero font-bold leading-none tracking-tighter temp-glow">70°</span>
<div class="flex flex-col gap-4 pb-8">
<span class="text-neon-cyan text-4xl font-bold text-glow">C</span>
<div class="w-12 h-[3px] bg-white/20"></div>
<span class="text-white/30 text-4xl font-medium">F</span>
</div>
</div>
<div class="grid grid-cols-2 gap-6">
<div class="glass-card bg-black/30 border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center min-w-[180px] hover:bg-white/10 transition-all">
<span class="material-symbols-outlined text-neon-cyan text-4xl mb-3 animate-breathe">air</span>
<span class="text-xs text-neon-cyan/70 tracking-widest uppercase font-bold mb-1">Wind Speed</span>
<span class="text-3xl font-bold text-white">12 <span class="text-lg text-white/50 font-normal">mph</span></span>
</div>
<div class="glass-card bg-black/30 border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center min-w-[180px] hover:bg-white/10 transition-all">
<span class="material-symbols-outlined text-sun-amber text-4xl mb-3 animate-breathe">humidity_mid</span>
<span class="text-xs text-sun-amber/70 tracking-widest uppercase font-bold mb-1">Moisture</span>
<span class="text-3xl font-bold text-white">45<span class="text-lg text-white/50 font-normal">%</span></span>
</div>
</div>
</div>
</div>
</section>
<!-- Omni-Intelligence Core Briefing (5 Columns) -->
<section class="xl:col-span-5 stagger-2">
<div class="glass-card rounded-[3.5rem] p-12 h-full flex flex-col border-neon-cyan/20 relative shimmer-hover shadow-[inset_0_0_60px_rgba(0,242,255,0.05)]">
<div class="flex items-center justify-between mb-12">
<div class="flex items-center gap-8">
<div class="omni-core"></div>
<div>
<h3 class="text-3xl font-bold text-white text-glow mb-2">Omni-Core Pro X</h3>
<p class="text-sm text-neon-cyan font-bold tracking-widest uppercase">Intuitive Intelligence Active</p>
</div>
</div>
</div>
<div class="flex-grow flex flex-col gap-6 mb-10">
<div class="glass-card bg-gradient-to-br from-white/5 to-white/0 border-white/10 rounded-3xl p-8 shadow-2xl relative">
<div class="absolute -top-3 -left-3 px-4 py-1 bg-neon-cyan text-background text-[10px] font-bold rounded-lg tracking-widest">CORE_BRIEF</div>
<p class="text-lg leading-relaxed text-white/95 font-medium italic">
                                "Weather conditions are optimal for outdoor activities until 6 PM. A minor pressure drop expected at 8 PM might trigger slight winds. Recommendation: Carry a light layer for the transition into evening."
                            </p>
<div class="mt-6 flex items-center justify-between border-t border-white/10 pt-6">
<div class="flex flex-col">
<span class="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Lifestyle Impact</span>
<span class="text-neon-cyan font-bold">Peak Commute Comfort</span>
</div>
<div class="flex gap-2">
<div class="w-2 h-2 rounded-full bg-neon-cyan"></div>
<div class="w-2 h-2 rounded-full bg-neon-cyan/30"></div>
<div class="w-2 h-2 rounded-full bg-neon-cyan/30"></div>
</div>
</div>
</div>
<div class="flex flex-wrap gap-4">
<button class="magnetic-btn px-6 py-3 glass-card bg-black/40 hover:bg-neon-cyan/20 border-white/10 hover:border-neon-cyan/50 text-sm font-bold tracking-wide rounded-full transition-all text-white/80 hover:text-white">
                                "Optimal wear for tonight?"
                            </button>
<button class="magnetic-btn px-6 py-3 glass-card bg-black/40 hover:bg-primary/20 border-white/10 hover:border-primary/50 text-sm font-bold tracking-wide rounded-full transition-all text-white/80 hover:text-white">
                                "Tahoe trajectory?"
                            </button>
</div>
</div>
<div class="relative glass-card bg-black/60 border-white/10 rounded-2xl p-3 flex items-center group focus-within:border-neon-cyan/50">
<input class="w-full bg-transparent border-none text-lg focus:ring-0 px-6 text-white placeholder:text-white/30" placeholder="Interface with Omni-Core..." type="text"/>
<button class="magnetic-btn w-14 h-14 bg-gradient-to-r from-neon-cyan via-primary to-storm-indigo text-white rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(0,242,255,0.4)]">
<span class="material-symbols-outlined font-bold text-2xl">send</span>
</button>
</div>
</div>
</section>
</div>
<!-- Secondary Row: Tactical Visualization -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
<!-- Air Quality (3 Columns) -->
<section class="lg:col-span-3 stagger-3">
<div class="glass-card rounded-[3rem] p-10 h-full flex flex-col items-center shimmer-hover group">
<div class="w-full flex justify-between items-center mb-10">
<h3 class="text-2xl font-bold text-white">Atmospheric Health</h3>
<span class="material-symbols-outlined text-neon-cyan">info</span>
</div>
<div class="relative w-56 h-56 flex items-center justify-center animate-breathe">
<svg class="w-full h-full transform -rotate-90" viewbox="0 0 100 100">
<circle cx="50" cy="50" fill="none" r="44" stroke="rgba(255,255,255,0.05)" stroke-width="10"></circle>
<circle class="drop-shadow-[0_0_20px_rgba(0,242,255,0.8)]" cx="50" cy="50" fill="none" r="44" stroke="url(#aqi-gradient)" stroke-dasharray="276" stroke-dashoffset="180" stroke-linecap="round" stroke-width="10"></circle>
<defs>
<lineargradient id="aqi-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
<stop offset="0%" stop-color="#cdbdff"></stop>
<stop offset="100%" stop-color="#00f2ff"></stop>
</lineargradient>
</defs>
</svg>
<div class="absolute flex flex-col items-center">
<span class="text-6xl font-bold text-white tracking-tighter text-glow">42</span>
<span class="text-sm font-bold text-neon-cyan tracking-[0.3em] uppercase mt-2">Excellent</span>
</div>
</div>
<div class="mt-12 w-full grid grid-cols-2 gap-6">
<div class="glass-card bg-black/30 p-5 rounded-2xl text-center border-white/5">
<p class="text-[11px] text-neon-cyan/70 uppercase font-bold mb-1 tracking-widest">PM2.5</p>
<p class="text-xl font-bold text-white">12 <span class="text-xs font-normal text-white/50">μg/m³</span></p>
</div>
<div class="glass-card bg-black/30 p-5 rounded-2xl text-center border-white/5">
<p class="text-[11px] text-sun-amber/70 uppercase font-bold mb-1 tracking-widest">O3</p>
<p class="text-xl font-bold text-white">24 <span class="text-xs font-normal text-white/50">ppb</span></p>
</div>
</div>
</div>
</section>
<!-- 24-Hour Projection (6 Columns) -->
<section class="lg:col-span-6 stagger-3">
<div class="glass-card rounded-[3rem] p-10 h-full shimmer-hover">
<div class="flex items-center justify-between mb-10">
<h3 class="text-2xl font-bold text-white">Tactical Timeline</h3>
<div class="flex gap-2 bg-black/50 p-1.5 rounded-2xl border border-white/10 glass-card">
<button class="px-6 py-2 bg-gradient-to-r from-neon-cyan/20 to-primary/20 border border-neon-cyan/40 text-white text-[11px] font-bold rounded-xl uppercase tracking-widest shadow-xl">Temperature</button>
<button class="px-6 py-2 text-white/40 text-[11px] font-bold rounded-xl uppercase tracking-widest hover:text-white transition-all">Precipitation</button>
</div>
</div>
<div class="flex gap-6 overflow-x-auto no-scrollbar pb-6 pt-4">
<!-- Projection Item -->
<div class="flex flex-col items-center justify-between min-w-[110px] py-8 px-6 glass-card border-neon-cyan/50 bg-neon-cyan/10 rounded-[2.5rem] relative group shadow-2xl">
<div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-neon-cyan to-primary shadow-[0_0_15px_#00f2ff]"></div>
<span class="text-sm font-bold text-neon-cyan tracking-widest uppercase">Live</span>
<span class="material-symbols-outlined text-sun-amber text-5xl my-6 fill filter drop-shadow-[0_0_15px_rgba(255,184,0,0.6)]">wb_sunny</span>
<span class="text-3xl font-bold text-white">70°</span>
</div>
<!-- Repeats for timeline -->
<div class="flex flex-col items-center justify-between min-w-[110px] py-8 px-6 glass-card bg-black/40 border-white/5 rounded-[2.5rem] hover:border-white/20 transition-all">
<span class="text-sm font-bold text-white/40 tracking-widest">2 PM</span>
<span class="material-symbols-outlined text-tertiary text-5xl my-6 fill">wb_sunny</span>
<span class="text-3xl font-bold text-white">72°</span>
</div>
<div class="flex flex-col items-center justify-between min-w-[110px] py-8 px-6 glass-card bg-black/40 border-white/5 rounded-[2.5rem] hover:border-white/20 transition-all">
<span class="text-sm font-bold text-white/40 tracking-widest">3 PM</span>
<span class="material-symbols-outlined text-white/60 text-5xl my-6">wb_cloudy</span>
<span class="text-3xl font-bold text-white">71°</span>
</div>
<div class="flex flex-col items-center justify-between min-w-[110px] py-8 px-6 glass-card bg-black/40 border-white/5 rounded-[2.5rem] hover:border-white/20 transition-all">
<span class="text-sm font-bold text-white/40 tracking-widest">4 PM</span>
<span class="material-symbols-outlined text-white/60 text-5xl my-6">cloud</span>
<span class="text-3xl font-bold text-white">69°</span>
</div>
<div class="flex flex-col items-center justify-between min-w-[110px] py-8 px-6 glass-card bg-black/40 border-white/5 rounded-[2.5rem] hover:border-white/20 transition-all">
<span class="text-sm font-bold text-white/40 tracking-widest">5 PM</span>
<span class="material-symbols-outlined text-rain-blue text-5xl my-6 drop-shadow-[0_0_10px_rgba(0,184,240,0.4)]">rainy</span>
<span class="text-3xl font-bold text-white">66°</span>
</div>
</div>
<!-- Wet-Glass Sparkline -->
<div class="mt-8 h-24 w-full relative group">
<svg class="w-full h-full" preserveaspectratio="none" viewbox="0 0 100 100">
<path d="M0,50 Q10,40 20,45 T40,30 T60,60 T80,20 T100,40" fill="none" stroke="url(#line-grad-2)" stroke-width="4" style="filter: drop-shadow(0 0 12px rgba(0,242,255,0.8));"></path>
<path d="M0,50 Q10,40 20,45 T40,30 T60,60 T80,20 T100,40 V100 H0 Z" fill="url(#wet-glass-grad)" opacity="0.4"></path>
<defs>
<lineargradient id="line-grad-2" x1="0" x2="1" y1="0" y2="0">
<stop offset="0%" stop-color="#00f2ff"></stop>
<stop offset="100%" stop-color="#7c4dff"></stop>
</lineargradient>
<lineargradient id="wet-glass-grad" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#00f2ff"></stop>
<stop offset="100%" stop-color="transparent"></stop>
</lineargradient>
</defs>
</svg>
</div>
</div>
</section>
<!-- Alerts & Sensor Readouts (3 Columns) -->
<section class="lg:col-span-3 flex flex-col gap-8 stagger-3">
<div class="glass-card rounded-[3rem] p-8 border-red-500/30 bg-red-950/10 flex-1 relative overflow-hidden group shadow-[inset_0_0_40px_rgba(255,0,0,0.05)]">
<div class="absolute top-0 left-0 w-full h-1.5 bg-red-500 shadow-[0_0_20px_#ff0000]"></div>
<div class="flex items-center gap-4 mb-6">
<div class="p-3 bg-red-500/20 rounded-xl">
<span class="material-symbols-outlined text-red-500 animate-pulse drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]">warning</span>
</div>
<h3 class="text-xl font-bold text-white tracking-wide">SYSTEM ALERT</h3>
</div>
<p class="text-base text-red-100/80 font-medium leading-relaxed">Flash fog potential in coastal areas after midnight. Visibility drop projected &lt; 0.5mi.</p>
</div>
<div class="glass-card rounded-[3rem] p-8 flex flex-col justify-between flex-1 group shimmer-hover">
<div class="flex justify-between items-center mb-6">
<h3 class="text-sm font-bold text-white/50 tracking-[0.3em] uppercase">Sensor Mesh</h3>
<div class="flex items-center gap-2 px-3 py-1 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
<div class="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></div>
<span class="text-[10px] text-neon-cyan font-bold tracking-widest">ACTIVE</span>
</div>
</div>
<div class="grid grid-cols-2 gap-4 mt-auto">
<div class="p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-neon-cyan/40 transition-all">
<span class="text-[10px] text-neon-cyan/60 block font-bold tracking-widest uppercase mb-1">Pressure</span>
<span class="text-xl font-bold text-white">1012 <span class="text-sm font-normal opacity-40">hPa</span></span>
</div>
<div class="p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-neon-cyan/40 transition-all">
<span class="text-[10px] text-sun-amber/60 block font-bold tracking-widest uppercase mb-1">UV Index</span>
<span class="text-xl font-bold text-white">4.2 <span class="text-sm font-normal opacity-40">L</span></span>
</div>
</div>
</div>
</section>
</div>
<!-- Bottom Row: Radar & 7-Day Prediction -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
<!-- 7-Day Orbital Projection (5 Columns) -->
<section class="lg:col-span-5 stagger-4">
<div class="glass-card rounded-[3.5rem] p-10 h-full shimmer-hover">
<h3 class="text-2xl font-bold text-white mb-10">Orbital Projection</h3>
<div class="flex flex-col gap-3">
<!-- Prediction Row -->
<div class="flex items-center justify-between py-5 border-b border-white/10 hover:bg-white/5 transition-all px-6 rounded-[2rem] cursor-pointer group">
<span class="text-white font-bold w-24 text-lg group-hover:text-neon-cyan transition-colors">Today</span>
<span class="material-symbols-outlined text-sun-amber text-3xl fill drop-shadow-[0_0_10px_rgba(255,184,0,0.5)]">wb_sunny</span>
<div class="flex items-center flex-1 justify-end gap-6">
<span class="text-base text-white/40 font-medium">58°</span>
<div class="w-40 h-3 bg-black/60 rounded-full relative overflow-hidden border border-white/10">
<div class="absolute left-1/4 right-0 h-full bg-gradient-to-r from-neon-cyan via-primary to-sun-amber rounded-full shadow-lg"></div>
</div>
<span class="text-xl font-bold text-white">72°</span>
</div>
</div>
<div class="flex items-center justify-between py-5 border-b border-white/10 hover:bg-white/5 transition-all px-6 rounded-[2rem] cursor-pointer group">
<span class="text-white/80 font-bold w-24 text-lg group-hover:text-white">Tomorrow</span>
<span class="material-symbols-outlined text-white/40 text-3xl">partly_cloudy_day</span>
<div class="flex items-center flex-1 justify-end gap-6">
<span class="text-base text-white/40 font-medium">55°</span>
<div class="w-40 h-3 bg-black/60 rounded-full relative overflow-hidden border border-white/10">
<div class="absolute left-[15%] right-[20%] h-full bg-gradient-to-r from-neon-cyan to-sun-amber rounded-full"></div>
</div>
<span class="text-xl font-bold text-white">68°</span>
</div>
</div>
<div class="flex items-center justify-between py-5 hover:bg-white/5 transition-all px-6 rounded-[2rem] cursor-pointer group">
<span class="text-white/80 font-bold w-24 text-lg group-hover:text-white">Wed</span>
<span class="material-symbols-outlined text-rain-blue text-3xl drop-shadow-md">rainy</span>
<div class="flex items-center flex-1 justify-end gap-6">
<span class="text-base text-white/40 font-medium">50°</span>
<div class="w-40 h-3 bg-black/60 rounded-full relative overflow-hidden border border-white/10">
<div class="absolute left-0 right-[40%] h-full bg-gradient-to-r from-neon-cyan to-rain-blue rounded-full"></div>
</div>
<span class="text-xl font-bold text-white">60°</span>
</div>
</div>
</div>
</div>
</section>
<!-- Cinematic Tactical Radar (7 Columns) -->
<section class="lg:col-span-7 stagger-4">
<div class="glass-card radar-container rounded-[3.5rem] p-4 h-full relative overflow-hidden min-h-[500px] group">
<div class="absolute top-12 left-12 z-30 flex flex-col gap-4">
<h3 class="text-4xl font-hero font-bold text-white text-glow tracking-tighter">Tactical Radar X</h3>
<div class="flex items-center gap-3 px-4 py-1.5 bg-black/80 backdrop-blur-xl rounded-xl border border-neon-cyan/40 w-fit">
<span class="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-pulse"></span>
<span class="text-[11px] text-neon-cyan font-bold tracking-[0.3em] uppercase">SYSTEM MASTER LINK ACTIVE</span>
</div>
</div>
<div class="absolute inset-0 z-10 opacity-20 pointer-events-none" style="background-image: linear-gradient(rgba(0, 242, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 255, 0.2) 1px, transparent 1px); background-size: 50px 50px;"></div>
<div class="scan-line"></div>
<div class="absolute z-20 left-1/2 top-1/2 rounded-full border border-neon-cyan/50 animate-radar" style="width: 150px; height: 150px; margin-left: -75px; margin-top: -75px; box-shadow: inset 0 0 30px rgba(0,242,255,0.3);"></div>
<div class="absolute z-20 left-1/2 top-1/2 w-3 h-3 bg-neon-cyan rounded-full shadow-[0_0_15px_#00f2ff]" style="margin-left: -6px; margin-top: -6px;"></div>
<div class="w-full h-full rounded-[3rem] overflow-hidden relative">
<img alt="Advanced Sat Radar" class="w-full h-full object-cover opacity-80 scale-105 group-hover:scale-110 transition-transform duration-[20s] ease-linear mix-blend-screen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzYRke-hh5IAocL07MswBZl-OGXWk92W2Iu1W9rmM_eHiikCvlSq1DIloenxHUN-b-VjXr2YwlTSzoi2JTUoC90v94sWhvE4Hrpxvqoi8rPUPZwnuH8D8RRbHESrSnXIfct3P9o2lTJpaQFP6D_tx1qcwwgZ8G1S1GLrXroF6pYG-yNxsuQwShiLaMHyNxK77foe7i85fp6DPNHBuk3YMZr_kPlbCJbOYisjOEUgleZtvajOkIh5HgJijgsIyWoDu4d_xS_8LePb0"/>
<div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none"></div>
<div class="absolute inset-0 shadow-[inset_0_0_120px_rgba(5,5,8,0.95)] pointer-events-none"></div>
</div>
<div class="absolute bottom-12 right-12 flex flex-col gap-4 z-30">
<button class="magnetic-btn w-14 h-14 rounded-2xl glass-card bg-black/90 border-white/20 flex items-center justify-center hover:text-neon-cyan transition-all">
<span class="material-symbols-outlined text-2xl">add</span>
</button>
<button class="magnetic-btn w-14 h-14 rounded-2xl glass-card bg-black/90 border-white/20 flex items-center justify-center hover:text-neon-cyan transition-all">
<span class="material-symbols-outlined text-2xl">remove</span>
</button>
<button class="magnetic-btn w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-cyan to-primary text-background border-none flex items-center justify-center shadow-2xl">
<span class="material-symbols-outlined font-bold text-2xl">layers</span>
</button>
</div>
<div class="absolute bottom-12 left-12 z-30 font-mono text-[11px] text-neon-cyan/70 flex flex-col gap-1 tracking-widest uppercase bg-black/40 p-4 rounded-xl backdrop-blur-md">
<span>LAT: 37.7749° N</span>
<span>LON: 122.4194° W</span>
<span>ELEV: 52FT</span>
<div class="mt-2 text-white/30 text-[9px]">Aryan Rathore System Build 0.1v</div>
</div>
</div>
</section>
</div>
</main>
<!-- Bottom NavBar Component -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-10 pb-8 pt-4 bg-surface/10 backdrop-blur-3xl border-t border-white/10 shadow-2xl">
<button class="flex flex-col items-center justify-center text-secondary drop-shadow-[0_0_10px_rgba(0,184,240,0.6)] group">
<span class="material-symbols-outlined text-3xl mb-1 fill group-hover:scale-110 transition-transform">cloudy</span>
<span class="text-[10px] font-label-sm font-bold tracking-widest uppercase">Forecast</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant/70 hover:text-secondary transition-all group">
<span class="material-symbols-outlined text-3xl mb-1 group-hover:scale-110 transition-transform">layers</span>
<span class="text-[10px] font-label-sm font-bold tracking-widest uppercase">Radar</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant/70 hover:text-secondary transition-all group">
<span class="material-symbols-outlined text-3xl mb-1 group-hover:scale-110 transition-transform">air</span>
<span class="text-[10px] font-label-sm font-bold tracking-widest uppercase">Air Health</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant/70 hover:text-error transition-all group">
<span class="material-symbols-outlined text-3xl mb-1 group-hover:scale-110 transition-transform">warning</span>
<span class="text-[10px] font-label-sm font-bold tracking-widest uppercase">Alerts</span>
</button>
</nav>
<footer class="container mx-auto px-10 py-12 text-center flex flex-col items-center justify-center gap-6 opacity-40">
<div class="flex items-center gap-4 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 backdrop-blur-xl">
<div class="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-heartbeat shadow-[0_0_12px_#00f2ff]"></div>
<span class="text-[11px] text-neon-cyan font-bold tracking-[0.4em] uppercase">Omni-Intelligence Active</span>
</div>
<div class="text-[10px] tracking-[0.5em] font-bold uppercase text-white/20">
            © 2024 Aura Weather Pro X • Tactical Ecosystem • Aryan Rathore Design
        </div>
</footer>
<script>
        // Cinematic Particle System (Golden & Cyan Dust)
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.8 + 0.4;
                this.speedX = (Math.random() - 0.5) * 0.25;
                this.speedY = (Math.random() - 0.5) * 0.25 - 0.15; // Slow upward drift
                this.opacity = Math.random() * 0.4 + 0.1;
                const colors = ['rgba(0, 242, 255,', 'rgba(255, 184, 0,', 'rgba(205, 189, 255,'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }
            draw() {
                ctx.fillStyle = `${this.color} ${this.opacity})`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color.replace(',', ')');
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            resize();
            for (let i = 0; i < 120; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        init();
        animate();

        // Interactive Atmospheric Response
        const fog = document.getElementById('fog');
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            fog.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
        });

        // Magnetic Hover Logic
        document.querySelectorAll('.magnetic-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    </script>
</body></html>
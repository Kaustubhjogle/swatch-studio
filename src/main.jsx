import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowLeft, ArrowRight, RotateCcw, Copy, Check, MousePointer2, MoveHorizontal, ChevronDown, X, Info, Sun, Moon, Play, Pause } from 'lucide-react';
import '@fontsource/inter-tight/latin-400.css';
import '@fontsource/inter-tight/latin-500.css';
import '@fontsource/inter-tight/latin-600.css';
import data from './colors.json';
import Wheel from './Wheel';
import './style.css';

const colors=data.colors;
const descriptions={
 'All palettes':'Seven colour stories. Find your own combinations.',
 'Powdered Pastels':'Soft pastels and gentle neutrals.',
 'Take a Break':'Warm caramels, playful pinks, and fresh citrus.',
 'Atmospheric':'Misty skies, open water, and deeper blues.',
 'Comfort Zone':'Warm, grounded shades with an organic feel.',
 'Tropic Tonalities':'Vivid yellows, turquoise, and tropical pinks.',
 'Light & Shadow':'Soft colour balanced with deeper contrast.',
 'Glamour & Gleam':'Rich red, wine, teal, and dark neutrals.'
};
function initialTheme(){try{return localStorage.getItem('swatch-theme')==='dark'?'dark':'light';}catch{return 'light';}}
if ('scrollRestoration' in history) history.scrollRestoration='manual';
function App(){
 const [theme,setTheme]=useState(initialTheme);
 const [standColor,setStandColor]=useState(()=>{try{return localStorage.getItem('swatch-stand')||'white';}catch{return 'white';}});
 const [playing,setPlaying]=useState(false);
 useEffect(()=>{try{localStorage.setItem('swatch-stand',standColor);}catch{}},[standColor]);
 useLayoutEffect(()=>{window.scrollTo({top:0,left:0,behavior:'instant'});},[]);
 useEffect(()=>{document.documentElement.dataset.theme=theme;try{localStorage.setItem('swatch-theme',theme);}catch{}},[theme]);
 const [selected,setSelected]=useState(colors[0].id),[palette,setPalette]=useState('All palettes'),[copied,setCopied]=useState(''),[about,setAbout]=useState(false);
 const api=useRef(null),timer=useRef(null);const current=colors.find(c=>c.id===selected),index=colors.indexOf(current);
 const visible=palette==='All palettes'?colors:data.palettes.find(p=>p.name===palette).colors.map(id=>colors.find(c=>c.id===id));
 const belongs=data.palettes.filter(p=>p.colors.includes(current.id));
 function select(id,animate=true,automatic=false){if(!automatic)setPlaying(false);setSelected(id);if(animate)api.current?.select(colors.findIndex(c=>c.id===id));}
 function step(n){const list=visible;const i=list.findIndex(c=>c.id===selected);const next=i<0?(n>0?0:list.length-1):(i+n+list.length)%list.length;select(list[next].id);}
 useEffect(()=>{if(!playing)return;const timeout=setTimeout(()=>{if(document.hidden){setPlaying(false);return;}const i=visible.findIndex(c=>c.id===selected);select(visible[(i+1)%visible.length].id,true,true);},2000);return()=>clearTimeout(timeout);},[playing,selected,palette]);
 function changePalette(value){setPalette(value);if(value!=='All palettes'){const p=data.palettes.find(p=>p.name===value);if(!p.colors.includes(selected))select(p.colors[0]);}}
 async function copy(value,key){try{await navigator.clipboard.writeText(value);setCopied(key);clearTimeout(timer.current);timer.current=setTimeout(()=>setCopied(''),1800);}catch{setCopied('failed');}}
 const rgb=current.hex.match(/\w\w/g).map(x=>parseInt(x,16));
 return (
   <div className="app">
     <header className="header">
       <a
         href="#"
         className="brand"
         aria-label="Swatch Studio home"
         onClick={(e) => {
           e.preventDefault();
           changePalette("All palettes");
           select(colors[0].id);
         }}
       >
         <span className="brand-mark">
           <i />
           <i />
           <i />
         </span>
         swatch<span className="brand-light">studio</span>
         <span className="brand-period">.</span>
       </a>
       <div className="header-right">
         <span className="edition">Colour, in motion</span>
         <button
           className="theme-toggle"
           onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
           aria-label={
             theme === "light"
               ? "Switch to dark theme"
               : "Switch to light theme"
           }
           title={theme === "light" ? "Dark theme" : "Light theme"}
         >
           {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
         </button>
         <button
           className="stand-toggle"
           onClick={() =>
             setStandColor((c) => (c === "white" ? "black" : "white"))
           }
           aria-label={
             standColor === "white"
               ? "Switch wheel to black"
               : "Switch wheel to white"
           }
           title="Change wheel colour"
         >
           <span className={`stand-dot ${standColor}`} />
           <span className="stand-label">Wheel</span>
         </button>
         <span className="header-divider" />
         <button className="text-button" onClick={() => setAbout((v) => !v)}>
           About the studio <ArrowUpRight size={15} />
         </button>
       </div>
     </header>
     {about && (
       <aside className="about-panel">
         <button
           className="close"
           onClick={() => setAbout(false)}
           aria-label="Close about"
         >
           <X size={18} />
         </button>
         <h2>A little room for colour.</h2>
         <p>
           A digital take on the 3D-printed filament swatch wheel. Turn the
           wheel, lift a shade, and explore how colour feels alongside its
           neighbours.
         </p>
         <p>
           A local colour study with 50 shades, grouped into seven palettes.
           Built around the original 3D-printed swatch stand.
         </p>
            <p>Kaustubh Jogle ™</p>
       </aside>
     )}
     <main>
       <div className="intro">
         <div>
           <h1>A new spin on colour.</h1>
           <p>Slow down. Turn the wheel. Find your shade.</p>
         </div>
         <div className="collection-pill">
           50 colours <span>Endless combinations</span>
         </div>
       </div>
       <section className="explorer" aria-label="Colour explorer">
         <div
           className="stage"
           onKeyDown={(e) => {
             if (e.key === "ArrowRight") {
               e.preventDefault();
               step(1);
             }
             if (e.key === "ArrowLeft") {
               e.preventDefault();
               step(-1);
             }
           }}
           tabIndex={0}
           aria-label="Swatch wheel. Use left and right arrow keys to select colours."
         >
           <div className="stage-top">
             <span>
               <span className="live-dot" />
               Interactive 3D
             </span>
             <span>50 shades · 7 palettes</span>
           </div>
           <Wheel
             colors={colors}
             selected={selected}
             standColor={standColor}
             onInteract={() => setPlaying(false)}
             onSelect={select}
             apiRef={api}
           />
           <div className="stage-bottom">
             <span className="gesture">
               <MoveHorizontal size={17} />
               Drag to explore <span>·</span>
               <MousePointer2 size={13} />
               Click to lift
             </span>
             <div className="wheel-actions">
               <button
                 className="reset autoplay"
                 onClick={() => setPlaying((p) => !p)}
                 aria-label={
                   playing ? "Pause colour slideshow" : "Play colour slideshow"
                 }
                 aria-pressed={playing}
                 title={playing ? "Pause" : "Next colour every 2 seconds"}
               >
                 {playing ? <Pause size={15} /> : <Play size={15} />}
               </button>
               <button
                 className="reset"
                 onClick={() => {
                   changePalette("All palettes");
                   select(colors[0].id);
                 }}
                 aria-label="Reset colour wheel"
               >
                 <RotateCcw size={16} />
               </button>
             </div>
           </div>
         </div>
         <aside
           className="details"
           aria-label="Selected colour details"
           aria-live="polite"
         >
           <div className="details-top">
             <span>IN FOCUS</span>
             <span className="index">
               {String(index + 1).padStart(2, "0")} <span>/ 50</span>
             </span>
           </div>
           <div className="large-swatch" style={{ background: current.hex }}>
             <span
               className="swatch-caption"
               style={{
                 color:
                   rgb.reduce((a, b) => a + b, 0) > 420 ? "#171b1e" : "#fff",
               }}
             >
               COLOUR<small>{current.hex}</small>
             </span>
           </div>
           <div className="colour-title">
             <h2>{current.name}</h2>
             <span>{belongs[0]?.name}</span>
           </div>
           <div className="colour-values">
             <button
               className="value"
               onClick={() => copy(current.hex, "hex")}
               aria-label={`Copy HEX ${current.hex}`}
             >
               <span>HEX</span>
               <strong>{current.hex}</strong>
               {copied === "hex" ? <Check size={16} /> : <Copy size={15} />}
             </button>
             <button
               className="value"
               onClick={() => copy(`rgb(${rgb.join(", ")})`, "rgb")}
               aria-label="Copy RGB value"
             >
               <span>RGB</span>
               <strong>{rgb.join(", ")}</strong>
               {copied === "rgb" ? <Check size={16} /> : <Copy size={15} />}
             </button>
           </div>
           <div className="palette-membership">
             <span>PART OF</span>
             <div>
               {belongs.map((p) => (
                 <button key={p.name} onClick={() => changePalette(p.name)}>
                   {p.name}
                   <ArrowUpRight size={12} />
                 </button>
               ))}
             </div>
           </div>
           <div className="detail-navigation">
             <button
               className="arrow-button"
               onClick={() => step(-1)}
               aria-label="Previous colour"
             >
               <ArrowLeft size={18} />
             </button>
             <span>
               {copied === "hex" || copied === "rgb"
                 ? "Copied to clipboard"
                 : copied === "failed"
                   ? "Copy unavailable in this browser"
                   : "A shade worth pausing for."}
             </span>
             <button
               className="arrow-button"
               onClick={() => step(1)}
               aria-label="Next colour"
             >
               <ArrowRight size={18} />
             </button>
           </div>
         </aside>
       </section>
       <section className="library" aria-label="Palette library">
         <div className="library-heading">
           <div>
             <h2>The colour stories</h2>
             <p>{descriptions[palette]}</p>
           </div>
           <div className="select-wrapper">
             <label htmlFor="palette">Palette</label>
             <select
               id="palette"
               value={palette}
               onChange={(e) => changePalette(e.target.value)}
             >
               <option>All palettes</option>
               {data.palettes.map((p) => (
                 <option key={p.name}>{p.name}</option>
               ))}
             </select>
             <ChevronDown size={14} />
           </div>
         </div>
         <div className="colour-strip">
           {visible.map((c) => (
             <button
               key={c.id}
               className={`colour-chip ${selected === c.id ? "selected" : ""}`}
               onClick={() => select(c.id)}
               aria-label={`${c.name}, ${c.hex}`}
               aria-pressed={selected === c.id}
               style={{ "--chip": c.hex }}
             >
               <span className="chip-fill" />
               {selected === c.id && <span className="chip-indicator" />}
               <span className="chip-tooltip">{c.name}</span>
             </button>
           ))}
         </div>
         <div className="strip-caption">
           <span>
             {visible.length} {visible.length === 1 ? "colour" : "colours"} to
             explore
           </span>
           <span>Every shade begins a different story.</span>
         </div>
       </section>
     </main>
     <footer>
       <span>Made for the love of colour.</span>
       <span className="approximation">
         <Info size={12} />
         Screen colours are approximate.
       </span>
       <span>Kaustubh Jogle ™</span>
     </footer>
   </div>
 );
}

createRoot(document.getElementById('root')).render(<App/>);

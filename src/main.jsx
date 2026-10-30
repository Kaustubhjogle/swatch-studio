import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowLeft, ArrowRight, RotateCcw, Copy, Check, MousePointer2, MoveHorizontal, ChevronDown, X, Info } from 'lucide-react';
import '@fontsource/inter-tight/latin-400.css';
import '@fontsource/inter-tight/latin-500.css';
import '@fontsource/inter-tight/latin-600.css';
import data from './colors.json';
import Wheel from './Wheel';
import './style.css';

const colors=[...data.colors].sort((a,b)=>a.name==='Cloud Dancer'?-1:b.name==='Cloud Dancer'?1:0);
const descriptions={
 'All palettes':'Seven colour stories. One starting point.',
 'Powdered Pastels':'Gentle pastels and quiet neutrals, in delicate balance.',
 'Take a Break':'Warm, playful shades with a little sweetness.',
 'Atmospheric':'Open skies, watery blues, and a breath of light.',
 'Comfort Zone':'Grounded, organic hues to settle into.',
 'Tropic Tonalities':'Vivid island colour, from citrus to ocean blue.',
 'Light & Shadow':'Softened hues, deepening into beautiful contrast.',
 'Glamour & Gleam':'Rich reds, dark teal, and metallic accents.'
};
function App(){
 const [selected,setSelected]=useState(colors[0].id),[palette,setPalette]=useState('All palettes'),[copied,setCopied]=useState(''),[about,setAbout]=useState(false);
 const api=useRef(null),timer=useRef(null);const current=colors.find(c=>c.id===selected),index=colors.indexOf(current);
 const visible=palette==='All palettes'?colors:data.palettes.find(p=>p.name===palette).colors.map(id=>colors.find(c=>c.id===id));
 const belongs=data.palettes.filter(p=>p.colors.includes(current.id));
 function select(id,animate=true){setSelected(id);if(animate)api.current?.select(colors.findIndex(c=>c.id===id));}
 function step(n){const list=visible;const i=list.findIndex(c=>c.id===selected);select(list[(i+n+list.length)%list.length].id);}
 function changePalette(value){setPalette(value);if(value!=='All palettes'){const p=data.palettes.find(p=>p.name===value);if(!p.colors.includes(selected))select(p.colors[0]);}}
 async function copy(value,key){try{await navigator.clipboard.writeText(value);setCopied(key);clearTimeout(timer.current);timer.current=setTimeout(()=>setCopied(''),1800);}catch{setCopied('failed');}}
 const rgb=current.hex.match(/\w\w/g).map(x=>parseInt(x,16));
 return <div className="app">
  <header className="header"><a href="#" className="brand" aria-label="Swatch Studio home" onClick={e=>{e.preventDefault();changePalette('All palettes');select(colors[0].id);}}><span className="brand-mark"><i/><i/><i/></span>swatch<span className="brand-light">studio</span><span className="brand-period">.</span></a><div className="header-right"><span className="edition">The 2026 collection</span><span className="header-divider"/><button className="text-button" onClick={()=>setAbout(v=>!v)}>About the studio <ArrowUpRight size={15}/></button></div></header>
  {about&&<aside className="about-panel"><button className="close" onClick={()=>setAbout(false)} aria-label="Close about"><X size={18}/></button><h2>A little room for colour.</h2><p>A digital take on the 3D-printed filament swatch wheel. Turn the wheel, lift a shade, and explore how colour feels alongside its neighbours.</p><p>Featuring Pantone’s 2026 Colour of the Year and its seven palettes. An independent exploration, using your original STL geometry.</p><a href="https://www.pantone.com/uk/en-gb/articles/color-of-the-year/color-of-the-year-2026-color-palettes" target="_blank" rel="noreferrer">Explore the official palettes <ArrowUpRight size={14}/></a></aside>}
  <main>
   <div className="intro"><div><h1>A new spin on colour.</h1><p>Slow down. Turn the wheel. Find your shade.</p></div><div className="collection-pill"><span className="cloud-dot"/>Pantone® Colour of the Year <span>2026</span></div></div>
   <section className="explorer" aria-label="Colour explorer">
    <div className="stage" onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();step(1);}if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}}} tabIndex={0} aria-label="Swatch wheel. Use left and right arrow keys to select colours.">
     <div className="stage-top"><span><span className="live-dot"/>Interactive 3D</span><span>50 shades · 7 palettes</span></div>
     <Wheel colors={colors} selected={selected} onSelect={select} apiRef={api}/>
     <div className="stage-bottom"><span className="gesture"><MoveHorizontal size={17}/>Drag to explore <span>·</span><MousePointer2 size={13}/>Click to lift</span><button className="reset" onClick={()=>{changePalette('All palettes');select(colors[0].id);}} aria-label="Reset wheel to Cloud Dancer"><RotateCcw size={16}/></button></div>
    </div>
    <aside className="details" aria-label="Selected colour details" aria-live="polite">
     <div className="details-top"><span>IN FOCUS</span><span className="index">{String(index+1).padStart(2,'0')} <span>/ 50</span></span></div>
     <div className="large-swatch" style={{background:current.hex}}><span className="swatch-caption" style={{color:rgb.reduce((a,b)=>a+b,0)>420?'#262823':'#fff'}}>PANTONE®<small>{current.code}</small></span>{current.name==='Cloud Dancer'&&<span className="coty-tag">Colour of the Year 2026</span>}</div>
     <div className="colour-title"><h2>{current.name}</h2><span>PANTONE® {current.code}</span></div>
     <div className="colour-values"><button className="value" onClick={()=>copy(current.hex,'hex')} aria-label={`Copy HEX ${current.hex}`}><span>HEX</span><strong>{current.hex}</strong>{copied==='hex'?<Check size={16}/>:<Copy size={15}/>}</button><button className="value" onClick={()=>copy(`rgb(${rgb.join(', ')})`,'rgb')} aria-label="Copy RGB value"><span>RGB</span><strong>{rgb.join(', ')}</strong>{copied==='rgb'?<Check size={16}/>:<Copy size={15}/>}</button></div>
     <div className="palette-membership"><span>PART OF</span><div>{belongs.length===7?'All seven palettes':belongs.map(p=><button key={p.name} onClick={()=>changePalette(p.name)}>{p.name}<ArrowUpRight size={12}/></button>)}</div></div>
     <div className="detail-navigation"><button className="arrow-button" onClick={()=>step(-1)} aria-label="Previous colour"><ArrowLeft size={18}/></button><span>{copied==='hex'||copied==='rgb'?'Copied to clipboard':copied==='failed'?'Copy unavailable in this browser':'A shade worth pausing for.'}</span><button className="arrow-button" onClick={()=>step(1)} aria-label="Next colour"><ArrowRight size={18}/></button></div>
    </aside>
   </section>
   <section className="library" aria-label="Palette library"><div className="library-heading"><div><h2>The colour stories</h2><p>{descriptions[palette]}</p></div><div className="select-wrapper"><label htmlFor="palette">Palette</label><select id="palette" value={palette} onChange={e=>changePalette(e.target.value)}><option>All palettes</option>{data.palettes.map(p=><option key={p.name}>{p.name}</option>)}</select><ChevronDown size={14}/></div></div>
    <div className="colour-strip">{visible.map(c=><button key={c.id} className={`colour-chip ${selected===c.id?'selected':''}`} onClick={()=>select(c.id)} aria-label={`${c.name}, ${c.code}`} aria-pressed={selected===c.id} style={{'--chip':c.hex}}><span className="chip-fill"/>{selected===c.id&&<span className="chip-indicator"/>}<span className="chip-tooltip">{c.name}</span></button>)}</div><div className="strip-caption"><span>{visible.length} {visible.length===1?'colour':'colours'} to explore</span><span>Every shade begins a different story.</span></div>
   </section>
  </main>
  <footer><span>Made for the love of colour.</span><span className="approximation"><Info size={12}/>Screen colours are approximate.</span><a href="https://www.pantone.com/na/en-us/color-of-the-year/2026" target="_blank" rel="noreferrer">Meet Cloud Dancer <ArrowUpRight size={13}/></a></footer>
 </div>;
}

createRoot(document.getElementById('root')).render(<App/>);

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export default function Wheel({ colors, selected, onSelect, apiRef }) {
 const host = useRef(null), selectRef = useRef(onSelect), selectedRef=useRef(selected);
 const [status,setStatus]=useState('loading');
 selectRef.current=onSelect; selectedRef.current=selected;
 useEffect(()=>{
  const el=host.current; let renderer,disposed=false,frame=0,resize,cleanup=()=>{};
  async function init(){
   try {
    renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.0;
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(32,1,1,1000);camera.position.set(0,158,218);camera.lookAt(0,19,0);
    const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();
    const env=pmrem.fromScene(room,0.04);scene.environment=env.texture;scene.environmentIntensity=.7;room.dispose();pmrem.dispose();
    scene.add(new THREE.HemisphereLight(0xffffff,0xc6bdb1,1.3));
    const light=new THREE.DirectionalLight(0xffffff,2.0);light.position.set(-90,190,85);light.castShadow=true;
    light.shadow.mapSize.set(2048,2048);Object.assign(light.shadow.camera,{left:-110,right:110,top:110,bottom:-110,near:1,far:450});light.shadow.bias=-0.001;light.shadow.normalBias=.25;light.shadow.radius=4;scene.add(light);
    const fill=new THREE.DirectionalLight(0xdce8ff,1.2);fill.position.set(120,70,-80);scene.add(fill);
    const ground=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.ShadowMaterial({opacity:.16}));ground.rotation.x=-Math.PI/2;ground.position.y=-.2;ground.receiveShadow=true;scene.add(ground);
    const loader=new STLLoader();const [bottom,top,swatch]=await Promise.all(['bottom','top','swatch'].map(n=>loader.loadAsync(`/models/${n}.stl`)));
    if(disposed){[bottom,top,swatch].forEach(g=>g.dispose());env.dispose();return;}
    bottom.rotateX(-Math.PI/2);top.rotateX(-Math.PI/2);
    swatch.translate(0,-1,0);swatch.rotateX(Math.PI/2);
    const material=new THREE.MeshStandardMaterial({color:'#e8e6df',roughness:.68,metalness:0});
    const base=new THREE.Mesh(bottom,material);base.position.y=24.6;base.castShadow=true;base.receiveShadow=true;scene.add(base);
    const rotating=new THREE.Group();scene.add(rotating);
    const lid=new THREE.Mesh(top,material);lid.position.y=24.6;lid.castShadow=true;lid.receiveShadow=true;rotating.add(lid);
    const pieces=colors.map((c,i)=>{
     const theta=i/colors.length*Math.PI*2;
     const m=new THREE.Mesh(swatch,new THREE.MeshStandardMaterial({color:c.hex,roughness:.43,metalness:.02}));
     m.position.set(55.5*Math.cos(theta),33,-55.5*Math.sin(theta));m.rotation.y=theta;m.castShadow=true;m.receiveShadow=true;m.userData.index=i;rotating.add(m);return m;
    });
    const labelCanvas=document.createElement('canvas');labelCanvas.width=1024;labelCanvas.height=1024;
    const ctx=labelCanvas.getContext('2d');ctx.textAlign='center';ctx.fillStyle='#87867e';ctx.font='32px sans-serif';ctx.fillText('S W A T C H   S T U D I O',512,445);ctx.font='170px serif';ctx.fillStyle='#63645e';ctx.fillText('2026',512,610);ctx.font='23px sans-serif';ctx.fillStyle='#87867e';ctx.fillText('C O L O U R   I N   M O T I O N',512,680);
    const texture=new THREE.CanvasTexture(labelCanvas);texture.colorSpace=THREE.SRGBColorSpace;
    const label=new THREE.Mesh(new THREE.PlaneGeometry(66,66),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false}));label.rotation.x=-Math.PI/2;label.position.y=24.7;scene.add(label);
    let index=colors.findIndex(c=>c.id===selectedRef.current),target=-Math.PI/2-index/colors.length*Math.PI*2;
    rotating.rotation.y=target;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    let dragging=false,downX=0,downY=0,lastX=0,moved=0,lastTime=0;
    const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();
    const nearest=()=>((Math.round((-Math.PI/2-target)/(Math.PI*2)*colors.length)%colors.length)+colors.length)%colors.length;
    function render(t=0){
     frame=0;if(disposed)return;const dt=Math.min((t-lastTime)/1000||1/60,.05);lastTime=t;let active=dragging;
     const diff=target-rotating.rotation.y;rotating.rotation.y+=reduced?diff:diff*(1-Math.exp(-dt*12));if(Math.abs(diff)>.0001)active=true;
     pieces.forEach((m,i)=>{const lifted=i===index&&!dragging&&Math.abs(diff)<.12;const y=33+(lifted?15:0);const yaw=i/colors.length*Math.PI*2+(lifted?Math.PI/2:0);const turn=yaw-m.rotation.y;m.rotation.y+=reduced?turn:turn*(1-Math.exp(-dt*14));if(Math.abs(turn)>.001)active=true;const d=y-m.position.y;m.position.y+=reduced?d:d*(1-Math.exp(-dt*14));if(Math.abs(d)>.01)active=true;});
     renderer.render(scene,camera);if(active)frame=requestAnimationFrame(render);
    }
    function wake(){if(!frame&&!disposed){lastTime=performance.now();frame=requestAnimationFrame(render);}}
    function choose(i){index=i;const raw=-Math.PI/2-i/colors.length*Math.PI*2;target=rotating.rotation.y+THREE.MathUtils.euclideanModulo(raw-rotating.rotation.y+Math.PI,Math.PI*2)-Math.PI;wake();}
    apiRef.current={select:choose};
    function down(e){if(e.button!==0)return;dragging=true;downX=lastX=e.clientX;downY=e.clientY;moved=0;el.setPointerCapture(e.pointerId);el.classList.add('dragging');wake();}
    function move(e){if(!dragging)return;const dx=e.clientX-lastX;lastX=e.clientX;moved=Math.hypot(e.clientX-downX,e.clientY-downY);target+=dx*.009;const ni=nearest();if(index!==ni){index=ni;selectRef.current(colors[index].id,false);}wake();}
    function up(e){if(!dragging)return;dragging=false;el.classList.remove('dragging');if(moved<5){const r=el.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects(pieces)[0];if(hit)index=hit.object.userData.index;}else index=nearest();selectRef.current(colors[index].id,false);choose(index);}
    function cancel(){dragging=false;el.classList.remove('dragging');index=nearest();selectRef.current(colors[index].id,false);choose(index);}
    resize=new ResizeObserver(()=>{const w=el.clientWidth,h=el.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.zoom=Math.min(1,camera.aspect/1.38);camera.updateProjectionMatrix();wake();});resize.observe(el);
    el.addEventListener('pointerdown',down);el.addEventListener('pointermove',move);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',cancel);
    renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();setStatus('error');});
    cleanup=()=>{resize.disconnect();el.removeEventListener('pointerdown',down);el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',cancel);scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)o.material.dispose();});env.dispose();texture.dispose();};
    setStatus('ready');wake();
   }catch(e){console.error('Wheel could not load',e);if(!disposed)setStatus('error');}
  }
  init();return()=>{disposed=true;cancelAnimationFrame(frame);cleanup();renderer?.dispose();renderer?.domElement.remove();apiRef.current=null;};
 },[colors,apiRef]);
 return <><div ref={host} className="wheel-canvas" aria-label="3D swatch wheel. Drag left or right to rotate, or use the previous and next colour buttons." />{status!=='ready'&&<div className="scene-status" role="status">{status==='loading'?<><span className="loader"/>Preparing your colour wheel…</>:<>3D preview unavailable.<br/>You can still explore every colour below.<button onClick={()=>location.reload()}>Retry 3D preview</button></>}</div>}</>;
}

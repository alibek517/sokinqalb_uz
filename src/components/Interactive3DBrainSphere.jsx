import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Brain, Compass, Activity, Zap } from 'lucide-react';

export default function Interactive3DBrainSphere({ mode = 'alpha', onModeChange }) {
  const mountRef = useRef(null);
  const [activeFrequency, setActiveFrequency] = useState(mode);
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 85;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Core Glowing Nucleus (Brain Center)
    const coreGeo = new THREE.SphereGeometry(14, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // 2. 3D Neural Point Cloud (Synapses)
    const count = 380;
    const pointsGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const c1 = new THREE.Color(0x38bdf8);
    const c2 = new THREE.Color(0x2dd4bf);
    const c3 = new THREE.Color(0xa855f7);

    for (let i = 0; i < count; i++) {
      const radius = 22 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const col = Math.random() > 0.5 ? c1.clone().lerp(c2, Math.random()) : c2.clone().lerp(c3, Math.random());
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    pointsGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pointsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const neuralCloud = new THREE.Points(pointsGeo, pMat);
    scene.add(neuralCloud);

    // 3. Rotating 3D Meridian Energy Rings (Brainwave Harmonics)
    const ringGeo1 = new THREE.TorusGeometry(26, 0.4, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(28, 0.4, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    scene.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(30, 0.3, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({ color: 0x2dd4bf, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI / 3;
    scene.add(ring3);

    // Mouse / Touch Drag Rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      neuralCloud.rotation.y += deltaX * 0.01;
      neuralCloud.rotation.x += deltaY * 0.01;
      coreMesh.rotation.y += deltaX * 0.01;
      coreMesh.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => { isDragging = false; };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      neuralCloud.rotation.y += deltaX * 0.01;
      neuralCloud.rotation.x += deltaY * 0.01;
      coreMesh.rotation.y += deltaX * 0.01;
      coreMesh.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => { isDragging = false; };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Continuous gentle rotation
      if (!isDragging) {
        neuralCloud.rotation.y = t * 0.18;
        neuralCloud.rotation.x = Math.sin(t * 0.12) * 0.2;
        coreMesh.rotation.y = -t * 0.25;
        coreMesh.rotation.z = Math.cos(t * 0.15) * 0.2;
      }

      ring1.rotation.z = t * 0.35;
      ring2.rotation.y = -t * 0.28;
      ring3.rotation.x = t * 0.3;

      // Pulse based on frequency mode
      let pulseSpeed = 1.5;
      let pulseAmp = 0.06;
      if (activeFrequency === 'theta') { pulseSpeed = 0.9; pulseAmp = 0.08; }
      if (activeFrequency === 'gamma') { pulseSpeed = 3.2; pulseAmp = 0.12; }

      const scale = 1 + Math.sin(t * pulseSpeed) * pulseAmp;
      coreMesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (container && dom && container.contains(dom)) {
        container.removeChild(dom);
      }
      coreGeo.dispose();
      coreMat.dispose();
      pointsGeo.dispose();
      pMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      renderer.dispose();
    };
  }, [activeFrequency]);

  const handleSelectFrequency = (freq) => {
    setActiveFrequency(freq);
    setPulseCount(prev => prev + 1);
    if (onModeChange) onModeChange(freq);
  };

  return (
    <div className="glass-card p-4 sm:p-6 rounded-3xl border border-teal-500/30 relative overflow-hidden flex flex-col items-center justify-between text-center bg-slate-900/90 shadow-2xl group w-full max-w-sm mx-auto">
      {/* 3D Badge */}
      <div className="w-full flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2">
        <div className="flex items-center space-x-1.5 text-teal-300 font-bold text-xs">
          <Brain className="w-4 h-4 text-teal-400 animate-pulse" />
          <span>3D Neyro-Gologramma</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/40">
          Interaktiv 3D
        </span>
      </div>

      {/* 3D Three.js Viewport */}
      <div 
        ref={mountRef} 
        className="w-full h-56 sm:h-64 cursor-grab active:cursor-grabbing flex items-center justify-center relative touch-none select-none"
        title="3D sharni sichqoncha yoki barmoq bilan aylantiring"
      >
        <div className="absolute bottom-1 right-2 pointer-events-none text-[9px] text-slate-500 font-mono bg-slate-950/70 px-2 py-0.5 rounded-md border border-slate-800">
          🔄 3D Aylantirish
        </div>
      </div>

      {/* Brainwave Frequency Mode Selector Controls */}
      <div className="w-full space-y-2 pt-2 border-t border-slate-800">
        <div className="flex justify-between text-[11px] font-semibold text-slate-400">
          <span>Miya To'lqin Rejimi:</span>
          <span className="text-teal-300 font-mono uppercase font-bold">{activeFrequency} 432Hz</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'theta', label: 'Teta (Chuqur)', sub: '4-7 Hz', icon: Activity },
            { id: 'alpha', label: 'Alfa (Tinchlik)', sub: '8-12 Hz', icon: Compass },
            { id: 'gamma', label: 'Gamma (Diqqat)', sub: '30+ Hz', icon: Zap }
          ].map((modeItem) => {
            const isSelected = activeFrequency === modeItem.id;
            return (
              <button
                key={modeItem.id}
                type="button"
                onClick={() => handleSelectFrequency(modeItem.id)}
                className={`p-2 rounded-xl text-center border transition-all cursor-pointer select-none active:scale-95 ${
                  isSelected
                    ? 'bg-teal-500/25 border-teal-400 text-teal-200 font-bold shadow-md shadow-teal-500/20 ring-1 ring-teal-400/40'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold leading-tight flex items-center justify-center space-x-1">
                  <span>{modeItem.label.split(' ')[0]}</span>
                </div>
                <div className="text-[9px] text-slate-500 mt-0.5">{modeItem.sub}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

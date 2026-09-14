import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Box, Eye, Sparkles, Layers, Zap, Cpu } from 'lucide-react';
import * as THREE from 'three';
import { projects } from '@/lib/data';

interface ThreeDModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModelType = 'sphere' | 'torusKnot' | 'cube' | 'octahedron';
type ThemeType = 'cyberpunk' | 'emerald' | 'purple' | 'gold';

export function ThreeDModal({ isOpen, onClose }: ThreeDModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeModel, setActiveModel] = useState<ModelType>('torusKnot');
  const [activeTheme, setActiveTheme] = useState<ThemeType>('cyberpunk');
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const meshRef = useRef<THREE.Mesh | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    // Color maps
    const themeColors = {
      cyberpunk: { primary: 0x38bdf8, secondary: 0x818cf8, emissive: 0x0284c7 },
      emerald: { primary: 0x34d399, secondary: 0x10b981, emissive: 0x047857 },
      purple: { primary: 0xc084fc, secondary: 0xa855f7, emissive: 0x7e22ce },
      gold: { primary: 0xfacc15, secondary: 0xf59e0b, emissive: 0xb45309 },
    };

    const colorConfig = themeColors[activeTheme];

    // Create Geometry based on activeModel
    let geometry: THREE.BufferGeometry;
    switch (activeModel) {
      case 'sphere':
        geometry = new THREE.IcosahedronGeometry(1.8, 3);
        break;
      case 'cube':
        geometry = new THREE.BoxGeometry(2.2, 2.2, 2.2);
        break;
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(2, 2);
        break;
      case 'torusKnot':
      default:
        geometry = new THREE.TorusKnotGeometry(1.4, 0.45, 128, 32);
        break;
    }

    const material = new THREE.MeshStandardMaterial({
      color: colorConfig.primary,
      emissive: colorConfig.emissive,
      emissiveIntensity: 0.4,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    group.add(mesh);

    // Add floating particle field around mesh
    const particleCount = 150;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: colorConfig.secondary,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    group.add(particleSystem);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(colorConfig.primary, 2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(colorConfig.secondary, 2, 50);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    // Interactive Drag Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !groupRef.current) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      groupRef.current.rotation.y += deltaX * 0.01;
      groupRef.current.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging && groupRef.current) {
        groupRef.current.rotation.y += 0.005;
        groupRef.current.rotation.x += 0.003;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isOpen, activeModel, activeTheme]);

  if (!isOpen) return null;

  const currentProject = projects[activeProjectIndex] || projects[0];

  const resetRotation = () => {
    if (groupRef.current) {
      groupRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-lg overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-5xl max-h-[92vh] bg-[#090D16] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400">
                <Box className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <span>Interactive 3D WebGL Studio</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/30">
                    WebGL 2.0 Live
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400 font-mono">
                  Drag with mouse to orbit 3D model & explore active project architecture
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1">
            {/* 3D Canvas Area */}
            <div className="lg:col-span-7 relative bg-gradient-to-b from-slate-950 via-[#060911] to-slate-950 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between min-h-[380px] lg:min-h-[480px]">
              {/* Canvas element container */}
              <div ref={containerRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />

              {/* Top Controls Overlay */}
              <div className="relative z-10 p-4 flex flex-wrap justify-between items-center gap-2 pointer-events-auto">
                <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-800 text-xs font-mono">
                  {(['torusKnot', 'sphere', 'cube', 'octahedron'] as ModelType[]).map((model) => (
                    <button
                      key={model}
                      onClick={() => setActiveModel(model)}
                      className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                        activeModel === model
                          ? 'bg-white text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {model}
                    </button>
                  ))}
                </div>

                <button
                  onClick={resetRotation}
                  className="p-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                  title="Reset 3D camera rotation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>

              {/* Bottom Theme Controls Overlay */}
              <div className="relative z-10 p-4 flex items-center justify-between gap-2 pointer-events-auto mt-auto bg-gradient-to-t from-slate-950 to-transparent">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Lighting:</span>
                  {(['cyberpunk', 'emerald', 'purple', 'gold'] as ThemeType[]).map((theme) => (
                    <button
                      key={theme}
                      onClick={() => setActiveTheme(theme)}
                      className={`w-5 h-5 rounded-full border-2 transition-all ${
                        theme === 'cyberpunk' ? 'bg-sky-400 border-sky-300' :
                        theme === 'emerald' ? 'bg-emerald-400 border-emerald-300' :
                        theme === 'purple' ? 'bg-purple-400 border-purple-300' :
                        'bg-amber-400 border-amber-300'
                      } ${activeTheme === theme ? 'scale-125 ring-2 ring-white/50' : 'opacity-60 hover:opacity-100'}`}
                      title={`${theme} color theme`}
                    />
                  ))}
                </div>

                <div className="text-[10px] font-mono text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Hold & Drag Mouse to Rotate</span>
                </div>
              </div>
            </div>

            {/* Right Project Selector & 3D Info Panel */}
            <div className="lg:col-span-5 p-6 space-y-6 flex flex-col justify-between bg-[#090D16]">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                    <span>Project Showcase ({activeProjectIndex + 1}/{projects.length})</span>
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setActiveProjectIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1))}
                      className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white"
                    >
                      &larr; Prev
                    </button>
                    <button
                      onClick={() => setActiveProjectIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0))}
                      className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white"
                    >
                      Next &rarr;
                    </button>
                  </div>
                </div>

                {/* Selected Project Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                      {currentProject.number}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-[11px] font-mono text-sky-400">
                      {currentProject.category}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white tracking-tight">
                    {currentProject.name}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentProject.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      Key Highlights
                    </span>
                    <div className="space-y-1">
                      {currentProject.metrics.slice(0, 3).map((metric, i) => (
                        <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <Zap className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-1.5">
                      Tech Stack Matrix
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentProject.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <a
                  href={('liveLink' in currentProject && currentProject.liveLink ? currentProject.liveLink : ('githubLink' in currentProject && currentProject.githubLink ? currentProject.githubLink : currentProject.link)) as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-950 text-xs font-bold transition-all shadow inline-flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Explore Build</span>
                </a>

                <span className="text-[11px] font-mono text-slate-400">
                  3D View Mode Active
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

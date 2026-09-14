import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  className?: string;
  interactive?: boolean;
}

export function ThreeCanvas({ className = '', interactive = true }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 400;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Create 3D Geodesic Tech Structure
    const mainGroup = new THREE.Group();

    // Core Icosahedron Wireframe
    const geometry = new THREE.IcosahedronGeometry(2, 2);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const icosahedron = new THREE.Mesh(geometry, wireframeMat);
    mainGroup.add(icosahedron);

    // Inner Glowing Core Sphere
    const coreGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.6,
      shininess: 90,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Outer Particles Ring / Constellation
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x38bdf8);
    const emeraldColor = new THREE.Color(0x34d399);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.8 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = Math.random() > 0.5 ? cyanColor : emeraldColor;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // Orbiting Ring
    const ringGeo = new THREE.TorusGeometry(3.2, 0.015, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.5 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    mainGroup.add(ringMesh);

    scene.add(mainGroup);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 2, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x10b981, 2, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // 6. Interactive Mouse Movement Tracking
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.5;
      targetY = y * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Constant rotation
      icosahedron.rotation.x += 0.003;
      icosahedron.rotation.y += 0.005;
      coreMesh.rotation.x -= 0.004;
      coreMesh.rotation.y += 0.006;
      ringMesh.rotation.z += 0.002;
      particles.rotation.y += 0.001;

      // Smooth mouse damping
      mainGroup.rotation.y += (targetX - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetY - mainGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 400;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [interactive]);

  return <div ref={containerRef} className={`w-full h-full min-h-[320px] ${className}`} />;
}

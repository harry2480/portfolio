'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onFloorSelect?: (floor: number) => void;
}

const FLOORS = [
  { id: 1, label: '01', name: 'Entrance', path: '/', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop' },
  { id: 2, label: '02', name: 'Works', path: '/works', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop' },
  { id: 3, label: '03', name: 'Skill', path: '/skill', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop' },
  { id: 4, label: '04', name: 'About', path: '/about', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop' },
  { id: 5, label: '05', name: 'Blog', path: '/blog', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop' },
  { id: 6, label: '06', name: 'GitHub', path: '/github', img: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2070&auto=format&fit=crop' },
];

export default function MenuOverlay({ isOpen, onClose, onFloorSelect }: MenuOverlayProps) {
  const router = useRouter()
  const [previewFloor, setPreviewFloor] = useState(FLOORS[0]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      
      // Animate overlay using x (translateX) for slide-in effect
      gsap.to('#menu-overlay', { 
        x: '0%', 
        duration: 0.5, 
        ease: 'power2.out',
        pointerEvents: 'auto'
      });
      
      // Animate menu items staggered entrance
      gsap.fromTo('.menu-item', 
        { x: 50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.15, ease: 'power2.out' }
      );
      
      return () => window.removeEventListener('keydown', handleKeyDown);
    } else {
      // Slide out animation
      gsap.to('#menu-overlay', { 
        x: '100%', 
        duration: 0.4, 
        ease: 'power2.in',
        pointerEvents: 'none'
      });
    }
  }, [isOpen, onClose]);

  const handleFloorHover = (floor: typeof FLOORS[0]) => {
    setPreviewFloor(floor);
    const img = document.getElementById('menu-img') as HTMLImageElement;
    const text = document.getElementById('menu-preview-text') as HTMLElement;
    
    if (img) {
      gsap.to(img, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          img.src = floor.img;
          gsap.to(img, { opacity: 0.5, duration: 0.3 });
        },
      });
    }
    if (text) {
      text.textContent = floor.name;
    }
  };

  const handleFloorClick = (floor: typeof FLOORS[0]) => {
    router.push(floor.path)
    onFloorSelect?.(floor.id);
  };

  return (
    <div
      id="menu-overlay"
      className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 transform translate-x-full flex items-center justify-center"
      onClick={onClose}
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl h-full p-10">
        {/* Preview Image - Hidden on mobile */}
        <div className="hidden md:flex flex-col justify-center border-r border-white/10 pr-10">
          <div id="menu-image-preview" className="w-full aspect-video bg-gray-900 border border-white/20 overflow-hidden relative">
            <img 
              id="menu-img" 
              src={previewFloor.img} 
              className="w-full h-full object-cover opacity-50 grayscale transition-all duration-500" 
              alt="" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span id="menu-preview-text" className="font-oswald text-6xl text-white mix-blend-overlay">
                {previewFloor.name}
              </span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col justify-center pl-0 md:pl-10 space-y-2">
          {FLOORS.map((floor) => (
            <button
              key={floor.id}
              className="menu-item text-left font-oswald text-6xl md:text-8xl text-gray-600 hover:text-white transition-colors duration-300 group cursor-pointer"
              onMouseEnter={() => handleFloorHover(floor)}
              onClick={() => {
                handleFloorClick(floor);
                onClose();
              }}
            >
              <span className="text-sm font-sans tracking-widest block opacity-0 group-hover:opacity-100 transition-opacity text-brand-accent mb-[-10px] ml-1">
                {floor.label}
              </span>
              {floor.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

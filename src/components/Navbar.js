"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const opacity = Math.min(scrollY / 800, 1.0);  
  const blur = Math.min(scrollY / 100, 10);  

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 w-full p-4 text-white z-50"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${opacity})`, 
        backdropFilter: `blur(${blur}px)`, 
      }}
    >
      <div className="max-w-[90rem] mx-auto px-4 md:px-8 lg:px-16 flex justify-between items-center">
        <a href="/">
          <Image src="/images/logo3.png" alt="STEP LOGO" width={200} height={100} className="w-32 sm:w-40 md:w-45 lg:w-50 h-auto" priority />
        </a>
        <div className="md:flex hidden space-x-16 font-bold">
        <a href="/about" className="nav-link group">About</a>
          <a href="/projects" className="nav-link group">Projects</a>
          <a href="/news" className="nav-link group">News</a>
          <a href="/contact" className="nav-link group">Contact</a>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>☰</button>
      </div>

      {/* 移动端菜单 */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black flex flex-col items-center space-y-4 p-4">
          <a href="/about" className="nav-link group">About</a>
          <a href="/projects" className="nav-link group">Projects</a>
          <a href="/news" className="nav-link group">News</a>
          <a href="/contact" className="nav-link group">Contact</a>
        </div>
      )}
    </nav>
  );
}

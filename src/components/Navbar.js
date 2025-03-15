"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ isDark = false }) {
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const opacity = isDark ? 1 : Math.min(scrollY / 800, 1.0);  
  const blur = isDark ? 0 : Math.min(scrollY / 100, 10); 

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
        <Link href="/">
          <Image src="/images/logo.png" alt="STEP LOGO" width={200} height={100} className="w-32 sm:w-40 md:w-45 lg:w-50 h-auto" priority />
        </Link>
        <div className="md:flex hidden space-x-16 font-bold">
          <Link href="/about" className="nav-link group">About</Link>
          <Link href="/rocket" className="nav-link group">Rocket</Link>
          <Link href="/cansat" className="nav-link group">CanSat</Link>
          <Link href="/news" className="nav-link group">News</Link>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>☰</button>
      </div>

      {/* 移动端菜单 */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black flex flex-col items-center space-y-4 p-4">
          <Link href="/about" className="nav-link group">About</Link>
          <Link href="/rocket" className="nav-link group">Rocket</Link>
          <Link href="/cansat" className="nav-link group">CanSat</Link>
          <Link href="/news" className="nav-link group">News</Link>
        </div>
      )}
    </nav>
  );
}

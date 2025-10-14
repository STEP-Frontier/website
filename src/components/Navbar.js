"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { url } from "@/util/url-converter";

export default function Navbar({ isDark = false }) {
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  let effectiveOpacity;
  let effectiveBlur;
  if (isDark) {
    effectiveOpacity = 1; 
    effectiveBlur = 0;
  } else {
    effectiveOpacity = isOpen ? Math.max(Math.min(scrollY / 800, 1.0),0.5) : Math.min(scrollY / 800, 1.0);
    effectiveBlur = isOpen ? 0 : Math.min(scrollY / 100, 10);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideMenu = menuRef.current && !menuRef.current.contains(event.target);
      const clickedOutsideButton = menuButtonRef.current && !menuButtonRef.current.contains(event.target);
      if (clickedOutsideMenu && clickedOutsideButton) {
        setIsOpen(false);
      }
    };
  
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const navItems = [
    { href: "/about", label: "About" },
    { href: "/rocket", label: "Rocket" },
    { href: "/cansat", label: "CanSat" },
    { href: "/news", label: "News" },
  ];

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 w-full text-white z-50"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${effectiveOpacity})`,
        backdropFilter: `blur(${effectiveBlur}px)`,
      }}
    >
      <div className="p-4">
        {/* Logo + menu button */}
        <div className="max-w-[90rem] mx-auto px-2 sm:px-4 md:px-8 lg:px-16 flex justify-between items-center">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image
              src={url("/images/logo.png")}
              alt="STEP LOGO"
              width={200}
              height={100}
              className="w-32 sm:w-40 md:w-45 lg:w-50 h-auto"
              priority
            />
          </Link>

          {/* Desktop */}
          <div className="md:flex hidden space-x-16 font-bold">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link group">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            className="md:hidden text-2xl sm:text-3xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? "×" : "☰"}
          </button>
        </div>
      </div>
      
      {/* Mobile menu content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            ref={menuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden bg-black/10 z-40"
          >
            <div className="flex flex-col items-center font-bold divide-y divide-gray-700/80">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-4"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}

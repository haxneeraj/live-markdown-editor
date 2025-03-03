"use client";

import { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Twitter, Linkedin, Github, Instagram } from "lucide-react";
import { usePathname } from "next/navigation";

function classNames(...classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
  }
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [navItems, setNavItems] = useState([
      { name: "Home", href: "/", current: true },
      { name: "About", href: "/about", current: false },
      { name: "Portfolio", href: "/portfolio", current: false },
      { name: "Blog", href: "/blog", current: false },
      { name: "Contact", href: "/contact", current: false },
      { name: "Resume", href: "/resume", current: false },
  ]);
  const [isDark, setIsDark] = useState(() => {
      if (typeof document !== "undefined") {
        return localStorage.getItem("theme") === "dark";
      }
      return false;
  });
  
  useEffect(() => {
      setNavItems((prev) =>
        prev.map((item) => ({
          ...item,
          current: item.href === pathname,
        }))
      );
    }, [pathname]);

  
  
  useEffect(() => {
      setMounted(true);
  }, []);
    
  useEffect(() => {
      if (isDark) {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
      } else {
          localStorage.setItem("theme", "light");
          document.documentElement.classList.remove("dark");
      }
  }, [isDark]);
  
  function toggleDarkMode() {
      setIsDark((prev) => !prev);
  }

  useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
  
  window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
  }, []);
      

  return (
    <Disclosure as="nav" className={classNames(
        "w-full z-50 transition-all duration-300 py-3 bg-gray-800 border-b border-gray-700",
        scrolled ? "" : ""
      )}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <h1 className="text-2xl font-bold text-gray-100 dark:text-white">Live Markdown Editor</h1>
            </div>            
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="flex space-x-2">
              <a target='_blank' href="https://github.com/haxneeraj" className="text-gray-200 hover:text-gray-300 transition duration-300">
                <Github className="h-6 w-6" aria-hidden="true" />
              </a>
              <a target='_blank' href="https://x.com/hax_neeraj" className="text-gray-200 hover:text-gray-300 transition duration-300">
                <Twitter className="h-6 w-6" aria-hidden="true" />
              </a>
              <a target='_blank' href="https://www.linkedin.com/in/hax-neeraj/" className="text-gray-200 hover:text-gray-300 transition duration-300">
                <Linkedin className="h-6 w-6" aria-hidden="true" />
              </a>
              <a target='_blank' href="https://www.instagram.com/hax_neeraj/" className="text-gray-200 hover:text-gray-300 transition duration-300">
                <Instagram className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navItems.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

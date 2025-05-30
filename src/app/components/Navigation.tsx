'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      title: 'Global Takeover',
      href: '/global-takeover',
      description: 'Live drone operations map'
    },
    {
      title: 'Air',
      subItems: [
        {
          name: 'Runi Sentinel',
          href: '/vehicles/runi-sentinel',
          description: 'Advanced autonomous aerial system'
        }
      ]
    },
    {
      title: 'Sea',
      subItems: [
        {
          name: 'Submersible',
          href: '/vehicles/submersible',
          description: 'Deep-sea autonomous vehicle'
        },
        {
          name: 'Vessel',
          href: '/vehicles/vessel',
          description: 'Surface autonomous vessel'
        }
      ]
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 text-white">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              WINDU
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.title} className="relative group">
                {item.href ? (
                  <Link 
                    href={item.href}
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <>
                    <button className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                      {item.title}
                    </button>
                    <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-black bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out">
                      <div className="py-1">
                        {item.subItems?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm hover:bg-gray-900"
                          >
                            <span className="block text-white font-medium">{subItem.name}</span>
                            <span className="block text-gray-400 text-xs mt-1">{subItem.description}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
            <Link 
              href="/contact" 
              className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium hover-underline"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <div key={item.title}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <>
                    <button className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium w-full text-left">
                      {item.title}
                    </button>
                    <div className="pl-4">
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2"
                        >
                          <span className="block text-white font-medium">{subItem.name}</span>
                          <span className="block text-gray-400 text-xs mt-1">{subItem.description}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 
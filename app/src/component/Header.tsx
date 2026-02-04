'use client'

import { useState, useEffect } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { FaLightbulb, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa6'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // WhatsApp número formatado
  const whatsappNumber = '5565981722991'
  const whatsappMessage = encodeURIComponent('Olá! Gostaria de fazer um orçamento para um projeto audiovisual.')
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  // Efeito de scroll para header com background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fechar menu ao mudar de página
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const navItems = [
    { label: 'Início', href: '/', activePaths: ['/'] },
    { label: 'Sobre', href: '/sobre', activePaths: ['/sobre'] },
    { label: 'Serviços', href: '/servicos', activePaths: ['/servicos'] },
    { label: 'Portfólio', href: '/portfolio', activePaths: ['/portfolio', '/portfolio/filmes', '/portfolio/documentarios'] },
    { label: 'Contato', href: '/contato', activePaths: ['/contato'] },
  ]

  const socialLinks = [
    { 
      icon: <FaInstagram className="h-5 w-5" />, 
      href: 'https://instagram.com', 
      label: 'Instagram' 
    },
    { 
      icon: <FaYoutube className="h-5 w-5" />, 
      href: 'https://youtube.com', 
      label: 'YouTube' 
    },
  ]

  const isActive = (paths: string[]) => {
    return paths.includes(pathname)
  }

  const handleWhatsAppClick = () => {
    window.open(whatsappLink, '_blank', 'noopener,noreferrer')
  }

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-gradient-to-b from-black/90 to-transparent py-4'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className="group flex items-center gap-3"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
              <FaLightbulb className="relative text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" size={28} />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xl font-light tracking-tight">Gabe</span>
              <span className="text-yellow-500 text-xl font-bold tracking-tight">Audiovisual</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-white hover:text-yellow-400 transition-colors duration-300 text-sm font-medium uppercase tracking-wider ${
                    isActive(item.activePaths) ? 'text-yellow-400' : ''
                  }`}
                >
                  {item.label}
                  {isActive(item.activePaths) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-500"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Social Icons Desktop */}
            <div className="flex items-center space-x-4 ml-8 border-l border-gray-700 pl-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 hover:text-yellow-400 transition-colors duration-300 p-2 hover:bg-gray-800/50 rounded-full ${
                    social.label === 'WhatsApp' ? 'hover:text-green-400' : ''
                  }`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
              <button 
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-6 py-2.5 rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 flex items-center gap-2"
              >
                <FaWhatsapp className="h-4 w-4" />
                Orçamento via WhatsApp
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 hover:bg-gray-800/50 rounded-lg transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-7 w-7" />
            ) : (
              <Bars3Icon className="h-7 w-7" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-[500px] opacity-100 mt-4' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="bg-gray-900/95 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800 p-6">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300 ${
                      isActive(item.activePaths)
                        ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 text-yellow-400 border-l-4 border-yellow-500'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-medium">{item.label}</span>
                    {isActive(item.activePaths) && (
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Icons Mobile */}
            <div className="flex justify-center space-x-6 mt-8 pt-6 border-t border-gray-800">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 hover:text-yellow-400 transition-colors duration-300 p-3 hover:bg-gray-800/50 rounded-full ${
                    social.label === 'WhatsApp' ? 'hover:text-green-400' : ''
                  }`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* WhatsApp Button Mobile */}
            <button 
              onClick={() => {
                handleWhatsAppClick()
                setIsMenuOpen(false)
              }}
              className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-3"
            >
              <FaWhatsapp className="h-5 w-5" />
              Orçamento via WhatsApp
            </button>

            {/* WhatsApp Info Mobile */}
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm">
                Respondemos em até 2 horas
              </p>
              <p className="text-gray-300 text-xs mt-1">
                (65) 98172-2991
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
    </header>
  )
}
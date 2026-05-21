'use client'
import Link from 'next/link';
import { FaPlay, FaArrowDown } from 'react-icons/fa6';

type HeroProps = {
  titulo: string;
  subtitulo: string;
  image: string;
};

export default function Hero({ titulo, subtitulo, image }: HeroProps) {
  const handleScroll = () => {
    const element = document.querySelector('#sobre')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen bg-cover bg-center relative mt-0 flex items-center"
      style={{
        backgroundImage: `url('${image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#080808]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30"></div>

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 w-full text-white px-6 pt-24 pb-32">
        <div className="max-w-5xl mx-auto">

          {/* Tag */}
          <div className="opacity-0 animate-fade-in-up delay-100 mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.2em] text-amber-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            Produtora Audiovisual · Cuiabá, MT
          </div>

          {/* Title */}
          <h1 className="opacity-0 animate-fade-in-up delay-200 text-4xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            <span className="block">{titulo.split(' ').slice(0, 2).join(' ')}</span>
            <span className="block text-gradient">{titulo.split(' ').slice(2).join(' ')}</span>
          </h1>

          {/* Subtitle */}
          <p className="opacity-0 animate-fade-in-up delay-300 text-lg md:text-xl text-gray-300 max-w-xl mb-10 leading-relaxed font-light">
            {subtitulo}
          </p>

          {/* CTAs */}
          <div className="opacity-0 animate-fade-in-up delay-500 flex flex-col sm:flex-row gap-4">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(245,166,35,0.4)] text-sm uppercase tracking-wider"
            >
              <FaPlay size={12} />
              Ver Portfólio
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:border-amber-500/50 text-white hover:text-amber-400 font-semibold rounded-full transition-all duration-300 hover:bg-white/5 text-sm uppercase tracking-wider"
            >
              Solicitar Orçamento
            </Link>
          </div>

          {/* Stats */}
          <div className="opacity-0 animate-fade-in-up delay-700 flex gap-10 mt-16 pt-10 border-t border-white/10">
            {[
              { num: '100+', label: 'Projetos Entregues' },
              { num: '4K', label: 'Qualidade Máxima' },
              { num: '2025', label: 'Fundada em' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-black text-gradient">{stat.num}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={handleScroll}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-amber-400 transition-colors duration-300 animate-bounce"
        aria-label="Rolar para baixo"
      >
        <FaArrowDown size={18} />
      </button>
    </section>
  )
}
import {
  FilmIcon,
  CameraIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const services = [
  {
    icon: FilmIcon,
    tag: '01',
    title: 'Produção de Vídeos',
    description: 'Do conceito à entrega final, produzimos vídeos institucionais, comerciais e promocionais com qualidade cinematográfica.',
    href: '/servicos',
  },
  {
    icon: CameraIcon,
    tag: '02',
    title: 'Colorização Profissional',
    description: 'Color grading avançado para garantir que cada cena tenha o impacto visual e a identidade visual desejados.',
    href: '/servicos',
  },
  {
    icon: PencilSquareIcon,
    tag: '03',
    title: 'Pós-Produção',
    description: 'Edição, efeitos visuais e finalização em 4K. Transformamos imagens brutas em obras-primas visuais.',
    href: '/servicos',
  },
]

export default function Services() {
  return (
    <section id="servicos" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber-500"></div>
              <span className="text-amber-500 text-xs uppercase tracking-[0.25em] font-semibold">O que fazemos</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Nossos{' '}
              <span className="text-gradient">Serviços</span>
            </h2>
          </div>
          <Link
            href="/servicos"
            className="text-sm text-gray-400 hover:text-amber-400 transition-colors group inline-flex items-center gap-2 shrink-0"
          >
            Ver todos os serviços
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group relative glass rounded-2xl p-8 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              {/* Tag */}
              <div className="text-xs font-black text-amber-500/30 group-hover:text-amber-500/60 transition-colors mb-8 tracking-widest">
                {service.tag}
              </div>

              {/* Icon */}
              <div className="mb-6 relative">
                <div className="absolute -inset-2 rounded-xl bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <service.icon className="relative h-10 w-10 text-amber-500 group-hover:text-amber-400 transition-colors" />
              </div>

              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-50 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                {service.description}
              </p>

              {/* Arrow */}
              <div className="mt-8 text-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 text-sm font-semibold">
                Saiba mais →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
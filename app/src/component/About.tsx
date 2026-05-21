import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <section id="sobre" className="py-28 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 section-divider"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">

        {/* Label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-amber-500"></div>
          <span className="text-amber-500 text-xs uppercase tracking-[0.25em] font-semibold">Quem Somos</span>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-16">

          {/* Text Side */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-8 tracking-tight">
              Transformando Ideias em{' '}
              <span className="text-gradient">Experiências Visuais</span>
            </h2>

            <p className="text-gray-400 leading-relaxed mb-5 text-base">
              Fundada em 2025 em Cuiabá, a Gabe Audiovisual nasceu da paixão por transformar ideias em narrativas visuais poderosas.
              Combinamos uma equipe multidisciplinar com uma abordagem criativa e estratégica para entregar projetos que superam as expectativas.
            </p>
            <p className="text-gray-400 leading-relaxed text-base mb-10">
              Trabalhamos com as mais recentes tecnologias de filmagem, iluminação e pós-produção, garantindo máxima qualidade e acabamento
              impecável em cada frame — do comercial dinâmico ao documentário sensível.
            </p>

            <Link
              href="/sobre"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors group"
            >
              Conheça nossa história
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>

          {/* Image Side */}
          <div className="lg:w-1/2 w-full">
            <div className="relative">
              {/* Decorative border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-500/30 via-transparent to-transparent blur-sm"></div>
              <div className="relative h-72 md:h-[28rem] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Equipe de produção"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 glass rounded-2xl px-5 py-4 shadow-xl">
                <div className="text-2xl font-black text-gradient">100+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Projetos</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider"></div>
    </section>
  )
}
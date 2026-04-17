'use client'
import Image from 'next/image';

type HeroProps = {
  titulo: string;
  subtitulo: string;
  image: string;
};


export default function Hero({ titulo, subtitulo, image }: HeroProps) {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.querySelector('#contato')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  

  return (
    <section
      id="home"
      className="min-h-[60vh] md:min-h-[75vh] bg-cover bg-center relative mt-16 flex items-center"
      style={{
        width: '100%',
        backgroundImage: `url('${image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 w-full text-center text-white px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-6xl font-bold mb-4 leading-tight">
            {titulo}
          </h1>
          <p className="text-base md:text-2xl text-gray-200">
            {subtitulo}
          </p>
        </div>
      </div>
    </section>
  )
}
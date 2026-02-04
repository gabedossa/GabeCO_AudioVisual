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
      className="h-120 bg-cover bg-center relative mt-16"
      style={{
        width: '100%',
        backgroundImage: `url('${image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="h-full absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
        <div className="h-60 max-w-4xl items-center justify-center">
          <h1 className="text-2xl md:text-6xl font-bold mb-6 leading-tight">
            {titulo}
          </h1>
          <p className="text-2xl mb-8">
            {subtitulo}
            Cinema criativo e brasileiro • Música como linguagem

          </p>
        </div>
      </div>
    </section>
  )
}
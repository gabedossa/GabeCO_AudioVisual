import Hero from  '@/app/src/component/Hero';
import About from '@/app/src/component/About'
import Services from '@/app/src/component/Services'
import Footer from './src/component/Footer';
export default function Home() {
  return (
    <>
    {/* Pagina Inicial */}
      <Hero 
      titulo="Contando Histórias Através de Imagens" 
      subtitulo="Produtora audiovisual de atuação autoral e colaborativa"
      image="/images/fotos/Chiquitania.png"
      />
      <About />
      <Services />
      <Footer />
    </>
  )
}
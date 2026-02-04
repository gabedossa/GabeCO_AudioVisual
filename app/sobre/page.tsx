import Card from "../src/component/card";
import Footer from "../src/component/Footer";
import Hero from "../src/component/Hero";

export default function Portfolio() {
  const colaboradores = [
    { img: `/img/Boneco_neve.jpg`, cargo:"Artista Visual e Programador", nome: 'Gabriel Dossa', descricao: 'Artista visual e programador, com atuação em audiovisual, frontend e inteligência artificial aplicada a processos criativos.' },
    { img: `/img/Boneco_neve.jpg`, cargo:"Produtor e Diretor Audiovisual", nome: 'Aroldo Maciel', descricao: 'Produtor e diretor audiovisual com 25 anos de experiência em cinema, TV e projetos autorais.' },
    { img: `/img/Boneco_neve.jpg`, cargo:"Musicista, Produtora Musical e Pesquisadora", nome: 'Ana Cecilia dos Santos', descricao: 'Musicista, produtora musical e pesquisadora. Doutora em Comunicação e Semiótica (PUC-SP), com formação em Música e Som para Cinema e TV. Atua na criação de trilhas sonoras, direção de som e produção musical para cinema e audiovisual autoral.' },
  ]
  return (
    <>
      <div className="absolute inset-0 bg-black/70"></div>
      
       <Hero titulo="Sobre a nossa equipe" subtitulo="Conheça a equipe talentosa por trás da Gabe Audiovisual" image={"/images/fotos/empresa_img.png"} />
     

    <section id="servicos" className="py-20 px-4 bg-secondary relative">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none"></div>
  
  <div className="max-w-7xl mx-auto relative z-10">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 
                   text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
      Colaboradores
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {colaboradores.map((colaborador, index) => (
        <Card 
          key={index} 
          img={colaborador.img}
          nome={colaborador.nome} 
          cargo={colaborador.cargo}
          descricao={colaborador.descricao} 
        />
      ))}
    </div>
  </div>
</section>
<Footer />
    </>
    
  )
}
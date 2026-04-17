import Card from "../src/component/card";
import Footer from "../src/component/Footer";
import Hero from "../src/component/Hero";

export default function Portfolio() {
  const colaboradores = [
    {
      img: `/img/Boneco_neve.jpg`,
      cargo: "Artista Visual e Programador",
      nome: 'Gabriel Dossa',
      descricao: 'Para Gabriel, arte e tecnologia nunca foram mundos separados. Designer gráfico, colorista e programador, ele constrói as camadas visuais e digitais que dão vida aos projetos da Gabe — desde a paleta de cores de um documentário até a experiência de quem acessa o site. Acredita que uma boa ideia merece tanto uma boa imagem quanto um bom código.',
    },
    {
      img: `/img/Boneco_neve.jpg`,
      cargo: "Produtor e Diretor Audiovisual",
      nome: 'Aroldo Maciel',
      descricao: 'Produtor e diretor com mais de 25 anos de trajetória no cinema, na televisão e em projetos audiovisuais autorais. Fundador da Gabe Audiovisual, carrega uma visão artística profunda enraizada na cultura do Centro-Oeste brasileiro. Já dirigiu documentários premiados e colaborou com realizadores nacionais e internacionais.',
    },
    {
      img: `/img/Boneco_neve.jpg`,
      cargo: "Musicista, Produtora Musical e Pesquisadora",
      nome: 'Ana Cecilia dos Santos',
      descricao: 'Doutora em Comunicação e Semiótica pela PUC-SP, com formação especializada em Música e Som para Cinema e TV. Atua na criação de trilhas sonoras originais, direção de som e produção musical para cinema e audiovisual autoral. Sua pesquisa une rigor acadêmico e sensibilidade artística na construção de paisagens sonoras únicas.',
    },
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
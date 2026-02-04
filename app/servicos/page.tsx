import Card from "../src/component/card";
import Footer from "../src/component/Footer";
import Hero from "../src/component/Hero";

export default function Portfolio() {
  const colaboradores = [
    { img: `/img/Imagem_Edicao.png`, nome: 'Edição de Vídeo', descricao: 'Edição de vídeos profissionais para diversos segmentos' },
    { img: `/img/Imagem_Coloracao.png`, nome: 'Coloração de Vídeo', descricao: 'Coloração e correção de vídeos para melhor qualidade visual' },
    { img: `/img/Imagem_Gravacao_Audio.png`, nome: 'Gravação de Áudio', descricao: 'Análise e processamento de áudio para produção audiovisual' },
    { img: `/img/Imagem_Gravacao_Audio.png`, nome: 'Edição de Audio', descricao: 'Edição e processamento de áudio para produção audiovisual' },
    { img: `/img/Imagem_Gravacao_Material.png`, nome: 'Gravação de material', descricao: 'Gravação de material para produção audiovisual' },
    { img: `/img/Imagem_Criacao_Web.png`, nome: 'Criação de Páginas Web', descricao: 'Criação de páginas web e aplicativos'},
  ]
  return (
    <>
    {/* Pagina Servicos */}
      <div className="absolute inset-0 bg-black/70"></div>
      
       <Hero titulo="Serviços prestados" subtitulo="Conheça os serviços oferecidos pela Gabe Audiovisual" image={"/images/fotos/Imagem_Edicao.png"} />
     

    <section id="servicos" className="py-20 px-4 bg-secondary relative">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none"></div>
  
  <div className="max-w-7xl mx-auto relative z-10">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 
                   text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
      Servicos
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {colaboradores.map((colaborador, index) => (
        <Card 
          key={index} 
          img={colaborador.img}
          cargo={"serviços"}
          nome={colaborador.nome} 
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
import Card from "../src/component/card";
import CardFilmes from "../src/component/CardFilmes";
import Footer from "../src/component/Footer";
import Hero from "../src/component/Hero";

export default function Portfolio() {
  const colaboradores = [
    { img: `/img/Boneco_neve.jpg`, nome: 'Gabriel Vitor dos Santos', descricao: 'Colorista, designer gráfico e programador' },
    { img: `/img/Boneco_neve.jpg`, nome: 'Aroldo Maciel', descricao: 'Editor de Vídeo e cinegrafista' },
    { img: `/img/Boneco_neve.jpg`, nome: 'Ana Cecilia dos Santos', descricao: 'Colorista, sound designer e produtora de áudio' },
  ]
  return (
    <>
      <div className="absolute inset-0 bg-black/70"></div>
      
       <Hero titulo="Portfólio" subtitulo="Conheça os trabalhos realizados pela Gabe Audiovisual." image={"/images/fotos/empresa_img.png"} />
     

    <section id="servicos" className="py-20 px-4 bg-secondary relative">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none"></div>
  
  <div className="max-w-7xl mx-auto relative z-10">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 
                   text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
      Filmes
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <CardFilmes title="Arne Sucksdorff: uma vida documentando a vida" trailerUrl="https://www.youtube.com/" imgFilme="/img/Arne_Sucksdorff.jpg" ano= {2001} duracao="35 min" genero={["Documentario"]} diretor="Bárbara Fontes(MT)" description="História e vida do cineasta Arne Sucksdorff e sua paixão pelo Matogrosso e o Pantanal."/>   
      <CardFilmes title="Em Trânsito " trailerUrl="https://www.youtube.com/" imgFilme="/img/Em_Transito.jpg" ano= {20004} duracao="60 min" genero={["Documentario"]} diretor="Elton Rivas (SP)" description="Uma narrativa sobre um dos pavos indígenas do Matogrosso."/>   
      <CardFilmes title="The Price of Freedom (O Preço da liberdade)" trailerUrl="https://www.youtube.com/" imgFilme="/img/Capa_The_Price_of_Freedom.jpg" ano= {2016} duracao="60 min" genero={["Documentario"]} diretor="Aroldo Maciel" description="Um documentário sul Africano."/>   
      <CardFilmes title="O Pantaneiro" trailerUrl="https://www.youtube.com/" imgFilme="/img/Capa_Pantaneiro.jpg" ano= {2016} duracao="60 min" genero={["Documentario"]} diretor="Aroldo Maciel" description="Um documentário sul Africano."/>   
    </div>

  <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 
                   text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
      Músicas
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <CardFilmes title="Cultura Ultilitária" imgFilme="/img/Boneco_neve.jpg" ano= {2001} duracao="35 min" genero={["Disco"]} artista="Ana Cecilia dos Santos" description="História e vida do cineasta Arne Sucksdorff e sua paixão pelo Matogrosso e o Pantanal."/>   
      <CardFilmes title="Matogrosso Canta e encanta. " imgFilme="/img/Matogrosso_encanta.jpg" ano= {2016} duracao="60 min" genero={["Disco"]} artista="Vários artistas" description="Uma narrativa sobre um dos pavos indígenas do Matogrosso."/>   
      <CardFilmes title="Matogrosso Canta e encanta. " imgFilme="/img/Matogrosso_encanta.jpg" ano= {2016} duracao="60 min" genero={["Disco"]} artista="Ana Cecilia dos Santos" description="Uma narrativa sobre um dos pavos indígenas do Matogrosso."/>   
    </div>
  </div>
</section>
<Footer />
    </>
    
  )
}
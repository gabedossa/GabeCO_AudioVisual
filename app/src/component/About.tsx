import Image from 'next/image'

export default function About() {
  return (
    <section id="sobre" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-dark mb-12">
          Sobre Nós
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-dark mb-6">
              Transformando Ideias em Experiências Visuais.
            </h2>
            <p className="mb-4">
              Fundada em 2025 em Cuiabá, a Gabe Audiovisual nasceu da paixão por transformar ideias em narrativas visuais poderosas.
              Combinamos uma equipe multidisciplinar com uma abordagem criativa e estratégica para entregar projetos que não apenas atendem, 
              mas superam as expectativas dos nossos clientes.
            </p>
            <p>
              Nosso compromisso com a excelência técnica é absoluto. Trabalhamos com as mais recentes tecnologias de filmagem, iluminação e pós-produção, 
              garantindo a máxima qualidade e um acabamento impecável em cada frame. Seja para um comercial dinâmico, um documentário sensível ou uma série 
              original ambiciosa, dominamos todas as etapas do processo para elevar a sua história.

              Da concepção criativa à entrega final, nosso foco é realizar a sua visão com maestria e impacto. Conte conosco para dar vida 
              à sua próxima grande narrativa.
            </p>
          </div>
          <div className="md:w-1/2 relative h-96">
            <Image
              src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Equipe de produção"
              fill
              className="rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
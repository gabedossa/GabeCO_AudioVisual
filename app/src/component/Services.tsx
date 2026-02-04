import { 
  FilmIcon, 
  CameraIcon, 
  PencilSquareIcon 
} from '@heroicons/react/24/outline'

const services = [
  {
    icon: FilmIcon,
    title: 'Produção de Vídeos',
    description: 'Do conceito à entrega final, produzimos vídeos institucionais, comerciais, promocionais e muito mais com qualidade cinematográfica.',
  },
  {
    icon: CameraIcon,
    title: 'Colorização Profissional',
    description: 'Aprimoramos suas filmagens com técnicas avançadas de color grading para garantir que cada cena tenha o impacto visual desejado.',
  },
  {
    icon: PencilSquareIcon,
    title: 'Pós-Produção',
    description: 'Edição, colorização, efeitos visuais e finalização em 4K. Transformamos suas imagens brutas em obras-primas visuais.',
  },
]

export default function Services() {
  return (
    <section id="servicos" className="py-20 px-4 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-dark mb-12">
          Nossos Serviços
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-black p-8 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-2"
            >
              <service.icon className="text-primary h-12 w-12 mb-6" />
              <h3 className="text-2xl font-bold text-dark mb-4">
                {service.title}
              </h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
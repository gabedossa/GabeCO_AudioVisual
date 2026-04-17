import Link from 'next/link'
import { FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa6'
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  const ano = new Date().getFullYear()
  const whatsappLink = `https://wa.me/5565981722991?text=${encodeURIComponent('Olá! Gostaria de fazer um orçamento para um projeto audiovisual.')}`

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Sobre */}
          <div>
            <h3 className="font-semibold text-white mb-4">Sobre</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Produtora audiovisual de atuação autoral e colaborativa, sediada em Cuiabá — MT.
            </p>
            <div className="flex items-center gap-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-yellow-400 transition-colors p-2 rounded-full hover:bg-white/5">
                <FaInstagram size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-gray-400 hover:text-yellow-400 transition-colors p-2 rounded-full hover:bg-white/5">
                <FaYoutube size={18} />
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-gray-400 hover:text-green-400 transition-colors p-2 rounded-full hover:bg-white/5">
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="font-semibold text-white mb-4">Navegação</h3>
            <ul className="space-y-2">
              {[
                { label: 'Início', href: '/' },
                { label: 'Sobre', href: '/sobre' },
                { label: 'Serviços', href: '/servicos' },
                { label: 'Portfólio', href: '/portfolio' },
                { label: 'Contato', href: '/contato' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPinIcon className="w-4 h-4 mt-0.5 shrink-0 text-yellow-500" />
                <span>Rua Cáceres, 171 — Centro<br />Cuiabá - MT</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <PhoneIcon className="w-4 h-4 shrink-0 text-yellow-500" />
                <a href="tel:+5565981722991" className="hover:text-white transition-colors">
                  (65) 98172-2991
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <EnvelopeIcon className="w-4 h-4 shrink-0 text-yellow-500" />
                <a href="mailto:contato@gabeaudiovisual.com.br" className="hover:text-white transition-colors">
                  contato@gabeaudiovisual.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-gray-500 text-xs">
          <p>© {ano} Gabe Audiovisual. Todos os direitos reservados.</p>
          <p>Desenvolvido com dedicação em Cuiabá — MT</p>
        </div>
      </div>
    </footer>
  )
}

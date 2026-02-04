"use client";

import { useState } from 'react';
import { FaInstagram, FaLinkedin, FaLink, FaQuoteLeft, FaXmark } from 'react-icons/fa6';

interface CardProps {
  nome: string;
  descricao: string;
  img: any;
  cargo?: string;
  redesSociais?: {
    instagram?: string;
    linkedin?: string;
    site?: string;
  };
  citacao?: string;
}

export default function Card({ 
  img, 
  nome, 
  descricao, 
  cargo,
  redesSociais = {},
  citacao 
}: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Card Principal */}
      <div 
        className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={openModal}
      >
        {/* Container da imagem */}
        <div className="relative h-64 overflow-hidden">
          {img && (
            <img 
              src={img} 
              alt={nome}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          
          {/* Cargo overlay */}
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-500 text-black font-semibold px-3 py-1 rounded-full text-sm">
              {cargo}
            </span>
          </div>
        </div>

        {/* Conteúdo do Card */}
        <div className="p-6">
          {/* Nome */}
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
            {nome}
          </h3>

          {/* Citação (se existir) - versão reduzida */}
          {citacao && (
            <div className="mb-4">
              <FaQuoteLeft className="text-yellow-500/30 inline mr-2" />
              <p className="text-gray-300 italic text-sm line-clamp-2">"{citacao}"</p>
            </div>
          )}

          {/* Descrição reduzida */}
          <div className={`transition-all duration-300 overflow-hidden ${
            isHovered ? 'max-h-32 opacity-100' : 'max-h-20 opacity-90'
          }`}>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{descricao}</p>
          </div>

          {/* Botão ver mais */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-yellow-500 text-sm font-medium hover:text-yellow-400 transition-colors duration-300">
              Ver detalhes →
            </span>
            <div className="flex items-center space-x-2">
              {Object.keys(redesSociais).map((key) => (
                <div 
                  key={key}
                  className="w-2 h-2 bg-yellow-500 rounded-full opacity-70"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Efeito de brilho no hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Modal de Detalhes */}
      {isModalOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-fadeIn"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div 
              className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão Fechar */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-full p-2 transition-all duration-300"
                aria-label="Fechar modal"
              >
                <FaXmark className="h-6 w-6" />
              </button>

              <div className="flex flex-col lg:flex-row">
                {/* Imagem do Colaborador */}
                <div className="lg:w-2/5 relative">
                  {img && (
                    <img 
                      src={img} 
                      alt={nome}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent lg:hidden">
                    <h2 className="text-2xl font-bold text-white">{nome}</h2>
                    <p className="text-yellow-500">{cargo}</p>
                  </div>
                </div>

                {/* Conteúdo do Modal */}
                <div className="lg:w-3/5 p-6 lg:p-8 overflow-y-auto max-h-[60vh] lg:max-h-[70vh] custom-scrollbar">
                  {/* Header Desktop */}
                  <div className="hidden lg:block mb-6">
                    <h2 className="text-3xl font-bold text-white mb-2">{nome}</h2>
                    <p className="text-yellow-500 text-xl">{cargo}</p>
                  </div>

                  {/* Citação completa */}
                  {citacao && (
                    <div className="mb-6 p-4 bg-gray-800/30 rounded-xl">
                      <FaQuoteLeft className="text-yellow-500/50 text-2xl mb-3" />
                      <p className="text-gray-300 italic text-lg leading-relaxed">"{citacao}"</p>
                    </div>
                  )}

                  {/* Descrição completa */}
                  <div className="mb-6">
                    <h4 className="text-yellow-500 text-sm font-semibold uppercase tracking-wider mb-3">Sobre</h4>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">{descricao}</p>
                  </div>

                  {/* Redes Sociais */}
                  {Object.keys(redesSociais).length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-yellow-500 text-sm font-semibold uppercase tracking-wider mb-3">Conecte-se</h4>
                      <div className="flex space-x-4">
                        {redesSociais.instagram && (
                          <a
                            href={redesSociais.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-pink-500 transition-colors duration-300 p-3 hover:bg-gray-800/50 rounded-full border border-gray-700 hover:border-pink-500"
                            aria-label="Instagram"
                          >
                            <FaInstagram className="h-6 w-6" />
                          </a>
                        )}
                        {redesSociais.linkedin && (
                          <a
                            href={redesSociais.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-500 transition-colors duration-300 p-3 hover:bg-gray-800/50 rounded-full border border-gray-700 hover:border-blue-500"
                            aria-label="LinkedIn"
                          >
                            <FaLinkedin className="h-6 w-6" />
                          </a>
                        )}
                        {redesSociais.site && (
                          <a
                            href={redesSociais.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-yellow-500 transition-colors duration-300 p-3 hover:bg-gray-800/50 rounded-full border border-gray-700 hover:border-yellow-500"
                            aria-label="Site"
                          >
                            <FaLink className="h-6 w-6" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Botão para fechar no mobile */}
                  <div className="lg:hidden mt-6 pt-6 border-t border-gray-800">
                    <button
                      onClick={closeModal}
                      className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
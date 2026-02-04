"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPlus, FaXmark, FaQuoteLeft } from 'react-icons/fa6';

interface CardFilmesProps {
    title?: string;
    imgFilme?: any;
    thumbFilme?: any;
    description?: string; 
    diretor?: string;
    artista?: string;
    ano?: number;
    duracao?: string;
    genero?: string[];
    elenco?: string[];
    trailerUrl?: string;
    citacao?: string;
}

const CardFilmes: React.FC<CardFilmesProps> = ({ 
    title = "Título não informado",
    imgFilme,
    thumbFilme,
    description = "Descrição não disponível.",
    artista,
    diretor,
    ano = 2024,
    duracao = "Duração não informada",
    genero = [],
    elenco = [],
    trailerUrl,
    citacao
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const firstFocusableElementRef = useRef<HTMLButtonElement>(null);
    const lastFocusableElementRef = useRef<HTMLButtonElement>(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAssistir = () => {
        if (trailerUrl) {
            window.open(trailerUrl, '_blank', 'noopener,noreferrer');
        } else {
            console.log('Assistir:', title);
        }
    };

    const hasTrailer = !!trailerUrl;

    // Fechar modal com ESC
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isModalOpen) {
                closeModal();
            }
        };

        if (isModalOpen && firstFocusableElementRef.current) {
            setTimeout(() => firstFocusableElementRef.current?.focus(), 100);
        }

        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isModalOpen]);

    // Trap focus dentro do modal
    useEffect(() => {
        const handleTabKey = (event: KeyboardEvent) => {
            if (!isModalOpen || !modalRef.current) return;

            if (event.key === 'Tab') {
                const focusableElements = modalRef.current.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0] as HTMLElement;
                const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleTabKey);
            document.body.classList.add('overflow-hidden');
        }

        return () => {
            document.removeEventListener('keydown', handleTabKey);
            document.body.classList.remove('overflow-hidden');
        };
    }, [isModalOpen]);

    return (
        <>
            {/* Card Principal */}
            <div 
                className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={openModal}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openModal()}
                aria-label={`Ver detalhes de ${title}`}
            >
                {/* Container da imagem */}
                <div className="relative h-64 overflow-hidden">
                    <img 
                        src={thumbFilme || imgFilme} 
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMzNzQxNEYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
                        }}
                    />
                    {/* Overlay gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                    
                    {/* Duração */}
                    <div className="absolute top-4 right-4">
                        <span className="bg-black/70 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                            {duracao}
                        </span>
                    </div>

                    {/* Ano */}
                    <div className="absolute top-4 left-4">
                        <span className="bg-yellow-500 text-black font-semibold px-3 py-1 rounded-full text-sm">
                            {ano}
                        </span>
                    </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6">
                    {/* Título */}
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300 line-clamp-1">
                        {title}
                    </h3>

                    {/* Gêneros */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {genero.map((g, index) => (
                            <span 
                                key={index}
                                className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                            >
                                {g}
                            </span>
                        ))}
                    </div>

                    {/* Citação (se existir) - versão reduzida */}
                    {citacao && (
                        <div className="mb-4">
                            <FaQuoteLeft className="text-yellow-500/30 inline mr-2 text-sm" />
                            <p className="text-gray-300 italic text-sm line-clamp-2">"{citacao}"</p>
                        </div>
                    )}

                    {/* Descrição reduzida */}
                    <div className={`transition-all duration-300 overflow-hidden ${
                        isHovered ? 'max-h-32 opacity-100' : 'max-h-20 opacity-90'
                    }`}>
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{description}</p>
                    </div>

                    {/* Diretor/Artista */}
                    <div className="mt-3 text-gray-400 text-sm">
                        {diretor ? `Direção: ${diretor}` : artista ? `Artista: ${artista}` : ''}
                    </div>

                    {/* Botão ver mais */}
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-yellow-500 text-sm font-medium hover:text-yellow-400 transition-colors duration-300">
                            Ver detalhes →
                        </span>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full opacity-70" />
                            <div className="w-2 h-2 bg-yellow-500 rounded-full opacity-70" />
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
                            ref={modalRef}
                            className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scaleIn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Botão Fechar */}
                            <button
                                ref={firstFocusableElementRef}
                                onClick={closeModal}
                                className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-full p-2 transition-all duration-300"
                                aria-label="Fechar modal"
                            >
                                <FaXmark className="h-6 w-6" />
                            </button>

                            <div className="flex flex-col lg:flex-row">
                                {/* Imagem do Filme/Projeto */}
                                <div className="lg:w-2/5 relative">
                                    {imgFilme && (
                                        <img 
                                            src={imgFilme} 
                                            alt={title}
                                            className="w-full h-64 lg:h-full object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMzNzQxNEYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
                                            }}
                                        />
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent lg:hidden">
                                        <h2 className="text-2xl font-bold text-white">{title}</h2>
                                        <div className="flex items-center gap-3 text-gray-300 mt-2">
                                            <span>{ano}</span>
                                            <span>•</span>
                                            <span>{duracao}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Conteúdo do Modal */}
                                <div className="lg:w-3/5 p-6 lg:p-8 overflow-y-auto max-h-[60vh] lg:max-h-[70vh] custom-scrollbar">
                                    {/* Header Desktop */}
                                    <div className="hidden lg:block mb-6">
                                        <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
                                        <div className="flex items-center gap-4 text-gray-300">
                                            <span>{ano}</span>
                                            <span>•</span>
                                            <span>{duracao}</span>
                                        </div>
                                    </div>

                                    {/* Citação completa */}
                                    {citacao && (
                                        <div className="mb-6 p-4 bg-gray-800/30 rounded-xl">
                                            <FaQuoteLeft className="text-yellow-500/50 text-2xl mb-3" />
                                            <p className="text-gray-300 italic text-lg leading-relaxed">"{citacao}"</p>
                                        </div>
                                    )}

                                    {/* Informações */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-3">
                                                {diretor ? 'DIREÇÃO' : artista ? 'ARTISTA' : 'CRIAÇÃO'}
                                            </h4>
                                            <p className="text-white text-lg">{diretor || artista}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-3">GÊNERO</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {genero.map((g, index) => (
                                                    <span 
                                                        key={index}
                                                        className="px-3 py-1.5 bg-gray-800 text-white text-sm rounded-full"
                                                    >
                                                        {g}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Descrição completa */}
                                    <div className="mb-8">
                                        <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-3">SINOPSE</h4>
                                        <p className="text-gray-300 leading-relaxed whitespace-pre-line">{description}</p>
                                    </div>

                                    {/* Elenco (se existir) */}
                                    {elenco.length > 0 && (
                                        <div className="mb-8">
                                            <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-3">PARTICIPAÇÕES</h4>
                                            <div className="flex flex-wrap gap-3">
                                                {elenco.slice(0, 6).map((ator, index) => (
                                                    <span 
                                                        key={index}
                                                        className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg text-sm"
                                                    >
                                                        {ator}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Botões de Ação */}
                                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-800">
                                        <button 
                                            onClick={handleAssistir}
                                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                                        >
                                            <FaPlay className="h-5 w-5" />
                                            <span>{hasTrailer ? 'Ver Trailer' : 'Assistir'}</span>
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
};

export default CardFilmes;
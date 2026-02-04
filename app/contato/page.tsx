'use client';

import { useState, FormEvent } from 'react';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  PaperAirplaneIcon,
  UserIcon,
  DevicePhoneMobileIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
    telefone: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (message) setMessage(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: '✅ ' + data.message + ' Retornaremos em até 24 horas.' 
        });
        setFormData({ nome: '', email: '', assunto: '', mensagem: '', telefone: '' });
        
        // Auto-remove success message after 5 seconds
        setTimeout(() => setMessage(null), 5000);
      } else {
        setMessage({ type: 'error', text: '❌ ' + data.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '❌ Erro de conexão. Verifique sua internet.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Entre em Contato
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Vamos criar algo incrível juntos. Entre em contato para seu próximo projeto audiovisual.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02]">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <MapPinIcon className="w-6 h-6 text-blue-400" />
                Nossa Localização
              </h2>
              <p className="text-gray-300 mb-2">Rua Cáceres, 171 - Centro</p>
              <p className="text-gray-400">Cuiabá - MT, 78000-000</p>
              <a 
                href="https://maps.google.com/?q=Rua+Cáceres+171+Cuiabá+MT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span className="text-sm">Ver no Google Maps →</span>
              </a>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300 hover:scale-[1.02]">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <PhoneIcon className="w-6 h-6 text-green-400" />
                Contato Direto
              </h2>
              <a 
                href="tel:+5565981722991" 
                className="text-2xl font-bold text-white hover:text-green-400 transition-colors block mb-2"
              >
                (65) 98172-2991
              </a>
              <p className="text-gray-400">Ligue ou envie mensagem no WhatsApp</p>
              <div className="flex gap-4 mt-6">
                <a 
                  href="https://wa.me/5565981722991"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg text-center transition-colors font-medium"
                >
                  WhatsApp
                </a>
                <a 
                  href="tel:+5565981722991"
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg text-center transition-colors font-medium"
                >
                  Ligar Agora
                </a>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02]">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <ClockIcon className="w-6 h-6 text-yellow-400" />
                Horário de Atendimento
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-gray-300">Segunda - Sexta</span>
                  <span className="font-semibold">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-gray-300">Sábado</span>
                  <span className="font-semibold">9:00 - 12:00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-300">Domingo</span>
                  <span className="text-red-400 font-semibold">Fechado</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-800/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <EnvelopeIcon className="w-5 h-5" />
                E-mail Rápido
              </h3>
              <a 
                href="mailto:contato@gaudiovisual.com"
                className="text-lg text-blue-300 hover:text-blue-200 transition-colors break-all"
              >
                contato@gaudiovisual.com
              </a>
              <p className="text-gray-400 text-sm mt-2">Respondemos em até 24h</p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <PaperAirplaneIcon className="w-8 h-8 text-blue-400" />
                <h2 className="text-3xl font-bold">Envie uma Mensagem</h2>
              </div>

              {/* Status Message */}
              {message && (
                <div className={`mb-8 p-4 rounded-xl border ${message.type === 'success' ? 'bg-green-900/30 border-green-700/50' : 'bg-red-900/30 border-red-700/50'}`}>
                  <div className="flex items-center">
                    <div className={`mr-3 p-2 rounded-full ${message.type === 'success' ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
                      {message.type === 'success' ? '✓' : '✕'}
                    </div>
                    <p>{message.text}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <UserIcon className="w-4 h-4" />
                      Nome Completo *
                    </label>
                    <input
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 group-hover:border-gray-600"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <EnvelopeIcon className="w-4 h-4" />
                      E-mail *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 group-hover:border-gray-600"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                {/* Phone & Subject Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <DevicePhoneMobileIcon className="w-4 h-4" />
                      Telefone (opcional)
                    </label>
                    <input
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 group-hover:border-gray-600"
                      placeholder="(65) 99999-9999"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Assunto
                    </label>
                    <select
                      name="assunto"
                      value={formData.assunto}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 group-hover:border-gray-600"
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="Orçamento para Documentário">Orçamento para Documentário</option>
                      <option value="Gravação de Comercial">Gravação de Comercial</option>
                      <option value="Edição de Vídeo">Edição de Vídeo</option>
                      <option value="Produção Musical">Produção Musical</option>
                      <option value="Parceria Comercial">Parceria Comercial</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                    Mensagem *
                  </label>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 group-hover:border-gray-600 resize-none"
                    placeholder="Descreva seu projeto, ideias, orçamento e prazo..."
                  />
                  <p className="text-gray-500 text-sm mt-2">
                    Quanto mais detalhes você fornecer, melhor poderemos entender suas necessidades.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.99]"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-5 h-5" />
                      Enviar Mensagem
                    </>
                  )}
                </button>

                <p className="text-gray-500 text-xs text-center pt-4 border-t border-gray-800">
                  Seus dados serão usados apenas para responder sua mensagem. Não compartilhamos informações.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, FormEvent, useEffect, useCallback } from 'react';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  PaperAirplaneIcon,
  UserIcon,
  DevicePhoneMobileIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

// ============================================
// CONFIGURAÇÃO DO EMAILJS
// ============================================
// ⚠️ Configure suas credenciais reais no arquivo .env.local:
// NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id
// NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id
// NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_public_key

interface EmailJSConfig {
  SERVICE_ID: string;
  TEMPLATE_ID: string;
  PUBLIC_KEY: string;
  IS_CONFIGURED: boolean;
}

const EMAILJS_CONFIG: EmailJSConfig = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
  IS_CONFIGURED: !!(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID && 
                    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID && 
                    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
};

// ============================================
// TIPOS
// ============================================
type FormData = {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
  telefone: string;
};

type MessageType = {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  text: string;
  duration?: number;
};

// ============================================
// DADOS ESTÁTICOS
// ============================================
const ASSUNTOS_OPCOES = [
  { value: '', label: 'Selecione um assunto' },
  { value: 'Orçamento para Documentário', label: '📽️ Orçamento para Documentário' },
  { value: 'Gravação de Comercial', label: '🎬 Gravação de Comercial' },
  { value: 'Edição de Vídeo', label: '🎞️ Edição de Vídeo' },
  { value: 'Produção Musical', label: '🎵 Produção Musical' },
  { value: 'Transmissão Ao Vivo', label: '🔴 Transmissão Ao Vivo' },
  { value: 'Fotografia Profissional', label: '📸 Fotografia Profissional' },
  { value: 'Parceria Comercial', label: '🤝 Parceria Comercial' },
  { value: 'Outro', label: '💭 Outro' },
];

const HORARIOS = [
  { dia: 'Segunda - Sexta', horario: '9:00 - 18:00', status: 'open' },
  { dia: 'Sábado', horario: '9:00 - 12:00', status: 'open' },
  { dia: 'Domingo', horario: 'Fechado', status: 'closed' },
];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function ContatoPage() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
    telefone: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<MessageType | null>(null);
  const [isEmailJSLoaded, setIsEmailJSLoaded] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [hasTyped, setHasTyped] = useState(false);

  // ============================================
  // CARREGAMENTO DO EMAILJS
  // ============================================
  useEffect(() => {
    const loadEmailJS = async () => {
      try {
        // Verificação inicial das configurações
        if (!EMAILJS_CONFIG.IS_CONFIGURED) {
          setMessage({
            type: 'warning',
            title: '⚠️ Configuração Pendente',
            text: 'Configure suas credenciais do EmailJS no arquivo .env.local para habilitar o formulário de contato.',
            duration: 15000,
          });
          console.warn('⚠️ EmailJS não configurado. Verifique .env.local');
          return;
        }

        // Carregar dinamicamente para evitar SSR issues
        const emailjs = (await import('@emailjs/browser')).default;
        
        // Inicializar com a chave pública
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        setIsEmailJSLoaded(true);
        
        console.log('✅ EmailJS carregado com sucesso');
        console.log('📦 Service ID:', EMAILJS_CONFIG.SERVICE_ID);
        console.log('📋 Template ID:', EMAILJS_CONFIG.TEMPLATE_ID);
        
      } catch (error) {
        console.error('❌ Erro ao carregar EmailJS:', error);
        setMessage({
          type: 'error',
          title: 'Erro de Configuração',
          text: 'Não foi possível carregar o serviço de email. Verifique suas credenciais.',
          duration: 10000,
        });
      }
    };

    loadEmailJS();
  }, []);

  // ============================================
  // LIMPEZA AUTOMÁTICA DE MENSAGENS
  // ============================================
  useEffect(() => {
    if (message?.duration) {
      const timer = setTimeout(() => setMessage(null), message.duration);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // ============================================
  // MANIPULAÇÃO DE INPUTS
  // ============================================
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Atualizar contador de caracteres para mensagem
      if (name === 'mensagem') {
        setCharCount(value.length);
      }
      
      return newData;
    });
    
    // Marcar que o usuário começou a digitar
    if (!hasTyped) {
      setHasTyped(true);
    }
    
    // Limpar mensagens de erro quando o usuário começa a digitar
    if (message?.type === 'error') {
      setMessage(null);
    }
  }, [message, hasTyped]);

  // ============================================
  // VALIDAÇÃO DO FORMULÁRIO
  // ============================================
  const validateForm = (): string | null => {
    if (!formData.nome.trim()) return 'Por favor, informe seu nome completo.';
    if (!formData.email.trim()) return 'Por favor, informe seu e-mail.';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Por favor, informe um e-mail válido.';
    }
    
    if (!formData.mensagem.trim()) return 'Por favor, escreva sua mensagem.';
    if (formData.mensagem.length < 10) return 'A mensagem deve ter pelo menos 10 caracteres.';
    if (formData.mensagem.length > 2000) return 'A mensagem é muito longa (máximo 2000 caracteres).';
    
    return null;
  };

  // ============================================
  // ENVIO DO FORMULÁRIO
  // ============================================
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Verificar se EmailJS está carregado
    if (!isEmailJSLoaded) {
      setMessage({
        type: 'error',
        title: 'Serviço Indisponível',
        text: 'O serviço de email ainda não está pronto. Por favor, aguarde alguns segundos.',
      });
      return;
    }

    // Validar formulário
    const validationError = validateForm();
    if (validationError) {
      setMessage({
        type: 'error',
        title: 'Validação',
        text: validationError,
      });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const emailjs = (await import('@emailjs/browser')).default;
      
      // Preparar dados do template
      const templateParams = {
        to_name: 'G Audiovisual',
        from_name: formData.nome,
        from_email: formData.email,
        telefone: formData.telefone || 'Não informado',
        assunto: formData.assunto || 'Contato do Site',
        message: formData.mensagem,
        date: new Date().toLocaleDateString('pt-BR'),
        time: new Date().toLocaleTimeString('pt-BR'),
        reply_to: formData.email,
        ip_address: 'web-form',
      };

      console.log('📤 Enviando email via EmailJS...');
      console.log('📊 Dados:', templateParams);

      // Enviar email
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log('✅ Email enviado com sucesso:', result);

      if (result.status === 200) {
        setMessage({
          type: 'success',
          title: '✨ Sucesso!',
          text: 'Sua mensagem foi enviada com sucesso! Retornaremos em até 24 horas.',
          duration: 6000,
        });
        
        // Resetar formulário
        setFormData({
          nome: '',
          email: '',
          assunto: '',
          mensagem: '',
          telefone: ''
        });
        setCharCount(0);
        setHasTyped(false);
        
        // Rastreamento de sucesso (opcional - Google Analytics)
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'form_submit', {
            event_category: 'contato',
            event_label: 'sucesso',
          });
        }
      } else {
        throw new Error(`Status ${result.status}: ${result.text}`);
      }
    } catch (error: any) {
      console.error('❌ Erro ao enviar email:', error);
      
      // Tratar diferentes tipos de erro
      let errorTitle = 'Erro ao Enviar';
      let errorText = 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.';
      
      if (error?.text?.includes('Invalid template ID')) {
        errorText = 'Template inválido. Entre em contato com o administrador do site.';
      } else if (error?.text?.includes('Invalid public key')) {
        errorText = 'Chave de API inválida. Verifique as configurações do EmailJS.';
      } else if (error?.status === 403) {
        errorText = 'Permissão negada. Configure as permissões no EmailJS.';
      } else if (error?.status === 0) {
        errorText = 'Erro de conexão. Verifique sua internet e tente novamente.';
      } else if (error?.message?.includes('timeout')) {
        errorText = 'Tempo esgotado. Tente enviar novamente.';
      }

      setMessage({
        type: 'error',
        title: errorTitle,
        text: errorText,
        duration: 8000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // RENDERIZAÇÃO DA MENSAGEM
  // ============================================
  const renderMessage = () => {
    if (!message) return null;
    
    const colors = {
      success: 'bg-gradient-to-r from-green-900/40 to-emerald-900/20 border-green-700/40',
      error: 'bg-gradient-to-r from-red-900/40 to-rose-900/20 border-red-700/40',
      info: 'bg-gradient-to-r from-blue-900/40 to-cyan-900/20 border-blue-700/40',
      warning: 'bg-gradient-to-r from-yellow-900/40 to-amber-900/20 border-yellow-700/40',
    };
    
    const icons = {
      success: <CheckCircleIcon className="w-6 h-6 text-green-400" />,
      error: <ExclamationCircleIcon className="w-6 h-6 text-red-400" />,
      info: <InformationCircleIcon className="w-6 h-6 text-blue-400" />,
      warning: <ExclamationCircleIcon className="w-6 h-6 text-yellow-400" />,
    };

    return (
      <div className={`mb-8 p-6 rounded-2xl border backdrop-blur-lg ${colors[message.type]} animate-fade-in`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            {icons[message.type]}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">{message.title}</h3>
            <p className="text-gray-200">{message.text}</p>
          </div>
          <button
            onClick={() => setMessage(null)}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
            aria-label="Fechar mensagem"
          >
            ✕
          </button>
        </div>
      </div>
    );
  };

  // ============================================
  // RENDERIZAÇÃO DO COMPONENTE
  // ============================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slower"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl mb-6">
            <PaperAirplaneIcon className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-tight">
            Vamos Criar Juntos
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Conte sua história através do audiovisual. Entre em contato e transforme sua visão em realidade.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-7xl mx-auto">
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            {HORARIOS.map((item, index) => (
              <div 
                key={item.dia}
                className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 hover:translate-x-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${item.status === 'open' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      <ClockIcon className={`w-5 h-5 ${item.status === 'open' ? 'text-green-400' : 'text-red-400'}`} />
                    </div>
                    <span className="text-gray-300">{item.dia}</span>
                  </div>
                  <span className={`font-semibold ${item.status === 'open' ? 'text-white' : 'text-red-400'}`}>
                    {item.horario}
                  </span>
                </div>
              </div>
            ))}

            {/* Contact Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              <a 
                href="https://wa.me/5565981722991"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-green-900/20 to-emerald-900/10 border border-green-800/30 rounded-2xl p-6 text-center hover:border-green-600/50 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="p-3 bg-green-500/20 rounded-xl w-14 h-14 mx-auto mb-4 group-hover:bg-green-500/30 transition-colors">
                  <PhoneIcon className="w-8 h-8 text-green-400 mx-auto" />
                </div>
                <span className="text-green-300 font-medium">WhatsApp</span>
              </a>

              <a 
                href="tel:+5565981722991"
                className="group bg-gradient-to-br from-blue-900/20 to-cyan-900/10 border border-blue-800/30 rounded-2xl p-6 text-center hover:border-blue-600/50 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="p-3 bg-blue-500/20 rounded-xl w-14 h-14 mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                  <DevicePhoneMobileIcon className="w-8 h-8 text-blue-400 mx-auto" />
                </div>
                <span className="text-blue-300 font-medium">Ligar</span>
              </a>
            </div>

            {/* Location Card */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <MapPinIcon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Estúdio</h3>
              </div>
              <p className="text-gray-300 mb-3">Rua Cáceres, 171 - Centro</p>
              <p className="text-gray-400 text-sm mb-4">Cuiabá - MT, 78000-000</p>
              <a 
                href="https://maps.google.com/?q=Rua+Cáceres+171+Cuiabá+MT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
              >
                <span>Abrir no Maps</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/30">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl">
                  <EnvelopeIcon className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                    Envie sua Ideia
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">Respondemos em até 24h</p>
                </div>
              </div>

              {renderMessage()}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name & Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-blue-400" />
                      Nome Completo *
                    </label>
                    <input
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-gray-800/30 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 group-hover:border-gray-600 backdrop-blur-sm"
                      placeholder="Como prefere ser chamado?"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                      <EnvelopeIcon className="w-4 h-4 text-purple-400" />
                      E-mail *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-gray-800/30 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 group-hover:border-gray-600 backdrop-blur-sm"
                      placeholder="seu@melhor.email"
                    />
                  </div>
                </div>

                {/* Phone & Subject */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                      <DevicePhoneMobileIcon className="w-4 h-4 text-green-400" />
                      Telefone (opcional)
                    </label>
                    <input
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-800/30 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10 transition-all duration-300 group-hover:border-gray-600 backdrop-blur-sm"
                      placeholder="(65) 99999-9999"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Assunto do Projeto
                    </label>
                    <div className="relative">
                      <select
                        name="assunto"
                        value={formData.assunto}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-gray-800/30 border-2 border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/10 transition-all duration-300 group-hover:border-gray-600 backdrop-blur-sm appearance-none"
                      >
                        {ASSUNTOS_OPCOES.map((opcao) => (
                          <option key={opcao.value} value={opcao.value}>
                            {opcao.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-45"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="group">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <ChatBubbleLeftRightIcon className="w-4 h-4 text-pink-400" />
                      Sua Mensagem *
                    </label>
                    <span className={`text-xs ${charCount > 2000 ? 'text-red-400 font-semibold' : charCount > 1800 ? 'text-yellow-400' : 'text-gray-500'}`}>
                      {charCount}/2000
                    </span>
                  </div>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    rows={6}
                    maxLength={2000}
                    className="w-full px-5 py-4 bg-gray-800/30 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/10 transition-all duration-300 group-hover:border-gray-600 backdrop-blur-sm resize-none"
                    placeholder="Descreva seu projeto, ideias criativas, orçamento disponível e prazos desejados..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !isEmailJSLoaded}
                  className={`w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group
                    ${isLoading || !isEmailJSLoaded 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98]'
                    } relative overflow-hidden`}
                >
                  {/* Efeito de brilho */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </>
                  ) : !isEmailJSLoaded ? (
                    <>
                      <ExclamationCircleIcon className="w-6 h-6" />
                      <span>Configurando serviço...</span>
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      <span>Enviar Proposta</span>
                    </>
                  )}
                </button>

                <p className="text-gray-500 text-xs text-center pt-6 border-t border-gray-800/50">
                  ✨ Sua criatividade está protegida. Não compartilhamos suas ideias.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Animations CSS */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        .animate-fade-in { 
          animation: fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; 
        }
        .animate-pulse-slow { 
          animation: pulse-slow 8s ease-in-out infinite; 
        }
        .animate-pulse-slower { 
          animation: pulse-slower 12s ease-in-out infinite; 
        }
      `}</style>
    </div>
  );
}
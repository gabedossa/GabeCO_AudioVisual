'use client';

import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Footer from "../src/component/Footer";
import Hero from "../src/component/Hero";

// ⚠️ SUBSTITUA ESTES VALORES COM OS SEUS DO EMAILJS ⚠️
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_gmd6i7b', // Este você já tem!
  TEMPLATE_ID: 'template_lju3hfa', // ⬅️ Vá criar no EmailJS e colocar aqui
  PUBLIC_KEY: 'TIKp5vrN3mvhT14xJ', // ⬅️ Vá em API Keys e copie
};

// Inicializar EmailJS apenas no cliente
if (typeof window !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY !== 'sua_public_key_aqui') {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}

// Ícones SVG
const MapIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

type FormData = {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
  telefone: string;
};

type MessageType = {
  type: 'success' | 'error' | 'info';
  text: string;
};

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
  const [isEmailJSReady, setIsEmailJSReady] = useState(false);

  // Verificar se EmailJS está configurado corretamente
  useEffect(() => {
    const isConfigured = EMAILJS_CONFIG.PUBLIC_KEY && 
                       EMAILJS_CONFIG.PUBLIC_KEY !== 'sua_public_key_aqui' &&
                       EMAILJS_CONFIG.TEMPLATE_ID && 
                       EMAILJS_CONFIG.TEMPLATE_ID !== 'template_gaudiovisual';
    
    setIsEmailJSReady(!!isConfigured);
    
    // Debug no console
    console.log('🔧 Configuração EmailJS:', {
      serviceId: EMAILJS_CONFIG.SERVICE_ID,
      templateId: EMAILJS_CONFIG.TEMPLATE_ID,
      publicKeyConfigured: isConfigured,
      emailJSLoaded: typeof emailjs !== 'undefined'
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpa mensagem de erro quando usuário começa a digitar
    if (message?.type === 'error') {
      setMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar se EmailJS está configurado
    if (!isEmailJSReady) {
      setMessage({
        type: 'error',
        text: '❌ EmailJS não configurado. Configure SERVICE_ID, TEMPLATE_ID e PUBLIC_KEY no código.'
      });
      return;
    }

    // Validações
    if (!formData.nome.trim() || !formData.email.trim() || !formData.mensagem.trim()) {
      setMessage({
        type: 'error',
        text: 'Por favor, preencha todos os campos obrigatórios (*).'
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({
        type: 'error',
        text: 'Por favor, insira um e-mail válido.'
      });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      // Preparar dados para o template
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
      };

      console.log('📤 Enviando e-mail...', {
        serviceId: EMAILJS_CONFIG.SERVICE_ID,
        templateId: EMAILJS_CONFIG.TEMPLATE_ID
      });

      // Enviar e-mail usando EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log('✅ EmailJS Result:', result);

      if (result.status === 200) {
        setMessage({
          type: 'success',
          text: '✅ Mensagem enviada com sucesso! Retornaremos em até 24h.'
        });
        
        // Reset form
        setFormData({
          nome: '',
          email: '',
          assunto: '',
          mensagem: '',
          telefone: ''
        });
        
        // Auto-remover mensagem de sucesso após 5 segundos
        setTimeout(() => {
          setMessage(null);
        }, 5000);

      } else {
        throw new Error(`Status ${result.status}`);
      }

    } catch (error: any) {
      console.error('❌ EmailJS Error:', error);
      
      let errorMessage = 'Erro ao enviar mensagem. Tente novamente.';
      
      // Tratamento específico de erros
      if (error?.status === 412 || error?.text?.includes('412')) {
        errorMessage = 'Erro 412: Permissões do Gmail insuficientes. Reconecte sua conta no EmailJS.';
      } else if (error?.text?.includes('Invalid template ID')) {
        errorMessage = 'Template ID inválido. Verifique no dashboard do EmailJS.';
      } else if (error?.text?.includes('Invalid service ID')) {
        errorMessage = 'Service ID inválido. Use: service_jazm38s';
      } else if (error?.text?.includes('Invalid public key')) {
        errorMessage = 'Public Key inválida. Verifique em Integration → API Keys.';
      } else if (error?.status === 0) {
        errorMessage = 'Erro de conexão. Verifique sua internet.';
      }

      setMessage({
        type: 'error',
        text: `❌ ${errorMessage}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-0" />
      
      <Hero 
        titulo="Contato" 
        subtitulo="Vamos criar algo incrível juntos. Entre em contato para seu próximo projeto."
        image="/images/fotos/empresa_img.png"
      />

      <section className="relative z-10 py-16 px-4 bg-gradient-to-b from-gray-900 to-black min-h-screen">
        <div className="max-w-7xl mx-auto">
          
          {/* Aviso de configuração */}
          {!isEmailJSReady && (
            <div className="mb-8 p-4 bg-red-900/30 border border-red-700/50 rounded-xl">
              <p className="text-red-300 text-center">
                ⚠️ Configure o EmailJS: Edite SERVICE_ID, TEMPLATE_ID e PUBLIC_KEY no código.
              </p>
            </div>
          )}

          {/* Notificação de status */}
          {message && (
            <div className={`mb-8 p-4 rounded-xl border backdrop-blur-sm animate-fadeIn ${
              message.type === 'success' 
                ? 'bg-green-900/20 border-green-700/50 text-green-300' 
                : 'bg-red-900/20 border-red-700/50 text-red-300'
            }`}>
              <div className="flex items-center justify-center">
                <span className="mr-2">{message.type === 'success' ? '✅' : '❌'}</span>
                <p>{message.text}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Coluna Esquerda - Informações */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">
                Informações de Contato
              </h2>
              
              <div className="space-y-6">
                {/* Localização */}
                <div className="flex items-start space-x-4 p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300">
                  <div className="p-3 bg-blue-600/20 rounded-lg">
                    <MapIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Localização</h3>
                    <p className="text-white/80">Rua Cáceres, 171</p>
                    <p className="text-white/60">Cuiabá - MT</p>
                  </div>
                </div>

                {/* Telefone */}
                <div className="flex items-start space-x-4 p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300">
                  <div className="p-3 bg-green-600/20 rounded-lg">
                    <PhoneIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Telefone</h3>
                    <p className="text-white/80">(65) 98172-2991</p>
                    <p className="text-white/60">Segunda a Sexta, 9h-18h</p>
                  </div>
                </div>

                {/* E-mail */}
                <div className="flex items-start space-x-4 p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300">
                  <div className="p-3 bg-purple-600/20 rounded-lg">
                    <EmailIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">E-mail</h3>
                    <p className="text-white/80">contato@gaudiovisual.com</p>
                    <p className="text-white/60">Respondemos em 24h</p>
                  </div>
                </div>
              </div>

              {/* Horário de Atendimento */}
              <div className="mt-8 p-6 bg-white/5 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-3">Horário de Atendimento</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/70">Segunda - Sexta</span>
                    <span className="text-white">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Sábado</span>
                    <span className="text-white">9:00 - 12:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Domingo</span>
                    <span className="text-yellow-400">Fechado</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna Direita - Formulário */}
            <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-4">
                Envie uma Mensagem
              </h2>
              <p className="text-white/70 mb-8">
                Preencha o formulário abaixo. Entraremos em contato o mais rápido possível.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div>
                  <label htmlFor="nome" className="block text-white/80 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    value={formData.nome}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>

                {/* E-mail */}
                <div>
                  <label htmlFor="email" className="block text-white/80 mb-2">
                    E-mail *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                    placeholder="seu@email.com"
                  />
                </div>

                {/* Telefone */}
                <div>
                  <label htmlFor="telefone" className="block text-white/80 mb-2">
                    Telefone (opcional)
                  </label>
                  <input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    value={formData.telefone}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                    placeholder="(65) 99999-9999"
                  />
                </div>

                {/* Assunto */}
                <div>
                  <label htmlFor="assunto" className="block text-white/80 mb-2">
                    Assunto
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
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

                {/* Mensagem */}
                <div>
                  <label htmlFor="mensagem" className="block text-white/80 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    rows={5}
                    value={formData.mensagem}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all resize-none"
                    placeholder="Descreva seu projeto, ideias, orçamento e prazo..."
                  />
                  <p className="text-white/50 text-sm mt-2">
                    Quanto mais detalhes você fornecer, melhor poderemos entender suas necessidades.
                  </p>
                </div>

                {/* Botão de Envio */}
                <button
                  type="submit"
                  disabled={isLoading || !isEmailJSReady}
                  className={`w-full ${
                    isLoading || !isEmailJSReady
                      ? 'bg-yellow-800 cursor-not-allowed opacity-70' 
                      : 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 active:scale-[0.99]'
                  } text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center`}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner />
                      Enviando...
                    </>
                  ) : !isEmailJSReady ? (
                    'Configure o EmailJS primeiro'
                  ) : (
                    '📤 Enviar Mensagem'
                  )}
                </button>

                <p className="text-white/40 text-xs text-center">
                  Seus dados serão usados apenas para responder sua mensagem. Não compartilhamos informações.
                </p>
              </form>
            </div>
          </div>

          {/* Mapa e Links Úteis */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Onde Estamos
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Mapa Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-blue-900/30 to-gray-900/50 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapIcon />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Estúdio G Audiovisual</h4>
                  <p className="text-white/80 mb-2">Rua Cáceres, 171 - Centro</p>
                  <p className="text-white/60 mb-6">Cuiabá - MT, 78000-000</p>
                  <a 
                    href="https://maps.google.com/?q=Rua+Cáceres+171+Cuiabá+MT" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <MapIcon />
                    Abrir no Google Maps
                  </a>
                </div>
              </div>

              {/* Links Rápidos */}
              <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                <h4 className="text-xl font-bold text-white mb-4">Contato Rápido</h4>
                <div className="space-y-4">
                  <a 
                    href="tel:+5565981722991" 
                    className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <div className="p-2 bg-green-600/20 rounded-lg">
                      <PhoneIcon />
                    </div>
                    <div>
                      <p className="text-white font-medium">Ligar Agora</p>
                      <p className="text-white/60 text-sm">(65) 98172-2991</p>
                    </div>
                  </a>
                  
                  <a 
                    href="mailto:contato@gaudiovisual.com" 
                    className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <div className="p-2 bg-purple-600/20 rounded-lg">
                      <EmailIcon />
                    </div>
                    <div>
                      <p className="text-white font-medium">Enviar E-mail</p>
                      <p className="text-white/60 text-sm">contato@gaudiovisual.com</p>
                    </div>
                  </a>
                  
                  <div className="p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
                    <p className="text-yellow-200 text-sm">
                      💡 <strong>Dica:</strong> Para orçamentos urgentes, ligue diretamente ou 
                      mencione "URGENTE" na sua mensagem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
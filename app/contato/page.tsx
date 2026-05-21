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
} from '@heroicons/react/24/outline';
import { FaWhatsapp, FaInstagram, FaYoutube } from 'react-icons/fa6';
import Footer from '../src/component/Footer';

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
  IS_CONFIGURED: !!(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  ),
};

type FormData = {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
  telefone: string;
};

type MessageType = {
  type: 'success' | 'error' | 'warning';
  title: string;
  text: string;
  duration?: number;
};

const ASSUNTOS_OPCOES = [
  { value: '', label: 'Selecione um assunto' },
  { value: 'Orçamento para Documentário', label: 'Orçamento para Documentário' },
  { value: 'Gravação de Comercial', label: 'Gravação de Comercial' },
  { value: 'Edição de Vídeo', label: 'Edição de Vídeo' },
  { value: 'Produção Musical', label: 'Produção Musical' },
  { value: 'Transmissão Ao Vivo', label: 'Transmissão Ao Vivo' },
  { value: 'Fotografia Profissional', label: 'Fotografia Profissional' },
  { value: 'Parceria Comercial', label: 'Parceria Comercial' },
  { value: 'Outro', label: 'Outro' },
];

const HORARIOS = [
  { dia: 'Segunda — Sexta', horario: '9:00 – 18:00', open: true },
  { dia: 'Sábado', horario: '9:00 – 12:00', open: true },
  { dia: 'Domingo', horario: 'Fechado', open: false },
];

export default function ContatoPage() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
    telefone: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<MessageType | null>(null);
  const [isEmailJSLoaded, setIsEmailJSLoaded] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const whatsappLink = `https://wa.me/5565981722991?text=${encodeURIComponent('Olá! Gostaria de fazer um orçamento para um projeto audiovisual.')}`;

  useEffect(() => {
    if (!EMAILJS_CONFIG.IS_CONFIGURED) return;
    import('@emailjs/browser').then((mod) => {
      mod.default.init(EMAILJS_CONFIG.PUBLIC_KEY);
      setIsEmailJSLoaded(true);
    }).catch(() => {
      setMessage({ type: 'error', title: 'Erro', text: 'Não foi possível carregar o serviço de email.', duration: 8000 });
    });
  }, []);

  useEffect(() => {
    if (message?.duration) {
      const timer = setTimeout(() => setMessage(null), message.duration);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'mensagem') setCharCount(value.length);
    if (message?.type === 'error') setMessage(null);
  }, [message]);

  const validateForm = (): string | null => {
    if (!formData.nome.trim()) return 'Informe seu nome completo.';
    if (!formData.email.trim()) return 'Informe seu e-mail.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Informe um e-mail válido.';
    if (!formData.mensagem.trim()) return 'Escreva sua mensagem.';
    if (formData.mensagem.length < 10) return 'A mensagem deve ter pelo menos 10 caracteres.';
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) { setMessage({ type: 'error', title: 'Atenção', text: error }); return; }
    if (!isEmailJSLoaded) { setMessage({ type: 'error', title: 'Serviço indisponível', text: 'Aguarde alguns segundos e tente novamente.' }); return; }

    setIsLoading(true);
    setMessage(null);
    try {
      const emailjs = (await import('@emailjs/browser')).default;
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.nome,
          from_email: formData.email,
          telefone: formData.telefone || 'Não informado',
          assunto: formData.assunto || 'Contato do Site',
          message: formData.mensagem,
          reply_to: formData.email,
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      if (result.status === 200) {
        setMessage({ type: 'success', title: 'Mensagem enviada!', text: 'Retornaremos em até 24 horas.', duration: 6000 });
        setFormData({ nome: '', email: '', assunto: '', mensagem: '', telefone: '' });
        setCharCount(0);
      }
    } catch {
      setMessage({ type: 'error', title: 'Erro ao enviar', text: 'Verifique sua conexão e tente novamente.', duration: 8000 });
    } finally {
      setIsLoading(false);
    }
  };

  const msgStyles = {
    success: { bar: 'bg-emerald-500', icon: <CheckCircleIcon className="w-5 h-5 text-emerald-400" />, bg: 'border-emerald-800/40 bg-emerald-950/30' },
    error:   { bar: 'bg-red-500',     icon: <ExclamationCircleIcon className="w-5 h-5 text-red-400" />,     bg: 'border-red-800/40 bg-red-950/30' },
    warning: { bar: 'bg-amber-500',   icon: <ExclamationCircleIcon className="w-5 h-5 text-amber-400" />,   bg: 'border-amber-800/40 bg-amber-950/30' },
  };

  return (
    <>
      <div className="min-h-screen bg-[#080808] text-white pt-24 pb-0 relative overflow-hidden">

        {/* Background glows */}
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-40 w-96 h-96 rounded-full bg-amber-500/3 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-16">

          {/* Page header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber-500" />
              <span className="text-amber-500 text-xs uppercase tracking-[0.25em] font-semibold">Fale Conosco</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight max-w-2xl">
              Vamos Criar{' '}
              <span className="text-gradient">Juntos</span>
            </h1>
            <p className="mt-4 text-gray-400 text-lg max-w-xl leading-relaxed">
              Conte sua ideia — transformamos visões em narrativas visuais poderosas.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16">

            {/* LEFT — Info */}
            <div className="space-y-5">

              {/* Horários */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <ClockIcon className="w-5 h-5 text-amber-500" />
                  <span className="font-semibold text-sm uppercase tracking-wider text-amber-500">Horário de Atendimento</span>
                </div>
                <ul className="space-y-3">
                  {HORARIOS.map((h) => (
                    <li key={h.dia} className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{h.dia}</span>
                      <span className={h.open ? 'text-white font-medium' : 'text-gray-600'}>{h.horario}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contato direto */}
              <div className="glass rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <PhoneIcon className="w-5 h-5 text-amber-500" />
                  <span className="font-semibold text-sm uppercase tracking-wider text-amber-500">Contato Direto</span>
                </div>

                <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-emerald-800/50 transition-all group">
                  <div className="p-2.5 bg-emerald-500/15 rounded-xl group-hover:bg-emerald-500/25 transition-colors">
                    <FaWhatsapp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">WhatsApp</div>
                    <div className="text-xs text-gray-500">(65) 98172-2991</div>
                  </div>
                  <span className="ml-auto text-gray-600 group-hover:text-emerald-400 transition-colors text-sm">→</span>
                </a>

                <a href="tel:+5565981722991"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-amber-800/50 transition-all group">
                  <div className="p-2.5 bg-amber-500/15 rounded-xl group-hover:bg-amber-500/25 transition-colors">
                    <DevicePhoneMobileIcon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Ligar</div>
                    <div className="text-xs text-gray-500">(65) 98172-2991</div>
                  </div>
                  <span className="ml-auto text-gray-600 group-hover:text-amber-400 transition-colors text-sm">→</span>
                </a>

                <a href="mailto:contato@gabeaudiovisual.com.br"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-amber-800/50 transition-all group">
                  <div className="p-2.5 bg-amber-500/15 rounded-xl group-hover:bg-amber-500/25 transition-colors">
                    <EnvelopeIcon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">E-mail</div>
                    <div className="text-xs text-gray-500">contato@gabeaudiovisual.com.br</div>
                  </div>
                  <span className="ml-auto text-gray-600 group-hover:text-amber-400 transition-colors text-sm">→</span>
                </a>
              </div>

              {/* Localização */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPinIcon className="w-5 h-5 text-amber-500" />
                  <span className="font-semibold text-sm uppercase tracking-wider text-amber-500">Estúdio</span>
                </div>
                <p className="text-white font-medium text-sm">Rua Cáceres, 171 — Centro</p>
                <p className="text-gray-500 text-sm mt-1 mb-4">Cuiabá — MT</p>
                <a href="https://maps.google.com/?q=Rua+Cáceres+171+Cuiabá+MT"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors text-sm font-medium group">
                  Abrir no Google Maps
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </a>
              </div>

              {/* Redes sociais */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs text-gray-600 uppercase tracking-wider">Redes</span>
                <div className="h-px flex-1 bg-white/5" />
                {[
                  { icon: <FaInstagram size={16} />, href: 'https://instagram.com', label: 'Instagram' },
                  { icon: <FaYoutube size={16} />, href: 'https://youtube.com', label: 'YouTube' },
                  { icon: <FaWhatsapp size={16} />, href: whatsappLink, label: 'WhatsApp' },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    className="p-2.5 text-gray-500 hover:text-amber-400 rounded-xl hover:bg-white/5 transition-all">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT — Form */}
            <div className="glass rounded-2xl p-8 md:p-10">
              <div className="mb-8">
                <h2 className="text-2xl font-black tracking-tight">Envie sua Ideia</h2>
                <p className="text-gray-500 text-sm mt-1">Respondemos em até 24 horas</p>
              </div>

              {/* Feedback message */}
              {message && (
                <div className={`mb-6 rounded-xl border p-4 flex items-start gap-3 ${msgStyles[message.type].bg}`}>
                  {msgStyles[message.type].icon}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{message.title}</p>
                    <p className="text-sm text-gray-300 mt-0.5">{message.text}</p>
                  </div>
                  <button onClick={() => setMessage(null)} className="text-gray-500 hover:text-white transition-colors shrink-0">✕</button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nome + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                      Nome *
                    </label>
                    <input
                      name="nome" value={formData.nome} onChange={handleChange} required
                      placeholder="Seu nome"
                      className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/8 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                      E-mail *
                    </label>
                    <input
                      name="email" type="email" value={formData.email} onChange={handleChange} required
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/8 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all"
                    />
                  </div>
                </div>

                {/* Telefone + Assunto */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                      Telefone
                    </label>
                    <input
                      name="telefone" value={formData.telefone} onChange={handleChange}
                      placeholder="(65) 99999-9999"
                      className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/8 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                      Assunto
                    </label>
                    <div className="relative">
                      <select
                        name="assunto" value={formData.assunto} onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all appearance-none"
                        style={{ colorScheme: 'dark' }}
                      >
                        {ASSUNTOS_OPCOES.map((o) => (
                          <option key={o.value} value={o.value} className="bg-[#111]">{o.label}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-2 h-2 border-r-2 border-b-2 border-gray-500 rotate-45" />
                    </div>
                  </div>
                </div>

                {/* Mensagem */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Mensagem *</label>
                    <span className={`text-xs ${charCount > 1800 ? 'text-amber-400' : 'text-gray-600'}`}>
                      {charCount}/2000
                    </span>
                  </div>
                  <textarea
                    name="mensagem" value={formData.mensagem} onChange={handleChange}
                    required rows={6} maxLength={2000}
                    placeholder="Descreva seu projeto, ideias, orçamento disponível e prazos desejados..."
                    className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/8 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all resize-none"
                  />
                </div>

                {/* Botão */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300
                    ${isLoading
                      ? 'bg-amber-500/40 text-amber-200 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-400 text-black hover:shadow-[0_0_30px_rgba(245,166,35,0.35)] hover:scale-[1.02] active:scale-[0.99]'
                    }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-5 h-5" />
                      Enviar Proposta
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-600 pt-1">
                  Suas informações não são compartilhadas com terceiros.
                </p>
              </form>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

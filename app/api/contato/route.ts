import { NextResponse } from 'next/server';

const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_jazm38s',
  TEMPLATE_ID: 'template_gaudiovisual',
  PUBLIC_KEY: 'sua_public_key_aqui', // ⚠️ Use variável de ambiente!
};

type FormData = {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
  telefone?: string;
};

export async function POST(request: Request) {
  try {
    const formData: FormData = await request.json();

    // Validação
    if (!formData.nome?.trim() || !formData.email?.trim() || !formData.mensagem?.trim()) {
      return NextResponse.json(
        { error: 'Por favor, preencha todos os campos obrigatórios (*).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'Por favor, insira um e-mail válido.' },
        { status: 400 }
      );
    }

    const templateParams = {
      to_name: 'G Audiovisual',
      from_name: formData.nome,
      from_email: formData.email,
      telefone: formData.telefone || 'Não informado',
      assunto: formData.assunto || 'Contato do Site',
      message: formData.mensagem,
      date: new Date().toLocaleDateString('pt-BR'),
      time: new Date().toLocaleTimeString('pt-BR'),
    };

    // Enviar para EmailJS
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_CONFIG.SERVICE_ID,
        template_id: EMAILJS_CONFIG.TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY,
        template_params: templateParams,
      }),
    });

    if (response.ok) {
      return NextResponse.json({ 
        success: true, 
        message: 'Mensagem enviada com sucesso!' 
      });
    } else {
      return NextResponse.json(
        { error: 'Erro ao enviar mensagem para o serviço de email.' },
        { status: response.status }
      );
    }

  } catch (error: any) {
    console.error('❌ Erro no servidor:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar requisição.' },
      { status: 500 }
    );
  }
}

// Método GET não permitido
export async function GET() {
  return NextResponse.json(
    { error: 'Método GET não permitido' },
    { status: 405 }
  );
}
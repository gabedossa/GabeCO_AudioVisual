// app/api/contato/route.ts
import { NextResponse } from 'next/server';

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

    // Verificar se variáveis de ambiente estão configuradas
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('❌ Variáveis de ambiente do EmailJS não configuradas');
      return NextResponse.json(
        { error: 'Configuração de email não está completa.' },
        { status: 500 }
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
      reply_to: formData.email,
    };

    console.log('📤 Enviando email com:', { serviceId, templateId });

    // Enviar para EmailJS
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: templateParams,
        accessToken: publicKey,
      }),
    });

    const responseText = await response.text();
    console.log('📨 Resposta EmailJS:', response.status, responseText);

    if (response.ok) {
      return NextResponse.json({ 
        success: true, 
        message: '✅ Mensagem enviada com sucesso! Retornaremos em até 24 horas.' 
      });
    } else {
      // Tentar parsear erro
      let errorMessage = 'Erro ao enviar mensagem.';
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.error || errorMessage;
      } catch {
        errorMessage = `Erro ${response.status}: ${responseText}`;
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

  } catch (error: any) {
    console.error('❌ Erro no servidor:', error);
    return NextResponse.json(
      { error: `Erro interno: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Método GET não permitido' },
    { status: 405 }
  );
}
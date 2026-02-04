'use client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { nome, email, assunto, mensagem, telefone } = await request.json();
    
    // Aqui você pode enviar email via servidor se preferir
    // Mas como já tem EmailJS no cliente, pode deletar esta API
    
    return NextResponse.json({ 
      success: true, 
      message: 'Mensagem recebida no servidor' 
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno' },
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
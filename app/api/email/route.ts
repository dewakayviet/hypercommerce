import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, category, message } = body; // 5가지 정보 받기

    // 환경변수 확인 (디버깅용)
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("환경변수(아이디/비번)가 설정되지 않았습니다.");
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 5000, 
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `[문의] ${name}님의 새로운 상담 신청이 도착했습니다!`,
      // 메일 본문 디자인
      html: `
        <div style="padding: 20px; border: 1px solid #ccc; border-radius: 10px; font-family: Arial, sans-serif;">
          <h2 style="color: #CCFD32; background-color: #000; padding: 10px; border-radius: 5px;">🚀 새로운 비즈니스 문의</h2>
          <p><strong>성함:</strong> ${name}</p>
          <p><strong>이메일:</strong> ${email}</p>
          <p><strong>연락처:</strong> ${phone}</p>
          <p><strong>관심 분야:</strong> ${category}</p>
          <hr>
          <h3>문의 내용:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: '메일 전송 성공' }, { status: 200 });

  } catch (error: any) {
    console.error('❌ 메일 전송 실패(상세):', error);
    return NextResponse.json({ message: '메일 전송 실패', error: error.message }, { status: 500 });
  }
}
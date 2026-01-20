import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, category, message } = body;

    // 🔍 환경변수 상태를 직접 확인해서 알려주는 코드
    const debugUser = process.env.EMAIL_USER;
    const debugPass = process.env.EMAIL_PASS;

    // 하나라도 없으면 상세 내용을 범인으로 지목해서 에러 발생
    if (!debugUser || !debugPass) {
      const errorMsg = `[진단결과] 아이디: ${debugUser ? '있음(OK)' : '없음(NULL)'}, 비번: ${debugPass ? '있음(OK)' : '없음(NULL)'}`;
      console.error(errorMsg); // Vercel 로그용
      throw new Error(errorMsg); // 화면 알림용
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: debugUser,
        pass: debugPass,
      },
    });

    const mailOptions = {
      from: debugUser,
      to: debugUser,
      subject: `[문의] ${name}님의 새로운 상담 신청`,
      html: `
        <h2>🚀 새로운 비즈니스 문의</h2>
        <p><strong>성함:</strong> ${name}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>연락처:</strong> ${phone}</p>
        <p><strong>관심 분야:</strong> ${category}</p>
        <hr>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: '성공' }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
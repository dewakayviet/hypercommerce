import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ⭐ 여기가 핵심입니다! (이 줄이 없으면 환경변수를 못 읽을 때가 있습니다)
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, category, message } = body;

    // 🔍 환경변수 진단 (이제는 무조건 읽힐 겁니다!)
    const debugUser = "contact@hypercommerce.site"; 
    const debugPass = "cyajqxnvmgmyggmy"; // 아까 스샷에 있던 비번
    
    if (!debugUser || !debugPass) {
      const errorMsg = `[진단결과] 아이디: ${debugUser ? '있음' : '없음'}, 비번: ${debugPass ? '있음' : '없음'}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
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
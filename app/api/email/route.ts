import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // ⭐ 변경된 부분: 더 확실한 연결 설정
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // 보안 연결 사용
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `[Hyper Commerce] 새로운 문의가 도착했습니다!`,
      html: `
        <h2>새로운 고객 문의</h2>
        <p><strong>고객 이메일:</strong> ${email}</p>
        <p>지금 바로 연락해보세요!</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: '메일 전송 성공' }, { status: 200 });
  } catch (error: any) {
    // 에러 내용을 구체적으로 출력 (Vercel 로그에서 확인 가능)
    console.error('메일 전송 실패 상세 내용:', error);
    return NextResponse.json({ message: '메일 전송 실패', error: error.message }, { status: 500 });
  }
}
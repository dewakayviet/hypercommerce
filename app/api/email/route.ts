import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 1. 집배원 설정 (Gmail/Google Workspace 기준)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // 내 이메일 (contact@...)
        pass: process.env.EMAIL_PASS, // 앱 비밀번호 (보안상 따로 관리)
      },
    });

    // 2. 편지 내용 작성
    const mailOptions = {
      from: process.env.EMAIL_USER,    // 보내는 사람 (나)
      to: process.env.EMAIL_USER,      // 받는 사람 (나 - 내 메일함으로 받기)
      subject: `[Hyper Commerce] 새로운 문의가 도착했습니다!`,
      html: `
        <h2>새로운 고객 문의</h2>
        <p><strong>고객 이메일:</strong> ${email}</p>
        <p>빠르게 연락해서 계약을 성사시키세요!</p>
      `,
    };

    // 3. 발송!
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: '메일 전송 성공' }, { status: 200 });
  } catch (error) {
    console.error('메일 전송 실패:', error);
    return NextResponse.json({ message: '메일 전송 실패' }, { status: 500 });
  }
}
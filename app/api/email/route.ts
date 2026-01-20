import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Vercel에서 변수를 확실하게 읽어오도록 설정
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, category, message } = body;

    // 환경변수 가져오기 (GMAIL_...)
    const myId = process.env.GMAIL_USER;
    const myPass = process.env.GMAIL_PASS;

    // 만약 변수가 없으면 조용히 서버 에러 처리 (보안상 상세 내용은 숨김)
    if (!myId || !myPass) {
      console.error("환경변수 설정 누락됨");
      return NextResponse.json({ error: '서버 설정 오류입니다. 관리자에게 문의하세요.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: myId,
        pass: myPass,
      },
    });

    const mailOptions = {
      from: myId,
      to: myId, // 사장님 이메일로 받기
      replyTo: email, // 답장 누르면 고객 이메일로 바로 가도록 설정
      subject: `[문의] ${name}님의 새로운 비즈니스 상담 신청`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #CCFD32; padding: 20px; text-align: center;">
            <h2 style="color: #000; margin: 0;">🚀 새로운 상담 신청 도착!</h2>
          </div>
          <div style="padding: 30px; background-color: #fff;">
            <p style="font-size: 14px; color: #666;">웹사이트에서 새로운 문의가 접수되었습니다.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            
            <p><strong>👤 성함:</strong> ${name}</p>
            <p><strong>📞 연락처:</strong> ${phone}</p>
            <p><strong>📧 이메일:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>🏷️ 관심 분야:</strong> <span style="background-color: #f0f0f0; padding: 2px 6px; border-radius: 4px;">${category}</span></p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <strong>📝 문의 내용:</strong><br/>
              <p style="white-space: pre-wrap; margin-top: 10px; color: #333;">${message}</p>
            </div>
          </div>
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #888;">
            Sent from Hyper Commerce Website
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: '성공' }, { status: 200 });

  } catch (error: any) {
    console.error('메일 전송 실패:', error);
    return NextResponse.json({ error: '메일 전송 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
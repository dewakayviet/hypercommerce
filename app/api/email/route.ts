import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ⭐ 이 줄은 꼭 유지해주세요! (서버가 변수를 매번 새로 읽게 함)
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, category, message } = body;

    // ⭐ [수정] 새로운 환경변수 이름으로 교체! (GMAIL_USER, GMAIL_PASS)
    const myId = process.env.GMAIL_USER;
    const myPass = process.env.GMAIL_PASS;

    // 환경변수 확인 (디버깅용 - 배포 후 잘 되면 나중에 지워도 됨)
    if (!myId || !myPass) {
      console.error(`[오류] 아이디(${myId ? '있음' : '없음'}), 비번(${myPass ? '있음' : '없음'})`);
      throw new Error("Vercel에서 환경변수를 못 가져오고 있습니다.");
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: myId,   // 바뀐 변수 사용
        pass: myPass, // 바뀐 변수 사용
      },
    });

    const mailOptions = {
      from: myId,
      to: myId,
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
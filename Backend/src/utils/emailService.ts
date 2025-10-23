import nodemailer from 'nodemailer'
import { env } from '~/configs/environment'

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS
  }
})

export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
  const verificationUrl = `${env.CLIENT_URL}/verify-email?email=${email}&token=${token}`

  const mailOptions = {
    from: `"Diabetes Prediction System" <${env.EMAIL_USER}>`,
    to: email,
    subject: 'Xác thực tài khoản - Hệ thống dự đoán bệnh tiểu đường',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5aa0;">Chào mừng bạn đến với Hệ thống dự đoán bệnh tiểu đường!</h2>
        <p>Cảm ơn bạn đã đăng ký tài khoản. Để hoàn tất quá trình đăng ký, vui lòng click vào liên kết bên dưới để xác thực email của bạn:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #2c5aa0; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Xác thực Email
          </a>
        </div>
        
        <p>Hoặc bạn có thể copy và paste liên kết sau vào trình duyệt:</p>
        <p style="word-break: break-all; background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
          ${verificationUrl}
        </p>
        
        <p><strong>Lưu ý:</strong> Liên kết này sẽ hết hạn sau 24 giờ.</p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #666; font-size: 14px;">
          Nếu bạn không đăng ký tài khoản này, vui lòng bỏ qua email này.
        </p>
      </div>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`📧 Email xác thực đã được gửi đến: ${email}`)
  } catch (error) {
    console.error('❌ Lỗi gửi email:', error)
    throw new Error('Không thể gửi email xác thực')
  }
}
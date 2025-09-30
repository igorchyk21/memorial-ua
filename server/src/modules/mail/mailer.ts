import nodemailer from 'nodemailer';
import conf from '../../config/conf.js';

/**
 * Тип для об'єкта з полями, які підставляються в шаблон
 */
type MailData = Record<string, string>;

/**
 * Тип для аргументів SendMail
 */
interface SendMailOptions {
  to: string;
  subject: string;
  templateHTML: string;
  mailData: MailData; 
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: conf.GoogleEmail,
    pass: conf.GoogleApppass,
  }
});

/**
 * Функція для відправки листа
 */
const SendMail = async ({
  to,
  subject,
  templateHTML,
  mailData
}: SendMailOptions): Promise<boolean> => {

  let HTML:string = templateHTML || '';

  for (const field in mailData) {
    if (Object.prototype.hasOwnProperty.call(mailData, field)) {
     HTML = HTML.replaceAll(`{${field}}`, mailData[field]);
    }
  }

  const mailOptions = {
    from: conf.GoogleEmail,
    to,
    subject,
    html: HTML
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (e) {
    console.error(e);
    console.log(HTML);
    return false;
  }
};

export {
  SendMail
};

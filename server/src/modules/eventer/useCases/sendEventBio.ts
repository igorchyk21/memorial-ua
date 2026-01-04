import { HeroBiographyItem } from "@global/types";
import t from "../../../messages/ua/common.json" assert { type: "json" };
import fs from "fs";
import path from "path";
import { SendMail } from "../../mail/mailer.js";

export const sendEventBio = async (event: HeroBiographyItem) => {
  let HTML: string | null = null;
  try {
    const templatePath = path.join(
      process.cwd(),
      "eTemplates",
      "heroEvent.html" 
    );
 
    if (fs.existsSync(templatePath))
      HTML = fs.readFileSync(templatePath).toString();
 
    if (!HTML) return false;

    if (!event.userEmail) return false;

    SendMail({  
      to: event.userEmail,
      subject: event.heroNameShort + ' - ' + event.title,
      templateHTML: HTML,
      mailData:{ ...event, year: new Date().getFullYear() },
    });
  } catch (e) {
    console.error(e); 
    return false;
  }
};
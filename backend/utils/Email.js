const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");
const generateTemplate = require("./generateTemplate");

module.exports = class Email {
  constructor(userEmail, subject, data = {}) {
    this.to = userEmail;
    this.from = `SkillSwap <${process.env.USER_EMAIL}>`;
    this.subject = subject;
    this.data = data; // { message, link, logo, banner, btnTitle }
  }

  newTransport() {
    if (process.env.NODE_ENV.trim() === "production") {
      return nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
  }

  async sendEmail() {
    const html = generateTemplate({
      title: this.subject,
      message: this.data.message || "",
      link: this.data.link || "",
      logo: this.data.logo || "",
      banner: this.data.banner || "",
      btnTitle: this.data.btnTitle || "View Details",
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: this.subject,
      html,
      text: htmlToText.htmlToText(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendSwapRequestCreated() {
    await this.sendEmail();
  }

  async sendSwapRequestAccepted() {
    await this.sendEmail();
  }

  async sendSwapRequestRejected() {
    await this.sendEmail();
  }
};

import { renderAsync } from "@react-email/render";
import { Resend } from "resend";
import { WelcomeEmail } from "./emails/templates/welcome";

export class EmailService {
  private resend: Resend;
  private from: string;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
    this.from = "oiwaii@resend.dev";
  }
  async sendWelcome(eventName: string, inviterName: string) {
    try {
      const html = await renderAsync(
        WelcomeEmail({
          eventName,
          inviterName,
          eventDate: new Date().toISOString(),
          eventLocation: "Tokyo",
        }),
      );
      return await this.resend.emails.send({
        from: this.from,
        to: "bentoki.1213@gmail.com",
        subject: `${inviterName} accept your invitation`,
        html,
      });
    } catch (error) {
      console.error("Failed to send invitation email:", error);
      throw error;
    }
  }

  async sendEventReminder(to: string, eventName: string, eventDate: Date) {
    // implement event reminder
  }
}

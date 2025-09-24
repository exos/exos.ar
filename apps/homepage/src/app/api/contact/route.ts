import { NextRequest, NextResponse } from "next/server";
import { Telegraf } from "telegraf";

import { ContactInfo } from "@/types/contactInfo";

const API_KEY = process.env.TELEGRAM_BOT_API;

const getTelegramBot = (() => {
  let instance: Telegraf | null = null;

  return () => {
    if (typeof API_KEY !== "string") {
      throw new Error("Telegram API key is not defined");
    }

    if (!instance) {
      instance = new Telegraf(API_KEY);
      instance.launch();
    }

    return instance;
  };
})();

export async function GET() {
  return NextResponse.json<ContactInfo>({
    email: process.env.CONTACT_EMAIL || "",
    phone: process.env.CONTACT_PHONE || "",
  });
}

export async function POST(request: NextRequest) {
  const { from, message } = await request.json();

  if (typeof message !== "string" || message.trim() === "") {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  if (typeof from !== "string" || from.trim() === "") {
    return NextResponse.json({ error: "From is required" }, { status: 400 });
  }

  const escapeText = (text: string) => text.trim().replace(/`/g, "\\`");

  const fullMessage = `From: \`${escapeText(from)}\`\n\nMessage:\n \`\`\`${escapeText(message)}\`\`\`\n`;

  try {
    const bot = getTelegramBot();
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (typeof chatId !== "string") {
      throw new Error("Telegram chat ID is not defined");
    }

    await bot.telegram.sendMessage(parseInt(chatId), fullMessage, {
      parse_mode: "MarkdownV2",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}

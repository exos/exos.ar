import Link from "next/link";
import { Github, Linkedin, Send, Link as LucideLink } from "lucide-react";

export function SocialButtons() {
  return (
    <section className="mt-10 rounded-xl border border-green-500/20 bg-green-500/5 p-6">
      <h2 className="text-lg font-semibold text-green-500">Social Media</h2>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <a
          href="https://t.me/exoslpm"
          className="rounded-md border border-green-500/10 bg-green-500/10 px-3 py-1.5 hover:border-green-300 hover:text-green-300"
        >
          <Send className="mr-1 inline h-4 w-4" />
          Telegram
        </a>
        <a
          href="https://github.com/exos"
          className="rounded-md border border-green-500/10 bg-green-500/10 px-3 py-1.5 hover:border-green-300 hover:text-green-300"
        >
          <Github className="mr-1 inline h-4 w-4" />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/ogexos/"
          className="rounded-md border border-green-500/10 bg-green-500/10 px-3 py-1.5 hover:border-green-300 hover:text-green-300"
        >
          <Linkedin className="mr-1 inline h-4 w-4" />
          LinkedIn
        </a>
        <Link
          href="/"
          className="rounded-md border border-green-500/10 bg-green-500/10 px-3 py-1.5 hover:border-green-300 hover:text-green-300"
        >
          <LucideLink className="mr-1 inline h-4 w-4" />
          Personal website
        </Link>
      </div>
    </section>
  );
}


import Link from 'next/link'

export function SocialButtons() {
    return (
        <section className="mt-10 rounded-xl border border-green-500/20 bg-green-500/5 p-6">
            <h2 className="text-lg font-semibold text-green-500">Social media</h2>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <a
                    href="https://t.me/exoslpm"
                    className="rounded-md border border-green-500/10 bg-green-500/10 px-3 py-1.5 hover:border-green-300 hover:text-green-300"
                >
                    Telegram
                </a>
                <a
                    href="https://github.com/exos"
                    className="rounded-md border border-green-500/10 bg-green-500/10 px-3 py-1.5 hover:border-green-300 hover:text-green-300"
                >
                    GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/ogexos/"
                    className="rounded-md border border-green-500/10 bg-green-500/10 px-3 py-1.5 hover:border-green-300 hover:text-green-300"
                >
                    LinkedIn
                </a>
                <Link
                    href="/"
                    className="rounded-md border border-green-500/10 bg-green-500/10 px-3 py-1.5 hover:border-green-300 hover:text-green-300"
                >
                    Personal web page 
                </Link>
            </div>
        </section>
    );
}

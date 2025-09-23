
import { ContactForm } from "@/components/contactform";
import { DownloadButtons } from "@/components/downloadbuttons";
import { ExosHeader } from "@/components/header";
import { SocialButtons } from "@/components/socialbuttons";

export default function ContactPage() {

    return (
        <main className="min-h-screen bg-black text-green-500">
            <div className="mx-auto max-w-5xl px-6 py-12">
                <ExosHeader section='contact' />

                {/* Intro / Hero */}
                <section className="mt-10 rounded-xl border border-green-500/20 bg-green-500/5 p-6">
                    <SocialButtons />
                    <DownloadButtons />


                    <ContactForm />
                </section>


             </div>
        </main>
    );
}

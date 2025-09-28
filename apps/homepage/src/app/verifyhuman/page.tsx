"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Captcha from "@/components/captcha";
import { RoundLogo } from "@/components/roundlogo";

interface VerifyHumanPageProps {
  goto?: string;
}

export default function VerifyHumanPage(props: VerifyHumanPageProps) {
  const { goto = "" } = props;
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleCaptchaChange = (ev: Event) => {
    if (!("detail" in ev)) {
      return;
    }

    const { state, payload } = ev.detail as { state: string; payload: string };
    if (state === "verified") {
      setCaptchaToken(payload);
    }
  };

  useEffect(() => {
    let url: URL;

    if (!captchaToken) {
      return;
    }

    switch (goto) {
      case "vcard":
        url = new URL("/downloads/exos.vcard", window.location.href);
        break;
      default:
        url = new URL("/", window.location.href);
    }

    url.searchParams.set("captcha_token", captchaToken);

    window.open(url.toString());
  }, [captchaToken]);

  return (
    <main className="min-h-screen bg-black text-green-500 flex flex-col items-center mx-auto max-w-5xl px-6 py-12">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center space-x-4">
          <RoundLogo />
          <div>
            <strong className="block text-lg font-semibold">
              Oscar J. Gentilezza
            </strong>
            <span className="text-gray-600">Backend Developer / Architect</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <section className="mt-10 rounded-xl border border-green-500/20 bg-green-500/5 p-6 text-center">
          <h2 className="text-2xl font-semibold text-green-500">
            Can a robot dream?
          </h2>
          <Image
            src="/robot.png"
            className="my-4"
            alt="Robot illustration"
            width={225}
            height={225}
          />
          <Captcha onStateChange={handleCaptchaChange} />
        </section>
        {captchaToken && (
          <Link
            href="/"
            className="block w-full rounded-md border border-green-500/10 bg-green-500/10 px-3 py-1.5 hover:border-green-300 hover:text-green-300 text-center pt-4"
          >
            Go to home
          </Link>
        )}
      </div>
    </main>
  );
}

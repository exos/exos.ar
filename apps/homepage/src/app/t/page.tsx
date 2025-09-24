"use client";

import { useState, useEffect, useCallback } from "react";
import type { ContactInfo } from "@/types/contactInfo";
import { SocialButtons } from "@/components/socialbuttons";
import { DownloadButtons } from "@/components/downloadbuttons";
import Altcha from "@/components/captcha";
import { RoundLogo } from "@/components/roundlogo";

enum ContactStatus {
  notload,
  loading,
  loaded,
  captchaRequired,
  failed,
}

interface ContactButtonProperties {
  data: ContactInfo;
}

function ContactInfo(props: ContactButtonProperties) {
  const { email, phone } = props.data;

  function copyClipboard(data: string) {
    navigator.clipboard.writeText(data);
  }

  return (
    <div className="mt-4 flex flex-wrap gap-3 text-sm">
      <div className="rounded-xl shadow-md">
        <div className="flex items-center space-x-3">
          <span className="font-semibold">Email:</span>
          <span>oscar@gentisoft.com</span>
          <a
            className="rounded-md border border-green-500/10 bg-green-500/10 px-3 py-1.5 hover:border-green-300 hover:text-green-300 cursor-pointer"
            onClick={() => copyClipboard(email)}
          >
            Copy
          </a>
          <a
            href={`mailto:${email}`}
            className="rounded-md border border-green-500/10 bg-green-500/10 px-3 py-1.5 hover:border-green-300 hover:text-green-300"
          >
            Send email
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <span className="font-semibold">Phone:</span>
          <span>{phone}</span>
          <a
            className="rounded-md border border-green-500/10 bg-green-500/10 px-3 py-1.5 hover:border-green-300 hover:text-green-300 cursor-pointer"
            onClick={() => copyClipboard(phone)}
          >
            Copy
          </a>
          <a
            href={`tel:+${phone.replace(/[^0-9]/g, "")}`}
            className="rounded-md border border-green-500/10 bg-green-500/10 px-3 py-1.5 hover:border-green-300 hover:text-green-300"
          >
            Call
          </a>
        </div>
      </div>
    </div>
  );
}

export default function TPage() {
  const [contactStatus, setContactStatus] = useState<ContactStatus>(
    ContactStatus.notload,
  );
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const fetchContactInfo = useCallback(async () => {
    setContactStatus(ContactStatus.loading);

    try {
      console.log("Fetching contact info...");
      const response = await fetch("/api/contact", {
        headers: {
          ...(captchaToken ? { "x-captcha-token": captchaToken } : {}),
        },
      });
      if (response.ok) {
        const data: ContactInfo = await response.json();
        console.log("Contact info fetched:", data);
        setContactStatus(ContactStatus.loaded);
        setContactInfo(data);
      } else {
        console.error(
          "Failed to fetch contact info:",
          response.statusText,
          response.status,
        );

        if (response.status === 400) {
          const data = await response.json();
          console.log("data", data);
          if (
            typeof data.error === "string" &&
            data.error === "Captcha is required"
          ) {
            console.log("Captcha is required");
            setContactStatus(ContactStatus.captchaRequired);
            return;
          }
        }

        setContactStatus(ContactStatus.failed);
      }
    } catch (error) {
      console.error("Error fetching contact info:", error);
      setContactStatus(ContactStatus.failed);
    }
  }, [captchaToken]);

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
    fetchContactInfo();
  }, [fetchContactInfo]);

  return (
    <main className="min-h-screen bg-black text-green-500 items-center mx-auto max-w-5xl px-6 py-12">
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
        <section className="mt-10 rounded-xl border border-green-500/20 bg-green-500/5 p-6">
          <h2 className="text-lg font-semibold text-green-500">Contact</h2>

          {(contactStatus === ContactStatus.loading ||
            contactStatus === ContactStatus.notload) && (
            <div className="flex items-center justify-center animate-pulse">
              <div className="text-center">
                <svg
                  className="mr-3 size-5 animate-spin ..."
                  viewBox="0 0 24 24"
                ></svg>
                <span className="text-lg font-medium">Loading...</span>
              </div>
            </div>
          )}

          {contactStatus === ContactStatus.loaded && (
            <ContactInfo data={contactInfo as ContactInfo} />
          )}

          {contactStatus === ContactStatus.failed && (
            <div className="mx-auto max-w-5xl px-6 py-12 bg-red-100 rounded-md">
              <span className="block text-red-700 mb-2">
                Sorry, we have a problem here
              </span>
              <a
                onClick={() => fetchContactInfo()}
                className="inline-block rounded-md border border-green-500 bg-green-500 text-white px-4 py-2 hover:bg-green-600 hover:border-green-600"
              >
                Retry
              </a>
            </div>
          )}

          {contactStatus === ContactStatus.captchaRequired && (
            <Altcha onStateChange={handleCaptchaChange} />
          )}
        </section>

        {/* Social */}
        <SocialButtons />

        {/* Download */}
        <DownloadButtons />
      </div>
    </main>
  );
}

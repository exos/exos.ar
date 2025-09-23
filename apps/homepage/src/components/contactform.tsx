'use client';

import {
    useState,
    useRef,
    type RefObject,
} from 'react';
import Captcha from './captcha';

enum SendingStatus {
    none,
    sending,
    success,
    failed,
    captchaRequired,
};

export function ContactForm () {
    const [status, setStatus] = useState<SendingStatus>(SendingStatus.none);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const from: RefObject<HTMLInputElement | null> | null = useRef(null); 
    const message: RefObject<HTMLTextAreaElement | null> | null =  useRef(null);

    async function handleSubmit(event?: React.FormEvent) {
        if (event) {
            event.preventDefault();
        }

        console.log('Sending message...');

        if (status !== SendingStatus.none) {
            return;
        }

        setStatus(SendingStatus.sending);

        if (!from?.current || !message?.current) {
            setStatus(SendingStatus.failed);
            return;
        }

        const vfrom = from.current.value.trim();
        const vmessage = message.current.value.trim();

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...((captchaToken) ? { 'x-captcha-token': captchaToken } : {}),
                },
                body: JSON.stringify({
                    from: vfrom,
                    message: vmessage,
                }),
            });

            if (!response.ok) {

                if (response.status === 400) {
                    const res = await response.json();

                    if (res?.error === 'Captcha is required') {
                        setStatus(SendingStatus.captchaRequired);
                        return;
                    }
                }

                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            setStatus(SendingStatus.success);

            from.current.value = '';
            message.current.value = '';

        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus(SendingStatus.failed);
        }
    }

    const handleRetry = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setStatus(SendingStatus.none);
    }

    const handleCaptchaStatusChange = (event: Event) => {

        if (!('detail' in event)) {
            return;
        }

        const detail = (event as CustomEvent).detail;
        console.log('Captcha status changed:', detail);
        
        if (detail?.state === 'verified' && typeof detail.payload === 'string') {
            setCaptchaToken(detail.payload);
            setStatus(SendingStatus.none);
        }

    }

    return (
        <section className="mt-10 rounded-xl border border-green-500/20 bg-green-500/5 p-6">
            <h1 className="text-green-700 font-bold text-xl mb-4">Send me a message</h1>

            {(status === SendingStatus.success) && (
                <div className="mb-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded">
                    Your message has been sent successfully!
                    <a 
                        href='#'
                        onClick={handleRetry}
                        className="rounded-md border border-green-500/10 bg-green-500/10 px-3 py-1.5 hover:border-green-300 hover:text-green-300"
                    >
                        Send another message
                    </a>
                </div>
            )}

            {(status === SendingStatus.captchaRequired) && (
                <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded">
                    Are you human?
                </div>
            )}

            {(status === SendingStatus.failed) && (
                <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded">
                    There was an error sending your message. 
                    <a 
                        href='#'
                        onClick={handleRetry}
                        className="rounded-md border border-green-500/10 bg-green-500/10 px-3 py-1.5 hover:border-red-300 hover:text-red-300"
                    >
                        Try again
                    </a>
                </div>
            )}

            {(status !== SendingStatus.success) && (
                <form 
                    className="w-full mx-auto p-4 shadow-md rounded"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label htmlFor="from" className="block text-green-700 font-bold mb-2">From:</label>
                        <input
                            type="text"
                            name="from"
                            ref={from}
                            placeholder="Your email or name"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={status === SendingStatus.sending}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-green-700 font-bold mb-2">Message:</label>
                        <textarea
                            name="message"
                            ref={message}
                            placeholder="Your message"
                            rows={4}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={status === SendingStatus.sending}
                        />
                    </div>
                    {(status !== SendingStatus.failed && status !== SendingStatus.captchaRequired) && (
                        <button 
                            type="submit"
                            className={
                                'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500' +
                                    (status === SendingStatus.sending ? ' opacity-50 cursor-not-allowed' : '')
                            }
                        >
                            {status === SendingStatus.sending ? 'Sending' : 'Send Message'}
                            {status === SendingStatus.sending && (
                                <span className="animate-ping rounded-full opacity-75">...</span>
                            ) }
                        </button>
                    )}
                    {(status === SendingStatus.captchaRequired) && (
                        <Captcha 
                            onStateChange={handleCaptchaStatusChange}
                        />
                    )}
                </form>
            )}
        </section>
    );
}

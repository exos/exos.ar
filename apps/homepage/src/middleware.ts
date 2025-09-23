
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { verifyServerSignature } from 'altcha-lib';

const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET;

if (typeof CAPTCHA_SECRET !== 'string') {
    throw new Error('Captcha secret is not defined');
}

const CaptchaRequiredResone = () => {
    return NextResponse.json({
        error: 'Captcha is required'
    }, { status: 400 });
}

async function verifyCaptcha(request: NextRequest, response: NextResponse) : Promise<boolean> {
    let token: string | null;
    let fromCookie: boolean = false;

    token = request.headers.get('x-captcha-token');

    // Try to get from query string
    if (!token) {
        token = request.nextUrl.searchParams.get('captcha_token');
    }

    if (!token) {
        token = request.cookies.get('_captcha_token')?.value ?? null;
        if (token) fromCookie = true;
    }

    console.log('Check captcha with ', token);

    if (typeof token !== 'string') {
        return false;
    }

    const { verified } = await verifyServerSignature(token, CAPTCHA_SECRET!);

    if (!verified) {
        return false;
    }

    if (!fromCookie) {
        // Set cookie for future requests
        const secure = process.env.NODE_ENV === 'production';
        response.cookies.set('_captcha_token', token, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure,
        });
    }

    return true;

}

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const response = NextResponse.next();

    if (url.pathname.startsWith('/api/contact')) {
        if (!await verifyCaptcha(request, response)) {
            return CaptchaRequiredResone();
        }
    }

    if (url.pathname.startsWith('/downloads/exos.vcard')) {
        if (!await verifyCaptcha(request, response)) {
            const url = new URL('/verifyhuman', request.url);
            url.search = 'goto=vcard';
            return NextResponse.redirect(url);
        }
    }
        

    return response;
}

export const config = {
    matcher: [
        '/api/(.*)',
        '/downloads/exos.vcard'
    ],
};

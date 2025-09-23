'use client'

import 'altcha'
import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react'

const CAPTCHA_URI = process.env.NEXT_PUBLIC_CAPTCHA_URI;

console.log('CAPTCHA_URI', CAPTCHA_URI);

interface AltchaProps {
    onStateChange?: (ev: Event | CustomEvent) => void
}

const Altcha = forwardRef<{ value: string | null }, AltchaProps>(({ onStateChange }, ref) => {
    const widgetRef = useRef<AltchaWidget & AltchaWidgetMethods & HTMLElement>(null)
    const [value, setValue] = useState<string | null>(null)

    useImperativeHandle(ref, () => {
        return {
            get value() {
                return value
            }
        }
    }, [value])

    useEffect(() => {
        const handleStateChange = (ev: Event | CustomEvent) => {
            if ('detail' in ev) {
                setValue(ev.detail.payload || null)
                onStateChange?.(ev)
            }
        }

        const { current } = widgetRef

        if (current) {
            current.addEventListener('statechange', handleStateChange)
            return () => current.removeEventListener('statechange', handleStateChange)
        }
    }, [onStateChange])

    /* Configure your `challengeurl` and remove the `test` attribute, see docs: https://altcha.org/docs/v2/widget-integration/  */
    return (
        <altcha-widget
            ref={widgetRef}
            challengeurl={CAPTCHA_URI}
            style={{
                '--altcha-max-width': '100%',
            }}
            debug
        ></altcha-widget>
    )
})

export default Altcha

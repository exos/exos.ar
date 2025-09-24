"use client";

import {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";

const CAPTCHA_URI = process.env.NEXT_PUBLIC_CAPTCHA_URI;

// hacks for next
import {
  type DOMAttributes,
  type DetailedHTMLProps,
  type HTMLAttributes,
  type CSSProperties,
} from "react";

export interface Strings {
  error: string;
  expired: string;
  footer: string;
  label: string;
  verified: string;
  verifying: string;
  waitAlert: string;
}

export interface Challenge {
  algorithm: string;
  challenge: string;
  maxnumber?: number;
  salt: string;
  signature: string;
}

export interface Configure {
  auto?: "onfocus" | "onload" | "onsubmit";
  challenge?: Challenge;
  challengeurl?: string;
  debug?: boolean;
  expire?: number;
  autorenew?: boolean;
  hidefooter?: boolean;
  hidelogo?: boolean;
  maxnumber?: number;
  mockerror?: boolean;
  name?: string;
  refetchonexpire?: boolean;
  spamfilter?: boolean;
  strings?: Partial<Strings>;
  test?: boolean | number;
  verifyurl?: string;
  workers?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

// React 19 typings: augment React.JSX instead of global JSX
// to recognize the custom element <altcha-widget />
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // Be permissive: allow standard HTML attributes + any custom props
      ["altcha-widget"]: DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        CustomElement<Configure> & {
          style?: CSSProperties & Record<string, string | number>;
          [key: string]: unknown;
        };
    }
  }
}

interface AltchaProps {
  onStateChange?: (ev: Event | CustomEvent) => void;
}

const Altcha = forwardRef<{ value: string | null }, AltchaProps>(
  ({ onStateChange }, ref) => {
    const widgetRef = useRef<HTMLElement>(null);
    const [value, setValue] = useState<string | null>(null);

    useImperativeHandle(ref, () => {
      return {
        get value() {
          return value;
        },
      };
    }, [value]);

    useEffect(() => {
      const handleStateChange = (ev: Event | CustomEvent) => {
        if ("detail" in ev) {
          setValue(ev.detail.payload || null);
          onStateChange?.(ev);
        }
      };

      const { current } = widgetRef;

      if (current) {
        current.addEventListener("statechange", handleStateChange);
        return () =>
          current.removeEventListener("statechange", handleStateChange);
      }
    }, [onStateChange]);

    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/altcha/dist/altcha.min.js";
      script.async = true;
      script.defer = true;
      script.type = "module";
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }, []);

    /* Configure your `challengeurl` and remove the `test` attribute, see docs: https://altcha.org/docs/v2/widget-integration/  */

    return (
      <altcha-widget
        ref={widgetRef}
        challengeurl={CAPTCHA_URI}
        style={{
          "--altcha-max-width": "100%",
        }}
        debug
      />
    );
  },
);

Altcha.displayName = "Altcha";

export default Altcha;

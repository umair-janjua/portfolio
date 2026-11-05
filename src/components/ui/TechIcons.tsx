import React from "react";

export function TechIcon({
  name,
  className = "h-4 w-4",
}: {
  name: string;
  className?: string;
}) {
  const key = name.toLowerCase();

  // Flutter official geometric mark
  if (key.includes("flutter")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M14.314 2L3.5 12.814L6.843 16.157L21 2H14.314Z" fill="#47C5FB" />
        <path d="M14.238 11.962L8.462 17.738L11.82 21.096L15.157 17.759L21 11.962H14.238Z" fill="#47C5FB" />
        <path d="M11.82 21.096L14.365 22H21L15.157 17.759L11.82 21.096Z" fill="#00569E" />
        <path d="M8.462 17.738L11.805 14.395L15.157 17.759L11.82 21.096L8.462 17.738Z" fill="#00B5F8" />
      </svg>
    );
  }

  // Dart official mark
  if (key.includes("dart")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M4.9 4.9L2 10.7L10.8 19.5L19.5 19.5L19.5 10.8L10.7 2L4.9 4.9Z" fill="#01579B" />
        <path d="M4.9 4.9L10.7 2L21.5 12.8V19.5H14.8L4.9 9.6V4.9Z" fill="#40C4FF" />
        <path d="M4.9 9.6L14.8 19.5H19.5V14.8L9.6 4.9H4.9V9.6Z" fill="#00C4B3" opacity="0.88" />
      </svg>
    );
  }

  // Kotlin official mark
  if (key.includes("kotlin")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="ktGrad" x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E44857" />
            <stop offset="0.5" stopColor="#C711E1" />
            <stop offset="1" stopColor="#7F52FF" />
          </linearGradient>
        </defs>
        <path d="M21 21H3V3H21L12 12L21 21Z" fill="url(#ktGrad)" />
      </svg>
    );
  }

  // JavaScript (check before Java!)
  if (key.includes("javascript")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="3.5" fill="#F7DF1E" />
        <path
          d="M11.1 17.2C11.1 18.7 10.2 19.4 8.7 19.4C7.4 19.4 6.6 18.7 6.2 17.9L7.6 17C7.9 17.5 8.2 17.9 8.7 17.9C9.3 17.9 9.6 17.6 9.6 16.9V11.2H11.1V17.2ZM16.6 19.4C15 19.4 14 18.6 13.5 17.6L14.9 16.8C15.3 17.5 15.8 17.9 16.6 17.9C17.4 17.9 17.9 17.5 17.9 17C17.9 16.4 17.4 16.1 16.4 15.7L15.9 15.5C14.5 14.9 13.7 14.1 13.7 12.8C13.7 11.4 14.8 10.4 16.4 10.4C17.6 10.4 18.5 10.8 19.1 11.9L17.7 12.8C17.4 12.2 17 11.9 16.4 11.9C15.8 11.9 15.4 12.3 15.4 12.8C15.4 13.3 15.8 13.6 16.7 14L17.2 14.2C18.8 14.9 19.6 15.7 19.6 17C19.6 18.6 18.3 19.4 16.6 19.4Z"
          fill="#111827"
        />
      </svg>
    );
  }

  // Java
  if (key.includes("java")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path
          d="M9.5 16.5C9.5 16.5 8 17.3 10.6 17.6C13.6 17.9 15.2 17.3 16.5 16.7M8.5 13.8C8.5 13.8 7.2 14.6 10.2 14.9C13.2 15.2 15.6 14.8 17 14.1"
          stroke="#5382A1"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M17.5 13.5C19 13.5 19.8 14.4 19.8 15.3C19.8 16.3 18.8 17.1 17.3 17.1M6 19.8C9.8 20.9 15.6 20.7 18.8 19.5"
          stroke="#5382A1"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M13.5 3C14.8 5.2 11.2 6.8 11.8 9.2C12.2 10.8 13.8 11.6 13.8 11.6M10.2 5.5C8.8 7.2 10.4 8.8 9.8 11"
          stroke="#F89820"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // React / React Native
  if (key.includes("react")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" strokeWidth="1.4" />
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="3.8"
          transform="rotate(60 12 12)"
          stroke="#61DAFB"
          strokeWidth="1.4"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="3.8"
          transform="rotate(120 12 12)"
          stroke="#61DAFB"
          strokeWidth="1.4"
        />
      </svg>
    );
  }

  // TypeScript
  if (key.includes("typescript")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="3.5" fill="#3178C6" />
        <path
          d="M13.1 12.1H10.5V19H8.8V12.1H6.2V10.7H13.1V12.1ZM16.8 19.2C15.4 19.2 14.3 18.6 13.7 17.7L14.9 16.8C15.4 17.4 16 17.8 16.8 17.8C17.6 17.8 18.1 17.4 18.1 16.9C18.1 16.3 17.6 16.1 16.6 15.7L16.1 15.5C14.7 14.9 13.9 14.2 13.9 12.9C13.9 11.5 15 10.5 16.7 10.5C17.9 10.5 18.8 10.9 19.4 11.8L18.2 12.7C17.8 12.1 17.3 11.9 16.7 11.9C16 11.9 15.6 12.3 15.6 12.8C15.6 13.3 16 13.6 17 14L17.5 14.2C19.1 14.8 19.8 15.6 19.8 16.9C19.8 18.4 18.5 19.2 16.8 19.2Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // SQL / SQLite
  if (key.includes("sql")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <ellipse cx="12" cy="5.5" rx="7.5" ry="3" fill="#38BDF8" fillOpacity="0.25" stroke="#38BDF8" strokeWidth="1.6" />
        <path d="M4.5 5.5V12C4.5 13.66 7.86 15 12 15C16.14 15 19.5 13.66 19.5 12V5.5" stroke="#38BDF8" strokeWidth="1.6" />
        <path d="M4.5 12V18.5C4.5 20.16 7.86 21.5 12 21.5C16.14 21.5 19.5 20.16 19.5 18.5V12" stroke="#38BDF8" strokeWidth="1.6" />
      </svg>
    );
  }

  // BLoC / Cubit hexagon cube
  if (key.includes("bloc") || key.includes("cubit")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M12 2L20.5 7V17L12 22L3.5 17V7L12 2Z" fill="#00D2B8" fillOpacity="0.2" stroke="#00D2B8" strokeWidth="1.7" />
        <path d="M12 2V12M12 12L20.5 7M12 12L3.5 7" stroke="#38BDF8" strokeWidth="1.6" />
      </svg>
    );
  }

  // Riverpod
  if (key.includes("riverpod")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path
          d="M12 2.5C12 2.5 5.5 9.8 5.5 14.5C5.5 18.09 8.41 21 12 21C15.59 21 18.5 18.09 18.5 14.5C18.5 9.8 12 2.5 12 2.5Z"
          fill="#38BDF8"
          fillOpacity="0.25"
          stroke="#0EA5E9"
          strokeWidth="1.7"
        />
        <path d="M8.5 15C10 16.5 13 16.5 15.5 14" stroke="#7DD3FC" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  // Clean Architecture / MVVM / Feature-First / SOLID
  if (key.includes("clean architecture") || key.includes("feature-first") || key.includes("solid")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M12 3L21 8L12 13L3 8L12 3Z" fill="#34D399" fillOpacity="0.22" stroke="#34D399" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M3 12.5L12 17.5L21 12.5" stroke="#38BDF8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 16.8L12 21.8L21 16.8" stroke="#A78BFA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // GetX / Provider / Zustand / TanStack
  if (key.includes("getx") || key.includes("provider") || key.includes("zustand") || key.includes("tanstack")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4.5" fill="#8B5CF6" fillOpacity="0.2" stroke="#A78BFA" strokeWidth="1.6" />
        <path d="M13 6.5L8.5 13H12.5L11 17.5L15.5 11H11.5L13 6.5Z" fill="#C4B5FD" />
      </svg>
    );
  }

  // PowerSync
  if (key.includes("powersync") || key.includes("offline")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9.2" fill="#6366F1" fillOpacity="0.2" stroke="#818CF8" strokeWidth="1.6" />
        <path d="M13.2 5.8L8.2 12.6H12.2L10.8 18.2L15.8 11.4H11.8L13.2 5.8Z" fill="#34D399" />
      </svg>
    );
  }

  // Firebase / Firestore / Crashlytics / FCM
  if (key.includes("firebase") || key.includes("firestore") || key.includes("crashlytics") || key.includes("fcm")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M5 18.5L7.6 3.8C7.75 3.1 8.65 2.95 9 3.6L11.6 8.5L5 18.5Z" fill="#FFA000" />
        <path d="M5 18.5L13.8 6.2C14.2 5.65 15.05 5.8 15.2 6.45L19 18.5L12 22L5 18.5Z" fill="#FFCA28" />
        <path d="M12 22L19 18.5L16.5 9.8L5 18.5L12 22Z" fill="#F57C00" fillOpacity="0.7" />
      </svg>
    );
  }

  // Supabase
  if (key.includes("supabase")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path
          d="M13.4 21.2C12.8 21.95 11.6 21.55 11.6 20.6V13.2H19.4C20.25 13.2 20.72 14.18 20.18 14.84L13.4 21.2Z"
          fill="#249361"
        />
        <path
          d="M10.6 2.8C11.2 2.05 12.4 2.45 12.4 3.4V10.8H4.6C3.75 10.8 3.28 9.82 3.82 9.16L10.6 2.8Z"
          fill="#3ECF8E"
        />
      </svg>
    );
  }

  // GraphQL / REST
  if (key.includes("graphql") || key.includes("rest")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <polygon
          points="12,2.5 20.2,7.25 20.2,16.75 12,21.5 3.8,16.75 3.8,7.25"
          stroke="#E535AB"
          strokeWidth="1.6"
          fill="#E535AB"
          fillOpacity="0.12"
        />
        <polygon points="12,2.5 20.2,16.75 3.8,16.75" stroke="#F472B6" strokeWidth="1.3" fill="none" />
        <circle cx="12" cy="2.5" r="1.6" fill="#E535AB" />
        <circle cx="20.2" cy="16.75" r="1.6" fill="#E535AB" />
        <circle cx="3.8" cy="16.75" r="1.6" fill="#E535AB" />
      </svg>
    );
  }

  // Node.js / Cloud Functions
  if (key.includes("node")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M12 2.2L20.5 7.1V16.9L12 21.8L3.5 16.9V7.1L12 2.2Z" fill="#5FA04E" fillOpacity="0.25" stroke="#68A063" strokeWidth="1.7" />
        <path d="M9.5 15V9L14.5 15V9" stroke="#86EFAC" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // WebSockets
  if (key.includes("websocket")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M4 9H17L13.5 5.5M20 15H7L10.5 18.5" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Multi-Gateway Payments
  if (key.includes("payment") || key.includes("gateway")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <rect x="2.5" y="5" width="19" height="14" rx="3" fill="#10B981" fillOpacity="0.2" stroke="#34D399" strokeWidth="1.6" />
        <path d="M2.5 9.5H21.5" stroke="#34D399" strokeWidth="1.6" />
        <rect x="5.5" y="13" width="5" height="2.5" rx="0.8" fill="#6EE7B7" />
      </svg>
    );
  }

  // OAuth / JWT / RBAC
  if (key.includes("oauth") || key.includes("jwt") || key.includes("rbac") || key.includes("biometric")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path
          d="M12 2.5L19.5 5.8V11.6C19.5 16.35 16.3 20.45 12 21.8C7.7 20.45 4.5 16.35 4.5 11.6V5.8L12 2.5Z"
          fill="#F59E0B"
          fillOpacity="0.2"
          stroke="#FBBF24"
          strokeWidth="1.6"
        />
        <path d="M9 12.2L11.1 14.3L15.2 9.8" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Google Maps / Geolocation
  if (key.includes("map") || key.includes("geolocation")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path
          d="M12 2.5C7.86 2.5 4.5 5.86 4.5 10C4.5 15.25 12 21.5 12 21.5C12 21.5 19.5 15.25 19.5 10C19.5 5.86 16.14 2.5 12 2.5Z"
          fill="#EA4335"
          fillOpacity="0.85"
        />
        <circle cx="12" cy="10" r="3" fill="#FFFFFF" />
      </svg>
    );
  }

  // Fastlane CI/CD
  if (key.includes("fastlane") || key.includes("ci/cd")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path
          d="M14.5 3.5C17.8 3.5 20.5 6.2 20.5 9.5C20.5 14 14 19.5 10.5 20.5L8.5 16L4 14C5 10.5 10.5 3.5 14.5 3.5Z"
          fill="#22D3EE"
          fillOpacity="0.22"
          stroke="#22D3EE"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="14.5" cy="9.5" r="2" fill="#67E8F9" />
        <path d="M4.5 19.5L7.5 16.5" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // App Store Connect / TestFlight / iOS
  if (key.includes("app store") || key.includes("testflight") || key === "ios") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="4.5" fill="#0EA5E9" fillOpacity="0.22" stroke="#38BDF8" strokeWidth="1.5" />
        <path d="M12 6.2L6.8 15.5M12 6.2L17.2 15.5M6 13.8H18" stroke="#E0F2FE" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // Google Play Console
  if (key.includes("play")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M4.5 3.6L14.2 12L4.5 20.4V3.6Z" fill="#38BDF8" />
        <path d="M4.5 3.6L16.8 9.8L14.2 12L4.5 3.6Z" fill="#34D399" />
        <path d="M4.5 20.4L14.2 12L16.8 14.2L4.5 20.4Z" fill="#F43F5E" />
        <path d="M16.8 9.8L20 11.4C20.6 11.7 20.6 12.3 20 12.6L16.8 14.2L14.2 12L16.8 9.8Z" fill="#FBBF24" />
      </svg>
    );
  }

  // Git / GitLab / GitHub (official GitLab Tanuki)
  if (key.includes("gitlab") || key.includes("git")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M12 21L16.2 8.5H7.8L12 21Z" fill="#E24329" />
        <path d="M12 21L7.8 8.5H2.5L12 21Z" fill="#FC6D26" />
        <path d="M2.5 8.5L1.3 12.2C1.15 12.65 1.3 13.15 1.7 13.45L12 21L2.5 8.5Z" fill="#FCA326" />
        <path d="M2.5 8.5H7.8L5.5 2.2C5.3 1.65 4.5 1.65 4.3 2.2L2.5 8.5Z" fill="#E24329" />
        <path d="M12 21L16.2 8.5H21.5L12 21Z" fill="#FC6D26" />
        <path d="M21.5 8.5L22.7 12.2C22.85 12.65 22.7 13.15 22.3 13.45L12 21L21.5 8.5Z" fill="#FCA326" />
        <path d="M21.5 8.5H16.2L18.5 2.2C18.7 1.65 19.5 1.65 19.7 2.2L21.5 8.5Z" fill="#E24329" />
      </svg>
    );
  }

  // Figma
  if (key.includes("figma")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M8.5 2.5H12V9H8.5C6.7 9 5.25 7.55 5.25 5.75C5.25 3.95 6.7 2.5 8.5 2.5Z" fill="#F24E1E" />
        <path d="M12 2.5H15.5C17.3 2.5 18.75 3.95 18.75 5.75C18.75 7.55 17.3 9 15.5 9H12V2.5Z" fill="#FF7262" />
        <path d="M12 9H15.5C17.3 9 18.75 10.45 18.75 12.25C18.75 14.05 17.3 15.5 15.5 15.5C13.7 15.5 12 14.05 12 12.25V9Z" fill="#1ABCFE" />
        <path d="M8.5 9H12V15.5H8.5C6.7 15.5 5.25 14.05 5.25 12.25C5.25 10.45 6.7 9 8.5 9Z" fill="#A259FF" />
        <path d="M8.5 15.5H12V18.75C12 20.55 10.55 22 8.75 22C6.95 22 5.5 20.55 5.5 18.75C5.5 16.95 6.7 15.5 8.5 15.5Z" fill="#0ACF83" />
      </svg>
    );
  }

  // Agile / Scrum
  if (key.includes("agile") || key.includes("scrum")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M4.5 12A7.5 7.5 0 1 1 12 19.5H5.5" stroke="#2DD4BF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 17L5 19.5L8 22" stroke="#2DD4BF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Testing (Unit / Widget / Integration)
  if (key.includes("test")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path
          d="M9.5 3.5H14.5M10.5 3.5V8.5L5.2 17.6C4.55 18.7 5.35 20.1 6.65 20.1H17.35C18.65 20.1 19.45 18.7 18.8 17.6L13.5 8.5V3.5"
          stroke="#FBBF24"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M7.4 14.5H16.6" stroke="#34D399" strokeWidth="1.6" />
      </svg>
    );
  }

  // Hermes / MMKV / TurboModules
  if (key.includes("hermes") || key.includes("mmkv") || key.includes("turbo")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <rect x="6" y="6" width="12" height="12" rx="2.5" fill="#F59E0B" fillOpacity="0.22" stroke="#FBBF24" strokeWidth="1.6" />
        <path d="M9 2.5V6M15 2.5V6M9 18V21.5M15 18V21.5M2.5 9H6M2.5 15H6M18 9H21.5M18 15H21.5" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12.6 8.8L10 12.3H12.4L11.4 15.2L14 11.7H11.6L12.6 8.8Z" fill="#FEF08A" />
      </svg>
    );
  }

  // Bluetooth BLE / Beacons
  if (key.includes("bluetooth") || key.includes("ble") || key.includes("beacon")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path
          d="M7 7.5L16.5 16.5L12 21V3L16.5 7.5L7 16.5"
          stroke="#38BDF8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Mobile Game / 60fps Engine / Custom Animations
  if (key.includes("game") || key.includes("60fps") || key.includes("animation")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <rect
          x="3"
          y="7"
          width="18"
          height="10"
          rx="5"
          fill="#A855F7"
          fillOpacity="0.2"
          stroke="#C084FC"
          strokeWidth="1.6"
        />
        <path d="M8 10V14M6 12H10" stroke="#E9D5FF" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="15.5" cy="11" r="1" fill="#34D399" />
        <circle cx="17.5" cy="13" r="1" fill="#FBBF24" />
      </svg>
    );
  }

  // Default AI / Code Spark
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 3L14.2 9.8L21 12L14.2 14.2L12 21L9.8 14.2L3 12L9.8 9.8L12 3Z"
        fill="#34D399"
        fillOpacity="0.28"
        stroke="#6EE7B7"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}


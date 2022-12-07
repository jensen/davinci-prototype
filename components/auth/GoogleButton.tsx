import Link from "next/link";

export default function GoogleButton() {
  return (
    <Link
      href="/api/auth/providers/google"
      className="google bg-white text-black px-6 py-2 flex space-x-2"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M43.2857 23.1363C43.2857 21.5924 43.1471 20.1079 42.8898 18.6827H22.3839V27.1048H34.1015C33.5968 29.8264 32.0628 32.1323 29.7569 33.6762V39.1392H36.7934C40.9105 35.3488 43.2857 29.767 43.2857 23.1363Z"
          fill="#4285F4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.3839 44.4142C28.2625 44.4142 33.191 42.4645 36.7934 39.1392L29.7569 33.6763C27.8072 34.9826 25.3133 35.7546 22.3839 35.7546C16.713 35.7546 11.9131 31.9245 10.201 26.7783H2.92695V32.4194C6.50955 39.5351 13.8727 44.4142 22.3839 44.4142Z"
          fill="#34A853"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.201 26.7782C9.76556 25.4719 9.51814 24.0764 9.51814 22.6414C9.51814 21.2064 9.76556 19.8109 10.201 18.5046V12.8635H2.92694C1.45233 15.8028 0.611115 19.1281 0.611115 22.6414C0.611115 26.1547 1.45233 29.48 2.92694 32.4193L10.201 26.7782Z"
          fill="#FBBC05"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.3839 9.52826C25.5805 9.52826 28.4505 10.6268 30.707 12.7843L36.9518 6.53946C33.1811 3.02613 28.2526 0.868652 22.3839 0.868652C13.8727 0.868652 6.50955 5.74772 2.92695 12.8634L10.201 18.5046C11.9131 13.3583 16.713 9.52826 22.3839 9.52826Z"
          fill="#EA4335"
        />
      </svg>
      <span className="opacity-50 font-medium">Login with Google</span>
    </Link>
  );
}

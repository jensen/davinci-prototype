import { withAuth } from "utils/auth";

export default function Search() {
  return (
    <div className="flex justify-center">
      <a
        href="/api/auth/providers/google"
        className="bg-emerald-500 text-white px-6 py-2 rounded"
      >
        Login with Google
      </a>
    </div>
  );
}

export const getServerSideProps = withAuth();

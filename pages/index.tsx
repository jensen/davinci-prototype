import { withAuth } from "utils/auth";
import { useAuth } from "context/auth";

import GoogleButton from "components/auth/GoogleButton";
import Alicent from "components/brand/Alicent";

export default function Search() {
  const { user } = useAuth();

  return (
    <div className="relative flex justify-center">
      <Alicent />
      <div className="absolute z-20 top-[calc(50%-20px)]">
        {user === null && <GoogleButton />}
      </div>
    </div>
  );
}

export const getServerSideProps = withAuth();

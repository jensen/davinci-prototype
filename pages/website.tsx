import Form from "components/form/Form";
import useRadialGradient from "hooks/useRadialGradient";
import { withAuth } from "utils/auth";

export default function Website() {
  useRadialGradient("website");

  return (
    <div className="h-full flex justify-center">
      <Form type="website" />
    </div>
  );
}

export const getServerSideProps = withAuth();

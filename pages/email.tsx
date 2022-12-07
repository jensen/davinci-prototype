import Form from "components/form/Form";
import useRadialGradient from "hooks/useRadialGradient";
import { withAuth } from "utils/auth";

export default function Email() {
  useRadialGradient("email");

  return (
    <div className="h-full flex justify-center">
      <Form type="email" />
    </div>
  );
}

export const getServerSideProps = withAuth();

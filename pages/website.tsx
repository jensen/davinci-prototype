import Form from "components/form/Form";
import useRadialGradient from "hooks/useRadialGradient";

export default function Website() {
  useRadialGradient("website");

  return (
    <div className="h-full flex justify-center">
      <Form type="website" />
    </div>
  );
}

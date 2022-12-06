import { useEffect } from "react";
import Prompt from "components/form/Prompt";
import { RetryButton, ClearButton } from "components/form/Buttons";
import useRadialGradient from "hooks/useRadialGradient";
import { useRouter } from "next/router";
import ResultsList from "components/ResultsList";
import ResultsFeedback from "components/ResultsFeedback";
import { usePrompt } from "context/prompt";
import Dot from "components/brand/Dot";

export default function Results() {
  const router = useRouter();
  const { ask, results, asking, selected } = usePrompt();

  const type = router.query.type as "email" | "website";

  useRadialGradient(type);

  useEffect(() => {
    if (asking === false && results.length === 0) {
      router.back();
    }
  }, [asking, results, router]);

  return (
    <div className="h-full flex flex-col items-center">
      <Prompt type={type} selected={selected} />
      {asking ? (
        <div className="animate-pulse p-16 flex flex-col items-center relative">
          <Dot type={type} size={256} />
          <span className="text-sm absolute top-1/2">Thinking</span>
        </div>
      ) : (
        <>
          <div className="p-4 flex justify-center space-x-10 mb-16">
            <RetryButton onClick={() => ask(type)} />
            <ClearButton onClick={router.back} />
          </div>
          <ResultsList results={results} />
          <div className="mt-7 flex justify-center">
            <ResultsFeedback />
          </div>
        </>
      )}
    </div>
  );
}

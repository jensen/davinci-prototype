import { useEffect, useState } from "react";
import Prompt from "components/form/Prompt";
import { RetryButton, ClearButton } from "components/form/Buttons";
import useRadialGradient from "hooks/useRadialGradient";
import { useRouter } from "next/router";
import ResultsList from "components/ResultsList";
import ResultsFeedback from "components/ResultsFeedback";

const results = [
  "Get your greens on with our plant-based protein! Promo Code BF20",
  "Boost your plant-based diet with our delicious protein powder! Promo Code BF20",
  "Plant-based protein never tasted so good! Promo Code BF20",
  "Get your daily dose of protein without the meat! Promo Code BF20",
  "Skip the steak and try our plant-based protein instead! Promo Code BF20",
];

const initializeResults = () => {
  function shuffle(array: string[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return shuffle([...results]);
};

interface ResultsProps {}

export default function Results(props: ResultsProps) {
  const router = useRouter();
  const type = router.query.type as "email" | "website";
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    setResults(initializeResults());
  }, []);

  useRadialGradient(type);

  return (
    <div className="h-full flex justify-center">
      <div>
        <Prompt type={type} selected={{}} />
        <div className="p-4 flex justify-center space-x-10 mb-16">
          <RetryButton onClick={() => setResults(initializeResults())} />
          <ClearButton onClick={() => router.back()} />
        </div>
        <ResultsList results={results} />
        <div className="mt-7 flex justify-center">
          <ResultsFeedback />
        </div>
      </div>
    </div>
  );
}

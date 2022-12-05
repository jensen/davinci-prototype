import ClipboardIcon from "components/icons/clipboard";

const itemClasses =
  "px-6 py-5 border border-gray-100 bg-gray-50 flex justify-between rounded-lg";

interface ResultsListProps {
  results: string[];
}

export default function ResultsList(props: ResultsListProps) {
  return (
    <ul className="space-y-4">
      {props.results.map((result) => {
        return (
          <li key={result} className={itemClasses}>
            <span className="font-medium text-sm">{result}</span>
            <span
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(result);
              }}
            >
              <ClipboardIcon />
            </span>
          </li>
        );
      })}
    </ul>
  );
}

import ClipboardIcon from "components/icons/clipboard";

const itemClasses =
  "px-6 py-5 border border-gray-100 bg-gray-50 flex justify-between rounded-lg min-w-[768px]";

interface ResultsListProps {
  results: string[];
}

export default function ResultsList(props: ResultsListProps) {
  return (
    <ul className="space-y-4 max-w-[885px]">
      {props.results.map((result) => {
        return (
          <li key={result} className={itemClasses}>
            <span className="font-medium text-sm">{result}</span>
            <span
              className="cursor-pointer ml-6"
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

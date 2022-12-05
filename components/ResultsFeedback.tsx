import ThumbsUpIcon from "./icons/thumbsup";
import ThumbsDownIcon from "./icons/thumbsdown";

export default function ResultsFeedback() {
  return (
    <div className="flex flex-col items-center space-y-3.5">
      <p className="text-sm">How were the results?</p>
      <div className="flex space-x-4">
        <button className="p-3.5 bg-gray-100 rounded">
          <ThumbsUpIcon />
        </button>
        <button className="p-3.5 bg-gray-100 rounded">
          <ThumbsDownIcon />
        </button>
      </div>
    </div>
  );
}

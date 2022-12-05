import SubmitIcon from "components/icons/submit";
import ClearIcon from "components/icons/clear";
import RetryIcon from "components/icons/retry";
import classNames from "classnames";

const buttonClasses = "flex items-center space-x-2 px-4 py-2";

interface ButtonProps {
  onClick?: () => void;
}

export const SubmitButton = (props: ButtonProps) => {
  return (
    <button
      type="submit"
      className={classNames(buttonClasses)}
      onClick={props.onClick}
    >
      <SubmitIcon />
      <span className="uppercase font-semibold text-xs text-gray-500">
        Submit
      </span>
    </button>
  );
};

export const ClearButton = (props: ButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(buttonClasses)}
      onClick={props.onClick}
    >
      <ClearIcon />
      <span className="uppercase font-semibold text-xs text-gray-500">
        Clear
      </span>
    </button>
  );
};

export const RetryButton = (props: ButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(buttonClasses)}
      onClick={props.onClick}
    >
      <RetryIcon />
      <span className="uppercase font-semibold text-xs text-gray-500">
        Retry
      </span>
    </button>
  );
};

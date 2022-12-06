import SubmitIcon from "components/icons/submit";
import ClearIcon from "components/icons/clear";
import RetryIcon from "components/icons/retry";
import classNames from "classnames";

const buttonClasses = "flex items-center space-x-2 px-4 py-2";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const SubmitButton = (props: ButtonProps) => {
  return (
    <button
      type="submit"
      className={classNames(buttonClasses, {
        "text-gray-500": !props.disabled,
        "text-gray-300": props.disabled,
      })}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <SubmitIcon />
      <span className="uppercase font-semibold text-xs">Submit</span>
    </button>
  );
};

export const ClearButton = (props: ButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(buttonClasses, {
        "text-gray-500": !props.disabled,
        "text-gray-300": props.disabled,
      })}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <ClearIcon />
      <span className="uppercase font-semibold text-xs">Clear</span>
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

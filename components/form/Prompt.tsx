const selectedClasses =
  "inline-block text-black font-medium border-b-2 border-slate-200 min-w-[3rem]";
const connectorClasses =
  "inline-block text-gray-500 font-medium border-b-2 border-transparent";

interface BaseFormatter {
  content: string | null;
  tone: string | null;
  brand: string | null;
  custom: string | null;
}

interface EmailFormatter extends BaseFormatter {
  type: string | null;
}

interface WebsiteFormatter extends BaseFormatter {
  section: string | null;
}

const formatters = {
  email: ({ content, tone, brand, type, custom }: EmailFormatter) => (
    <div className="flex items-end space-x-2">
      <span className={selectedClasses}>{content}</span>
      <span className={connectorClasses}>with a</span>
      <span className={selectedClasses}>{tone}</span>
      <span className={connectorClasses}>tone, for a</span>
      <span className={selectedClasses}>{brand}</span>
      <span className={selectedClasses}>{type}</span>
      <span className={connectorClasses}>email that contains</span>
      <span className={selectedClasses}>{custom}</span>
    </div>
  ),
  website: ({ content, tone, brand, section, custom }: WebsiteFormatter) => (
    <div className="flex items-end space-x-2">
      <span className={selectedClasses}>{content}</span>
      <span className={connectorClasses}>with a</span>
      <span className={selectedClasses}>{tone}</span>
      <span className={connectorClasses}>tone, for a</span>
      <span className={selectedClasses}>{section}</span>
      <span className={connectorClasses}>section of a</span>{" "}
      <span className={selectedClasses}>{brand}</span>
      <span className={connectorClasses}>website that contains</span>
      <span className={selectedClasses}>{custom}</span>
    </div>
  ),
};

const useCurrentInput = (
  type: "email" | "website",
  selected: Record<string, string | null>
) => {
  if (Object.values(selected).every((v) => v === null)) return null;

  if (type === "email") {
    return formatters.email(selected as unknown as EmailFormatter);
  }

  if (type === "website") {
    return formatters.website(selected as unknown as WebsiteFormatter);
  }
};

interface PromptProps {
  type: "email" | "website";
  selected: Record<string, string | null>;
}

export default function Prompt(props: PromptProps) {
  const color = props.type === "email" ? "#7C3AEd" : "#34D399";

  const current = useCurrentInput(props.type, props.selected);

  return (
    <div className="px-6 py-7 bg-white rounded-lg flex items-center space-x-4 border border-slate-100 drop-shadow-2xl min-w-[885px]">
      <svg
        width="36"
        height="36"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.2">
          <rect width="35" height="35" rx="17.5" fill="url(#dotGradient)" />
        </g>
        <defs>
          <radialGradient
            id="dotGradient"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(17.5 17.5) rotate(90) scale(17.5)"
          >
            <stop stopColor={color} />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      {current === null && (
        <span className="text-gray-300 text-sm font-medium">
          “Headline for a Women’s Online Fitness Platform Abandoned Cart Email
          using a Friendly Tone”
        </span>
      )}
      {current}
    </div>
  );
}

import Dot from "components/brand/Dot";

const selectedClasses =
  "inline-block text-black font-medium border-b-2 border-slate-200 min-w-[3rem]";
const connectorClasses =
  "inline-block text-gray-500 font-medium border-b-2 border-transparent";

export const formatters = {
  email: {
    html: ({ content, tone, brand, type, custom }: EmailFormatter) => (
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
    text: ({ content, tone, brand, type, custom }: EmailFormatter) =>
      `${content} with a ${tone} tone, for a ${brand} ${type} email that contains ${custom}`,
  },
  website: {
    html: ({ content, tone, brand, section, custom }: WebsiteFormatter) => (
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
    text: ({ content, tone, brand, section, custom }: WebsiteFormatter) =>
      `${content} with a ${tone} tone, for a ${section} section of a ${brand} website that contains ${custom}`,
  },
};

const useCurrentInput = (
  type: "email" | "website",
  selected: Record<string, string | null>
) => {
  if (Object.values(selected).every((v) => v === null)) return null;

  if (type === "email") {
    return formatters.email.html(selected as unknown as EmailFormatter);
  }

  if (type === "website") {
    return formatters.website.html(selected as unknown as WebsiteFormatter);
  }
};

interface PromptProps {
  type: "email" | "website";
  selected: Record<string, string | null>;
}

export default function Prompt(props: PromptProps) {
  const current = useCurrentInput(props.type, props.selected);

  return (
    <div className="px-6 py-7 bg-white rounded-lg flex items-center space-x-4 border border-slate-100 drop-shadow-2xl min-w-[885px]">
      <Dot type={props.type} size={34} />
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

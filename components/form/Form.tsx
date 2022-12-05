import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Prompt from "./Prompt";
import { SubmitButton, ClearButton } from "./Buttons";
import ChevronIcon from "components/icons/chevron";
import classnames from "classnames";
import { useRouter } from "next/router";
import CrossIcon from "components/icons/cross";

const options = {
  email: [
    {
      id: "content",
      heading: "Content",
      options: [
        "Subject Line",
        "Pre-Header",
        "Headline",
        "Subhead",
        "Body",
        "CTA",
        "Offer",
      ],
    },
    {
      id: "tone",
      heading: "Tone",
      options: [
        "Playful",
        "Formal",
        "Informative",
        "Casual",
        "Urgent",
        "Friendly",
        "Neutral",
        "Gentle",
        "Serious",
      ],
    },
    {
      id: "type",
      heading: "Type",
      options: [
        "Promotional",
        "Welcome",
        "Abandoned Cart",
        "Newsletter",
        "Onboarding",
        "Custom",
      ],
    },
  ],
  website: [
    {
      id: "content",
      heading: "Content",
      options: [
        "Headline",
        "Subhead",
        "Body",
        "Testimonial",
        "Feature",
        "Value Prop",
      ],
    },
    {
      id: "tone",
      heading: "Tone",
      options: [
        "Playful",
        "Formal",
        "Informative",
        "Casual",
        "Urgent",
        "Friendly",
        "Neutral",
        "Gentle",
        "Serious",
      ],
    },
    {
      id: "section",
      heading: "Section",
      options: [
        "Hero",
        "Secondary",
        "Contact Form",
        "About",
        "Features",
        "Support",
        "How It Works",
      ],
    },
  ],
};

interface SectionProps {
  id: string;
  heading: string;
  options: string[];
  selected: string | null;
  onToggle: (value: string) => void;
}

const Section = (props: SectionProps) => {
  return (
    <section className="mt-8">
      <h3 className="uppercase font-semibold text-xs text-gray-400 mb-3">
        {props.heading}
      </h3>
      <ul className="space-x-2 flex">
        {props.options.map((label) => {
          const active = props.selected === label;

          return (
            <li
              key={label}
              className={classnames(
                "flex items-center space-x-2 border py-2 px-4 rounded-full cursor-pointer",
                {
                  "bg-gray-700 border-gray-700": active === true,
                  "border-gray-200": active === false,
                }
              )}
              onClick={() => props.onToggle(label)}
            >
              {active && <CrossIcon />}
              <span
                className={classnames("text-xs font-semibold", {
                  "text-gray-700 ": active === false,
                  "text-white": active === true,
                })}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const categories = [
  { name: "Brand", placeholder: "Woman's Online Fitness Platform" },
  { name: "Product", placeholder: "Plant Based Protein Powder" },
];

const filters = [
  { name: "Must Include", placeholder: "Source Code BF20" },
  { name: "Must Exclude", placeholder: "Camera" },
];

const colorClasses = {
  email: "bg-violet-100 text-violet-900",
  website: "bg-emerald-100 text-emerald-900",
};

interface ChooseProps {
  type: "email" | "website";
  items: { name: string; placeholder: string }[];
  value: string | null;
  onChange: (value: string) => void;
}

const Choose = (props: ChooseProps) => {
  const [selected, setSelected] = useState(props.items[0]);

  return (
    <>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="p-4 bg-gray-200 rounded flex items-center justify-between w-32">
            <span className="text-xs font-semibold text-gray-700">
              {selected.name}
            </span>
            <span className="pointer-events-none flex items-center">
              <ChevronIcon />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute border mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ">
              {props.items.map((item, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    classnames("cursor-default select-none px-2 py-1", {
                      [colorClasses[props.type]]: active === true,
                      "text-gray-900": active === false,
                    })
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <span className={`block truncate text-sm`}>
                      {item.name}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <input
        className="text-xs p-4 border bg-white border-slate-200 rounded w-56 h-12 font-semibold focus:ring-1 focus:ring-slate-200 focus:outline-none"
        placeholder={`“${selected.placeholder}”`}
        value={props.value || ""}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </>
  );
};

interface FormProps {
  type: "email" | "website";
}

const getInitialSections = (sections: { id: string }[]) => {
  return {
    ...sections.reduce((initial, value) => {
      initial[value.id] = null;
      return initial;
    }, {} as Record<string, string | null>),
    brand: null,
    custom: null,
  };
};

export default function Form(props: FormProps) {
  const router = useRouter();
  const sections = options[props.type];
  const [selected, setSelected] = useState<Record<string, string | null>>(
    getInitialSections(sections)
  );

  const handleToggle = (id: string) => (label: string) => {
    setSelected((prev) => ({
      ...prev,
      [id]: prev[id] === label ? null : label,
    }));
  };

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={(event) => {
        event.preventDefault();

        console.log(selected);

        router.push({
          pathname: "/[type]/results",
          query: { type: props.type },
        });
      }}
    >
      <Prompt type={props.type} selected={selected} />
      <div>
        <div className="p-4 flex justify-center space-x-10 mb-16">
          <SubmitButton />
          <ClearButton
            onClick={() => setSelected(getInitialSections(sections))}
          />
        </div>
        {sections.map((section) => (
          <Section
            key={section.id}
            id={section.id}
            selected={selected[section.id]}
            heading={section.heading}
            options={section.options}
            onToggle={handleToggle(section.id)}
          />
        ))}
        <section className="mt-8 flex space-x-6">
          <div>
            <h3 className="uppercase font-semibold text-xs text-gray-400 mb-3">
              Brand
            </h3>
            <div className="flex space-x-2">
              <Choose
                type={props.type}
                items={categories}
                value={selected.brand}
                onChange={(value) =>
                  setSelected((prev) => ({ ...prev, brand: value || null }))
                }
              />
            </div>
          </div>
          <div>
            <h3 className="uppercase font-semibold text-xs text-gray-400 mb-3">
              Custom
            </h3>
            <div className="flex space-x-2">
              <Choose
                type={props.type}
                items={filters}
                value={selected.custom}
                onChange={(value) =>
                  setSelected((prev) => ({ ...prev, custom: value || null }))
                }
              />
            </div>
          </div>
        </section>
      </div>
    </form>
  );
}

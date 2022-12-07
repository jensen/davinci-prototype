import { useRouter } from "next/router";
import { createContext, useContext, useState, useCallback } from "react";
import { formatters } from "components/form/Prompt";

import type { Dispatch, SetStateAction, ReactNode } from "react";

type Selected = Record<string, string | null>;

interface PromptContext {
  ask: (type: "email" | "website") => void;
  asking: boolean;
  selected: Selected;
  results: string[];
  setSelected: Dispatch<SetStateAction<Selected>>;
  reset: () => void;
}

const PromptContext = createContext<PromptContext>({
  ask: (type) => null,
  asking: false,
  selected: {},
  results: [],
  setSelected: () => null,
  reset: () => null,
});

interface PromptProviderProps {
  children: ReactNode;
}

const prompt = async (prompt: string, type: string) => {
  try {
    const results = (await fetch("/api/prompt", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, type }),
    }).then((response) => {
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }

      return response.json();
    })) as string[];

    return results.map((result) => {
      const match = /(\d\.) (.*)/.exec(result);

      if (match) {
        return match[2] as string;
      }

      return result;
    });
  } catch (error) {
    throw error;
  }
};

export default function PromptProvider(props: PromptProviderProps) {
  const { push } = useRouter();
  const [selected, setSelected] = useState<Selected>({});
  const [results, setResults] = useState<string[]>([]);
  const [asking, setAsking] = useState(false);

  const ask = useCallback(
    async (type: string) => {
      setAsking(true);

      try {
        if (type === "email") {
          setResults(
            await prompt(
              formatters.email.text(selected as unknown as EmailFormatter),
              type
            )
          );
        }

        if (type === "website") {
          setResults(
            await prompt(
              formatters.website.text(selected as unknown as WebsiteFormatter),
              type
            )
          );
        }
      } catch (error) {
        push("/");
      }

      setAsking(false);
    },
    [selected, push]
  );

  const reset = useCallback(() => {
    setResults([]);
  }, []);

  return (
    <PromptContext.Provider
      value={{ ask, asking, selected, results, setSelected, reset }}
    >
      {props.children}
    </PromptContext.Provider>
  );
}

export const usePrompt = () => {
  return useContext(PromptContext);
};

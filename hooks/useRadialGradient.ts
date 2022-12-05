import { useEffect } from "react";

export default function useRadialGradient(type: "email" | "website") {
  useEffect(() => {
    document.body.classList.add(type);
    return () => {
      document.body.classList.remove(type);
    };
  }, [type]);
}

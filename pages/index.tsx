import { useEffect } from "react";

export default function Search() {
  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((users) => console.log(users));
  }, []);

  return <div />;
}

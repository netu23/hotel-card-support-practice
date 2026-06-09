import { useEffect, useState } from "react";
import { AsyncState } from "../types/async";

export function useFetch<T>(url: string): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: "idle" });

  useEffect(() => {
    let isMounted = true;

    setState({ status: "loading" });

    fetch(url)
      .then((response) => response.json() as Promise<T>)
      .then((data) => {
        if (isMounted) {
          setState({ status: "success", data });
        }
      });

    // TODO: Check response.ok and set error state for API failures.
    // TODO: Set error state for network failures.

    return () => {
      isMounted = false;
    };
  }, [url]);

  return state;
}

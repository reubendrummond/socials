import { useEffect, useState } from "react";

interface UseReqOptions {
  method: "GET";
}

export const useReq = (
  endpoint: string,
  options: UseReqOptions = {
    method: "GET",
  }
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<{} | null>();
  const [status, setStatus] = useState<number>(-1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const call = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:3000/api/${endpoint}`, {
          method: options.method,
          signal: controller.signal,
        });
        setStatus(res.status);
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        setData(data);
      } catch (err) {
        if (controller.signal.aborted) setError("Request aborted");
        else if (err instanceof Error) setError(err.message);
        else setError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    call();

    return () => {
      controller.abort();
      // console.log("clean up");
    };
  }, []);

  return {
    data,
    status,
    isLoading,
    error,
  };
};

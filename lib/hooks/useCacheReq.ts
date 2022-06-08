import useSWR from "swr";
import { useAuth } from "./useAuth";

export const useAuthFetcher = () => {
  const { token } = useAuth();
  const authFetcher = (input: RequestInfo) =>
    fetch(input, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  return authFetcher;
};

export const useAuthReq = (endpoint: string) => {
  const authFetcher = useAuthFetcher();
  return useSWR(`/api/${endpoint}`, authFetcher, {});
};

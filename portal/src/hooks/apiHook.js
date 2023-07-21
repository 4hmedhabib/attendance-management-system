import { useMutation, useQuery } from "@tanstack/react-query";

import { useState } from "react";
import apiClient from "../api/apiClient";

const useApiCall = (key = "repoData", resourceUrl, _data, enabled = true) => {
  const [errMsg, setErrMsg] = useState(null);

  const fetchAll = async () => {
    try {
      const response = await apiClient.post(resourceUrl, _data);
      return response.data;
    } catch (err) {
      let error =
        err?.response?.data?.message ??
        (err.message || "Something went wrong. Please contact support team");

      setErrMsg(error);
      throw new Error(error);
    }
  };

  const create = async (data) => {
    const response = await apiClient.post(resourceUrl, data);
    return response.data;
  };

  const update = async (data) => {
    const response = await apiClient.put(resourceUrl, data);
    return response.data;
  };

  const remove = async (data) => {
    const response = await apiClient.delete(resourceUrl, data);
    return response.data;
  };

  const { data, isLoading, isError, refetch } = useQuery([key], fetchAll, {
    enabled: enabled,
  });

  const createMutation = useMutation(create, {
    onSuccess: (res) => {
      // queryCache.invalidateQueries(["repoData"]);
      return res;
    },
  });

  const updateMutation = useMutation(update, {
    onSuccess: (res) => {
      // queryCache.invalidateQueries(["repoData"]);
      return res;
    },
  });

  const removeMutation = useMutation(remove, {
    onSuccess: (res) => {
      // queryCache.invalidateQueries(["repoData"]);
      return res;
    },
  });

  return {
    data,
    isLoading,
    isError,
    errMsg,
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    remove: removeMutation.mutateAsync,
    refetch,
  };
};

export default useApiCall;

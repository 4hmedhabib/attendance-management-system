import { useMutation, useQuery } from "@tanstack/react-query";

import { useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiError, logoutUser } from "../store/actions";
import { put } from "redux-saga/effects";
import { toast } from "react-toastify";

const useApiCall = (key = "repoData", resourceUrl, _data, enabled = true) => {
  const [errMsg, setErrMsg] = useState(null);
  const history = useNavigate();
  const dispatch = useDispatch();

  const fetchAll = async (payload) => {
    try {
      const response = await apiClient.post(resourceUrl, _data);

      return response.data;
    } catch (err) {
      if (err?.response?.data?.message && err?.response?.data?.message === 'Your session has been expired') {
        let message = err?.response?.data?.message && err?.response?.data?.message
        dispatch(logoutUser(history))

        toast.error(message);
      }

      let error =
        err?.response?.data?.message ??
        (err.message || "Something went wrong. Please contact support team");

      setErrMsg(error);
      throw new Error(error);
    }
  };

  const create = async (data) => {
    const response = await apiClient.post(resourceUrl, data);
    console.log(response);

    if (response?.data?.message) {
    }

    return response.data;
  };

  const update = async (data) => {
    const response = await apiClient.put(resourceUrl, data);
    return response.data;
  };

  const remove = async (data) => {
    const response = await apiClient.post(resourceUrl, data);
    return response.data;
  };

  const {
    data,
    isLoading = false,
    isError,
    refetch,
  } = useQuery([key], fetchAll, {
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

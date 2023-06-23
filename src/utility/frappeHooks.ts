/* This Utilities is client base & does not work on server component */

import { useEffect, useState } from "react";
import { frappeDB } from "./frappeClient";
import { Filter, GetDocListArgs } from "frappe-js-sdk/lib/db/types";

export const useFrappeCount = ({
  docType,
  filters,
}: {
  docType: string;
  filters?: Filter[];
}) => {
  const [isFetching, setFetching] = useState(true);
  const [total, setTotal] = useState<null | number>(null);

  useEffect(() => {
    frappeDB
      .getCount(docType, filters)
      .then((res) => {
        setTotal(res);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [docType, filters]);

  return {
    isFetching,
    isError: !isFetching && total === null,
    total,
  };
};

export const useFrappeList = ({
  docType,
  args,
}: {
  docType: string;
  args?: GetDocListArgs;
}) => {
  const [isFetching, setFetching] = useState(true);
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    frappeDB
      .getDocList(docType, args)
      .then((res) => {
        setData(res);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [docType, args]);

  return {
    isFetching,
    isError: !isFetching && data === null,
    data,
  };
};

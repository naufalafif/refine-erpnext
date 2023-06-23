import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { authProvider } from "src/authProvider";
import { useList } from "@refinedev/core";

import { DashboardTotalCard } from "src/pages/dashboard/cards";
import { frappeServerDB } from "src/utility";

const TodosTotalCard = () => {
  const { data, isFetching, isError } = useList({
    resource: "todos",
  });
  if (isFetching) return <Box>Loading...</Box>;
  if (isError) return <Box>Error</Box>;
  return (
    <DashboardTotalCard
      title="Total Todos (from supabase)"
      total={data!.total}
    />
  );
};

export default function (props: any) {
  return (
    <Box>
      <Flex gap="8">
        <TodosTotalCard />
        <DashboardTotalCard
          title="Total Items (from erpnext)"
          total={props.item.total}
        />
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (!authenticated) {
    return {
      props: {
        ...translateProps,
      },
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/todos")}`,
        permanent: false,
      },
    };
  }

  const itemCount = await frappeServerDB.getCount("Item");

  return {
    props: {
      ...translateProps,
      item: {
        total: itemCount,
      },
    },
  };
};

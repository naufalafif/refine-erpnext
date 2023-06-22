import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useShow, useTranslate } from "@refinedev/core";
import { Show, NumberField, DateField, TextField } from "@refinedev/chakra-ui";
import { Heading } from "@chakra-ui/react";

import { authProvider } from "src/authProvider";

export default function () {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm" mt={4}>
        {translate("todos.fields.id")}
      </Heading>
      <NumberField value={record?.id ?? ""} />
      <Heading as="h5" size="sm" mt={4}>
        {translate("todos.fields.created_at")}
      </Heading>
      <DateField value={record?.created_at} />
      <Heading as="h5" size="sm" mt={4}>
        {translate("todos.fields.title")}
      </Heading>
      <TextField value={record?.title} />
      <Heading as="h5" size="sm" mt={4}>
        {translate("todos.fields.description")}
      </Heading>
      <TextField value={record?.description} />
    </Show>
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

  return {
    props: {
      ...translateProps,
    },
  };
};

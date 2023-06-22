import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { useTranslate } from "@refinedev/core";
import { Edit } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

import { authProvider } from "src/authProvider";

export default function () {
  const translate = useTranslate();
  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    resetField,
    formState: { errors },
  } = useForm();

  const todosData = queryResult?.data?.data;

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!(errors as any)?.id}>
        <FormLabel>{translate("todos.fields.id")}</FormLabel>
        <Input
          disabled
          type="number"
          {...register("id", {
            required: "This field is required",
            valueAsNumber: true,
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.id?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!(errors as any)?.created_at}>
        <FormLabel>{translate("todos.fields.created_at")}</FormLabel>
        <Input
          {...register("created_at", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.created_at?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!(errors as any)?.title}>
        <FormLabel>{translate("todos.fields.title")}</FormLabel>
        <Input
          type="text"
          {...register("title", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.title?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!(errors as any)?.description}>
        <FormLabel>{translate("todos.fields.description")}</FormLabel>
        <Input
          type="text"
          {...register("description", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.description?.message as string}
        </FormErrorMessage>
      </FormControl>
    </Edit>
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

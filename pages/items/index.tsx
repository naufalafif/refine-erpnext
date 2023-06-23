import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";

import { authProvider } from "src/authProvider";
import { frappeServerDB } from "src/utility";

export default function (props: any) {
  return (
    <Box>
      <Flex gap="7">
        {props.item.data.map((item: any, index: number) => (
          <Card key={index}>
            <CardBody>
              <HStack>
                <Text fontSize="md" color="gray.500">
                  Item
                </Text>
                <Heading>{item.name}</Heading>
              </HStack>
            </CardBody>
          </Card>
        ))}
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
        destination: `${redirectTo}?to=${encodeURIComponent("/items")}`,
        permanent: false,
      },
    };
  }

  const itemList = await frappeServerDB.getDocList("Item");

  return {
    props: {
      ...translateProps,
      item: {
        data: itemList,
      },
    },
  };
};

import { Card, CardBody } from "@chakra-ui/card";
import { Box, Heading, Text } from "@chakra-ui/layout";

export const DashboardTotalCard = ({
  title,
  total,
}: {
  title: string;
  total: number;
}) => {
  return (
    <Card px="10">
      <CardBody>
        <Heading size="sm" fontWeight="semibold" color="gray.900">
          {title}
        </Heading>
        <Box textAlign="center" mt="3">
          <Text fontSize="3xl" fontWeight="bold">
            {total}
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
};

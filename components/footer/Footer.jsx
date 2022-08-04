import { Grid, Text, Divider } from "@nextui-org/react";

export const Footer = () => {
  return (
    <>
      <Divider />
      <Grid.Container gap={2} justify="center">
        <Grid xs={4} justify="start">
          <Text>copyright leets 2022</Text>
        </Grid>
        <Grid xs={4} justify="center">
          <Text>
            Made with {"<3"} by federica alderighi and edvaldo gjonikaj
          </Text>
        </Grid>
        <Grid xs={4} justify="end">
          <Text>
            For support contact:{" "}
            <a href="mailto:edvaldogjonikaj@gmail.com">leets</a>
          </Text>
        </Grid>
      </Grid.Container>
    </>
  );
};

import { Grid, Text, Divider } from "@nextui-org/react";
import { Heart, Heart2 } from "react-iconly";

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
            Made with <Heart2 /> by{" "}
            <a href="https://www.linkedin.com/in/federica-alderighi-b712a9188/">
              Federica
            </a>{" "}
            ,{" "}
            <a href="https://www.linkedin.com/in/edvaldo-g-20a271121/">
              Edvaldo
            </a>{" "}
            and
            <a href="https://www.linkedin.com/in/mattia-pomelli-b857511b1/">
              Mattia
            </a>
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

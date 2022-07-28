import React from "react";
import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import { Player } from "../mini-player/Player";
import { HeartIcon } from "../assets/HeartIcon";

export const MainCard = () => {
  // TODO check if is already liked by the user
  const [isLiked, setIsLiked] = React.useState(false);
  return (
    <Card css={{ w: "100%", h: "400px", maxW: "50%" }}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
            Tutti fenomeni
          </Text>
          <Text h3 color="white">
            Il grande Modugno
          </Text>
        </Col>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src="https://i.scdn.co/image/ab67616d0000b273c8164ffac09ce0144ad66ecc"
          objectFit="cover"
          width="100%"
          height="100%"
          alt="Relaxing app background"
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#0f111466",
          borderTop: "$borderWeights$light solid $gray800",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row justify="space-between" align="center">
          <Player />
          <Button
            onClick={() => setIsLiked(!isLiked)}
            auto
            color="error"
            icon={<HeartIcon fill="currentColor" filled={isLiked} />}
          >
            450
          </Button>
        </Row>
      </Card.Footer>
    </Card>
  );
};

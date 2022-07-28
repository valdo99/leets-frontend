import React from "react";
import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import { Player } from "../mini-player/Player";
import { HeartIcon } from "../assets/HeartIcon";
import { FaSpotify } from "react-icons/fa";
import PropTypes from "prop-types";

export const MainCard = ({
  spotifyId,
  artistName,
  trackTitle,
  postImage,
  likeCount,
  previewTrackUrl,
}) => {
  // TODO check if is already liked by the user
  const [isLiked, setIsLiked] = React.useState(false);
  return (
    <Card
      css={{
        "@mdMax": { h: "350px", maxW: "320px", minWidth: "300px" },
        "@lgMax": { h: "350px", maxW: "500px", minWidth: "300px" },
      }}
    >
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Row justify="space-between">
          <Col>
            <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
              {artistName}
            </Text>
            <Text h3 color="white">
              {trackTitle}
            </Text>
          </Col>
          <Text>
            <Button
              onClick={() =>
                window
                  .open(
                    "https://open.spotify.com/track/".concat(spotifyId),
                    "_blank"
                  )
                  .focus()
              }
              css={{ bgColor: "#1cb050" }}
              auto
              icon={<FaSpotify size={32} />}
            ></Button>
          </Text>
        </Row>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={postImage}
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
          <Player previewTrackUrl={previewTrackUrl} />
          <Button
            onClick={() => setIsLiked(!isLiked)}
            auto
            color="error"
            icon={<HeartIcon fill="currentColor" filled={isLiked} />}
          >
            {likeCount && likeCount}
          </Button>
        </Row>
      </Card.Footer>
    </Card>
  );
};

MainCard.propTypes = {
  spotifyId: PropTypes.string,

  artistName: PropTypes.string,

  trackTitle: PropTypes.string,

  postImage: PropTypes.string,

  likeCount: PropTypes.number,

  previewTrackUrl: PropTypes.string,
};

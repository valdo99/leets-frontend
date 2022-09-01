import React from "react";
import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import { Player } from "../player/Player";
import { HeartIcon } from "../assets/HeartIcon";
import { FaSpotify } from "react-icons/fa";
import PropTypes from "prop-types";
import LikeButton from "@components/likeButton/LikeButton";

export const MainCard = ({
  id,
  spotifyId,
  artistName,
  trackTitle,
  postImage,
  likeCount,
  isLiked,
  previewTrackUrl,
}) => {
  return (
    <Card
      css={{
        "@mdMax": { h: "250px", maxW: "320px", minWidth: "300px" },
        "@lgMax": { h: "200px", maxW: "500px", minWidth: "300px" },
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
            {previewTrackUrl && (
              <FaSpotify
                onClick={() =>
                  window
                    .open(
                      "https://open.spotify.com/track/".concat(spotifyId),
                      "_blank"
                    )
                    .focus()
                }
                size={32}
              />
            )}
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
          backdropFilter: "none",
          height: "60px",
        }}
      >
        <Row justify="space-between" align="center">
          {previewTrackUrl && (
            <Player size={3} id={spotifyId} previewTrackUrl={previewTrackUrl} />
          )}
          {!previewTrackUrl && (
            <Button
              onClick={() =>
                window
                  .open(
                    "https://open.spotify.com/track/".concat(spotifyId),
                    "_blank"
                  )
                  .focus()
              }
              css={{
                bgColor: "#1cb050",
                pl: "$5",
                ml: "$5",
                mt: "$5",
              }}
              icon={<FaSpotify size={24} />}
            >
              <Text css={{ pl: "$10" }}>Listen on Spotify</Text>
            </Button>
          )}
          <LikeButton
            size="small"
            id={id}
            likes={likeCount}
            isLiked={isLiked}
            isMobile={true}
          />
        </Row>
      </Card.Footer>
    </Card>
  );
};

MainCard.propTypes = {
  id: PropTypes.string.isRequired,

  spotifyId: PropTypes.string,

  artistName: PropTypes.string,

  trackTitle: PropTypes.string,

  postImage: PropTypes.string,

  likeCount: PropTypes.number,

  isLiked: PropTypes.bool,

  previewTrackUrl: PropTypes.string,
};

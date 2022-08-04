import React from "react";
import { Col, Image, Row, Button, Text } from "@nextui-org/react";
import { Player } from "../mini-player/Player";
import { HeartIcon } from "../assets/HeartIcon";
import { FaSpotify } from "react-icons/fa";
import PropTypes from "prop-types";
import LikeButton from "@components/likeButton/LikeButton";

export const FlatCard = ({
  id,
  position,
  spotifyId,
  artistName,
  trackTitle,
  postImage,
  likeCount,
  isLiked,
  previewTrackUrl,
}) => {
  return (
    <Row
      justify="space-between"
      align="center"
      css={{
        height: "100px",
        my: "$10",
      }}
    >
      <Row
        justify="start"
        align="center"
        css={{
          maxW: "80%",
        }}
      >
        <Image
          css={{ borderRadius: "$base" }}
          src={postImage}
          objectFit="cover"
          width="200px"
          height="100%"
          alt="Relaxing app background"
        />
        <Col dir="column" css={{ px: "$3" }}>
          <Text
            css={{ pl: "$5" }}
            size={12}
            weight="bold"
            transform="uppercase"
            color="#9E9E9E"
          >
            {artistName}
          </Text>
          <Row align="center">
            <Text css={{ pl: "$5" }} h3 color="white">
              {trackTitle}
            </Text>
            {previewTrackUrl && (
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
                  ml: "$3",
                  w: "auto",
                  h: "auto",
                  p: "$2",
                }}
                auto
                icon={<FaSpotify size={24} />}
              ></Button>
            )}
          </Row>
          {previewTrackUrl && (
            <Player id={spotifyId} previewTrackUrl={previewTrackUrl} />
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
        </Col>
      </Row>

      <LikeButton id={id} likes={likeCount} isLiked={isLiked} />
    </Row>
  );
};

FlatCard.propTypes = {
  spotifyId: PropTypes.string,

  artistName: PropTypes.string,

  trackTitle: PropTypes.string,

  postImage: PropTypes.string,

  likeCount: PropTypes.number,

  previewTrackUrl: PropTypes.string,
};

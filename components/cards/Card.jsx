import React from "react";
import { Col, Row, Button, Text } from "@nextui-org/react";
import LikeButton from "@components/likeButton/LikeButton";
import { Player } from "../player/Player";
import { FaSpotify } from "react-icons/fa";
import styles from "./card.module.css";

export const Card = ({
  position,
  spotifyId,
  artistName,
  trackTitle,
  postImage,
  likeCount,
  previewTrackUrl,
  id,
  isLiked,
  image = true,
}) => {
  return (
    <div className={styles.cardContainer}>
      {image && (
        <div className={styles.imageColumnContainer}>
          <img src={postImage}></img>
        </div>
      )}
      <Row
        justify="start"
        align="center"
        css={{
          maxW: "80%",
        }}
      >
        <Col dir="column" css={{ px: "$3" }}>
          <Text
            css={{ pl: "$5" }}
            size={12}
            weight="bold"
            transform="uppercase"
            color="#050e1d"
          >
            {artistName}
          </Text>
          <Row align="center">
            <Text
              css={{ pl: "$5", lineHeight: "20px", pt: 10, pb: 15 }}
              h3
              color="#050e1d"
            >
              {trackTitle}
            </Text>
            {/* {previewTrackUrl && (
              <SpotifyDiv>
                <FaSpotify
                  onClick={() =>
                    window
                      .open(
                        "https://open.spotify.com/track/".concat(spotifyId),
                        "_blank"
                      )
                      .focus()
                  }
                  size={24}
                />
              </SpotifyDiv>
            )} */}
          </Row>
          {previewTrackUrl && (
            <Player id={spotifyId} size={3} previewTrackUrl={previewTrackUrl} />
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
    </div>
  );
};

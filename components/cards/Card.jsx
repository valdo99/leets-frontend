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
      {image && <img className={styles.cardImageCover} src={postImage}></img>}
      <div className={styles.spotifyLink}>
        <FaSpotify
          color="#050e1d"
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
      </div>

      <Row
        justify="start"
        align="center"
        css={{
          maxW: "80%",
        }}
      >
        <Col dir="column" css={{ px: "$3" }}>
          <Text
            css={{ pl: "$6", letterSpacing: "$wider" }}
            size={12}
            weight="bold"
            transform="uppercase"
            color="$background"
          >
            {artistName}
          </Text>
          <Row align="center">
            <Text
              css={{
                pl: "$6",
                lineHeight: "20px",
                pt: 4,
                pb: 10,
                letterSpacing: "$tight",
              }}
              h3
              weight="bold"
              color="$background"
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
            <Row css={{ pl: "$5" }}>
              <Player
                id={spotifyId}
                size={3}
                previewTrackUrl={previewTrackUrl}
              />
            </Row>
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
                bgColor: "$textSecondary",
                pl: "$6",
                ml: "$6",
                mt: "$6",
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

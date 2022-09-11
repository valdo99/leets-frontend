import { useApiClient } from "@providers/AuthProvider";
import useFetch from "hooks/useFetch";
import useScreenSize from "hooks/useScreenSize";
import React, { useEffect, useState } from "react";
import { Container, Loading, Row, Text } from "@nextui-org/react";
import { useAtom } from "jotai";
import { userAtom } from "state/user";
import { Card } from "@components/cards/Card";

export const Feed = ({}) => {
  const [user] = useAtom(userAtom);
  const size = useScreenSize();
  const apiClient = useApiClient();
  const [reload, setReload] = useState(false);
  const { data: posts, loading } = useFetch(
    () =>
      apiClient.posts.feed({ year: 2022, week: 32 }).then((data) => data.data),
    [reload]
  );

  useEffect(() => {
    setReload(!reload);
  }, [user]);

  return (
    <Row
      css={{
        pt: "$10",
        pb: "$20",
        d: "flex",
        gap: "$20",
        "@mdMax": { flexDirection: "column" },
      }}
    >
      <Container css={{ px: "$0", flex: 1 }}>
        <Text
          size={28}
          weight="bold"
          css={{ mb: "$8", mt: "$10", letterSpacing: "$tight" }}
        >
          This week&apos;s top songs
        </Text>
        {loading ? (
          <Row justify="center" css={{ py: "30%" }}>
            <Loading color="secondary" />
          </Row>
        ) : (
          posts.map((post, index) => {
            return (
              <Container key={post._id} css={{ py: "$5", px: "$0" }}>
                <Card
                  position={index}
                  spotifyId={post.spotify_id}
                  artistName={post.artist.name}
                  trackTitle={post.title}
                  postImage={post.image}
                  likeCount={post.likes}
                  previewTrackUrl={post?.preview_url}
                  id={post._id}
                  isLiked={post.isLiked}
                />
              </Container>
            );
          })
        )}
      </Container>
      <Container css={{ "@md": { w: "340px" }, px: "$0" }}>
        <Text
          size={28}
          weight="bold"
          css={{ mb: "$8", mt: "$10", letterSpacing: "$tight" }}
        >
          Past weeks
        </Text>
      </Container>
    </Row>
  );
};

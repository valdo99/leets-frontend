import { useApiClient } from "@providers/AuthProvider";
import useFetch from "hooks/useFetch";
import React, { useEffect, useState } from "react";
import { Container, Loading, Row } from "@nextui-org/react";
import { FlatCard } from "@components/cards/FlatCard";
import useScreenSize from "hooks/useScreenSize";
import { MainCard } from "@components/cards/Card";
import { useAtom } from "jotai";
import { userAtom } from "state/user";

export const Feed = ({}) => {
  const [user] = useAtom(userAtom);
  const size = useScreenSize();
  const apiClient = useApiClient();
  const [reload, setReload] = useState(false);
  const { data: posts, loading } = useFetch(
    () => apiClient.posts.feed().then((data) => data.data),
    [reload]
  );

  useEffect(() => {
    setReload(!reload);
  }, [user]);

  return (
    <Container css={{ py: "$10", px: "$7" }}>
      {loading ? (
        <Row justify="center" css={{ py: "30%" }}>
          <Loading color="secondary" />
        </Row>
      ) : (
        posts.map((post, index) => {
          return (
            <Container key={post._id} css={{ py: "$5", px: "$0" }}>
              {size.width >= 780 ? (
                <FlatCard
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
              ) : (
                <MainCard
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
              )}
            </Container>
          );
        })
      )}
    </Container>
  );
};

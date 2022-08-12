import React from "react";
import { Col, Button, Text } from "@nextui-org/react";

import { HeartIcon } from "../assets/HeartIcon";

import { useApiClient } from "@providers/AuthProvider";
import { useAtom } from "jotai";
import { userAtom } from "state/user";
import useDebounce from "hooks/useDebounce";
import { loginModalAtom } from "state/loginModal";

export const LikeButton = ({
  isLiked,
  likes: totalLikes,
  id,
  isMobile = true,
}) => {
  const [{ user }, setUser] = useAtom(userAtom);
  const [, setVisible] = useAtom(loginModalAtom);
  const [hasLiked, setHasLiked] = React.useState(isLiked);
  const [likes, setLikes] = React.useState(totalLikes);
  const apiClient = useApiClient();

  const handleClick = useDebounce(async () => {
    if (hasLiked) {
      await apiClient.posts.like(id);
    } else {
      await apiClient.posts.unlike(id);
    }
  }, 500);

  return (
    <Button
      size={isMobile ? "sm" : "lg"}
      onClick={() => {
        if (user) {
          handleClick();
          setHasLiked(!hasLiked);
          if (hasLiked) {
            setLikes(likes - 1);
          } else {
            setLikes(likes + 1);
          }
        } else {
          setVisible(true);
        }
      }}
      auto
      css={{ h: "auto", lineHeight: 0, py: "$5" }}
      color="primary"
      icon={
        isMobile && (
          <HeartIcon size={30} fill="currentColor" filled={hasLiked} />
        )
      }
    >
      {isMobile ? (
        <Text css={{ fontWeight: "$extrabold", fontSize: "$lg" }} color="white">
          {likes && likes}
        </Text>
      ) : (
        <Col dir="column">
          <Col size={30} fill="currentColor" filled={hasLiked} />
          <HeartIcon size={30} fill="currentColor" filled={hasLiked} />
          <Text
            css={{ fontWeight: "$extrabold", fontSize: "$lg" }}
            color="white"
          >
            {likes && likes}
          </Text>
        </Col>
      )}
    </Button>
  );
};

LikeButton.propTypes = {};

export default LikeButton;

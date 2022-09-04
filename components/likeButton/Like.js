import React from "react";
import { Col, Button, Text } from "@nextui-org/react";

import Heart from "../assets/heart";

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

    return(
        <>
        <Heart />
        </>
    )


}
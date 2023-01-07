import { useMutation } from "@tanstack/react-query";
import cx from "classnames";
import Link from "next/link";
import React, { useState } from "react";

import { Song } from "@api/songs";
import { SongLikesModal } from "@components/Modals/SongLikesModal";
import HeartOutline from "@icons/heart-outline.svg";
import HeartSolid from "@icons/heart-solid.svg";
import { useApiClient, useUser } from "@providers/AuthProvider";

interface LikeButtonProps {
  song: Song;
  showCount?: boolean;
  onSuccess?: () => void;
  className?: string;
}

export const LikeButton = ({
  song,
  onSuccess,
  showCount = true,
  className,
}: LikeButtonProps) => {
  const apiClient = useApiClient();
  const { user } = useUser();
  const [showUserLikesModal, setShowUserLikesModal] = useState(false);

  const { mutate: likeSong } = useMutation(
    () => apiClient.songs.like(song._id),
    {
      onSuccess,
    }
  );

  const { mutate: unlikeSong } = useMutation(
    () => apiClient.songs.unlike(song._id),
    {
      onSuccess,
    }
  );

  const toggleLike = () => {
    song.isLiked ? unlikeSong() : likeSong();
  };

  return (
    <div
      className={cx("flex cursor-pointer items-center space-x-1", className)}
    >
      {user ? (
        <button onClick={toggleLike} className="cursor-pointer">
          {song.isLiked ? (
            <HeartSolid className="text-2xl" />
          ) : (
            <HeartOutline className="text-2xl" />
          )}
        </button>
      ) : (
        <Link href="/signup">
          <a>
            <HeartOutline className="text-2xl" />
          </a>
        </Link>
      )}

      {showCount && (
        <span onClick={() => setShowUserLikesModal(true)} className="text-lg">
          {song.likes}
        </span>
      )}

      {showUserLikesModal && (
        <SongLikesModal
          show={showUserLikesModal}
          onClose={() => setShowUserLikesModal(false)}
          songId={song._id}
        />
      )}
    </div>
  );
};

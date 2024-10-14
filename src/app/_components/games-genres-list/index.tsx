"use client";

import { api } from "~/trpc/react";

export default function VideoGameGenresList({
  genres,
}: {
  genres: { id: string }[];
}) {
  const { data: videoGameGenresMap } = api.videoGame.getGenres.useQuery();

  if (!videoGameGenresMap) return null;
  return (
    <>
      {genres
        .map((genres) => videoGameGenresMap[genres.id]?.name)
        .filter(Boolean)
        .join(", ")}
    </>
  );
}

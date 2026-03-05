import styled from "@emotion/native";
import { FlatList } from "react-native";

import { usePlayer } from "#modules/player/hooks/usePlayer";
import { TrackListItem } from "#modules/tracks/components/TrackListItem.component";
import { Track } from "#modules/tracks/domain/track.types";

export const TrackList = ({ tracks }: { tracks: Track[] }) => {
  const { loadPlaylist, currentTrack } = usePlayer();

  return (
    <FlatList
      data={tracks}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={<Divider />}
      renderItem={({ item, index }) => (
        <TrackListItem
          track={item}
          isActive={currentTrack?.id === item.id}
          onPress={() => loadPlaylist(tracks, index)}
        />
      )}
    />
  );
};

const Divider = styled.View(({ theme }) => ({
  height: 1,
  backgroundColor: theme.colors.gray,
}));

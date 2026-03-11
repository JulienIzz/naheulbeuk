import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";
import { FlatList } from "react-native";

import { Typography } from "#design-system/typography/Typography";
import { SoundButton } from "#modules/soundboard/components/SoundButton.component";
import { useSoundPlayer } from "#modules/soundboard/hooks/useSoundPlayer";
import type { Track } from "#modules/tracks/domain/track.types";
import { useSoundboardClips } from "#modules/tracks/hooks/useSoundboardClips";
import { BaseScreen } from "#shared/components/BaseScreen";

const NUM_COLUMNS = 3;

type Section = {
  title: string;
  data: Track[];
};

type SectionRow =
  | { type: "header"; title: string; key: string }
  | { type: "row"; items: Track[]; key: string };

const extractCategory = (clip: Track): string => {
  const match = /soundboard\/([^/]+)\//.exec(clip.audioUrl);
  return match?.[1] ?? "other";
};

const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);

const groupClipsIntoSections = (clips: Track[]): Section[] => {
  const groups = new Map<string, Track[]>();

  for (const clip of clips) {
    const category = extractCategory(clip);
    const existing = groups.get(category);
    if (existing) {
      existing.push(clip);
    } else {
      groups.set(category, [clip]);
    }
  }

  return Array.from(groups.entries()).map(([title, data]) => ({
    title: capitalize(title),
    data,
  }));
};

const buildRows = (sections: Section[]): SectionRow[] => {
  const rows: SectionRow[] = [];

  for (const section of sections) {
    rows.push({
      type: "header",
      title: section.title,
      key: "header-" + section.title,
    });

    for (let i = 0; i < section.data.length; i += NUM_COLUMNS) {
      const items = section.data.slice(i, i + NUM_COLUMNS);
      rows.push({
        type: "row",
        items,
        key: items.map((item) => item.id).join("-"),
      });
    }
  }

  return rows;
};

export const SoundboardScreen = () => {
  const { t } = useLingui();

  return (
    <BaseScreen title={t`Soundboard`} withBackButton>
      <SoundboardScreenContent />
    </BaseScreen>
  );
};

const SoundboardScreenContent = () => {
  const { data: clips } = useSoundboardClips();
  const { playSound } = useSoundPlayer();
  const theme = useTheme();

  const rows = useMemo(() => buildRows(groupClipsIntoSections(clips)), [clips]);

  const contentContainerStyle = useMemo(
    () => ({
      padding: theme.spacing.xl,
      gap: theme.spacing.l,
    }),
    [theme],
  );

  return (
    <FlatList
      data={rows}
      keyExtractor={(item) => item.key}
      contentContainerStyle={contentContainerStyle}
      renderItem={({ item }) =>
        item.type === "header" ? (
          <SectionHeaderContainer>
            <Typography
              variant="H2"
              text={item.title}
              color={theme.colors.secondary}
            />
          </SectionHeaderContainer>
        ) : (
          <Row items={item.items} onPress={playSound} />
        )
      }
    />
  );
};

const Row = ({
  items,
  onPress,
}: {
  items: Track[];
  onPress: (_clip: Track) => void;
}) => {
  return (
    <RowContainer>
      {items.map((clip) => (
        <SoundButton key={clip.id} clip={clip} onPress={onPress} />
      ))}
      {items.length < NUM_COLUMNS && <Spacer />}
    </RowContainer>
  );
};

const SectionHeaderContainer = styled.View(({ theme }) => ({
  paddingTop: theme.spacing.m,
  paddingBottom: theme.spacing.xs,
}));

const RowContainer = styled.View(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing.l,
}));

const Spacer = styled.View({ flex: 1 });

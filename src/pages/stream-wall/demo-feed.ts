/**
 * Local demo feed used in development when `/api/live` is unreachable, so the
 * wall is inspectable without the plugin running. Thumbnails are intentionally
 * omitted — tiles fall back to the generated CSS "screen" surface rather than
 * pulling random stock imagery.
 */
import type { LiveFeed } from "@/api/live-feed";

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

export function createDemoFeed(): LiveFeed {
  return {
    updatedAt: new Date().toISOString(),
    streamers: [
      {
        playerName: "RedstoneRhea",
        provider: "twitch",
        channel: "redstonerhea",
        url: "https://twitch.tv/redstonerhea",
        title: "Building a fully automatic villager trading hall",
        viewerCount: 1284,
        liveSince: minutesAgo(96),
        embed: { kind: "twitch", channel: "redstonerhea" },
      },
      {
        playerName: "Cavebound",
        provider: "youtube",
        channel: "@cavebound",
        url: "https://youtube.com/watch?v=jfKfPfyJRdk",
        title: "Hardcore #41 — into the deep dark, no armor",
        viewerCount: 612,
        liveSince: minutesAgo(38),
        embed: { kind: "youtube-video", videoId: "jfKfPfyJRdk" },
      },
      {
        playerName: "miravale",
        provider: "twitch",
        channel: "miravale",
        url: "https://twitch.tv/miravale",
        title: "cozy SMP night · base decorating + chill",
        viewerCount: 207,
        liveSince: minutesAgo(12),
        embed: { kind: "twitch", channel: "miravale" },
      },
      {
        playerName: "BastionByte",
        provider: "youtube",
        channel: "@bastionbyte",
        url: "https://youtube.com/@bastionbyte",
        title: "PvP practice — crystal & sword",
        viewerCount: 95,
        liveSince: minutesAgo(54),
        // Channel-only: no concrete video id, exercises the channel embed path.
        embed: {
          kind: "youtube-channel",
          channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
        },
      },
      {
        playerName: "tinkerfox",
        provider: "twitch",
        channel: "tinkerfox",
        url: "https://twitch.tv/tinkerfox",
        title: "create mod contraptions, viewer builds welcome",
        viewerCount: 33,
        liveSince: minutesAgo(7),
        embed: { kind: "twitch", channel: "tinkerfox" },
      },
    ],
  };
}

import { ArrowLeft, ExternalLink } from "lucide-react";
import { useMemo } from "react";

import { buildEmbedTarget } from "@/api/embeds";
import type { LiveStreamer } from "@/api/live-feed";
import { AppButton } from "@/components/app/app-button";
import { AppIconButton } from "@/components/app/app-icon-button";
import { ProviderGlyph, providerLabel } from "@/components/app/provider-glyph";
import { TallyLight } from "@/pages/stream-wall/tally-light";

interface StreamEmbedProps {
  streamer: LiveStreamer;
  onBack: () => void;
}

/**
 * Fullscreen player for a single opened stream. Loads the real Twitch / YouTube
 * iframe and floats a back control over it. When no inline embed is possible
 * (e.g. a YouTube channel with no known live video id), it degrades to a clear
 * provider link instead of a broken frame. Video is never proxied — the iframe
 * points straight at the provider.
 */
export function StreamEmbed({ streamer, onBack }: StreamEmbedProps) {
  const target = useMemo(
    () => buildEmbedTarget(streamer.embed),
    [streamer.embed],
  );

  return (
    <div className="absolute inset-0 z-30 bg-black">
      {target.iframeSrc ? (
        <iframe
          key={streamer.playerName}
          title={`${streamer.playerName} on ${providerLabel(streamer.provider)}`}
          src={target.iframeSrc}
          className="size-full border-0"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <LinkFallback streamer={streamer} />
      )}

      {/* Floating back control — returns to the wall. */}
      <div className="absolute top-[max(1rem,env(safe-area-inset-top))] left-[max(1rem,env(safe-area-inset-left))] z-10">
        <AppIconButton
          label="Back to wall"
          onClick={onBack}
          tooltipSide="right"
        >
          <ArrowLeft />
        </AppIconButton>
      </div>

      {/* Floating identity — reads like a station ident, no boxed card. */}
      <div className="pointer-events-none absolute top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-10 flex max-w-[calc(100vw-5.5rem)] items-center gap-2.5 rounded-full bg-black/45 px-3.5 py-2 backdrop-blur-md">
        <TallyLight />
        <span className="truncate text-sm font-semibold text-white">
          {streamer.playerName}
        </span>
        <ProviderGlyph
          provider={streamer.provider}
          className={
            streamer.provider === "twitch"
              ? "size-4 text-twitch"
              : "size-4 text-youtube"
          }
        />
      </div>
    </div>
  );
}

function LinkFallback({ streamer }: { streamer: LiveStreamer }) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-6 px-6 text-center">
      <ProviderGlyph
        provider={streamer.provider}
        className={
          streamer.provider === "twitch"
            ? "size-12 text-twitch"
            : "size-12 text-youtube"
        }
      />
      <div className="space-y-2">
        <p className="text-lg font-semibold text-white">
          {streamer.playerName} is live on {providerLabel(streamer.provider)}
        </p>
        <p className="type-mono-label text-white/50">
          No inline player available for this channel
        </p>
      </div>
      <AppButton asChild>
        <a href={streamer.url} target="_blank" rel="noreferrer noopener">
          Watch on {providerLabel(streamer.provider)}
          <ExternalLink />
        </a>
      </AppButton>
    </div>
  );
}

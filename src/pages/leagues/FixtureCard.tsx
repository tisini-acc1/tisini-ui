"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Diamond, Goal } from "lucide-react";
import { Fixture, RefData } from "@/lib/types/leagues";
// import { useRouter } from "next/navigation";

const FixtureCard = ({ fixture }: { fixture: Fixture }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasRefData = fixture.refdata && fixture.refdata.length > 0;
  // const router = useRouter();

  const hLogo = fixture.team1_logo === "" ? null : fixture.team1_logo;
  const aLogo = fixture.team2_logo === "" ? null : fixture.team2_logo;

  // console.log(fixture);

  return (
    <>
      <div
        className={`grid grid-cols-12 py-3 px-2 font-mono text-xs items-center hover:bg-green-900 transition-colors cursor-pointer`}
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        {/* Date and Time - New left column */}
        <div className="col-span-2 flex flex-col items-start justify-center">
          <p className="text-xs">
            {new Date(fixture.game_date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>

          {fixture.game_status === "notstarted" ? (
            <p className="text-xs font-semibold">{fixture.matchtime}</p>
          ) : fixture.game_status === "FT" ? (
            <p className="text-xs text-muted-foreground capitalize">
              {"ended"}
            </p>
          ) : (
            <p className="text-xs text-primary capitalize">
              live <span className="animate-caret-blink">{fixture.minute}</span>
            </p>
          )}
        </div>

        {/* Team 1 - Reduced column span */}
        <div className="col-span-3 flex items-center justify-end gap-2">
          <div className="text-end text-xs">{fixture.team1_name}</div>
          <div className="w-8 h-8 relative shrink-0">
            <img
              src={hLogo ?? "/homeLogo.png"}
              alt={fixture.team1_name}
              height={32}
              width={32}
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        {/* Match status */}
        <div className="col-span-2 flex flex-col items-center justify-center">
          {fixture.matchplay_status === "3" ? (
            <p className="text-sm font-semibold text-muted-foreground">
              Postponed
            </p>
          ) : fixture.matchplay_status === "1" ? (
            <>
              <p className="text-xs font-semibold">
                {fixture.home_score} - {fixture.away_score}
              </p>
              <p className="text-xs text-muted-foreground">Abandoned</p>
            </>
          ) : fixture.game_status === "notstarted" ? (
            <p className="text-xs text-muted-foreground capitalize">vs</p>
          ) : (
            <>
              <p className="text-xs font-semibold">
                {fixture.home_score} - {fixture.away_score}
              </p>
            </>
          )}
        </div>

        {/* Team 2 - Reduced column span */}
        <div className="col-span-4 flex items-center gap-2">
          <div className="w-8 h-8 relative shrink-0">
            <img
              src={aLogo ?? "/awayLogo.png"}
              alt={fixture.team2_name}
              height={32}
              width={32}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="text-xs">{fixture.team2_name}</div>
        </div>

        {hasRefData && (
          <div className="col-span-1 flex justify-center mt-2">
            <button
              className="text-primary hover:text-primary/80 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
        )}
      </div>

      {isExpanded && hasRefData && (
        <div className="bg-background/90 p-4 animate-accordion-down">
          {/* Tries Section */}
          <EventSection
            title="Tries"
            icon={<Goal className="h-4 w-4" />}
            eventType="Score"
            subEventType="Try"
            fixture={fixture}
            eventClassName="text-primary"
            badgeClassName="bg-primary/10 text-primary"
          />
          {/* Conversions Section */}
          <EventSection
            title="Conversions"
            icon={<Diamond className="h-4 w-4" />}
            eventType="Score"
            subEventType="Successful Conversion"
            fixture={fixture}
            eventClassName="text-accent"
            badgeClassName="bg-accent/10 text-accent"
          />

          {/* Cards Section */}
          {/* <EventSection
            title="Cards"
            icon={<ChartNoAxesGanttIcon className="h-4 w-4" />}
            eventType="Card" // Changed from "Score"
            subEventType={["Yellow Card", "Red Card"]} // Now accepts an array
            fixture={fixture}
            eventClassName="text-accent"
            renderBadge={(event) => (
              <span
                className={`text-xs px-1.5 py-0.5 rounded ${
                  event.sub_event_name === "Red Card"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-accent/10 text-accent"
                }`}
              >
                {event.sub_event_name}
              </span>
            )}
          /> */}
        </div>
      )}
    </>
  );
};

interface EventSectionProps {
  title: string;
  icon: React.ReactNode;
  eventType: string;
  subEventType: string | string[];
  fixture: Fixture;
  eventClassName?: string;
  badgeClassName?: string;
  renderBadge?: (event: RefData) => React.ReactNode;
}

const EventSection = ({
  title,
  icon,
  eventType,
  subEventType,
  fixture,
  eventClassName,
  badgeClassName,
  renderBadge,
}: EventSectionProps) => (
  <div className={title === "Tries" ? "mb-6" : ""}>
    <h4
      className={`flex items-center justify-center gap-2 text-sm text-primary font-semibold mb-3 ${eventClassName}`}
    >
      {icon}
      {title}
    </h4>
    <div className="grid grid-cols-2 gap-4">
      {/* Home Team */}
      <TeamEvents
        events={fixture.refdata.filter(
          (event) =>
            event.event_name === eventType &&
            (Array.isArray(subEventType)
              ? subEventType.includes(event.sub_event_name)
              : event.sub_event_name === subEventType) &&
            event.team_id === fixture.team1_id
        )}
        badgeClassName={badgeClassName}
        renderBadge={renderBadge}
      />

      {/* Away Team */}
      <TeamEvents
        events={fixture.refdata.filter(
          (event) =>
            event.event_name === eventType &&
            (Array.isArray(subEventType)
              ? subEventType.includes(event.sub_event_name)
              : event.sub_event_name === subEventType) &&
            event.team_id === fixture.team2_id
        )}
        badgeClassName={badgeClassName}
        renderBadge={renderBadge}
      />
    </div>
  </div>
);

interface TeamEventsProps {
  events: RefData[];
  badgeClassName?: string;
  renderBadge?: (event: RefData) => React.ReactNode; // Add this line
}

const TeamEvents = ({
  events,
  badgeClassName,
  renderBadge, // Add this to destructuring
}: TeamEventsProps) => (
  <div className="space-y-2 border p-2 rounded-sm">
    {events.length === 0 ? (
      <div className="text-sm text-muted-foreground text-center">None</div>
    ) : (
      events.map((event, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <span className="font-medium w-6 text-right">
            {event.minute}&apos;
          </span>
          <span className="flex-1 truncate">{event.player_name.trim()}</span>
          {event.sub_event_name !== "Try" &&
            (renderBadge ? (
              renderBadge(event)
            ) : (
              <span
                className={`hidden md:block text-xs px-1.5 py-0.5 rounded ${badgeClassName}`}
              >
                {event.sub_event_name.replace("Successful ", "")}
              </span>
            ))}
        </div>
      ))
    )}
  </div>
);

export default FixtureCard;

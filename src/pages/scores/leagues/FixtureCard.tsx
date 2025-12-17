"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Diamond, Goal } from "lucide-react";

import homeImg from "@/assets/homeLogo.png";
import awayImg from "@/assets/awayLogo.png";
import { Fixture, RefData } from "@/lib/types/leagues";
import { teamImages } from "@/lib/constants/site_images";

const FixtureCard = ({ fixture }: { fixture: Fixture }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasRefData = fixture.refdata && fixture.refdata.length > 0;

  const homeLogo = teamImages[fixture.team1_id] ?? homeImg;
  const awayLogo = teamImages[fixture.team2_id] ?? awayImg;
  //   const hLogo = fixture.team1_logo === "" ? null : fixture.team1_logo;
  //   const aLogo = fixture.team2_logo === "" ? null : fixture.team2_logo;

  // console.log(fixture);

  return (
    <>
      <div
        className={`grid grid-cols-12 py-3 px-2 font-mono text-xs items-center hover:bg-blue-200 transition-colors cursor-pointer`}
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        {/* Date and Time - New left column */}
        <div className="col-span-2 flex flex-col items-start justify-center text-black-lighter">
          <div className="text-xs">
            {new Date(fixture.game_date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </div>

          {fixture.game_status === "notstarted" ? (
            <div className="text-xs font-semibold">{fixture.matchtime}</div>
          ) : fixture.game_status === "FT" ? (
            <div className="text-xs text-muted-foreground capitalize">
              {"ended"}
            </div>
          ) : (
            <div className="text-xs text-green-600 capitalize">
              live <span className="animate-caret-blink">{fixture.minute}</span>
            </div>
          )}
        </div>

        {/* Team 1 - Reduced column span */}
        <div className="col-span-3 flex items-center justify-end gap-2 text-primary">
          <div className="text-end text-xs">{fixture.team1_name}</div>
          <div className="w-8 h-8 relative shrink-0">
            <img
              src={homeLogo}
              alt={fixture.team1_name}
              height={32}
              width={32}
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        {/* Match status */}
        <div className="col-span-2 flex flex-col items-center justify-center pt-5 text-black-lighter">
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
        <div className="col-span-4 flex items-center gap-2 text-primary">
          <div className="w-8 h-8 relative shrink-0">
            <img
              src={awayLogo}
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
        <div className="bg-background/90 p-4 animate-accordion-down text-primary">
          {/* Tries Section */}
          {fixture.fixture_type === "rugby7" ||
            (fixture.fixture_type === "rugby15" && (
              <EventSection
                title="Tries"
                icon={<Goal className="h-4 w-4" />}
                eventType="Score"
                subEventType="Try"
                fixture={fixture}
                eventClassName="text-primary"
                badgeClassName="bg-primary/10 text-primary"
              />
            ))}

          {/* Conversions Section */}
          {fixture.fixture_type === "rugby7" ||
            (fixture.fixture_type === "rugby15" && (
              <EventSection
                title="Conversions"
                icon={<Diamond className="h-4 w-4" />}
                eventType="Score"
                subEventType="Successful Conversion"
                fixture={fixture}
                eventClassName="text-accent"
                badgeClassName="bg-accent/10 text-accent"
              />
            ))}

          {/* Goals */}
          {fixture.fixture_type === "football" && (
            <EventSection
              title="Goals"
              icon={<Goal className="h-4 w-4" />}
              eventType="Goal"
              subEventType=""
              fixture={fixture}
              eventClassName="text-primary"
              badgeClassName="bg-primary/10 text-primary"
            />
          )}

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
}: EventSectionProps) => {
  const homeEvents =
    fixture.fixture_type === "football"
      ? fixture.refdata.filter(
          (item) =>
            item.event_name === eventType && item.team_id === fixture.team1_id
        )
      : fixture.refdata.filter(
          (event) =>
            event.event_name === eventType &&
            (Array.isArray(subEventType)
              ? subEventType.includes(event.sub_event_name)
              : event.sub_event_name === subEventType) &&
            event.team_id === fixture.team1_id
        );

  const awayEvents =
    fixture.fixture_type === "football"
      ? fixture.refdata.filter(
          (item) =>
            item.event_name === eventType && item.team_id === fixture.team2_id
        )
      : fixture.refdata.filter(
          (event) =>
            event.event_name === eventType &&
            (Array.isArray(subEventType)
              ? subEventType.includes(event.sub_event_name)
              : event.sub_event_name === subEventType) &&
            event.team_id === fixture.team2_id
        );

  return (
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
          events={homeEvents}
          badgeClassName={badgeClassName}
          renderBadge={renderBadge}
        />

        {/* Away Team */}
        <TeamEvents
          events={awayEvents}
          badgeClassName={badgeClassName}
          renderBadge={renderBadge}
        />
      </div>
    </div>
  );
};

interface TeamEventsProps {
  events: RefData[];
  badgeClassName?: string;
  renderBadge?: (event: RefData) => React.ReactNode;
}

const TeamEvents = ({
  events,
  badgeClassName,
  renderBadge,
}: TeamEventsProps) => (
  <div className="space-y-2 border p-2 rounded-sm">
    {events.length === 0 ? (
      <div className="text-sm text-muted-foreground text-center"></div>
    ) : (
      events.map((event, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <span className="font-medium w-6 text-right">
            {event.minute}&apos;
          </span>
          <span className="flex-1 truncate capitalize">
            {event.player_name.trim()}
          </span>
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

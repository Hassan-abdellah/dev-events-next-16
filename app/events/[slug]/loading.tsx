import EventsCardsLoader from "@/components/EventsCardsLoader";
import { Skeleton } from "@/components/ui/skeleton";

const loader = () => {
  return (
    <section id="event">
      {/* header */}
      <div className="header">
        <Skeleton className="h-8 w-200 rounded-lg" />
        <Skeleton className="h-6 w-200 rounded-lg" />
      </div>
      <div className="details">
        {/* content */}

        <div className="content">
          <Skeleton className="w-220 h-125" />

          {/* Overview */}
          <section className="space-y-2">
            <Skeleton className="h-6 w-100 rounded-lg" />
            <Skeleton className="h-6 w-200 rounded-lg" />
            <Skeleton className="h-6 w-200 rounded-lg" />
          </section>

          {/* Details */}
          <section className="space-y-2">
            <Skeleton className="h-6 w-100 rounded-lg" />

            <ul className="space-y-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton className="h-4 w-64 rounded-lg" key={index} />
              ))}
            </ul>
          </section>

          {/* Agenda */}
          <div className="agenda">
            <Skeleton className="h-6 w-100 rounded-lg" />

            <ul className="space-y-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton className="h-4 w-64 rounded-lg" key={index} />
              ))}
            </ul>
          </div>

          {/* Organizer */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-100 rounded-lg" />
            <Skeleton className="h-6 w-200 rounded-lg" />
            <Skeleton className="h-6 w-200 rounded-lg" />
          </div>

          {/* Tags */}

          <ul className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton className="h-12 w-32 rounded-lg" key={index} />
            ))}
          </ul>
        </div>

        <aside className="booking">
          <div className="signup-card">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        </aside>
      </div>

      <EventsCardsLoader />
    </section>
  );
};

export default loader;

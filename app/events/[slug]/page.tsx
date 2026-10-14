import BookingForm from "@/components/BookingForm";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";
import { getSimiralEvents } from "@/lib/actions/events.actions";
import Image from "next/image";
import { notFound } from "next/navigation";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetail = ({
  iconURL,
  data,
  alt,
}: {
  iconURL: string;
  data: string;
  alt: string;
}) => {
  return (
    <li className="flex items-center gap-2">
      <Image src={iconURL} alt={alt} width={17} height={17} />
      <p>{data}</p>
    </li>
  );
};
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  if (process.env.NODE_ENV === "development") {
    await sleep(10000); // remove when done
  }

  const response = await fetch(`${BASE_URL}/api/events/${slug}`);
  const { event }: { event: IEvent } = await response.json();

  if (!event) return notFound();

  const similarEvents: IEvent[] = await getSimiralEvents(slug);

  return (
    <section id="event">
      {/* header */}
      <div className="header">
        <h1>{event.title}</h1>
        <p>{event.description}</p>
      </div>
      <div className="details">
        {/* content */}

        <div className="content">
          <Image
            src={event.image}
            alt={event.title}
            className="banner"
            width={800}
            height={500}
          />

          {/* Overview */}
          <section className="space-y-2">
            <h2>Overview</h2>
            <p>{event.overview}</p>
          </section>

          {/* Details */}
          <section className="space-y-2">
            <h2>Event Details</h2>
            <ul>
              <EventDetail
                iconURL="/icons/calendar.svg"
                data={`Date: ${event.date}`}
                alt="Calendar"
              />

              <EventDetail
                iconURL="/icons/clock.svg"
                data={`Time: ${event.time}`}
                alt="Clock"
              />
              <EventDetail
                iconURL="/icons/pin.svg"
                data={`Venue: ${event.venue} at ${event.location}`}
                alt="Pin"
              />
              <EventDetail
                iconURL="/icons/mode.svg"
                data={`Mode: ${event.mode}`}
                alt="Mode"
              />
              <EventDetail
                iconURL="/icons/audience.svg"
                data={`Audience: ${event.audience}`}
                alt="Audience"
              />
            </ul>
          </section>

          {/* Agenda */}
          <div className="agenda">
            <h3>Agenda</h3>
            <ul>
              {event.agenda.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Organizer */}
          <div>
            <h3>About the Organizer</h3>
            <p>{event.organizer}</p>
          </div>

          {/* Tags */}

          <ul className="flex items-center gap-1.5 flex-wrap">
            {event.tags.map((tag) => (
              <li className="pill" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>

            <BookingForm />
          </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent: IEvent) => (
              <EventCard key={similarEvent.title} {...similarEvent} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;

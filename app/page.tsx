import EventCard from "@/components/EventCard";
import { events } from "@/lib/constants";
import Image from "next/image";

const HomePage = () => {
  return (
    <section>
      <h1 className="text-center">
        The Hub for every dev event <br /> Events you can’t miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups , and Conferences, All in one place
      </p>

      <a href="#events" id="explore-btn" className="mt-7 mx-auto">
        <span>Explore More</span>
        <Image
          src="/icons/arrow-down.svg"
          width={24}
          height={24}
          alt="down-arrow-icon"
        />
      </a>

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events.map((event) => (
            <EventCard key={event.slug} {...event} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomePage;

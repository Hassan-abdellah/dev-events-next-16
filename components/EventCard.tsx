import Image from "next/image";
import Link from "next/link";

interface EventCardProptype {
  title: string;
  slug: string;
  image: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({
  title,
  image: imageSrc,
  slug,
  location,
  date,
  time,
}: EventCardProptype) => {
  return (
    <Link href={`/events/${slug}`} id="event-card">
      <Image
        src={imageSrc}
        alt={title}
        width={410}
        height={300}
        className="poster"
      />

      <div className="flex items-row gap-2">
        <Image src="/icons/pin.svg" alt="pin-map" width={15} height={15} />
        <p>{location}</p>
      </div>

      <h2 className="title">{title}</h2>

      <div className="datetime">
        <div>
          <Image
            src="/icons/calendar.svg"
            alt="calendar"
            width={15}
            height={15}
          />
          <p>{date}</p>
        </div>
        |
        <div>
          <Image src="/icons/clock.svg" alt="clock" width={15} height={15} />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;

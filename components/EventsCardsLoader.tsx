import { Skeleton } from "./ui/skeleton";

const EventsCardsLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton className="h-64 w-118 rounded-lg" key={index} />
      ))}
    </div>
  );
};

export default EventsCardsLoader;

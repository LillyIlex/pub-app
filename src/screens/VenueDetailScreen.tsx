import { useEffect, useState } from "react";
import VenueDetailBlock, { VenueDetailData } from "../components/blocks/VenueDetailBlock";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import { getMockVenueById } from "@/data/mockVenues";

/**
 * TODO: replace with a real fetch-by-id from your pub-info API.
 * Currently resolves against the mock dataset so the screen renders end to end.
 */
async function getVenue(id: string): Promise<VenueDetailData | null> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const venue = getMockVenueById(id);
  if (!venue) return null;

  return {
    id: venue.id,
    title: venue.title,
    subtitle: venue.subtitle,
    description: venue.description,
    image: venue.image,
    features: venue.features,
    address: venue.address,
    lat: venue.lat,
    lng: venue.lng,
    phone: venue.phone,
    website: venue.website,
    openingHours: venue.openingHours,
    priceRange: venue.priceRange,
    rating: venue.rating,
    distance: venue.distance,
    details: venue.details,
  };
}

export default function VenueDetailScreen({ id }: { id?: string }) {
  const [venue, setVenue] = useState<VenueDetailData | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    getVenue(id).then(setVenue);
  }, [id]);

  if (!id) return <ErrorScreen message="No venue selected." />;
  if (venue === undefined) return <LoadingScreen label="Loading pub details..." />;
  if (venue === null) return <ErrorScreen message="We couldn't find that pub." />;

  return <VenueDetailBlock venue={venue} />;
}

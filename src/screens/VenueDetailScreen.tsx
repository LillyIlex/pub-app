import { useEffect, useState } from "react";
import VenueDetailBlock, { VenueDetailData } from "../components/blocks/VenueDetailBlock";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";

// Replace with a real fetch-by-id from your pub-info API.
async function getVenue(id: string): Promise<VenueDetailData | null> {
  return null;
}

interface VenueDetailScreenProps {
  id?: string;
}

/**
 * Presented as a modal from app/venue/[id].tsx, which gives it the native
 * "x" close button on iOS for free.
 */
export default function VenueDetailScreen({ id }: VenueDetailScreenProps) {
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

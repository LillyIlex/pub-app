import { useLocalSearchParams } from "expo-router";
import VenueDetailScreen from "../../screens/VenueDetailScreen";

export default function VenueRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <VenueDetailScreen id={id} />;
}

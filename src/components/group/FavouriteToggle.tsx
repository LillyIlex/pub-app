import { useState } from "react";
import FavouritesButton from "../base/FavouritesButton";
import ConfirmModal from "../blocks/ConfirmModal";
import { useFavourites } from "../../context/FavouritesContext";
import { useToast } from "../../context/ToastContext";
import { Venue } from "../blocks/CardList";

interface FavouriteToggleProps {
  venue: Venue;
  /**
   * Ask before removing. Off for result/map cards (a straight toggle), on in
   * the Favourites tab where removal makes the card disappear.
   */
  confirmRemove?: boolean;
  size?: number;
  className?: string;
}

export default function FavouriteToggle({
  venue,
  confirmRemove = false,
  size = 18,
  className = "",
}: FavouriteToggleProps) {
  const { isFavourited, addFavourite, removeFavourite } = useFavourites();
  const { showToast } = useToast();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const active = isFavourited(venue.id);

  const remove = () => {
    removeFavourite(venue.id);
    showToast("Removed from favourites", "heart-dislike");
  };

  const onToggle = () => {
    if (!active) {
      addFavourite(venue);
      showToast("Added to favourites", "heart");
      return;
    }
    if (confirmRemove) {
      setConfirmVisible(true);
    } else {
      remove();
    }
  };

  return (
    <>
      <FavouritesButton active={active} onToggle={onToggle} size={size} className={className} />
      {confirmRemove && (
        <ConfirmModal
          visible={confirmVisible}
          title="Remove from favourites?"
          message={`${venue.title} will be removed from your favourites.`}
          confirmText="Remove"
          cancelText="Keep"
          onConfirm={() => {
            remove();
            setConfirmVisible(false);
          }}
          onCancel={() => setConfirmVisible(false)}
        />
      )}
    </>
  );
}

// src/components/group/Card.tsx
import { View, Pressable, ImageSourcePropType } from "react-native";
import Image from "../base/Image";
import Title from "../base/Title";
import Paragraph from "../base/Paragraph";
import Pill from "../base/Pill";
import FavouritesButton from "../base/FavouritesButton";
import { useFavourites } from "@/context/FavouritesContext";

interface CardProps {
    id: string;
    image: ImageSourcePropType;
    title: string;
    subtitle?: string;
    tags?: string[];
    distance?: string;
    layout?: "row" | "col";
    onClick?: () => void;
    className?: string;
}

export default function Card({ id, image, title, subtitle, tags = [], distance, layout = "row", onClick, className = "" }: CardProps) {
    const isRow = layout === "row";
    const { isFavourited, toggleFavourite } = useFavourites();

    return (
        <Pressable
            onPress={onClick}
            className={`relative bg-white rounded-2xl overflow-hidden border border-border ${isRow ? "flex-row h-32" : "w-64"} ${className}`}
        >
            <Image source={image} clickable={false} customClasses={isRow ? "w-1/2 h-full" : "w-full h-32"} />
            <View className="flex-1 p-3 justify-between">
                <View>
                    <Title text={title} size="sm" />
                    {subtitle ? <Paragraph text={subtitle} size="sm" muted /> : null}
                </View>
                <View className="flex-row flex-wrap gap-1 mt-2">
                    {tags.map((tag) => (
                        <Pill key={tag} text={tag} />
                    ))}
                </View>
                {distance ? <Paragraph text={distance} size="sm" className="mt-2 text-link" /> : null}
            </View>

            <View className="absolute top-2 right-2 bg-white/90 rounded-full p-1">
                <FavouritesButton
                    active={isFavourited(id)}
                    onToggle={() => toggleFavourite({ id, title, subtitle, image, tags, distance })}
                    size={18}
                />
            </View>
        </Pressable>
    );
}
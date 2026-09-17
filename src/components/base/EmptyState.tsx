// components/base/EmptyState.tsx
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Title from "./Title";
import Paragraph from "./Paragraph";
import Button from "./Button";

interface EmptyStateProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    message?: string;
    actionText?: string;
    onAction?: () => void;
}

export default function EmptyState({ icon, title, message, actionText, onAction }: EmptyStateProps) {
    return (
        <View className="flex-1 items-center justify-center px-8 gap-2">
        <View className="w-16 h-16 rounded-full bg-primary/20 items-center justify-center mb-2">
        <Ionicons name={icon} size={30} color="#007836" />
        </View>
        <Title text={title} size="sm" className="text-center" />
        {message ? <Paragraph text={message} muted className="text-center" /> : null}
    {actionText && onAction ? <Button text={actionText} onClick={onAction} className="mt-3" /> : null}
    </View>
);
}
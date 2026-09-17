// src/components/blocks/LocationModal.tsx
import { Modal, View, Pressable } from "react-native";
import Title from "../base/Title";
import Paragraph from "../base/Paragraph";
import Button from "../base/Button";

interface LocationModalProps {
    visible: boolean;
    location: string;
    onClose: () => void;
    onSearchNew?: () => void; // optional: e.g. clear the top search field
}

export default function LocationModal({ visible, location, onClose, onSearchNew }: LocationModalProps) {
    return (
        <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
            <View className="flex-1 justify-end">
                <Pressable className="absolute inset-0 bg-black/40" onPress={onClose} />
                <View className="bg-white rounded-t-3xl p-6 gap-4">
                    <Title text="Your location" size="sm" />
                    <Paragraph text={`Your location is currently ${location}.`} muted />
                    <View className="gap-2">
                        <Button
                            text="Search new location"
                            onClick={() => {
                                onSearchNew?.();
                                onClose();
                            }}
                        />
                        <Button text="Cancel" variant="secondary" onClick={onClose} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}
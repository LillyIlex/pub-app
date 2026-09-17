import { Modal, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Title from "../base/Title";
import Paragraph from "../base/Paragraph";
import Button from "../base/Button";
import { COLORS } from "@/constants/theme";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onCancel}>
      <View className="flex-1 justify-end">
        <Pressable className="absolute inset-0 bg-black/40" onPress={onCancel} />
        <View className="bg-white rounded-t-3xl p-6 pb-10 gap-4">
          <View className="items-center">
            <View className="w-10 h-1 rounded-full bg-border mb-3" />
          </View>
          <View className="flex-row items-start justify-between">
            <Title text={title} size="sm" className="flex-1 pr-3" />
            <Pressable onPress={onCancel} hitSlop={10}>
              <Ionicons name="close" size={22} color={COLORS.ink} />
            </Pressable>
          </View>
          {message ? <Paragraph text={message} muted /> : null}
          <View className="gap-2">
            <Button text={confirmText} onClick={onConfirm} />
            <Button text={cancelText} variant="secondary" onClick={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

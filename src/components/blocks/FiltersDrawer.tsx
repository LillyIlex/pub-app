import { Modal, View, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Title from "../base/Title";
import Paragraph from "../base/Paragraph";
import Button from "../base/Button";
import Checkbox from "../base/Checkbox";
import DistancePills from "../base/DistancePills";
import { FEATURE_OPTIONS } from "../../constants/search";
import { COLORS } from "../../constants/theme";

interface FiltersDrawerProps {
  visible: boolean;
  activeIds: string[];
  distanceIndex: number;
  onToggle: (id: string) => void;
  onDistanceChange: (index: number) => void;
  onClearAll: () => void;
  onApply: () => void;
  onClose: () => void;
}

/**
 * Left-hand drawer holding the full filter set. The results/map toolbars keep
 * only the ACTIVE filters visible, so they stay readable as options grow.
 */
export default function FiltersDrawer({
  visible,
  activeIds,
  distanceIndex,
  onToggle,
  onDistanceChange,
  onClearAll,
  onApply,
  onClose,
}: FiltersDrawerProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1 flex-row">
        {/* Drawer first = slides in from the left. */}
        <View className="w-11/12 max-w-md bg-white rounded-r-3xl overflow-hidden">
          <SafeAreaView edges={["top", "bottom"]} className="flex-1">
            <View className="flex-row items-center justify-between px-5 pt-4 pb-3">
              <Title text="Filters" size="md" />
              <Pressable onPress={onClose} hitSlop={10} className="p-1">
                <Ionicons name="close" size={26} color={COLORS.ink} />
              </Pressable>
            </View>

            <ScrollView
              className="px-5"
              contentContainerStyle={{ paddingTop: 8, paddingBottom: 24, gap: 28 }}
              showsVerticalScrollIndicator={false}
            >
              <View className="gap-3">
                <Paragraph text="What are you looking for?" className="font-poppins-semibold" />
                <View className="gap-1.5">
                  {FEATURE_OPTIONS.map((f) => (
                    <Checkbox
                      key={f.id}
                      label={f.text}
                      icon={f.icon}
                      tone="dark"
                      checked={activeIds.includes(f.id)}
                      onToggle={() => onToggle(f.id)}
                    />
                  ))}
                </View>
              </View>

              <View className="gap-3">
                <Paragraph text="Search distance" className="font-poppins-semibold" />
                <DistancePills tone="dark" selectedIndex={distanceIndex} onSelect={onDistanceChange} />
              </View>
            </ScrollView>

            <View className="px-5 pt-4 pb-4 gap-2 border-t border-border">
              <Button text="Show results" onClick={onApply} />
              {activeIds.length > 0 && (
                <Button text="Clear all" variant="secondary" onClick={onClearAll} />
              )}
            </View>
          </SafeAreaView>
        </View>

        <Pressable className="flex-1 bg-black/40" onPress={onClose} />
      </View>
    </Modal>
  );
}

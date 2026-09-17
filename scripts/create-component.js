#!/usr/bin/env node
/**
 * Usage:
 *   npm run gen:component <ComponentName> [base|group|blocks]
 *
 * Examples:
 *   npm run gen:component IconButton base
 *   npm run gen:component VenueDetailList group
 *   npm run gen:component FiltersList blocks
 *
 * Defaults to "base" if no folder is given.
 */
const fs = require("fs");
const path = require("path");

const [, , rawName, rawType] = process.argv;

if (!rawName) {
  console.error("Usage: npm run gen:component <ComponentName> [base|group|blocks]");
  process.exit(1);
}

const VALID_TYPES = ["base", "group", "blocks"];
const name = rawName.charAt(0).toUpperCase() + rawName.slice(1);
const type = VALID_TYPES.includes(rawType) ? rawType : "base";

const dir = path.join(__dirname, "..", "src", "components", type);
const filePath = path.join(dir, `${name}.tsx`);

if (fs.existsSync(filePath)) {
  console.error(`✖ ${path.relative(process.cwd(), filePath)} already exists — pick a different name.`);
  process.exit(1);
}

const template = `import { View, Text, ViewProps } from "react-native";

// interface ${name}Props extends ViewProps {
//   className?: string;
// }

export default function ${name}({ className = "", ...rest }: ${name}Props) {
  return (
    <View className={\`\${className}\`} {...rest}>
      <Text className="font-poppins text-ink">${name}</Text>
    </View>
  );
}
`;

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(filePath, template);
console.log(`✔ Created ${path.relative(process.cwd(), filePath)}`);

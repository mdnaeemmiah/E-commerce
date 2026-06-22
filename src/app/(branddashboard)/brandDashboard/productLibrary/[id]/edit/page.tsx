import EditProductForm from "@/components/BrandDashboard/productLibrary/EditProductForm";

const mockProducts: Record<
  string,
  React.ComponentProps<typeof EditProductForm>["data"]
> = {
  "1": {
    id: 1,
    name: "Kettle Sea Salt Chips",
    status: "ACTIVE",
    subtitle: "Premium Sea Salt Variant",
    description:
      "Our Kettle Sea Salt Chips are crafted with a dedication to simplicity and quality. Each batch of kettle-cooked in small portions to ensure the perfect crunch and golden hue. Using only three prime ingredients — hand-picked potatoes, high-quality oils, and a sprinkle of authentic sea salt — we deliver a timeless snacking experience.",
    aliases: ["Kettle Chip", "Kettle Sea Salt", "Kettle Sea Bay"],
    specs: [
      { label: "Version", value: "Gradec" },
      { label: "Grams", value: "Kettle" },
      { label: "Flavor", value: "Sea Salt" },
      { label: "Weight", value: "8oz" },
      { label: "Type", value: "Bag" },
      { label: "Taste", value: "Sut" },
      { label: "SKU", value: "KT782-12" },
    ],
  },
  "2": {
    id: 2,
    name: "Nitro Cold Brew",
    status: "ACTIVE",
    subtitle: "Smooth Nitrogen-Infused Coffee",
    description:
      "Our Nitro Cold Brew is slow-steeped for 20 hours then infused with nitrogen for an ultra-smooth, creamy texture with natural sweetness and zero added sugar.",
    aliases: ["Nitro Brew", "Cold Brew Nitro"],
    specs: [
      { label: "Volume", value: "11 fl oz" },
      { label: "Caffeine", value: "210mg" },
      { label: "Flavor", value: "Original" },
      { label: "Type", value: "Can" },
      { label: "Sugar", value: "0g" },
      { label: "Calories", value: "10kcal" },
      { label: "SKU", value: "NC-110-OG" },
    ],
  },
};

export default function EditProductPage({ params }: { params: { id: string } }) {
  const data = mockProducts[params.id] ?? mockProducts["1"];
  return (
    <div className="p-4 md:p-6">
      <EditProductForm data={data} />
    </div>
  );
}

import ProductDetailsView from "@/components/BrandDashboard/productLibrary/ProductDetailsView";
import rect from "@/app/assets/dashboard/Rectangle 923.png";

const mockProducts: Record<
  string,
  React.ComponentProps<typeof ProductDetailsView>["product"]
> = {
  "1": {
    id: 1,
    name: "Kettle Sea Salt Chips",
    status: "ACTIVE",
    subtitle: "Premium Sea Salt Variant",
    description:
      "Our Kettle Sea Salt Chips are crafted with a dedication to simplicity and quality. Each batch of kettle-cooked in small portions to ensure the perfect crunch and golden hue. Using only three prime ingredients — hand-picked potatoes, high-quality oils, and a sprinkle of authentic sea salt — we deliver a timeless snacking experience.",
    image: rect,
    aliases: ["Kettle Chip", "Kettle Sea Salt", "Kettle Sea Bay"],
    campaigns: [
      { id: "REB-004521", name: "Summer BBQ Rebate", type: "REBATE", status: "Active", claims: 4320 },
      { id: "REV-009923", name: "Verified Review Push", type: "REVIEW", status: "Active", claims: 191 },
    ],
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
    image: null,
    bgColor: "bg-gradient-to-br from-stone-700 to-stone-900",
    aliases: ["Nitro Brew", "Cold Brew Nitro"],
    campaigns: [
      { id: "REV-001122", name: "Cold Brew Review Drive", type: "REVIEW", status: "Active", claims: 84 },
    ],
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

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = mockProducts[params.id] ?? mockProducts["1"];

  return (
    <div className="p-4 md:p-6">
      <ProductDetailsView product={product} />
    </div>
  );
}

import RedemptionDetail from "@/components/BrandDashboard/redemptions/RedemptionDetail";

export default function RedemptionDetailPage({ params }: { params: { id: string } }) {
  return <RedemptionDetail id={params.id} />;
}

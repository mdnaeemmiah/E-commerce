import ReviewDetail from "@/components/BrandDashboard/reviews/ReviewDetail";

export default function ReviewDetailPage({ params }: { params: { id: string } }) {
  return <ReviewDetail id={params.id} />;
}

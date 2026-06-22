import CustomerProfile from "@/components/BrandDashboard/customers/CustomerProfile";

export default function CustomerProfilePage({ params }: { params: { id: string } }) {
  return <CustomerProfile id={params.id} />;
}

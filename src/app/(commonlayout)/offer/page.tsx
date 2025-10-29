import PendingRewards from "@/components/modules/home/offer/PendingRewards";
import Search from "@/components/modules/home/offer/Search";
import Toggle from "@/components/modules/home/offer/toggle/Toggle";
import UploadScan from "@/components/modules/home/offer/UploadScan";
import ViewWallet from "@/components/modules/home/offer/ViewWallet";


export default function page() {
  return (
    <div>
      {/* <Slider></Slider> */}
      <Search></Search>
      <ViewWallet></ViewWallet>
      <div className="w-[90%] mx-auto lg:container mt-20">
        <Toggle></Toggle>
      </div>
      <PendingRewards></PendingRewards>
      <UploadScan></UploadScan>
    </div>
  )
}

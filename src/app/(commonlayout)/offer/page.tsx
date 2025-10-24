import PendingRewards from "@/components/modules/home/offer/PendingRewards";
import Search from "@/components/modules/home/offer/Search";
import Slider from "@/components/modules/home/offer/Slider";
import Toggle from "@/components/modules/home/offer/toggle/Toggle";
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
    </div>
  )
}

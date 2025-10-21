import Slider from "@/components/modules/home/offer/Slider";
import Toggle from "@/components/modules/home/offer/toggle/Toggle";


export default function page() {
  return (
    <div>
      <Slider></Slider>
      <div className="w-[90%] mx-auto lg:container mt-20">
        <Toggle></Toggle>
      </div>
    </div>
  )
}

import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";

export default function AddFaq() {
  return (
    <div className="flex justify-center items-center mt-10 lg:mt-30">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full lg:max-w-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Add FAQ</h2>
          <button className="text-indigo-600 hover:text-indigo-800 ">
             <Link href='/adminDashboard/settings/faq'><IoMdArrowBack className="text-xl cursor-pointer" /></Link>
          </button>
        </div>

        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Question</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="How do I book a service App?"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">Answer</label>
            <textarea
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter description...."
              rows={4}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-indigo-700"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

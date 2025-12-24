import { MdCall, MdEmail } from "react-icons/md";

function Home() {
  return (
    <div className="bg-[#fafafa] min-h-screen flex flex-col">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto w-full px-4 pt-8 pb-2 text-sm text-gray-500">
        Home / <span className="text-black font-medium">Contact</span>
      </div>
      {/* Main Content */}
      <main className="max-w-6xl mx-auto w-full px-4 py-4 flex flex-col md:flex-row gap-8">
        {/* Left: Contact Info */}
        <div className="bg-white rounded-lg shadow-none p-6 flex-1 max-w-md min-h-[320px]"> {/* Increased height */}
          {/* Call */}
          <div className="flex items-start gap-3 mt-3 mb-6">
            <div className="bg-red-100 rounded-full p-2">
              <MdCall size={24} className="text-red-500" />
            </div>
            <div>
              <div className="font-semibold mb-1">Call To Us</div>
              <div className="text-sm text-gray-600 mb-1">
                We are available 24/7, 7 days a week.
              </div>
              <div className="text-sm text-gray-800">Phone: +8801611112222</div>
            </div>
          </div>
          <hr className="my-4" />
          <br />
          {/* Write */}
          <div className="flex items-start gap-3">
            <div className="bg-red-100 rounded-full p-2">
              <MdEmail size={24} className="text-red-500" />
            </div>
            <div>
              <div className="font-semibold mb-1">Write To Us</div>
              <div className="text-sm text-gray-600 mb-1">
                Fill out our form and we will contact you within 24 hours.
              </div>
              <div className="text-sm text-gray-800">
                Emails: customer@exclusive.com
                <br />
                Emails: support@exclusive.com
              </div>
            </div>
          </div>
        </div>
        {/* Right: Contact Form */}
        <form className="bg-white rounded-lg shadow-none p-6 flex-[2] flex flex-col gap-4 min-h-[320px]"> {/* Increased height */}
          <div className="flex flex-col mt-4 md:flex-row gap-4">
            <input
              type="text"
              placeholder="Your Name *"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-red-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email *"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-red-500"
              required
            />
            <input
              type="text"
              placeholder="Your Phone *"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <textarea
            placeholder="Your Message"
            rows={5}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-red-500 resize-none"
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-red-500 text-white rounded-md px-8 py-2 font-semibold hover:bg-red-600 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </main>
      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
export default Home;


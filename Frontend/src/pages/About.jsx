import { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdLocalShipping, MdHeadsetMic, MdCheckCircle } from "react-icons/md";

const stats = [
	{ label: "10.5k", desc: "Sellers active on our site" },
	{ label: "33k", desc: "Monthly Product Sale" },
	{ label: "45.5k", desc: "Customers active on site" },
	{ label: "25k", desc: "Annual gross sale on our site" },
];

const team = [
	{
		name: "Tom Cruise",
		role: "Founder & Chairman",
		img: "https://randomuser.me/api/portraits/men/32.jpg",
		socials: [<FaFacebookF />, <FaTwitter />, <FaInstagram />, <FaLinkedinIn />],
	},
	{
		name: "Emma Watson",
		role: "Managing Director",
		img: "https://randomuser.me/api/portraits/women/44.jpg",
		socials: [<FaFacebookF />, <FaTwitter />, <FaInstagram />, <FaLinkedinIn />],
	},
	{
		name: "Will Smith",
		role: "Product Designer",
		img: "https://randomuser.me/api/portraits/men/54.jpg",
		socials: [<FaFacebookF />, <FaTwitter />, <FaInstagram />, <FaLinkedinIn />],
	},
];

export default function About() {

	return (
		<div className="bg-[#fafafa] min-h-screen flex flex-col">
			{/* Breadcrumb */}
			<div className="max-w-6xl mx-auto w-full px-4 pt-8 pb-2 text-sm text-gray-500">
				Home / <span className="text-black font-medium">About</span>
			</div>
			{/* Our Story Section */}
			<main className="max-w-6xl mx-auto w-full px-4 py-4">
				<div className="flex flex-col md:flex-row gap-8 items-center mb-10">
					<div className="flex-1">
						<h2 className="text-5xl font-bold mb-4">Our Story</h2>
						<p className="text-gray-700 mt-8 mb-4">
							Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in
							Bangladesh. Supported by a wide range of tailored marketing, data, and service solutions, Exclusive has
							10,500 sellers and 300 brands, serving 3 million customers across the region.
						</p>
						<p className="text-gray-700">
							Exclusive has more than 1 Million products to offer, growing at a very fast pace. Exclusive offers a
							diverse assortment in categories ranging from consumer electronics to household goods, beauty, fashion,
							sports equipment, and groceries.
						</p>
					</div>
					<div className="flex-1 flex justify-center">
						<img
							src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"
							alt="Our Story"
							className="rounded-lg w-full max-w-[340px] object-cover"
						/>
					</div>
				</div>
				{/* Stats Boxes */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 ">
					{stats.map((stat) => (
						<div
							key={stat.label}
							className="flex flex-col items-center justify-center rounded-lg border border-black py-8 bg-white"
						>
							<div className="text-2xl font-bold mb-2">{stat.label}</div>
							<div className="text-sm text-gray-700">{stat.desc}</div>
						</div>
					))}
				</div>
				{/* Team Section */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
					{team.map((member) => (
						<div
							key={member.name}
							className="bg-transparent shadow-none flex flex-col items-center py-8 px-4"
						>
							<img
								src={member.img}
								alt={member.name}
								className="w-40 h-56 rounded-xl object-cover mb-4"
							/>
							<div className="font-semibold text-2xl mb-1">{member.name}</div>
							<div className="text-gray-500 mb-3 text-lg">{member.role}</div>
							<div className="flex gap-4 text-gray-400 text-xl">
								{member.socials.map((icon, i) => (
									<span key={i} className="hover:text-red-500 cursor-pointer">
										{icon}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
				{/* Service Features */}
				<div className="flex flex-col items-center lg:flex-row lg:justify-center gap-10 mb-10">
					{/* Feature 1 */}
					<div className="flex flex-col items-center text-center">
						<div className="rounded-full bg-white p-3 mb-3 shadow-sm">
							<MdLocalShipping size={32} color="#222" />
						</div>
						<div className="font-bold text-lg mb-1">FREE AND FAST DELIVERY</div>
						<div className="text-gray-500 text-sm">Free delivery for all orders over $140</div>
					</div>
					{/* Feature 2 */}
					<div className="flex flex-col items-center text-center">
						<div className="rounded-full bg-white p-3 mb-3 shadow-sm">
							<MdHeadsetMic size={32} color="#222" />
						</div>
						<div className="font-bold text-lg mb-1">24/7 CUSTOMER SERVICE</div>
						<div className="text-gray-500 text-sm">Friendly 24/7 customer support</div>
					</div>
					{/* Feature 3 */}
					<div className="flex flex-col items-center text-center">
						<div className="rounded-full bg-white p-3 mb-3 shadow-sm">
							<MdCheckCircle size={32} color="#222" />
						</div>
						<div className="font-bold text-lg mb-1">MONEY BACK GUARANTEE</div>
						<div className="text-gray-500 text-sm">We return money within 30 days</div>
					</div>
				</div>
			</main>
			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}

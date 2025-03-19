import { useState } from "react"
import { CiSquarePlus } from "react-icons/ci"
import { FaMobileAlt } from "react-icons/fa"
import { GiWireframeGlobe } from "react-icons/gi"
import { GoDotFill, GoTasklist } from "react-icons/go"
import { GrSystem } from "react-icons/gr"
import { HiOutlineUsers } from "react-icons/hi"
import { IoSettingsOutline } from "react-icons/io5"
import { LuMessageSquareHeart } from "react-icons/lu"
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdOutlineDesignServices } from "react-icons/md"
import { PiDotsThreeBold } from "react-icons/pi"
import { RxDashboard } from "react-icons/rx"

import { BiBookAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom"
import { FiEdit } from "react-icons/fi";

const Sidebar = () => {
   const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div
			className={`transition-all duration-300 ${isOpen ? "w-[90px] items-center" : "w-[250px]"
				} border-gray-200 border bg-white flex flex-col`}
			style={{ padding: "16px 12px" }}
		>
			<div className="flex items-center justify-between" style={{ marginBottom: "32px" }}>
				<div className="flex items-center gap-2">
					{/* <img src="https://www.library-management.com/uploads/60196c0c6f3a8_logo_.png" alt="logo" className="w-20 h-10" /> */}
					<p className={`font-semibold text-[16px] ${isOpen ? "hidden" : "block"}`}>Admin Panel.</p>
				</div>
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="text-gray-400 hover:text-gray-600"
					style={{ padding: "4px" }}
				>
					{isOpen ? <MdKeyboardDoubleArrowRight size={20} /> : <MdKeyboardDoubleArrowLeft size={20} />}
				</button>
			</div>

			<nav>
				<ul className="space-y-1 text-gray-600">
					<li className="flex items-center gap-3 rounded-md hover:bg-gray-100" style={{ padding: "10px 12px" }} onClick={()=>navigate("/")}>
						<RxDashboard size={22} /> {!isOpen && <span className="text-[14px]">Home</span>}
					</li>
					<li className="flex items-center gap-3 rounded-md hover:bg-gray-100" style={{ padding: "10px 12px" }} onClick={()=>navigate("/add-book")}>
						<BiBookAdd size={22} /> {!isOpen && <span className="text-[14px]">Add Book</span>}
					</li>
					<li className="flex items-center gap-3 rounded-md hover:bg-gray-100" style={{ padding: "10px 12px" }} onClick={() =>navigate("/allbooks")} >
						<FiEdit  size={22} /> {!isOpen && <span className="text-[14px]">Manage Books</span>}
					</li>
					<li className="flex items-center gap-3 rounded-md hover:bg-gray-100" style={{ padding: "10px 12px" }} onClick={() =>navigate("/getuser")}>
						<HiOutlineUsers size={22} /> {!isOpen && <span className="text-[14px]">Members</span>}
					</li>
					
				</ul>
			</nav>

			<div style={{ margin: "32px 0 16px" }}>
				<hr className="border-gray-200" style={{ margin: "0 -12px 24px" }} />
				<div className="flex justify-between items-center" style={{ padding: "0 4px" }}>
					<p className={`text-xs font-semibold text-gray-500 ${isOpen ? "hidden" : "block"}`}>MY LIBRARY</p>
					<button className="text-gray-500 hover:text-gray-700">
						<CiSquarePlus size={18} />
					</button>
				</div>
			</div>

			

			{!isOpen ? <div className="bg-[#f5f5f5] rounded-xl text-center" style={{ padding: "20px 16px", margin: "32px 0 16px" }}>
				<div className="flex justify-center" style={{ marginBottom: "16px" }}>
					<div className="w-8 h-8 bg-[#f7df94] rounded-full flex items-center justify-center">
						<span className="text-[18px]">💡</span>
					</div>
				</div>
				<p className="font-medium text-[14px] text-[#0d062d]" style={{ marginBottom: "8px" }}>
					Thoughts Time
				</p>
				<p className="text-gray-500 text-xs" style={{ marginBottom: "16px", lineHeight: "1.5" }}>
					We don't have any notice for you, till then you can share your thoughts with your peers.
				</p>
				<button
					className="bg-white text-[#0d062d] rounded-lg text-xs hover:bg-gray-100"
					style={{ padding: "8px 16px" }}
				>
					Write a message
				</button>
			</div> : <button
				className="flex items-center justify-center gap-2 bg-[#dce0f4] w-full rounded-md"
				style={{ padding: "10px 12px", marginTop: "32px" }}
			>
				<LuMessageSquareHeart size={22} />
			</button>}
		</div>
	)
}

export default Sidebar
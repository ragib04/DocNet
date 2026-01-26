// import React from 'react'
// import { doctors } from '../assets/assets'
// import { Link } from 'react-router-dom'
// // className='flex flex-col items-center gap-4 py-14 text-gray-800'
// const TopDoctors = () => {
//   return (
//     <div className='flex flex-col items-center gap-4 my-16 text-gray-800 md:mx-10'>
//         <h1 className='font-medium text-3xl'>Top Doctors to Book</h1>
//         <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
//         <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
//             {doctors.slice(0, 10).map((item, index) => (
//                <div className="bg-blue-50 rounded-xl border border-blue-100 overflow-hidden
//                hover:shadow-lg transition-all duration-300 cursor-pointer">

//  <img
//    src={item.image}
//    alt={item.name}
//    className="w-full h-52 object-contain bg-blue-50"
//  />

//  <div className="bg-white p-4 space-y-1">
//    <div className="flex items-center gap-2 text-sm text-green-500 mb-1">
//      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//      <span>Available</span>
//    </div>

//    <p className="font-medium text-gray-800">{item.name}</p>
//    <p className="text-sm text-gray-500">{item.speciality}</p>
//  </div>
// </div>

//             ))}
//         </div>
//                 <button>more</button>
//     </div>
//   )
// }

// export default TopDoctors

import React from 'react'
import { doctors } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'

const TopDoctors = () => {

    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-800 md:mx-10">
      
      <h1 className="font-medium text-3xl">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* ✅ GRID FIX */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 
                      gap-6 pt-5 px-4 sm:px-0">

        {doctors.slice(0, 10).map((item, index) => (
          <div onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="bg-blue-50 rounded-xl border border-blue-100 overflow-hidden
                       hover:shadow-lg transition-all duration-300 cursor-pointer
                       max-w-[260px] mx-auto"
          >
            {/* ✅ IMAGE FIX */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-44 object-contain bg-blue-50"
            />

            {/* ✅ CONTENT FIX */}
            <div className="bg-white p-4">
              <div className="flex items-center gap-2 text-sm text-green-500 mb-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Available</span>
              </div>

              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ BUTTON FIX */}
      <button className="mt-10 px-8 py-3 bg-blue-600 text-white rounded-full
                         hover:bg-blue-700 transition-colors cursor-pointer">
        more
      </button>
    </div>
  )
}

export default TopDoctors

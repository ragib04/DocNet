import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'

const Appoinment = () => {

  const {docId} = useParams()
  const {doctors, currencySymbol} = useContext(AppContext)

  const daysofweek = ['sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const [docInfo, setDocInfo] = useState(null)

  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    
  }

  const getAvailableSlots = async () => {
    setDocSlots([])

    //getting curr date
    let today = new Date()

    for(let i=0; i<7; i++){
      //getting date with index
      let currdate = new Date(today)
      currdate.setDate(today.getDate()+i)

      //seeting and time of the date
      let endTime = new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)

      //set hrs
      if(today.getDate() === currdate.getDate()){
        currdate.setHours(currdate.getHours() > 10? currdate.getHours()+1 : 10)
        currdate.setMinutes(currdate.getMinutes() > 30? 30: 0)
      }
      else{
        currdate.setHours(10)
        currdate.setMinutes(0)
      }
let timeslots = []
      while(currdate < endTime){
        let formatedTime = currdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })


        //add slots to arr
        timeslots.push({
          datetime: new Date(currdate),
          time: formatedTime
        })

        // increment curr time by 30 minutes
        currdate.setMinutes(currdate.getMinutes()+30)
      }

      setDocSlots(prev => ([...prev, timeslots]))
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots])

  return (
    <div>
      {docInfo && (
        <>
          {/**----------Doctors detail------------- */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <div>
              <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
            </div>
  
            <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
              {/**------------Doc Info: name, degree, experience------------ */}
              <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
                {docInfo.name} 
                <img className='w-s' src={assets.verified_icon} alt="" />
              </p>
  
              <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                <p>{docInfo.degree} - {docInfo.speciality}</p>
                <button>{docInfo.experience}</button>
              </div>
              {/**--------Doctor About--------- */}
              <div>
                <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
                <p  className='text-sm text-gray-500 `max-w-[700px]` mt-1'>
                  {docInfo.about}
                </p>
              </div>
              <p className='text-gray-500 font-medium mt-4'>
              Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
              </p>
            </div>
          </div>
          {/**------Booking Slots-------- */}
          <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-indigo-500 text-white': 'border border-gray-200'}`} key={index}>
                <p>{item[0] && daysofweek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        {/**-------Time slots---------- */}
        <div className='flex flex-wrap gap-3 mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p
            onClick={() => setSlotTime(item.time)}
            className={`text-sm flex-shrink-0 px-6 py-2 rounded-full cursor-pointer transition-all
            ${item.time === slotTime 
              ? 'bg-indigo-500 text-white' 
              : 'text-gray-500 border border-gray-300 hover:bg-gray-100'}`} key={index}
          >
            {item.time.toLowerCase()}
          </p>
          
          ))}
        </div>
        <button className='bg-indigo-500 text-white text-sm font-light px-14 py-3 rounded-full m-6 cursor-pointer'>Book an appoinment</button>
          </div>

          {/**---------Listing related Doctors*/}
          <RelatedDoctors docId = {docId} speciality = {docInfo.speciality}/>
        </>
      )}
    </div>
  )
  
}

export default Appoinment
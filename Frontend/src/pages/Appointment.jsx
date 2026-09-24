import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doctors, assets } from "../assets/assets_frontend/assets";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const currency = "$";

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Find the doctor from the URL id
  useEffect(() => {
    setDocInfo(doctors.find((doc) => doc._id === docId) || null);
  }, [docId]);

  // Build 30-minute slots (10:00 AM – 9:00 PM) for the next 7 days
  useEffect(() => {
    if (!docInfo) return;

    const allSlots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        // Today: start from the next half hour, but not before 10 AM
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      const daySlots = [];
      while (currentDate < endTime) {
        daySlots.push({
          datetime: new Date(currentDate),
          time: currentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      if (daySlots.length > 0) allSlots.push(daySlots);
    }

    setDocSlots(allSlots);
    setSlotIndex(0);
    setSlotTime("");
  }, [docInfo]);

  const handleBooking = () => {
    if (!slotTime) {
      alert("Please select a time slot");
      return;
    }
    const date = docSlots[slotIndex][0].datetime.toDateString();
    alert(`Appointment booked with ${docInfo.name} on ${date} at ${slotTime}`);
    // Later: send this to the backend API
  };

  if (!docInfo) {
    return <p className="text-center text-gray-500 py-20">Doctor not found.</p>;
  }

  const relatedDoctors = doctors.filter(
    (doc) => doc.speciality === docInfo.speciality && doc._id !== docInfo._id,
  );

  return (
    <div>
      {/* ---------- Doctor Details ---------- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-[#5F6FFF] w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>

          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <span className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </span>
          </div>

          <div className="mt-3">
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
              About <img className="w-3" src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>

          <p className="text-gray-500 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-600">
              {currency}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* ---------- Booking Slots ---------- */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking slots</p>

        {/* Days */}
        <div className="flex gap-3 items-center w-full overflow-x-auto mt-4">
          {docSlots.map((daySlots, index) => (
            <div
              key={index}
              onClick={() => {
                setSlotIndex(index);
                setSlotTime("");
              }}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer transition-all ${
                slotIndex === index
                  ? "bg-[#5F6FFF] text-white"
                  : "border border-gray-200 hover:border-[#5F6FFF]"
              }`}
            >
              <p>{daysOfWeek[daySlots[0].datetime.getDay()]}</p>
              <p>{daySlots[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Times */}
        <div className="flex items-center gap-3 w-full overflow-x-auto mt-4 pb-2">
          {docSlots[slotIndex]?.map((slot) => (
            <p
              key={slot.time}
              onClick={() => setSlotTime(slot.time)}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all ${
                slot.time === slotTime
                  ? "bg-[#5F6FFF] text-white"
                  : "text-gray-500 border border-gray-300 hover:border-[#5F6FFF]"
              }`}
            >
              {slot.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button
          onClick={handleBooking}
          className="bg-[#5F6FFF] text-white text-sm font-light px-14 py-3 rounded-full my-6 hover:bg-[#4B5BE6] active:scale-95 transition-all"
        >
          Book an appointment
        </button>
      </div>

      {/* ---------- Related Doctors ---------- */}
      {relatedDoctors.length > 0 && (
        <div className="flex flex-col items-center gap-4 my-16 text-gray-900">
          <h2 className="text-3xl font-medium">Related Doctors</h2>
          <p className="sm:w-1/3 text-center text-sm">
            Other {docInfo.speciality}s you can book.
          </p>

          <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6">
            {relatedDoctors.slice(0, 5).map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  navigate(`/appointment/${item._id}`);
                  window.scrollTo(0, 0);
                }}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-500"
              >
                <img
                  className="bg-blue-50 w-full"
                  src={item.image}
                  alt={item.name}
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;

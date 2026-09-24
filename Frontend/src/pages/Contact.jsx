import React, { useState } from "react";

const contactInfo = [
  {
    title: "Call Us",
    value: "+92 300 1234567",
    href: "tel:+923001234567",
    icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z",
  },
  {
    title: "Email Us",
    value: "support@prescripto.com",
    href: "mailto:support@prescripto.com",
    icon: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75",
  },
  {
    title: "Visit Us",
    value: "Main Boulevard, Gulberg, Lahore",
    icon: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
  },
  {
    title: "Working Hours",
    value: "Mon – Sat, 9:00 AM – 9:00 PM",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
];

const faqs = [
  {
    q: "How do I book an appointment?",
    a: 'Go to All Doctors, choose a doctor, pick an available day and time slot, and click "Book an appointment".',
  },
  {
    q: "Can I cancel or reschedule my appointment?",
    a: "Yes. Open My Appointments from your profile menu to cancel. You can then book a new slot anytime.",
  },
  {
    q: "Are all doctors verified?",
    a: "Yes. Every doctor on Prescripto is verified before being listed on the platform.",
  },
  {
    q: "Do I need an account to book?",
    a: "Yes, a free account lets you book, track, and manage all your appointments in one place.",
  },
];

const initialForm = {
  name: "",
  email: "",
  subject: "General Inquiry",
  message: "",
};

const Icon = ({ path }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (form.message.trim().length < 10)
      newErrors.message = "Message should be at least 10 characters";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Later: send form data to the backend API
    setSubmitted(true);
    setForm(initialForm);
  };

  const inputClass = (field) =>
    `w-full border rounded-lg px-4 py-3 text-sm outline-none transition-all focus:border-[#5F6FFF] focus:ring-2 focus:ring-indigo-100 ${
      errors[field] ? "border-red-400" : "border-gray-300"
    }`;

  return (
    <div className="text-gray-700">
      {/* ---------- Hero ---------- */}
      <section className="text-center pt-12 pb-10">
        <p className="inline-block text-xs font-semibold tracking-widest text-[#5F6FFF] bg-indigo-50 px-4 py-1.5 rounded-full">
          CONTACT US
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mt-5 leading-tight">
          We're here to <span className="text-[#5F6FFF]">help</span>.
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-gray-500 leading-7">
          Have a question about booking, your account, or joining as a doctor?
          Reach out and our team will get back to you within 24 hours.
        </p>
      </section>

      {/* ---------- Info Cards ---------- */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {contactInfo.map((item) => {
          const content = (
            <>
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 text-[#5F6FFF] group-hover:bg-[#5F6FFF] group-hover:text-white transition-colors duration-300">
                <Icon path={item.icon} />
              </div>
              <p className="font-semibold text-gray-900 mt-4">{item.title}</p>
              <p className="text-sm text-gray-500 mt-1 wrap-break-word">
                {item.value}
              </p>
            </>
          );
          const cardClass =
            "group block border border-gray-200 rounded-2xl p-6 hover:border-[#5F6FFF] hover:shadow-lg transition-all duration-300";

          return item.href ? (
            <a key={item.title} href={item.href} className={cardClass}>
              {content}
            </a>
          ) : (
            <div key={item.title} className={cardClass}>
              {content}
            </div>
          );
        })}
      </section>

      {/* ---------- Form + Side Panel ---------- */}
      <section className="grid lg:grid-cols-5 gap-8 my-20">
        {/* Form */}
        <div className="lg:col-span-3 border border-gray-200 rounded-2xl p-6 sm:p-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            Send us a message
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill out the form and we'll respond as soon as possible.
          </p>

          {submitted && (
            <div className="mt-6 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
              ✓ Thank you! Your message has been sent. We'll get back to you
              soon.
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-6 flex flex-col gap-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`mt-1.5 ${inputClass("name")}`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`mt-1.5 ${inputClass("email")}`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Subject
              </label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className={`mt-1.5 bg-white ${inputClass("subject")}`}
              >
                <option>General Inquiry</option>
                <option>Booking Help</option>
                <option>Account Issue</option>
                <option>Join as a Doctor</option>
                <option>Feedback</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="How can we help you?"
                className={`mt-1.5 resize-none ${inputClass("message")}`}
              />
              {errors.message && (
                <p className="text-xs text-red-500 mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="self-start bg-[#5F6FFF] text-white text-sm font-medium px-10 py-3 rounded-full hover:bg-[#4B5BE6] active:scale-95 transition-all duration-300"
            >
              Send Message →
            </button>
          </form>
        </div>

        {/* Side Panel */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#5F6FFF] text-white rounded-2xl p-8">
            <h3 className="text-xl font-semibold">Are you a doctor?</h3>
            <p className="text-indigo-100 text-sm mt-2 leading-6">
              Join Prescripto to reach more patients, manage your schedule
              online, and grow your practice.
            </p>
            <button
              onClick={() => {
                setForm({ ...form, subject: "Join as a Doctor" });
                setSubmitted(false);
              }}
              className="mt-6 bg-white text-gray-700 text-sm font-medium px-6 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all"
            >
              Apply to Join
            </button>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900">
              Careers at Prescripto
            </h3>
            <p className="text-gray-500 text-sm mt-2 leading-6">
              We're building the future of healthcare booking. Learn about our
              team and open roles.
            </p>
            <button className="mt-6 border border-gray-800 text-gray-800 text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="max-w-3xl mx-auto mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mt-2">
            Quick answers to common questions.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={item.q}
                className={`border rounded-xl transition-all ${isOpen ? "border-[#5F6FFF]" : "border-gray-200"}`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex justify-between items-center gap-4 text-left px-6 py-4 font-medium text-gray-900"
                >
                  {item.q}
                  <span
                    className={`text-[#5F6FFF] text-xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 text-sm text-gray-500 leading-6">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Contact;

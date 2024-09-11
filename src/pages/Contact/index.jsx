import React, { useState } from "react";
import postIMG from "../../assets/images/contact.png";
import { HTTP_CLIENT } from "../../utils/axiosClient";

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      phone: phone,
      subject: subject,
      message: message,
    };

    try {
      setLoading(true);
      setStatus('');

      const response = await HTTP_CLIENT.post("/api/contact_us/", data);

      if (response.status === 200) {
        setStatus("Message sent successfully!");
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
      }
    } catch (error) {
      console.error("Failed to send message", error);
      setStatus("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-contact-image bg-cover bg-no-repeat bg-center lg:h-[513px]">
        <div className="container mx-auto pt-10">
          <div className="grid lg:grid-cols-2 gap-6 place-items-center">
            <div className="">
              <h2 className="mb-4 pt-20 lg:pt-0">
                <span className="text-6xl lg:text-5xl font-normal">
                  <span className="gradient font-extrabold">Contact</span> Us
                </span>
              </h2>
              <p className="text-[#464F54] lg:text-xl">
              Got questions or feedback? We're here to help! Contact us anytime and we'll get back to you quickly</p>
            </div>
            <div className="pt-10">
              <img src={postIMG} alt="post Image" className="lg:h-[433px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="shadow-box-shadow p-4 lg:p-10 my-20 rounded-lg">
          <form className="" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-6 lg:mb-0 mb-4">
              <div className="w-full">
                <label className="block capital text-[#000] text-[15px] mb-2" htmlFor="your-name">
                  Your Name
                </label>
                <input
                  className="rounded-lg appearance-none shadow-box-shadow block w-full bg-transparent text-[#000] border p-4 leading-tight focus:border-black focus:outline-[#87cdff]"
                  id="your-name"
                  placeholder="Enter Your Name Here"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="w-full">
                <label className="block capital text-[#000] text-[15px] mb-2" htmlFor="your-email">
                  Your Email
                </label>
                <input
                  className="rounded-lg appearance-none block w-full bg-transparent text-black shadow-box-shadow border p-4 leading-tight focus:outline-none focus:bg-white focus:outline-[#87cdff]"
                  id="your-email"
                  placeholder="Enter Your Email Here"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="w-full mb-6">
                <label className="block capital text-[#000] text-[15px] mb-2" htmlFor="your-phone">
                  Mobile
                </label>
                <input
                  className="rounded-lg appearance-none block w-full bg-transparent text-black shadow-box-shadow border p-4 leading-tight focus:outline-[#87cdff]"
                  id="your-phone"
                  placeholder="Enter Your Mobile Number Here"
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="w-full mb-6">
                <label className="block capital text-[#000] text-[15px] mb-2" htmlFor="your-subject">
                  Subject
                </label>
                <input
                  className="rounded-lg appearance-none block w-full bg-transparent text-black shadow-box-shadow border p-4 leading-tight focus:outline-none focus:bg-white focus:outline-[#87cdff]"
                  id="your-subject"
                  placeholder="Enter Subject of Contact Here"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="lg:mb-6 mb-10">
              <label htmlFor="message" className="block capital text-[#000] text-[15px] mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows="7"
                placeholder="Enter Your Message Here"
                className="rounded-lg resize-none appearance-none block w-full bg-transparent text-black shadow-box-shadow border p-4 leading-tight focus:outline-none focus:bg-white focus:outline-[#87cdff]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="gradient2 shadow-box-shadow text-xl lg:text-2xl p-3 rounded-lg text-white hover:bg-[#287BB7]"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            {status && <p className="mt-4 text-red-500">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

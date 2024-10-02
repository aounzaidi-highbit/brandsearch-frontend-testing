import React, { useState } from "react";
import postIMG from "../../assets/images/contact.png";
import { HTTP_CLIENT } from "../../utils/axiosClient";
import { contact } from "../../services/business";

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
      const response = await contact(data);
      console.log("Message Response: " + response.data);

      if (response) {
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
      <div className="px-32 bg-contact-image bg-cover bg-no-repeat bg-center">
        <div className="pt-10">
          <div className="flex justify-between items-center">
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
              <img src={postIMG} alt="post Image" className="" />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="shadow-box-shadow p-4 lg:p-10 my-20 rounded-lg">
          <form className="" onSubmit={handleSubmit} autoComplete="off">
            <div className="grid lg:grid-cols-2 gap-6 lg:mb-0 mb-4">
              <div class="relative">
                <input
                  type="text"
                  name="name"
                  required
                  class="w-full p-4 border rounded-xl outline-none focus:border-[#87cdff] peer transition-all duration-300"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label
                  for="name"
                  class={`absolute left-0 p-3 ml-2 mt-1 text-gray-400 pointer-events-none transition-all duration-500 transform 
                    ${name ? '-translate-y-1/2 scale-90 py-0 mt-0 bg-white px-1' : ''} peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-focus:py-0 peer-focus:mt-0 peer-focus:bg-white peer-focus:px-1`}>
                  Enter Your Name
                </label>
              </div>
              <div class="relative">
                <input
                  type="email"
                  name="email"
                  required
                  class="w-full p-4 border rounded-xl outline-none focus:border-[#87cdff] peer transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  for="email"
                  class={`absolute left-0 p-3 ml-2 mt-1 text-gray-400 pointer-events-none transition-all duration-500 transform 
                    ${email ? '-translate-y-1/2 scale-90 py-0 mt-0 bg-white px-1' : ''} peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-focus:py-0 peer-focus:mt-0 peer-focus:bg-white peer-focus:px-1`}>
                  Enter Your Email
                </label>
              </div>
              <div class="relative">
                <input
                  type="text"
                  name="phone"
                  required
                  class="w-full p-4 border rounded-xl outline-none focus:border-[#87cdff] peer transition-all duration-300"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label
                  for="phone"
                  class={`absolute left-0 p-3 ml-2 mt-1 text-gray-400 pointer-events-none transition-all duration-500 transform 
                    ${phone ? '-translate-y-1/2 scale-90 py-0 mt-0 bg-white px-1' : ''} peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-focus:py-0 peer-focus:mt-0 peer-focus:bg-white peer-focus:px-1`}>
                  Enter Your Phone
                </label>
              </div>
              <div class="relative">
                <input
                  type="text"
                  name="subject"
                  required
                  class="w-full p-4 border rounded-xl outline-none focus:border-[#87cdff] peer transition-all duration-300"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <label
                  for="subject"
                  class={`absolute left-0 p-3 ml-2 mt-1 text-gray-400 pointer-events-none transition-all duration-500 transform 
                    ${subject ? '-translate-y-1/2 scale-90 py-0 mt-0 bg-white px-1' : ''} peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-focus:py-0 peer-focus:mt-0 peer-focus:bg-white peer-focus:px-1`}>
                  Enter Subject
                </label>
              </div>
            </div>
            <div class="relative my-7">
              <textarea
                type="text"
                name="message"
                required
                rows="10"
                class="w-full resize-none p-4 border rounded-xl outline-none focus:border-[#87cdff] peer transition-all duration-300"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <label
                for="message"
                class={`absolute left-0 p-3 ml-2 mt-1 text-gray-400 pointer-events-none transition-all duration-500 transform 
                    ${message ? '-translate-y-1/2 scale-90 py-0 mt-0 bg-white px-1' : ''} peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-focus:py-0 peer-focus:mt-0 peer-focus:bg-white peer-focus:px-1`}>
                Enter Your Message Here
              </label>
            </div>
            <button
              type="submit"
              className="bg-[#287BB7] shadow-box-shadow text-xl lg:text-xl p-3 rounded-lg text-white hover:bg-[#287BB7]"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            {status && <p className="mt-4">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

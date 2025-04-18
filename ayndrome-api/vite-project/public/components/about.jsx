import React from "react";

function AboutPage() {
  return (
    <div className="flex flex-col bg-white text-black">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
          <div className="flex flex-col md:flex-row p-4 sm:p-8 md:p-20 items-center">
            <div className="w-full md:w-1/2 pr-0 md:pr-15">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6">The Tale of Our Achievement Story</h1>
              <p className="text-sm sm:text-base text-black mb-6 sm:mb-8">
                Our achievement story is a testament to teamwork and perseverance.
                Together, we've overcome challenges, celebrated victories, and created
                a narrative of progress and success.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className='bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition'>
                  <h3 className="text-2xl sm:text-3xl font-bold text-black">33+ Years</h3>
                  <p className="text-sm sm:text-base text-black">Influencing Digital Landscapes Together</p>
                </div>
                <div className='bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition'>
                  <h3 className="text-2xl sm:text-3xl font-bold text-black">125+ Projects</h3>
                  <p className="text-sm sm:text-base text-black">Excellence Achieved Through Success</p>
                </div>
                <div className='bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition'>
                  <h3 className="text-2xl sm:text-3xl font-bold text-green-600">26+ Awards</h3>
                  <p className="text-sm sm:text-base text-gray-700">Our Dedication to Innovation Wins Understanding</p>
                </div>
                <div className='bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition'>
                  <h3 className="text-2xl sm:text-3xl font-bold text-green-600">99% Happy Clients</h3>
                  <p className="text-sm sm:text-base text-gray-700">Mirrors our Focus on Client Satisfaction</p>
                </div>
              </div>

              <button className="mt-6 sm:mt-8 px-4 sm:px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm sm:text-base">
                Read More
              </button>
            </div>

            <div className="w-full md:w-2/3 mt-6 sm:mt-8 md:mt-0 ml-5">
              <div className="rounded-lg overflow-hidden">
                <img
                  src="https://img.freepik.com/free-vector/teamwork-characters-operator-crew-front-screen-presentations_33099-1621.jpg?t=st=1744913544~exp=1744917144~hmac=7c44b9097eda0cda5a97dba119b6a4f993c9caff5a6745e049cc561aa5582378&w=1380"
                  alt="Team Collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="py-8 sm:py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-600 mb-8 sm:mb-12">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <img src="https://cdn-icons-png.flaticon.com/512/12142/12142368.png" alt="Innovation Icon" className="w-8 sm:w-12 h-8 sm:h-12" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-center text-green-600">Innovation</h3>
              <p className="text-sm sm:text-base text-gray-700 text-center">We continuously push the boundaries of what's possible in autonomous delivery technology.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <img src="https://cdn-icons-png.flaticon.com/512/7957/7957537.png" alt="Sustainability Icon" className="w-8 sm:w-12 h-8 sm:h-12" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-center text-green-600">Sustainability</h3>
              <p className="text-sm sm:text-base text-gray-700 text-center">We're committed to reducing the environmental impact of delivery logistics through zero-emission operations.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <img src="https://cdn-icons-png.flaticon.com/512/12142/12142424.png" alt="Safety Icon" className="w-8 sm:w-12 h-8 sm:h-12" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-center text-green-600">Safety & Reliability</h3>
              <p className="text-sm sm:text-base text-gray-700 text-center">We prioritize the safety of our operations and the reliability of our service above all else.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Team Section */}
      <div className="py-8 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-600 mb-8 sm:mb-12">Leadership Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-8">
            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md text-center">
              <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full mx-auto mb-4 sm:mb-6 overflow-hidden">
                <img src="https://cdn-icons-png.flaticon.com/512/4825/4825038.png" alt="" className='w-full h-full object-cover' />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-1 text-green-600">Shashank</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-2 sm:mb-4">Co-Founder & CEO</p>
              <p className="text-sm sm:text-base text-gray-700">Former aerospace engineer with 15+ years experience in autonomous systems and drone technology.</p>
            </div>
            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md text-center">
              <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full mx-auto mb-4 sm:mb-6 overflow-hidden">
                <img src="https://cdn-icons-png.flaticon.com/512/4825/4825015.png" alt="" className='w-full h-full object-cover' />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-1 text-green-600">Samique</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-2 sm:mb-4">Co-Founder & CTO</p>
              <p className="text-sm sm:text-base text-gray-700">Pioneering robotics researcher with multiple patents in autonomous flight systems and navigation.</p>
            </div>
            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md text-center">
              <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full mx-auto mb-4 sm:mb-6 overflow-hidden">
                <img src="https://cdn-icons-png.flaticon.com/512/4825/4825044.png" alt="" className='w-full h-full object-cover' />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-1 text-green-600">Nikhil</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-2 sm:mb-4">Chief Operations Officer</p>
              <p className="text-sm sm:text-base text-gray-700">Former logistics executive with expertise in scaling delivery networks and operational excellence.</p>
            </div>
            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md text-center">
              <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full mx-auto mb-4 sm:mb-6 overflow-hidden">
                <img src="https://cdn-icons-png.flaticon.com/512/4825/4825087.png" alt="" className='w-full h-full object-cover' />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-1 text-green-600">Abhay</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-2 sm:mb-4">Chief Marketing Officer</p>
              <p className="text-sm sm:text-base text-gray-700">Marketing strategist with a proven track record of building global brands and driving customer engagement.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Impact Section */}
      <div className="py-8 sm:py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-600 mb-8 sm:mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">3.2M+</div>
              <p className="text-lg sm:text-xl text-gray-700">Successful Deliveries</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">85%</div>
              <p className="text-lg sm:text-xl text-gray-700">Reduction in Delivery Times</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">2,500+</div>
              <p className="text-lg sm:text-xl text-gray-700">Tons of CO2 Emissions Saved</p>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 p-4 sm:p-8 bg-white rounded-lg shadow-md">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-green-600">Environmental Commitment</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4">At DroneDrop, we're committed to creating a more sustainable future for logistics. Our all-electric drone fleet produces zero direct emissions, significantly reducing the carbon footprint associated with traditional delivery methods.</p>
            <p className="text-sm sm:text-base text-gray-700 mb-4">We're proud to report that for every package delivered by DroneDrop instead of a traditional delivery vehicle, we reduce carbon emissions by an average of 84%. Additionally, our operational centers are powered by 100% renewable energy, and we're working toward carbon-neutral operations by 2026.</p>
            <p className="text-sm sm:text-base text-gray-700">Through our Green Delivery Initiative, we're also partnering with environmental organizations to plant trees in urban areas along our delivery routes, helping to offset any remaining carbon footprint while improving air quality in the communities we serve.</p>
          </div>
        </div>
      </div>

      {/* Careers Section */}
      <div className="py-8 sm:py-16 bg-white text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-4 sm:mb-6">Join Our Team</h2>
        <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-gray-700">Help us shape the future of delivery technology with innovative solutions that make a real difference.</p>
        <button className="bg-green-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold hover:bg-green-700 transition duration-200 text-sm sm:text-base">
          View Open Positions
        </button>
      </div>
    </div>
  );
}

export default AboutPage;
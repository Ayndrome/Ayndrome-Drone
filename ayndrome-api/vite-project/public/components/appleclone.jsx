import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../apple.css';
import '../apple.js';
function App() {
   const navigate = useNavigate();
   const [isListening, setIsListening] = useState(false);
   const [voiceResponse, setVoiceResponse] = useState(null);
   const [error, setError] = useState(null);

   const handle = () => {
  
     
      navigate('/app');
   }

   const startVoiceInput = async () => {
     try {
       setIsListening(true);
       setError(null);
       setVoiceResponse(null);

       const stream = await navigator.mediaDevices.getUserMedia({ 
         audio: {
           sampleRate: 44100,
           channelCount: 1,
           echoCancellation: true,
           noiseSuppression: true
         } 
       });
       
       const mediaRecorder = new MediaRecorder(stream, {
         mimeType: 'audio/webm;codecs=opus'
       });
       
       const audioChunks = [];

       mediaRecorder.ondataavailable = (event) => {
         audioChunks.push(event.data);
       };

       mediaRecorder.onstop = async () => {
         try {
           const audioBlob = new Blob(audioChunks, { type: 'audio/webm;codecs=opus' });
           const formData = new FormData();
           formData.append('audio', audioBlob, 'recording.webm');

           console.log('Sending audio data to server...');
           const response = await fetch('http://localhost:5000/process-voice', {
             method: 'POST',
             body: formData,
           });

           if (!response.ok) {
             const errorData = await response.json();
             throw new Error(errorData.message || 'Server error');
           }

           const data = await response.json();
           console.log('Server response:', data);

           if (data.status === 'success') {
             setVoiceResponse(data);
           } else {
             setError(data.message || 'Unknown error occurred');
           }
         } catch (err) {
           console.error('Error processing voice input:', err);
           setError(err.message || 'Failed to process voice input');
         } finally {
           stream.getTracks().forEach(track => track.stop());
           setIsListening(false);
         }
       };

       mediaRecorder.start();
       setTimeout(() => {
         mediaRecorder.stop();
       }, 5000); // Record for 5 seconds
     } catch (err) {
       console.error('Error accessing microphone:', err);
       setError('Failed to access microphone. Please ensure microphone permissions are granted.');
       setIsListening(false);
     }
   };

   const whiteGradient = {
    backgroundImage: 'linear-gradient(135deg, rgb(84, 84, 88), white, rgb(84, 84, 88))',
    WebkitBackgroundClip: 'text',
    color: 'transparent'
  }

  return (
    <div className="main bg-black">
   {/* <!-- hero section & navbar --> */}
    <section id="page" className="h-auto w-full bg-black relative">
        <div className="navbar-container">
            <nav className="h-[7vh] w-[60vw] fixed top-0 left-[20%] px-5 bg-black mx-auto text-[#c2c2c2]">
                <ul className="flex justify-between items-center px-2 py-2 text-xs ">
                    <li className="w-4 h-4">
                        <a href="#">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNIhxgVeeP2Lr6nfxVMK7zgHywXVSQIy8dfw&s" alt="" />
                        </a>
                    </li>
                    <li className="hover:text-white"><a href="#">Store</a></li>
                    <li className="hover:text-white"><a href="#">Mac</a></li>
                    <li className="hover:text-white"><a href="#">iPad</a></li>
                    <li className="hover:text-white"><a href="#">iPhone</a></li>
                    <li className="hover:text-white"><a href="#">Watch</a></li>
                    <li className="hover:text-white"><a href="#">AirPods</a></li>
                    <li className="hover:text-white"><a href="#">TV & Home</a></li>
                    <li className="hover:text-white"><a href="#">Entertainment</a></li>
                    <li className="hover:text-white"><a href="#">Accessories</a></li>
                    <li className="hover:text-white"><a href="#">Support</a></li>
                </ul>
            </nav>

            <nav className="h-[7vh] w-[60vw] fixed top-10 left-[20%] bg-black flex justify-between items-center px-5 mx-auto text-[#c2c2c2] overflow-hidden mb-8">
                <h3 className="text-2xl font-extrabold text-white">Ayndrome</h3>
                <div className="w-1/2 flex justify-between items-center px-2 py-2 space-x-4 text-xs overflow-hidden">
                    <span className="hover:text-white">Overview</span>
                    <button className="hover:text-white" onClick={handle}>Tech Specs</button>
                    <span className="hover:text-white">Compare</span>
                    <button className="bg-blue-600 rounded-full py-1 px-3">Buy</button>
                </div>
            </nav>
        </div>

        <div id="parent"> 
            <div id="container" className="relative">
                <canvas></canvas>
                {/* <!-- Titanium text positioned on top of the canvas --> */}
                <h1 
  className="titanium text-9xl font-extrabold"
  style={{
    backgroundImage: 'linear-gradient(135deg, rgb(84, 84, 88), white, rgb(84, 84, 88))',
    WebkitBackgroundClip: 'text',
    color: 'transparent'
  }}
>
  Titanium
</h1>

            </div>

            {/* <!-- current --> */}
            <div className="cinematic-1 flex flex-col invisible justify-evenly h-[30vh] items-center top-[25%] right-5 w-auto absolute z-30">

              <span className="text-4xl bg-clip-text text-transparent absolute right-10 top-0 bg-gradient-to-r opacity-100 from-[#003366] via-[#ffff] to-[#0f52ba]">4/3 CMOS<br/>
                Hasselblad Camera</span>

                <div className="bg-[#dadada] w-[40vw] h-[0.25px] opacity-20"></div>


              </div>

            {/* <!-- current --> */}

            {/* <!-- current --> */}
            <div className="cinematic-2 flex flex-col invisible justify-evenly h-[30vh] items-center top-[55%] left-0 w-auto absolute z-30">

              <span className="text-4xl bg-clip-text text-transparent absolute  top-0 bg-gradient-to-r opacity-100 from-[#003366] via-[#ffff] to-[#0f52ba]">1/1.3″ CMOS<br/>
                Medium Tele<br/> Camera</span>

                <div className="bg-[#dadada] w-[35vw] h-[0.25px] opacity-20 relative top-5 left-40"></div>


              </div>
            
            

        </div>
              {/* <!-- hero section --> */}

        {/* <!-- drone video --> */}
        <section className="textRevealWrapper mt-[30vh] w-full h-auto flex flex-col justify-around relative space-y-[20vh] items-center">
          <div className="reveal-text flex justify-center opacity-0 item-center w-[60%]">

            <h1 className="text-white text-4xl" style={{
    backgroundImage: 'linear-gradient(135deg, rgb(84, 84, 88), white, rgb(84, 84, 88))',
    WebkitBackgroundClip: 'text',
    color: 'transparent'
  }}>Titanium is designed to revolutionize the way you receive your packages — fast, secure, and efficient. Packed with advanced features, Titanium ensures a seamless delivery experience for both businesses and customers.</h1>
          </div>
          <div className="overflow-clip">


            <video src="https://www-cdn.djiits.com/reactor/assets/_next/static/videos/ef2967cd-77c6-4038-a11a-9ec79e8385e5.webm" autoPlay loop muted className="overflow-hidden object-cover bg-transparent"></video>
          </div>
        </section>

        <section className="w-full mt-[50vh] h-[70vh] border border-l-0 border-r-0 border-opacity-50 border-t-gray-700 border-b-gray-700 flex justify-center items-center">

          <div className="h-full w-[50%] border border-r-gray-700 border-l-0 border-opacity-50 border-b-0 border-t-0 flex justify-center items-center overflow-hidden object-cover">
            <video src="https://www.apple.com/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/h2/large_2x.mp4" autoPlay loop muted className="w-[300px] h-[300px]"></video>

          </div>
          <div className="h-full text-white w-[50%] flex justify-center items-center overflow-hidden box-border px-20">
            <h4 className="text-3xl">Powered by H2 chip <span className="opacity-75">carries out more functions than ever, using <span className="bg-clip-text text-transparent bg-gradient-to-r opacity-100 from-[#003366] to-[#0f52ba]">computational algorithms </span>to deliver even smarter noise cancellation, superior three-dimensional sound and more efficient battery life all at once.</span></h4>
          </div>
          
          
        </section>
        {/* <!-- drone video --> */}


        {/* <!-- Hasseblad camera --> */}

        <div className="h-screen flex justify-center items-center object-cover mt-20 overflow-hidden">
          <div className="relative w-full">

            <img src="https://www-cdn.djiits.com/dps/9d36cb401ccf67dfc93beac3efb876b3.jpg" alt="" className="scale-150"/> 
            <div className="absolute top-[30%] left-[10%]">
              <div className="flex flex-col justify-evenly h-[30vh] w-auto relative">

                <span className="text-4xl bg-clip-text text-transparent bg-gradient-to-r opacity-100 from-[#003366] via-[#ffff] to-[#0f52ba]">4/3 CMOS<br/>
                  Hasselblad Camera</span>

                  <div className="bg-[#dadada] w-[35vw] h-[0.25px] opacity-20"></div>


                </div>
            </div>
            
          </div>
        </div>

        {/* <!-- Hasseblad camera/ --> */}


       {/* <!-- droneShots --> */}
        <div className="videoScaleWrapper h-[100vh] w-full flex justify-center items-center">

          <div className="videoContainer object-cover w-[70%] h-[70%]">
            <video src="https://www-cdn.djiits.com/reactor/assets/_next/static/videos/e5910f48-ea2b-44e6-b77c-f130813a4e51.webm" autoPlay loop muted></video>
          </div>

        </div>
  {/* <!-- droneShots --> */}

  {/* <!-- current --> */}
            <div className="videoHoverWrapper h-[150vh]  w-full mt-[300px]">
                <div className="videoHoverContainer object-fill w-full relative">
                  <video src="https://www.apple.com/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/spatial-audio/large.mp4" autoPlay muted loop className="opacity-25 object-cover w-full h-full"></video>

                  <div className="videoTextReveal text-white w-[40%] overflow-hidden opacity-20 text-5xl absolute top-[100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h2><span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#003366_0%,_#0f52ba_50%,_#FFFFFF_100%)]">Up to 2x.</span> Intelligent Safety Systems that Minimise Risk. Automatic return-to-home, collision detection, and secure landing protocols keep your drone safe.</h2>
                  </div>

                </div>
            </div>
  {/* <!-- current --> */}

            {/* <!-- current --> */}
            <section className="arrow-Wrapper w-full h-[130vh] border border-l-0 border-r-0 border-opacity-50 border-t-gray-700 border-b-gray-700 flex justify-center items-center">

              <div className="h-full w-[50%] border border-r-gray-700 border-l-0 border-opacity-50 border-b-0 border-t-0 flex flex-col justify-evenly items-center overflow-hidden object-cover">

                <div className="border-2 w-full relative border-b-gray-700 border-opacity-50 border-t-0 border-r-0 border-l-0">
                  <img src="https://www.apple.com/v/airpods-pro/m/images/overview/noise_cancel_particle__e2ew4rzcyjee_large_2x.jpg"
                       alt="" 
                       className="object-cover w-full"/>
                       <div className="absolute inset-0  flex flex-col justify-center items-center text-white">
                        <span className="text-3xl">Up to</span>
                          <span className="text-7xl bg-clip-text text-transparent bg-gradient-to-tr from-100% from-[#0b5baa] via-15% via-white to-[#0f52ba]">3x</span>

                          <span className="text-3xl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;faster deliveries with<br/>
                            AI-Powered Route Optimization</span>
                       </div>

                      </div>
                      
                      <div className="h-[60%] text-white flex text-3xl font-bold p-20 justify-center items-center text-gray-200">
                        <p className='font-semibold opacity-75' style={whiteGradient}>A driver and acoustic algorithms help pro‑level Active Noise Cancellation remove more unwanted noise. With control over what you hear — and don't hear — you can immerse yourself in music and podcasts, or simply stay focused, like never before.</p>
                      </div>
    
              </div>
              <div className="h-full text-white w-[50%] bg-[url('https://www-cdn.djiits.com/cms/uploads/ec98581df939cd4e91f5807837d889f5.png')] bg-no-repeat bg-[center_bottom_3rem] flex justify-center items-center overflow-hidden box-border px-20 relative">
                  <h3 className="text-3xl text-white absolute top-[10%]" style={{
    backgroundImage: 'linear-gradient(135deg, rgb(84, 84, 88), white, rgb(84, 84, 88))',
    WebkitBackgroundClip: 'text',
    color: 'transparent'
  }}>AI-Powered Route Optimization</h3>



                  <div className="absolute line-and-circle-container top-[15%] opacity-30">
                    <div className="arrow w-px h-0 left-[50%] top-[0%] absolute bg-white"></div>
                    <div className="circle-element size-2 scale-1 rounded-full bg-white absolute left-[calc(50%-4px)] top-[calc(15%+50vh-4px)]"></div>
                  </div>



              </div>
              
              
            </section>
            {/* <!-- current --> */}

            <div id="modelContainer" className="modelContainer mt-[300px] h-screen relative flex justify-center items-center overflow-hidden">
              <div className='fixed-bg absolute inset-0 z-50 bg-[url(https://www-cdn.djiits.com/cms/uploads/7a47e78d9544ac4d7f83a9f840c50b67.png)] bg-no-repeat bg-[center_bottom_3rem] w-full h-full'></div>
              
              <div className='parallax-content absolute h-screen w-full flex flex-col justify-center items-center text-white opacity-0'>
                <div className='text-5xl font-bold mb-8' style={whiteGradient}>
                  Titanium Delivery System
                </div>
                <div className='text-3xl font-medium p-10 max-w-3xl text-center text-gray-200' style={whiteGradient}>
              
                
                  The Titanium Delivery System represents the pinnacle of autonomous logistics technology. With advanced AI-powered navigation, real-time obstacle detection, and precision landing capabilities, our drones deliver packages with unprecedented speed and reliability. The system's modular design allows for seamless integration with existing logistics networks, while its energy-efficient operation reduces environmental impact.
                </div>
              </div>
            </div>

            <div className='h-[100vh] w-full bg-black'></div>

    </section>

    {/* Add voice input button */}
    <div className="fixed bottom-10 right-10 z-50">
      <button
        onClick={startVoiceInput}
        disabled={isListening}
        className={`p-4 rounded-full ${
          isListening ? 'bg-red-500' : 'bg-blue-600'
        } text-white shadow-lg hover:shadow-xl transition-all`}
      >
        {isListening ? 'Listening...' : 'Schedule Delivery'}
      </button>
    </div>

    {/* Display voice response */}
    {voiceResponse && (
      <div className="fixed top-20 right-10 z-50 bg-white p-4 rounded-lg shadow-lg max-w-md">
        <h3 className="text-lg font-semibold mb-2">Voice Response:</h3>
        <p className="text-gray-700">{voiceResponse.text}</p>
        <p className="text-gray-600 mt-2">{voiceResponse.analysis}</p>
      </div>
    )}

    {/* Display error */}
    {error && (
      <div className="fixed top-20 right-10 z-50 bg-red-100 p-4 rounded-lg shadow-lg max-w-md">
        <p className="text-red-600">{error}</p>
      </div>
    )}

  </div>
  );
}

export default App;


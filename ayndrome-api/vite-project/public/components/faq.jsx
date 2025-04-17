import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function FAQPage() {
    const [openQuestion, setOpenQuestion] = useState(null);
  
    const faqs = [
      {
        id: 1,
        question: "How does drone delivery work?",
        answer: "Our autonomous drones pick up your package from the nearest dispatch center, fly to your location following optimized flight paths, and deliver your package to your designated delivery spot. You'll receive real-time updates and can track your delivery through our app."
      },
      {
        id: 2,
        question: "What can I have delivered by drone?",
        answer: "Our drones can deliver most items weighing under 5 pounds (2.3kg), including food, medicine, documents, electronics, and small retail items. Prohibited items include hazardous materials, alcohol, and certain regulated products."
      },
      {
        id: 3,
        question: "What areas do you service?",
        answer: "We currently offer drone delivery in select urban and suburban areas. You can check if your location is serviceable by entering your address in our app or website. We're constantly expanding our coverage areas."
      },
      {
        id: 4,
        question: "How fast is drone delivery?",
        answer: "Most deliveries are completed within 15-30 minutes of ordering, depending on distance, weather conditions, and current demand. Our app provides estimated delivery times when you place your order."
      },
      {
        id: 5,
        question: "Is drone delivery available 24/7?",
        answer: "We operate from 7 AM to 10 PM daily, weather permitting. Service hours may be adjusted during extreme weather conditions or special circumstances."
      },
      {
        id: 6,
        question: "How much does drone delivery cost?",
        answer: "Delivery fees start at $4.99 and vary based on distance, package weight, and delivery urgency. DroneDrop Plus subscribers enjoy free delivery on eligible orders over $15."
      },
      {
        id: 7,
        question: "What happens if no one is home for delivery?",
        answer: "Our drones can safely drop packages at your designated delivery spot without requiring someone to be present. You can also schedule deliveries for specific times or request that the drone waits for someone to receive the package."
      },
      {
        id: 8,
        question: "Is drone delivery safe?",
        answer: "Yes, safety is our top priority. Our drones are equipped with obstacle avoidance technology, redundant systems, and follow strict FAA regulations. They're programmed to navigate safely in various conditions and automatically return to base if they encounter any issues."
      },
      {
        id: 9,
        question: "What if my delivery gets lost or damaged?",
        answer: "In the rare event that a delivery is lost or damaged, contact our customer support within 24 hours. We offer full refunds or replacements for eligible orders according to our delivery guarantee policy."
      },
      {
        id: 10,
        question: "Can I schedule deliveries in advance?",
        answer: "Yes, you can schedule deliveries up to 7 days in advance through our app. This is perfect for regular deliveries or ensuring your package arrives exactly when you need it."
      }
    ];
  
    const toggleQuestion = (id) => {
      if (openQuestion === id) {
        setOpenQuestion(null);
      } else {
        setOpenQuestion(id);
      }
    };
  
    return (
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-600 mb-8">Find answers to the most common questions about DroneDrop services.</p>
  
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <div key={faq.id} className="mb-4 border-b border-gray-200 pb-4">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleQuestion(faq.id)}
              >
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <span className="text-blue-600 text-2xl">
                  {openQuestion === faq.id ? '−' : '+'}
                </span>
              </button>
              {openQuestion === faq.id && (
                <div className="mt-4 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
  
        <div className="mt-12 text-center">
          <p className="mb-4">Can't find what you're looking for?</p>
          <Link to="/help" className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition duration-200">
            Contact Support
          </Link>
        </div>
      </div>
    );
  }

export default FAQPage;
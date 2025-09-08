import Navbar from '../../components/Navbar.jsx';
import Footer from '../../components/Footer.jsx';
import React, { useRef } from 'react';
import ProductCard from '../../components/ProductCard.jsx';
import { useState,useEffect } from 'react';
import { X } from 'lucide-react';

const Home = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300;
    if (direction === 'left') container.scrollLeft -= scrollAmount;
    else container.scrollLeft += scrollAmount;
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <><Navbar />
    
    <div className="font-inter text-stone-800 bg-[#dec0a0]">
        
      {/* Hero Section */}
<section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-12 bg-[#dec0a0]">
  <div className="md:w-1/2 space-y-4 text-left pl-25">
    <h1 className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
      Elevate Your <br className="hidden md:block" /> Wardrobe
    </h1>
    <p className="text-sm text-stone-700">Trendy T-Shirts for Adults</p>
    <p className="text-sm text-stone-600 max-w-md">
      Step into a world of fashionable t-shirts curated just for you. Discover the perfect blend of style and comfort in every piece.
    </p>
    <button className="border border-stone-800 px-6 py-2 mt-2 hover:bg-stone-800 hover:text-white transition">
      Explore Now
    </button>
  </div>
  <div className="md:w-1/2 flex justify-center">
    <img
      src="src/assets/img/home/home-welcome.png" 
      alt="hero"
      className="rounded-lg w-[300px] md:w-[400px] object-cover h-120"
    />
  </div>
  
      </section>

      {/* Best Sellers*/}

   <section className="py-24 px-4 md:px-20 bg-[#f3e6d7] min-h-[100vh] flex flex-col items-center">
      <h2 className="text-4xl font-semibold text-center mb-12 text-black">Best Sellers</h2>

      <div className="relative w-full max-w-7xl bg-[#fef9f3] px-6 py-10 rounded-xl shadow-xl overflow-hidden">

        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10 hidden md:block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* Scrollable Image Row */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide px-2"
        >
          {[
            'tshirt-1.png',
            'tshirt-2.png',
            'tshirt-3.png',
            'tshirt-4.png',
          ].map((file, idx) => (
            <img
              key={idx}
              src={`src/assets/img/home/${file}`}
              alt={`T-shirt ${idx + 1}`}
              className="w-74 h-102 object-cover rounded-lg shadow-md flex-shrink-0"
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10 hidden md:block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </section>


      {/* Promotions*/}
      <section
        className="relative bg-cover bg-center text-stone-900 py-16 px-6 md:px-30 h-120"
        style={{ backgroundImage: 'url(src/assets/img/home/Home-Promotion-1.jpg' }}
      >
        <div className="bg-[#fff6ee] max-w-xl p-6 rounded shadow-lg">
          <p className="text-xs uppercase tracking-wide">Limited Time Offer</p>
          <h2 className="text-2xl font-bold mt-2 mb-4">Exclusive Promotions Await</h2>
          <p className="text-sm text-stone-700 mb-6">
            Don’t miss out on our exciting deals and offers. Grab your favorite tees at amazing prices!
          </p>
          <button className="border border-stone-800 px-6 py-2 hover:bg-stone-800 hover:text-white transition">
            Shop Now
          </button>
        </div>
      </section>

      {/* About*/}
      <section className="flex flex-col md:flex-row items-center justify-between p-6 md:p-16 gap-10 bg-[#f3e6d7]">
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-3xl font-semibold">About</h2>
          <p className="text-sm text-stone-700">
            Alley, the go-to online t-shirt store in India, brings you the latest trends from top brands like Snitch and Lacoste.
            Our AI-integrated platform ensures a seamless shopping experience. Browse through our collection today and redefine your style.
          </p>
          <button className="border border-stone-800 px-6 py-2 mt-2 hover:bg-stone-800 hover:text-white transition">
            Learn More
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src="src\assets\img\home\Home-About.png"
            alt="About Alley"
            className="rounded-xl w-full object-cover"
          />
        </div>
      </section>

      {/* Testimonials*/}
      <section className="p-6 md:p-16">
        <h2 className="text-3xl font-semibold text-center mb-12">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Alexa Young, CA',
              quote: "Testimonials provide a sense of what it’s like to work with you or use your products. Change the text and add your own.",
            },
            {
              name: 'Morgan James, NY',
              quote: "A great testimonial can boost your brand’s image. Click to edit and add your own.",
            },
            {
              name: 'Lisa Driver, MI',
              quote: "Have customers review you and share what they had to say. Click to edit and add their testimonial.",
            },
          ].map(({ name, quote }, idx) => (
            <div key={idx} className="bg-[#fdf7f0] p-6 rounded-lg shadow">
              <div className="text-5xl text-stone-600 mb-4">“</div>
              <p className="text-sm text-stone-700 mb-4">{quote}</p>
              <p className="font-semibold">{name}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer/>
    </div>
</>
  );
};

export default Home;

import Image from "next/image";
import { currentUser } from '@clerk/nextjs/server';


export default async function Home() {
  const user = await currentUser();

  return (
    <main className="flex-grow items-center justify-center flex-col mx-auto container px-10 py-10 text-center">
      <Image className="mb-7 w-full h-[270px] md:h-[350px]" src={'/landing.avif'} height={200} width={500} alt="Landing page"/>
        <section id="hero" className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Grow Your Business with My Digital Services</h2>
          <p className="mb-8">We provide the best digital Ai-based solutions to help you reach your goals.</p>
          {!user ? <a href="/" className="bg-blue-600 text-white py-2 px-4 rounded-lg">Get Started</a>
           : <a href="/dashboard" className="bg-blue-600 text-white py-2 px-4 rounded-lg">Go to dashboard</a>}
        </section>

        <section id="services" className="mb-16">
          <h3 className="text-3xl font-bold mb-2.5">My Services</h3>
          <p className="bg-gray-300 w-fit mx-auto py-1 px-2 rounded-full text-xs">powered by devesh!</p>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold mb-2">SEO Optimization</h4>
                <p>Improve your website&apos;s visibility on search engines.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold mb-2">Social Media Marketing</h4>
                <p>Engage with your audience on social media platforms.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold mb-2">Pay-Per-Click Advertising</h4>
                <p>Drive targeted traffic to your website with PPC ads.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mb-16">
          <h3 className="text-3xl font-bold mb-8">About Me</h3>
          <p>I am experienced digital developer dedicated to helping businesses grow online. My mission is to provide top-notch digital services tailored to your unique needs.</p>
        </section>

      </main>

  );
}

import Link from 'next/link'
import NextImg from 'next/image'

const HeroSection = () => {
  return (
    <main className="relative isolate min-h-screen flex flex-col justify-between items-start -mt-20 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white">
      <NextImg
        src="/images/slide-1.png"
        alt="Background Image"
        quality={100}
        className="absolute inset-0 -z-10 object-cover w-full h-full"
        fill
      />
      <div className="absolute left-6 md:left-12 px-6 md:px-12 top-1/4">
        <div className="flex flex-col items-start">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white font-poppins">
            KETAHESAN
          </h1>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white font-poppins mt-4">
            SWASEMBADA
          </h1>
        </div>
      </div>
      <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12">
      </div>
    </main>
  );
}

export default HeroSection;

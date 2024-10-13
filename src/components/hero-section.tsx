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

      <div className="absolute bottom-6 md:bottom-20 left-6 md:left-12 px-6 md:px-12">
      <Link href="/products" className="inline-flex items-center justify-center px-8 py-3 border border-white text-white text-lg font-semibold rounded-[70px] w-50 h-12 hover:shadow-[0_0_15px_1px_rgba(255,255,255,0.8)] transition-all">
      Shop Now →
      </Link>
      </div>

      <div className="absolute bottom-10 right-6 md:right-12 flex flex-col items-center space-y-4">
      <div className="border border-white rounded-full w-6 h-6"></div>
      <span className="text-white text-sm tracking-wider">SCROLL FOR MORE</span>
      <div className="border-l border-white h-16"></div>
      </div>

    </main>
  );
}

export default HeroSection;

import profileImage from "@/assets/profile.jpg";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className = "" }: HeroSectionProps) {
  return (
    <section
      id="home"
      className={`bg-gradient-to-br from-sky-50 to-sky-100 relative overflow-hidden ${className}`}
    >
      <div className="flex flex-col items-center px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-12 md:py-16 lg:py-20 space-y-6">
        <div className="flex flex-col lg:flex-row justify-between w-full gap-6 md:gap-8 lg:gap-10">
          <div className="flex flex-col w-full lg:w-1/2 space-y-6 md:space-y-8">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-800 leading-tight">
              Hi, I'm{" "}
              <span className="text-sky-600">Fajrul Iman Giat Koentjoro</span>
            </div>
            <div className="bg-white w-full rounded-xl px-5 md:px-6 py-6 md:py-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-3 md:mb-4">
                <span className="text-xl sm:text-2xl md:text-2xl font-bold text-sky-800 leading-snug">
                  Bachelor of Electrical Engineer and Computer Science{" "}
                  <span className="text-sky-600">[3.72/4.00]</span>
                </span>
              </div>
              <div className="flex flex-col space-y-1.5 text-base md:text-lg text-gray-700">
                <div className="font-medium text-sky-700">
                  Universitas Jenderal Soedirman
                </div>
                <div className="text-gray-600">
                  English: TOEFL ITP 567 | IELTS Academic 6.5
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm md:text-base text-gray-600">
                  <span>Age: 25</span>
                  <span className="hidden sm:inline">|</span>
                  <span>Nationality: Indonesian</span>
                  <span className="hidden sm:inline">|</span>
                  <span>Gender: Male</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="flex flex-col w-full max-w-md bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 md:p-6 items-center h-full justify-between">
              <div className="flex-shrink-0 mb-6">
                <img
                  src={profileImage}
                  alt="Profile Picture"
                  className="rounded-full w-48 h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 object-cover border-4 border-sky-200 shadow-md"
                />
              </div>
              <div className="w-full bg-gradient-to-br from-sky-100 to-sky-50 rounded-lg p-4 md:p-5">
                <div className="text-center text-xl md:text-2xl font-bold text-sky-800 mb-1">
                  AI Software Engineer
                </div>
                <div className="text-center text-base md:text-lg font-medium text-gray-700">
                  Team Lead at AICORE Network Solution
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-8 lg:p-10 w-full">
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed text-center">
            <span className="text-sky-600 font-medium">
              Versatile and fast-learning
            </span>{" "}
            <span className="font-semibold text-gray-800">
              Software Engineer
            </span>{" "}
            with production experience building{" "}
            <span className="text-sky-600 font-medium">
              full-stack AI applications
            </span>{" "}
            across web, desktop, and mobile platforms. Skilled in{" "}
            <span className="text-sky-600 font-medium">
              Python (FastAPI, TensorFlow, PyTorch)
            </span>
            , <span className="text-sky-600 font-medium">React TypeScript</span>
            , and cloud integrations on{" "}
            <span className="text-sky-600 font-medium">AWS/GCP</span>.
            Experienced developing{" "}
            <span className="text-sky-600 font-medium">
              Multi Agent AI systems
            </span>{" "}
            with LangChain/LangGraph and deploying{" "}
            <span className="text-sky-600 font-medium">
              containerized services
            </span>{" "}
            with Docker.
          </p>
        </div>
      </div>

      {/* Wave SVG */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-16"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}

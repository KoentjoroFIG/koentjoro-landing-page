import { GraduationCap, Trophy, Briefcase, MapPin } from "lucide-react";
import { Button } from "@/components/atoms/button";

interface ResumeSectionProps {
  className?: string;
}

export function ResumeSection({ className = "" }: ResumeSectionProps) {
  return (
    <section
      id="resume"
      className={`bg-white py-16 md:py-20 lg:py-24 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Fast-learning AI Software Engineer with a proven track record of
            rapid growth and independent problem-solving. In less than one year,
            I progressed from Programming Instructor to leading a team of four
            engineers. I contributed 50%+ of our codebase and independently
            developed core agentic AI features within one month. Successfully
            delivered a working MVP in three months, including advanced AI
            capabilities, after being entrusted to lead the project with only
            four months of prior experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Left Column: Education & Languages */}
          <div className="space-y-6 md:space-y-8">
            {/* Education */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center mb-6 md:mb-8">
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mr-4">
                  <GraduationCap className="w-8 h-8 text-sky-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  Education
                </h3>
              </div>
              <div className="space-y-6">
                <div className="flex">
                  <div className="w-16 md:w-20 text-sm font-semibold text-sky-600 flex-shrink-0">
                    2019 - 2023
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">
                      Bachelor of Electrical Engineering
                    </h4>
                    <p className="text-sky-600 font-medium">
                      Universitas Jenderal Soedirman
                    </p>
                    <p className="text-sm text-gray-500">GPA: 3.72/4.00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Language Skills */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center mb-6 md:mb-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  Languages
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">
                      🇬🇧 English
                    </span>
                    <span className="text-sm font-medium text-purple-600">
                      Professional
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-purple-600 h-full rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    TOEFL ITP: 567 • IELTS Academic: 6.5
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">
                      🇯🇵 Japanese
                    </span>
                    <span className="text-sm font-medium text-purple-600">
                      Starting
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-purple-400 h-full rounded-full"
                      style={{ width: "10%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Early Learning</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Achievements */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-6 md:mb-8">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mr-4">
                <Trophy className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">
                Achievements
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start p-4 md:p-5 bg-sky-50 rounded-lg">
                <div className="text-2xl mr-3 md:mr-4">🏆</div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">
                    Led team of 4 engineers to deliver AI Secretary Platform MVP
                    in 3 months
                  </h4>
                  <span className="text-xs text-gray-500">2025</span>
                </div>
              </div>
              <div className="flex items-start p-4 bg-sky-50 rounded-lg">
                <div className="text-2xl mr-4">⭐</div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">
                    Contributed 50%+ of codebase and developed core agentic AI
                    features in 1 month
                  </h4>
                  <span className="text-xs text-gray-500">2025</span>
                </div>
              </div>
              <div className="flex items-start p-4 bg-sky-50 rounded-lg">
                <div className="text-2xl mr-4">📝</div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">
                    Entrusted to lead new AI project after only 4 months of
                    experience
                  </h4>
                  <span className="text-xs text-gray-500">2024-2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience - Full Width */}
        <ExperienceTimeline />

        {/* Academic Internships */}
        <AcademicInternships />

        {/* Download CV */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 md:mt-12">
          <Button className="bg-sky-500 hover:bg-sky-600 text-white px-8 md:px-10 py-3 md:py-4 text-lg font-semibold rounded-lg shadow-lg w-full sm:w-auto">
            <i className="fas fa-download mr-2"></i>
            Download CV
          </Button>
          <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 md:px-10 py-3 md:py-4 text-lg font-semibold rounded-lg shadow-lg w-full sm:w-auto">
            <i className="fas fa-download mr-2"></i>
            履歴書をダウンロード
          </Button>
        </div>
      </div>
    </section>
  );
}

function ExperienceTimeline() {
  return (
    <div className="bg-white rounded-xl p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 mb-12 md:mb-16">
      <div className="flex items-center mb-8 md:mb-10">
        <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mr-4">
          <Briefcase className="w-8 h-8 text-sky-600" />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">
            Building innovative AI solutions
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200"></div>

        <div className="space-y-6 md:space-y-8">
          {/* Experience 1 */}
          <div className="relative group">
            <div className="bg-gradient-to-br from-white to-sky-50 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-sky-500 md:ml-16">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full mb-3">
                    Apr 2025 - Present · Current Role
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 group-hover:text-sky-600 transition-colors">
                    🚀 AI Software Engineer & Team Lead
                  </h4>
                  <p className="text-sky-600 font-semibold mb-2 flex items-center gap-2">
                    <span className="text-lg">🏢</span>
                    AICORE Network Solution (Japan)
                  </p>
                  <p className="text-gray-600 text-sm font-medium mb-4">
                    AI Secretary Platform (HishoAI) · Web, Desktop & Mobile
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                Led a team of 4 engineers in end-to-end development of an AI
                Secretary platform from scratch to deployment.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-600">
                    Developed agentic chat AI with conversational history
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-600">
                    Built custom AI tools for task & calendar features
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-600">
                    Created LLM-based email task extraction
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-600">
                    Implemented RAG system with Weaviate VDB
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-600">
                    Integrated Gmail webhook & email management
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-600">
                    Set up Docker multi-service architecture
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  LangGraph
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  FastAPI
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  React TypeScript
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                  Docker
                </span>
                <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">
                  Firebase
                </span>
              </div>
            </div>
          </div>

          {/* Experience 2 */}
          <div className="relative group">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-purple-500 md:ml-16">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-3">
                    Nov 2024 - Mar 2025 · 5 months
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    💻 Backend & Machine Learning Engineer
                  </h4>
                  <p className="text-purple-600 font-semibold mb-2 flex items-center gap-2">
                    <span className="text-lg">🏢</span>
                    Bears Cinta Kamu (Japan)
                  </p>
                  <p className="text-gray-600 text-sm font-medium mb-4">
                    Opsguide WebApp (PORTAMENT)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-600">
                    Service integrations (Google Chat, WhatsApp, Telegram)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-600">
                    Full-stack feature implementation
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-600">
                    Bug fixes and feature improvements
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  Python
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  GraphQL
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  React
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                  PostgreSQL
                </span>
              </div>
            </div>
          </div>

          {/* Experience 3 */}
          <div className="relative group">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-green-500 md:ml-16">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mb-3">
                    Jun 2024 - Present · Ongoing
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                    👨‍🏫 Programming Instructor
                  </h4>
                  <p className="text-green-600 font-semibold mb-2 flex items-center gap-2">
                    <span className="text-lg">🏢</span>
                    Coding First Course
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-600">
                    Teaching 7+ programming languages
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-600">
                    Developing text-based programming curriculum
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                  Scratch
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  Python
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  C++
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  C#
                </span>
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-xs font-medium rounded-full">
                  Go
                </span>
                <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">
                  PHP
                </span>
              </div>
            </div>
          </div>

          {/* Experience 4 */}
          <div className="relative group">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-amber-500 md:ml-16">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full mb-3">
                    Jan - Feb 2023 · 2 months
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">
                    🔬 Bioinformatics Student Internship
                  </h4>
                  <p className="text-amber-600 font-semibold mb-2 flex items-center gap-2">
                    <span className="text-lg">🏢</span>
                    NAIST (Japan)
                  </p>
                  <p className="text-gray-600 text-sm font-medium mb-4">
                    Nara Institute of Science and Technology
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-600">
                    Graph theory for leukocyte image clustering
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-600">
                    Drug Discovery project from scratch
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  TensorFlow
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  Scikit-learn
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Graph Theory
                </span>
              </div>
            </div>
          </div>

          {/* Experience 5 */}
          <div className="relative group">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-rose-500 md:ml-16">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-rose-100 text-rose-700 text-xs font-semibold rounded-full mb-3">
                    Aug - Dec 2022 · 5 months
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 group-hover:text-rose-600 transition-colors">
                    📱 Android ML App Developer
                  </h4>
                  <p className="text-rose-600 font-semibold mb-2 flex items-center gap-2">
                    <span className="text-lg">🏢</span>
                    LIFE Project
                  </p>
                  <p className="text-gray-600 text-sm font-medium mb-4">
                    Leucosyte Identifier from Everywhere
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-600">
                    SVM-based leukocyte classification
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-600">
                    Android app development with ML integration
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-600">
                    Image processing & feature extraction
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Java
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  Android Studio
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  SVM
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                  Scikit-learn
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AcademicInternships() {
  return (
    <div className="bg-gradient-to-br from-white to-indigo-50 rounded-xl p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100 mb-12 md:mb-16">
      <div className="flex items-center mb-8 md:mb-10">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
          <GraduationCap className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
            Academic Internships
          </h3>
          <p className="text-sm text-gray-500">
            Research & Innovation in Japan
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Ehime University Internship - CURRENT */}
        <div className="relative group">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-emerald-500 h-full">
            <div className="flex flex-col mb-4">
              <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full mb-3 self-start">
                Dec 2024 - Present · Ongoing
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                🧬 RNA Seq Analysis Intern
              </h4>
              <p className="text-emerald-600 font-semibold mb-2 flex items-center gap-2">
                <span className="text-lg">🏛️</span>
                Ehime University (Prof. Masashi Yukawa Lab)
              </p>
              <p className="text-gray-600 text-sm font-medium mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                Online, Indonesia - Ehime, Japan
              </p>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed text-sm">
              Online internship focused on DNA and RNA sequencing analysis with
              applications in cancer early diagnosis.
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm text-gray-600">
                  Gained foundational knowledge in DNA and RNA sequencing
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm text-gray-600">
                  Learned to handle RNA-Seq data (FASTQ format) and processing
                  pipelines
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm text-gray-600">
                  Acquired hands-on experience with AWS EC2 for bioinformatics
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm text-gray-600">
                  Drafted research proposal on ML for cancer early diagnosis
                  from blood
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                RNA-Seq
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                FASTQ
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                AWS EC2
              </span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                Machine Learning
              </span>
              <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">
                Bioinformatics
              </span>
            </div>
          </div>
        </div>

        {/* NAIST Internship */}
        <div className="relative group">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-indigo-500 h-full">
            <div className="flex flex-col mb-4">
              <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full mb-3 self-start">
                Jan - Feb 2023 · 2 months
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                🔬 Computational Drug Discovery Intern
              </h4>
              <p className="text-indigo-600 font-semibold mb-2 flex items-center gap-2">
                <span className="text-lg">🏛️</span>
                Nara Institute of Science and Technology (Prof. Shigehiko Kanaya
                Lab)
              </p>
              <p className="text-gray-600 text-sm font-medium mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                Nara, Japan
              </p>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed text-sm">
              Student internship focused on Project-Based Learning (PBL) for
              computational drug discovery research.
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm text-gray-600">
                  Conducted PBL initiative achieving{" "}
                  <strong>90% accuracy with Random Forest model</strong>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm text-gray-600">
                  Successfully completed graph clustering task -{" "}
                  <strong>only intern to reach this milestone</strong>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm text-gray-600">
                  Demonstrated strong adaptability and cross-cultural
                  communication skills
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                Random Forest
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                Graph Clustering
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Drug Discovery
              </span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                PBL
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Highlight */}
      <div className="mt-6 md:mt-8 bg-gradient-to-r from-indigo-50 to-emerald-50 rounded-lg p-5 md:p-6 border border-indigo-200">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🎓</div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800 mb-2 text-sm md:text-base">
              International Research Excellence
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Gained prestigious international research experience at two top
              Japanese universities, specializing in bioinformatics and machine
              learning applications in healthcare. Achieved exceptional results
              including 90% accuracy in drug discovery modeling and being the
              only intern to complete the graph clustering milestone at NAIST.
              Currently advancing RNA sequencing analysis and cancer diagnosis
              research at Ehime University.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

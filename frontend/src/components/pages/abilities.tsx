import { CodeXmlIcon, ToolCaseIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/tooltip";

// Import all icons
import { CIcon } from "@/components/atoms/Icons/c";
import { CppIcon } from "@/components/atoms/Icons/cpp";
import { DockerIcon } from "@/components/atoms/Icons/docker";
import { ElectronIcon } from "@/components/atoms/Icons/electron";
import { FastapiIcon } from "@/components/atoms/Icons/fastapi";
import { GraphqlIcon } from "@/components/atoms/Icons/graphql";
import { JavaScriptIcon } from "@/components/atoms/Icons/javascript";
import { LangchainIcon } from "@/components/atoms/Icons/langchain";
import { LanggraphIcon } from "@/components/atoms/Icons/langgraph";
import { NpmIcon } from "@/components/atoms/Icons/npm";
import { PnpmIcon } from "@/components/atoms/Icons/pnpm";
import { PostgressIcon } from "@/components/atoms/Icons/postgess";
import { PostmanIcon } from "@/components/atoms/Icons/postman";
import { PydenticIcon } from "@/components/atoms/Icons/pydentic";
import { PythonIcon } from "@/components/atoms/Icons/python";
import { PytorchIcon } from "@/components/atoms/Icons/pytorch";
import { ReactIcon } from "@/components/atoms/Icons/react";
import { RedisIcon } from "@/components/atoms/Icons/redis";
import { SqlalchemyIcon } from "@/components/atoms/Icons/sqlalchemy";
import { StrawberryIcon } from "@/components/atoms/Icons/strawberry";
import { TensorflowIcon } from "@/components/atoms/Icons/tensorflow";
import { TypeScriptIcon } from "@/components/atoms/Icons/typescript";
import { ViteIcon } from "@/components/atoms/Icons/vite";

interface AbilitiesSectionProps {
  className?: string;
}

export function AbilitiesSection({ className = "" }: AbilitiesSectionProps) {
  const ProgLangIcons = [
    { Component: PythonIcon, size: 120, label: "Python" },
    { Component: JavaScriptIcon, size: 120, label: "JavaScript" },
    { Component: TypeScriptIcon, size: 120, label: "TypeScript" },
    { Component: CppIcon, size: 120, label: "C++" },
    { Component: CIcon, size: 120, label: "C" },
    // { Component: GoIcon, size: 180, label: "Go" },
    // { Component: RustIcon, size: 120, label: "Rust" },
  ];

  const FrameworkIcons = [
    { Component: FastapiIcon, size: 120, label: "FastAPI" },
    { Component: ReactIcon, size: 120, label: "React" },
    { Component: ElectronIcon, size: 120, label: "Electron" },
    { Component: ViteIcon, size: 120, label: "Vite" },
    { Component: GraphqlIcon, size: 120, label: "GraphQL" },
    { Component: RedisIcon, size: 120, label: "Redis" },
    { Component: SqlalchemyIcon, size: 40, label: "SQLAlchemy" },
    { Component: TensorflowIcon, size: 120, label: "Tensorflow" },
    { Component: PytorchIcon, size: 120, label: "PyTorch" },
    { Component: PostgressIcon, size: 120, label: "PostgreSQL" },
    { Component: LangchainIcon, size: 80, label: "Langchain" },
    { Component: LanggraphIcon, size: 80, label: "Langgraph" },
    { Component: PydenticIcon, size: 120, label: "Pydentic" },
    { Component: NpmIcon, size: 80, label: "NPM" },
    { Component: PnpmIcon, size: 120, label: "PNPM" },
    { Component: PostmanIcon, size: 120, label: "Postman" },
    { Component: StrawberryIcon, size: 120, label: "Strawberry" },
    { Component: DockerIcon, size: 110, label: "Docker" },
  ];

  return (
    <section
      id="abilities"
      className={`bg-gray-50 py-16 md:py-20 lg:py-24 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            My Skills & Abilities
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Comprehensive technical expertise across full-stack development,
            machine learning, and AI systems.
          </p>
        </div>

        <div className="space-y-8 md:space-y-12">
          {/* Programming Languages */}
          <div className="bg-white rounded-xl p-6 md:p-8 lg:p-10 shadow-lg">
            <div className="flex items-center justify-center mb-8 md:mb-10 text-xl md:text-2xl font-semibold text-sky-800">
              <CodeXmlIcon className="mr-3" />
              <span>Programming Languages</span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-10">
              {ProgLangIcons.map(({ Component, size, label }) => (
                <Tooltip key={label}>
                  <TooltipTrigger>
                    <div className="flex flex-col items-center p-3 md:p-4 hover:bg-sky-50 rounded-lg transition-colors">
                      <Component size={size} />
                      <span className="text-sm font-medium text-gray-600 mt-2">
                        {label}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Frameworks and Libraries */}
          <div className="bg-white rounded-xl p-6 md:p-8 lg:p-10 shadow-lg">
            <div className="flex items-center justify-center mb-8 md:mb-10 text-xl md:text-2xl font-semibold text-sky-800">
              <ToolCaseIcon className="mr-3" />
              <span>Frameworks & Libraries</span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-10">
              {FrameworkIcons.map(({ Component, size, label }) => (
                <Tooltip key={label}>
                  <TooltipTrigger>
                    <div className="flex flex-col items-center p-4 hover:bg-sky-50 rounded-lg transition-colors">
                      <Component size={size} />
                      <span className="text-sm font-medium text-gray-600 mt-2">
                        {label}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Core Competencies */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <h3 className="text-xl font-bold text-sky-600 mb-4">
                🤖 Machine Learning & AI
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Classical ML (KNN, SVM, K-Means)</li>
                <li>• Deep Learning (CNN, YOLO, NLP)</li>
                <li>• TensorFlow, Keras, PyTorch</li>
                <li>• Agentic AI Systems</li>
                <li>• Multi-modal AI Integration</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <h3 className="text-xl font-bold text-sky-600 mb-4">
                🌐 Full-Stack Development
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• React TypeScript, Next.js</li>
                <li>• FastAPI, Flask, SQLAlchemy</li>
                <li>• PostgreSQL, Redis</li>
                <li>• REST & GraphQL APIs</li>
                <li>• Electron Desktop Apps</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <h3 className="text-xl font-bold text-sky-600 mb-4">
                ☁️ Cloud & DevOps
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Docker Containerization</li>
                <li>• AWS (EC2, Lambda, S3)</li>
                <li>• Google Cloud Platform</li>
                <li>• Firebase Auth & Services</li>
                <li>• CI/CD Pipelines</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <h3 className="text-xl font-bold text-sky-600 mb-4">
                🔧 Tools & Technologies
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Git Version Control</li>
                <li>• PNPM, NPM Package Management</li>
                <li>• Postman API Testing</li>
                <li>• Vite Build Tools</li>
                <li>• Modern Frontend Tooling</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <h3 className="text-xl font-bold text-sky-600 mb-4">
                🚀 Specialized Systems
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• LangChain & LangGraph</li>
                <li>• PydanticAI Development</li>
                <li>• Multi-agent Architectures</li>
                <li>• RAG Systems</li>
                <li>• Natural Language SQL</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <h3 className="text-xl font-bold text-sky-600 mb-4">
                💼 Leadership & Soft Skills
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Team Leadership (4+ engineers)</li>
                <li>• Project Management</li>
                <li>• Technical Architecture</li>
                <li>• Cross-platform Development</li>
                <li>• Fast Learning & Adaptation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

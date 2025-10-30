import { useState } from "react";
import { Lightbulb, Lock, ChartBar, Crown, ArrowUp } from "lucide-react";
import { Button } from "@/components/atoms/button";

interface BidToHireSectionProps {
  className?: string;
}

export function BidToHireSection({ className = "" }: BidToHireSectionProps) {
  const [activeTab, setActiveTab] = useState<"owner" | "company">("owner");
  const [bidFormData, setBidFormData] = useState({
    companyName: "",
    position: "",
    worksite: "",
    type: "",
    salary: "",
    benefits: [] as string[],
    message: "",
  });

  const offers = [
    {
      rank: 1,
      position: "Senior Full-Stack Engineer",
      worksite: "Remote",
      type: "Full-time",
      salary: "$135,000",
      bonus: "+ $20k signing bonus",
      benefits: ["Health insurance", "Remote work", "Stock options"],
      badge: "gold",
    },
    {
      rank: 2,
      position: "Senior Software Engineer",
      worksite: "Hybrid",
      type: "Full-time",
      salary: "$128,000",
      bonus: "+ Stock options",
      benefits: ["Health insurance", "Hybrid work", "Stock options"],
      badge: "silver",
    },
    {
      rank: 3,
      position: "Lead Data Scientist",
      worksite: "Remote",
      type: "Full-time",
      salary: "$125,000",
      bonus: "+ Equity package",
      benefits: ["Health insurance", "Remote work", "Equity package"],
      badge: "bronze",
    },
    {
      rank: 4,
      position: "ML Engineer",
      worksite: "Remote",
      type: "Full-time",
      salary: "$118,000",
      bonus: "+ Performance bonus",
      benefits: ["Health insurance", "Remote work", "Performance bonus"],
      badge: "default",
    },
  ];

  const handleBenefitChange = (benefit: string, checked: boolean) => {
    if (checked) {
      setBidFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, benefit],
      }));
    } else {
      setBidFormData((prev) => ({
        ...prev,
        benefits: prev.benefits.filter((b) => b !== benefit),
      }));
    }
  };

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Bid form submitted:", bidFormData);
    alert(
      "Thank you for your offer! I will review it and get back to you soon."
    );
    setBidFormData({
      companyName: "",
      position: "",
      worksite: "",
      type: "",
      salary: "",
      benefits: [],
      message: "",
    });
  };

  const getRankBadgeStyle = (badge: string) => {
    switch (badge) {
      case "gold":
        return "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg";
      case "silver":
        return "bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-lg";
      case "bronze":
        return "bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-lg";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <section
      id="bid-to-hire"
      className={`bg-sky-50 py-16 md:py-20 lg:py-24 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Bid to Hire Me
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Welcome to the reverse hiring experience! Instead of me applying for
            jobs, companies submit their best offers to hire me.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 mb-12 md:mb-16 lg:mb-20">
          <div className="space-y-6 md:space-y-8">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
              <div className="flex items-center mb-6 md:mb-8">
                <div className="w-15 h-15 bg-sky-100 rounded-full flex items-center justify-center mr-4">
                  <Lightbulb className="w-8 h-8 text-sky-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  How It Works
                </h3>
              </div>
              <ol className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="font-bold text-sky-600 mr-3">1.</span>
                  Sign in or create a company account
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-sky-600 mr-3">2.</span>
                  Review my profile and abilities
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-sky-600 mr-3">3.</span>
                  Submit your best offer
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-sky-600 mr-3">4.</span>
                  I'll review and respond directly
                </li>
              </ol>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 md:p-8 lg:p-10 shadow-lg">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 text-center mb-8 md:mb-10">
              Place Your Bid
            </h3>
            <form onSubmit={handleBidSubmit} className="space-y-5 md:space-y-6">
              <div>
                <label
                  htmlFor="company-name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company-name"
                  value={bidFormData.companyName}
                  onChange={(e) =>
                    setBidFormData((prev) => ({
                      ...prev,
                      companyName: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Position Offered
                </label>
                <select
                  id="position"
                  value={bidFormData.position}
                  onChange={(e) =>
                    setBidFormData((prev) => ({
                      ...prev,
                      position: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-500 focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select position</option>
                  <option value="Senior Full-Stack Engineer">
                    Senior Full-Stack Engineer
                  </option>
                  <option value="Senior Software Engineer">
                    Senior Software Engineer
                  </option>
                  <option value="Lead Data Scientist">
                    Lead Data Scientist
                  </option>
                  <option value="ML Engineer">ML Engineer</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="worksite"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Work Site
                  </label>
                  <select
                    id="worksite"
                    value={bidFormData.worksite}
                    onChange={(e) =>
                      setBidFormData((prev) => ({
                        ...prev,
                        worksite: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-500 focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select work site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">Onsite</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Type
                  </label>
                  <select
                    id="type"
                    value={bidFormData.type}
                    onChange={(e) =>
                      setBidFormData((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-500 focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="salary"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Proposed Salary (USD)
                </label>
                <input
                  type="number"
                  id="salary"
                  value={bidFormData.salary}
                  onChange={(e) =>
                    setBidFormData((prev) => ({
                      ...prev,
                      salary: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Benefits
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Health insurance",
                    "Remote work",
                    "Stock options",
                    "Equity package",
                    "Performance bonus",
                    "Other",
                  ].map((benefit) => (
                    <label key={benefit} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={bidFormData.benefits.includes(benefit)}
                        onChange={(e) =>
                          handleBenefitChange(benefit, e.target.checked)
                        }
                        className="mr-2 text-sky-500 focus:ring-sky-500"
                      />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message to Candidate
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={bidFormData.message}
                  onChange={(e) =>
                    setBidFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  placeholder="Tell me about your company, the role, and why you'd like to work with me..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 md:py-4 text-lg font-semibold"
              >
                Submit Offer
              </Button>
            </form>

            <div className="flex items-center mt-6 md:mt-8 p-4 md:p-5 bg-sky-50 rounded-lg">
              <Lock className="w-5 h-5 text-sky-600 mr-3" />
              <p className="text-sm text-gray-600">
                All offers are confidential. Only you and I can view the details
                and messages.
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <BidDashboard
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          offers={offers}
          getRankBadgeStyle={getRankBadgeStyle}
        />
      </div>
    </section>
  );
}

interface BidDashboardProps {
  activeTab: "owner" | "company";
  setActiveTab: (tab: "owner" | "company") => void;
  offers: Array<{
    rank: number;
    position: string;
    worksite: string;
    type: string;
    salary: string;
    bonus: string;
    benefits: string[];
    badge: string;
  }>;
  getRankBadgeStyle: (badge: string) => string;
}

function BidDashboard({
  activeTab,
  setActiveTab,
  offers,
  getRankBadgeStyle,
}: BidDashboardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="text-center py-8 md:py-10 lg:py-12 px-4 md:px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Offers and Leaderboard
        </h2>
        <p className="text-gray-600">
          See your offers and how you rank against other companies.
        </p>
      </div>

      <div className="flex justify-center gap-4 px-8 mb-8">
        <Button
          variant={activeTab === "owner" ? "default" : "outline"}
          onClick={() => setActiveTab("owner")}
          className="px-6 py-2"
        >
          Your Offers
        </Button>
        <Button
          variant={activeTab === "company" ? "default" : "outline"}
          onClick={() => setActiveTab("company")}
          className="px-6 py-2"
        >
          Leaderboard
        </Button>
      </div>

      <div className="px-4 md:px-8 pb-8 md:pb-10">
        {activeTab === "owner" && (
          <OwnerOffersTab
            offers={offers}
            getRankBadgeStyle={getRankBadgeStyle}
          />
        )}
        {activeTab === "company" && <CompanyLeaderboardTab />}
      </div>
    </div>
  );
}

function OwnerOffersTab({
  offers,
  getRankBadgeStyle,
}: {
  offers: BidDashboardProps["offers"];
  getRankBadgeStyle: BidDashboardProps["getRankBadgeStyle"];
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 md:p-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Your Offers</h3>

      <div className="space-y-4">
        {offers.map((offer) => (
          <div
            key={offer.rank}
            className={`flex items-center p-4 bg-white rounded-lg shadow-sm ${
              offer.rank === 1
                ? "border-l-4 border-yellow-400 bg-gradient-to-r from-yellow-50 to-amber-50"
                : ""
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mr-4 ${getRankBadgeStyle(
                offer.badge
              )}`}
            >
              #{offer.rank}
            </div>
            <div className="flex-1 grid grid-cols-5 gap-4 items-center">
              <div>
                <div className="font-medium text-gray-800">
                  {offer.position}
                </div>
              </div>
              <div className="text-center">
                <span className="text-sm text-gray-600">{offer.worksite}</span>
              </div>
              <div className="text-center">
                <span className="text-sm text-gray-600">{offer.type}</span>
              </div>
              <div>
                <div className="font-bold text-sky-600">{offer.salary}</div>
                <div className="text-xs text-gray-500">{offer.bonus}</div>
              </div>
              <div>
                <div className="flex flex-wrap gap-1">
                  {offer.benefits.slice(0, 2).map((benefit, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-sky-50 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <ChartBar className="w-6 h-6 text-sky-500 mr-2" />
          <span className="text-lg font-semibold text-sky-700">
            Offer Summary
          </span>
        </div>
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Highest Offer</div>
            <div className="text-xl font-bold text-sky-600">$135,000</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Average Offer</div>
            <div className="text-xl font-bold text-sky-600">$126,500</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Total Companies</div>
            <div className="text-xl font-bold text-sky-600">11</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Response Rate</div>
            <div className="text-xl font-bold text-sky-600">73%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompanyLeaderboardTab() {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Company Leaderboard
        </h3>
        <div className="flex gap-4">
          <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <option>All Positions</option>
            <option>Software Engineer</option>
            <option>Data Scientist</option>
          </select>
          <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <option>This Month</option>
            <option>Last 3 Months</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 rounded-lg">
          <div className="flex items-center mr-4">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">
              #1
            </div>
            <Crown className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="flex items-center mr-6">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
              FS
            </div>
            <div>
              <div className="font-semibold text-gray-800">FinanceStream</div>
              <div className="text-sm text-gray-500">Fintech • Series B</div>
              <div className="flex items-center">
                <span className="text-yellow-400 text-sm mr-1">★★★★★</span>
                <span className="text-xs text-gray-600">4.8</span>
              </div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="font-bold text-sky-600">$132,500</div>
              <div className="text-xs text-green-600">+8.2%</div>
            </div>
            <div>
              <div className="font-bold text-gray-800">23</div>
              <div className="text-xs text-gray-500">this month</div>
            </div>
            <div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mx-auto">
                85%
              </div>
            </div>
            <div className="flex items-center justify-center">
              <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500">Hot Streak</span>
            </div>
          </div>
        </div>

        {[2, 3, 4, 5].map((rank) => (
          <div
            key={rank}
            className="flex items-center p-4 bg-white rounded-lg opacity-60"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mr-6 ${
                rank === 2
                  ? "bg-gradient-to-br from-gray-300 to-gray-500 text-white"
                  : rank === 3
                  ? "bg-gradient-to-br from-amber-600 to-amber-800 text-white"
                  : "bg-gray-400 text-white"
              }`}
            >
              #{rank}
            </div>
            <div className="flex items-center mr-6">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
              <div>
                <div className="font-semibold text-gray-400">Anonymous</div>
                <div className="text-sm text-gray-400">••••••••••••••••</div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-4 gap-4 text-center text-gray-400">
              <div>•••••</div>
              <div>•••••</div>
              <div>•••</div>
              <div>•••</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">
            💡 Market Insights
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Fintech companies are offering 12% above market average</li>
            <li>• Remote positions command 8% higher salaries</li>
            <li>
              • Companies with equity packages have 23% higher acceptance rates
            </li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">
            🎯 Your Competitive Advantage
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Your skills are in the top 5% demand</li>
            <li>• Average response time: 2.3 days</li>
            <li>
              • Companies are willing to negotiate 15% above initial offer
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

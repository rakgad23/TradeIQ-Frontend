import React, { useEffect } from 'react';
import { BarChart3, Bot, Search, TrendingUp, Users, Shield, ArrowRight, Check, Star, Zap, Target, DollarSign, ChevronDown } from 'lucide-react';

interface LandingProps {
  onEnterApp: () => void;
  onSignIn?: () => void;
  onSignUp?: () => void;
}

const Landing: React.FC<LandingProps> = ({ onEnterApp, onSignIn, onSignUp }) => {
  const features = [
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track your Amazon products performance with live data updates and comprehensive metrics."
    },
    {
      icon: Bot,
      title: "AI Co-Pilot",
      description: "Get intelligent recommendations to optimize your listings and improve your sales performance."
    },
    {
      icon: Search,
      title: "Listing Optimizer",
      description: "Automatically optimize your product listings for better visibility and conversion rates."
    },
    {
      icon: TrendingUp,
      title: "Revenue Tracking",
      description: "Monitor your revenue streams and identify opportunities for growth across all your products."
    },
    {
      icon: Users,
      title: "Competitor Analysis",
      description: "Stay ahead of the competition with detailed competitor insights and market trends."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee for your business-critical data."
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "AI Agent automates pricing & ads",
      description: "Let AI handle complex pricing strategies and ad optimization while you focus on growth."
    },
    {
      icon: Target,
      title: "Product Co-Pilot instant action steps",
      description: "Get immediate, actionable insights for every product in your catalog."
    },
    {
      icon: DollarSign,
      title: "Inventory restocks without manual work",
      description: "Automated inventory management that prevents stockouts and overstock situations."
    },
    {
      icon: TrendingUp,
      title: "Competitor analysis without manual digging",
      description: "Deep market insights delivered automatically to your dashboard."
    }
  ];

  const beforeAfter = [
    {
      before: "Tedious, time-consuming manual tasks",
      after: "One streamlined dashboard with actionable insights"
    },
    {
      before: "AI Agent trains on your data",
      after: "Automated optimization within minutes"
    },
    {
      before: "Inventory optimizing within minutes",
      after: "Predictive restocking and demand forecasting"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "FBA Seller",
      content: "TradeIQ Pro increased my revenue by 45% in just 3 months. The AI recommendations are incredibly accurate.",
      avatar: "SJ"
    },
    {
      name: "Mike Chen",
      role: "eCommerce Manager", 
      content: "The best Amazon analytics tool I've used. The interface is intuitive and the insights are actionable.",
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Online Retailer",
      content: "Game-changer for my business. I can now make data-driven decisions that actually move the needle.",
      avatar: "ER"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "Free",
      description: "Perfect for getting started",
      features: [
        "Basic analytics",
        "5 product limit",
        "Email support"
      ]
    },
    {
      name: "Growth",
      price: "$29/mo",
      description: "For growing businesses",
      features: [
        "Full Agent AI analysis",
        "Unlimited products",
        "Priority support",
        "Advanced reporting"
      ],
      popular: true
    },
    {
      name: "Pro",
      price: "$79/mo", 
      description: "For enterprise sellers",
      features: [
        "Unlimited AI Agent",
        "Custom integrations",
        "Dedicated support",
        "White-label options"
      ]
    }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToContent = () => {
    document.getElementById('what-it-does')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Enhanced Analytics Chart Component
  const AnalyticsChart = () => (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-800 text-lg font-semibold">Live Analytics</h3>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.3s'}}></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.6s'}}></div>
          </div>
        </div>
        
        {/* Enhanced Chart bars */}
        <div className="flex items-end justify-between h-32 mb-6 bg-gray-50 rounded-lg p-4">
          {[65, 85, 45, 95, 75, 60, 80].map((height, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="w-6 rounded-t-lg shadow-lg transition-all duration-1000 ease-out"
                style={{
                  height: `${height}%`,
                  background: `linear-gradient(to top, ${
                    index % 3 === 0 ? '#3B82F6' : 
                    index % 3 === 1 ? '#8B5CF6' : 
                    '#10B981'
                  }, ${
                    index % 3 === 0 ? '#60A5FA' : 
                    index % 3 === 1 ? '#A78BFA' : 
                    '#34D399'
                  })`,
                  animationDelay: `${index * 0.2}s`,
                  transform: 'translateY(0)',
                }}
              ></div>
              <div className="text-xs text-gray-600 mt-2">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</div>
            </div>
          ))}
        </div>
        
        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
            <div className="text-gray-600 text-sm">Revenue</div>
            <div className="text-gray-900 text-xl font-semibold flex items-center">
              <TrendingUp className="w-5 h-5 text-green-500 mr-2 animate-pulse" />
              $24,567
            </div>
            <div className="text-green-600 text-sm">+18% today</div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="text-gray-600 text-sm">Orders</div>
            <div className="text-gray-900 text-xl font-semibold flex items-center">
              <TrendingUp className="w-5 h-5 text-blue-500 mr-2 animate-pulse" />
              1,234
            </div>
            <div className="text-blue-600 text-sm">+12% today</div>
          </div>
        </div>
        
        {/* Animated data points */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
    </div>
  );

  const handleAuthAction = (action: 'signin' | 'signup') => {
    if (action === 'signin' && onSignIn) {
      onSignIn();
    } else if (action === 'signup' && onSignUp) {
      onSignUp();
    } else {
      // Fallback to entering the app if no specific handlers provided
      onEnterApp();
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Custom CSS for animations */}
      <style>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(32px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-fade-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          100% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 3s ease infinite;
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600 pulse-glow" />
              <span className="ml-2 text-xl text-gray-900 font-semibold">TradeIQ</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleAuthAction('signin')}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => handleAuthAction('signup')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-20 overflow-hidden">
        {/* Floating Graphics */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full float-animation"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200/30 rounded-full float-animation" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-200/30 rounded-full float-animation" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-60 right-1/3 w-8 h-8 bg-blue-300/40 rounded-full float-animation" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left">
              <h1 className="text-4xl md:text-6xl text-gray-900 mb-6 animate-on-scroll font-semibold">
                Your AI Agent for Amazon —
                <span className="gradient-text block mt-2"> Automate. Optimize. Dominate.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-on-scroll stagger-1">
                Tired of spreadsheets and slow decisions? Let AI run your Amazon business while you focus on strategy.
              </p>
              <div className="mb-8 animate-on-scroll stagger-2">
                <p className="text-sm text-gray-500 mb-4">Used by 1,200+ sellers • 97% retention rate</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 animate-on-scroll stagger-3">
                <button
                  onClick={() => handleAuthAction('signup')}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center pulse-glow font-medium"
                >
                  Start Free - No Credit Card
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Right Column - Enhanced Analytics Chart */}
            <div className="flex justify-center lg:justify-end animate-on-scroll stagger-4">
              <AnalyticsChart />
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="text-center mt-16 animate-on-scroll stagger-4">
            <button 
              onClick={scrollToContent}
              className="text-gray-400 hover:text-gray-600 transition-colors animate-bounce"
            >
              <ChevronDown className="h-8 w-8 mx-auto" />
            </button>
          </div>
        </div>
      </section>

      {/* What It Does Section */}
      <section id="what-it-does" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4 animate-on-scroll font-semibold">
              What It Does
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className={`flex items-start space-x-4 animate-on-scroll stagger-${(index % 4) + 1}`}>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg text-gray-900 mb-2 font-medium">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before vs After Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4 animate-on-scroll font-semibold">
              Before vs After
            </h2>
          </div>
          <div className="space-y-8">
            {beforeAfter.map((item, index) => (
              <div key={index} className={`flex items-center justify-between bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 animate-on-scroll stagger-${index + 1}`}>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-red-600" />
                  </div>
                  <span className="text-gray-900">{item.before}</span>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 animate-pulse" />
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-gray-900">{item.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Graphics */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-32 h-32 bg-blue-100/20 rounded-full float-animation"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-purple-100/20 rounded-full float-animation" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4 animate-on-scroll font-semibold">
              Everything you need to dominate Amazon
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-on-scroll stagger-1">
              Comprehensive tools and insights to help you make data-driven decisions and maximize your profits.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-on-scroll stagger-${(index % 3) + 1} group`}
              >
                <feature.icon className="h-12 w-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl text-gray-900 mb-3 font-medium">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4 animate-on-scroll font-semibold">
              Seller Success Stories
            </h2>
            <p className="text-xl text-gray-600 animate-on-scroll stagger-1">
              See what our customers have to say about TradeIQ Pro
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-on-scroll stagger-${index + 1}`}>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <div className="text-gray-900 font-medium">{testimonial.name}</div>
                    <div className="text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl text-gray-900 mb-8 animate-on-scroll font-semibold">
                How It Works
              </h2>
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "Just connect your Amazon account",
                    description: "Secure integration in under 2 minutes"
                  },
                  {
                    step: 2,
                    title: "AI Agent trains on your data",
                    description: "Our AI analyzes your products and market"
                  },
                  {
                    step: 3,
                    title: "AI starts optimizing within minutes",
                    description: "Watch your performance improve automatically"
                  }
                ].map((item, index) => (
                  <div key={index} className={`flex items-start space-x-4 animate-on-scroll stagger-${index + 1}`}>
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-medium">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center animate-on-scroll stagger-2">
              <button 
                onClick={onEnterApp}
                className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                See it in Action
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4 animate-on-scroll font-semibold">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 animate-on-scroll stagger-1">
              Choose the plan that fits your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm border-2 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-on-scroll stagger-${index + 1} ${
                  plan.popular ? 'border-blue-600 relative scale-105' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-xl text-gray-900 mb-2 font-medium">{plan.name}</h3>
                  <div className="text-3xl text-gray-900 mb-2 font-semibold">{plan.price}</div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleAuthAction('signup')}
                  className={`w-full py-3 px-4 rounded-lg text-center block transition-all duration-300 hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-20 h-20 bg-blue-500/10 rounded-full float-animation"></div>
          <div className="absolute bottom-10 right-20 w-16 h-16 bg-purple-500/10 rounded-full float-animation" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10k+", label: "Active Sellers" },
              { number: "$50M+", label: "Revenue Tracked" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className={`animate-on-scroll stagger-${index + 1}`}>
                <div className="text-4xl text-blue-400 mb-2 gradient-text font-semibold">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-5 left-10 w-12 h-12 bg-white/10 rounded-full float-animation"></div>
          <div className="absolute bottom-5 right-10 w-8 h-8 bg-white/10 rounded-full float-animation" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl mb-4 animate-on-scroll font-semibold">
            Ready to grow your Amazon business?
          </h2>
          <p className="text-xl mb-8 text-blue-100 animate-on-scroll stagger-1">
            Join thousands of successful sellers who trust TradeIQ Pro to optimize their performance.
          </p>
          <button
            onClick={() => handleAuthAction('signup')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center animate-on-scroll stagger-2 font-medium"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <BarChart3 className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-semibold">TradeIQ</span>
            </div>
            <div className="text-gray-400">
              © 2025 TradeIQ. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
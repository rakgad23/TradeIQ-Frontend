import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { 
  Check,
  Crown,
  Zap,
  Shield,
  Star,
  Sparkles
} from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  popular?: boolean;
  features: string[];
  buttonText: string;
  buttonVariant: "default" | "outline";
}

const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "Free",
    period: "",
    description: "Perfect for getting started",
    features: [
      "Basic analytics",
      "5 product limit",
      "Email support"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline"
  },
  {
    id: "growth",
    name: "Growth",
    price: "$29",
    period: "/mo",
    description: "For growing businesses",
    popular: true,
    features: [
      "Full Agent AI analysis",
      "Unlimited products",
      "Priority support",
      "Advanced reporting"
    ],
    buttonText: "Get Started",
    buttonVariant: "default"
  },
  {
    id: "pro",
    name: "Pro",
    price: "$79",
    period: "/mo",
    description: "For enterprise sellers",
    features: [
      "Unlimited AI Agent",
      "Custom integrations",
      "Dedicated support",
      "White-label options"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline"
  }
];

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // Here you would typically handle the plan selection/checkout process
    console.log("Selected plan:", planId);
  };

  return (
    <div className="min-h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                Simple, transparent pricing
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your business needs
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="max-w-6xl mx-auto px-8 py-12">
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-16">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 font-semibold shadow-lg">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`relative overflow-hidden h-full transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'ring-2 ring-blue-500 shadow-lg scale-105 bg-white' 
                    : 'hover:shadow-lg bg-white border-gray-200'
                }`}>
                  {plan.popular && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 pointer-events-none" />
                  )}
                  
                  <CardHeader className="text-center pb-8 relative">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-bold text-gray-900">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-xl text-gray-600 font-medium">
                            {plan.period}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6 relative">
                    <div className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6">
                      <Button
                        onClick={() => handleSelectPlan(plan.id)}
                        variant={plan.buttonVariant}
                        size="lg"
                        className={`w-full h-12 font-semibold transition-all duration-300 ${
                          plan.popular
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                            : plan.buttonVariant === 'outline'
                            ? 'border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                            : ''
                        }`}
                      >
                        {selectedPlan === plan.id ? (
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Processing...
                          </div>
                        ) : (
                          plan.buttonText
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">30-Day Money Back</h4>
                  <p className="text-gray-600 text-sm">Full refund if you're not satisfied</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Instant Setup</h4>
                  <p className="text-gray-600 text-sm">Get started immediately after signup</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">24/7 Support</h4>
                  <p className="text-gray-600 text-sm">Expert help whenever you need it</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have questions? We have answers. Contact us if you need additional help.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Can I change plans anytime?</h4>
                <p className="text-gray-600 text-sm">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Is there a setup fee?</h4>
                <p className="text-gray-600 text-sm">
                  No setup fees, ever. You only pay the monthly subscription cost for your chosen plan.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">What payment methods do you accept?</h4>
                <p className="text-gray-600 text-sm">
                  We accept all major credit cards, PayPal, and ACH bank transfers for annual plans.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Do you offer custom enterprise plans?</h4>
                <p className="text-gray-600 text-sm">
                  Yes, we offer custom solutions for large enterprises. Contact our sales team to learn more.
                </p>
              </div>
            </div>
          </div>
          
          {/* Add extra padding at bottom to ensure content isn't cut off */}
          <div className="h-16"></div>
        </div>
      </div>
    </div>
  );
}
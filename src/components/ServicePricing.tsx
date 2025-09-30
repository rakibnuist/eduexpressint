'use client';

import { FaCheckCircle, FaPhone, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

interface PricingPlan {
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
  href: string;
  color: string;
}

interface ServicePricingProps {
  serviceName: string;
  plans: PricingPlan[];
  note?: string;
}

export default function ServicePricing({ serviceName, plans, note }: ServicePricingProps) {
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {serviceName} Pricing
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the package that best fits your needs. All packages include expert guidance and support.
        </p>
        {note && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg max-w-2xl mx-auto">
            <p className="text-blue-800 text-sm">{note}</p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
              plan.popular 
                ? 'border-blue-500 transform scale-105' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  {plan.originalPrice && (
                    <span className="text-lg text-gray-400 line-through mr-2">
                      {plan.originalPrice}
                    </span>
                  )}
                  <span className={`text-4xl font-bold ${plan.color}`}>
                    {plan.price}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <FaCheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`w-full block text-center py-4 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need a Custom Package?
          </h3>
          <p className="text-gray-600 mb-6">
            We understand that every student's needs are unique. Contact us for a personalized quote 
            that matches your specific requirements and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
            >
              <FaPhone className="h-5 w-5" />
              Get Custom Quote
            </Link>
            <Link
              href="mailto:info@eduexpress.com"
              className="border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 inline-flex items-center gap-2"
            >
              <FaEnvelope className="h-5 w-5" />
              Email Us
            </Link>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="mt-12 text-center">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 max-w-2xl mx-auto">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Options</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
            <div className="flex items-center justify-center">
              <span>💳 Credit Card</span>
            </div>
            <div className="flex items-center justify-center">
              <span>🏦 Bank Transfer</span>
            </div>
            <div className="flex items-center justify-center">
              <span>💰 Installments</span>
            </div>
            <div className="flex items-center justify-center">
              <span>📱 Mobile Banking</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            All payments are secure and processed through our trusted payment partners.
          </p>
        </div>
      </div>
    </div>
  );
}

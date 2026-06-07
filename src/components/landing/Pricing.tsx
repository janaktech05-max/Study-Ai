import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Users, Zap } from 'lucide-react';
import { Button } from '../ui';

interface PricingProps {
  onGetStarted: () => void;
}

const plans = [
  {
    name: 'Free',
    icon: Zap,
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out StudyAI',
    features: [
      '5 uploads per month',
      'Basic notes generation',
      '10 flashcards per upload',
      '5 MCQs per upload',
      'Standard AI models',
      'Email support',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    icon: Sparkles,
    price: '$12',
    period: 'per month',
    description: 'Everything you need to ace your exams',
    features: [
      'Unlimited uploads',
      'All note formats',
      'Unlimited flashcards',
      'Unlimited MCQs',
      'Mind maps & question banks',
      'AI chat with notes',
      'Semantic search',
      'Priority support',
      'Advanced AI models',
      'Export to PDF/DOCX',
    ],
    cta: 'Get Pro',
    popular: true,
  },
  {
    name: 'Team',
    icon: Users,
    price: '$29',
    period: 'per user/month',
    description: 'For study groups and institutions',
    features: [
      'Everything in Pro',
      'Shared workspaces',
      'Team collaboration',
      'Admin dashboard',
      'Team analytics',
      'SSO authentication',
      'API access',
      'Dedicated support',
      'Custom integrations',
      'Bulk user management',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export const Pricing: React.FC<PricingProps> = ({ onGetStarted }) => {
  return (
    <section id="pricing" className="py-20 lg:py-32 bg-gray-50 dark:bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Start free and upgrade as you grow. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white dark:bg-dark-800 rounded-2xl shadow-xl border ${
                plan.popular
                  ? 'border-primary-500 scale-105 z-10'
                  : 'border-gray-100 dark:border-dark-700'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-bg text-white text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    plan.popular 
                      ? 'gradient-bg' 
                      : 'bg-gray-100 dark:bg-dark-700'
                  }`}>
                    <plan.icon className={`w-6 h-6 ${
                      plan.popular ? 'text-white' : 'text-primary-500'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-500">{plan.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /{plan.period}
                  </span>
                </div>

                {/* CTA Button */}
                <Button
                  variant={plan.popular ? 'gradient' : 'outline'}
                  className="w-full mb-8"
                  onClick={onGetStarted}
                >
                  {plan.cta}
                </Button>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.popular 
                          ? 'bg-primary-100 dark:bg-primary-900/30' 
                          : 'bg-gray-100 dark:bg-dark-700'
                      }`}>
                        <Check className={`w-3 h-3 ${
                          plan.popular 
                            ? 'text-primary-600 dark:text-primary-400' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`} />
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
            <Check className="w-5 h-5" />
            <span className="font-medium">14-day money-back guarantee • No questions asked</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

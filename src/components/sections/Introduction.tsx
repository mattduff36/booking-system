import { Phone, Mail, Award, Smile, ShieldCheck } from "lucide-react";
import { getBusinessConfig } from '@/lib/config/business-config';

const features = [
  {
    name: "Professional Quality",
    description: "Our services are designed to exceed expectations, providing reliable solutions for all your needs.",
    icon: Smile,
  },
  {
    name: "Safety & Security",
    description: "All our services are fully insured and comply with industry standards for your peace of mind.",
    icon: ShieldCheck,
  },
  {
    name: "Excellent Service",
    description: "We pride ourselves on friendly, reliable service, from initial contact to project completion.",
    icon: Award,
  },
];

const Introduction = () => {
  const config = getBusinessConfig();
  
  return (
    <section className="container mx-auto my-12 rounded-3xl border-4 border-pink-300 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 p-8 shadow-2xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
      {/* Title spanning full width */}
      <div className="text-center mb-8">
        <h2 className="mb-4 text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-pulse">
          🎉 Welcome to {config.business.name} 🎉
        </h2>
        <p className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-800 drop-shadow-lg">
          {config.business.tagline}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Takes up 2 columns on large screens */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <div className="text-lg leading-8 text-gray-700 bg-white/60 rounded-2xl p-4 shadow-lg border-2 border-yellow-300">
              <p className="font-semibold">
                {config.business.description}
              </p>
            </div>
          </div>

          {/* Features in a more compact grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={feature.name} className={`flex flex-col items-center text-center transform hover:scale-110 transition-all duration-300 bg-white/80 rounded-2xl p-4 shadow-lg border-2 ${
                index === 0 ? 'border-pink-400' : index === 1 ? 'border-blue-400' : 'border-green-400'
              }`}>
                <dt className="flex flex-col items-center gap-2 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className={`h-8 w-8 ${
                    index === 0 ? 'text-pink-500' : index === 1 ? 'text-blue-500' : 'text-green-500'
                  } animate-bounce`} aria-hidden="true" />
                  <span className="text-lg">{feature.name}</span>
                </dt>
                <dd className="mt-3 flex flex-auto flex-col text-sm leading-6 text-gray-600">
                  <p className="flex-auto font-medium">{feature.description}</p>
                </dd>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section - Sidebar on large screens */}
        <div className="lg:col-span-1 flex flex-col">
          <div className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 rounded-3xl p-6 shadow-xl border-4 border-rainbow-300 mt-8 lg:mt-0">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-2 text-center">
              🎈 Ready to get started? 🎈
            </h3>
            <p className="mt-3 text-lg text-gray-700 font-semibold text-center">
              Contact us today to discuss your needs!
            </p>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 bg-white/80 rounded-2xl p-3 shadow-lg border-2 border-blue-300 hover:bg-blue-50 transition-all duration-300">
                <Phone className="h-6 w-6 text-blue-600 animate-pulse flex-shrink-0" />
                <a href={`tel:${config.business.contact.phone}`} className="text-lg font-bold text-blue-600 hover:text-blue-800">
                  <span className="sr-only">Call us at {config.business.contact.phone}</span>
                  {config.business.contact.phone}
                </a>
              </div>
              <a href={`mailto:${config.business.contact.email}`} className="flex items-center gap-3 text-xs sm:text-lg font-bold text-purple-600 hover:text-purple-800 bg-white/80 rounded-2xl p-3 shadow-lg border-2 border-purple-300 hover:bg-white/90 transition-all duration-300 group">
                <Mail className="h-6 w-6 animate-pulse flex-shrink-0" />
                <span className="break-all max-w-full">{config.business.contact.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction; 
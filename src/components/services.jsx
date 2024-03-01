import React from 'react';
import Icon from './Icon'; // Adjust the import path to where your Icon component is located

export const Services = ({ data }) => {
  return (
    <div id="services" className="text-center bg-floralwhite">
      <div className="container mx-auto">
        <div className="w-full md:w-10/12 mx-auto py-12">
          <h2 className="text-4xl font-bold mb-12 text-darktheme">
            OUR SERVICES
          </h2>
        </div>
        <div className="flex flex-wrap justify-center">
          {data ? data.map((service, index) => (
            <div key={`${service.name}-${index}`} className="px-4 w-1/2 md:w-1/4 mb-8">
              <div className="text-4xl mx-auto mb-5 w-24 h-24 flex items-center justify-center rounded-full bg-black shadow-md">
                <Icon iconName={service.icon} />
              </div>
              <h3 className="text-xl font-semibold text-darktheme">
                {service.name}
              </h3>
              <p className="mt-2 text-gray-700 h-36 overflow-hidden">
                {service.description}
              </p>
            </div>
          )) : "Loading..."}
        </div>
      </div>
    </div>
  );
};

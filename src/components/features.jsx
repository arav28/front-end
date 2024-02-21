import React from 'react';
import Icon from './Icon'; // Adjust the import path to where your Icon component is located

export const Features = ({ data }) => {
  // Determine the maximum number of lines to display in the feature text.
  // This can be adjusted based on the design requirements.
  const maxTextLines = 3;
  const lineHeight = 6; // Tailwind CSS line height class (1.5rem)
  const maxHeight = maxTextLines * lineHeight; // Adjust this formula based on your line-height

  return (
    <div id="features" className="text-center bg-floralwhite">
      <div className="container mx-auto">
        <div className="w-full md:w-10/12 mx-auto py-12">
          <h2 className="text-4xl font-bold mb-12 text-darktheme">
            FEATURES
          </h2>
        </div>
        <div className="flex flex-wrap justify-center">
          {data ? data.map((feature, index) => (
            <div key={`${feature.title}-${index}`} className="px-4 w-1/2 md:w-1/4 mb-8">
              <div className="text-4xl mx-auto mb-5 w-24 h-24 flex items-center justify-center rounded-full bg-black shadow-md">
                <Icon iconName={feature.icon} />
              </div>
              <h3 className="text-xl font-semibold text-darktheme">
                {feature.title}
              </h3>
              {/* Apply a max-height based on the number of lines and line-height */}
              <p className={`mt-2 text-gray-700 overflow-hidden leading-${lineHeight} h-${maxHeight}`}>
                {feature.text}
              </p>
            </div>
          )) : "Loading..."}
        </div>
      </div>
    </div>
  );
};

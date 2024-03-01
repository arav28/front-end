import React from "react";

export const Header = (props) => {
  return (
    <header id="header" className="w-full bg-no-repeat bg-center bg-cover" style={{ backgroundImage: "url(../../assets/intro3.jpg)", backgroundColor: '#e5e5e5' }}>
      <div className="bg-black bg-opacity-20">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="w-full md:w-2/3 text-center py-44">
              <h1 className="font-raleway text-white text-8xl font-bold uppercase mt-0 mb-2">
                {props.data ? props.data.title : "Loading"}
                <span className="font-extrabold text-blue-500"></span>
              </h1>
              <p className="text-white text-2xl font-light leading-relaxed mx-auto mb-14">
                {props.data ? props.data.paragraph : "Loading"}
              </p>
              <a
                href="#features"
                className="btn btn-custom btn-lg page-scroll inline-block bg-transparent border border-white text-white font-medium text-lg leading-snug uppercase rounded-full px-6 py-3 hover:bg-white hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

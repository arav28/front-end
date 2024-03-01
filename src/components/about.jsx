import React from "react";
import { Link } from 'react-router-dom';

export const About = (props) => {
  return (
    <div id="about" className="py-20 bg-floralwhite text-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
            <img src="../assets/aboutus.jpg" className="img-responsive w-full shadow-lg" alt="" />
          </div>
          <div className="w-full md:w-1/2 px-4">
            <div className="mb-6">
              <h2 className="text-4xl font-semibold relative mb-4 pb-4">ABOUT US
                <span className="absolute bottom-0 left-0 h-1 w-15 bg-gradient-to-r from-blue-400 to-indigo-500"></span>
              </h2>
              <p className="leading-relaxed mb-8 text-justify">
                {props.data ? props.data.paragraph : "loading..."}
              </p>
              <h3 className="text-2xl mb-4">Why Choose Us?</h3>
              <div className="flex flex-wrap -mx-2">
                <div className="w-full sm:w-1/2 px-2">
                  <ul className="list-none ml-0">
                    {props.data
                      ? props.data.Why.map((d, i) => (
                          <li key={`${d}-${i}`} className="mb-2 flex items-center">
                            <i className="fas fa-check text-blue-400 mr-2"></i> {d}
                          </li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

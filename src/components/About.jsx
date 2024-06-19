import React, { useContext } from "react";

const About = () => {
  return (
    <>
      <div className="container my-4">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">
                  About My Notebook App
                </h2>
                <p className="card-text">
                  Welcome to the Notebook App, where you can jot down your
                  thoughts, ideas, and reminders quickly and easily. Our app is
                  designed to be simple yet powerful, allowing you to organize
                  your notes effortlessly.
                </p>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  convallis libero at accumsan venenatis. Cras feugiat porttitor
                  arcu, ut pretium magna lacinia at. Proin ultrices auctor
                  metus, ut tincidunt magna efficitur eu. Ut non tempor urna.
                  Donec id libero risus. Etiam id elit nec magna auctor dapibus
                  sit amet vitae sapien. Suspendisse id quam non sem porttitor
                  vestibulum at sit amet tortor.
                </p>
                <p className="card-text">
                  Curabitur nec velit convallis, malesuada diam eget, tempus
                  nisi. Sed at sapien ex. Pellentesque habitant morbi tristique
                  senectus et netus et malesuada fames ac turpis egestas. Sed
                  nec neque non nunc aliquam cursus. Ut ultricies magna sed ex
                  accumsan, sed blandit nunc ultrices.
                </p>
                <p className="card-text">
                  Sed dapibus ultricies ipsum. Suspendisse potenti. Nulla
                  venenatis turpis sed erat eleifend, nec luctus dolor
                  consequat. Integer malesuada, velit sit amet consequat
                  convallis, erat ipsum vehicula ligula, et tristique felis
                  ligula nec metus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

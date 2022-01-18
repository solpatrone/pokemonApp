import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";

import LandingPage from "../Components/LandingPage/LandingPage";

configure({ adapter: new Adapter() });

describe("<LandingPage />", () => {
  let landingPage;
  beforeEach(() => {
    landingPage = shallow(<LandingPage />);
    expect(isReact.classComponent(LandingPage)).toBetoBeFalsy();
  });

  it('Debería renderizar un <Link /> a la ruta "/home".', () => {
    expect(landingPage.find(Link).length).toBeGreaterThanOrEqual(1);
  });
});

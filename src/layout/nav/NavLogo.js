import React from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PATHS } from 'config.js';

const NavLogo = () => {
  return (
    <div className="logo position-relative mb-0">
      <Link to={DEFAULT_PATHS.APP}>
        {/*
          Logo can be added directly
          <img src="/img/logo/logo-white.svg" alt="logo" />
          Or added via css to provide different ones for different color themes
         */}
        {/* <div className="img" /> */}
        <img src="/tree-fe/img/logo/logo-tpm-landscape-1.png" alt="logo" width={"300px"} height={"45px"} />
      </Link>
    </div>
  );
};
export default React.memo(NavLogo);

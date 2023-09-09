import React from "react";

const gridShop = () => {
  const pageHeaderStyle = {
    backgroundImage: 'url("assets/images/page-header-bg.jpg")',
  };

  return (
    <div>
      <div className="page-header text-center" style={pageHeaderStyle}>
        <div className="container">
          <h1 className="page-title">
            Grid 3 Columns<span>Shop</span>
          </h1>
        </div>
      </div>
      <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="aa">Shop</a>
            </li>
          </ol>
        </div>
      </nav>
    </div>
  );
};

export default gridShop;

import React from 'react'

export default function Header(props) {
    return (
        <>
{/* header-area */}
<header className="header-style-four">
  <div className="header-top-area s-header-top-area d-none d-lg-block">
    <div className="container custom-container-two">
      <div className="row align-items-center">
        <div className="col-lg-6 d-none d-lg-block">
          <div className="header-top-offer">
            <p>get instant access to quality games via IPFS</p>
            <span className="coming-time" data-countdown="2021/3/15" />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="header-social">
            <span className="mr-4">Balance : </span>
            <ul>
              <li className="text-center"><h3>{props.cUSDBalance}</h3> cUSD</li>
              <li className="text-center ml-3"><h3>{props.celoBalance}</h3> CELO</li>
              {/* <li><a href="#"><i className="fab fa-twitter" /></a></li>
              <li><a href="#"><i className="fab fa-pinterest-p" /></a></li>
              <li><a href="#"><i className="fab fa-linkedin-in" /></a></li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="sticky-header" className="header-four-wrap">
    <div className="container custom-container-two">
      <div className="row">
        <div className="col-12">
          <div className="main-menu menu-style-two">
            <nav>
              <div className="logo">
                {/* <a href="index-4.html"><img src="/assets/img/logo/logo_two.png" alt="Logo" /></a> */}
                <h1>Gamify</h1>
              </div>
              <div id="mobile-menu" className="navbar-wrap d-none d-lg-flex">
                <ul>
                  <li><a href="#">Home</a>
                    
                  </li>
               </ul>
              </div>
              
            </nav>
          </div>
          <div className="mobile-menu" />
        </div>
        {/* Modal Search */}
        <div className="modal fade" id="search-modal" tabIndex={-1} role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form>
                <input type="text" placeholder="Search here..." />
                <button><i className="fa fa-search" /></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
{/* header-area-end */}

            
        </>
    )
}

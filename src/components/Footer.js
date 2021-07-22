import React from 'react'

export default function Footer() {
    return (
        <>

        {/* footer-area */}
<footer>
  <div className="footer-top footer-bg s-footer-bg">
  
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="footer-widget mb-50">
            <div className="footer-logo mb-35">
              {/* <a href="/"><img src="/assets/img/logo/logo.png" alt="" /></a> */}
              <h1>Celo Games</h1>
            </div>
            <div className="footer-text">
              <p>The gaming marketplace for you.</p>
             
            </div>
          </div>
        </div>
   
    
      </div>
    </div>
    <div className="footer-fire"><img src="/assets/img/images/footer_fire.png" alt="" /></div>
    <div className="footer-fire footer-fire-right"><img src="/assets/img/images/footer_fire.png" alt="" /></div>
  </div>
  <div className="copyright-wrap s-copyright-wrap">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <div className="copyright-text">
            <p>Copyright © 2021 <a href="#">Celo Games</a> All Rights Reserved.</p>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 d-none d-md-block">
          <div className="payment-method-img text-right">
            <img src="/assets/img/images/card_img.png" alt="img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
{/* footer-area-end */}

            
        </>
    )
}

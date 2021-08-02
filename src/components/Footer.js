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
              <h1>Gamify</h1>
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
      <div className="text-center">
        <div className="copyright-text">
          <p>Copyright © 2021 <a href="#">Gamify</a> All Rights Reserved.</p>
        </div>
      </div>
    </div>
  </div>
</footer>
{/* footer-area-end */}

            
        </>
    )
}

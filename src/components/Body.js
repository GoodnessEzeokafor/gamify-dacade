import BigNumber from "bignumber.js";
import React, { useState } from "react";

const ERC20_DECIMALS = 18;

export default function Body(props) {
  const [title, settitle] = useState(null);
  const [image, setimage] = useState(null);
  const [description, setdescription] = useState(null);
  const [gamefile, setgamefile] = useState(null);
  const [price, setprice] = useState(0);

  // console.log(props.games)
  return (
    <>
      {/* main-area */}
      <main>
        {/* slider-area */}
        <section className="slider-area home-four-slider">
          <div className="slider-active">
            <div className="single-slider slider-bg slider-style-two">
              <div className="container custom-container-two">
                <div className="row">
                  <div className="col-xl-6 col-lg-7 col-md-11">
                    <div className="slider-content">
                      <h6 data-animation="fadeInUp" data-delay=".4s">
                        Celo Games
                      </h6>
                      <h2 data-animation="fadeInUp" data-delay=".4s">
                        Sell <span>Blockchain</span> Games
                      </h2>
                      <p data-animation="fadeInUp" data-delay=".6s">
                        Create and sell your favorite games here on the celo
                        blockchain.
                      </p>
                      {/* <a href="#" className="btn btn-style-two" data-animation="fadeInUp" data-delay=".8s">READ MORE</a> */}
                    </div>
                  </div>
                </div>
                <div className="slider-img">
                  <img
                    src="https://themebeyond.com/html/geco/Geco/img/slider/four_slider_img01.png"
                    alt=""
                    data-animation="slideInRightS"
                    data-delay=".8s"
                  />
                </div>
              </div>
            </div>
            <div className="single-slider slider-bg slider-style-two">
              <div className="container custom-container-two">
                <div className="row">
                  <div className="col-xl-6 col-lg-7 col-md-11">
                    <div className="slider-content">
                      <h6 data-animation="fadeInUp" data-delay=".4s">
                        Celo Games
                      </h6>
                      <h2 data-animation="fadeInUp" data-delay=".4s">
                        Enjoy <span>Quality</span> Games
                      </h2>
                      <p data-animation="fadeInUp" data-delay=".6s">
                        Get access to tons of games and resources via the celo
                        blockchain.
                      </p>
                      {/* <a href="#" className="btn btn-style-two" data-animation="fadeInUp" data-delay=".8s">READ MORE</a> */}
                    </div>
                  </div>
                </div>
                <div className="slider-img">
                  <img
                    src="https://themebeyond.com/html/geco/Geco/img/slider/third_banner_img.png"
                    alt=""
                    data-animation="slideInRightS"
                    data-delay=".8s"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* slider-area-end */}

        {/* shop-area */}
        <section className="shop-area home-four-shop-area pt-115 pb-90">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-8">
                <div className="section-title home-four-title text-center mb-35">
                  <h2>
                    gaming product <span>corner</span>
                  </h2>
                  <p>Easily purchase games here for affordable prices</p>
                </div>
              </div>
            </div>
            <div className="row product-active">
              {props.games.map((game, key) => (
                <div className="col-xl-3" key={key}>
                  <div className="shop-item">
                    <div className="product-thumb">
                      <a href="#">
                        <img src={game.cover_photo} alt="" />
                      </a>
                    </div>
                    <div className="product-content">
                      <div className="product-tag">
                        <a href="#">{game.sales} Sales</a>
                      </div>
                      <h4>
                        <a href="#">{game.game_name}</a>
                      </h4>
                      <div className="product-meta">
                        <div className="product-price">
                          <h5>
                            {" "}
                            {new BigNumber(game.price)
                              .shiftedBy(-ERC20_DECIMALS)
                              .toString()}{" "}
                            cUSD
                          </h5>
                        </div>
                        {/* <div className="product-cart-action">
            <a href="#"><i className="fas fa-shopping-basket" /></a>
            
          </div> */}
                        <div className="newsletter-form">
                          <button
                            onClick={() => {
                              props.purchaseGame(game.price, key, game.ipfs_hash);
                            }}
                          >
                            Purchase <i class="fas fa-paper-plane"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* shop-area-end */}
        {/* 
  <div class="contact-form">
                                <form action="#">
                                    <textarea name="message" id="message" placeholder="Write Message..."></textarea>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <input type="text" placeholder="Your Name">
                                        </div>
                                        <div class="col-md-6">
                                            <input type="email" placeholder="Your Mail">
                                        </div>
                                    </div>
                                    <button>SUBMIT MESSAGE</button>
                                </form>
                            </div> */}

        <section className="featured-game-area new-released-game-area pt-115 pb-90">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8">
                <div className="section-title home-four-title black-title text-center mb-60">
                  <h2>
                    Sell Your <span>GAMES</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="justify-content-center align-content-center">
              <div className="col-lg-6 col-md-8 ">
                <div>
                  <div className="contact-form">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (
                          !title ||
                          !image ||
                          !description ||
                          !gamefile ||
                          !price
                        ) {
                          return alert("Please enter all fields");
                        } else {
                          props.createGame(
                            title,
                            image,
                            description,
                            gamefile,
                            price
                          );
                        }
                        // props.addGane()
                      }}
                    >
                      <textarea
                        name="message"
                        id="message"
                        onChange={(e) => {
                          setdescription(e.target.value);
                        }}
                        placeholder="Game description..."
                      />
                      <div className="row">
                        <div className="col-md-6">
                          <input
                            type="text"
                            required
                            onChange={(e) => {
                              settitle(e.target.value);
                            }}
                            placeholder="Game's Name"
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="number"
                            onChange={(e) => {
                              console.log(e.target.value);
                              setprice(Number(e.target.value));
                            }}
                            placeholder="Game's Price in cUSD"
                          />
                        </div>

                        <div className="col-md-6">
                          <input
                            type="file"
                            onChange={(e) => {
                              setgamefile(e.target.files[0]);
                            }}
                            placeholder="Select zipped game file"
                          />
                        </div>

                        <div className="col-md-6">
                          <input
                            onChange={(e) => {
                              setimage(e.target.value);
                            }}
                            type="text"
                            placeholder="Game cover photo url"
                          />
                        </div>
                      </div>
                      <button type="submit">Click To Create</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* main-area-end */}
    </>
  );
}

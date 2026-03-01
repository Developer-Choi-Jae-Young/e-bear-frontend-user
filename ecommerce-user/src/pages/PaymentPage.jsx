import { useState } from "react";
import "./PaymentPage.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import MyPageHeader from "../components/MyPageHeader";

const PaymentPage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [point, setPoint] = useState("");

  const products = [
    {
      id: 1,
      brand: "유닉스",
      name: "오브제 헤어 드라이기 UN-B1919N",
      price: 41000,
      amount: 1,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=120&h=120&fit=crop"
    },
    {
      id: 2,
      brand: "필립스",
      name: "소닉케어 전동칫솔 3100 시리즈",
      price: 59000,
      amount: 2,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=120&h=120&fit=crop"
    }
  ];

  const totalPrice = products.reduce((sum, item) => sum + (item.price * item.amount), 0);
  
  const handleFullPoint = () => {
    setPoint("7500");
  };

  return (
    <div className="payment-container">
      <MyPageHeader title={"결제화면"} />

      <main className="payment-main">
        <section className="product-list-container">
            {products.map((product) => (
                <div className="product-info-card" key={product.id}>
                    <div className="product-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-details">
                        <span className="brand-name">{product.brand}</span>
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">{product.price.toLocaleString()}원</p>
                        <p className="product-amount">수량 {product.amount}개</p>
                        <div className="seller-info">판매자 정보</div>
                    </div>
                </div>
            ))}
            </section>

        <section className="info-list-section">
          <div className="info-row">
            <span className="info-label">배송지 정보</span>
            <span className="info-value">서울특별시 동작구 여의대방로... <span className="arrow">&gt;</span></span>
          </div>
          <div className="info-row">
            <span className="info-label">휴대폰 번호</span>
            <span className="info-value">010-1234-5678</span>
          </div>
          <div className="info-row">
            <span className="info-label">이메일</span>
            <span className="info-value">abc1234@naver.com</span>
          </div>
          <div className="info-row">
            <span className="info-label">배송 요청사항</span>
            <select className="shipping-select">
              <option>부재시 문앞에 놓아주세요</option>
              <option>직접 수령하겠습니다</option>
              <option>벨을 누르지 마세요</option>
            </select>
          </div>
        </section>

        <section className="point-section">
          <h4 className="section-title">포인트</h4>
          <div className="point-input-group">
            <input 
              type="text" 
              value={point}
              onChange={(e) => setPoint(e.target.value)}
              placeholder="현재 잔여 포인트 : 7500P" 
            />
            <button className="point-btn" onClick={handleFullPoint}>전액 사용</button>
          </div>
        </section>

        <section className="payment-method-section">
          <h4 className="section-title">결제 수단</h4>
          <div className="method-grid">
            {['card', 'bank', 'virtual', 'pay'].map((method) => (
              <button
                key={method}
                className={`method-item ${paymentMethod === method ? 'active' : ''}`}
                onClick={() => setPaymentMethod(method)}
              >
                {method === 'card' && '카드'}
                {method === 'bank' && '계좌이체'}
                {method === 'virtual' && '가상계좌'}
                {method === 'pay' && '페이'}
              </button>
            ))}
          </div>
        </section>

        <section className="final-payment-section">
          <div className="total-price-row">
            <span>최종 결제금액</span>
            <span className="total-price">{totalPrice.toLocaleString()}원</span>
          </div>
          <button className="pay-submit-btn">결제하기</button>
        </section>
      </main>
    </div>
  );
};

export default PaymentPage;
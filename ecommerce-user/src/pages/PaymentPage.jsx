import { useState } from "react";
import "./PaymentPage.css";
import MyPageHeader from "../components/MyPageHeader";
import PopUp from "../components/PopUp";
import { CheckoutPage } from "./toss/CheckoutPage";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [point, setPoint] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderId, setOrderId] = useState(null); //서버에서 발급 받은 orderId 저장 상태 확인

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

  // 결제하기 버튼 클릭 시 실행되는 로직
  // -> 결제 상태 변경(웹훅을 위해)
  const handlePaymentSubmit = async () => {
    try {
      // ==========================================
      // 1. 주문 저장 API 호출 (orderId 발급)
      // ==========================================
      const orderResponse = await fetch("http://localhost:8888/order/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 필요하다면 Authorization 토큰 추가
        },
        body: JSON.stringify({
          // TODO: OrderDto에 맞는 주문 데이터 (상품목록, 배송지 등) 세팅
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("주문 정보 저장 중 오류가 발생했습니다.");
      }

      // 서버(/order/save)에서 내려준 OrderSaveResultDto를 파싱
      const orderData = await orderResponse.json();
      const serverOrderId = orderData.orderPaymentId;

      // ==========================================
      // 2. 결제 준비 API 호출 (받아온 orderPaymentId 전달)
      // ==========================================
      if(serverOrderId){
          const paymentResponse = await fetch("http://localhost:8888/api/payments/ready", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: serverOrderId, // 발급받은 orderId를 그대로 결제 서버로 넘김
            paymentAmount: 100, 
            type: paymentMethod.toUpperCase(), 
          }),
        });

        if (!paymentResponse.ok) {
          throw new Error("결제 준비 중 서버 오류가 발생했습니다.");
        }

        // ==========================================
        // 3. 모든 통신 성공 시 결제창 오픈
        // ==========================================
        setOrderId(serverOrderId); // 상태 업데이트
        setIsCheckoutOpen(true);   // 토스 팝업 오픈
      }
      

    } catch (error) {
      console.error("결제 진행 에러:", error);
      alert(error.message || "서버와 연결할 수 없습니다.");
    }
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
            {['card', 'bank', 'pay'].map((method) => (
              <button
                key={method}
                className={`method-item ${paymentMethod === method ? 'active' : ''}`}
                onClick={() => setPaymentMethod(method)}
              >
                {method === 'card' && '카드'}
                {method === 'bank' && '계좌이체'}
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
          <button
            className="pay-submit-btn"
            onClick={handlePaymentSubmit}
          >
            결제하기
          </button>
        </section>
      </main>
      <PopUp
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        title={"결제하기"}
        component={<CheckoutPage orderId={orderId} payAmount={100} />}
      />
    </div>
  );
};

export default PaymentPage;
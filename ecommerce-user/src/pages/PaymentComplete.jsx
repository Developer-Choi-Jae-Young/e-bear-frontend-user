import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Navigate } from "react-router-dom"; 
import "./PaymentComplete.css"
import Headers from "../components/Headers"
import Footer from "../components/Footer"
import Navigation from "../components/Navigation"

const PaymentComplete = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const orderId = searchParams.get("orderId");
    const [paymentData, setPaymentData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 서버로부터 진짜 결제 정보를 다시 조회
        const fetchPaymentDetails = async () => {
            if (!orderId) {
                setIsLoading(false);
                return;
            }

            try {
                // 이 주소는 회원님의 백엔드 API 엔드포인트에 맞춰 수정
                const response = await fetch(`http://localhost:8888/api/payments/details?orderId=${orderId}`);
                
                if (response.ok) {
                    const data = await response.json();
                    setPaymentData(data); // DB의 실시간 정보를 상태에 저장
                }
            } catch (error) {
                console.error("결제 내역 조회 중 오류 발생:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPaymentDetails();
    }, [orderId]);

    if (isLoading) {
        return <div className="ebear-container" style={{ textAlign: 'center', padding: '100px' }}>결제 내역을 확인하고 있습니다...</div>;
    }

    // 비정상 접근 차단 (주문번호가 없거나 서버 조회에 실패한 경우)
    if (!orderId || !paymentData) {
        alert("유효하지 않은 주문 정보입니다. 메인 페이지로 이동합니다.");
        return <Navigate to="/" replace />;
    }

    const formatPrice = (price) => price?.toLocaleString('ko-KR') || '0';

    let navigationMenu = [
        {
            title: "Hot",
            link: "/my-page/info",
        },
        {
            title: "세일",
            link: "/my-page/order",
        },
        {
            title: "라이브",
            link: "/my-page/inquiry",
        },
        {
            title: "이벤트",
            link: "/my-page/inquiry",
        },
        {
            title: "회원혜택",
            link: "/my-page/inquiry",
        }
    ]

    const products = [
        {
            id: 1,
            imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop&crop=center",
            brand: '유닉스',
            name: '오브제 헤어 드라이기 UN-B1919N_1',
            price: 89900,
            salePrice: null,
            rating: null,
        },
        {
            id: 2,
            imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop&crop=center",
            brand: '유닉스',
            name: '오브제 헤어 드라이기 UN-B1919N_2',
            price: 89900,
            salePrice: null,
            rating: null,
        },
        {
            id: 3,
            imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop&crop=center",
            brand: '유닉스',
            name: '오브제 헤어 드라이기 UN-B1919_3',
            price: 89900,
            salePrice: 71920,
            rating: null,
        },
    ];

    const totalPrice = paymentData?.totalAmount || 0;

    return (
        <div className="ebear-container">
            {/* 헤더 */}
            <Headers />

            {/* 네비게이션 */}
            <Navigation navigationMenu={navigationMenu} />

            <div className="page-title">
                <h1>결제 완료</h1>
            </div>

            <div className="main-layout">

                {/* 메인 콘텐츠 */}
                <main className="main-content">

                    <div style={{ marginBottom: "20px", fontSize: "16px" }}>
                        <strong>주문번호:</strong> {orderId}
                    </div>

                    {/* 추후 주문한 상품 렌더링 필요 */}
                    <div className="payment-product-grid">
                        {products.map(product => (
                            <div key={product.id} className="payment-product-card">
                                <div className="payment-product-image-container">
                                    <img src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.name} />
                                </div>
                                <div className="payment-product-details">
                                    <span className="payment-product-brand">{product.brand}</span>
                                    <p className="payment-product-name">{product.name}</p>
                                    
                                    {product.salePrice ? (
                                        <div className="payment-product-price">
                                            <span className="payment-original-price">{formatPrice(product.price)}원</span>
                                            <span className="payment-sale-info">
                                                <span className="payment-sale-percentage">20%</span>
                                                <span className="payment-sale-price">{formatPrice(product.salePrice)}원</span>
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="payment-product-price">
                                            <span className="payment-normal-price">{formatPrice(product.price)}원</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 총 합계 */}
                    <div className="payment-total-price-container">
                        합계: <span className="payment-total-price">{formatPrice(totalPrice)}원</span>
                    </div>

                    {/* 주문내역 보기 버튼 */}
                    <div className="payment-order-details-button-container">
                    <button className="payment-order-details-button">주문내역 보기</button>
                    </div>
                </main>
            </div>
            {/* 푸터 */}
            <Footer />
        </div>
    )

}

export default PaymentComplete
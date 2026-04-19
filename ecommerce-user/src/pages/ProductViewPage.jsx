import { AvatarCustom, AvatarFallback, ChevronDownIcon, HeartFillIcon, HeartIcon, UserIcon } from "../components/CustomTag"
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard"
import "./ProductViewPage.css"
import useMediaQuery from "../hooks/useMediaQuery";
import { useEffect, useState } from "react";
import InquiryPopUp from "../components/InquiryPopUp"
import PopUp from "../components/PopUp"
import QnaAccordion from "../components/QnaAccordion";
import ProductViewComboBox from "../components/ProductViewComboBox";
import ProductOptionSelectList from "../components/ProductOptionSelectList";
import api from "../api/axios";

const ProductViewPage = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [comboBox, setComboBox] = useState(false);
    const [comboBoxItem, setComboBoxItem] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [isMobileOptionsOpen, setIsMobileOptionsOpen] = useState(false);

    const isMobile = useMediaQuery('(max-width: 768px)');
    const [activeTab, setActiveTab] = useState('');

    const handleOpenMobileOptions = () => {
        setIsMobileOptionsOpen(true);
    }

    const handleCloseMobileOptions = () => {
        setIsMobileOptionsOpen(false);
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleTabClick = (event, tabName) => {
        if (isMobile) {
            event.preventDefault();
        }

        setActiveTab(tabName);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    }

    const handleComboBoxItem = (item) => {
        setComboBoxItem(item);
        setComboBox(false);
    }

    const handleComboBox = () => {
        setComboBox(!comboBox);
    }

    const review = [
        {rate: 3.5, title: "제목", context: "내용", name: "이름", date: "2025-07-26"},
        {rate: 3.5, title: "제목", context: "내용", name: "이름", date: "2025-07-26"},
        {rate: 3.5, title: "제목", context: "내용", name: "이름", date: "2025-07-26"},
        {rate: 3.5, title: "제목", context: "내용", name: "이름", date: "2025-07-26"},
        {rate: 3.5, title: "제목", context: "내용", name: "이름", date: "2025-07-26"},
        {rate: 3.5, title: "제목", context: "내용", name: "이름", date: "2025-07-26"},
    ];

    const qnalist = [
        {id: 1, name: "김철수", title: "제목", context: "내용"},
        {id: 2, name: "김철수", title: "제목", context: "내용"},
        {id: 3, name: "김철수", title: "제목", context: "내용"},
        {id: 4, name: "김철수", title: "제목", context: "내용"},
        {id: 5, name: "김철수", title: "제목", context: "내용"},
        {id: 6, name: "김철수", title: "제목", context: "내용"},
        {id: 7, name: "김철수", title: "제목", context: "내용"}
    ];

    const comboOptionList = [
        {optionSubject: "이름", optionPrice: 12000},
        {optionSubject: "이름", optionPrice: 12000},
        {optionSubject: "이름", optionPrice: 12000},
        {optionSubject: "이름", optionPrice: 12000},
        {optionSubject: "이름", optionPrice: 12000},
        {optionSubject: "이름", optionPrice: 12000},
        {optionSubject: "이름", optionPrice: 12000},
        {optionSubject: "이름", optionPrice: 12000}
    ]

    const productViewData = {
        currentViewImg: "https://www.letemsvetemapplem.eu/wp-content/uploads/2025/02/iPhone-17-Pro-1536x1536.jpeg.webp",
        subViewImg: [
            "https://www.letemsvetemapplem.eu/wp-content/uploads/2025/02/iPhone-17-Pro-1536x1536.jpeg.webp",
            "https://www.letemsvetemapplem.eu/wp-content/uploads/2025/02/iPhone-17-Pro-1536x1536.jpeg.webp",
            "https://www.letemsvetemapplem.eu/wp-content/uploads/2025/02/iPhone-17-Pro-1536x1536.jpeg.webp"
        ],
        seller: "유닉스",
        productCategoryNavigation: "뷰티>헤어기기>헤어드라이기",
        productSubject: "갤럭시 팝니다 갤럭시 팝니다 갤럭시 팝니다",
        productPrice: "420,000 ~ ",
        productFavarite: false,
        productViewContent: "내용이 들어갑니다.",
        productViewRetrunContent: "상품 수령 후 7일 이내에 신청하실 수 있습니다. 단, 제품이 표시·광고 내용과 다르거나, 계약과 다르게 이행된 경우는 제품 수령일부터 3개월 이내,\n 그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내에 교환/반품이 가능합니다.\n\n 추가적으로 다음의 경우 해당하는 반품/교환은 신청이 불가능할 수 있습니다.\n\n 소비자의 책임 있는 사유로 상품 등이 멸실 또는 훼손된 경우 (단지, 상품 확인을 위한 포장 훼손 제외)\n 소비자의 사용 또는 소비에 의해 상품 등의 가치가 현저히 감소한 경우\n 시간의 경과에 의해 재판매가 곤란할 정도로 상품 등의 가치가 현저히 감소한 경우\n 복제가 가능한 상품 등의 포장을 훼손한 경우\n 소비자의 주문에 따라 개별적으로 생산되는 상품이 제작에 들어간 경우"
    }

    const productMenu = [
        {name:"상품정보", value:"information"}, 
        {name:"리뷰", value:"review"}, 
        {name:"QnA", value:"qna"},
        {name:"반품/교환", value:"return"}
    ]

    const fetchProduct = async () => {
        try {
            const response = await api.get(`/product/detail/${id}`);
            const data = response;

            setProduct({
                productId: data.productId,
                productName: data.productName,
                thumbnail: data.thumbnail,
                content: data.content,
                seller: data.seller,
                sellerImg: data.sellerImg,
                category: data.category,
                productOptions: data.productOptions || [],
                reviews: data.reviews || [],
                qnas: data.qnas || []
            });
        } catch (err) {
            console.error("상품 목록 조회 실패:", err);
            console.error("status:", err.response?.status);
            console.error("data:", err.response?.data);
            setError("상품 목록을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        setActiveTab(productMenu[0].value);
        fetchProduct();
    }, []);

    if (!product) {
        return <div className="loading-container">데이터를 불러오는 중입니다...</div>;
    }

    return (
        <>
            <div className="product-view-container">
                <h3>상품상세보기</h3>
                <hr />

                <div className="product-view-contents">
                    <div className="product-view-contents-left">
                        <div className="product-info-container">
                            <div>
                                <img src={productViewData.currentViewImg} className="product-img"></img>
                                <div className="sub-image-container">
                                    {productViewData.subViewImg.map((data, index) => {
                                        return <img src={data} className="product-img-mini"></img>
                                    })}
                                </div>
                            </div>
                            <div className="product-views">
                                <div className="product-header-row">
                                    <span className="product-info-category">{productViewData.productCategoryNavigation}</span>
                                    <div className="product-view-contents align-items-center">
                                        <AvatarCustom className="profile-avatar h-5 w-5">
                                            <AvatarFallback className="avatar-fallback">
                                                <UserIcon className="avatar-icon" />
                                            </AvatarFallback>
                                        </AvatarCustom>
                                        <span className="profile-name">{productViewData.seller}</span>
                                    </div>
                                </div>
                                <div className="product-info-content">{productViewData.productSubject}</div>
                                <div className="product-info-content product-header-row">
                                    <span>{productViewData.productPrice}원</span>
                                    {productViewData.productFavarite ? <HeartFillIcon className="heart-icon" /> : <HeartIcon className="icon heart-icon"/>}
                                </div>
                            </div>
                        </div>
                        
                        <div className="detail_tab_area fixed" id="detail_tab_area">
                            <div className="detail_tab">
                                <ul className="tab_list">
                                    {productMenu.map((data, index) => {
                                        return (
                                            <li className={`tab_item item01 ${activeTab === data.value ? 'on' : ''}`} id={`bookmark_product_${data.value}_item`}>
                                                <a href={`#bookmark_product_${data.value}`} onClick={(e) => handleTabClick(e, data.value)}>
                                                    <h3 className="tab_txt">{data.name}</h3>
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                        
                        {(!isMobile || activeTab === productMenu[0].value) && (
                            <>
                                <div className="content-gap" id="bookmark_product_information">
                                    <span>{productMenu[0].name}</span>
                                    <hr />
                                </div>
                                <div className="product-views-content">
                                    {productViewData.productViewContent}
                                </div>
                            </>
                        )}

                        {(!isMobile || activeTab === productMenu[1].value) && (
                            <>
                                <div className="content-gap" id="bookmark_product_review">
                                    <span>{productMenu[1].name}</span>
                                    <hr />
                                </div>
                                <div>
                                    <div className="review-section">
                                        {review.map((data, index) => {
                                            return (<ReviewCard key={index}  rate={data.rate} title={data.title} context={data.context} name={data.name} date={data.date} />);    
                                        })}
                                    </div>
                                    <div className="more-button-section">
                                        <button className="more-button">더보기</button>
                                    </div>
                                </div>
                            </>
                        )}

                        {(!isMobile || activeTab === productMenu[2].value) && (
                            <>
                                <div className="content-gap" id="bookmark_product_qna">
                                    <div className="qna-title">
                                        <span>{productMenu[2].name}</span>
                                        <button className="inquiry-button" onClick={() => setIsPopupOpen(true)}>문의하기</button>
                                    </div>
                                    <hr />
                                </div>
                                <div className="qna-section">
                                    {qnalist.map((data, index) => {
                                        return <QnaAccordion data={data} index={index} handleChange={handleChange} isExpanded={expanded === data.id} />
                                    })}
                                </div>
                            </>
                        )}

                        {(!isMobile || activeTab === productMenu[3].value) && (
                            <>
                                <div className="content-gap" id="bookmark_product_return">
                                    <span>{productMenu[3].name}</span>
                                    <hr />
                                </div>
                                <div className="text-color">
                                    {productViewData.productViewRetrunContent}
                                </div>
                            </>
                        )}
                    </div>
                    
                    {( !isMobile ) && (
                        <div className="product-view-contents-right-area">
                            <div className="product-view-contents-right">
                                <ProductViewComboBox comboOptionList={comboOptionList} comboBox={comboBox} handleComboBox={handleComboBox} />
                                <ProductOptionSelectList selectProductOptionList={product.productOptions} />

                                <div className="l_product_buy_result">
                                    <div>
                                        <div className="total_price_area">
                                            <span className="total_cnt">총 4개</span>
                                            <span className="total_price">가격</span>
                                        </div>
                                        <div className="cupon_section">
                                            <div className="cupon_area">
                                                <span>ㄴ적용가능한 쿠폰없음</span>
                                                <button className="btn_cupon_change">쿠폰변경</button>
                                            </div>
                                            <div>
                                                <span>ㄴ무료배송</span>
                                            </div>
                                        </div>
                                        <div className="cupon_area">
                                            <button className="btn_cupon_change btn_buy">구매</button>
                                            <button className="btn_cupon_change btn_shopping_cart">장바구니</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {( isMobile ) && (
                        <div>
                            <div className="l_product_buy_result">
                            {isMobileOptionsOpen && (
                                <div className="mobile-options-popup" onClick={(e) => e.stopPropagation()}>
                                    <div className="mobile-options-header">
                                        <h4>옵션 선택</h4>
                                        <button className="btn-close" onClick={handleCloseMobileOptions}>&times;</button>
                                    </div>
                                    
                                    <div className="mobile_buy_option_area">
                                        <ProductViewComboBox comboOptionList={comboOptionList} comboBox={comboBox} handleComboBox={handleComboBox} />
                                        <ProductOptionSelectList selectProductOptionList={product.productOptions} />
                                    </div>
                                </div>
                            )}
                                <div>
                                    <div className="total_price_area">
                                        <span className="total_cnt">총 4개</span>
                                        <span className="total_price">가격</span>
                                    </div>
                                    <div className="cupon_area">
                                        <button className="btn_cupon_change btn_buy" onClick={handleOpenMobileOptions}>구매</button>
                                        <button className="btn_cupon_change btn_shopping_cart">장바구니</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <PopUp 
                isOpen={isPopupOpen} 
                onClose={(handleClosePopup)} 
                title={"상품문의"} 
                component={<InquiryPopUp />}
            />
        </>
    )
}

export default ProductViewPage;
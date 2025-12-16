"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ArrowRight, ChevronLeft, ChevronRight, Star, User, Smartphone, Loader2, Factory, FlaskConical, Plane, Hexagon, Quote, Globe } from "lucide-react"

// ==============================================
// 🗣️ 언어별 텍스트 팩 (번역 데이터)
// ==============================================
const TRANSLATIONS = {
  en: {
    nav: { trends: "Trends", whyUs: "Why Us", success: "Success Stories", start: "Start Project" },
    hero: {
      tag: "No.1 K-Beauty B2B Platform",
      desc: "The best B2B partner for the Vietnam beauty market.\nOne-stop solution from planning to production and export.",
      btn_consult: "Free Consultation",
      btn_portfolio: "View Portfolio"
    },
    trends: {
      title_now: "Now",
      title_trend: "Trending",
      subtitle: "The hottest keywords in the current Vietnam market."
    },
    whyUs: {
      title_world: "World-Class",
      title_infra: "Infrastructure",
      subtitle: "HyperCommerce is not just a distributor.\nWe are a manufacturing partner with top-tier facilities and R&D."
    },
    success: {
      title_our: "Our",
      title_story: "Success Stories",
      subtitle: "Meet the partners who succeeded with HyperCommerce.",
      btn_detail: "I want this success →",
      case_label: "Success Case"
    },
    contact: {
      title: "Ready to Launch?",
      desc: "Start your project now and dominate the Vietnam market.\nWe help you build a successful brand.",
      btn: "Apply for Consultation"
    },
    modal: {
      step1_title: "What product do you want to make?",
      step1_desc: "Please select a category.",
      step2_title: "What is the estimated quantity?",
      step2_desc: "Tell us the scale for an accurate quote.",
      step3_title: "Contact Information",
      step3_desc: "We will contact you within 24 hours.",
      label_name: "Name / Company",
      label_contact: "Phone or Email",
      placeholder_name: "Enter your name",
      placeholder_contact: "Enter phone or email",
      btn_prev: "Previous",
      btn_next: "Next",
      btn_submit: "Submit Inquiry",
      alert_category: "Please select a category!",
      alert_qty: "Please select a quantity!",
      alert_contact: "Please enter your contact info!",
      alert_success: "🎉 Submission Complete!\nWe will contact you shortly."
    },
    categories: ['Skincare', 'Makeup', 'Body & Hair', 'Others'],
    quantities: ['Under 500', '1,000', '3,000', '5,000+']
  },
  vi: {
    nav: { trends: "Xu hướng", whyUs: "Tại sao chọn chúng tôi", success: "Câu chuyện thành công", start: "Bắt đầu dự án" },
    hero: {
      tag: "Nền tảng B2B K-Beauty số 1",
      desc: "Đối tác B2B tốt nhất cho thị trường làm đẹp Việt Nam.\nGiải pháp một cửa từ lập kế hoạch đến sản xuất và xuất khẩu.",
      btn_consult: "Tư vấn miễn phí",
      btn_portfolio: "Xem hồ sơ năng lực"
    },
    trends: {
      title_now: "Xu hướng",
      title_trend: "Hiện nay",
      subtitle: "Những từ khóa nóng nhất tại thị trường Việt Nam hiện nay."
    },
    whyUs: {
      title_world: "Cơ sở hạ tầng",
      title_infra: "Đẳng cấp thế giới",
      subtitle: "HyperCommerce không chỉ là nhà phân phối.\nChúng tôi là đối tác sản xuất với nhà máy và R&D hàng đầu."
    },
    success: {
      title_our: "Câu chuyện",
      title_story: "Thành công",
      subtitle: "Gặp gỡ những đối tác đã thành công cùng HyperCommerce.",
      btn_detail: "Tôi muốn thành công như vậy →",
      case_label: "Trường hợp thành công"
    },
    contact: {
      title: "Sẵn sàng ra mắt?",
      desc: "Bắt đầu dự án ngay bây giờ và chiếm lĩnh thị trường Việt Nam.\nChúng tôi giúp bạn xây dựng thương hiệu thành công.",
      btn: "Đăng ký tư vấn"
    },
    modal: {
      step1_title: "Bạn muốn làm sản phẩm gì?",
      step1_desc: "Vui lòng chọn danh mục.",
      step2_title: "Số lượng dự kiến là bao nhiêu?",
      step2_desc: "Cho chúng tôi biết quy mô để báo giá chính xác.",
      step3_title: "Thông tin liên hệ",
      step3_desc: "Chúng tôi sẽ liên hệ lại trong vòng 24 giờ.",
      label_name: "Tên / Tên công ty",
      label_contact: "Số điện thoại hoặc Email",
      placeholder_name: "Nhập tên của bạn",
      placeholder_contact: "Nhập SĐT hoặc Email",
      btn_prev: "Quay lại",
      btn_next: "Tiếp theo",
      btn_submit: "Gửi yêu cầu",
      alert_category: "Vui lòng chọn danh mục!",
      alert_qty: "Vui lòng chọn số lượng!",
      alert_contact: "Vui lòng nhập thông tin liên hệ!",
      alert_success: "🎉 Gửi thành công!\nChúng tôi sẽ liên hệ sớm."
    },
    categories: ['Chăm sóc da', 'Trang điểm', 'Cơ thể & Tóc', 'Khác'],
    quantities: ['Dưới 500', '1,000', '3,000', 'Trên 5,000']
  }
}

// ==============================================
// ⭐ 데이터 섹션 (영어/베트남어 모두 포함)
// ==============================================
const TRENDS_DATA = [
  {
    id: 1,
    title: "Retinol Ampoule",
    tag: "#Anti-aging",
    // ▼ 외부 링크 대신, public/images 폴더 안의 파일을 가리킵니다.
    // (주의: 실제 파일명이 trend1.jpg와 정확히 일치해야 합니다!)
    image: "/images/trend1.jpg",
  },
  {
    id: 2,
    title: "Cica Cooling Pad",
    tag: "#Calming",
    image: "/images/trend2.jpg",
  },
  {
    id: 3,
    title: "Glass Water Tint",
    tag: "#Glow",
    image: "/images/trend3.jpg",
  },
  {
    id: 4,
    title: "Silk Hydrator",
    tag: "#Moisture",
    image: "/images/trend4.jpg",
  },
  {
    id: 5,
    title: "Radiance Oil",
    tag: "#Brightening",
    image: "/images/trend5.jpg",
  },
]
// ... (이 아래 코드는 그대로 두시면 됩니다)

const FACILITIES_DATA = [
  {
    id: 1,
    title: { en: "Advanced Factory (GMP)", vi: "Nhà máy hiện đại (GMP)" },
    desc: { en: "State-of-the-art automation capable of producing 50 million units annually. ISO/GMP certified.", vi: "Dây chuyền tự động hóa hiện đại có khả năng sản xuất 50 triệu sản phẩm mỗi năm. Đạt chuẩn ISO/GMP." },
    icon: <Factory className="w-6 h-6"/>,
    images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1631556097152-c39479b8b324?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1565514020176-dbf22774a8a3?q=80&w=800&auto=format&fit=crop"]
  },
  {
    id: 2,
    title: { en: "Corporate R&D Center", vi: "Trung tâm R&D Doanh nghiệp" },
    desc: { en: "Senior researchers with 20 years of experience develop unique formulas tailored to your needs.", vi: "Các nhà nghiên cứu cấp cao với 20 năm kinh nghiệm phát triển các công thức độc quyền theo nhu cầu của bạn." },
    icon: <FlaskConical className="w-6 h-6"/>,
    images: ["https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop"]
  },
  {
    id: 3,
    title: { en: "Global Logistics System", vi: "Hệ thống Logistics Toàn cầu" },
    desc: { en: "We handle 100% of complex customs and licensing procedures through our local Vietnamese entity.", vi: "Chúng tôi xử lý 100% các thủ tục hải quan và giấy phép phức tạp thông qua pháp nhân tại Việt Nam." },
    icon: <Plane className="w-6 h-6"/>,
    images: ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1494412574643-35d324698422?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1566576912906-60034a601829?q=80&w=800&auto=format&fit=crop"]
  }
]

const SUCCESS_STORIES_DATA = [
  {
    id: 1,
    company: "Brand A (Skin Care)",
    result: { en: "Reached $500k sales in 3 months", vi: "Đạt doanh thu 500k đô la trong 3 tháng" },
    desc: { en: "Requested planning to production for a whitening ampoule targeting Vietnamese women in their 20s-30s. Achieved a sell-out on TikTok Shop with localized packaging and formula.", vi: "Yêu cầu từ lập kế hoạch đến sản xuất ampoule trắng da nhắm đến phụ nữ Việt Nam 20-30 tuổi. Đạt kỷ lục bán hết trên TikTok Shop với bao bì và công thức bản địa hóa." },
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    company: "Brand B (Body Wash)",
    result: { en: "Entered 50 offline stores in VN", vi: "Vào 50 cửa hàng offline tại VN" },
    desc: { en: "Solved complex licensing procedures in 2 weeks through HyperCommerce's agency service and successfully entered major drugstores.", vi: "Giải quyết các thủ tục giấy phép phức tạp trong 2 tuần thông qua dịch vụ đại lý của HyperCommerce và thành công vào các nhà thuốc lớn." },
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop"
  }
]

// 미니 컴포넌트
const CardSlider = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const nextSlide = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)) }
  const prevSlide = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)) }
  return (
    <div className="h-64 overflow-hidden relative group/slider">
      <img src={images[currentIndex]} alt="Facility" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
      <div className="absolute inset-0 bg-black/20 group-hover/card:bg-transparent transition-colors" />
      <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-primary hover:text-black"><ChevronLeft className="w-4 h-4" /></button>
      <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-primary hover:text-black"><ChevronRight className="w-4 h-4" /></button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, idx) => (
          <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${currentIndex === idx ? 'bg-primary w-4' : 'bg-white/50'}`} />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'vi'>('en') // 🌐 언어 상태 (기본: 영어)
  const t = TRANSLATIONS[language] // 현재 언어 팩 선택

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalStep, setModalStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [wizardData, setWizardData] = useState({ category: "", targetQuantity: "", name: "", contact: "" })
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320 
      if (direction === "left") scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      else scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  const handleNextStep = () => {
    if (modalStep === 1 && !selectedCategory) return alert(t.modal.alert_category)
    if (modalStep === 2 && !wizardData.targetQuantity) return alert(t.modal.alert_qty)
    if (modalStep === 1) setWizardData(prev => ({ ...prev, category: selectedCategory! }))
    setModalStep(prev => prev + 1)
  }

  const handleSubmit = async () => {
    if (!wizardData.name || !wizardData.contact) return alert(t.modal.alert_contact)
    setIsSubmitting(true) 
    try {
      const FORMSPREE_URL = "https://formspree.io/f/xpwvjpvz"
      await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ 제목: "🌟 Project Inquiry", Language: language, Category: wizardData.category || selectedCategory, Qty: wizardData.targetQuantity, Name: wizardData.name, Contact: wizardData.contact, Date: new Date().toLocaleString() }),
      });
      alert(t.modal.alert_success);
      setIsModalOpen(false); setModalStep(1); setWizardData({ category: "", targetQuantity: "", name: "", contact: "" }); setSelectedCategory(null);
    } catch (error) { alert("Error occurred."); } finally { setIsSubmitting(false) }
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground font-sans">
      
      {/* 헤더 */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? "bg-background/90 backdrop-blur-md border-white/10 py-4 shadow-lg" : "bg-transparent border-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Hexagon className="w-8 h-8 text-primary fill-primary/20" />
            <div className="text-2xl font-bold tracking-tighter">
              <span className="text-primary">HYPER</span><span className="text-white">COMMERCE</span>
            </div>
          </div>
          
          <nav className="hidden md:flex gap-8 items-center font-medium text-base">
            <button onClick={() => scrollToSection('trends')} className="hover:text-primary transition-colors uppercase tracking-wide">{t.nav.trends}</button>
            <button onClick={() => scrollToSection('why-us')} className="hover:text-primary transition-colors uppercase tracking-wide">{t.nav.whyUs}</button>
            <button onClick={() => scrollToSection('success-story')} className="hover:text-primary transition-colors uppercase tracking-wide">{t.nav.success}</button>
            
            {/* ⭐ [업데이트] 언어 선택 버튼 (EN / VN) */}
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/20 text-sm font-bold bg-white/5">
              <Globe className="w-3.5 h-3.5 text-gray-400" />
              <div className="flex gap-1">
                <button 
                  onClick={() => setLanguage('en')} 
                  className={`${language === 'en' ? 'text-primary' : 'text-gray-400 hover:text-white'} transition-colors`}
                >
                  EN
                </button>
                <span className="text-gray-600">/</span>
                <button 
                  onClick={() => setLanguage('vi')} 
                  className={`${language === 'vi' ? 'text-primary' : 'text-gray-400 hover:text-white'} transition-colors`}
                >
                  VN
                </button>
              </div>
            </div>

            <button onClick={() => setIsModalOpen(true)} className="bg-primary text-black px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-2 text-lg">
              {t.nav.start} <ArrowRight className="w-5 h-5" />
            </button>
          </nav>
          
          {/* 모바일 헤더: 햄버거 + 언어 */}
          <div className="md:hidden flex items-center gap-3">
             <div className="flex items-center gap-1 px-3 py-1 rounded-full border border-white/20 text-xs font-bold">
               <button onClick={() => setLanguage('en')} className={`${language === 'en' ? 'text-primary' : 'text-gray-400'}`}>EN</button>
               <span className="text-gray-600">/</span>
               <button onClick={() => setLanguage('vi')} className={`${language === 'vi' ? 'text-primary' : 'text-gray-400'}`}>VN</button>
             </div>
             <button className="text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>{isMobileMenuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 (전체화면) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8 md:hidden backdrop-blur-xl">
          <button onClick={() => scrollToSection('trends')} className="text-3xl font-bold text-white hover:text-primary uppercase">{t.nav.trends}</button>
          <button onClick={() => scrollToSection('why-us')} className="text-3xl font-bold text-white hover:text-primary uppercase">{t.nav.whyUs}</button>
          <button onClick={() => scrollToSection('success-story')} className="text-3xl font-bold text-white hover:text-primary uppercase">{t.nav.success}</button>
          <button onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }} className="bg-primary text-black text-xl px-8 py-3 rounded-full font-bold mt-4">{t.nav.start}</button>
        </div>
      )}

      {/* 히어로 섹션 */}
      <section className="relative pt-32 pb-10 md:pt-48 md:pb-20 px-6 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50 animate-pulse" />
        <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold mb-8 uppercase tracking-widest">
          <Star className="w-3 h-3 fill-current" /> {t.hero.tag}
        </div>
        <h1 className="relative z-10 text-5xl md:text-8xl font-black tracking-tight mb-6 leading-tight">
          Create Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-lime-200 to-primary">Signature Brand</span>
        </h1>
        <p className="relative z-10 text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed whitespace-pre-line">
          {t.hero.desc}
        </p>
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button onClick={() => setIsModalOpen(true)} className="bg-primary text-black text-lg px-8 py-4 rounded-full font-bold shadow-[0_0_30px_rgba(204,255,0,0.3)] hover:shadow-[0_0_50px_rgba(204,255,0,0.5)] transition-all flex items-center justify-center gap-2">
            {t.hero.btn_consult} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 트렌드 슬라이드 */}
      <section id="trends" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background border-t border-white/5">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">{t.trends.title_now} <span className="text-primary">{t.trends.title_trend}</span></h2>
            <div className="hidden md:flex gap-4">
              <button onClick={() => scroll("left")} className="p-4 rounded-full border border-white/20 hover:border-primary hover:bg-primary hover:text-black transition-all"><ChevronLeft className="w-6 h-6" /></button>
              <button onClick={() => scroll("right")} className="p-4 rounded-full border border-white/20 hover:border-primary hover:bg-primary hover:text-black transition-all"><ChevronRight className="w-6 h-6" /></button>
            </div>
          </div>
          <p className="text-gray-400 mb-8 -mt-8">{t.trends.subtitle}</p>
          <div className="relative group">
            <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto pb-8 scroll-smooth" style={{ scrollSnapType: "x mandatory", scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
              {TRENDS_DATA.map((trend) => (
                <div key={trend.id} className="flex-shrink-0 w-80 md:w-96 snap-start">
                  <div className="relative h-[450px] rounded-3xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-all duration-300">
                    <img src={trend.image} alt={trend.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                      <h3 className="text-2xl font-bold text-white mb-2">{trend.title}</h3>
                      <span className="text-black bg-primary font-bold text-sm px-3 py-1 rounded-full">{trend.tag}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us (인프라) */}
      <section id="why-us" className="py-24 border-t border-white/5 bg-gradient-to-b from-black to-background">
         <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.whyUs.title_world} <span className="text-primary">{t.whyUs.title_infra}</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg whitespace-pre-line">{t.whyUs.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {FACILITIES_DATA.map((item) => (
              <div key={item.id} className="group/card rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-2 duration-300">
                <CardSlider images={item.images} />
                <div className="p-8 relative">
                  <div className="absolute -top-6 right-6 bg-black/80 backdrop-blur-md p-3 rounded-full text-primary border border-white/10 shadow-lg">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover/card:text-primary transition-colors">{item.title[language]}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">{item.desc[language]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 성공 사례 (Success Story) */}
      <section id="success-story" className="py-24 border-t border-white/5 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.success.title_our} <span className="text-primary">{t.success.title_story}</span></h2>
            <p className="text-gray-400 text-lg">{t.success.subtitle}</p>
          </div>

          <div className="space-y-12">
            {SUCCESS_STORIES_DATA.map((story, index) => (
              <div key={story.id} className={`flex flex-col md:flex-row gap-8 md:gap-12 items-center bg-white/5 rounded-[3rem] p-6 md:p-12 border border-white/10 hover:border-primary/50 transition-all ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2 h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden relative shadow-2xl">
                  <img src={story.image} alt={story.company} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-primary text-black font-bold px-4 py-1.5 rounded-full text-sm">{t.success.case_label} #{story.id}</div>
                </div>
                <div className="w-full md:w-1/2 space-y-6 text-left">
                  <div className="inline-block p-3 rounded-full bg-white/10 text-primary mb-2"><Quote className="w-8 h-8" /></div>
                  <h3 className="text-3xl font-bold text-white">{story.company}</h3>
                  <div className="text-xl text-primary font-bold border-l-4 border-primary pl-4 py-1">{story.result[language]}</div>
                  <p className="text-gray-400 text-lg leading-relaxed">{story.desc[language]}</p>
                  <button onClick={() => setIsModalOpen(true)} className="text-white hover:text-primary font-bold underline underline-offset-4 decoration-primary decoration-2">
                    {t.success.btn_detail}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact 섹션 */}
      <section id="contact" className="py-32 border-t border-white/5 bg-gradient-to-b from-background to-black text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">{t.contact.title}</h2>
        <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg whitespace-pre-line">{t.contact.desc}</p>
        <button onClick={() => setIsModalOpen(true)} className="bg-primary text-black text-xl px-12 py-5 rounded-full font-bold hover:scale-105 hover:shadow-[0_0_40px_rgba(204,255,0,0.4)] transition-all">{t.contact.btn}</button>
      </section>

      {/* 마법사 팝업 (언어 적용됨) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden animate-fade-in-up">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
            <div className="flex gap-2 mb-10">{[1, 2, 3].map((step) => (<div key={step} className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${step <= modalStep ? 'bg-primary' : 'bg-white/10'}`} />))}</div>
            {modalStep === 1 && (
              <div className="animate-fade-in"><h2 className="text-2xl font-bold mb-3">{t.modal.step1_title}</h2><p className="text-gray-400 mb-6">{t.modal.step1_desc}</p><div className="space-y-3 mt-6">{t.categories.map((cat) => (<button key={cat} onClick={() => setSelectedCategory(cat)} className={`w-full p-5 rounded-xl border text-left transition-all duration-200 ${selectedCategory === cat ? 'border-primary bg-primary/10 text-primary font-bold shadow-[inset_0_0_20px_rgba(204,255,0,0.1)]' : 'border-white/10 hover:border-white/30 text-gray-300 hover:bg-white/5'}`}>{cat}</button>))}</div></div>
            )}
            {modalStep === 2 && (
              <div className="animate-fade-in"><h2 className="text-2xl font-bold mb-3">{t.modal.step2_title}</h2><p className="text-gray-400 mb-6">{t.modal.step2_desc}</p><div className="grid grid-cols-2 gap-4 mt-6">{t.quantities.map((qty) => (<button key={qty} onClick={() => setWizardData({...wizardData, targetQuantity: qty})} className={`p-6 rounded-xl border text-center transition-all duration-200 ${wizardData.targetQuantity === qty ? 'border-primary bg-primary/10 text-primary font-bold shadow-[inset_0_0_20px_rgba(204,255,0,0.1)]' : 'border-white/10 hover:border-white/30 text-gray-300 hover:bg-white/5'}`}>{qty}</button>))}</div></div>
            )}
            {modalStep === 3 && (
              <div className="animate-fade-in"><h2 className="text-2xl font-bold mb-3">{t.modal.step3_title}</h2><p className="text-gray-400 mb-6">{t.modal.step3_desc}</p><div className="space-y-5 mt-6"><div><label className="block text-sm text-gray-400 mb-2 font-medium">{t.modal.label_name}</label><div className="relative group"><User className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" /><input type="text" value={wizardData.name} onChange={(e) => setWizardData({...wizardData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 pl-12 text-white focus:border-primary focus:outline-none focus:bg-white/10 transition-all placeholder:text-gray-600" placeholder={t.modal.placeholder_name} /></div></div><div><label className="block text-sm text-gray-400 mb-2 font-medium">{t.modal.label_contact}</label><div className="relative group"><Smartphone className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" /><input type="text" value={wizardData.contact} onChange={(e) => setWizardData({...wizardData, contact: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 pl-12 text-white focus:border-primary focus:outline-none focus:bg-white/10 transition-all placeholder:text-gray-600" placeholder={t.modal.placeholder_contact} /></div></div></div></div>
            )}
            <div className="mt-10 flex gap-3">
              {modalStep > 1 && (<button onClick={() => setModalStep(prev => prev - 1)} className="flex-1 py-4 rounded-xl font-bold text-gray-400 hover:text-white transition-colors hover:bg-white/5" disabled={isSubmitting}>{t.modal.btn_prev}</button>)}
              <button onClick={modalStep === 3 ? handleSubmit : handleNextStep} disabled={isSubmitting} className="flex-[2] bg-primary text-black py-4 rounded-xl font-bold hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(204,255,0,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">{isSubmitting ? (<><Loader2 className="w-5 h-5 animate-spin" /> ...</>) : (modalStep === 3 ? t.modal.btn_submit : t.modal.btn_next)}</button>
            </div>
          </div>
        </div>
      )}

      <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm"><p>© 2025 HyperCommerce Vietnam. All rights reserved.</p></footer>
    </div>
  )
}
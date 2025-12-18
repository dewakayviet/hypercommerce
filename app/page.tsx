"use client";

// 1. 이미지 도구 가져오기 (필수)
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
// 2. Hexagon 제거하고 필요한 아이콘만 가져오기
import { Menu, X, ArrowRight, ChevronLeft, ChevronRight, Star, User, Smartphone, Loader2, Factory, FlaskConical, Plane, Quote, GitGraph } from "lucide-react";

// 3. 트렌드 데이터 (내부 이미지 경로로 설정)
const TRENDS_DATA = [
  {
    id: 1,
    title: "Retinol Ampoule",
    tag: "#Anti-aging",
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
];

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Sarah Nguyen",
    role: "CEO, Glow Vietnam",
    content: "Hyper Commerce helped us launch our brand in just 3 months. The quality is exceptional.",
    rating: 5,
  },
  {
    id: 2,
    name: "Minh Tuan",
    role: "Founder, K-Vibe Shop",
    content: "The easiest way to source authentic K-Beauty products. Their logistics are flawless.",
    rating: 5,
  },
  {
    id: 3,
    name: "Jessica Lee",
    role: "Brand Manager, Pure Skin",
    content: "From packaging design to formulation, they handled everything perfectly.",
    rating: 5,
  },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTrend, setActiveTrend] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'vi'>('en');
  
  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 다국어 텍스트 객체
  const content = {
    en: {
      nav: { trends: "TRENDS", why: "WHY US", stories: "SUCCESS STORIES", start: "Start Project" },
      hero: { tag: "No.1 K-Beauty B2B Platform", title: "Create Your Signature Brand", desc: "From product planning to production and export. We provide a one-stop solution for your K-Beauty business.", cta: "Start Free Consultation" },
    },
    vi: {
      nav: { trends: "XU HƯỚNG", why: "TẠI SAO CHỌN CHÚNG TÔI", stories: "CÂU CHUYỆN THÀNH CÔNG", start: "Bắt đầu dự án" },
      hero: { tag: "Nền tảng B2B K-Beauty số 1", title: "Tạo Thương Hiệu Riêng Của Bạn", desc: "Từ lập kế hoạch sản phẩm đến sản xuất và xuất khẩu. Chúng tôi cung cấp giải pháp một cửa cho doanh nghiệp K-Beauty của bạn.", cta: "Tư vấn miễn phí ngay" },
    }
  };

  const t = content[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // API 호출 시뮬레이션 (1.5초)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setEmail("");
      
      // 3초 후 모달 닫기 및 상태 초기화
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground font-sans">
      
      {/* 헤더 */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? "bg-background/90 backdrop-blur-md border-white/10 py-4 shadow-lg" : "bg-transparent border-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* 로고 이미지 영역 */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Image
              src="/images/logo.png"
              alt="HYPER COMMERCE"
              width={200}
              height={60}
              priority
              className="object-contain"
            />
          </div>

          {/* 데스크탑 메뉴 */}
          <nav className="hidden md:flex items-center gap-8">
            {['trends', 'why-us', 'success-story'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wider text-gray-300"
              >
                {t.nav[item === 'why-us' ? 'why' : item === 'success-story' ? 'stories' : 'trends']}
              </button>
            ))}
          </nav>

          {/* 데스크탑 액션 버튼 */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 bg-white/5 rounded-full p-1 border border-white/10">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'en' ? 'bg-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('vi')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'vi' ? 'bg-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                VN
              </button>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group bg-primary hover:bg-primary/90 text-black px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 text-sm"
            >
              {t.nav.start} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 모바일 헤더: 햄버거 + 언어 */}
          <div className="md:hidden flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button onClick={() => setLanguage('en')} className={`text-xs font-bold ${language === 'en' ? 'text-primary' : 'text-gray-500'}`}>EN</button>
              <span className="text-gray-700">|</span>
              <button onClick={() => setLanguage('vi')} className={`text-xs font-bold ${language === 'vi' ? 'text-primary' : 'text-gray-500'}`}>VN</button>
            </div>
            <button className="text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 (전체화면) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8 md:hidden backdrop-blur-xl">
          <button onClick={() => scrollToSection('trends')} className="text-3xl font-bold text-white hover:text-primary uppercase">{t.nav.trends}</button>
          <button onClick={() => scrollToSection('why-us')} className="text-3xl font-bold text-white hover:text-primary uppercase">{t.nav.why}</button>
          <button onClick={() => scrollToSection('success-story')} className="text-3xl font-bold text-white hover:text-primary uppercase">{t.nav.stories}</button>
          <button onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }} className="bg-primary text-black text-xl px-8 py-3 rounded-full font-bold mt-4">
            {t.nav.start}
          </button>
        </div>
      )}

      {/* 히어로 섹션 */}
      <section className="relative pt-32 pb-10 md:pt-48 md:pb-20 px-6 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-6 animate-fade-in-up">
          <Star className="w-3 h-3 fill-current" /> {t.hero.tag}
        </div>
        <h1 className="relative z-10 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent max-w-5xl mx-auto leading-[1.1]">
          {t.hero.title}
        </h1>
        <p className="relative z-10 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.hero.desc}
        </p>
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full justify-center">
           <button 
             onClick={() => setIsModalOpen(true)}
             className="bg-primary hover:bg-primary/90 text-black px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,253,50,0.3)]"
           >
             {t.hero.cta} <ArrowRight className="w-5 h-5" />
           </button>
           <button className="px-8 py-4 rounded-full font-bold text-lg text-white border border-white/20 hover:bg-white/10 transition-all">
             View Success Stories
           </button>
        </div>
      </section>

      {/* 트렌드 섹션 */}
      <section id="trends" className="py-20 px-6 border-t border-white/5 relative bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
                <span className="text-primary">01.</span> K-BEAUTY TRENDS
              </h2>
              <p className="text-gray-400">Discover the hottest products in Korea right now.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => scroll('left')} className="p-2 rounded-full border border-white/10 hover:bg-white/10 text-white transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={() => scroll('right')} className="p-2 rounded-full border border-white/10 hover:bg-white/10 text-white transition-colors">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {TRENDS_DATA.map((trend, idx) => (
              <div 
                key={trend.id} 
                className="min-w-[280px] md:min-w-[320px] snap-center group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
                onMouseEnter={() => setActiveTrend(idx)}
              >
                <Image 
                  src={trend.image} 
                  alt={trend.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-2 border border-primary/20 backdrop-blur-sm">
                    {trend.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-1">{trend.title}</h3>
                  <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                     <p className="text-gray-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                       Top selling item in Olive Young 2024.
                     </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us 섹션 */}
      <section id="why-us" className="py-24 px-6 relative overflow-hidden">
         <div className="absolute inset-0 bg-primary/5 -skew-y-3 z-0 transform origin-top-left scale-110" />
         <div className="max-w-7xl mx-auto relative z-10">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">
               <span className="text-primary">02.</span> WHY HYPER COMMERCE?
             </h2>
             <p className="text-gray-400 max-w-2xl mx-auto">We are not just a supplier. We are your business partner.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { icon: GitGraph, title: "Data-Driven Insight", desc: "We analyze real-time market data to recommend winning products." },
               { icon: Factory, title: "Direct Manufacturing", desc: "Connect directly with top-tier Korean factories. No middleman." },
               { icon: Plane, title: "Global Logistics", desc: "Fast and safe shipping to Vietnam with handled customs clearance." }
             ].map((item, i) => (
               <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group">
                 <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <item.icon className="w-7 h-7 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                 <p className="text-gray-400 leading-relaxed">{item.desc}</p>
               </div>
             ))}
           </div>
         </div>
      </section>

      {/* 문의하기 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-[#111] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in-up">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {submitStatus === 'success' ? (
               <div className="text-center py-10">
                 <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                   <User className="w-8 h-8 text-green-500" />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2">Thank you!</h3>
                 <p className="text-gray-400">We will contact you shortly via email.</p>
               </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2">Start Your Business</h3>
                <p className="text-gray-400 mb-6 text-sm">Leave your email, and our manager will send you the catalog.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="ceo@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary text-black font-bold py-3.5 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Get Free Consultation"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* 푸터 */}
      <footer className="py-12 border-t border-white/10 bg-black text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
               {/* 푸터 로고도 이미지로 교체 */}
               <Image src="/images/logo.png" alt="HYPER COMMERCE" width={150} height={45} className="object-contain" />
             </div>
             <p className="text-gray-500 text-sm max-w-sm mx-auto md:mx-0">
               Seoul, Korea | Ho Chi Minh, Vietnam<br/>
               Registration No: 123-45-67890<br/>
               contact@hypercommerce.site
             </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary">Best Sellers</a></li>
              <li><a href="#" className="hover:text-primary">New Arrivals</a></li>
              <li><a href="#" className="hover:text-primary">OEM/ODM Service</a></li>
            </ul>
          </div>
          <div>
             <h4 className="font-bold text-white mb-4">Legal</h4>
             <ul className="space-y-2 text-sm text-gray-500">
               <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
               <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
             </ul>
          </div>
        </div>
        <div className="text-center text-gray-600 text-xs mt-12">
          © 2024 HYPER COMMERCE. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
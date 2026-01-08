"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
// 필요한 아이콘들
import { Menu, X, ArrowRight, ChevronLeft, ChevronRight, Star, User, Loader2, GitGraph, Factory, Plane } from "lucide-react";

// 트렌드 데이터 (영어 원문)
const TRENDS_DATA = [
  { id: 1, title: "Retinol Ampoule", tag: "#Anti-aging", image: "/images/trend1.jpg" },
  { id: 2, title: "Cica Cooling Pad", tag: "#Calming", image: "/images/trend2.jpg" },
  { id: 3, title: "Glass Water Tint", tag: "#Glow", image: "/images/trend3.jpg" },
  { id: 4, title: "Silk Hydrator", tag: "#Moisture", image: "/images/trend4.jpg" },
  { id: 5, title: "Radiance Oil", tag: "#Brightening", image: "/images/trend5.jpg" },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTrend, setActiveTrend] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 구글 번역기 스크립트 로드
  useEffect(() => {
    const addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.appendChild(addScript);

    // 구글 번역 초기화 함수 전역 설정
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement({
        pageLanguage: 'en', // 기본 언어: 영어
        layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE, // 심플한 디자인
        autoDisplay: false,
      }, 'google_translate_element');
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 50); };
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
      scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setEmail("");
      setTimeout(() => { setIsModalOpen(false); setSubmitStatus('idle'); }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground font-sans">
      
      {/* 헤더 */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? "bg-background/90 backdrop-blur-md border-white/10 py-4 shadow-lg" : "bg-transparent border-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* 로고 */}
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Image src="/images/logo.png" alt="HYPER COMMERCE" width={200} height={60} priority className="object-contain" />
          </div>

          {/* 데스크탑 메뉴 (영어 원문) */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('trends')} className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wider text-gray-300">TRENDS</button>
            <button onClick={() => scrollToSection('why-us')} className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wider text-gray-300">WHY US</button>
            <button onClick={() => scrollToSection('success-story')} className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wider text-gray-300">SUCCESS STORIES</button>
          </nav>

          {/* 데스크탑 액션 버튼 & 구글 번역기 위치 */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* ⭐ 구글 번역기 위젯이 여기에 생깁니다 ⭐ */}
            <div id="google_translate_element" className="google-translate-container"></div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="group bg-primary hover:bg-primary/90 text-black px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 text-sm"
            >
              Start Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 모바일 헤더 */}
          <div className="md:hidden flex items-center gap-4">
             {/* 모바일에서도 번역기 노출 */}
             <div id="google_translate_element_mobile"></div> 
            <button className="text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8 md:hidden backdrop-blur-xl">
          <button onClick={() => scrollToSection('trends')} className="text-3xl font-bold text-white hover:text-primary uppercase">TRENDS</button>
          <button onClick={() => scrollToSection('why-us')} className="text-3xl font-bold text-white hover:text-primary uppercase">WHY US</button>
          <button onClick={() => scrollToSection('success-story')} className="text-3xl font-bold text-white hover:text-primary uppercase">SUCCESS STORIES</button>
          <button onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }} className="bg-primary text-black text-xl px-8 py-3 rounded-full font-bold mt-4">Start Project</button>
        </div>
      )}

      {/* 히어로 섹션 */}
      <section className="relative pt-32 pb-10 md:pt-48 md:pb-20 px-6 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-6 animate-fade-in-up">
          <Star className="w-3 h-3 fill-current" /> No.1 K-Beauty B2B Platform
        </div>
        <h1 className="relative z-10 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent max-w-5xl mx-auto leading-[1.1]">
          Create Your Signature Brand
        </h1>
        <p className="relative z-10 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          From product planning to production and export. We provide a one-stop solution for your K-Beauty business.
        </p>
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full justify-center">
           <button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary/90 text-black px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,253,50,0.3)]">
             Start Free Consultation <ArrowRight className="w-5 h-5" />
           </button>
           <button className="px-8 py-4 rounded-full font-bold text-lg text-white border border-white/20 hover:bg-white/10 transition-all">View Success Stories</button>
        </div>
      </section>

      {/* 트렌드 섹션 */}
      <section id="trends" className="py-20 px-6 border-t border-white/5 relative bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3"><span className="text-primary">01.</span> K-BEAUTY TRENDS</h2>
              <p className="text-gray-400">Discover the hottest products in Korea right now.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => scroll('left')} className="p-2 rounded-full border border-white/10 hover:bg-white/10 text-white transition-colors"><ChevronLeft className="w-6 h-6" /></button>
              <button onClick={() => scroll('right')} className="p-2 rounded-full border border-white/10 hover:bg-white/10 text-white transition-colors"><ChevronRight className="w-6 h-6" /></button>
            </div>
          </div>
          <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {TRENDS_DATA.map((trend, idx) => (
              <div key={trend.id} className="min-w-[280px] md:min-w-[320px] snap-center group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer" onMouseEnter={() => setActiveTrend(idx)}>
                <Image src={trend.image} alt={trend.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-2 border border-primary/20 backdrop-blur-sm">{trend.tag}</span>
                  <h3 className="text-2xl font-bold text-white mb-1">{trend.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us 섹션 (영어 원문 복구 + 비디오 유지) */}
      <section id="why-us" className="py-24 px-6 relative bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-bold mb-6 tracking-widest uppercase">Direct Manufacturing</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">World-Class Production<br/><span className="text-gray-500">Without Middleman</span></h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">We connect you directly with Korea's top-tier factories. Ensuring the highest quality standards for your brand.</p>
          </div>
          <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-gray-900">
            <div className="aspect-video relative">
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                <source src="/videos/factory.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories 섹션 (영어 원문 복구) */}
      <section id="success-story" className="py-24 px-6 border-t border-white/10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase">SUCCESS STORIES</h2>
            <p className="text-gray-400">See how we helped other brands grow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Nguyen", role: "CEO, Glow Vietnam", content: "Hyper Commerce helped us launch our brand in just 3 months. The quality is exceptional.", rating: 5 },
              { name: "Minh Tuan", role: "Founder, K-Vibe Shop", content: "The easiest way to source authentic K-Beauty products. Their logistics are flawless.", rating: 5 },
              { name: "Jessica Lee", role: "Brand Manager, Pure Skin", content: "From packaging design to formulation, they handled everything perfectly.", rating: 5 }
            ].map((story, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                <div className="flex gap-1 mb-4">{[...Array(story.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-primary text-primary" />))}</div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{story.content}"</p>
                <div><div className="font-bold text-white">{story.name}</div><div className="text-sm text-gray-500">{story.role}</div></div>
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
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X className="w-6 h-6" /></button>
            {submitStatus === 'success' ? (
               <div className="text-center py-10">
                 <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><User className="w-8 h-8 text-green-500" /></div>
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
                    <input type="email" required placeholder="ceo@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-black font-bold py-3.5 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
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
             <div className="flex items-center gap-2 justify-center md:justify-start mb-4"><Image src="/images/logo.png" alt="HYPER COMMERCE" width={150} height={45} className="object-contain" /></div>
             <p className="text-gray-500 text-sm max-w-sm mx-auto md:mx-0">Seoul, Korea | Ho Chi Minh, Vietnam<br/>Registration No: 123-45-67890<br/>contact@hypercommerce.site</p>
          </div>
          <div><h4 className="font-bold text-white mb-4">Platform</h4><ul className="space-y-2 text-sm text-gray-500"><li><a href="#" className="hover:text-primary">Best Sellers</a></li><li><a href="#" className="hover:text-primary">New Arrivals</a></li><li><a href="#" className="hover:text-primary">OEM/ODM Service</a></li></ul></div>
          <div><h4 className="font-bold text-white mb-4">Legal</h4><ul className="space-y-2 text-sm text-gray-500"><li><a href="#" className="hover:text-primary">Privacy Policy</a></li><li><a href="#" className="hover:text-primary">Terms of Service</a></li></ul></div>
        </div>
        <div className="text-center text-gray-600 text-xs mt-12">© 2024 HYPER COMMERCE. All rights reserved.</div>
      </footer>
    </div>
  );
}
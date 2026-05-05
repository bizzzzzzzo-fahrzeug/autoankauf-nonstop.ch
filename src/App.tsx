/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useParams,
  useLocation
} from 'react-router-dom';
import { 
  Phone, 
  Menu, 
  X, 
  CheckCircle2, 
  Car, 
  Clock, 
  BadgeCheck, 
  Banknote, 
  MapPin, 
  ChevronRight,
  MessageSquare,
  Star,
  ShieldCheck,
  Zap,
  Info,
  Truck,
  ShieldAlert,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface PageData {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  bullets: string[];
}

// --- SEO Metadata helper ---
const JsonLd = ({ data }: { data: any }) => (
  <script type="application/ld+json">
    {JSON.stringify(data)}
  </script>
);

// --- Shared Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'ghost' | 'poppins'; 
  className?: string;
  [key: string]: any;
}) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none min-h-[48px]";
  
  const variants = {
    primary: "bg-primary-red text-white font-semibold h-[48px] px-6 py-[10px] rounded-[2px] border-none hover:bg-[#B30000] active:shadow-[inset_0px_2px_4px_rgba(0,0,0,0.3)]",
    poppins: "bg-primary-red text-white font-display font-medium h-[52px] px-8 py-[10px] rounded-0 border-none hover:bg-[#B30000]",
    secondary: "bg-transparent text-primary-red font-bold h-[48px] px-6 py-[7px] rounded-0 border-2 border-primary-red hover:bg-primary-red hover:text-white",
    ghost: "bg-transparent text-white font-bold h-[56px] px-[25px] py-[14px] rounded-0 border-2 border-white hover:bg-white hover:text-primary-red"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Input = ({ label, required, ...props }: { label: string; required?: boolean; [key: string]: any }) => (
  <div className="mb-5 w-full text-left">
    <label className="block text-dark-gray font-bold text-base mb-2 leading-[21.6px]">
      {label} {required && <span className="text-primary-red ml-1">*</span>}
    </label>
    <input 
      className="w-full h-[46px] bg-off-white border border-border-gray rounded-[2px] px-[14.4px] py-[11.5px] text-base text-[#777777] placeholder:text-light-gray focus:border-primary-red focus:outline-[2px] focus:outline-primary-red focus:outline-offset-2 transition-all"
      {...props}
    />
  </div>
);

const Select = ({ label, required, options, ...props }: { label: string; required?: boolean; options: string[]; [key: string]: any }) => (
  <div className="mb-5 w-full text-left">
    <label className="block text-dark-gray font-bold text-base mb-2 leading-[21.6px]">
      {label} {required && <span className="text-primary-red ml-1">*</span>}
    </label>
    <select 
      className="w-full h-[46px] bg-off-white border border-border-gray rounded-[2px] px-[14.4px] text-base text-[#777777] focus:border-primary-red focus:outline-[2px] focus:outline-primary-red focus:outline-offset-2 transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23777777%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center] bg-[length:18px]"
      {...props}
    >
      <option value="">Bitte wählen...</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 border border-border-gray shadow-xl text-center min-h-[400px] flex flex-col justify-center items-center"
      >
        <div className="w-20 h-20 bg-success-green/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={40} className="text-success-green" />
        </div>
        <h2 className="text-3xl font-display font-bold mb-4">Anfrage gesendet!</h2>
        <p className="text-medium-gray text-lg mb-8">Wir kontaktieren Sie innerhalb von 30 Minuten.</p>
        <Button onClick={() => { setIsSubmitted(false); setStep(1); }} variant="secondary">WEITERE BEWERTUNG</Button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white border border-border-gray shadow-elevated relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-border-gray">
        <motion.div className="h-full bg-primary-red" animate={{ width: `${(step / 3) * 100}%` }} />
      </div>

      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-dark-gray">
            {step === 1 && "Fahrzeug Daten"}
            {step === 2 && "Zustand & Details"}
            {step === 3 && "Kontakt Informationen"}
          </h2>
          <span className="text-sm font-bold text-primary-red">Schritt {step}/3</span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Input label="Marke" required placeholder="z.B. BMW" />
                <Input label="Modell" required placeholder="z.B. X5" />
                <Input label="Jahrgang" required placeholder="z.B. 2018" />
                <Input label="Km-Stand" required placeholder="z.B. 85'000" />
              </div>
              <Button onClick={nextStep} variant="poppins" className="w-full mt-4 uppercase font-bold tracking-wider">WEITER <ChevronRight size={18} className="ml-2" /></Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Select label="Getriebe" options={['Automat', 'Manuell']} />
                <Select label="Treibstoff" options={['Benzin', 'Diesel', 'Hybrid', 'Elektro']} />
                <Select label="Letzte MFK" options={['Frisch', '1-2 Jahre', 'Über 2 Jahre']} />
                <Input label="Preisvorstellung" placeholder="CHF" />
              </div>
              <div className="flex gap-4 mt-4">
                <Button onClick={prevStep} variant="secondary" className="flex-1 uppercase font-bold">ZURÜCK</Button>
                <Button onClick={nextStep} variant="poppins" className="flex-2 uppercase font-bold tracking-wider">WEITER</Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Input label="Name" required />
                <Input label="Telefon" required />
                <Input label="E-Mail" required />
                <Input label="Ort" required />
              </div>
              <div className="flex gap-4 mt-4">
                <Button onClick={prevStep} variant="secondary" className="flex-1 uppercase font-bold">ZURÜCK</Button>
                <Button onClick={() => setIsSubmitted(true)} variant="poppins" className="flex-2 uppercase font-bold tracking-wider">ANGEBOT ERHALTEN <Zap size={18} className="ml-2" /></Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Page Components ---

const HeroSection = ({ data }: { data: PageData }) => (
  <section className="relative py-20 lg:py-32 overflow-hidden bg-black">
    <div className="absolute inset-0 opacity-40">
      <img src={data.heroImage} className="w-full h-full object-cover" alt="Hero" />
    </div>
    <div className="relative z-10 max-w-[1200px] mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
      <div className="text-white text-center lg:text-left">
        <div className="inline-block bg-primary-red px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6">{data.subtitle}</div>
        <h1 className="text-4xl md:text-5xl lg:text-[40px] leading-tight font-display font-bold mb-8">
          {data.title}
        </h1>
        <p className="mb-10 text-lg opacity-80 max-w-xl">{data.description}</p>
        <ul className="mb-10 space-y-4 inline-block text-left">
          {data.bullets.map((b, i) => (
            <li key={i} className="flex items-center gap-3 font-bold"><CheckCircle2 className="text-success-green" /> {b}</li>
          ))}
        </ul>
      </div>
      <div id="bewertung">
        <MultiStepForm />
      </div>
    </div>
  </section>
);

const LatestPurchases = () => {
  const purchases = [
    { m: "BMW X5 xDrive", p: "CHF 52'400", l: "Zürich", i: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400" },
    { m: "VW Golf 8 GTI", p: "CHF 38'900", l: "Bern", i: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=400" },
    { m: "Audi Q7 TFSI", p: "CHF 46'200", l: "Luzern", i: "https://images.unsplash.com/photo-1606152424101-ad4e9bc36701?auto=format&fit=crop&w=400" },
    { m: "Tesla Model 3", p: "CHF 41'500", l: "Basel", i: "https://images.unsplash.com/photo-1563720223185-11003d516905?auto=format&fit=crop&w=400" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-3xl font-display font-bold mb-12 text-center underline decoration-primary-red decoration-4 underline-offset-12">Kürzlich <span className="text-primary-red">gekauft</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {purchases.map((car, i) => (
            <div key={i} className="border border-border-gray overflow-hidden group hover:border-primary-red transition-all">
              <div className="h-44 overflow-hidden relative">
                <img src={car.i} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={car.m} />
                <div className="absolute top-2 right-2 bg-success-green text-white text-[10px] font-bold px-2 py-1">ANKAUF GARANTIERT</div>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-1">{car.m}</h3>
                <div className="flex items-center gap-1 text-[10px] text-medium-gray mb-3"><MapPin size={10} /> {car.l}</div>
                <div className="text-primary-red font-bold text-lg">{car.p}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TrustBar = () => (
  <section className="py-12 bg-off-white border-y border-border-gray">
    <div className="max-w-[1200px] mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
      <div className="flex items-center gap-4 justify-center md:justify-start">
        <ShieldCheck size={40} className="text-primary-red" />
        <div><h3 className="font-bold uppercase text-xs tracking-widest text-primary-red mb-1">Vertrauen</h3><h4 className="font-bold">Sicher & Seriös</h4><p className="text-sm text-medium-gray">Handelszertifikat Schweiz</p></div>
      </div>
      <div className="flex items-center gap-4 justify-center md:justify-start border-y md:border-y-0 md:border-x border-border-gray py-6 md:py-0 md:px-8">
        <div className="flex text-[#FFB800]">{[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}</div>
        <div><h3 className="font-bold uppercase text-xs tracking-widest text-primary-red mb-1">Qualität</h3><h4 className="font-bold">4.9/5 Bewertung</h4><p className="text-sm text-medium-gray">Über 1'200 Kundenbewertungen</p></div>
      </div>
      <div className="flex items-center gap-4 justify-center md:justify-start">
        <Zap size={40} className="text-primary-red" />
        <div><h3 className="font-bold uppercase text-xs tracking-widest text-primary-red mb-1">Tempo</h3><h4 className="font-bold">24h Auszahlung</h4><p className="text-sm text-medium-gray">Garantierte Bearbeitung</p></div>
      </div>
    </div>
  </section>
);

// --- Pages ---

const Home = () => {
  const homeData: PageData = {
    title: "Der schweizweite Partner für den Autoankauf",
    subtitle: "Willkommen bei Autoankauf Nonstop",
    description: "Verkaufen Sie Ihr Fahrzeug sicher, schnell und zum garantierten Bestpreis. Wir sind spezialisiert auf den Ankauf aller Marken und Modelle in der ganzen Schweiz.",
    heroImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920",
    bullets: ["Gratis Bewertung in 30 Min.", "Sofort Bargeld vor Ort", "Abholung schweizweit"]
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <HeroSection data={homeData} />
      <TrustBar />
      <LatestPurchases />
      
      {/* Services Spokes */}
      <section className="py-24 bg-off-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-3xl font-display font-bold mb-16 text-center">Unsere <span className="text-primary-red">Spezialisierungen</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: "Unfallwagenankauf", d: "Wir kaufen Fahrzeuge mit Totalschaden oder Mängeln.", l: "/unfallwagenankauf/", i: <ShieldAlert className="text-primary-red" size={40} /> },
              { t: "Autoexport", d: "Globaler Export-Service für ältere Fahrzeuge.", l: "/autoexport/", i: <Globe className="text-primary-red" size={40} /> },
              { t: "Defekte Fahrzeuge", d: "Getriebe- oder Motorschäden sind kein Problem.", l: "/defekte-fahrzeuge/", i: <Truck className="text-primary-red" size={40} /> },
            ].map((s, i) => (
              <Link key={i} to={s.l} className="bg-white p-8 border border-border-gray hover:border-primary-red group transition-all">
                <div className="mb-6">{s.i}</div>
                <h3 className="text-xl font-bold mb-4">{s.t}</h3>
                <p className="text-medium-gray mb-6 leading-relaxed">{s.d}</p>
                <div className="text-primary-red font-bold flex items-center group-hover:gap-2 transition-all">MEHR ERFAHREN <ChevronRight size={16} /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Regions Spokes */}
      <section className="py-24 bg-white border-t border-border-gray">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-display font-bold">Autoankauf in Ihrer <span className="text-primary-red">Region</span></h2>
              <p className="text-medium-gray mt-2">Wir sind lokal präsent für schnellere Abholungen.</p>
            </div>
            <Link to="/kontakt/" className="text-primary-red font-bold underline">Alle Regionen anzeigen</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Zürich', 'Bern', 'Basel', 'Luzern', 'Uri', 'Aargau', 'Zug', 'Glarus', 'Schwyz', 'St. Gallen', 'Thurgau', 'Solothurn'].map((r, i) => (
              <Link key={i} to={`/autoankauf-${r.toLowerCase().replace(' ', '-')}/`} className="p-4 border border-border-gray text-center font-bold hover:bg-primary-red hover:text-white hover:border-primary-red transition-all">
                {r}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const LandingPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  
  const content = useMemo(() => {
    const rawName = slug?.replace('autoankauf-', '').replace('-', ' ') || 'Schweiz';
    const name = rawName.charAt(0).toUpperCase() + rawName.slice(1);
    const isService = location.pathname.includes('unfallwagen') || location.pathname.includes('export') || location.pathname.includes('defekt');
    
    return {
      name,
      title: isService 
        ? `${name} Ankauf & Export Schweiz`
        : `Professioneller Autoankauf in ${name}`,
      subtitle: isService ? "Globaler Service" : `Lokaler Partner: ${name}`,
      description: isService
        ? `Spezialisierter Ankauf von Fahrzeugen für den Export. Wir kaufen Unfallwagen, Defekte und PKW zum Bestpreis.`
        : `Ihr zuverlässiger Partner für den Autoverkauf in ${name}. Wir bieten faire Preise und sofortige Abwicklung direkt vor Ort.`,
      heroImage: isService 
        ? "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1920"
        : "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920",
      bullets: isService 
        ? ["Expertenbewertung", "Abwicklung Export", "Zoll & Logistik"]
        : ["Hausbesuche 24h", "Bargeld vor Ort", "Abmeldung gratis"],
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": isService ? `${name} Service` : `Autoankauf ${name}`,
        "description": `Verkaufen Sie Ihr Auto in ${name} zum garantierten Bestpreis.`,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Autoankauf Nonstop",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": name,
            "addressCountry": "CH"
          }
        }
      }
    };
  }, [slug, location]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <JsonLd data={content.schema} />
      <HeroSection data={content as any} />
      <TrustBar />
      
      {/* 3D Framework: Step 1: Hook */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h2 className="text-4xl font-display font-bold mb-6">Auto verkaufen in <span className="text-primary-red">{content.name}</span> war noch nie so einfach.</h2>
          <p className="text-xl text-medium-gray max-w-2xl mx-auto leading-relaxed">
            Wir wissen, dass der Autoverkauf oft stressig ist. In {content.name} bieten wir eine Lösung, die 100% stressfrei, sicher und lukrativ ist.
          </p>
        </div>
      </section>

      {/* 3D Framework: Step 2: Value Proposition */}
      <section className="py-24 bg-off-white">
        <div className="max-w-[1200px] mx-auto px-4 grid md:grid-cols-3 gap-12">
          <div className="bg-white p-8 border border-border-gray shadow-sm hover:shadow-lg transition-all group">
            <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform"><Clock size={32} /></div>
            <h3 className="text-2xl font-bold mb-4 font-display">Turbo Abwicklung</h3>
            <p className="text-medium-gray leading-relaxed text-sm">Innerhalb von nur 30 Minuten nach Ihrer Anfrage erhalten Sie eine erste Bewertung. In der gesamten Region {content.name} sind wir meist in weniger als 24 Stunden bei Ihnen.</p>
          </div>
          <div className="bg-white p-8 border border-border-gray shadow-sm hover:shadow-lg transition-all group">
            <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform"><Banknote size={32} /></div>
            <h3 className="text-2xl font-bold mb-4 font-display">Barzahlung Vor Ort</h3>
            <p className="text-medium-gray leading-relaxed text-sm">Kein Warten auf Überweisungen. Wenn wir uns einig sind, erhalten Sie den vollen Kaufbetrag sofort in Bar ausgehändigt oder per Echtzeit-Überweisung.</p>
          </div>
          <div className="bg-white p-8 border border-border-gray shadow-sm hover:shadow-lg transition-all group">
            <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform"><ShieldCheck size={32} /></div>
            <h3 className="text-2xl font-bold mb-4 font-display">Reibungslose Logistik</h3>
            <p className="text-medium-gray leading-relaxed text-sm">Wir übernehmen das Abschleppen und die Abmeldung Ihres Fahrzeugs in {content.name} kostenlos. Sie müssen sich um absolut nichts kümmern.</p>
          </div>
        </div>
      </section>

      {/* 3D Framework: Step 3: Social Proof */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold mb-16">Was Kunden in <span className="text-primary-red">{content.name}</span> sagen</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-off-white p-10 border-l-4 border-primary-red text-left">
              <div className="flex text-[#FFB800] mb-4">{[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}</div>
              <p className="italic text-lg mb-6 leading-relaxed">"Absolut reibungslos. Kontakt am Morgen, Auto am Nachmittag in {content.name} abgeholt und bar bezahlt. So stellt man sich das vor!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-red rounded-full flex items-center justify-center text-white font-bold">M</div>
                <div><div className="font-bold">Marc S.</div><div className="text-xs text-medium-gray">vor 2 Wochen aus {content.name}</div></div>
              </div>
            </div>
            <div className="bg-off-white p-10 border-l-4 border-primary-red text-left">
              <div className="flex text-[#FFB800] mb-4">{[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}</div>
              <p className="italic text-lg mb-6 leading-relaxed">"Mein Unfallwagen stand schon lange rum. Autoankauf Nonstop hat ihn fair bewertet und am nächsten Tag abgeschleppt. Danke!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-red rounded-full flex items-center justify-center text-white font-bold">L</div>
                <div><div className="font-bold">Lukas B.</div><div className="text-xs text-medium-gray">vor 1 Monat aus {content.name}</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-red py-20">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-8">Bereit für den Autoverkauf in {content.name}?</h2>
          <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto">Holen Sie sich jetzt Ihr unverbindliches Angebot. Kostenlos und in unter 15 Minuten.</p>
          <Button variant="ghost" className="bg-white text-primary-red hover:bg-transparent hover:text-white h-20 px-16 text-2xl font-bold uppercase tracking-[0.2em] shadow-2xl">
            JETZT BEWERTEN
          </Button>
        </div>
      </section>
    </motion.div>
  );
};

// --- Main Layout ---

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const regions = ['Zürich', 'Bern', 'Basel', 'Luzern', 'Aargau', 'Zug'];
  const services = [
    { n: 'Unfallwagen', s: 'unfallwagenankauf' },
    { n: 'Autoexport', s: 'autoexport' },
    { n: 'Defekte Autos', s: 'defekte-fahrzeuge' }
  ];

  return (
    <div className="bg-white min-h-screen selection:bg-primary-red selection:text-white flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white border-b border-border-gray shadow-sm h-20 flex items-center">
        <div className="max-w-[1200px] mx-auto px-4 w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary-red p-2.5 text-white transition-transform group-hover:rotate-12"><Car size={26} /></div>
            <span className="font-display text-xl font-bold uppercase tracking-tight">AUTOANKAUF <span className="text-primary-red">NONSTOP</span></span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8">
            <div className="flex gap-8">
              {['STARTSEITE', 'SERVICES', 'REGIONEN', 'FAQ', 'KONTAKT'].map((item) => (
                <Link 
                  key={item} 
                  to={item === 'STARTSEITE' ? '/' : `/${item.toLowerCase()}/`} 
                  className="font-bold text-[13px] tracking-widest hover:text-primary-red transition-all relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-red transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </div>
            <Button className="h-10 px-6 font-bold tracking-[0.15em] text-xs shadow-md">
              GEBOT ERHALTEN
            </Button>
          </nav>

          <button className="lg:hidden text-primary-red p-2" onClick={() => setIsMenuOpen(true)}>
            <Menu size={32} />
          </button>
        </div>

        {/* Mobile slide-in menu (80% width) */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 h-full w-[80%] bg-white z-[101] shadow-2xl flex flex-col"
              >
                <div className="h-20 border-b flex items-center justify-between px-6">
                   <span className="font-display font-bold text-lg">MENU</span>
                   <button onClick={() => setIsMenuOpen(false)} className="text-primary-red"><X size={32} /></button>
                </div>
                <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-8">
                  <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold font-display">STARTSEITE</Link>
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-bold text-light-gray uppercase tracking-[0.2em]">Kategorien</span>
                    {['Services', 'Regionen', 'FAQ', 'Kontakt'].map(item => (
                      <Link key={item} to={`/${item.toLowerCase()}/`} onClick={() => setIsMenuOpen(false)} className="text-xl font-bold">{item}</Link>
                    ))}
                  </div>
                  <div className="mt-8 p-6 bg-off-white border border-border-gray">
                    <p className="text-xs font-bold text-primary-red uppercase mb-4 tracking-widest">Sofort-Kontakt</p>
                    <a href="tel:0800123456" className="text-2xl font-display font-bold">0800 123 456</a>
                  </div>
                </div>
                <div className="p-6">
                  <Button className="w-full text-lg font-bold uppercase tracking-widest">JETZT BEWERTEN</Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-dark-gray text-white pt-24 pb-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 pb-20 border-b border-white/5 mb-20 items-end">
            <div>
              <h3 className="text-3xl font-display font-bold mb-4">Bleiben Sie <span className="text-primary-red">informiert.</span></h3>
              <p className="text-light-gray max-w-sm">Neuigkeiten zum Automarkt und exklusive Angebote direkt in Ihr Postfach.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
               <input placeholder="E-Mail Adresse" className="flex-grow h-14 bg-white/5 border border-white/10 px-6 rounded-sm focus:border-primary-red outline-none transition-all" />
               <Button className="h-14 px-10 whitespace-nowrap uppercase tracking-widest text-xs font-bold">ANMELDEN</Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 text-left">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-8">
                <div className="bg-primary-red p-2 text-white"><Car size={20} /></div>
                <span className="font-display text-lg font-bold">AUTOANKAUF <span className="text-primary-red">NONSTOP</span></span>
              </Link>
              <p className="text-sm text-light-gray leading-relaxed mb-8">Seit 15 Jahren der sicherste Weg, Ihr Auto in der Schweiz zum Bestpreis zu verkaufen. Transparent, schnell und fair.</p>
              <div className="flex gap-4">
                {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center rounded-sm hover:bg-primary-red transition-all cursor-pointer"><Globe size={18} /></div>)}
              </div>
            </div>
            <div>
              <h4 className="font-display text-base font-bold mb-8 uppercase tracking-widest text-primary-red">Unsere Services</h4>
              <ul className="space-y-4 text-sm text-light-gray">
                <li><Link to="/unfallwagenankauf/" className="hover:text-primary-red transition-all">Unfallwagen-Ankauf</Link></li>
                <li><Link to="/autoexport/" className="hover:text-primary-red transition-all">Auto für den Export</Link></li>
                <li><Link to="/defekte-fahrzeuge/" className="hover:text-primary-red transition-all">Defekte Fahrzeuge</Link></li>
                <li><Link to="/" className="hover:text-primary-red transition-all">Oldtimer Ankauf</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-base font-bold mb-8 uppercase tracking-widest text-primary-red">Top Regionen</h4>
              <ul className="space-y-4 text-sm text-light-gray">
                {['Zürich', 'Bern', 'Basel', 'Luzern'].map(r => (
                   <li key={r}><Link to={`/autoankauf-${r.toLowerCase()}/`} className="hover:text-primary-red transition-all">{r} & Umland</Link></li>
                ))}
                <li><Link to="/locations/" className="text-primary-red underline">Alle Regionen</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-base font-bold mb-8 uppercase tracking-widest text-primary-red">Kontakt</h4>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="text-primary-red shrink-0" size={20} />
                  <p className="text-sm text-light-gray">Hauptstrasse 123<br/>8001 Zürich, Schweiz</p>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-primary-red shrink-0" size={20} />
                  <a href="tel:0800123456" className="text-sm text-light-gray hover:text-white">0800 123 456</a>
                </div>
                <div className="flex gap-4">
                  <MessageSquare className="text-primary-red shrink-0" size={20} />
                  <p className="text-sm text-light-gray">info@autoankauf-nonstop.ch</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-xs font-bold text-light-gray uppercase tracking-widest mt-0">© 2026 Autoankauf Nonstop. Ein Unternehmen der SwissCar Group.</p>
            <div className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-light-gray mt-0">
              <Link to="/impressum/" className="hover:text-primary-red transition-all">Impressum</Link>
              <Link to="/datenschutz/" className="hover:text-primary-red transition-all">Datenschutz</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4">
        <motion.a href="tel:0800123456" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-14 h-14 bg-primary-red text-white flex items-center justify-center shadow-overlay rounded-sm">
          <Phone size={24} />
        </motion.a>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-14 h-14 bg-primary-red text-white flex items-center justify-center shadow-overlay rounded-sm">
          <MessageSquare size={24} />
        </motion.button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:slug/" element={<LandingPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

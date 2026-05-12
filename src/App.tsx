/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  Menu as MenuIcon, 
  X, 
  ShoppingBag, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';

const IMAGES = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZZZtYOTmS8rVcGq8r8wyIjhtZcS91jriIf5xQrGsbGirv1uf8Aoqmy2JWXEMpq7f7DctHKnVcLfMTvW4bhsLdBdNaX6v92VtPFy-ZJtsTFgVYoZQKMAjQbA-4DkBBj1P4MbUdJt_bPPSCFioHC_0KUb3J3i8xqkGPaFCqxd7x6Xv3DoEwR_DcpAsRLmPSqWARJz8R541EOPpLcmyx38ViM_p2fDoKjET9-hNu1zngMr7E1yCZOQMXs1y1gme5Bghb6mY4V1VEnuhO",
  artisanLatte: "https://lh3.googleusercontent.com/aida-public/AB6AXuAd_yk8Ei52GHt6gOneR9-m24k1Uo8USt5F5nvq_4UemMS6eqtaeKSHQ08mpqoQpwyBtKR_LhGjiTluw8e2KXkFAQCWIVUBlOHkjWlTQopC1Zsnrnr7tS1h4zgCuQhlrSr5tYwpcI43Dl5GMZ8_q8IJWp99HH321n4z18DTfhplulPmoVsMJ3rZFQvoZcfzpVgkglKdqgkE3y9wOuZPKM7xhlHuVsyaL8QnB5abgEookG0Uff6gYe-7FTyb5MVcpDN_aQ090Fdgf5sm",
  espresso: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLnXEH4u3gY3sLRPrlC5vxHEyz8MVCIDSIWERXcGeYUotL9CJBozYbpMdgfp4jWMjuwzFHhtthmD8qaiGkiXc0hP4C3xChyvOYOWrqM9EdfyR0svZGJ8DFXIJYmBp2v025kBY-aMgyS-rs4ouXlhBKK73bItXBLWE7RrE04XahRZaGX5YUjdRip62XRPfAZXvDPMFluO3Yvvqmwkb8snpP7YrxO6ojsgHNRhawHzAgt9VdHBaHziUYuvh_hhXkMo7FmmrU_br8U0Cr",
  cappuccino: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-vJFbTvqX9UTcLBBLPKdfOO4gP6QQBPrGpOwo-9VXzZufHpvIZhcRSIAyVn3CFd5PJd6g5ZBra6kJRLYNdLKAiEiXXnLZNYaYB93R40TnjKWltNp53WnKSNVS5YWIISlkeduX6GfrRBu-LtyeOn9I_PCI874Br8XVDkt7m5B-JcY7B_3fOO2MXGha-gvEjd-RsB4hE-dpO6OnM8G8hzFUowk18ECKbowMebAW9iA1ITTgRvNUTjLSDiVKdqiji744AZhLw2o3fALy",
  coldBrew: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-4HgBH1jhoPoY4boKMkE9K9WeQN2Zrq5Gn1VmLG2i0u2-yOQm0nzHacfMzNwTFwxRjIiJzd81dc9NsY-kqGnUeo0_L6tsXKG7ByLbxIoyjnnj-SfI-K_cI5kUIdDd3Y34ofqfhmgB9675lI8msJpGfPXWLe8VktCVrHlupP0ZTDnZsk7rwh_MvN04gsl438v5MZF9V6IRpxfxmpncNRzDsX25rsZwHoAKViYlQNlbUO-xK8OOJMPT--E-JmKzhflooDyr3KkIWI8v",
  croissant: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1iTVqnTCzgSgI8KH2SfHUtUMrN_SRnobvtHChsKlFPBy6a4Tqh-vV7mBAwpxqEFrQJYps4l22Y5OtGYOqFK9N5JAv0WJM185e5uBqPSdiHNu_RARWtlCmsRqZjOky06-8Fn1Lcy6DLiWkzFVKu30OArjIqBhAhqIRRFYvjjnUGkVxP5bxsQbn_HJydb7XspN2tFRx-xybnT1CF2ySebFpfkVJuipv_fEGZyCm1yQ8R7O2LXnqRvtxL3BwNmJg9F8IQU6EjPRgk_oJ"
};

const MENU_ITEMS = [
  {
    id: 'artisan-latte',
    name: 'Artisan Latte',
    description: 'Velvety steamed milk over our house espresso blend, finished with intricate latte art.',
    price: '$4.75',
    image: IMAGES.artisanLatte,
    tag: 'Signature',
    large: true
  },
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'Pure, intense, balanced.',
    price: '$3.50',
    image: IMAGES.espresso
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Equal parts espresso, milk, and foam.',
    price: '$4.50',
    image: IMAGES.cappuccino
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    description: 'Slow-steeped for 18 hours.',
    price: '$5.00',
    image: IMAGES.coldBrew
  },
  {
    id: 'croissant',
    name: 'Butter Croissant',
    description: 'Flaky, buttery perfection.',
    price: '$3.75',
    image: IMAGES.croissant
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen font-sans selection:bg-primary-container selection:text-on-primary-container ${isDarkMode ? 'dark' : ''}`}>
      {/* Background provided by layer base in index.css */}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-container-max mx-auto px-gutter flex justify-between items-center">
          <motion.a 
            href="#" 
            className="flex items-center gap-2 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary overflow-hidden">
               <Coffee size={20} />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight text-primary">Brew Haven</span>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {['Menu', 'About', 'Gallery', 'Location'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Nav Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-surface-variant transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a 
              href="#order"
              className="hidden md:flex items-center justify-center bg-primary text-on-primary px-6 py-2.5 rounded-xl text-sm font-semibold hover:scale-[1.02] active:scale-95 transition-all shadow-md shadow-primary/20"
            >
              Order Now
            </a>
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-[100] bg-background md:hidden p-gutter flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex justify-between items-center mb-10">
              <span className="font-display text-2xl font-bold text-primary">Brew Haven</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {['Menu', 'About', 'Gallery', 'Location'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-display font-semibold text-primary"
                >
                  {item}
                </a>
              ))}
              <a 
                href="#order"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 bg-primary text-on-primary py-4 rounded-2xl text-center font-bold text-lg"
              >
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
            src={IMAGES.hero} 
            alt="Café Interior" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-container-max mx-auto w-full px-gutter relative z-20">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-block px-4 py-1 bg-surface-variant text-secondary text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              The Slow Coffee Movement
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary leading-[1.1] mb-6">
              Fresh Coffee. <br />
              <span className="text-secondary italic">Cozy Moments.</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-lg mb-10 leading-relaxed font-sans">
              Experience handcrafted coffee, fresh pastries, and a relaxing atmosphere designed for those who appreciate the tactile luxury of a perfect pour.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#menu" 
                className="bg-primary text-on-primary px-8 py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 flex items-center gap-2 group"
              >
                View Menu <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a 
                whileHover={{ backgroundColor: 'var(--color-surface-variant)' }}
                href="#location" 
                className="border border-outline text-primary px-8 py-4 rounded-2xl font-bold transition-colors"
              >
                Visit Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {/* Curated Selection */}
        <section id="menu" className="py-24 px-gutter max-w-container-max mx-auto">
          <div className="max-w-2xl mb-16">
            <motion.h2 
              className="font-display text-4xl font-bold text-primary mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Curated Selection
            </motion.h2>
            <motion.p 
              className="text-on-surface-variant italic"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Crafted with precision, served with warmth. Explore our signature offerings.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]">
            {MENU_ITEMS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 bg-surface-variant/20 ${item.large ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <div className="absolute inset-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {item.large && <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />}
                </div>

                <div className={`absolute bottom-0 left-0 w-full p-8 ${item.large ? 'text-white' : 'bg-background/90 backdrop-blur-md translate-y-[2px] transition-transform'}`}>
                  <div className="flex justify-between items-end gap-4">
                    <div className="flex-1">
                      {item.tag && (
                        <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] uppercase font-black rounded-full mb-3 tracking-widest">
                          {item.tag}
                        </span>
                      )}
                      <h3 className={`font-display mb-1 ${item.large ? 'text-3xl font-bold' : 'text-xl font-semibold text-primary'}`}>
                        {item.name}
                      </h3>
                      <p className={`text-sm line-clamp-2 ${item.large ? 'text-white/80' : 'text-on-surface-variant opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300'}`}>
                        {item.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`font-display text-xl font-semibold ${item.large ? 'text-secondary-container' : 'text-secondary'}`}>
                        {item.price}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <motion.button 
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors"
            >
              View Full Menu <ArrowRight size={18} />
            </motion.button>
          </div>
        </section>

        {/* Floating CTA */}
        <motion.a 
          href="#order"
          className="fixed bottom-8 right-8 z-[60] w-14 h-14 md:w-16 md:h-14 lg:w-16 lg:h-16 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 group hover:scale-110 active:scale-95 transition-transform"
          whileHover={{ y: -5 }}
        >
          <ShoppingBag size={24} className="group-hover:rotate-12 transition-transform" />
          <span className="sr-only">Order Now</span>
        </motion.a>
      </main>

      {/* Footer */}
      <footer className="bg-surface-variant/30 pt-24 pb-12">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <h2 className="font-display text-3xl font-bold text-primary mb-6">Brew Haven</h2>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Crafting moments of peace through exceptional coffee and genuine hospitality. Born from a love for the artistic soul of bean and brew.
              </p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="col-span-1">
              <h4 className="font-bold text-sm uppercase tracking-widest text-secondary mb-8">Explore</h4>
              <ul className="space-y-4">
                {['Menu', 'About Us', 'Location', 'Wholesale', 'Careers'].map(item => (
                  <li key={item}><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="col-span-1">
              <h4 className="font-bold text-sm uppercase tracking-widest text-secondary mb-8">Legal</h4>
              <ul className="space-y-4">
                {['Privacy Policy', 'Terms of Service', 'Shipping', 'FAQ'].map(item => (
                  <li key={item}><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="col-span-1">
               <h4 className="font-bold text-sm uppercase tracking-widest text-secondary mb-8">Visit</h4>
               <div className="space-y-6">
                 <div className="flex gap-3 text-on-surface-variant">
                   <MapPin size={20} className="shrink-0 text-primary" />
                   <p>124 Artisan Ave, <br />East Village, NY 10003</p>
                 </div>
                 <div className="flex gap-3 text-on-surface-variant">
                   <Clock size={20} className="shrink-0 text-primary" />
                   <div>
                     <p className="font-semibold text-primary">Open Daily</p>
                     <p>7:00 AM — 8:00 PM</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-outline/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-on-surface-variant/60">
            <p>© 2024 Brew Haven Specialty Coffee. All rights reserved.</p>
            <p className="font-display">Crafted for the Slow Coffee Movement.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


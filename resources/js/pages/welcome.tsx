import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';
import {
    ArrowRight,
    ArrowDown,
    ArrowUp,
    ArrowUpRight,
    CalendarDays,
    Camera,
    Car,
    Facebook,
    Instagram,
    Mail,
    MapPin,
    MapPinned,
    Menu,
    Phone,
    Plane,
    Route,
    Star,
    UserCheck,
    X,
    Youtube,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    Moon,
    Sun,
    Plus,
    Minus,
} from 'lucide-react';

const ASSET = '/storage/uploads';

const LOGO = `/storage/logo-panjang.webp`;
const PP_WEB = `/storage/about.webp`;
const PILAR = `${ASSET}/2026/02/img-pilar.jpg`;
const FOOTER_IMG = `${ASSET}/2026/02/WhatsApp-Image-2026-02-16-at-10.05.05-1.jpeg`;

const WA_NUMBER = '6282151939247';
const EMAIL = 'waseintanperdana@gmail.com';
const ADDRESS = 'Jl. Tentara Pelajar No. 42 F, Makassar - Sulawesi Selatan';
const KEYWORDS =
    'mobil mewah, rental premium, juragan rental 47, hiace makassar, rental makassar, premium class rentcar, rentcar makassar';
const WA_LINK = `https://wa.me/${WA_NUMBER}`;
const MAP_LINK = 'https://maps.app.goo.gl/fPF1CiqHz2m2n8Fi9';
const MAP_EMBED =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.884740960433!2d119.4119989!3d-5.122268999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbf0298d4eda149%3A0x542414444215eac5!2sJl.%20Tentara%20Pelajar%20No.42%2C%20Mampu%2C%20Kec.%20Wajo%2C%20Kota%20Makassar%2C%20Sulawesi%20Selatan%2090165!5e0!3m2!1sid!2sid!4v1788882590149!5m2!1sid!2sid';

const NAV_LINKS = [
    { label: 'Beranda', href: '#home' },
    { label: 'Profil', href: '#profil' },
    { label: 'Armada', href: '#armada' },
    { label: 'Layanan', href: '#layanan' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Kontak', href: '#kontak' },
];

const HERO_CAROUSEL = [
    `${ASSET}/2026/01/Hiace-commuter.webp`,
    `${ASSET}/2025/10/Hiace-PREMIO-1-768x533.png`,
    `${ASSET}/2025/09/innova-reborn2025-e1760086700141.png`,
    `${ASSET}/2025/09/expander-768x513.webp`,
];

const ARMADA = [
    {
        slug: 'toyota-hiace-commuter',
        image: `${ASSET}/2026/01/Hiace-commuter.webp`,
        name: 'TOYOTA HIACE COMMUTER',
        capacity: '15 Seat · Full AC, TV, Karaoke',
        price: 'Rp 800.000',
    },
    {
        slug: 'toyota-hiace-premio-vip',
        image: `${ASSET}/2025/10/Hiace-PREMIO-1-768x533.png`,
        name: 'TOYOTA HIACE PREMIO VIP',
        capacity: '13 Seat · Full AC, TV, Karaoke',
        price: 'Rp 1.000.000',
    },
    {
        slug: 'toyota-innova-reborn',
        image: `${ASSET}/2025/09/innova-reborn2025-e1760086700141.png`,
        name: 'TOYOTA INNOVA REBORN',
        capacity: '7 Seat · Nyaman untuk keluarga',
        price: 'Rp 650.000',
    },
    {
        slug: 'mitsubishi-x-pander',
        image: `${ASSET}/2025/09/expander-768x513.webp`,
        name: 'MITSUBISHI X PANDER',
        capacity: '7 Seat · Nyaman untuk keluarga',
        price: 'Rp 600.000',
    },
];

const GALLERY_CUSTOMER = [
    'WhatsApp-Image-2026-02-16-at-10.05.20-2.webp',
    'WhatsApp-Image-2026-02-16-at-10.05.13.webp',
    'WhatsApp-Image-2026-02-16-at-10.05.01.webp',
    'WhatsApp-Image-2026-02-16-at-10.05.19-1.webp',
    'WhatsApp-Image-2026-02-16-at-10.05.21-3.webp',
    'WhatsApp-Image-2026-02-16-at-10.05.20-1.webp',
    'WhatsApp-Image-2026-02-16-at-10.05.25.webp',
    'WhatsApp-Image-2026-02-16-at-10.05.21.webp',
];

const GALLERY_ARMADA = [
    'WhatsApp-Image-2026-02-16-at-10.05.26-2.webp',
    'WhatsApp-Image-2026-02-16-at-10.04.59-1.webp',
    'WhatsApp-Image-2026-02-16-at-10.05.19.webp',
    'WhatsApp-Image-2026-02-16-at-10.05.29.webp',
    'WhatsApp-Image-2026-02-16-at-10.03.10.webp',
    'WhatsApp-Image-2026-02-16-at-10.05.20.webp',
    'WhatsApp-Image-2026-02-16-at-10.05.06.webp',
    'WhatsApp-Image-2026-02-16-at-10.04.04-1.webp',
];

const SERVICES = [
    {
        Icon: Car,
        title: 'Rental Mobil',
        description:
            'Sewa mobil tanpa driver untuk kebutuhan pribadi atau perusahaan.',
    },
    {
        Icon: UserCheck,
        title: 'Rental Mobil + Driver',
        description: 'Sewa mobil dengan driver profesional dan berpengalaman.',
    },
    {
        Icon: Plane,
        title: 'Antar Jemput Bandara',
        description: 'Penjemputan dan pengantaran bandara Sultan Hasanuddin.',
    },
    {
        Icon: MapPinned,
        title: 'Dalam Kota Makassar',
        description:
            'Mudah beraktivitas di dalam kota Makassar dan sekitarnya.',
    },
    {
        Icon: Route,
        title: 'Luar Kota',
        description: 'Perjalanan luar kota dengan armada yang nyaman dan aman.',
    },
    {
        Icon: Camera,
        title: 'Paket Wisata',
        description:
            'Paket tour wisata Sulawesi Selatan dengan driver terbaik.',
    },
];

const FEATURES = [
    {
        Icon: Car,
        title: 'Armada Terbaru',
        description:
            'Armada selalu update dari sisi performa maupun perlengkapan kendaraan.',
    },
    {
        Icon: UserCheck,
        title: 'Driver Terbaik',
        description:
            'Driver berpengalaman, menguasai medan, dan memiliki sertifikat.',
    },
    {
        Icon: Phone,
        title: 'Harga Terjangkau',
        description: 'Harga bisa menyesuaikan dengan budget perjalanan Anda.',
    },
    {
        Icon: CalendarDays,
        title: 'CS 24 Jam',
        description: 'Layanan pelanggan 24 jam untuk informasi armada & harga.',
    },
];

const FEATURE_ICONS: Record<string, typeof Car> = {
    car: Car,
    'user-check': UserCheck,
    phone: Phone,
    calendar: CalendarDays,
    'calendar-days': CalendarDays,
    plane: Plane,
    'map-pinned': MapPinned,
    route: Route,
    camera: Camera,
    star: Star,
    'check-circle': CheckCircle2,
};

const SERVICES_LIST = [
    'Include Driver + BBM/Non BBM',
    'Luar dan Dalam Kota Makassar',
    'Rombongan Wisata, Wedding, Private Tour, Kedinasan, dan Kegiatan Sosial Lainnya',
];

const ARMADA_UNITS = [
    'TOYOTA HIACE PREMIO VIP CLASS 13 seat ( FULL ACC, TV, KARAOKE )',
    'TOYOTA HIACE PREMIO LUXURY CLASS 8 seat ( FULL AC, TV, KARAOKE)',
    'TOYOTA HIACE PREMIO STANDART CLASS 14 seat (FULL AC, TV, KARAOKE)',
    'TOYOTA HIACE COMMUTER 15 Seat ( FULL AC, TV, KARAOKE)',
    'TOYOTA INNOVA ZENIX',
    'TOYOTA INNOVA REBORN',
    'TOYOTA ALL NEW AVANZA',
    'TOYOTA FORTUNER',
    'TOYOTA ALPHARD',
    'MITSUBISHI PAJERO',
    'MITSUBISHI X PANDER',
];

const SOCIALS = [
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/rentalmobilmakassarmurah_',
        Icon: Instagram,
    },
    {
        label: 'Tiktok',
        href: 'https://www.tiktok.com/@tri.berkah.abadi',
        type: 'tiktok',
    },
    {
        label: 'Facebook',
        href: 'https://www.facebook.com/tri.berkah.98',
        Icon: Facebook,
    },
    {
        label: 'Youtube',
        href: 'https://www.youtube.com/@triberkahabadi1071',
        Icon: Youtube,
    },
];

function WhatsAppIcon({ className = 'h-5 w-5' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 448 512" fill="currentColor">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
    );
}

function TiktokIcon({ className = 'h-5 w-5' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 448 512" fill="currentColor">
            <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
        </svg>
    );
}

function Reveal({
    children,
    className = '',
    delay = 0,
    direction = 'up',
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'left' | 'right' | 'zoom' | 'blur' | 'flip';
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const getHidden = () => {
        switch (direction) {
            case 'left':
                return 'opacity-0 -translate-x-14';
            case 'right':
                return 'opacity-0 translate-x-14';
            case 'zoom':
                return 'opacity-0 scale-75';
            case 'blur':
                return 'opacity-0 scale-95 blur-md';
            case 'flip':
                return 'opacity-0 [transform:perspective(1200px)_rotateX(28deg)_translateY(30px)]';
            default:
                return 'opacity-0 translate-y-14';
        }
    };

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
                visible
                    ? 'blur-0 translate-x-0 translate-y-0 scale-100 rotate-0 opacity-100'
                    : getHidden()
            } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

function useTilt<T extends HTMLElement>(max = 14) {
    const ref = useRef<T>(null);
    const [style, setStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const reduce = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;
        if (reduce) return;

        let raf = 0;
        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;
            const rx = (0.5 - py) * max * 2;
            const ry = (px - 0.5) * max * 2;
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() =>
                setStyle({
                    transform: `perspective(1100px) rotateX(${rx.toFixed(
                        2,
                    )}deg) rotateY(${ry.toFixed(2)}deg) translateZ(6px)`,
                    transformStyle: 'preserve-3d',
                }),
            );
        };
        const onLeave = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => setStyle({ transform: 'none' }));
        };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        return () => {
            cancelAnimationFrame(raf);
            el.removeEventListener('mousemove', onMove);
            el.removeEventListener('mouseleave', onLeave);
        };
    }, [max]);

    return { ref, style };
}

function TiltCard({
    children,
    className = '',
    max = 12,
}: {
    children: ReactNode;
    className?: string;
    max?: number;
}) {
    const { ref, style } = useTilt<HTMLDivElement>(max);
    return (
        <div
            ref={ref}
            style={style}
            className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
        >
            {children}
        </div>
    );
}

function Magnetic({
    children,
    className = '',
    strength = 0.3,
}: {
    children: ReactNode;
    className?: string;
    strength?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const reduce = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;
        if (reduce) return;

        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * strength;
            const y = (e.clientY - rect.top - rect.height / 2) * strength;
            el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
        };
        const onLeave = () => {
            el.style.transform = 'translate(0,0)';
        };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        return () => {
            el.removeEventListener('mousemove', onMove);
            el.removeEventListener('mouseleave', onLeave);
        };
    }, [strength]);

    return (
        <div
            ref={ref}
            className={`inline-block transition-transform duration-300 ease-out ${className}`}
        >
            {children}
        </div>
    );
}

type LandingProps = {
    title?: string;
    canonical?: string;
    site?: {
        wa_number?: string;
        email?: string;
        address?: string;
        keywords?: string;
        map_link?: string;
        map_embed?: string;
        logo?: string;
        socials?: Array<{ label: string; href: string; icon?: string }>;
    };
    hero?: {
        welcome_text?: string;
        subtitle?: string;
        title_line1?: string;
        title_line2?: string;
        description?: string;
        button_text?: string;
        button_href?: string;
        video?: string;
        background_image?: string;
        carousel?: string[];
        slides?: Array<{
            subtitle?: string;
            title_line1?: string;
            title_line2?: string;
            description?: string;
            button_text?: string;
            button_href?: string;
            image?: string;
            video?: string;
        }>;
    };
    about?: {
        image?: string;
        label?: string;
        title?: string;
        title_highlight?: string;
        company_name?: string;
        description?: string;
        services_list?: Array<string | { title: string; description: string }>;
        button_text?: string;
    };
    layanan?: {
        label?: string;
        banner_image?: string;
        title?: string;
        title_highlight?: string;
        subtitle?: string;
        features?: Array<{
            image?: string;
            icon?: string;
            title?: string;
            description?: string;
        }>;
    };
    armada?: {
        section?: {
            label?: string;
            title?: string;
            subtitle?: string;
        };
        items?: Array<{
            slug?: string;
            name?: string;
            image?: string;
            capacity?: string;
            price?: string;
        }>;
    };
    services?: {
        services_list?: Array<{
            icon?: string;
            title?: string;
            description?: string;
        }>;
    };
    galeri?: {
        title?: string;
        subtitle?: string;
        tabs?: string[];
    };
    gallery?: {
        customer?: Array<{
            id: number;
            type: 'image' | 'video' | 'youtube';
            src: string;
            thumbnail: string | null;
        }>;
        armada?: Array<{
            id: number;
            type: 'image' | 'video' | 'youtube';
            src: string;
            thumbnail: string | null;
        }>;
    };
};

type HeroSlide = {
    subtitle: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    buttonText: string;
    buttonHref: string;
    image: string;
    video: string;
};

const HERO_DEFAULTS: HeroSlide = {
    subtitle: 'Solusi Perjalanan Terbaik Anda',
    titleLine1: 'Juragan',
    titleLine2: 'Rental 47',
    description:
        'Rental Makassar menyediakan layanan sewa mobil terpercaya dengan armada bersih, nyaman, dan harga terjangkau. Melayani kebutuhan perjalanan dalam kota, luar kota, antar jemput bandara, serta paket wisata dengan driver profesional dan berpengalaman.',
    buttonText: 'Lihat Armada',
    buttonHref: '#armada',
    image: '',
    video: '',
};

function HeroParallax({ hero }: { hero?: LandingProps['hero'] }) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    const bgImage = hero?.background_image || PILAR;

    const slides: HeroSlide[] = (() => {
        if (hero?.slides && hero.slides.length > 0) {
            return hero.slides.map((slide) => ({
                subtitle: slide.subtitle || HERO_DEFAULTS.subtitle,
                titleLine1: slide.title_line1 || HERO_DEFAULTS.titleLine1,
                titleLine2: slide.title_line2 || HERO_DEFAULTS.titleLine2,
                description: slide.description || HERO_DEFAULTS.description,
                buttonText: slide.button_text || HERO_DEFAULTS.buttonText,
                buttonHref: slide.button_href || HERO_DEFAULTS.buttonHref,
                image: slide.image || '',
                video: slide.video || '',
            }));
        }

        const text = {
            subtitle: hero?.subtitle || HERO_DEFAULTS.subtitle,
            titleLine1: hero?.title_line1 || HERO_DEFAULTS.titleLine1,
            titleLine2: hero?.title_line2 || HERO_DEFAULTS.titleLine2,
            description: hero?.description || HERO_DEFAULTS.description,
            buttonText: hero?.button_text || HERO_DEFAULTS.buttonText,
            buttonHref: hero?.button_href || HERO_DEFAULTS.buttonHref,
            image: '',
            video: '',
        };

        const built: HeroSlide[] = [];
        if (hero?.video) {
            built.push({ ...text, video: hero.video });
        }
        const images =
            hero?.carousel && hero.carousel.length > 0
                ? hero.carousel
                : hero?.background_image
                  ? [hero.background_image]
                  : HERO_CAROUSEL;
        images.forEach((image) => built.push({ ...text, image }));
        return built.length > 0 ? built : [{ ...text, image: bgImage }];
    })();

    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const reduce = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;
        if (reduce) return;
        const onMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            setMouse({ x, y });
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    // Auto rotate slides
    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setActiveTab((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [slides.length]);

    // Keep the active tab in bounds if the slide list shrinks
    useEffect(() => {
        if (activeTab >= slides.length) setActiveTab(0);
    }, [activeTab, slides.length]);

    const activeSlide =
        slides[Math.min(activeTab, slides.length - 1)] || slides[0];

    return (
        <section
            id="home"
            ref={wrapRef}
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black [transform-style:preserve-3d]"
        >
            {activeSlide.video ? (
                <video
                    key={activeTab}
                    src={activeSlide.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster={activeSlide.image || undefined}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            ) : (
                <div
                    className="absolute inset-0 transition-all duration-700 ease-in-out will-change-transform"
                    style={{
                        backgroundImage: `url(${activeSlide.image || bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transform: `translate3d(${(mouse.x * -14).toFixed(
                            2,
                        )}px, ${(mouse.y * -14).toFixed(2)}px, 0) scale(1.08)`,
                    }}
                />
            )}
            {/* Gradient overlay mimicking dark cinematic style with smooth bottom transition */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/80 via-[#0a0a0f]/40 to-[#0a0a0f]/90 dark:from-[#0a0a0f] dark:via-[#0a0a0f]/60 dark:to-[#0a0a0f]" />

            <div
                className="pointer-events-none absolute inset-0 overflow-hidden will-change-transform"
                style={{
                    transform: `translate3d(${(mouse.x * 10).toFixed(
                        2,
                    )}px, ${(mouse.y * 10).toFixed(2)}px, 0)`,
                    transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                }}
            >
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-[#E10102]/10 blur-3xl"
                        style={{
                            width: `${200 + i * 100}px`,
                            height: `${200 + i * 100}px`,
                            left: `${8 + i * 15}%`,
                            top: `${12 + (i % 3) * 26}%`,
                            animation: `float ${6 + i * 1.3}s ease-in-out infinite alternate`,
                            animationDelay: `${i * 0.6}s`,
                        }}
                    />
                ))}
            </div>

            {/* Left Main Content Block (per-slide text) */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 pb-32 lg:px-12">
                <Reveal
                    key={activeTab}
                    className="max-w-2xl text-left"
                    direction="left"
                >
                    {activeSlide.subtitle && (
                        <p className="mb-3 text-sm font-semibold tracking-wider text-[#E10102] uppercase md:text-base">
                            {activeSlide.subtitle}
                        </p>
                    )}
                    <h1 className="mb-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl">
                        {activeSlide.titleLine1} <br />
                        <span className="bg-gradient-to-r from-white via-gray-100 to-white/80 bg-clip-text text-transparent">
                            {activeSlide.titleLine2}
                        </span>
                    </h1>
                    <p className="mb-8 max-w-xl text-base leading-relaxed text-gray-200 md:text-lg">
                        {activeSlide.description}
                    </p>
                    <div className="flex items-center gap-4">
                        <Magnetic>
                            <a
                                href={activeSlide.buttonHref}
                                className="group inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition hover:border-white hover:bg-white hover:text-black"
                            >
                                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/40 text-white transition group-hover:border-black group-hover:bg-black group-hover:text-white">
                                    <ArrowRight className="h-4 w-4" />
                                </span>
                                {activeSlide.buttonText}
                            </a>
                        </Magnetic>
                    </div>
                </Reveal>
            </div>

            {/* Bottom Tabs Horizontal Bar (per-slide labels) */}
            <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/40 backdrop-blur-md">
                <div className="no-scrollbar mx-auto flex max-w-7xl items-center justify-center overflow-x-auto px-4 py-4 sm:justify-start lg:px-12">
                    <div className="flex items-center gap-6 sm:gap-10">
                        {slides.map((slide, idx) => {
                            const label =
                                [slide.titleLine1, slide.titleLine2]
                                    .filter(Boolean)
                                    .join(' ') ||
                                slide.subtitle ||
                                `Slide ${idx + 1}`;
                            const isActive = activeTab === idx;

                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setActiveTab(idx)}
                                    className={`group relative pb-2 text-sm font-semibold whitespace-nowrap transition duration-300 ${
                                        isActive
                                            ? 'font-bold text-[#E10102]'
                                            : 'text-white/70 hover:text-white'
                                    }`}
                                >
                                    {label}
                                    {isActive && (
                                        <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-[#E10102]" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0% { transform: translateY(0) scale(1); }
                    100% { transform: translateY(-32px) scale(1.06); }
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}

export default function Welcome2({
    title,
    canonical = '',
    site,
    hero,
    about,
    armada,
    layanan,
    services,
    galeri,
    gallery,
}: LandingProps) {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const [menuOpen, setMenuOpen] = useState(false);
    const [bookingOpen, setBookingOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [nearTop, setNearTop] = useState(true);
    const [navSolid, setNavSolid] = useState(false);
    const [activeSection, setActiveSection] = useState('#home');
    const [galleryTab, setGalleryTab] = useState<'Customer' | 'Armada'>(
        'Customer',
    );
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);
    const [openAccordion, setOpenAccordion] = useState<number | null>(0);

    const dbCustomerGallery = gallery?.customer?.map((item) => item.src) || [];

    const displayArmada =
        armada?.items && armada.items.length > 0 ? armada.items : ARMADA;

    const featureCards =
        layanan?.features && layanan.features.length > 0
            ? layanan.features.map((feature) => ({
                  Icon: FEATURE_ICONS[feature.icon ?? ''] || Star,
                  title: feature.title || '',
                  description: feature.description || '',
              }))
            : FEATURES;
    const dbArmadaGallery = gallery?.armada?.map((item) => item.src) || [];

    const galleryData =
        galleryTab === 'Customer'
            ? dbCustomerGallery.length > 0
                ? dbCustomerGallery
                : GALLERY_CUSTOMER.map((name) => `${ASSET}/2026/02/${name}`)
            : dbArmadaGallery.length > 0
              ? dbArmadaGallery
              : GALLERY_ARMADA.map((name) => `${ASSET}/2026/02/${name}`);

    useEffect(() => {
        const ids = NAV_LINKS.map((l) => l.href.slice(1));
        const onScroll = () => {
            setNavSolid(window.scrollY > 80);
            setNearTop(window.scrollY < window.innerHeight);
            const total =
                document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(
                total > 0
                    ? Math.min(100, Math.max(0, (window.scrollY / total) * 100))
                    : 0,
            );
            const pos = window.scrollY + 120;
            let current = '#home';
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= pos) current = `#${id}`;
            }
            setActiveSection(current);
        };
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 767px)');
        const update = () => setVisibleCount(mq.matches ? 1 : 3);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        if (!bookingOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setBookingOpen(false);
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [bookingOpen]);

    useEffect(() => {
        if (lightboxIndex === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightboxIndex(null);
            if (e.key === 'ArrowLeft')
                setLightboxIndex((prev) =>
                    prev !== null
                        ? (prev - 1 + galleryData.length) % galleryData.length
                        : null,
                );
            if (e.key === 'ArrowRight')
                setLightboxIndex((prev) =>
                    prev !== null ? (prev + 1) % galleryData.length : null,
                );
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [lightboxIndex, galleryData.length]);

    useEffect(() => {
        const maxIdx = Math.max(0, HERO_CAROUSEL.length - visibleCount);
        const interval = setInterval(
            () => setCurrentSlide((c) => (c + 1) % (maxIdx + 1)),
            3000,
        );
        return () => clearInterval(interval);
    }, [visibleCount]);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const scrollToBottom = () =>
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    const handleScrollButton = () =>
        nearTop ? scrollToBottom() : scrollToTop();

    const heroMaxIdx = Math.max(0, HERO_CAROUSEL.length - visibleCount);
    const isDark = resolvedAppearance === 'dark';
    const toggleTheme = () => updateAppearance(isDark ? 'light' : 'dark');

    return (
        <div
            className="min-h-screen overflow-x-hidden bg-white text-gray-900 antialiased dark:bg-[#0a0a0f] dark:text-white"
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            <Head
                title={title || 'Rental Mobil Makassar Murah | Juragan Rental'}
            >
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
                <meta
                    name="description"
                    content="Rental Mobil Makassar murah dari Juragan Rental — rental premium, mobil mewah, Hiace & armada terbaik, harga terjangkau. Juragan Rental 47, Melayani sewa mobil dalam & luar kota, antar jemput bandara, dan paket wisata. Hubungi 0821-5193-9247."
                />
                <meta name="keywords" content={KEYWORDS} />
                <link rel="canonical" href={`${canonical}/`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Rental Mobil Makassar" />
                <meta
                    property="og:description"
                    content="Rental premium & mobil mewah di Makassar — Hiace, Innova, Xpander, harga mulai terjangkau. Juragan Rental 47."
                />
                <meta property="og:url" content={`${canonical}/`} />
                <meta property="og:image" content={`${canonical}${PP_WEB}`} />
                <meta
                    name="theme-color"
                    content={
                        resolvedAppearance === 'dark' ? '#0a0a0f' : '#ffffff'
                    }
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'RentACar',
                            name: 'Juragan Rental',
                            telephone: '+6282151939247',
                            email: EMAIL,
                            address: {
                                '@type': 'PostalAddress',
                                streetAddress: 'Jl. Tentara Pelajar No. 42 F',
                                addressLocality: 'Makassar',
                                addressRegion: 'Sulawesi Selatan',
                                addressCountry: 'ID',
                            },
                            image: '/storage/about.webp',
                            url: `${canonical}/`,
                            description:
                                'Rental mobil murah & premium di Makassar — mobil mewah, Hiace, Innova, Xpander. Juragan Rental 47.',
                        }),
                    }}
                />
            </Head>

            {/* ===== NAVBAR ===== */}
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
                    navSolid
                        ? 'bg-white/90 shadow-[0_4px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:bg-[#0a0a0f]/90 dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
                        : 'bg-transparent'
                }`}
            >
                <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
                    <a href="#home" aria-label="Beranda Juragan Rental">
                        <img
                            src={site?.logo || LOGO}
                            alt="Juragan Rental"
                            className="h-14 w-auto"
                        />
                    </a>

                    <div className="flex items-center gap-2 lg:hidden">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label={isDark ? 'Mode Terang' : 'Mode Gelap'}
                            title={isDark ? 'Mode Terang' : 'Mode Gelap'}
                            className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                                navSolid
                                    ? 'border-gray-200 bg-white text-gray-600 hover:bg-gray-100 dark:border-white/15 dark:bg-white/10 dark:text-white/90 dark:hover:bg-white/15'
                                    : 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                            }`}
                        >
                            {isDark ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </button>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setBookingOpen(true);
                            }}
                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                                navSolid
                                    ? 'border-gray-200 bg-white text-gray-700 hover:bg-gray-100 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/15'
                                    : 'border-white/20 bg-white/10 text-white hover:bg-white'
                            }`}
                        >
                            <Car className="h-4 w-4" />
                            Booking
                        </a>
                        <button
                            type="button"
                            onClick={() => setMenuOpen((o) => !o)}
                            className={`rounded-lg p-2 transition ${
                                navSolid
                                    ? 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-white/10'
                                    : 'text-white hover:bg-white/10'
                            }`}
                            aria-label="Menu Toggle"
                        >
                            {menuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    <nav className="hidden items-center gap-1 lg:flex">
                        {NAV_LINKS.map((link) => {
                            const active = activeSection === link.href;
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`rounded-full px-4 py-2 text-[14px] font-medium transition ${
                                        navSolid
                                            ? active
                                                ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
                                                : 'text-gray-700 hover:text-gray-900 dark:text-white/70 dark:hover:text-white'
                                            : active
                                              ? 'bg-white/20 text-white'
                                              : 'text-white/90 hover:text-white'
                                    }`}
                                >
                                    {link.label}
                                </a>
                            );
                        })}
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label={isDark ? 'Mode Terang' : 'Mode Gelap'}
                            title={isDark ? 'Mode Terang' : 'Mode Gelap'}
                            className={`relative ml-1 flex h-10 w-10 items-center justify-center rounded-full border transition ${
                                navSolid
                                    ? 'border-gray-200 bg-white text-gray-600 hover:bg-gray-100 dark:border-white/15 dark:bg-white/10 dark:text-white/90 dark:hover:bg-white/15'
                                    : 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                            }`}
                        >
                            <Sun
                                className={`h-5 w-5 transition-transform duration-500 ${
                                    isDark
                                        ? 'scale-100 rotate-0'
                                        : 'scale-0 -rotate-90'
                                }`}
                            />
                            <Moon
                                className={`absolute h-5 w-5 transition-transform duration-500 ${
                                    isDark
                                        ? 'scale-0 rotate-90'
                                        : 'scale-100 rotate-0'
                                }`}
                            />
                        </button>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setBookingOpen(true);
                            }}
                            className="ml-3 inline-flex items-center gap-2 rounded-full bg-[#E10102] px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#B40102]"
                        >
                            <Car className="h-4 w-4" />
                            Booking
                        </a>
                    </nav>
                </div>

                {menuOpen && (
                    <nav className="border-t border-gray-200 bg-white/95 backdrop-blur-xl lg:hidden dark:border-white/10 dark:bg-[#0a0a0f]/95">
                        <div className="mx-auto flex max-w-7xl flex-col px-4 py-2">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="border-b border-gray-100 px-2 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 dark:border-white/5 dark:text-white/80 dark:hover:text-white"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </nav>
                )}
            </header>

            {/* ===== HERO ===== */}
            <HeroParallax hero={hero} />

            {/* ===== PROFIL / ABOUT SECTION (PETRONAS Design Reference) ===== */}
            <section
                id="profil"
                className="scroll-mt-20 bg-white py-16 lg:py-24 dark:bg-[#0a0a0f]"
            >
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    {/* Header subtitle */}
                    <Reveal direction="up" className="mb-8">
                        <p className="text-base text-gray-500 dark:text-white/60">
                            {about?.label ||
                                "Discover what's happening around Juragan Rental 47."}
                        </p>
                    </Reveal>

                    <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
                        {/* Left Side: Large Rounded Featured Image (Changes dynamically when accordion clicked or shows default image) */}
                        <Reveal direction="left" className="lg:col-span-6">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-gray-100 shadow-2xl transition-all duration-500 lg:aspect-[1/1] dark:border-white/10">
                                <img
                                    src={about?.image || PP_WEB}
                                    alt={
                                        about?.company_name ||
                                        'Juragan Rental 47'
                                    }
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </Reveal>

                        {/* Right Side: Accordion Items (PETRONAS reference) */}
                        <Reveal
                            direction="right"
                            delay={150}
                            className="flex flex-col divide-y divide-gray-200 lg:col-span-6 dark:divide-white/10"
                        >
                            {/* Main Overview Accordion Item (Item 0) */}
                            {(() => {
                                const isOpen = openAccordion === 0;
                                const title = about?.title
                                    ? `${about.title} ${about.title_highlight || ''}`
                                    : 'Rental Mobil Makassar';
                                return (
                                    <div className="py-6 first:pt-0">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenAccordion(
                                                    isOpen ? null : 0,
                                                )
                                            }
                                            className="group flex w-full items-center justify-between gap-4 text-left focus:outline-none"
                                        >
                                            <h3
                                                className={`text-xl font-bold transition-colors duration-300 md:text-2xl ${
                                                    isOpen
                                                        ? 'text-[#E10102] dark:text-[#E10102]'
                                                        : 'text-gray-900 group-hover:text-[#E10102] dark:text-white dark:group-hover:text-[#E10102]'
                                                }`}
                                            >
                                                {title}
                                            </h3>
                                            <div
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                                                    isOpen
                                                        ? 'bg-black text-white'
                                                        : 'bg-[#E10102] text-white group-hover:bg-[#B40102]'
                                                }`}
                                            >
                                                {isOpen ? (
                                                    <Minus className="h-5 w-5" />
                                                ) : (
                                                    <Plus className="h-5 w-5" />
                                                )}
                                            </div>
                                        </button>

                                        {isOpen && (
                                            <div className="mt-4 pr-6 transition-all duration-300">
                                                <p className="text-sm leading-relaxed text-gray-600 md:text-base dark:text-white/70">
                                                    {about?.company_name && (
                                                        <strong className="font-bold text-gray-900 dark:text-white">
                                                            {
                                                                about.company_name
                                                            }{' '}
                                                        </strong>
                                                    )}
                                                    {about?.description ||
                                                        'Solusi rental mobil terpercaya di Makassar dengan armada lengkap dan pelayanan profesional.'}
                                                </p>
                                                <div className="mt-6">
                                                    <a
                                                        href={WA_LINK}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-2.5 text-sm font-semibold text-[#E10102] transition hover:text-[#B40102] dark:text-[#E10102] dark:hover:text-[#E10102]"
                                                    >
                                                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E10102]/40 dark:border-[#E10102]/40">
                                                            <ArrowUpRight className="h-4 w-4" />
                                                        </span>
                                                        {about?.button_text ||
                                                            'Hubungi Kami'}
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}

                            {/* Service / Feature Accordion Items from Database services_list */}
                            {(about?.services_list &&
                            about.services_list.length > 0
                                ? about.services_list
                                : SERVICES_LIST.map((item) => ({
                                      title: item,
                                      description: '',
                                  }))
                            ).map((item, idx) => {
                                const accordionIdx = idx + 1;
                                const isOpen = openAccordion === accordionIdx;
                                const itemTitle =
                                    typeof item === 'string'
                                        ? item
                                        : item.title;
                                const itemDesc =
                                    typeof item === 'string'
                                        ? 'Layanan unggulan dari Juragan Rental 47 yang dirancang untuk kenyamanan perjalanan Anda di Makassar dan sekitarnya.'
                                        : item.description ||
                                          'Layanan unggulan dari Juragan Rental 47 yang dirancang untuk kenyamanan perjalanan Anda.';

                                return (
                                    <div key={accordionIdx} className="py-6">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenAccordion(
                                                    isOpen
                                                        ? null
                                                        : accordionIdx,
                                                )
                                            }
                                            className="group flex w-full items-center justify-between gap-4 text-left focus:outline-none"
                                        >
                                            <h3
                                                className={`text-xl font-bold transition-colors duration-300 md:text-2xl ${
                                                    isOpen
                                                        ? 'text-[#E10102] dark:text-[#E10102]'
                                                        : 'text-gray-900 group-hover:text-[#E10102] dark:text-white dark:group-hover:text-[#E10102]'
                                                }`}
                                            >
                                                {itemTitle}
                                            </h3>
                                            <div
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                                                    isOpen
                                                        ? 'bg-black text-white'
                                                        : 'bg-[#E10102] text-white group-hover:bg-[#B40102]'
                                                }`}
                                            >
                                                {isOpen ? (
                                                    <Minus className="h-5 w-5" />
                                                ) : (
                                                    <Plus className="h-5 w-5" />
                                                )}
                                            </div>
                                        </button>

                                        {isOpen && (
                                            <div className="mt-4 pr-6 transition-all duration-300">
                                                <p className="text-sm leading-relaxed text-gray-600 md:text-base dark:text-white/70">
                                                    {itemDesc}
                                                </p>
                                                <div className="mt-6">
                                                    <a
                                                        href={WA_LINK}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-2.5 text-sm font-semibold text-[#E10102] transition hover:text-[#B40102] dark:text-[#E10102] dark:hover:text-[#E10102]"
                                                    >
                                                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E10102]/40 dark:border-[#E10102]/40">
                                                            <ArrowUpRight className="h-4 w-4" />
                                                        </span>
                                                        Konsultasi Layanan Ini
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ===== ARMADA ===== */}
            <section
                id="armada"
                className="scroll-mt-20 bg-[#f6f6f8] py-20 lg:py-32 dark:bg-[#0f0f15]"
            >
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
                        <p className="mb-3 text-sm font-semibold tracking-widest text-[#E10102] uppercase">
                            {armada?.section?.label || 'Pilihan Kendaraan'}
                        </p>
                        <h2 className="text-3xl font-black md:text-5xl">
                            {armada?.section?.title || 'Armada Kami'}
                        </h2>
                        <p className="mt-4 text-[16px] text-gray-500 dark:text-white/50">
                            {armada?.section?.subtitle ||
                                'Pilihan kendaraan nyaman untuk menemani perjalanan Anda.'}
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {displayArmada.map((unit, i) => (
                            <Reveal
                                key={unit.name}
                                delay={i * 100}
                                direction="zoom"
                                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#E10102]/30 hover:shadow-[0_20px_60px_-20px_rgba(225,1,2,0.2)] dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                            >
                                <div className="relative h-48 overflow-hidden bg-gradient-to-b from-gray-100 to-transparent dark:from-white/5">
                                    <img
                                        src={unit.image}
                                        alt={unit.name}
                                        loading="lazy"
                                        className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-110"
                                    />
                                </div>

                                <div className="p-5">
                                    <h3 className="text-sm leading-snug font-bold text-gray-900 dark:text-white">
                                        {unit.name}
                                    </h3>
                                    <p className="mt-1.5 text-xs text-gray-500 dark:text-white/40">
                                        {unit.capacity}
                                    </p>

                                    <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-4 dark:border-white/10">
                                        <div>
                                            <p className="text-[10px] font-medium tracking-wide text-gray-400 uppercase dark:text-white/30">
                                                Mulai dari
                                            </p>
                                            <p className="text-xl font-black text-[#E10102]">
                                                {unit.price}
                                                <span className="ml-0.5 text-[10px] font-medium text-gray-500 dark:text-white/40">
                                                    /hari
                                                </span>
                                            </p>
                                        </div>
                                        <a
                                            href={`/armada/${unit.slug}`}
                                            className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-100 p-2.5 text-gray-700 transition hover:bg-[#E10102] hover:text-white dark:bg-white/10 dark:text-white"
                                            aria-label={`Lihat Detail ${unit.name}`}
                                        >
                                            <ArrowRight className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== LAYANAN (PETRONAS Journey Cards Reference) ===== */}
            <section
                id="layanan"
                className="scroll-mt-20 bg-white py-16 lg:py-24 dark:bg-[#0a0a0f]"
            >
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    {/* Header with Title, Description, and View All CTA */}
                    <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <Reveal direction="left" className="max-w-2xl">
                            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
                                {layanan?.title
                                    ? `${layanan.title} ${layanan.title_highlight || ''}`
                                    : 'Layanan Utama Kami'}
                            </h2>
                            <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-white/60">
                                {layanan?.subtitle ||
                                    'Solusi kebutuhan transportasi terpercaya dengan armada berkualitas, sopir berpengalaman, dan harga kompetitif.'}
                            </p>
                        </Reveal>
                        <Reveal direction="right">
                            <a
                                href={WA_LINK}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2.5 rounded-full bg-[#E10102] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#B40102] hover:shadow-lg"
                            >
                                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/40">
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </span>
                                Hubungi CS
                            </a>
                        </Reveal>
                    </div>

                    {/* Cards Grid (PETRONAS 3-Card layout reference) */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {(() => {
                            // Combine services & features for rich cards data from DB
                            const cardItems =
                                services?.services_list &&
                                services.services_list.length > 0
                                    ? services.services_list
                                    : SERVICES.map((s) => ({
                                          title: s.title,
                                          description: s.description,
                                      }));

                            const defaultImages = [
                                `${ASSET}/2026/01/Hiace-commuter.webp`,
                                `${ASSET}/2025/10/Hiace-PREMIO-1-768x533.png`,
                                `${ASSET}/2025/09/innova-reborn2025-e1760086700141.png`,
                                `${ASSET}/2025/09/expander-768x513.webp`,
                                PILAR,
                                PP_WEB,
                            ];

                            const cardStyles = [
                                'from-[#E10102]/90 via-black/70 to-black/90',
                                'from-gray-900/90 via-gray-900/60 to-black/90',
                                'from-[#E10102]/90 via-black/85 to-black/90',
                                'from-gray-900 via-black/80 to-black/90',
                            ];

                            return cardItems.slice(0, 6).map((item, idx) => {
                                const cardImage =
                                    defaultImages[idx % defaultImages.length];
                                const gradientStyle =
                                    cardStyles[idx % cardStyles.length];

                                return (
                                    <Reveal
                                        key={item.title}
                                        delay={idx * 100}
                                        direction="up"
                                        className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[24px] shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                                    >
                                        {/* Full Background Image */}
                                        <img
                                            src={cardImage}
                                            alt={item.title}
                                            loading="lazy"
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Card Gradient Overlay Box at Bottom (PETRONAS style) */}
                                        <div
                                            className={`relative z-10 bg-gradient-to-t p-8 ${gradientStyle} transition-all duration-500 group-hover:p-9`}
                                        >
                                            <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
                                                {item.title}
                                            </h3>
                                            <p className="mt-3 line-clamp-3 text-sm leading-relaxed font-normal text-white/80">
                                                {item.description}
                                            </p>
                                        </div>
                                    </Reveal>
                                );
                            });
                        })()}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-20 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <Reveal>
                        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#E10102] to-[#B40102] px-6 py-16 text-center md:py-20">
                            <div className="absolute inset-0 opacity-10">
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage: `url(${PILAR})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                />
                            </div>
                            <div className="relative">
                                <h2 className="mx-auto max-w-2xl text-3xl leading-tight font-black text-white md:text-5xl">
                                    Siap Berangkat Bersama Kami?
                                </h2>
                                <p className="mx-auto mt-4 max-w-xl text-base text-white/80">
                                    Hubungi kami untuk mendapatkan informasi
                                    armada dan harga terbaik.
                                </p>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setBookingOpen(true);
                                    }}
                                    className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 text-base font-bold text-[#E10102] transition hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                                >
                                    Booking Sekarang
                                    <ArrowRight className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ===== GALERI (Pertamina Media Cards & Pill Filter Reference) ===== */}
            <section
                id="galeri"
                className="scroll-mt-20 bg-white py-16 lg:py-24 dark:bg-[#0a0a0f]"
            >
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    {/* Pill Filters Top Bar (Pertamina Blue Pill Filter Design) */}
                    <Reveal
                        direction="up"
                        className="mb-8 flex flex-wrap items-center gap-3"
                    >
                        {[
                            { key: 'Customer', label: 'Customer' },
                            { key: 'Armada', label: 'Armada' },
                        ].map((filter) => {
                            const active = galleryTab === filter.key;
                            return (
                                <button
                                    key={filter.key}
                                    type="button"
                                    onClick={() =>
                                        setGalleryTab(
                                            filter.key as 'Customer' | 'Armada',
                                        )
                                    }
                                    className={`rounded-full px-6 py-2.5 text-xs font-bold transition-all duration-300 ${
                                        active
                                            ? 'scale-105 bg-[#E10102] text-white shadow-md shadow-black/30'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/15'
                                    }`}
                                >
                                    {filter.label}
                                </button>
                            );
                        })}
                    </Reveal>

                    {/* Media Grid Cards Layout (Pertamina Layout: 1 Large Main Card on Left + 4 Smaller Grid Cards on Right) */}
                    {galleryData.length > 0 && (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                            {/* Main Featured Big Card (Left Side) */}
                            <Reveal
                                direction="left"
                                className="flex lg:col-span-6"
                            >
                                <div
                                    onClick={() => setLightboxIndex(0)}
                                    className="group relative flex h-full min-h-[420px] w-full cursor-pointer flex-col justify-end overflow-hidden rounded-[20px] bg-gray-800 shadow-xl transition-all duration-500 hover:shadow-2xl"
                                >
                                    <img
                                        src={galleryData[0]}
                                        alt={
                                            galleryTab === 'Customer'
                                                ? 'PRESS RELEASE'
                                                : 'CSR NEWS'
                                        }
                                        loading="lazy"
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                    <div className="relative z-10 p-8">
                                        <span className="text-[11px] font-extrabold tracking-widest text-white/90 uppercase">
                                            {galleryTab === 'Customer'
                                                ? 'PRESS RELEASE'
                                                : 'CSR NEWS'}
                                        </span>
                                        <h3 className="mt-2 text-2xl leading-snug font-black text-white md:text-3xl">
                                            {galleryTab === 'Customer'
                                                ? 'Dokumentasi Momen Pelanggan Setia Juragan Rental 47'
                                                : 'Armada Kelas Premium Siap Melayani Perjalanan Anda'}
                                        </h3>
                                        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-white/70">
                                            <CalendarDays className="h-4 w-4" />
                                            <span>10 September 2026</span>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* 4 Smaller Grid Cards (Right Side 2x2) */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-6">
                                {galleryData.slice(1, 5).map((src, idx) => {
                                    const realIndex = idx + 1;
                                    const titles =
                                        galleryTab === 'Customer'
                                            ? [
                                                  'Layanan Profesional Driver untuk Perjalanan Dinas & Wisata',
                                                  'Penjemputan Bandara Sultan Hasanuddin Tepat Waktu',
                                                  'Kenyamanan Armada Hiace & Innova Bagi Rombongan',
                                                  'Pengalaman Perjalanan Aman dan Menyenangkan',
                                              ]
                                            : [
                                                  'Toyota Hiace Premio VIP Class Full Karaoke & AC',
                                                  'Toyota Innova Reborn & Zenix Kebersihan Terjamin',
                                                  'Mitsubishi Xpander Nyaman untuk Perjalanan Keluarga',
                                                  'Perawatan Rutin Armada Berkala Juragan Rental 47',
                                              ];

                                    return (
                                        <Reveal
                                            key={realIndex}
                                            delay={idx * 80}
                                            direction="up"
                                            className="flex"
                                        >
                                            <div
                                                onClick={() =>
                                                    setLightboxIndex(realIndex)
                                                }
                                                className="group relative flex h-full min-h-[220px] w-full cursor-pointer flex-col justify-end overflow-hidden rounded-[20px] bg-gray-800 shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                                            >
                                                <img
                                                    src={src}
                                                    alt={
                                                        galleryTab ===
                                                        'Customer'
                                                            ? 'PRESS RELEASE'
                                                            : 'CSR NEWS'
                                                    }
                                                    loading="lazy"
                                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                                                <div className="relative z-10 p-5">
                                                    <span className="text-[10px] font-extrabold tracking-widest text-white/90 uppercase">
                                                        {galleryTab ===
                                                        'Customer'
                                                            ? 'PRESS RELEASE'
                                                            : 'CSR NEWS'}
                                                    </span>
                                                    <h4 className="mt-1.5 line-clamp-2 text-sm leading-snug font-bold text-white">
                                                        {
                                                            titles[
                                                                idx %
                                                                    titles.length
                                                            ]
                                                        }
                                                    </h4>
                                                    <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-white/70">
                                                        <CalendarDays className="h-3.5 w-3.5" />
                                                        <span>
                                                            {0 + (8 - idx)}{' '}
                                                            September 2026
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Reveal>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== MAP ===== */}
            <section className="bg-white dark:bg-[#0a0a0f]">
                <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
                    <Reveal className="mb-8 text-center">
                        <p className="mb-3 text-sm font-semibold tracking-widest text-[#E10102] uppercase">
                            Lokasi Kami
                        </p>
                        <h2 className="text-3xl font-black md:text-4xl">
                            Kantor Pusat
                        </h2>
                    </Reveal>
                    <Reveal>
                        <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10">
                            <iframe
                                src={MAP_EMBED}
                                title="Lokasi Kantor"
                                width="100%"
                                height="420"
                                style={{
                                    border: 0,
                                    filter: 'grayscale(0.6) contrast(1.1)',
                                }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer
                id="kontak"
                className="scroll-mt-20 border-t border-white/5 bg-[#08080c]"
            >
                <div className="mx-auto max-w-7xl px-5 pt-20 pb-10 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-4">
                        <div className="lg:col-span-1">
                            <img
                                src={LOGO}
                                alt="Juragan Rental"
                                className="mb-5 h-16 w-auto"
                            />
                            <p className="text-[14px] leading-relaxed text-white/40">
                                Jasa{' '}
                                <span className="font-semibold text-white/70">
                                    Rental Mobil Makassar
                                </span>{' '}
                                dan{' '}
                                <span className="font-semibold text-white/70">
                                    Pariwisata
                                </span>
                                . Murah, fasilitas lengkap, driver
                                berpengalaman.
                            </p>
                            <div className="mt-6 flex gap-3">
                                {SOCIALS.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.label}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-[#E10102] hover:bg-[#E10102] hover:text-white"
                                    >
                                        {social.type === 'tiktok' ? (
                                            <TiktokIcon className="h-4 w-4" />
                                        ) : social.Icon ? (
                                            <social.Icon className="h-4 w-4" />
                                        ) : (
                                            <TiktokIcon className="h-4 w-4" />
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="mb-5 text-base font-bold text-white">
                                Menu
                            </h4>
                            <ul className="space-y-3">
                                {NAV_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            className="text-[14px] text-white/40 transition hover:text-[#E10102]"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-5 text-base font-bold text-white">
                                Layanan
                            </h4>
                            <ul className="space-y-3">
                                {SERVICES.map((s) => (
                                    <li key={s.title}>
                                        <a
                                            href="#layanan"
                                            className="text-[14px] text-white/40 transition hover:text-[#E10102]"
                                        >
                                            {s.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-5 text-base font-bold text-white">
                                Kontak
                            </h4>
                            <ul className="space-y-4 text-[14px]">
                                <li className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#E10102]" />
                                    <a
                                        href={MAP_LINK}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="leading-relaxed text-white/40 transition hover:text-white"
                                    >
                                        {ADDRESS}
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#E10102]" />
                                    <a
                                        href={WA_LINK}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-white/40 transition hover:text-white"
                                    >
                                        WhatsApp · 0821-5193-9247
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#E10102]" />
                                    <a
                                        href={`mailto:${EMAIL}`}
                                        className="break-all text-white/40 transition hover:text-white"
                                    >
                                        {EMAIL}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-7 text-center md:flex-row md:text-left">
                        <p className="text-[13px] text-white/30">
                            Copyright © 2026 | Juragan Rental —
                            rentalmobilmakassarmurah.com
                        </p>
                        <p className="text-[13px] text-white/30">
                            Jumlah Pengunjung : 4,889
                        </p>
                    </div>

                    <p className="mt-6 border-t border-white/5 pt-6 text-center text-[12px] leading-relaxed text-white/20">
                        Keyword : {KEYWORDS}
                    </p>
                </div>
            </footer>

            {/* ===== FLOATING WHATSAPP ===== */}
            <div className="group fixed right-6 bottom-6 z-40 flex items-center gap-3">
                <span className="pointer-events-none hidden translate-x-2 rounded-full bg-[#0a0a0f] px-4 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
                    Hubungi Kami
                </span>
                <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Hubungi Kami"
                    className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#E10102] text-white shadow-lg transition hover:scale-105 hover:shadow-[0_0_30px_rgba(225,1,2,0.4)]"
                >
                    <WhatsAppIcon className="h-7 w-7" />
                </a>
            </div>

            {/* Scroll progress button */}
            <button
                type="button"
                onClick={handleScrollButton}
                className="group fixed right-6 bottom-24 z-40 flex h-[56px] w-[56px] items-center justify-center rounded-full border border-white/10 bg-[#0a0a0f]/80 text-white/60 shadow-lg backdrop-blur-sm transition hover:text-[#E10102]"
                aria-label={nearTop ? 'Scroll ke bawah' : 'Kembali ke atas'}
                title={nearTop ? 'Scroll ke bawah' : 'Kembali ke atas'}
            >
                <svg
                    className="absolute -inset-1 h-[64px] w-[64px] -rotate-90"
                    viewBox="0 0 64 64"
                    fill="none"
                    aria-hidden="true"
                >
                    <circle
                        cx="32"
                        cy="32"
                        r="29"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="4"
                    />
                    <circle
                        cx="32"
                        cy="32"
                        r="29"
                        stroke="#E10102"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={182.21}
                        strokeDashoffset={182.21 * (1 - scrollProgress / 100)}
                        className="transition-[stroke-dashoffset] duration-150 ease-out"
                    />
                </svg>
                <span className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#0a0a0f] transition group-hover:bg-[#0f0f15]">
                    {nearTop ? (
                        <ArrowDown className="h-6 w-6" />
                    ) : (
                        <ArrowUp className="h-6 w-6" />
                    )}
                </span>
            </button>

            {/* ===== BOOKING POPUP ===== */}
            {bookingOpen && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    onClick={() => setBookingOpen(false)}
                >
                    <div
                        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-[#141419] shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-6 pb-0">
                            <img
                                src={LOGO}
                                alt="Juragan Rental"
                                className="h-10 w-auto brightness-0 invert"
                            />
                            <button
                                type="button"
                                onClick={() => setBookingOpen(false)}
                                className="rounded-full p-2 text-white/40 hover:bg-white/10 hover:text-white"
                                aria-label="Tutup"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <h3 className="p-6 pb-0 text-2xl font-bold text-white">
                            Formulir Pemesanan
                        </h3>
                        <hr className="mx-6 my-4 border-white/10" />

                        <form
                            className="space-y-3 px-6 pb-6"
                            action={WA_LINK}
                            method="get"
                            target="_blank"
                        >
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-white/70">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Wajib*"
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#E10102] focus:ring-2 focus:ring-[#E10102]/20 focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-white/70">
                                        Telepon / Whatsapp
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Wajib*"
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#E10102] focus:ring-2 focus:ring-[#E10102]/20 focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-white/70">
                                    Alamat Pelanggan
                                </label>
                                <textarea
                                    rows={2}
                                    placeholder="Ketik alamat lengkap dan jelas"
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#E10102] focus:ring-2 focus:ring-[#E10102]/20 focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-white/70">
                                    Masukkan Email anda jika ingin menerima
                                    notifikasi pesanan
                                </label>
                                <input
                                    type="email"
                                    placeholder="(Optional)"
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#E10102] focus:ring-2 focus:ring-[#E10102]/20 focus:outline-none"
                                />
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-white/70">
                                        Layanan
                                    </label>
                                    <select
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#E10102] focus:ring-2 focus:ring-[#E10102]/20 focus:outline-none"
                                        required
                                    >
                                        <option
                                            value=""
                                            className="bg-[#141419]"
                                        >
                                            Pilih layanan
                                        </option>
                                        <option className="bg-[#141419]">
                                            Rental Mobil + Driver
                                        </option>
                                        <option className="bg-[#141419]">
                                            Rental Mobil + Driver + BBM
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-white/70">
                                        Unit Armada
                                    </label>
                                    <select
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#E10102] focus:ring-2 focus:ring-[#E10102]/20 focus:outline-none"
                                        required
                                    >
                                        <option
                                            value=""
                                            className="bg-[#141419]"
                                        >
                                            Pilih Unit Armada
                                        </option>
                                        {ARMADA_UNITS.map((unit) => (
                                            <option
                                                key={unit}
                                                className="bg-[#141419]"
                                            >
                                                {unit}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-white/70">
                                        Tanggal Booking
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#E10102] focus:ring-2 focus:ring-[#E10102]/20 focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-white/70">
                                        Berapa Hari?
                                    </label>
                                    <select
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#E10102] focus:ring-2 focus:ring-[#E10102]/20 focus:outline-none"
                                        required
                                    >
                                        <option
                                            value=""
                                            className="bg-[#141419]"
                                        >
                                            Pilih Hari
                                        </option>
                                        {[
                                            '1 Hari',
                                            '2 Hari',
                                            '3 Hari',
                                            '4 Hari',
                                            '5 Hari',
                                            '6 Hari',
                                            '7 Hari',
                                            '2 Minggu',
                                            '1 Bulan',
                                        ].map((d) => (
                                            <option
                                                key={d}
                                                className="bg-[#141419]"
                                            >
                                                {d}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-white/70">
                                    Lokasi Tujuan
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Ketik alamat tujuan dengan lengkap dan jelas"
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#E10102] focus:ring-2 focus:ring-[#E10102]/20 focus:outline-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E10102] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#B40102]"
                            >
                                <ArrowRight className="h-4 w-4" />
                                Pesan Sekarang
                            </button>
                            <p className="text-center text-xs text-white/30">
                                Data pemesanan akan diarahkan ke Whatsapp
                            </p>
                        </form>
                    </div>
                </div>
            )}

            {/* ===== LIGHTBOX ===== */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4 sm:p-8"
                    onClick={() => setLightboxIndex(null)}
                >
                    <button
                        type="button"
                        onClick={() => setLightboxIndex(null)}
                        className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/25"
                        aria-label="Tutup"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setLightboxIndex(
                                (lightboxIndex - 1 + galleryData.length) %
                                    galleryData.length,
                            );
                        }}
                        className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/25 sm:left-4"
                        aria-label="Sebelumnya"
                    >
                        <ChevronLeft className="h-7 w-7" />
                    </button>

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setLightboxIndex(
                                (lightboxIndex + 1) % galleryData.length,
                            );
                        }}
                        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/25 sm:right-4"
                        aria-label="Berikutnya"
                    >
                        <ChevronRight className="h-7 w-7" />
                    </button>

                    <img
                        src={galleryData[lightboxIndex]}
                        alt={galleryTab}
                        className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium text-white/60">
                        {lightboxIndex + 1} / {galleryData.length}
                    </p>
                </div>
            )}
        </div>
    );
}

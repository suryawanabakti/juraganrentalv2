import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Car,
    ChevronLeft,
    ChevronRight,
    Mail,
    MapPin,
    Phone,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import { SOCIAL_ICONS, WhatsAppIcon } from '@/lib/site-icons';
import { home } from '@/routes';
import armadaRoutes from '@/routes/armada';

type Social = { label: string; href: string; icon: string };

type Props = {
    title: string;
    canonical: string;
    site: {
        wa_number: string;
        email: string;
        address: string;
        keywords: string;
        map_link: string;
        logo: string;
        socials: Social[];
    };
    kontak: { intro: string; copyright: string; visitor_count: string };
    armada: {
        id: number;
        slug: string;
        name: string;
        image: string;
        capacity: string;
        price: string;
        sort_order: number;
        images: string[];
    };
};

export default function ArmadaShow({ title, canonical, site, kontak, armada }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);

    const waLink = `https://wa.me/${site.wa_number}`;
    const bookingMessage = `Halo Juragan Rental, saya ingin booking armada ${armada.name}.`;
    const bookingLink = `${waLink}?text=${encodeURIComponent(bookingMessage)}`;

    const canonicalUrl = `${canonical}${armadaRoutes.show(armada.slug).url}`;

    const allImages = [armada.image, ...armada.images].filter(Boolean);
    const activeImage = allImages[activeIndex] ?? armada.image;

    const goPrev = () =>
        setActiveIndex((i) => (i - 1 + allImages.length) % allImages.length);
    const goNext = () => setActiveIndex((i) => (i + 1) % allImages.length);

    return (
        <div
            className="min-h-screen bg-white text-[#222222] antialiased"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
            <Head title={title}>
                <meta name="description" content={site.keywords} />
                <meta name="keywords" content={site.keywords} />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:title" content={title} />
                <meta property="og:image" content={`${canonical}${armada.image}`} />
                <meta name="theme-color" content="#c8102e" />
            </Head>

            {/* ===== NAVBAR ===== */}
            <header className="sticky top-0 z-50 bg-white shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)]">
                <div className="mx-auto flex h-[80px] max-w-[1240px] items-center justify-between gap-6 px-5 lg:px-8">
                    <Link href={home()}>
                        <img
                            src={site.logo}
                            alt="Juragan Rental"
                            className="h-16 w-auto"
                        />
                    </Link>
                    <Link
                        href={home()}
                        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#222222] transition hover:bg-gray-50"
                    >
                        <ArrowLeft className="size-4" />
                        Kembali ke Beranda
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-[1240px] px-5 py-10 lg:px-8 lg:py-14">
                {/* Breadcrumb */}
                <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
                    <Link href={home()} className="transition hover:text-brand">
                        Beranda
                    </Link>
                    <span>/</span>
                    <span className="text-[#222222]">Armada</span>
                    <span>/</span>
                    <span className="font-medium text-brand">{armada.name}</span>
                </nav>

                <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
                    {/* Gallery */}
                    <div>
                        <div className="group relative overflow-hidden rounded-[28px] border border-gray-100 bg-[#F7F7F7] shadow-[0_18px_40px_-26px_rgba(0,0,0,0.35)]">
                            <img
                                src={activeImage}
                                alt={armada.name}
                                className="aspect-[4/3] w-full object-cover"
                            />
                            {allImages.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={goPrev}
                                        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow ring-1 ring-gray-200 transition hover:text-brand"
                                        aria-label="Sebelumnya"
                                    >
                                        <ChevronLeft className="size-5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={goNext}
                                        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow ring-1 ring-gray-200 transition hover:text-brand"
                                        aria-label="Berikutnya"
                                    >
                                        <ChevronRight className="size-5" />
                                    </button>
                                </>
                            )}
                        </div>

                        {allImages.length > 1 && (
                            <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5 lg:grid-cols-6">
                                {allImages.map((src, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setActiveIndex(i)}
                                        className={`overflow-hidden rounded-xl border-2 transition ${
                                            i === activeIndex
                                                ? 'border-brand'
                                                : 'border-transparent opacity-70 hover:opacity-100'
                                        }`}
                                    >
                                        <img
                                            src={src}
                                            alt={`${armada.name} ${i + 1}`}
                                            className="aspect-square w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand">
                            Armada Kami
                        </p>
                        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-black md:text-4xl">
                            {armada.name}
                        </h1>

                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-4 rounded-2xl bg-[#F7F7F7] px-5 py-4">
                                <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-brand text-white">
                                    <Users className="size-5" />
                                </span>
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-[#999999]">
                                        Kapasitas
                                    </p>
                                    <p className="font-semibold text-black">
                                        {armada.capacity}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 rounded-2xl bg-[#F7F7F7] px-5 py-4">
                                <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-brand text-white">
                                    <CalendarDays className="size-5" />
                                </span>
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-[#999999]">
                                        Harga Sewa
                                    </p>
                                    <p className="text-xl font-extrabold leading-none text-brand">
                                        {armada.price}
                                        <span className="ml-1 text-xs font-semibold text-[#777777]">
                                            /hari
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="mt-7 leading-relaxed text-[15px] text-[#555555]">
                            Armada {armada.name} tersedia untuk kebutuhan
                            perjalanan dalam kota, luar kota, antar jemput
                            bandara, hingga paket wisata. Kondisi kendaraan
                            terawat, bersih, dan siap menemani perjalanan Anda
                            bersama keluarga maupun tim perusahaan.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a
                                href={bookingLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-3 rounded-full bg-brand px-8 py-4 text-[15px] font-semibold text-white transition hover:bg-brand-dark"
                            >
                                <WhatsAppIcon className="size-5" />
                                Booking Sekarang
                            </a>
                            <a
                                href={`${waLink}?text=${encodeURIComponent(
                                    `Halo Juragan Rental, saya ingin menanyakan armada ${armada.name}.`,
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-3 rounded-full border border-gray-200 bg-white px-8 py-4 text-[15px] font-semibold text-[#222222] transition hover:bg-gray-50"
                            >
                                <ArrowRight className="size-5" />
                                Tanya Armada Lain
                            </a>
                        </div>

                        <div className="mt-9 border-t border-dashed border-gray-200 pt-6">
                            <h2 className="mb-3 text-base font-bold text-black">
                                Informasi Kontak
                            </h2>
                            <ul className="space-y-2.5 text-sm text-[#555555]">
                                <li className="flex items-center gap-3">
                                    <MapPin className="size-4 shrink-0 text-brand" />
                                    {site.address}
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone className="size-4 shrink-0 text-brand" />
                                    WhatsApp · {site.wa_number}
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail className="size-4 shrink-0 text-brand" />
                                    {site.email}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            {/* ===== FOOTER ===== */}
            <footer className="bg-[#111111] text-white">
                <div className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div className="flex items-center gap-4">
                            <img
                                src={site.logo}
                                alt="Juragan Rental"
                                className="h-12 w-auto"
                            />
                            <p className="max-w-md text-[13px] leading-relaxed text-white/60">
                                {kontak.intro}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            {site.socials.map((social) => {
                                const SocialIcon =
                                    SOCIAL_ICONS[social.icon] ?? WhatsAppIcon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.label}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-brand"
                                    >
                                        <SocialIcon className="size-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-[13px] text-white/60 md:flex-row md:text-left">
                        <p>{kontak.copyright}</p>
                        <p>Jumlah Pengunjung : {kontak.visitor_count}</p>
                    </div>
                </div>
            </footer>

            {/* Floating WhatsApp */}
            <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                aria-label="Hubungi Kami"
                className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg transition hover:scale-105 hover:bg-brand-dark"
            >
                <WhatsAppIcon className="size-7" />
            </a>
        </div>
    );
}
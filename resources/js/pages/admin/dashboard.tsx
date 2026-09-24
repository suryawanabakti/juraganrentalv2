import { Head, Link } from '@inertiajs/react';
import {
    ArrowUpRight,
    Car,
    Images,
    LayoutDashboard,
    Play,
    User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import admin from '@/routes/admin';

type RecentArmada = {
    id: number;
    name: string;
    image: string;
    price: string;
    updated_at: string;
};

type RecentGallery = {
    id: number;
    category: 'customer' | 'armada';
    type: 'image' | 'video' | 'youtube';
    image: string;
    thumbnail: string | null;
    updated_at: string;
};

type Props = {
    stats: {
        sections: number;
        armadas: number;
        galleries: number;
        customer_galleries: number;
        armada_galleries: number;
    };
    menu: Array<{
        slug: string;
        name: string;
        description: string;
    }>;
    recentArmadas: RecentArmada[];
    recentGalleries: RecentGallery[];
};

function galleryThumbnail(item: RecentGallery): string | null {
    if (item.type === 'image') return item.image;
    if (item.thumbnail) return item.thumbnail;
    if (item.type === 'youtube') {
        const match = item.image.match(
            /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
        );
        return match
            ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
            : null;
    }
    return null;
}

export default function AdminDashboard({
    stats,
    menu,
    recentArmadas,
    recentGalleries,
}: Props) {
    const statCards = [
        {
            label: 'Section Halaman',
            value: stats.sections,
            icon: LayoutDashboard,
            color: 'bg-brand/10 text-brand',
        },
        {
            label: 'Armada',
            value: stats.armadas,
            icon: Car,
            color: 'bg-foreground/10 text-foreground',
        },
        {
            label: 'Total Galeri',
            value: stats.galleries,
            icon: Images,
            color: 'bg-brand/10 text-brand',
        },
    ];

    return (
        <>
            <Head title="Admin Panel" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Admin Panel
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Kelola konten halaman utama Juragan Rental. Klik menu di
                        sidebar untuk mengedit setiap section.
                    </p>
                </div>

                {/* Stat Cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                    {statCards.map(({ label, value, icon: Icon, color }) => (
                        <Card key={label}>
                            <CardContent className="flex items-center gap-4 px-6">
                                <span
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
                                >
                                    <Icon className="size-6" />
                                </span>
                                <div>
                                    <p className="text-2xl font-bold">
                                        {value}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {label}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Recent Armada + Recent Gallery side by side */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Armada */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                            <div>
                                <CardTitle className="text-base">
                                    Armada Terbaru
                                </CardTitle>
                                <CardDescription>
                                    {stats.armadas} unit terdaftar
                                </CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={admin.armada.index()}>
                                    Lihat Semua
                                    <ArrowUpRight className="size-3.5" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {recentArmadas.length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-8 text-center text-muted-foreground">
                                    <Car className="mb-2 size-8" />
                                    <p className="text-sm">
                                        Belum ada data armada.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {recentArmadas.map((armada) => (
                                        <div
                                            key={armada.id}
                                            className="flex items-center gap-3 rounded-lg border p-3 transition hover:bg-muted/50"
                                        >
                                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                                                {armada.image ? (
                                                    <img
                                                        src={armada.image}
                                                        alt={armada.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                                        <Car className="size-5" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium">
                                                    {armada.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {armada.price}
                                                </p>
                                            </div>
                                            <span className="shrink-0 text-xs text-muted-foreground">
                                                {armada.updated_at}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Gallery */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                            <div>
                                <CardTitle className="text-base">
                                    Galeri Terbaru
                                </CardTitle>
                                <CardDescription>
                                    {stats.customer_galleries} customer ·{' '}
                                    {stats.armada_galleries} armada
                                </CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={admin.galeri.index()}>
                                    Lihat Semua
                                    <ArrowUpRight className="size-3.5" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {recentGalleries.length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-8 text-center text-muted-foreground">
                                    <Images className="mb-2 size-8" />
                                    <p className="text-sm">
                                        Belum ada konten galeri.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 gap-2">
                                    {recentGalleries.map((gallery) => (
                                        <div
                                            key={gallery.id}
                                            className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
                                        >
                                            {gallery.type === 'video' &&
                                            !galleryThumbnail(gallery) ? (
                                                <video
                                                    src={gallery.image}
                                                    muted
                                                    playsInline
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <img
                                                    src={
                                                        galleryThumbnail(
                                                            gallery,
                                                        ) ?? undefined
                                                    }
                                                    alt={gallery.category}
                                                    className="h-full w-full object-cover"
                                                />
                                            )}
                                            {gallery.type !== 'image' && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                                    <Play
                                                        className="size-4 text-white"
                                                        fill="currentColor"
                                                    />
                                                </div>
                                            )}
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5">
                                                <span className="text-[10px] font-medium text-white capitalize">
                                                    {gallery.category}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Section Menu */}
                <Card>
                    <CardHeader>
                        <CardTitle>Menu Section Halaman</CardTitle>
                        <CardDescription>
                            Pilih section untuk mengedit kontennya.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {menu.map((item) => (
                                <Link
                                    key={item.slug}
                                    href={admin.sections.edit(item.slug)}
                                    className="group flex flex-col justify-between rounded-xl border border-border p-4 transition hover:border-primary/50 hover:bg-muted/50"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">
                                            {item.name}
                                        </span>
                                        <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:text-primary" />
                                    </div>
                                    <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                                        {item.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="flex flex-col gap-3 sm:flex-row">
                    <Button variant="outline" asChild>
                        <Link href={admin.armada.index()}>
                            <Car className="size-4" />
                            Manajemen Armada
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href={admin.galeri.index()}>
                            <Images className="size-4" />
                            Manajemen Galeri
                        </Link>
                    </Button>
                </div>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Admin Panel',
            href: admin.index(),
        },
    ],
};

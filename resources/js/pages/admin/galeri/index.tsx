import { Head, Link, router } from '@inertiajs/react';
import {
    GripVertical,
    Images,
    Pencil,
    Play,
    Plus,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import admin from '@/routes/admin';

type GalleryType = 'image' | 'video' | 'youtube';
type GalleryCategory = 'customer' | 'armada';

type Gallery = {
    id: number;
    category: GalleryCategory;
    type: GalleryType;
    image: string;
    thumbnail: string | null;
    sort_order: number;
};

const CATEGORY_LABELS: Record<GalleryCategory, string> = {
    customer: 'Foto/Video Customer',
    armada: 'Foto/Video Armada',
};

const CATEGORY_TABS: Array<{ value: GalleryCategory | 'all'; label: string }> = [
    { value: 'all', label: 'Semua' },
    { value: 'customer', label: 'Customer' },
    { value: 'armada', label: 'Armada' },
];

const TYPE_LABELS: Record<GalleryType, string> = {
    image: 'Foto',
    video: 'Video',
    youtube: 'YouTube',
};

function youtubeVideoId(url: string): string | null {
    if (!url) return null;

    return (
        url.match(
            /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
        )?.[1] ?? null
    );
}

function resolveThumbnail(gallery: Gallery): string | null {
    if (gallery.type === 'image') return gallery.image;

    if (gallery.thumbnail) return gallery.thumbnail;

    if (gallery.type === 'youtube') {
        const id = youtubeVideoId(gallery.image);

        return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
    }

    return null;
}

export default function GaleriIndex({
    galleries,
    counts,
}: {
    galleries: Gallery[];
    counts: { customer: number; armada: number };
}) {
    const [items, setItems] = useState<Gallery[]>(galleries);
    const [deleting, setDeleting] = useState<Gallery | null>(null);
    const [dragging, setDragging] = useState<Gallery | null>(null);
    const [overId, setOverId] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<
        GalleryCategory | 'all'
    >('all');
    const [search, setSearch] = useState('');

    const visible = items.filter((gallery) => {
        if (activeCategory !== 'all' && gallery.category !== activeCategory) {
            return false;
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            const label =
                TYPE_LABELS[gallery.type] +
                ' ' +
                CATEGORY_LABELS[gallery.category];
            if (!label.toLowerCase().includes(q)) return false;
        }

        return true;
    });

    const grouped = visible.reduce<Record<string, Gallery[]>>(
        (acc, gallery) => {
            acc[gallery.category] ||= [];
            acc[gallery.category].push(gallery);
            return acc;
        },
        {},
    );

    const confirmDelete = () => {
        if (!deleting) return;
        router.delete(admin.galeri.destroy(deleting.id).url);
        setDeleting(null);
    };

    const handleDrop = (category: GalleryCategory, targetId: number) => {
        if (
            !dragging ||
            dragging.category !== category ||
            dragging.id === targetId
        ) {
            setDragging(null);
            setOverId(null);

            return;
        }

        const next = [...items];
        const from = next.findIndex((g) => g.id === dragging.id);
        const to = next.findIndex((g) => g.id === targetId);

        if (from === -1 || to === -1) {
            setDragging(null);
            setOverId(null);

            return;
        }

        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);

        const ids = next
            .filter((g) => g.category === category)
            .map((g) => g.id);

        setItems(next);
        setDragging(null);
        setOverId(null);

        router.post(admin.galeri.reorder().url, { category, ids });
    };

    return (
        <>
            <Head title="Manajemen Galeri" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Manajemen Galeri
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Kelola foto, video, dan link YouTube. Seret konten
                            untuk mengubah urutan.
                        </p>
                    </div>
                    <Button size="sm" asChild>
                        <Link href={admin.galeri.create()}>
                            <Plus className="size-4" />
                            Tambah Konten
                        </Link>
                    </Button>
                </div>

                {/* Filter tabs */}
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="inline-flex rounded-lg border border-border bg-muted/40 p-0.5">
                        {CATEGORY_TABS.map((tab) => {
                            const count =
                                tab.value === 'all'
                                    ? items.length
                                    : counts[tab.value];
                            const active = activeCategory === tab.value;

                            return (
                                <button
                                    key={tab.value}
                                    type="button"
                                    onClick={() =>
                                        setActiveCategory(tab.value)
                                    }
                                    className={cn(
                                        'rounded-md px-4 py-1.5 text-sm font-medium transition',
                                        active
                                            ? 'bg-background text-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground',
                                    )}
                                >
                                    {tab.label}
                                    <span className="ml-1.5 text-xs text-muted-foreground">
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    <div className="relative max-w-xs">
                        <Input
                            placeholder="Cari galeri..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-3"
                        />
                    </div>
                </div>

                {visible.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center text-muted-foreground">
                        <Images className="mb-2 size-10" />
                        <p>
                            {search
                                ? 'Tidak ada konten yang cocok dengan pencarian.'
                                : 'Belum ada konten galeri.'}
                        </p>
                    </div>
                )}

                {Object.entries(grouped).map(([category, group]) => (
                    <div key={category} className="space-y-3">
                        <div className="flex items-center gap-3">
                            <h2 className="text-lg font-semibold">
                                {
                                    CATEGORY_LABELS[
                                        category as GalleryCategory
                                    ]
                                }
                            </h2>
                            <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                {group.length}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                            {group.map((gallery) => {
                                const isOver = overId === gallery.id;
                                const isDragging =
                                    dragging?.id === gallery.id;

                                return (
                                    <Card
                                        key={gallery.id}
                                        draggable
                                        onDragStart={(e) => {
                                            e.dataTransfer.effectAllowed =
                                                'move';
                                            e.dataTransfer.setData(
                                                'text/plain',
                                                String(gallery.id),
                                            );
                                            setDragging(gallery);
                                        }}
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            e.dataTransfer.dropEffect = 'move';
                                            if (overId !== gallery.id) {
                                                setOverId(gallery.id);
                                            }
                                        }}
                                        onDragLeave={() => {
                                            if (overId === gallery.id) {
                                                setOverId(null);
                                            }
                                        }}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            handleDrop(
                                                gallery.category,
                                                gallery.id,
                                            );
                                        }}
                                        onDragEnd={() => {
                                            setDragging(null);
                                            setOverId(null);
                                        }}
                                        className={cn(
                                            'group relative cursor-grab overflow-hidden transition active:cursor-grabbing',
                                            isDragging && 'opacity-50',
                                            isOver &&
                                                'ring-2 ring-primary ring-offset-2',
                                        )}
                                    >
                                        <div className="absolute left-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-md bg-black/40 text-white opacity-0 transition group-hover:opacity-100">
                                            <GripVertical className="size-4" />
                                        </div>
                                        <div className="absolute right-2 top-2 z-10 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                                            {TYPE_LABELS[gallery.type]}
                                        </div>
                                        <div className="relative aspect-square bg-muted">
                                            {gallery.type === 'video' &&
                                            !resolveThumbnail(gallery) ? (
                                                <video
                                                    src={gallery.image}
                                                    muted
                                                    playsInline
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <>
                                                    <img
                                                        src={
                                                            resolveThumbnail(
                                                                gallery,
                                                            ) ?? undefined
                                                        }
                                                        alt={
                                                            CATEGORY_LABELS[
                                                                gallery.category
                                                            ]
                                                        }
                                                        className="h-full w-full object-cover"
                                                    />
                                                    {gallery.type !==
                                                        'image' && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand shadow">
                                                                <Play
                                                                    className="ml-0.5 size-5"
                                                                    fill="currentColor"
                                                                />
                                                            </span>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        <CardContent className="p-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-muted-foreground">
                                                    Urutan:{' '}
                                                    {gallery.sort_order}
                                                </span>
                                                <div className="flex gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={admin.galeri.edit(
                                                                gallery.id,
                                                            )}
                                                        >
                                                            <Pencil className="size-3.5" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-destructive"
                                                        onClick={() =>
                                                            setDeleting(
                                                                gallery,
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="size-3.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <Dialog
                    open={deleting !== null}
                    onOpenChange={(open) => {
                        if (!open) setDeleting(null);
                    }}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Hapus Konten Galeri</DialogTitle>
                            <DialogDescription>
                                Yakin ingin menghapus konten ini? Tindakan ini
                                tidak dapat dibatalkan.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setDeleting(null)}
                            >
                                Batal
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={confirmDelete}
                            >
                                Hapus
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

GaleriIndex.layout = {
    breadcrumbs: [
        {
            title: 'Admin Panel',
            href: admin.index(),
        },
        {
            title: 'Galeri',
            href: admin.galeri.index(),
        },
    ],
};
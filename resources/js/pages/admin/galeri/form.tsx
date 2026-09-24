import { Head, Link, setLayoutProps, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { ImageField } from '@/components/admin/image-field';
import { VideoField } from '@/components/admin/video-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import admin from '@/routes/admin';

type GalleryType = 'image' | 'video' | 'youtube';

type Props = {
    gallery: {
        id: number;
        category: 'customer' | 'armada';
        type: GalleryType;
        image: string;
        thumbnail: string | null;
        sort_order: number;
    } | null;
};

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

export default function GaleriForm({ gallery }: Props) {
    const isEditing = gallery !== null;

    setLayoutProps({
        breadcrumbs: [
            {
                title: 'Admin Panel',
                href: admin.index(),
            },
            {
                title: 'Galeri',
                href: admin.galeri.index(),
            },
            {
                title: isEditing ? 'Ubah Konten' : 'Tambah Konten',
                href: isEditing
                    ? admin.galeri.edit(gallery.id)
                    : admin.galeri.create(),
            },
        ],
    });

    const { data, setData, post, put, processing, errors } = useForm({
        category: gallery?.category ?? 'customer',
        type: gallery?.type ?? ('image' as GalleryType),
        image: gallery?.image ?? '',
        thumbnail: gallery?.thumbnail ?? '',
        sort_order: gallery?.sort_order ?? 0,
    });

    const youtubeId = data.type === 'youtube' ? youtubeVideoId(data.image) : null;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing) {
            put(admin.galeri.update(gallery.id).url);
        } else {
            post(admin.galeri.store().url);
        }
    };

    return (
        <>
            <Head title={isEditing ? 'Edit Galeri' : 'Tambah Galeri'} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        {isEditing ? 'Edit Galeri' : 'Tambah Galeri'}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Tambahkan atau perbarui konten galeri (foto, video, atau
                        link YouTube).
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="max-w-2xl space-y-5 rounded-xl border bg-background p-6"
                >
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="category">Kategori</Label>
                            <Select
                                value={data.category}
                                onValueChange={(value) =>
                                    setData(
                                        'category',
                                        value as 'customer' | 'armada',
                                    )
                                }
                            >
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Pilih kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="customer">
                                        Foto/Video Customer
                                    </SelectItem>
                                    <SelectItem value="armada">
                                        Foto/Video Armada
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.category && (
                                <p className="text-sm text-destructive">
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">Tipe Konten</Label>
                            <Select
                                value={data.type}
                                onValueChange={(value) =>
                                    setData('type', value as GalleryType)
                                }
                            >
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Pilih tipe" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(
                                        Object.keys(TYPE_LABELS) as GalleryType[]
                                    ).map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {TYPE_LABELS[type]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.type && (
                                <p className="text-sm text-destructive">
                                    {errors.type}
                                </p>
                            )}
                        </div>
                    </div>

                    {data.type === 'youtube' ? (
                        <div className="space-y-2">
                            <Label htmlFor="image">Link YouTube</Label>
                            <Input
                                id="image"
                                value={data.image}
                                onChange={(e) => setData('image', e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                            />
                            {errors.image && (
                                <p className="text-sm text-destructive">
                                    {errors.image}
                                </p>
                            )}
                            {youtubeId && (
                                <iframe
                                    src={`https://www.youtube.com/embed/${youtubeId}`}
                                    title="Pratinjau YouTube"
                                    className="aspect-video w-full max-w-sm rounded-lg border bg-muted"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            )}
                        </div>
                    ) : data.type === 'video' ? (
                        <VideoField
                            label="File Video"
                            value={data.image}
                            onChange={(value) => setData('image', value)}
                        />
                    ) : (
                        <ImageField
                            label="Gambar"
                            value={data.image}
                            onChange={(value) => setData('image', value)}
                        />
                    )}
                    {errors.image && data.type !== 'youtube' && (
                        <p className="text-sm text-destructive">
                            {errors.image}
                        </p>
                    )}

                    {data.type !== 'image' && (
                        <ImageField
                            label="Thumbnail (opsional)"
                            value={data.thumbnail}
                            onChange={(value) => setData('thumbnail', value)}
                            hint="Thumbnail yang tampil di galeri. Jika kosong untuk YouTube, thumbnail akan dibuat otomatis dari video."
                        />
                    )}
                    {errors.thumbnail && (
                        <p className="text-sm text-destructive">
                            {errors.thumbnail}
                        </p>
                    )}

                    <div className="max-w-[160px] space-y-2">
                        <Label htmlFor="sort_order">Urutan</Label>
                        <Input
                            id="sort_order"
                            type="number"
                            value={data.sort_order}
                            onChange={(e) =>
                                setData('sort_order', Number(e.target.value))
                            }
                        />
                        {errors.sort_order && (
                            <p className="text-sm text-destructive">
                                {errors.sort_order}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <Button type="submit" size="sm" disabled={processing}>
                            <Save className="size-4" />
                            {processing
                                ? 'Menyimpan...'
                                : isEditing
                                  ? 'Simpan Perubahan'
                                  : 'Tambahkan'}
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={admin.galeri.index()}>
                                <ArrowLeft className="size-4" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
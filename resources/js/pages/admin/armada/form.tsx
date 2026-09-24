import { Head, Link, setLayoutProps, useForm } from '@inertiajs/react';
import { ArrowLeft, Images, Plus, Save, X } from 'lucide-react';
import { ImageField } from '@/components/admin/image-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import admin from '@/routes/admin';

type Props = {
    armada: {
        id: number;
        name: string;
        image: string;
        capacity: string;
        price: string;
        sort_order: number;
        images: string[];
    } | null;
    maxSortOrder: number | null;
};

export default function ArmadaForm({ armada, maxSortOrder }: Props) {
    const isEditing = armada !== null;

    setLayoutProps({
        breadcrumbs: [
            {
                title: 'Admin Panel',
                href: admin.index(),
            },
            {
                title: 'Armada',
                href: admin.armada.index(),
            },
            {
                title: isEditing ? 'Ubah Armada' : 'Tambah Armada',
                href: isEditing
                    ? admin.armada.edit(armada.id)
                    : admin.armada.create(),
            },
        ],
    });

    const { data, setData, post, put, processing, errors } = useForm({
        name: armada?.name ?? '',
        image: armada?.image ?? '',
        images: armada?.images ?? [],
        capacity: armada?.capacity ?? '',
        price: armada?.price ?? '',
        sort_order: armada?.sort_order ?? maxSortOrder ?? 0,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing) {
            put(admin.armada.update(armada.id).url);
        } else {
            post(admin.armada.store().url);
        }
    };

    const updateImage = (index: number, value: string) => {
        setData(
            'images',
            data.images.map((image, i) => (i === index ? value : image)),
        );
    };

    const removeImage = (index: number) => {
        setData('images', data.images.filter((_, i) => i !== index));
    };

    const addImage = () => {
        setData('images', [...data.images, '']);
    };

    return (
        <>
            <Head title={isEditing ? 'Edit Armada' : 'Tambah Armada'} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        {isEditing ? 'Edit Armada' : 'Tambah Armada'}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Lengkapi data unit armada di bawah ini.
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="max-w-2xl space-y-5 rounded-xl border bg-background p-6"
                >
                    <ImageField
                        label="Foto Armada"
                        value={data.image}
                        onChange={(value) => setData('image', value)}
                    />
                    {errors.image && (
                        <p className="text-sm text-destructive">
                            {errors.image}
                        </p>
                    )}

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label className="font-medium">
                                Sub Gambar Armada
                            </Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addImage}
                            >
                                <Plus className="size-4" />
                                Tambah Gambar
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Tambahkan beberapa foto detail armada yang tampil di
                            halaman detail.
                        </p>

                        <div className="space-y-4">
                            {data.images.map((image, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm font-medium">
                                            Gambar {index + 1}
                                        </Label>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive h-7 px-2"
                                            onClick={() => removeImage(index)}
                                        >
                                            <X className="size-3.5" />
                                            Hapus
                                        </Button>
                                    </div>
                                    <ImageField
                                        label={`Gambar ${index + 1}`}
                                        value={image}
                                        hideHeader
                                        onChange={(value) =>
                                            updateImage(index, value)
                                        }
                                    />
                                </div>
                            ))}

                            {data.images.length === 0 && (
                                <div className="flex items-center gap-3 rounded-xl border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
                                    <Images className="size-5" />
                                    Belum ada sub gambar. Klik "Tambah Gambar"
                                    untuk menambahkan.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Nama Unit</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Contoh: Toyota Alphard"
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="capacity">Kapasitas</Label>
                            <Input
                                id="capacity"
                                value={data.capacity}
                                onChange={(e) =>
                                    setData('capacity', e.target.value)
                                }
                                placeholder="Contoh: 6 Orang"
                            />
                            {errors.capacity && (
                                <p className="text-sm text-destructive">
                                    {errors.capacity}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Harga</Label>
                            <Input
                                id="price"
                                value={data.price}
                                onChange={(e) =>
                                    setData('price', e.target.value)
                                }
                                placeholder="Contoh: Rp 1.500.000"
                            />
                            {errors.price && (
                                <p className="text-sm text-destructive">
                                    {errors.price}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sort_order">Urutan</Label>
                            <Input
                                id="sort_order"
                                type="number"
                                value={data.sort_order}
                                onChange={(e) =>
                                    setData(
                                        'sort_order',
                                        Number(e.target.value),
                                    )
                                }
                            />
                            {errors.sort_order && (
                                <p className="text-sm text-destructive">
                                    {errors.sort_order}
                                </p>
                            )}
                        </div>
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
                            <Link href={admin.armada.index()}>
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
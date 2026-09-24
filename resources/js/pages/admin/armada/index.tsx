import { Head, Link, router } from '@inertiajs/react';
import { Car, GripVertical, Pencil, Plus, Search, Trash2 } from 'lucide-react';
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

type Armada = {
    id: number;
    slug: string;
    name: string;
    image: string;
    capacity: string;
    price: string;
    sort_order: number;
    images_count: number;
};

export default function ArmadaIndex({ armadas }: { armadas: Armada[] }) {
    const [items, setItems] = useState<Armada[]>(armadas);
    const [deleting, setDeleting] = useState<Armada | null>(null);
    const [dragging, setDragging] = useState<Armada | null>(null);
    const [overId, setOverId] = useState<number | null>(null);
    const [search, setSearch] = useState('');

    const filtered = items.filter((armada) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();

        return (
            armada.name.toLowerCase().includes(q) ||
            armada.capacity.toLowerCase().includes(q) ||
            armada.price.toLowerCase().includes(q)
        );
    });

    const confirmDelete = () => {
        if (!deleting) return;
        router.delete(admin.armada.destroy(deleting.id).url);
        setDeleting(null);
    };

    const handleDrop = (targetId: number) => {
        if (!dragging || dragging.id === targetId) {
            setDragging(null);
            setOverId(null);

            return;
        }

        const next = [...items];
        const from = next.findIndex((a) => a.id === dragging.id);
        const to = next.findIndex((a) => a.id === targetId);

        if (from === -1 || to === -1) {
            setDragging(null);
            setOverId(null);

            return;
        }

        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);

        const ids = next.map((a) => a.id);

        setItems(next);
        setDragging(null);
        setOverId(null);

        router.post(admin.armada.reorder().url, { ids });
    };

    return (
        <>
            <Head title="Manajemen Armada" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Manajemen Armada
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Kelola daftar unit armada yang tampil di halaman
                            utama. Seret kartu untuk mengubah urutan.
                        </p>
                    </div>
                    <Button size="sm" asChild>
                        <Link href={admin.armada.create()}>
                            <Plus className="size-4" />
                            Tambah Armada
                        </Link>
                    </Button>
                </div>

                {/* Search */}
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Cari armada..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>

                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center text-muted-foreground">
                        <Car className="mb-2 size-10" />
                        <p>
                            {search
                                ? 'Tidak ada armada yang cocok dengan pencarian.'
                                : 'Belum ada data armada.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((armada) => {
                            const isOver = overId === armada.id;
                            const isDragging = dragging?.id === armada.id;

                            return (
                                <Card
                                    key={armada.id}
                                    draggable
                                    onDragStart={(e) => {
                                        e.dataTransfer.effectAllowed =
                                            'move';
                                        e.dataTransfer.setData(
                                            'text/plain',
                                            String(armada.id),
                                        );
                                        setDragging(armada);
                                    }}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        e.dataTransfer.dropEffect = 'move';
                                        if (overId !== armada.id) {
                                            setOverId(armada.id);
                                        }
                                    }}
                                    onDragLeave={() => {
                                        if (overId === armada.id) {
                                            setOverId(null);
                                        }
                                    }}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        handleDrop(armada.id);
                                    }}
                                    onDragEnd={() => {
                                        setDragging(null);
                                        setOverId(null);
                                    }}
                                    className={cn(
                                        'group overflow-hidden transition hover:shadow-md',
                                        isDragging && 'opacity-50',
                                        isOver &&
                                            'ring-2 ring-primary ring-offset-2',
                                    )}
                                >
                                    <div className="relative aspect-video bg-muted">
                                        {armada.image ? (
                                            <img
                                                src={armada.image}
                                                alt={armada.name}
                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                                <Car className="size-8" />
                                            </div>
                                        )}
                                        <div className="absolute left-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-md bg-black/40 text-white opacity-0 transition group-hover:opacity-100">
                                            <GripVertical className="size-4" />
                                        </div>
                                        <div className="absolute right-2 top-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                                            #{armada.sort_order}
                                        </div>
                                    </div>
                                <CardContent className="p-5">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0 flex-1">
                                            <CardTitle className="truncate text-lg">
                                                {armada.name}
                                            </CardTitle>
                                            <p className="mt-1 truncate text-sm text-muted-foreground">
                                                {armada.capacity}
                                            </p>
                                        </div>
                                        <span className="shrink-0 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                                            {armada.price}
                                        </span>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">
                                            {armada.images_count} sub gambar
                                        </span>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <Link
                                                    href={admin.armada.edit(
                                                        armada.id,
                                                    )}
                                                >
                                                    <Pencil className="size-3.5" />
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-destructive"
                                                onClick={() =>
                                                    setDeleting(armada)
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
                )}

                <Dialog
                    open={deleting !== null}
                    onOpenChange={(open) => {
                        if (!open) setDeleting(null);
                    }}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Hapus Armada</DialogTitle>
                            <DialogDescription>
                                Yakin ingin menghapus "{deleting?.name}"? Tindakan
                                ini tidak dapat dibatalkan.
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

ArmadaIndex.layout = {
    breadcrumbs: [
        {
            title: 'Admin Panel',
            href: admin.index(),
        },
        {
            title: 'Armada',
            href: admin.armada.index(),
        },
    ],
};

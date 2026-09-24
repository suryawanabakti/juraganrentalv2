import { Loader2, Video, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import admin from '@/routes/admin';

function getCsrfToken(): string {
    const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]*)/);

    return match ? decodeURIComponent(match[1]) : '';
}

export function VideoField({
    value,
    onChange,
    label,
    hint,
    hideHeader = false,
}: {
    value: string;
    onChange: (value: string) => void;
    label: string;
    hint?: string;
    hideHeader?: boolean;
}) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (file: File | undefined) => {
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        try {
            const response = await fetch(admin.media.store.url(), {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json',
                    'X-XSRF-TOKEN': getCsrfToken(),
                },
            });
            const result = (await response.json()) as { url?: string };

            if (response.ok && result.url) {
                onChange(result.url);
            } else {
                console.error('Upload gagal', result);
            }
        } catch (error) {
            console.error('Upload gagal', error);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            {!hideHeader && (
                <div className="flex items-center justify-between">
                    <Label className="font-medium">{label}</Label>
                    {value ? (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-destructive h-7 px-2"
                            onClick={() => onChange('')}
                        >
                            <X className="size-3.5" />
                            Hapus
                        </Button>
                    ) : null}
                </div>
            )}

            {value && (
                <div className="relative w-fit overflow-hidden rounded-lg border border-border bg-black">
                    <video
                        src={value}
                        controls
                        playsInline
                        preload="metadata"
                        className="h-32 w-52 object-cover"
                    />
                </div>
            )}

            <div className="flex gap-2">
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="/uploads/... atau https://..."
                    className="h-9 text-sm"
                />
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*,.mp4,.webm,.mov,.m4v,.ogv"
                    className="hidden"
                    onChange={(e) => handleUpload(e.target.files?.[0])}
                />
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                >
                    {uploading ? (
                        <Loader2 className="size-4 animate-spin" />
                    ) : (
                        <Video className="size-4" />
                    )}
                    Upload
                </Button>
            </div>

            {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
    );
}

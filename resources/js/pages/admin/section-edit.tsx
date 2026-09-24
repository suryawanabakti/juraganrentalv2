import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import { ArrowLeft, Check, GripVertical, Plus, Trash2 } from 'lucide-react';
import { ImageField } from '@/components/admin/image-field';
import { VideoField } from '@/components/admin/video-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ICON_MAP } from '@/lib/site-icons';
import admin from '@/routes/admin';

type Field = {
    key: string;
    label: string;
    type:
        | 'text'
        | 'textarea'
        | 'image'
        | 'image-list'
        | 'list'
        | 'repeater'
        | 'icon'
        | 'video';
    hint?: string;
    fields?: Field[];
};

type Props = {
    section: {
        slug: string;
        name: string;
        data: Record<string, unknown>;
    };
    fields: Field[];
    description?: string;
};

type FormValue = string | string[] | Array<Record<string, string>>;

type FormData = Record<string, FormValue>;

function TextInput({
    field,
    value,
    onChange,
}: {
    field: Field;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div className="space-y-2">
            <Label>{field.label}</Label>
            <Input value={value} onChange={(e) => onChange(e.target.value)} />
            {field.hint && (
                <p className="text-muted-foreground text-xs">{field.hint}</p>
            )}
        </div>
    );
}

function TextAreaInput({
    field,
    value,
    onChange,
}: {
    field: Field;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div className="space-y-2">
            <Label>{field.label}</Label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={4}
                className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
            {field.hint && (
                <p className="text-muted-foreground text-xs">{field.hint}</p>
            )}
        </div>
    );
}

function IconSelect({
    field,
    value,
    onChange,
}: {
    field: Field;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div className="space-y-2">
            <Label>{field.label}</Label>
            <div className="flex flex-wrap gap-2">
                {Object.entries(ICON_MAP).map(([key, Icon]) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => onChange(key)}
                        className={`flex h-9 w-9 items-center justify-center rounded-md border transition ${
                            value === key
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border text-muted-foreground hover:border-primary/50'
                        }`}
                        title={key}
                    >
                        <Icon className="size-4" />
                    </button>
                ))}
            </div>
            {field.hint && (
                <p className="text-muted-foreground text-xs">{field.hint}</p>
            )}
        </div>
    );
}

function ListEditor({
    field,
    value,
    onChange,
}: {
    field: Field;
    value: string[];
    onChange: (value: string[]) => void;
}) {
    const items = Array.isArray(value) ? value : [];

    const update = (index: number, next: string) => {
        const copy = [...items];
        copy[index] = next;
        onChange(copy);
    };

    return (
        <div className="space-y-3">
            <Label>{field.label}</Label>
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <Input
                        value={item}
                        onChange={(e) => update(index, e.target.value)}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="shrink-0"
                        onClick={() =>
                            onChange(items.filter((_, i) => i !== index))
                        }
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            ))}
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onChange([...items, ''])}
            >
                <Plus className="size-4" />
                Tambah
            </Button>
        </div>
    );
}

function RepeaterEditor({
    field,
    value,
    onChange,
}: {
    field: Field;
    value: Array<Record<string, string>>;
    onChange: (value: Array<Record<string, string>>) => void;
}) {
    const items = Array.isArray(value) ? value : [];

    // Coerce legacy plain-string rows (e.g. lists that were promoted to repeaters)
    // into the repeater's object shape so they stay editable.
    const asObject = (item: unknown): Record<string, string> =>
        typeof item === 'string'
            ? Object.fromEntries(
                  (field.fields ?? []).map((sub, i) => [
                      sub.key,
                      i === 0 ? item : '',
                  ]),
              )
            : { ...(item as Record<string, string>) };

    const updateItem = (index: number, key: string, next: string) => {
        const copy = items.map(asObject);
        copy[index][key] = next;
        onChange(copy);
    };

    const subField = (
        sub: Field,
        item: Record<string, string>,
        index: number,
    ) => {
        const key = sub.key;
        const set = (next: string) => updateItem(index, key, next);

        switch (sub.type) {
            case 'textarea':
                return (
                    <TextAreaInput
                        field={sub}
                        value={item[key] ?? ''}
                        onChange={set}
                    />
                );
            case 'icon':
                return (
                    <IconSelect
                        field={sub}
                        value={item[key] ?? ''}
                        onChange={set}
                    />
                );
            case 'image':
                return (
                    <ImageField
                        label={sub.label}
                        hint={sub.hint}
                        value={item[key] ?? ''}
                        onChange={set}
                    />
                );
            case 'video':
                return (
                    <VideoField
                        label={sub.label}
                        hint={sub.hint}
                        value={item[key] ?? ''}
                        onChange={set}
                    />
                );
            default:
                return (
                    <TextInput
                        field={sub}
                        value={item[key] ?? ''}
                        onChange={set}
                    />
                );
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <Label>{field.label}</Label>
                {field.hint && (
                    <p className="text-muted-foreground mt-1 text-xs">
                        {field.hint}
                    </p>
                )}
            </div>
            {items.map((item, index) => {
                const row = asObject(item);

                return (
                    <div
                        key={index}
                        className="border-border bg-muted/30 grid gap-4 rounded-lg border p-4 sm:grid-cols-2"
                    >
                        <div className="flex items-center gap-2 sm:col-span-2">
                            <GripVertical className="text-muted-foreground size-4" />
                            <span className="text-sm font-medium">
                                {index + 1}
                            </span>
                            <span className="flex-1" />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() =>
                                    onChange(
                                        items.filter((_, i) => i !== index),
                                    )
                                }
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        </div>
                        {field.fields?.map((sub) => (
                            <div key={sub.key} className="contents">
                                {subField(sub, row, index)}
                            </div>
                        ))}
                    </div>
                );
            })}
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                    onChange([
                        ...items.map(asObject),
                        Object.fromEntries(
                            (field.fields ?? []).map((sub) => [
                                sub.key,
                                sub.type === 'textarea' ? '' : '',
                            ]),
                        ),
                    ])
                }
            >
                <Plus className="size-4" />
                Tambah Item
            </Button>
        </div>
    );
}

function ImageListEditor({
    field,
    value,
    onChange,
}: {
    field: Field;
    value: string[];
    onChange: (value: string[]) => void;
}) {
    const items = Array.isArray(value) ? value : [];

    return (
        <div className="space-y-4">
            <Label>{field.label}</Label>
            {items.map((item, index) => (
                <ImageField
                    key={index}
                    label={`Gambar ${index + 1}`}
                    value={item}
                    onChange={(next) => {
                        const copy = [...items];
                        copy[index] = next;
                        onChange(copy);
                    }}
                />
            ))}
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onChange([...items, ''])}
            >
                <Plus className="size-4" />
                Tambah Gambar
            </Button>
        </div>
    );
}

export default function SectionEdit({ section, fields, description }: Props) {
    setLayoutProps({
        breadcrumbs: [
            {
                title: 'Admin Panel',
                href: admin.index(),
            },
            {
                title: section.name,
                href: admin.sections.edit(section.slug),
            },
        ],
    });

    const { data, setData, put, processing } = useForm<FormData>({
        ...(section.data as FormData),
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(admin.sections.update(section.slug).url);
    };

    const renderField = (field: Field) => {
        const set = (next: unknown) =>
            setData(
                field.key as keyof FormData,
                next as FormData[keyof FormData],
            );
        const value = data[field.key];

        switch (field.type) {
            case 'textarea':
                return (
                    <TextAreaInput
                        field={field}
                        value={(value as string) ?? ''}
                        onChange={set}
                    />
                );
            case 'image':
                return (
                    <ImageField
                        label={field.label}
                        hint={field.hint}
                        value={(value as string) ?? ''}
                        onChange={set}
                    />
                );
            case 'image-list':
                return (
                    <ImageListEditor
                        field={field}
                        value={(value as string[]) ?? []}
                        onChange={set}
                    />
                );
            case 'video':
                return (
                    <VideoField
                        label={field.label}
                        hint={field.hint}
                        value={(value as string) ?? ''}
                        onChange={set}
                    />
                );
            case 'list':
                return (
                    <ListEditor
                        field={field}
                        value={(value as string[]) ?? []}
                        onChange={set}
                    />
                );
            case 'repeater':
                return (
                    <RepeaterEditor
                        field={field}
                        value={(value as Array<Record<string, string>>) ?? []}
                        onChange={set}
                    />
                );
            default:
                return (
                    <TextInput
                        field={field}
                        value={(value as string) ?? ''}
                        onChange={set}
                    />
                );
        }
    };

    return (
        <>
            <Head title={section.name} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {section.name}
                        </h1>
                        {description && (
                            <p className="text-muted-foreground mt-1 max-w-xl text-sm">
                                {description}
                            </p>
                        )}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                        <a href="/" target="_blank" rel="noreferrer">
                            Lihat Halaman
                        </a>
                    </Button>
                </div>

                <form onSubmit={submit} className="flex flex-col gap-6">
                    <div className="grid gap-6">
                        {fields.map((field) => (
                            <div
                                key={field.key}
                                className="bg-background rounded-xl border p-5"
                            >
                                {renderField(field)}
                            </div>
                        ))}
                    </div>

                    <div className="bg-background/95 sticky bottom-4 flex items-center justify-end gap-3 rounded-xl border p-3 shadow-sm backdrop-blur">
                        <Button variant="ghost" size="sm" asChild>
                            <a href={admin.index().url}>
                                <ArrowLeft className="size-4" />
                                Kembali
                            </a>
                        </Button>
                        <Button type="submit" size="sm" disabled={processing}>
                            <Check className="size-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

import * as React from 'react';
import {CircleAlert, Check, FileText, Upload, X} from 'lucide-react';

import {cn} from '@/lib/utils';
import {Spinner} from '@/components/ui/spinner';
import {Text} from '@/components/ui/text';

/**
 * FileUpload / FileItem Mistica: area de arrastar-e-soltar (tokens
 * backgroundDropZone*) + itens de arquivo com status.
 */
export function formatarTamanho(bytes: number): string {
    if (bytes < 1024) {
        return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(0)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type FileUploadProps = {
    /** Texto principal da area. */
    label?: string;
    /** Texto auxiliar (formatos aceitos, tamanho maximo...). */
    helperText?: string;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    onFilesSelected: (files: Array<File>) => void;
    className?: string;
};

function FileUpload({
    label = 'Arraste arquivos aqui ou clique para escolher',
    helperText,
    accept,
    multiple = false,
    disabled,
    onFilesSelected,
    className,
}: FileUploadProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [arrastando, setArrastando] = React.useState(false);

    const receber = (lista: FileList | null) => {
        if (!lista || lista.length === 0) {
            return;
        }
        onFilesSelected(multiple ? [...lista] : [lista[0]]);
    };

    return (
        <div data-slot="file-upload" className={cn('w-full', disabled && 'pointer-events-none opacity-50', className)}>
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => {
                    e.preventDefault();
                    setArrastando(true);
                }}
                onDragLeave={() => setArrastando(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setArrastando(false);
                    receber(e.dataTransfer.files);
                }}
                className={cn(
                    'flex w-full cursor-pointer flex-col items-center gap-2 rounded-mistica-container border-2 border-dashed px-6 py-8 text-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-mistica-control-activated',
                    arrastando
                        ? 'border-mistica-control-activated bg-mistica-background-drop-zone-dragover'
                        : 'border-mistica-border bg-mistica-background-container hover:bg-mistica-background-drop-zone-hover'
                )}
            >
                <div className="flex size-12 items-center justify-center rounded-full bg-mistica-brand-low">
                    <Upload className="size-6 text-mistica-control-activated" aria-hidden />
                </div>
                <Text preset="text2" weight="medium">
                    {label}
                </Text>
                {helperText ? (
                    <Text preset="text1" color="secondary">
                        {helperText}
                    </Text>
                ) : null}
            </button>
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                className="hidden"
                onChange={(e) => {
                    receber(e.target.files);
                    e.target.value = '';
                }}
            />
        </div>
    );
}

type FileItemProps = {
    name: string;
    /** Tamanho em bytes (formatado automaticamente). */
    size?: number;
    status?: 'uploading' | 'done' | 'error';
    errorText?: string;
    onRemove?: () => void;
    className?: string;
};

function FileItem({name, size, status = 'done', errorText, onRemove, className}: FileItemProps) {
    return (
        <div
            data-slot="file-item"
            className={cn(
                'flex items-center gap-3 rounded-mistica-media-small border border-mistica-border bg-mistica-background-container px-4 py-3',
                className
            )}
        >
            <FileText className="size-5 shrink-0 text-mistica-neutral-medium" aria-hidden />
            <div className="min-w-0 flex-1">
                <Text as="div" preset="text2" weight="medium" className="truncate">
                    {name}
                </Text>
                <Text as="div" preset="text1" color={status === 'error' ? 'error' : 'secondary'}>
                    {status === 'error' ? (errorText ?? 'Falha no envio') : size !== undefined ? formatarTamanho(size) : ''}
                </Text>
            </div>
            {status === 'uploading' ? <Spinner size={20} /> : null}
            {status === 'done' ? <Check className="size-5 text-mistica-success-high" aria-hidden /> : null}
            {status === 'error' ? <CircleAlert className="size-5 text-mistica-error-high" aria-hidden /> : null}
            {onRemove ? (
                <button
                    type="button"
                    aria-label={`Remover ${name}`}
                    onClick={onRemove}
                    className="cursor-pointer rounded-full p-1.5 text-mistica-neutral-medium outline-none hover:bg-mistica-background-container-hover hover:text-mistica-text-primary focus-visible:ring-2 focus-visible:ring-mistica-control-activated"
                >
                    <X className="size-4" />
                </button>
            ) : null}
        </div>
    );
}

export {FileUpload, FileItem};

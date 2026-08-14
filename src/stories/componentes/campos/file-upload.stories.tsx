import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {FileItem, FileUpload} from '@/components/mistica';

/**
 * `FileUpload` do Mistica: área de arrastar-e-soltar (ou clique para
 * escolher) que entrega os arquivos via `onFilesSelected`. `FileItem`
 * mostra cada arquivo com status `uploading`, `done` ou `error`.
 */
const meta = {
    title: 'Componentes/Campos/FileUpload',
    component: FileUpload,
    args: {
        onFilesSelected: fn(),
        helperText: 'PDF ou imagem até 2 MB',
        multiple: false,
        disabled: false,
    },
    argTypes: {
        label: {control: 'text', description: 'Texto principal da área'},
        helperText: {control: 'text', description: 'Texto auxiliar (formatos, tamanho máximo...)'},
        accept: {control: 'text', description: 'Tipos aceitos (atributo accept do input)'},
        multiple: {control: 'boolean', description: 'Permite vários arquivos'},
        disabled: {control: 'boolean'},
    },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const Multiplo: Story = {
    name: 'Múltiplos arquivos',
    args: {
        multiple: true,
        label: 'Envie os comprovantes da portabilidade',
        accept: '.pdf,image/*',
    },
};

export const Desabilitado: Story = {
    args: {
        disabled: true,
    },
};

export const ItensDeArquivo: Story = {
    name: 'FileItem (status)',
    render: () => (
        <div className="grid max-w-lg gap-3">
            <FileItem name="fatura-julho.pdf" size={182_000} status="done" onRemove={fn()} />
            <FileItem name="comprovante-endereco.pdf" size={245_000} status="uploading" />
            <FileItem
                name="video-reclamacao.mp4"
                size={8_400_000}
                status="error"
                errorText="Arquivo acima de 2 MB"
                onRemove={fn()}
            />
        </div>
    ),
};

export const FluxoCompleto: Story = {
    name: 'Fluxo completo',
    render: function Render(args) {
        type Arquivo = {nome: string; tamanho: number; status: 'uploading' | 'done' | 'error'};
        const [arquivos, setArquivos] = React.useState<Array<Arquivo>>([
            {nome: 'comprovante-endereco.pdf', tamanho: 245_000, status: 'done'},
        ]);

        const receber = (files: Array<File>) => {
            for (const file of files) {
                setArquivos((a) => [...a, {nome: file.name, tamanho: file.size, status: 'uploading'}]);
                setTimeout(() => {
                    setArquivos((a) =>
                        a.map((item) =>
                            item.nome === file.name && item.status === 'uploading'
                                ? {...item, status: file.size > 2_000_000 ? 'error' : 'done'}
                                : item
                        )
                    );
                }, 1500);
            }
        };

        return (
            <div className="grid max-w-lg gap-3">
                <FileUpload
                    {...args}
                    multiple
                    helperText="PDF ou imagem até 2 MB (maiores simulam erro)"
                    onFilesSelected={receber}
                />
                {arquivos.map((arquivo) => (
                    <FileItem
                        key={arquivo.nome}
                        name={arquivo.nome}
                        size={arquivo.tamanho}
                        status={arquivo.status}
                        errorText="Arquivo acima de 2 MB"
                        onRemove={() => setArquivos((a) => a.filter((x) => x.nome !== arquivo.nome))}
                    />
                ))}
            </div>
        );
    },
};

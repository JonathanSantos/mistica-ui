import * as React from 'react';
import {Check, CircleAlert, Info} from 'lucide-react';

import {cn} from '@/lib/utils';
import {Text} from '@/components/ui/text';
import {ThemeVariant} from '@/components/ui/theme-variant';

/**
 * FeedbackScreen Mistica: tela de resultado com icone, titulo, descricao
 * e acoes fixas embaixo. No skin vivo o sucesso e "inverse" (themeVariant
 * successFeedback = inverse): fundo brand com textos/botoes invertidos.
 * Paddings do token feedbackScreenPadding (64 topo, 16/64 laterais).
 */
type FeedbackScreenProps = {
    type: 'success' | 'error' | 'info';
    title: string;
    description?: string;
    /** Como no Mistica: ButtonPrimary/Secondary/Link prontos. No sucesso,
     * o ThemeVariant inverse os estiliza automaticamente. */
    primaryButton?: React.ReactNode;
    secondaryButton?: React.ReactNode;
    link?: React.ReactNode;
    className?: string;
};

function FeedbackScreen({
    type,
    title,
    description,
    primaryButton,
    secondaryButton,
    link,
    className,
}: FeedbackScreenProps) {
    const inverse = type === 'success';

    const icon =
        type === 'success' ? (
            <div className="flex size-16 animate-in items-center justify-center rounded-full border-2 border-current duration-500 fade-in zoom-in-50">
                <Check
                    className="size-8 animate-check-draw [stroke-dasharray:48] [stroke-dashoffset:48]"
                    strokeWidth={2.5}
                    aria-hidden
                />
            </div>
        ) : type === 'error' ? (
            <CircleAlert
                className="size-16 animate-in text-mistica-error-high duration-500 fade-in zoom-in-50"
                strokeWidth={1.5}
                aria-hidden
            />
        ) : (
            <Info
                className="size-16 animate-in text-mistica-control-activated duration-500 fade-in zoom-in-50"
                strokeWidth={1.5}
                aria-hidden
            />
        );

    return (
        <div
            data-slot="feedback-screen"
            role="status"
            className={cn(
                'flex min-h-[480px] flex-col px-4 pt-16 pb-4 lg:px-16 lg:pb-16',
                inverse
                    ? 'bg-mistica-background-brand text-mistica-text-primary-inverse'
                    : 'bg-mistica-background text-mistica-text-primary',
                className
            )}
        >
            <div className="grid max-w-md gap-4">
                {icon}
                <Text as="h1" preset="text6" color={inverse ? 'inverse' : 'primary'} className="mt-2">
                    {title}
                </Text>
                {description ? (
                    <Text
                        preset="text3"
                        className={inverse ? 'text-mistica-text-secondary-inverse' : 'text-mistica-text-secondary'}
                    >
                        {description}
                    </Text>
                ) : null}
            </div>
            {primaryButton || secondaryButton || link ? (
                <ThemeVariant variant={inverse ? 'inverse' : 'default'} className="mt-auto pt-10">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        {primaryButton}
                        {secondaryButton}
                        {link}
                    </div>
                </ThemeVariant>
            ) : null}
        </div>
    );
}

type NamedFeedbackProps = Omit<FeedbackScreenProps, 'type'>;

/** Como no Mistica original. */
function SuccessFeedbackScreen(props: NamedFeedbackProps) {
    return <FeedbackScreen type="success" {...props} />;
}

function ErrorFeedbackScreen(props: NamedFeedbackProps) {
    return <FeedbackScreen type="error" {...props} />;
}

function InfoFeedbackScreen(props: NamedFeedbackProps) {
    return <FeedbackScreen type="info" {...props} />;
}

export {FeedbackScreen, SuccessFeedbackScreen, ErrorFeedbackScreen, InfoFeedbackScreen};

import {Check, CircleAlert, Info} from 'lucide-react';

import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {Text} from '@/components/ui/text';

/**
 * FeedbackScreen Mistica: tela de resultado com icone, titulo, descricao
 * e acoes fixas embaixo. No skin vivo o sucesso e "inverse" (themeVariant
 * successFeedback = inverse): fundo brand com textos/botoes invertidos.
 * Paddings do token feedbackScreenPadding (64 topo, 16/64 laterais).
 */
type FeedbackAction = {
    text: string;
    onPress?: () => void;
};

type FeedbackScreenProps = {
    type: 'success' | 'error' | 'info';
    title: string;
    description?: string;
    primaryAction?: FeedbackAction;
    secondaryAction?: FeedbackAction;
    className?: string;
};

function FeedbackScreen({type, title, description, primaryAction, secondaryAction, className}: FeedbackScreenProps) {
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
            {primaryAction || secondaryAction ? (
                <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row">
                    {primaryAction ? (
                        <Button
                            onClick={primaryAction.onPress}
                            className={cn(
                                inverse &&
                                    'bg-mistica-button-primary-background-inverse text-mistica-text-button-primary-inverse hover:bg-mistica-button-primary-background-inverse-hover active:bg-mistica-button-primary-background-inverse-pressed'
                            )}
                        >
                            {primaryAction.text}
                        </Button>
                    ) : null}
                    {secondaryAction ? (
                        <Button
                            variant="secondary"
                            onClick={secondaryAction.onPress}
                            className={cn(
                                inverse &&
                                    'border-mistica-button-secondary-border-inverse text-mistica-text-button-secondary-inverse hover:bg-mistica-button-secondary-background-inverse-hover active:bg-mistica-button-secondary-background-inverse-pressed'
                            )}
                        >
                            {secondaryAction.text}
                        </Button>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}

export {FeedbackScreen};

import {act, render, screen} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {TextTimer} from '@/components/ui/timer';

describe('TextTimer', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-08-12T12:00:00Z'));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('mostra minutos e segundos, escondendo unidades zeradas a esquerda', () => {
        const end = Date.now() + 90_000; // 1min30s
        render(<TextTimer endTimestamp={end} />);
        expect(screen.getByText('01min 30s')).toBeInTheDocument();
    });

    it('mostra dias quando ha mais de 24h', () => {
        const end = Date.now() + (26 * 3600 + 120) * 1000; // 1d 2h 2min 0s
        render(<TextTimer endTimestamp={end} />);
        expect(screen.getByText('01d 02h 02min 00s')).toBeInTheDocument();
    });

    it('conta para baixo a cada segundo', () => {
        const end = Date.now() + 90_000;
        render(<TextTimer endTimestamp={end} />);

        act(() => {
            vi.advanceTimersByTime(30_000);
        });
        expect(screen.getByText('01min 00s')).toBeInTheDocument();
    });

    it('para em zero e chama onFinish', () => {
        const onFinish = vi.fn();
        const end = Date.now() + 2_000;
        render(<TextTimer endTimestamp={end} onFinish={onFinish} />);

        act(() => {
            vi.advanceTimersByTime(5_000);
        });
        expect(screen.getByText('00min 00s')).toBeInTheDocument();
        expect(onFinish).toHaveBeenCalledOnce();
    });
});

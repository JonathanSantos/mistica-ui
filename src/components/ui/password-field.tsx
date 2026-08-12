import * as React from 'react';
import {Eye, EyeOff} from 'lucide-react';

import {TextField} from '@/components/ui/text-field';

/** PasswordField Mistica: TextField com alternancia de visibilidade (olho). */
type PasswordFieldProps = Omit<React.ComponentProps<typeof TextField>, 'type' | 'endAdornment'>;

function PasswordField(props: PasswordFieldProps) {
    const [visible, setVisible] = React.useState(false);

    return (
        <TextField
            type={visible ? 'text' : 'password'}
            endAdornment={
                <button
                    type="button"
                    aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
                    onClick={() => setVisible((v) => !v)}
                    className="cursor-pointer rounded-full p-2 text-mistica-neutral-medium outline-none hover:bg-mistica-background-container-hover focus-visible:ring-2 focus-visible:ring-mistica-control-activated"
                >
                    {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
            }
            {...props}
        />
    );
}

export {PasswordField};

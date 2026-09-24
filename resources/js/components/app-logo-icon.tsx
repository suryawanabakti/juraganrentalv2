import type { SVGAttributes } from 'react';

export default function AppLogoIcon({ className }: SVGAttributes<SVGElement>) {
    return <img src="/logo.png" alt="Logo" className={className} />;
}

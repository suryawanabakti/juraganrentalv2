import { Link } from '@inertiajs/react';
import {
    Car,
    Contact,
    GalleryHorizontalEnd,
    Home,
    Images,
    LayoutDashboard,
    ListChecks,
    Lock,
    Megaphone,
    Palette,
    PanelsTopLeft,
    Settings,
    Sparkles,
    Store,
    UserRound,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import admin from '@/routes/admin';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavItem } from '@/types';

const sectionNavItems: NavItem[] = [
    {
        title: 'Hero Section',
        href: admin.sections.edit('hero'),
        icon: PanelsTopLeft,
    },
    {
        title: 'About Section',
        href: admin.sections.edit('about'),
        icon: UserRound,
    },
    {
        title: 'Armada Section',
        href: admin.sections.edit('armada'),
        icon: Car,
    },
    {
        title: 'Layanan Section',
        href: admin.sections.edit('layanan'),
        icon: Sparkles,
    },
    {
        title: 'Layanan List',
        href: admin.sections.edit('services'),
        icon: ListChecks,
    },
    {
        title: 'CTA Section',
        href: admin.sections.edit('cta'),
        icon: Megaphone,
    },
    {
        title: 'Galeri Section',
        href: admin.sections.edit('galeri'),
        icon: GalleryHorizontalEnd,
    },
    {
        title: 'Kontak / Footer',
        href: admin.sections.edit('kontak'),
        icon: Contact,
    },
];

const dataNavItems: NavItem[] = [
    {
        title: 'Manajemen Armada',
        href: admin.armada.index(),
        icon: Store,
    },
    {
        title: 'Manajemen Galeri',
        href: admin.galeri.index(),
        icon: Images,
    },
];

const settingsNavItems: NavItem[] = [
    {
        title: 'Pengaturan Situs',
        href: admin.sections.edit('site'),
        icon: Settings,
    },
    {
        title: 'Profile',
        href: editProfile(),
        icon: UserRound,
    },
    {
        title: 'Security',
        href: editSecurity(),
        icon: Lock,
    },
    {
        title: 'Appearance',
        href: editAppearance(),
        icon: Palette,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Halaman Utama',
        href: '/',
        icon: Home,
    },
];

export function AdminSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={admin.index()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain
                    items={[
                        {
                            title: 'Dashboard',
                            href: admin.index(),
                            icon: LayoutDashboard,
                        },
                    ]}
                />
                <NavMain items={sectionNavItems} />
                <NavMain items={dataNavItems} />
                <NavMain items={settingsNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
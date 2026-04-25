import { getSettings } from '@/lib/db';
import { SettingsEditor } from './SettingsEditor';

export default async function SettingsAdminPage() {
  const settings = await getSettings();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-espresso">Ajustes del sitio</h1>
        <p className="text-sm text-espresso-lighter mt-1">
          Información de marca, contacto, SEO y configuración comercial.
        </p>
      </header>
      <SettingsEditor initial={settings} />
    </div>
  );
}

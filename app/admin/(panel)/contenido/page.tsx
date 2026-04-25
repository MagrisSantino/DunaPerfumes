import { getContent } from '@/lib/db';
import { ContentEditor } from './ContentEditor';

export default async function ContentAdminPage() {
  const content = await getContent();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-espresso">Contenido del sitio</h1>
        <p className="text-sm text-espresso-lighter mt-1">
          Editá los textos, imágenes y secciones del sitio. Los cambios se publican al guardar.
        </p>
      </header>
      <ContentEditor initial={content} />
    </div>
  );
}

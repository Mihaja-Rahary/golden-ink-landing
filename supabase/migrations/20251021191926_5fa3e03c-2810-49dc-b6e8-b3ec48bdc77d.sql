-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles (only admins can view/manage roles)
CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create social_links table
CREATE TABLE public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- Public can read active social links
CREATE POLICY "Anyone can view active social links"
ON public.social_links
FOR SELECT
USING (is_active = true);

-- Admins can manage social links
CREATE POLICY "Admins can manage social links"
ON public.social_links
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create books table
CREATE TABLE public.books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT,
  category TEXT NOT NULL,
  cover_url TEXT,
  amazon_link TEXT,
  fnac_link TEXT,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- Public can read active books
CREATE POLICY "Anyone can view active books"
ON public.books
FOR SELECT
USING (is_active = true);

-- Admins can manage books
CREATE POLICY "Admins can manage books"
ON public.books
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create site_settings table for customizable content
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  setting_type TEXT NOT NULL DEFAULT 'text',
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read site settings
CREATE POLICY "Anyone can view site settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Admins can manage site settings
CREATE POLICY "Admins can manage site settings"
ON public.site_settings
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Insert default social links
INSERT INTO public.social_links (name, icon, url, description, display_order) VALUES
('Instagram', 'Instagram', '#', '@tonpseudo', 1),
('TikTok', 'Send', '#', '@tonpseudo', 2),
('Telegram', 'Send', '#', 'Canal Lecture & Croissance', 3),
('Amazon', 'ShoppingBag', '#', 'Mes livres préférés', 4),
('Fnac', 'BookOpen', '#', 'Ma sélection Fnac', 5),
('Audible', 'BookOpen', '#', 'Essaye Audible gratuitement', 6);

-- Insert default site settings
INSERT INTO public.site_settings (setting_key, setting_value, setting_type, description) VALUES
('hero_title', 'Un livre par jour pour t''inspirer 📖', 'text', 'Titre principal du Hero'),
('hero_subtitle', 'Chaque jour, découvre un résumé, une idée ou une anecdote tirée d''un livre marquant.', 'text', 'Sous-titre du Hero'),
('hero_description', 'Parce qu''un bon livre peut changer ta vision du monde. Découvre mes sélections quotidiennes et explore l''univers de la lecture autrement.', 'textarea', 'Description du Hero'),
('hero_cta', 'Télécharger mon ebook gratuit', 'text', 'Texte du bouton CTA principal'),
('ebook_title', 'Ton ebook offert 📚', 'text', 'Titre de la section ebook'),
('ebook_description', 'Reçois gratuitement mon ebook exclusif contenant les résumés de tous les livres que je présente sur mes réseaux.', 'textarea', 'Description de l''ebook'),
('daily_book_title', 'Le livre du jour 🌟', 'text', 'Titre de la section livre du jour'),
('daily_book_description', 'Chaque jour, je partage sur mes réseaux un résumé ou une idée clé tirée d''un livre inspirant.', 'textarea', 'Description du livre du jour'),
('newsletter_title', 'Reçois le résumé du jour dans ta boîte mail 📬', 'text', 'Titre de la newsletter'),
('newsletter_description', 'Chaque matin, découvre une nouvelle idée, citation ou anecdote tirée d''un livre.', 'textarea', 'Description de la newsletter'),
('social_section_title', 'Découvre mes plateformes 📱', 'text', 'Titre de la section liens sociaux'),
('social_section_subtitle', 'Rejoins-moi pour du contenu quotidien et mes recommandations', 'text', 'Sous-titre de la section liens sociaux'),
('footer_text', 'Créé avec passion. Chaque livre est une porte vers une nouvelle idée.', 'text', 'Texte du footer');

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_social_links_updated_at
BEFORE UPDATE ON public.social_links
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_books_updated_at
BEFORE UPDATE ON public.books
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
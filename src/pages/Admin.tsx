import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Settings, Link2, BookOpen, Type } from "lucide-react";
import AdminSocialLinks from "@/components/admin/AdminSocialLinks";
import AdminBooks from "@/components/admin/AdminBooks";
import AdminSettings from "@/components/admin/AdminSettings";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gradient-gold">Interface Admin</h1>
            <p className="text-sm text-muted-foreground">Gérez votre contenu</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/")} size="sm">
              Voir le site
            </Button>
            <Button variant="destructive" onClick={signOut} size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="settings" className="gap-2">
              <Type className="w-4 h-4" />
              Textes & CTAs
            </TabsTrigger>
            <TabsTrigger value="links" className="gap-2">
              <Link2 className="w-4 h-4" />
              Liens Sociaux
            </TabsTrigger>
            <TabsTrigger value="books" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Livres
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-6">
            <AdminSettings />
          </TabsContent>

          <TabsContent value="links" className="space-y-6">
            <AdminSocialLinks />
          </TabsContent>

          <TabsContent value="books" className="space-y-6">
            <AdminBooks />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;

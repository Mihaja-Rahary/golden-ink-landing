import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";

interface SocialLink {
  id: string;
  name: string;
  icon: string;
  url: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

const AdminSocialLinks = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<SocialLink>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const { data, error } = await supabase
        .from("social_links")
        .select("*")
        .order("display_order");

      if (error) throw error;
      setLinks(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les liens",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (link: SocialLink) => {
    setEditingId(link.id);
    setEditForm(link);
  };

  const handleSave = async () => {
    if (!editingId) return;

    try {
      const { error } = await supabase
        .from("social_links")
        .update(editForm)
        .eq("id", editingId);

      if (error) throw error;

      await fetchLinks();
      setEditingId(null);
      setEditForm({});

      toast({
        title: "Sauvegardé",
        description: "Le lien a été mis à jour",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce lien ?")) return;

    try {
      const { error } = await supabase
        .from("social_links")
        .delete()
        .eq("id", id);

      if (error) throw error;

      await fetchLinks();

      toast({
        title: "Supprimé",
        description: "Le lien a été supprimé",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Liens Sociaux</CardTitle>
        <CardDescription>
          Gérez vos liens vers les réseaux sociaux et plateformes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actif</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.map((link) => (
                <TableRow key={link.id}>
                  {editingId === link.id ? (
                    <>
                      <TableCell>
                        <Input
                          value={editForm.name || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editForm.url || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, url: e.target.value })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editForm.description || ""}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              description: e.target.value,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={editForm.is_active || false}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              is_active: e.target.checked,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" onClick={handleSave}>
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingId(null);
                            setEditForm({});
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="font-medium">{link.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {link.url}
                      </TableCell>
                      <TableCell className="text-sm">
                        {link.description}
                      </TableCell>
                      <TableCell>
                        {link.is_active ? (
                          <span className="text-green-600">✓</span>
                        ) : (
                          <span className="text-red-600">✗</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(link)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(link.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSocialLinks;

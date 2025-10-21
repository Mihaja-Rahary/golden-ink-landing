import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  cover_url: string;
  amazon_link: string;
  fnac_link: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

const categories = [
  "Développement Personnel",
  "Business & Mindset",
  "Spiritualité & Philosophie",
  "Biographies & Histoires vraies",
];

const AdminBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Partial<Book> | null>(null);
  const [formData, setFormData] = useState<Partial<Book>>({
    title: "",
    author: "",
    category: categories[0],
    cover_url: "",
    amazon_link: "",
    fnac_link: "",
    description: "",
    is_active: true,
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("category")
        .order("display_order");

      if (error) throw error;
      setBooks(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les livres",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category) {
      toast({
        title: "Erreur",
        description: "Le titre et la catégorie sont obligatoires",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingBook?.id) {
        const { error } = await supabase
          .from("books")
          .update(formData)
          .eq("id", editingBook.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("books").insert([{
          title: formData.title,
          author: formData.author || null,
          category: formData.category,
          cover_url: formData.cover_url || null,
          amazon_link: formData.amazon_link || null,
          fnac_link: formData.fnac_link || null,
          description: formData.description || null,
          is_active: formData.is_active ?? true,
        }]);

        if (error) throw error;
      }

      await fetchBooks();
      setDialogOpen(false);
      setEditingBook(null);
      setFormData({
        title: "",
        author: "",
        category: categories[0],
        cover_url: "",
        amazon_link: "",
        fnac_link: "",
        description: "",
        is_active: true,
      });

      toast({
        title: "Succès",
        description: editingBook ? "Livre mis à jour" : "Livre ajouté",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setFormData(book);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) return;

    try {
      const { error } = await supabase.from("books").delete().eq("id", id);

      if (error) throw error;

      await fetchBooks();

      toast({
        title: "Supprimé",
        description: "Le livre a été supprimé",
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
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Livres</CardTitle>
            <CardDescription>Gérez votre bibliothèque de livres</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingBook(null);
                  setFormData({
                    title: "",
                    author: "",
                    category: categories[0],
                    cover_url: "",
                    amazon_link: "",
                    fnac_link: "",
                    description: "",
                    is_active: true,
                  });
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un livre
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingBook ? "Modifier le livre" : "Ajouter un livre"}
                </DialogTitle>
                <DialogDescription>
                  Remplissez les informations du livre
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Auteur</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cover_url">URL de la couverture</Label>
                  <Input
                    id="cover_url"
                    value={formData.cover_url}
                    onChange={(e) =>
                      setFormData({ ...formData, cover_url: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amazon_link">Lien Amazon</Label>
                  <Input
                    id="amazon_link"
                    value={formData.amazon_link}
                    onChange={(e) =>
                      setFormData({ ...formData, amazon_link: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fnac_link">Lien Fnac</Label>
                  <Input
                    id="fnac_link"
                    value={formData.fnac_link}
                    onChange={(e) =>
                      setFormData({ ...formData, fnac_link: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData({ ...formData, is_active: e.target.checked })
                    }
                  />
                  <Label htmlFor="is_active">Actif</Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button type="submit">
                    {editingBook ? "Mettre à jour" : "Ajouter"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Auteur</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Actif</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>
                    {book.is_active ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-red-600">✗</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(book)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(book.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminBooks;

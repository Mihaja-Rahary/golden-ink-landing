import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

interface Setting {
  id: string;
  setting_key: string;
  setting_value: string;
  setting_type: string;
  description: string;
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .order("setting_key");

      if (error) throw error;
      setSettings(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les paramètres",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (setting: Setting, newValue: string) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("site_settings")
        .update({ setting_value: newValue })
        .eq("id", setting.id);

      if (error) throw error;

      setSettings((prev) =>
        prev.map((s) =>
          s.id === setting.id ? { ...s, setting_value: newValue } : s
        )
      );

      toast({
        title: "Sauvegardé",
        description: "Les modifications ont été enregistrées",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Paramètres du Site</CardTitle>
          <CardDescription>
            Modifiez tous les textes et call-to-actions de votre site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {settings.map((setting) => (
            <div key={setting.id} className="space-y-2">
              <Label htmlFor={setting.setting_key}>
                {setting.description}
              </Label>
              {setting.setting_type === "textarea" ? (
                <Textarea
                  id={setting.setting_key}
                  defaultValue={setting.setting_value}
                  onBlur={(e) => handleSave(setting, e.target.value)}
                  rows={3}
                />
              ) : (
                <Input
                  id={setting.setting_key}
                  defaultValue={setting.setting_value}
                  onBlur={(e) => handleSave(setting, e.target.value)}
                />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;

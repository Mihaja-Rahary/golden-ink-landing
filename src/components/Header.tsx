import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { BookOpen, LogIn, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-gradient-gold">1 Livre par Jour</span>
        </div>
        
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/admin")}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              )}
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/auth")}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Connexion
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

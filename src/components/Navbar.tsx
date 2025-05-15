
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  FileTextIcon, 
  UsersIcon, 
  ClockIcon 
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { toast } = useToast();
  const [currentDate] = useState(new Date().toLocaleDateString('it-IT', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  }));

  const handleNotification = () => {
    toast({
      title: "Sistema aggiornato",
      description: "Tutte le modifiche sono state salvate automaticamente.",
    });
  };

  return (
    <nav className="flex flex-col w-full bg-journal-blue text-white shadow-lg">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <FileTextIcon className="h-8 w-8" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Giornale dei Lavori</h1>
            <p className="text-sm text-gray-300">DM n. 49 del 07/03/2018 - Art. 14</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1 text-white bg-journal-lightBlue py-1 px-3 rounded-md">
            <CalendarIcon className="h-4 w-4" />
            <span>{currentDate}</span>
          </div>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-journal-blue"
            onClick={handleNotification}
          >
            Salva modifiche
          </Button>
        </div>
      </div>
      
      <div className="bg-journal-lightBlue">
        <div className="container flex overflow-x-auto">
          <Link to="/" className="flex items-center gap-1 px-4 py-3 text-white border-b-2 border-transparent hover:border-white transition-all">
            <FileTextIcon className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link to="/new-entry" className="flex items-center gap-1 px-4 py-3 text-white border-b-2 border-transparent hover:border-white transition-all">
            <CalendarIcon className="h-4 w-4" />
            <span>Nuovo inserimento</span>
          </Link>
          <Link to="/history" className="flex items-center gap-1 px-4 py-3 text-white border-b-2 border-transparent hover:border-white transition-all">
            <ClockIcon className="h-4 w-4" />
            <span>Storico</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

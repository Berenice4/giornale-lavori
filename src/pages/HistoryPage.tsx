
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, SearchIcon, FilterIcon, FileTextIcon } from 'lucide-react';
import { format } from "date-fns";
import { it } from 'date-fns/locale';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// Mock data for the journal entries
const mockEntries = Array.from({ length: 20 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  
  return {
    id: i + 1,
    date: format(date, 'dd/MM/yyyy'),
    activities: i % 3 === 0 
      ? 'Fondazione, scavi preliminari' 
      : i % 3 === 1 
        ? 'Armature metalliche, colata calcestruzzo'
        : 'Muratura perimetrale, opere strutturali',
    workers: Math.floor(Math.random() * 10) + 3,
    equipment: Math.floor(Math.random() * 5) + 1,
    weatherCondition: i % 4 === 0 
      ? 'Soleggiato' 
      : i % 4 === 1 
        ? 'Nuvoloso'
        : i % 4 === 2
          ? 'Pioggia leggera'
          : 'Pioggia forte',
  };
});

const HistoryPage = () => {
  const [entries] = useState(mockEntries);
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.activities.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = date ? entry.date === format(date, 'dd/MM/yyyy') : true;
    return matchesSearch && matchesDate;
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'soleggiato':
        return '☀️';
      case 'nuvoloso':
        return '☁️';
      case 'pioggia leggera':
        return '🌦️';
      case 'pioggia forte':
        return '🌧️';
      default:
        return '🌤️';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container py-6">
        <h1 className="text-2xl font-bold mb-2">Storico Giornale dei Lavori</h1>
        <p className="text-muted-foreground mb-6">Visualizza e ricerca tutte le registrazioni precedenti</p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cerca per attività, materiali..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {date ? format(date, 'dd/MM/yyyy') : 'Filtra per data'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className={("p-3 pointer-events-auto")}
                />
                <div className="border-t p-3 flex justify-between">
                  <Button variant="ghost" size="sm" onClick={() => setDate(undefined)}>
                    Cancella
                  </Button>
                  <Button size="sm" onClick={() => console.log(date)}>
                    Applica
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button variant="outline" className="gap-2">
              <FilterIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Filtri</span>
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meteo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attività
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Operai
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attrezzature
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {entry.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <span className="text-lg">{getWeatherIcon(entry.weatherCondition)}</span>
                        <span>{entry.weatherCondition}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {entry.activities}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.workers}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.equipment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/entry/${entry.id}`}>
                        <Button variant="ghost" size="sm" className="text-journal-blue hover:text-journal-blue/80">
                          <FileTextIcon className="h-4 w-4 mr-1" />
                          Dettagli
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="text-sm text-gray-700">
              Mostrati <span className="font-medium">{filteredEntries.length}</span> di{" "}
              <span className="font-medium">{entries.length}</span> risultati
            </div>
            <div className="flex-1 flex justify-end gap-2">
              <Button variant="outline" size="sm" disabled={filteredEntries.length === 0}>
                Precedente
              </Button>
              <Button variant="outline" size="sm" disabled={filteredEntries.length === 0}>
                Successivo
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-journal-blue text-white py-4">
        <div className="container text-center text-sm">
          <p>Giornale dei Lavori - DM n. 49 del 07/03/2018 - Art. 14: I documenti contabili</p>
          <p className="text-gray-300 mt-1">© {new Date().getFullYear()} - Sistema Digitale per la Documentazione di Cantiere</p>
        </div>
      </footer>
    </div>
  );
};

export default HistoryPage;

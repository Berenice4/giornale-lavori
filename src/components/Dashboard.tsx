
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, UsersIcon, FileTextIcon } from 'lucide-react';

const recentEntries = [
  {
    id: 1,
    date: '14/05/2025',
    workers: 8,
    equipment: 3,
    activities: 'Fondazione, scavi preliminari',
    progress: 85
  },
  {
    id: 2,
    date: '13/05/2025',
    workers: 12,
    equipment: 5,
    activities: 'Armature metalliche, colata calcestruzzo',
    progress: 72
  },
  {
    id: 3,
    date: '12/05/2025',
    workers: 10,
    equipment: 4,
    activities: 'Muratura perimetrale, opere strutturali',
    progress: 68
  }
];

const Dashboard = () => {
  const [stats] = useState({
    totalEntries: 42,
    activeWorkers: 14,
    completedTasks: 128,
    currentProgress: 62
  });

  return (
    <div className="container py-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Generale</h1>
          <p className="text-muted-foreground">Panoramica del Giornale dei Lavori</p>
        </div>
        <Button className="mt-2 md:mt-0 bg-journal-blue hover:bg-journal-lightBlue flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          <span>Nuovo inserimento</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Registrazioni Totali</CardTitle>
            <CardDescription>Inserimenti nel giornale</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileTextIcon className="h-10 w-10 text-journal-blue mr-3" />
              <div className="text-3xl font-bold">{stats.totalEntries}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Operai Attivi</CardTitle>
            <CardDescription>Personale impiegato</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UsersIcon className="h-10 w-10 text-journal-blue mr-3" />
              <div className="text-3xl font-bold">{stats.activeWorkers}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Avanzamento</CardTitle>
            <CardDescription>Progresso complessivo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <div className="text-3xl font-bold mb-2">{stats.currentProgress}%</div>
              <Progress value={stats.currentProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-4">Inserimenti Recenti</h2>
      
      <div className="space-y-4">
        {recentEntries.map(entry => (
          <Card key={entry.id} className="hover:border-journal-accent transition-colors">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center mb-2 md:mb-0">
                  <div className="bg-journal-blue text-white p-3 rounded-md mr-4">
                    <CalendarIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">{entry.date}</h3>
                    <p className="text-sm text-muted-foreground">{entry.activities}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-2 md:mt-0">
                  <div className="bg-gray-100 px-3 py-1 rounded text-sm">
                    Operai: {entry.workers}
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded text-sm">
                    Attrezzature: {entry.equipment}
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={entry.progress} className="h-2 w-20" />
                    <span className="text-sm font-medium">{entry.progress}%</span>
                  </div>
                  <Link to={`/entry/${entry.id}`}>
                    <Button variant="outline" size="sm">Dettagli</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;


import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, UsersIcon, ArrowLeftIcon, FileTextIcon } from 'lucide-react';

const JournalEntryPage = () => {
  // In a real application, this would come from an API or database
  const { id } = useParams();
  const [entry] = useState({
    id: parseInt(id || "0"),
    date: '14/05/2025',
    activities: 'Fondazione, scavi preliminari. Realizzazione degli scavi per le fondamenta nell\'area nord del cantiere. Preparazione delle armature metalliche per la colata di calcestruzzo prevista nei prossimi giorni.',
    weatherConditions: 'Soleggiato, 24°C, vento leggero 5 km/h, umidità 45%',
    notes: 'Incontro con il direttore dei lavori per rivedere i dettagli delle fondazioni. Aggiornata la documentazione secondo le ultime specifiche.',
    workers: [
      { name: 'Marco Rossi', qualification: 'Capo Cantiere' },
      { name: 'Luigi Bianchi', qualification: 'Operaio Specializzato' },
      { name: 'Giovanni Verdi', qualification: 'Operaio Specializzato' },
      { name: 'Andrea Neri', qualification: 'Operaio Comune' },
      { name: 'Paolo Marrone', qualification: 'Operaio Comune' },
      { name: 'Fabio Gialli', qualification: 'Operaio Comune' },
      { name: 'Stefano Azzurri', qualification: 'Operaio Comune' },
      { name: 'Roberto Viola', qualification: 'Apprendista' },
    ],
    equipment: [
      { name: 'Escavatore JCB 3CX', quantity: 1 },
      { name: 'Betoniera Edilmac 350L', quantity: 1 },
      { name: 'Martello pneumatico', quantity: 2 },
    ],
    materials: [
      { name: 'Ferro per armature B450C', quantity: 1200, unit: 'kg', invoiceRef: 'FT-2025-0342' },
      { name: 'Distanziatori in plastica', quantity: 300, unit: 'pz', invoiceRef: 'FT-2025-0343' },
      { name: 'Legname per casseforme', quantity: 45, unit: 'm²', invoiceRef: 'FT-2025-0344' },
    ],
    progress: 85
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Giornale dei Lavori</h1>
              <div className="flex items-center text-muted-foreground">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>{entry.date}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 space-x-2">
            <Button variant="outline">Modifica</Button>
            <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">Elimina</Button>
            <Button className="bg-journal-blue hover:bg-journal-lightBlue">Stampa PDF</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Attività e Lavorazioni</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{entry.activities}</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Condizioni Meteo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">☀️</div>
                    <p>{entry.weatherConditions}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Note</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{entry.notes}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Materiali e Provviste</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materiale</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantità</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unità</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fattura</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {entry.materials.map((material, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{material.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{material.quantity}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{material.unit}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {material.invoiceRef && (
                              <Badge variant="outline" className="gap-1 border-journal-blue text-journal-blue">
                                <FileTextIcon className="h-3 w-3" />
                                {material.invoiceRef}
                              </Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UsersIcon className="h-5 w-5" />
                  <span>Operai Impiegati</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {entry.workers.map((worker, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium">{worker.name}</span>
                      <Badge variant="secondary">{worker.qualification}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attrezzatura Tecnica</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {entry.equipment.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <Badge variant="outline">Quantità: {item.quantity}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documenti Allegati</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileTextIcon className="h-4 w-4 mr-2" />
                    Rapporto Giornaliero.pdf
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileTextIcon className="h-4 w-4 mr-2" />
                    Foto Cantiere 14-05.zip
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileTextIcon className="h-4 w-4 mr-2" />
                    Ordine Materiali.pdf
                  </Button>
                </div>
              </CardContent>
            </Card>
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

export default JournalEntryPage;

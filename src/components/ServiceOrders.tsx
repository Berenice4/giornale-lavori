
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileTextIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const defaultOrders = [
  {
    id: 1,
    title: "Ordine di servizio n.14",
    date: "12/05/2025",
    issuer: "RUP",
    status: "Completato",
    description: "Modifica intervento su fondazioni lato nord"
  },
  {
    id: 2,
    title: "Ordine di servizio n.15",
    date: "13/05/2025",
    issuer: "Direttore Lavori",
    status: "In corso",
    description: "Revisione materiali per impianti elettrici"
  },
  {
    id: 3,
    title: "Ordine di servizio n.16",
    date: "14/05/2025",
    issuer: "RUP",
    status: "Da iniziare",
    description: "Richiesta documentazione aggiuntiva per variante"
  }
];

const ServiceOrders = () => {
  const [serviceOrders] = useState(defaultOrders);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completato':
        return 'bg-green-100 text-green-800';
      case 'In corso':
        return 'bg-blue-100 text-blue-800';
      case 'Da iniziare':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Ordini di Servizio</h2>
        <Button variant="outline" size="sm" className="text-journal-blue border-journal-blue hover:bg-journal-blue hover:text-white">
          Nuovo ordine
        </Button>
      </div>

      {serviceOrders.map((order) => (
        <Card key={order.id} className="hover:shadow-md transition-all">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex gap-3">
                <div className="bg-journal-blue/10 rounded-lg p-2 self-start">
                  <FileTextIcon className="h-5 w-5 text-journal-blue" />
                </div>
                <div>
                  <h3 className="font-medium">{order.title}</h3>
                  <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {order.date}
                    </span>
                    <span>•</span>
                    <span>Emesso da: {order.issuer}</span>
                  </div>
                  <p className="text-sm mt-2">{order.description}</p>
                </div>
              </div>
              <div className="mt-3 md:mt-0 flex flex-col md:items-end gap-2">
                <Badge className={cn("font-normal", getStatusColor(order.status))}>
                  {order.status}
                </Badge>
                <Button variant="ghost" size="sm" className="text-journal-blue hover:text-journal-blue/80">
                  Visualizza dettagli
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServiceOrders;

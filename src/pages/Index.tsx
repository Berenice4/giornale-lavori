
import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';
import ServiceOrders from '@/components/ServiceOrders';
import WeatherConditions from '@/components/WeatherConditions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-1">
        <Dashboard />
        
        <div className="container py-6">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="orders">Ordini di Servizio</TabsTrigger>
              <TabsTrigger value="weather">Condizioni Meteo</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ServiceOrders />
            </TabsContent>
            <TabsContent value="weather">
              <WeatherConditions />
            </TabsContent>
          </Tabs>
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

export default Index;

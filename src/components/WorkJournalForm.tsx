
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, PlusIcon, MinusIcon } from 'lucide-react';
import { format } from "date-fns";
import { it } from 'date-fns/locale';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  date: z.date({
    required_error: "La data è obbligatoria",
  }),
  activities: z.string().min(5, {
    message: "Inserire una descrizione delle attività di almeno 5 caratteri",
  }),
  weatherConditions: z.string().min(3, {
    message: "Inserire le condizioni meteo",
  }),
  notes: z.string().optional(),
  workers: z.array(
    z.object({
      name: z.string().min(2, "Nome richiesto"),
      qualification: z.string().min(2, "Qualifica richiesta"),
    })
  ).min(1, "Inserire almeno un operaio"),
  equipment: z.array(
    z.object({
      name: z.string().min(2, "Nome attrezzatura richiesto"),
      quantity: z.number().min(1, "Inserire una quantità valida"),
    })
  ),
  materials: z.array(
    z.object({
      name: z.string().min(2, "Nome materiale richiesto"),
      quantity: z.number().min(1, "Inserire una quantità valida"),
      invoiceRef: z.string().optional(),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

const WorkJournalForm = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      activities: "",
      weatherConditions: "",
      notes: "",
      workers: [{ name: "", qualification: "" }],
      equipment: [{ name: "", quantity: 1 }],
      materials: [{ name: "", quantity: 1, invoiceRef: "" }],
    },
  });

  const workers = form.watch("workers");
  const equipment = form.watch("equipment");
  const materials = form.watch("materials");

  const addWorker = () => {
    form.setValue("workers", [...workers, { name: "", qualification: "" }]);
  };

  const removeWorker = (index: number) => {
    const updatedWorkers = [...workers];
    updatedWorkers.splice(index, 1);
    form.setValue("workers", updatedWorkers);
  };

  const addEquipment = () => {
    form.setValue("equipment", [...equipment, { name: "", quantity: 1 }]);
  };

  const removeEquipment = (index: number) => {
    const updatedEquipment = [...equipment];
    updatedEquipment.splice(index, 1);
    form.setValue("equipment", updatedEquipment);
  };

  const addMaterial = () => {
    form.setValue("materials", [...materials, { name: "", quantity: 1, invoiceRef: "" }]);
  };

  const removeMaterial = (index: number) => {
    const updatedMaterials = [...materials];
    updatedMaterials.splice(index, 1);
    form.setValue("materials", updatedMaterials);
  };

  function onSubmit(data: FormValues) {
    console.log(data);
    toast({
      title: "Inserimento salvato",
      description: "Il giornale dei lavori è stato aggiornato con successo.",
    });
  }

  return (
    <div className="container py-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Nuovo Inserimento Giornale dei Lavori</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: it })
                              ) : (
                                <span>Seleziona una data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="activities"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Attività e Lavorazioni</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descrivi come progrediscono le lavorazioni..."
                          className="resize-none"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Descrivere l'ordine, il modo e l'attività con cui progrediscono le lavorazioni
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weatherConditions"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Condizioni Meteo</FormLabel>
                      <FormControl>
                        <Input placeholder="Es. Soleggiato, 22°C, vento leggero" {...field} />
                      </FormControl>
                      <FormDescription>
                        Inserire osservazioni meteorologiche e idrometriche rilevanti
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Note Aggiuntive</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Note, circostanze particolari, avvenimenti rilevanti..."
                          className="resize-none"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Operai Impiegati</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addWorker}>
                      <PlusIcon className="w-4 h-4 mr-1" /> Aggiungi
                    </Button>
                  </div>
                  
                  {workers.map((worker, index) => (
                    <div key={index} className="space-y-2">
                      {index > 0 && <Separator className="my-4" />}
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name={`workers.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                  <Input placeholder="Nome operaio" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name={`workers.${index}.qualification`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Qualifica</FormLabel>
                                <FormControl>
                                  <Input placeholder="Qualifica" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        {workers.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeWorker(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <MinusIcon className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Attrezzatura Tecnica</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addEquipment}>
                      <PlusIcon className="w-4 h-4 mr-1" /> Aggiungi
                    </Button>
                  </div>
                  
                  {equipment.map((item, index) => (
                    <div key={index} className="space-y-2">
                      {index > 0 && <Separator className="my-4" />}
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name={`equipment.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Attrezzatura</FormLabel>
                                <FormControl>
                                  <Input placeholder="Nome attrezzatura" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-24">
                          <FormField
                            control={form.control}
                            name={`equipment.${index}.quantity`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Quantità</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number"
                                    min="1"
                                    {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        {equipment.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeEquipment(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <MinusIcon className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Materiali e Provviste</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addMaterial}>
                      <PlusIcon className="w-4 h-4 mr-1" /> Aggiungi
                    </Button>
                  </div>
                  
                  {materials.map((item, index) => (
                    <div key={index} className="space-y-2">
                      {index > 0 && <Separator className="my-4" />}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                        <FormField
                          control={form.control}
                          name={`materials.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Materiale</FormLabel>
                              <FormControl>
                                <Input placeholder="Nome materiale" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`materials.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantità</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number"
                                  min="1"
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex gap-2">
                          <FormField
                            control={form.control}
                            name={`materials.${index}.invoiceRef`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Rif. Fattura</FormLabel>
                                <FormControl>
                                  <Input placeholder="Opzionale" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {materials.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeMaterial(index)}
                              className="text-destructive hover:text-destructive h-10 mt-7"
                            >
                              <MinusIcon className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline">Annulla</Button>
            <Button type="submit" className="bg-journal-blue hover:bg-journal-lightBlue">Salva Giornale</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WorkJournalForm;

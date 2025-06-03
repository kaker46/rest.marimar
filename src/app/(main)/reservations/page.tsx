
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import type { Locale } from 'date-fns';
import { format, isEqual, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Users, Trash2 } from "lucide-react";
import { toast } from '@/hooks/use-toast';
import { cn } from "@/lib/utils";

interface Table {
  id: string;
  name: string;
  seats: number;
  area: 'salao_direita' | 'salao_esquerda' | 'distribuicao'; 
}

interface Reservation {
  id: string;
  date: Date;
  time: string;
  name: string;
  guests: number;
  tableId: string;
  notes?: string;
}

const initialTables: Table[] = [
  { id: 'SR1', name: 'SR1', seats: 4, area: 'salao_direita' },
  { id: 'SR2', name: 'SR2', seats: 4, area: 'salao_direita' },
  { id: 'SR3', name: 'SR3', seats: 4, area: 'salao_direita' },
  { id: 'SR4', name: 'SR4', seats: 2, area: 'salao_direita' },
  { id: 'SR5', name: 'SR5', seats: 2, area: 'salao_direita' },
  { id: 'SR6', name: 'SR6', seats: 6, area: 'salao_direita' },
  { id: 'SL1', name: 'SL1', seats: 4, area: 'salao_esquerda' },
  { id: 'SL2', name: 'SL2', seats: 4, area: 'salao_esquerda' },
  { id: 'SL3', name: 'SL3', seats: 2, area: 'salao_esquerda' },
  { id: 'D1', name: 'D1', seats: 2, area: 'distribuicao' },
  { id: 'D2', name: 'D2', seats: 2, area: 'distribuicao' },
  { id: 'D3', name: 'D3', seats: 4, area: 'distribuicao' },
];


const availableTimes = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
];

export default function ReservationsPage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [minDateForCalendar, setMinDateForCalendar] = useState<Date | undefined>(undefined);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [tables] = useState<Table[]>(initialTables); 
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reservationName, setReservationName] = useState('');
  const [reservationGuests, setReservationGuests] = useState<number>(1);
  const [reservationTime, setReservationTime] = useState<string>('');
  const [reservationNotes, setReservationNotes] = useState('');

  const [calendarLocale, setCalendarLocale] = useState<Locale | undefined>(undefined);

  useEffect(() => {
    setIsClient(true);
    setCalendarLocale(es);
    const today = startOfDay(new Date());
    setSelectedDate(today);
    setMinDateForCalendar(today);

    setReservations(prev => {
        const existingDemoForToday = prev.some(r => 
            r.notes === "Mesa ocupada para demostración" && 
            isEqual(startOfDay(r.date), today)
        );
        if (existingDemoForToday) return prev;

        const dummyReservationsForToday: Reservation[] = [
            {
              id: crypto.randomUUID(),
              date: today,
              time: "20:00",
              name: "Reserva Demo SR1",
              guests: 2,
              tableId: 'SR1',
              notes: "Mesa ocupada para demostración",
            },
            {
              id: crypto.randomUUID(),
              date: today,
              time: "13:00",
              name: "Reserva Demo SL2",
              guests: 4,
              tableId: 'SL2',
              notes: "Mesa ocupada para demostración",
            },
             {
              id: crypto.randomUUID(),
              date: today,
              time: "19:30",
              name: "Reserva Demo D3",
              guests: 2,
              tableId: 'D3',
              notes: "Mesa ocupada para demostración",
            }
          ];
        const otherDayReservations = prev.filter(r => r.notes !== "Mesa ocupada para demostración");
        return [...otherDayReservations, ...dummyReservationsForToday];
    });

  }, []);

  const resetDialogForm = () => {
    setReservationName('');
    setReservationGuests(1);
    setReservationTime('');
    setReservationNotes('');
  };

  const handleTableSelect = (tableId: string) => {
    const tableStatus = getTableStatus(tableId, selectedDate);
    if (tableStatus === 'occupied') {
      toast({ title: "Mesa Ocupada", description: "Esta mesa ya está reservada para este día.", variant: "destructive" });
      return;
    }
    setSelectedTableId(prevId => prevId === tableId ? null : tableId);
  };

  const getTableStatus = (tableId: string, date?: Date): 'available' | 'occupied' | 'selected' => {
    if (selectedTableId === tableId) return 'selected';
    if (!date || !isClient) return 'available'; 
    const isOccupied = reservations.some(
      (res) => res.tableId === tableId && isEqual(startOfDay(res.date), startOfDay(date))
    );
    return isOccupied ? 'occupied' : 'available';
  };

  const handleAddReservation = () => {
    if (!selectedDate || !selectedTableId || !reservationName || !reservationTime || reservationGuests <= 0) {
      toast({ title: "Faltan datos", description: "Por favor, completa todos los campos requeridos.", variant: "destructive" });
      return;
    }

    const selectedTable = tables.find(t => t.id === selectedTableId);
    if (selectedTable && reservationGuests > selectedTable.seats) {
        toast({ title: "Demasiados comensales", description: `La mesa seleccionada tiene capacidad para ${selectedTable.seats} personas.`, variant: "destructive"});
        return;
    }

    const newReservation: Reservation = {
      id: crypto.randomUUID(),
      date: selectedDate,
      time: reservationTime,
      name: reservationName,
      guests: reservationGuests,
      tableId: selectedTableId,
      notes: reservationNotes,
    };
    setReservations(prev => [...prev, newReservation]);
    toast({ title: "Reserva Creada", description: `Reserva para ${reservationName} confirmada.` });
    setIsDialogOpen(false);
    resetDialogForm();
    setSelectedTableId(null); 
  };

  const handleDeleteReservation = (reservationId: string) => {
    setReservations(prev => prev.filter(res => res.id !== reservationId));
    toast({ title: "Reserva Eliminada", description: "La reserva ha sido eliminada." });
  };

  const reservationsForSelectedDate = useMemo(() => {
    if (!selectedDate || !isClient) return [];
    return reservations.filter(res => isEqual(startOfDay(res.date), startOfDay(selectedDate)));
  }, [reservations, selectedDate, isClient]);

  const daysWithReservations = useMemo(() => {
    if (!isClient) return new Set();
    return new Set(reservations.map(res => format(startOfDay(res.date), 'yyyy-MM-dd')));
  }, [reservations, isClient]);
  
  const selectedTableDetails = tables.find(t => t.id === selectedTableId);

  const TableDisplay = ({ table }: { table: Table }) => {
    const status = getTableStatus(table.id, selectedDate);
    return (
      <div
        onClick={() => handleTableSelect(table.id)}
        className={cn(
          "border p-1 text-xs w-14 h-14 flex flex-col items-center justify-center cursor-pointer transition-all duration-150 ease-in-out transform hover:scale-105 shadow-md rounded",
          status === 'available' && "bg-green-200 hover:bg-green-300 text-green-800 border-green-400",
          status === 'occupied' && "bg-red-300 cursor-not-allowed opacity-70 text-red-800 border-red-400",
          status === 'selected' && "bg-blue-300 ring-2 ring-blue-500 scale-105 text-blue-800 border-blue-500"
        )}
      >
        <span className="font-semibold">{table.name}</span>
        <div className="flex items-center">
          <Users className="h-3 w-3 mr-0.5" /> {table.seats}
        </div>
      </div>
    );
  };

  const formattedDateForDisplay = (date: Date | undefined, locale: Locale | undefined) => {
    if (!isClient || !date || !locale) return 'Cargando fecha...';
    return format(date, 'PPP', { locale });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-headline font-semibold tracking-tight">Reservas</h2>
        <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
            setIsDialogOpen(isOpen);
            if (!isOpen) {
                resetDialogForm();
            }
        }}>
          <DialogTrigger asChild>
            <Button disabled={!selectedTableId || !selectedDate || !isClient}>
              <PlusCircle className="mr-2 h-4 w-4" /> Añadir Reserva
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Crear Nueva Reserva</DialogTitle>
              <DialogDescription>
                {isClient && selectedDate && selectedTableDetails && calendarLocale ? 
                  `Reserva para ${selectedTableDetails.name} (${selectedTableDetails.seats} asientos) el ${format(selectedDate, 'PPP', { locale: calendarLocale })}.`
                  : "Selecciona una mesa y fecha."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="res-name" className="text-right">Nombre</Label>
                <Input id="res-name" value={reservationName} onChange={(e) => setReservationName(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="res-guests" className="text-right">Comensales</Label>
                <Input id="res-guests" type="number" value={reservationGuests} onChange={(e) => setReservationGuests(parseInt(e.target.value) || 1)} min="1" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="res-time" className="text-right">Hora</Label>
                <Select value={reservationTime} onValueChange={setReservationTime}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar hora" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimes.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="res-notes" className="text-right">Notas</Label>
                <Input id="res-notes" value={reservationNotes} onChange={(e) => setReservationNotes(e.target.value)} className="col-span-3" placeholder="Preferencias, alergias, etc."/>
              </div>
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                <Button type="submit" onClick={handleAddReservation}>Confirmar Reserva</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Seleccionar Fecha</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center overflow-x-auto">
              {!isClient || !calendarLocale || !minDateForCalendar ? (
                <p className="text-center py-10">Cargando calendario...</p>
              ) : (
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => { setSelectedDate(date); setSelectedTableId(null); }}
                  className="rounded-md border"
                  locale={calendarLocale}
                  disabled={(date) => date < minDateForCalendar}
                  modifiers={{
                    hasReservations: (date: Date) => daysWithReservations.has(format(date, 'yyyy-MM-dd')),
                  }}
                  modifiersClassNames={{
                    hasReservations: 'bg-accent text-accent-foreground rounded-md',
                  }}
                />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">
                Reservas para {formattedDateForDisplay(selectedDate, calendarLocale)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isClient || !selectedDate ? (
                <p className="text-muted-foreground text-center py-4">Cargando reservas...</p>
              ) : reservationsForSelectedDate.length > 0 ? (
                <ul className="space-y-3">
                  {reservationsForSelectedDate.map(res => {
                    const table = tables.find(t => t.id === res.tableId);
                    return (
                      <li key={res.id} className="p-3 border rounded-lg text-sm hover:bg-muted/50">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">{res.name} ({res.guests}p)</span>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteReservation(res.id)} aria-label="Eliminar reserva">
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        <p className="text-muted-foreground">{table?.name} - {res.time}</p>
                        {res.notes && <p className="text-xs italic mt-1">Nota: {res.notes}</p>}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No hay reservas para esta fecha.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Plano del Salón</CardTitle>
              <CardDescription>
                Selecciona una mesa disponible para la fecha: {formattedDateForDisplay(selectedDate, calendarLocale)}.
                {selectedTableId && ` Mesa seleccionada: ${tables.find(t=>t.id === selectedTableId)?.name}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              {!isClient || !selectedDate ? (
                 <p className="text-center text-muted-foreground py-10">Por favor, selecciona una fecha para ver la disponibilidad de mesas.</p>
              ) : (
                <div className="p-4 border rounded-lg bg-muted/20 min-w-[320px]">
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 justify-items-center">
                    {tables.map(table => <TableDisplay key={table.id} table={table} />)}
                  </div>
                  <div className="mt-6 flex justify-around text-xs">
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-200 rounded-sm border"></div> Disponible</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-300 rounded-sm border"></div> Ocupada</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-300 rounded-sm border"></div> Seleccionada</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

    

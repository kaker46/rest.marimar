
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import type { Locale } from 'date-fns';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";

interface Event {
  id: string;
  date: Date;
  title: string;
  description?: string;
}

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [calendarLocale, setCalendarLocale] = useState<Locale | undefined>(undefined);
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(true);


  useEffect(() => {
    setCalendarLocale(es);
    setSelectedDate(new Date());
    setIsLoadingCalendar(false);
  }, []);

  const handleAddEvent = () => {
    if (!selectedDate || !newEventTitle) return;
    const newEvent: Event = {
      id: crypto.randomUUID(),
      date: selectedDate,
      title: newEventTitle,
      description: newEventDescription,
    };
    setEvents(prevEvents => [...prevEvents, newEvent].sort((a, b) => a.date.getTime() - b.date.getTime()));
    setNewEventTitle('');
    setNewEventDescription('');
    setIsDialogOpen(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  const eventsForSelectedDate = selectedDate
    ? events.filter(event => format(event.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
    : [];

  const daysWithEvents = useMemo(() => {
    return new Set(events.map(event => format(event.date, 'yyyy-MM-dd')));
  }, [events]);
  
  const formattedSelectedDate = selectedDate && calendarLocale ? format(selectedDate, 'PPP', { locale: calendarLocale }) : 'Ninguna fecha seleccionada';
  const titleFormattedSelectedDate = selectedDate && calendarLocale ? format(selectedDate, 'PPP', { locale: calendarLocale }) : 'cargando fecha...';


  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-headline font-semibold tracking-tight">Eventos Gastronómicos</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={!selectedDate || isLoadingCalendar}>
              <PlusCircle className="mr-2 h-4 w-4" /> Añadir Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Evento</DialogTitle>
              <DialogDescription>
                {selectedDate && !isLoadingCalendar ? `Añadir un evento para el ${formattedSelectedDate}.` : 'Selecciona una fecha en el calendario primero.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-title" className="text-right">
                  Título
                </Label>
                <Input
                  id="event-title"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="col-span-3"
                  disabled={!selectedDate || isLoadingCalendar}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-description" className="text-right">
                  Descripción
                </Label>
                <Textarea
                  id="event-description"
                  value={newEventDescription}
                  onChange={(e) => setNewEventDescription(e.target.value)}
                  className="col-span-3"
                  placeholder="Detalles del evento (opcional)"
                  disabled={!selectedDate || isLoadingCalendar}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button type="submit" onClick={handleAddEvent} disabled={!selectedDate || !newEventTitle || isLoadingCalendar}>Guardar Evento</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Seleccionar Fecha</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center overflow-x-auto">
              {isLoadingCalendar || !calendarLocale ? (
                <p>Cargando calendario...</p>
              ) : ( 
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  locale={calendarLocale}
                  disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) } 
                  modifiers={{
                    hasEvents: (date: Date) => daysWithEvents.has(format(date, 'yyyy-MM-dd')),
                  }}
                  modifiersClassNames={{
                    hasEvents: 'font-bold border-2 border-primary rounded-sm',
                  }}
                />
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="min-h-[300px]">
            <CardHeader>
              <CardTitle className="font-headline">
                Eventos para {isLoadingCalendar ? 'cargando fecha...' : titleFormattedSelectedDate}
              </CardTitle>
              <CardDescription>Lista de eventos programados para la fecha seleccionada.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingCalendar ? (
                <p className="text-muted-foreground text-center py-8">Cargando eventos...</p>
              ) : selectedDate && eventsForSelectedDate.length > 0 ? (
                <ul className="space-y-4">
                  {eventsForSelectedDate.map(event => (
                    <li key={event.id} className="p-4 border rounded-lg flex justify-between items-start gap-2 hover:bg-muted/50">
                      <div>
                        <p className="font-semibold">{event.title}</p>
                        {event.description && <p className="text-sm text-muted-foreground mt-1">{event.description}</p>}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event.id)} aria-label="Eliminar evento">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  {selectedDate ? 'No hay eventos para esta fecha.' : 'Selecciona una fecha para ver los eventos.'}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

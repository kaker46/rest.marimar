
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Trash2 } from "lucide-react";
import { toast } from '@/hooks/use-toast';

interface Task {
  id: string;
  description: string;
  completed: boolean;
}

interface DailySchedule {
  dayName: string;
  tasks: Task[];
}

const initialWeeklySchedule: DailySchedule[] = [
  { dayName: "Lunes", tasks: [] },
  { dayName: "Martes", tasks: [] },
  { dayName: "Miércoles", tasks: [] },
  { dayName: "Jueves", tasks: [] },
  { dayName: "Viernes", tasks: [] },
  { dayName: "Sábado", tasks: [] },
  { dayName: "Domingo", tasks: [] },
];

export default function InternalOrganizationPage() {
  const [weeklySchedule, setWeeklySchedule] = useState<DailySchedule[]>(initialWeeklySchedule);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [currentDayForTask, setCurrentDayForTask] = useState<string | null>(null);
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleOpenAddTaskDialog = (dayName: string) => {
    setCurrentDayForTask(dayName);
    setNewTaskDescription('');
    setIsAddTaskDialogOpen(true);
  };

  const handleAddTask = () => {
    if (!currentDayForTask || !newTaskDescription.trim()) {
      toast({
        title: "Error",
        description: "La descripción de la tarea no puede estar vacía.",
        variant: "destructive",
      });
      return;
    }
    const newTask: Task = {
      id: crypto.randomUUID(),
      description: newTaskDescription.trim(),
      completed: false,
    };
    setWeeklySchedule(prevSchedule =>
      prevSchedule.map(daySchedule =>
        daySchedule.dayName === currentDayForTask
          ? { ...daySchedule, tasks: [...daySchedule.tasks, newTask] }
          : daySchedule
      )
    );
    toast({
      title: "Tarea Añadida",
      description: `Tarea "${newTask.description}" añadida a ${currentDayForTask}.`,
    });
    setIsAddTaskDialogOpen(false);
  };

  const handleToggleTask = (dayName: string, taskId: string) => {
    setWeeklySchedule(prevSchedule =>
      prevSchedule.map(daySchedule =>
        daySchedule.dayName === dayName
          ? {
              ...daySchedule,
              tasks: daySchedule.tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : daySchedule
      )
    );
  };

  const handleDeleteTask = (dayName: string, taskId: string) => {
    setWeeklySchedule(prevSchedule =>
      prevSchedule.map(daySchedule =>
        daySchedule.dayName === dayName
          ? { ...daySchedule, tasks: daySchedule.tasks.filter(task => task.id !== taskId) }
          : daySchedule
      )
    );
    toast({
      title: "Tarea Eliminada",
      description: "La tarea ha sido eliminada.",
      variant: "destructive" 
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-3xl font-headline font-semibold tracking-tight">Organización Interna - Tareas Semanales</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Planificador de Tareas</CardTitle>
          <CardDescription>
            Organiza y asigna las tareas para cada día de la semana.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {weeklySchedule.map((daySchedule) => (
              <AccordionItem value={daySchedule.dayName} key={daySchedule.dayName} className="border px-4 rounded-lg bg-muted/20">
                <AccordionTrigger className="text-xl font-headline hover:no-underline py-4">
                  {daySchedule.dayName}
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 space-y-3">
                  {daySchedule.tasks.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-2">No hay tareas para este día.</p>
                  ) : (
                    <ul className="space-y-2">
                      {daySchedule.tasks.map(task => (
                        <li key={task.id} className="flex items-center justify-between p-2.5 border rounded-md bg-background hover:bg-muted/50">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id={`task-${daySchedule.dayName}-${task.id}`}
                              checked={task.completed}
                              onCheckedChange={() => handleToggleTask(daySchedule.dayName, task.id)}
                            />
                            <label
                              htmlFor={`task-${daySchedule.dayName}-${task.id}`}
                              className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                            >
                              {task.description}
                            </label>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteTask(daySchedule.dayName, task.id)}
                            aria-label="Eliminar tarea"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3 w-full sm:w-auto"
                    onClick={() => handleOpenAddTaskDialog(daySchedule.dayName)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Añadir Tarea a {daySchedule.dayName}
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Añadir Nueva Tarea para {currentDayForTask}</DialogTitle>
            <DialogDescription>
              Escribe la descripción de la tarea que quieres añadir.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-description" className="text-right">
                Descripción
              </Label>
              <Input
                id="task-description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                className="col-span-3"
                placeholder="Ej: Limpiar mesas zona A"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddTaskDialogOpen(false)}>Cancelar</Button>
            <Button type="submit" onClick={handleAddTask}>Guardar Tarea</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

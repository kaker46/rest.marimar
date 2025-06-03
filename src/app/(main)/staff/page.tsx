
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Edit3, Phone, Mail, ListChecks } from "lucide-react";
import { toast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Task {
  id: string;
  description: string;
  timeSlot: 'beforeLunch' | 'beforeDinner';
  completed: boolean;
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  avatarFallback: string;
  phone: string;
  email: string;
  status: "Activo" | "De Permiso";
  imageHint: string;
  tasks: Task[];
}

const initialStaffMembers: StaffMember[] = [
  { id: "1", name: "Maria Garcia", role: "Jefe de Cocina", avatarUrl: "https://placehold.co/100x100.png", avatarFallback: "MG", phone: "555-0101", email: "maria.g@restoadapt.com", status: "Activo", imageHint: "female chef", tasks: [] },
  { id: "2", name: "David Kim", role: "Gerente del Restaurante", avatarUrl: "https://placehold.co/100x100.png", avatarFallback: "DK", phone: "555-0102", email: "david.k@restoadapt.com", status: "Activo", imageHint: "male manager", tasks: [] },
  { id: "3", name: "Linda Jones", role: "Encargada de Sala", avatarUrl: "https://placehold.co/100x100.png", avatarFallback: "LJ", phone: "555-0103", email: "linda.j@restoadapt.com", status: "De Permiso", imageHint: "female waitress", tasks: [] },
  { id: "4", name: "Robert Brown", role: "Subchef", avatarUrl: "https://placehold.co/100x100.png", avatarFallback: "RB", phone: "555-0104", email: "robert.b@restoadapt.com", status: "Activo", imageHint: "male chef", tasks: [] },
];

export default function StaffPage() {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(initialStaffMembers);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [selectedStaffMember, setSelectedStaffMember] = useState<StaffMember | null>(null);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskTimeSlot, setNewTaskTimeSlot] = useState<'beforeLunch' | 'beforeDinner'>('beforeLunch');

  const handleOpenTaskDialog = (staffMember: StaffMember) => {
    setSelectedStaffMember(staffMember);
    setIsTaskDialogOpen(true);
    setNewTaskDescription(''); 
    setNewTaskTimeSlot('beforeLunch');
  };

  const handleAddTask = () => {
    if (!selectedStaffMember || !newTaskDescription) {
      toast({ title: "Error", description: "La descripción de la tarea no puede estar vacía.", variant: "destructive" });
      return;
    }
    const newTask: Task = {
      id: crypto.randomUUID(),
      description: newTaskDescription,
      timeSlot: newTaskTimeSlot,
      completed: false,
    };
    setStaffMembers(prevStaff =>
      prevStaff.map(staff =>
        staff.id === selectedStaffMember.id
          ? { ...staff, tasks: [...staff.tasks, newTask] }
          : staff
      )
    );
    setNewTaskDescription('');
    toast({ title: "Tarea Añadida", description: `Tarea "${newTaskDescription}" añadida a ${selectedStaffMember.name}.` });
  };

  const handleToggleTask = (staffMemberId: string, taskId: string) => {
    setStaffMembers(prevStaff =>
      prevStaff.map(staff =>
        staff.id === staffMemberId
          ? {
              ...staff,
              tasks: staff.tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : staff
      )
    );
  };

  const tasksBeforeLunch = selectedStaffMember?.tasks.filter(t => t.timeSlot === 'beforeLunch') || [];
  const tasksBeforeDinner = selectedStaffMember?.tasks.filter(t => t.timeSlot === 'beforeDinner') || [];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-headline font-semibold tracking-tight">Gestión de Personal</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Añadir Miembro del Personal
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {staffMembers.map((staff) => (
          <Card key={staff.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={staff.avatarUrl} alt={staff.name} data-ai-hint={staff.imageHint} />
                <AvatarFallback>{staff.avatarFallback}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl font-headline">{staff.name}</CardTitle>
                <CardDescription>{staff.role}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 flex flex-col flex-grow">
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                <span>{staff.phone}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                <span>{staff.email}</span>
              </div>
              <div>
                <span className={`text-xs px-2 py-1 rounded-full ${staff.status === "Activo" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {staff.status}
                </span>
              </div>
              <div className="mt-auto pt-3 border-t">
                <TooltipProvider delayDuration={300}>
                  <div className="flex flex-col md:flex-row md:justify-center gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                          <Edit3 className="h-4 w-4" />
                          <span className="ml-2">Editar</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Editar</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="secondary" size="sm" className="w-full" onClick={() => handleOpenTaskDialog(staff)}>
                          <ListChecks className="h-4 w-4" />
                          <span className="ml-2">Tareas</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Tareas</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedStaffMember && (
        <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Tareas de {selectedStaffMember.name}</DialogTitle>
              <DialogDescription>
                Añade y gestiona las tareas pendientes para este miembro del personal.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <h4 className="font-semibold text-md">Añadir Nueva Tarea</h4>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="task-description" className="text-right col-span-1">
                  Tarea
                </Label>
                <Input
                  id="task-description"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  className="col-span-3"
                  placeholder="Descripción de la tarea"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="task-timeslot" className="text-right col-span-1">
                  Turno
                </Label>
                <Select value={newTaskTimeSlot} onValueChange={(value) => setNewTaskTimeSlot(value as 'beforeLunch' | 'beforeDinner')}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar turno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beforeLunch">Antes del servicio de comidas</SelectItem>
                    <SelectItem value="beforeDinner">Antes del servicio de cenas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddTask} className="w-full mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> Añadir Tarea
              </Button>
            </div>

            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              <div>
                <h4 className="font-semibold text-md mb-2">Tareas antes del servicio de comidas</h4>
                {tasksBeforeLunch.length > 0 ? (
                  tasksBeforeLunch.map(task => (
                    <div key={task.id} className="flex items-center space-x-2 py-1.5 border-b last:border-b-0">
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => handleToggleTask(selectedStaffMember.id, task.id)}
                      />
                      <label
                        htmlFor={`task-${task.id}`}
                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                      >
                        {task.description}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No hay tareas para este turno.</p>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-md mb-2">Tareas antes del servicio de cenas</h4>
                {tasksBeforeDinner.length > 0 ? (
                  tasksBeforeDinner.map(task => (
                    <div key={task.id} className="flex items-center space-x-2 py-1.5 border-b last:border-b-0">
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => handleToggleTask(selectedStaffMember.id, task.id)}
                      />
                      <label
                        htmlFor={`task-${task.id}`}
                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                      >
                        {task.description}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No hay tareas para este turno.</p>
                )}
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsTaskDialogOpen(false)}>Cerrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}


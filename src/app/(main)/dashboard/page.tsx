
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarClock, CalendarDays, ListChecks, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // Datos de ejemplo - en una aplicación real, esto vendría del estado o una API
  const todaysReservations = 5;
  const upcomingEvents = 2;
  const pendingTasks = 8;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h2 className="text-3xl font-headline font-semibold tracking-tight">
          Panel de Control
        </h2>
        <div className="flex gap-2">
          <Link href="/events">
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Evento
            </Button>
          </Link>
          <Link href="/reservations">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Nueva Reserva
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-headline">
              Reservas de Hoy
            </CardTitle>
            <CalendarClock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysReservations}</div>
            <p className="text-xs text-muted-foreground">
              +3 más que ayer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-headline">
              Próximos Eventos
            </CardTitle>
            <CalendarDays className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents}</div>
            <p className="text-xs text-muted-foreground">
              Esta semana
            </p>
            <Link href="/events" className="mt-2 inline-block">
              <Button variant="link" className="p-0 h-auto text-sm text-primary hover:text-primary/80">Ver todos los eventos</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-headline">
              Tareas Pendientes
            </CardTitle>
            <ListChecks className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks}</div>
            <p className="text-xs text-muted-foreground">
              Asignadas esta semana
            </p>
            <Link href="/internal-organization" className="mt-2 inline-block">
              <Button variant="link" className="p-0 h-auto text-sm text-primary hover:text-primary/80">Gestionar tareas</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

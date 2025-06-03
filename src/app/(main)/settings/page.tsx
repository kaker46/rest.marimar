
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-headline font-semibold tracking-tight">Configuración</h2>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Información del Restaurante</CardTitle>
          <CardDescription>Actualiza los detalles básicos de tu restaurante.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="restaurantName">Nombre del Restaurante</Label>
            <Input id="restaurantName" defaultValue="RestoAdapt Alta Cocina" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="restaurantAddress">Dirección</Label>
            <Input id="restaurantAddress" defaultValue="Av. Culinaria 123, Ciudad Gastronómica" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="restaurantPhone">Número de Teléfono</Label>
            <Input id="restaurantPhone" type="tel" defaultValue="(555) 123-4567" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="restaurantEmail">Correo Electrónico</Label>
            <Input id="restaurantEmail" type="email" defaultValue="contact@restoadapt.com" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Configuración Operativa</CardTitle>
          <CardDescription>Configura cómo opera tu restaurante.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="onlineOrders" className="flex flex-col space-y-1">
              <span>Pedidos en Línea</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Permitir a los clientes realizar pedidos a través de tu sitio web.
              </span>
            </Label>
            <Switch id="onlineOrders" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="onlineReservations" className="flex flex-col space-y-1">
              <span>Reservas en Línea</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Habilitar a los clientes para reservar mesas en línea.
              </span>
            </Label>
            <Switch id="onlineReservations" defaultChecked />
          </div>
          
          <Separator />

          <div className="space-y-1">
            <Label htmlFor="currency">Moneda</Label>
            <Input id="currency" defaultValue="USD ($)" />
            <p className="text-sm text-muted-foreground">
              Establece la moneda predeterminada para tu menú y transacciones.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button>
          <Save className="mr-2 h-4 w-4" /> Guardar Cambios
        </Button>
      </div>
    </div>
  );
}

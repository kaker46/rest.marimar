
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: "Entrante" | "Plato Principal" | "Postre" | "Bebida";
  imageUrl: string;
  imageHint: string;
}

interface CompleteMenu {
  id: string; 
  name: string; 
  appetizer: MenuItem;
  mainCourse: MenuItem;
  dessert: MenuItem;
  totalPrice: string; 
}

interface DailyMenu {
  id: string; 
  dayName: string;
  menus: CompleteMenu[]; 
}

const weeklyMenuData: DailyMenu[] = [
  {
    id: "lunes",
    dayName: "Lunes",
    menus: [
      {
        id: "l-menu-1",
        name: "Menú Clásico",
        totalPrice: "$28.00",
        appetizer: { id: "l-m1-e", name: "Ensalada César", description: "Pollo crujiente, lascas de parmesano, croutons y nuestra salsa César especial.", price: "$9.50", category: "Entrante", imageUrl: "https://placehold.co/300x200.png", imageHint: "caesar salad" },
        mainCourse: { id: "l-m1-p", name: "Lasaña de Carne Tradicional", description: "Capas de pasta fresca, rica boloñesa casera y cremosa bechamel, horneada a la perfección.", price: "$15.00", category: "Plato Principal", imageUrl: "https://placehold.co/300x200.png", imageHint: "beef lasagna" },
        dessert: { id: "l-m1-d", name: "Tiramisú Italiano", description: "Clásico postre italiano con bizcochos de soletilla bañados en café y crema de mascarpone.", price: "$7.50", category: "Postre", imageUrl: "https://placehold.co/300x200.png", imageHint: "tiramisu classic" },
      },
      {
        id: "l-menu-2",
        name: "Menú Ligero",
        totalPrice: "$25.00",
        appetizer: { id: "l-m2-e", name: "Crema de Verduras de Temporada", description: "Suave y reconfortante crema hecha con una selección de verduras frescas de temporada.", price: "$8.00", category: "Entrante", imageUrl: "https://placehold.co/300x200.png", imageHint: "vegetable soup" },
        mainCourse: { id: "l-m2-p", name: "Salmón al Vapor con Eneldo", description: "Filete de salmón fresco cocido al vapor, aderezado con eneldo y limón, acompañado de quinoa.", price: "$14.00", category: "Plato Principal", imageUrl: "https://placehold.co/300x200.png", imageHint: "steamed salmon" },
        dessert: { id: "l-m2-d", name: "Macedonia de Frutas Frescas", description: "Combinación refrescante de frutas de temporada cortadas: piña, melón, fresas y kiwi.", price: "$6.00", category: "Postre", imageUrl: "https://placehold.co/300x200.png", imageHint: "fruit salad" },
      },
    ],
  },
  {
    id: "martes",
    dayName: "Martes",
    menus: [
      {
        id: "ma-menu-1",
        name: "Menú del Mar",
        totalPrice: "$32.00",
        appetizer: { id: "ma-m1-e", name: "Cóctel de Gambas", description: "Gambas frescas servidas con nuestra salsa rosa especial sobre una cama de lechuga crujiente.", price: "$10.00", category: "Entrante", imageUrl: "https://placehold.co/300x200.png", imageHint: "shrimp cocktail" },
        mainCourse: { id: "ma-m1-p", name: "Paella Marinera", description: "Auténtica paella con arroz bomba, calamares, mejillones, almejas y langostinos frescos.", price: "$18.00", category: "Plato Principal", imageUrl: "https://placehold.co/300x200.png", imageHint: "seafood paella" },
        dessert: { id: "ma-m1-d", name: "Tarta de Queso con Arándanos", description: "Cremosa tarta de queso horneada sobre base de galleta, cubierta con mermelada de arándanos casera.", price: "$8.00", category: "Postre", imageUrl: "https://placehold.co/300x200.png", imageHint: "cheesecake blueberry" },
      },
      {
        id: "ma-menu-2",
        name: "Menú Campestre",
        totalPrice: "$27.00",
        appetizer: { id: "ma-m2-e", name: "Tabla de Embutidos Ibéricos", description: "Selección de jamón ibérico, chorizo, salchichón y queso manchego curado.", price: "$11.00", category: "Entrante", imageUrl: "https://placehold.co/300x200.png", imageHint: "charcuterie board" },
        mainCourse: { id: "ma-m2-p", name: "Solomillo de Cerdo a la Mostaza", description: "Tierno solomillo de cerdo cocinado a la perfección con una suave salsa de mostaza antigua y patatas panadera.", price: "$13.00", category: "Plato Principal", imageUrl: "https://placehold.co/300x200.png", imageHint: "pork tenderloin" },
        dessert: { id: "ma-m2-d", name: "Arroz con Leche Casero", description: "Postre tradicional cremoso, aromatizado con canela y limón.", price: "$6.50", category: "Postre", imageUrl: "https://placehold.co/300x200.png", imageHint: "rice pudding" },
      },
    ],
  },
  {
    id: "miercoles",
    dayName: "Miércoles",
    menus: [
      {
        id: "mi-menu-1",
        name: "Menú Italiano",
        totalPrice: "$29.00",
        appetizer: { id: "mi-m1-e", name: "Bruschetta Pomodoro", description: "Tostadas de pan rústico con tomate fresco, ajo, albahaca y aceite de oliva virgen extra.", price: "$8.50", category: "Entrante", imageUrl: "https://placehold.co/300x200.png", imageHint: "bruschetta pomodoro" },
        mainCourse: { id: "mi-m1-p", name: "Risotto de Champiñones", description: "Cremoso risotto Arborio con una mezcla de champiñones frescos y parmesano.", price: "$16.00", category: "Plato Principal", imageUrl: "https://placehold.co/300x200.png", imageHint: "mushroom risotto" },
        dessert: { id: "mi-m1-d", name: "Panna Cotta", description: "Delicado postre italiano de crema cocida, servido con coulis de frutos rojos.", price: "$7.00", category: "Postre", imageUrl: "https://placehold.co/300x200.png", imageHint: "panna cotta" },
      },
      {
        id: "mi-menu-2",
        name: "Menú de la Huerta",
        totalPrice: "$26.00",
        appetizer: { id: "mi-m2-e", name: "Gazpacho Andaluz", description: "Sopa fría tradicional española, refrescante y llena de sabor a tomate y hortalizas.", price: "$7.50", category: "Entrante", imageUrl: "https://placehold.co/300x200.png", imageHint: "gazpacho soup" },
        mainCourse: { id: "mi-m2-p", name: "Berenjenas Rellenas de Verduras", description: "Berenjenas horneadas rellenas de un sofrito de pimientos, cebolla, calabacín y tomate, gratinadas con queso.", price: "$14.50", category: "Plato Principal", imageUrl: "https://placehold.co/300x200.png", imageHint: "stuffed eggplant" },
        dessert: { id: "mi-m2-d", name: "Yogur Griego con Miel y Nueces", description: "Cremoso yogur griego natural, endulzado con miel de flores y coronado con nueces crujientes.", price: "$6.50", category: "Postre", imageUrl: "https://placehold.co/300x200.png", imageHint: "greek yogurt" },
      },
    ],
  },
  {
    id: "jueves",
    dayName: "Jueves",
    menus: [
      {
        id: "ju-menu-1",
        name: "Menú Tradicional Español",
        totalPrice: "$30.00",
        appetizer: { id: "ju-m1-e", name: "Croquetas Caseras de Jamón", description: "Cremosas croquetas hechas con jamón ibérico de bellota y bechamel casera.", price: "$9.00", category: "Entrante", imageUrl: "https://placehold.co/300x200.png", imageHint: "ham croquettes" },
        mainCourse: { id: "ju-m1-p", name: "Entrecot de Ternera a la Pimienta", description: "Jugoso entrecot de ternera gallega a la parrilla con una suave salsa a la pimienta verde y patatas fritas caseras.", price: "$17.00", category: "Plato Principal", imageUrl: "https://placehold.co/300x200.png", imageHint: "beef steak" },
        dessert: { id: "ju-m1-d", name: "Flan de Huevo Casero", description: "Clásico flan de huevo con caramelo líquido, receta tradicional de la abuela.", price: "$7.00", category: "Postre", imageUrl: "https://placehold.co/300x200.png", imageHint: "egg flan" },
      },
      {
        id: "ju-menu-2",
        name: "Menú Asiático Fusión",
        totalPrice: "$28.00",
        appetizer: { id: "ju-m2-e", name: "Rollitos de Primavera Vegetarianos", description: "Crujientes rollitos rellenos de verduras frescas, acompañados de salsa agridulce.", price: "$8.00", category: "Entrante", imageUrl: "https://placehold.co/300x200.png", imageHint: "spring rolls" },
        mainCourse: { id: "ju-m2-p", name: "Pollo Teriyaki con Arroz Jazmín", description: "Trozos de pollo marinado en salsa teriyaki casera, salteado con verduras y servido con arroz jazmín.", price: "$15.50", category: "Plato Principal", imageUrl: "https://placehold.co/300x200.png", imageHint: "teriyaki chicken" },
        dessert: { id: "ju-m2-d", name: "Mochi Helado (Variado)", description: "Selección de mochis helados japoneses con diferentes sabores (té verde, mango, fresa).", price: "$7.50", category: "Postre", imageUrl: "https://placehold.co/300x200.png", imageHint: "mochi icecream" },
      },
    ],
  },
  {
    id: "viernes",
    dayName: "Viernes",
    menus: [
      {
        id: "vi-menu-1",
        name: "Menú de Pescador",
        totalPrice: "$33.00",
        appetizer: { id: "vi-m1-e", name: "Pulpo a la Gallega", description: "Tierno pulpo cocido en su punto, con patatas cachelos, pimentón de la Vera y aceite de oliva.", price: "$12.00", category: "Entrante", imageUrl: "https://placehold.co/300x200.png", imageHint: "galician octopus" },
        mainCourse: { id: "vi-m1-p", name: "Bacalao al Pil Pil", description: "Lomos de bacalao desalado confitados lentamente en aceite de oliva con ajo y guindillas.", price: "$17.50", category: "Plato Principal", imageUrl: "https://placehold.co/300x200.png", imageHint: "cod pilpil" },
        dessert: { id: "vi-m1-d", name: "Tarta de Santiago", description: "Tarta de almendras tradicional gallega, jugosa y con un ligero toque de limón.", price: "$7.50", category: "Postre", imageUrl: "https://placehold.co/300x200.png", imageHint: "santiago cake" },
      },
      {
        id: "vi-menu-2",
        name: "Menú Barbacoa",
        totalPrice: "$30.00",
        appetizer: { id: "vi-m2-e", name: "Alitas de Pollo BBQ", description: "Jugosas alitas de pollo marinadas en nuestra salsa barbacoa secreta y horneadas lentamente.", price: "$9.50", category: "Entrante", imageUrl: "https://placehold.co/300x200.png", imageHint: "bbq wings" },
        mainCourse: { id: "vi-m2-p", name: "Costillas de Cerdo Glaseadas", description: "Tiernas costillas de cerdo horneadas y glaseadas con salsa barbacoa casera, acompañadas de mazorca de maíz.", price: "$16.50", category: "Plato Principal", imageUrl: "https://placehold.co/300x200.png", imageHint: "bbq ribs" },
        dessert: { id: "vi-m2-d", name: "Brownie de Chocolate con Helado", description: "Intenso brownie de chocolate negro con nueces, servido caliente con una bola de helado de vainilla.", price: "$8.00", category: "Postre", imageUrl: "https://placehold.co/300x200.png", imageHint: "brownie icecream" },
      },
    ],
  },
  {
    id: "sabado",
    dayName: "Sábado",
    menus: [
      {
        id: "sa-menu-1",
        name: "Menú Especial Fin de Semana",
        totalPrice: "$38.00",
        appetizer: { id: "sa-m1-e", name: "Vieiras Gratinadas", description: "Delicadas vieiras frescas gratinadas con una suave bechamel de marisco y un toque de parmesano.", price: "$14.00", category: "Entrante", imageUrl: "https://placehold.co/300x200.png", imageHint: "scallops gratin" },
        mainCourse: { id: "sa-m1-p", name: "Chuletón de Ternera a la Brasa", description: "Impresionante chuletón de ternera madurada (aprox. 500g) cocinado a la brasa, servido con pimientos de padrón.", price: "$20.00", category: "Plato Principal", imageUrl: "https://placehold.co/300x200.png", imageHint: "grilled steak" },
        dessert: { id: "sa-m1-d", name: "Coulant de Chocolate Negro", description: "Volcán de chocolate negro con corazón líquido, acompañado de helado de frambuesa.", price: "$9.00", category: "Postre", imageUrl: "https://placehold.co/300x200.png", imageHint: "chocolate coulant" },
      },
      {
        id: "sa-menu-2",
        name: "Menú Gourmet de Tapas",
        totalPrice: "$35.00",
        appetizer: { id: "sa-m2-e", name: "Trilogía de Mini Hamburguesas", description: "Tres mini hamburguesas gourmet: ternera con cebolla caramelizada, pollo crujiente y vegana de garbanzos.", price: "$13.00", category: "Entrante", imageUrl: "https://placehold.co/300x200.png", imageHint: "mini burgers" },
        mainCourse: { id: "sa-m2-p", name: "Surtido de Pinchos Creativos", description: "Selección de 5 pinchos elaborados: gilda moderna, tartar de salmón, brocheta de langostino, foie con manzana y rollito de calabacín.", price: "$18.00", category: "Plato Principal", imageUrl: "https://placehold.co/300x200.png", imageHint: "creative tapas" },
        dessert: { id: "sa-m2-d", name: "Degustación de Postres Caseros", description: "Pequeñas porciones de nuestros mejores postres: tarta de queso, brownie y panna cotta.", price: "$8.50", category: "Postre", imageUrl: "https://placehold.co/300x200.png", imageHint: "dessert tasting" },
      },
    ],
  },
  {
    id: "domingo",
    dayName: "Domingo",
    menus: [
      {
        id: "do-menu-1",
        name: "Menú Familiar de Asado",
        totalPrice: "$40.00",
        appetizer: { id: "do-m1-e", name: "Sopa de Pescado y Marisco", description: "Reconfortante sopa casera con trozos de pescado blanco, gambas, mejillones y un toque de azafrán.", price: "$11.00", category: "Entrante", imageUrl: "https://placehold.co/300x200.png", imageHint: "seafood soup" },
        mainCourse: { id: "do-m1-p", name: "Cordero Lechal Asado al Horno", description: "Paletilla de cordero lechal asada lentamente con patatas panadera y hierbas aromáticas.", price: "$22.00", category: "Plato Principal", imageUrl: "https://placehold.co/300x200.png", imageHint: "roast lamb" },
        dessert: { id: "do-m1-d", name: "Profiteroles con Chocolate Caliente", description: "Clásicos profiteroles rellenos de nata montada y cubiertos con abundante chocolate caliente.", price: "$9.00", category: "Postre", imageUrl: "https://placehold.co/300x200.png", imageHint: "profiteroles chocolate" },
      },
      {
        id: "do-menu-2",
        name: "Menú Brunch Dominical",
        totalPrice: "$30.00",
        appetizer: { id: "do-m2-e", name: "Huevos Benedictinos con Salmón", description: "Dos huevos pochados sobre muffins ingleses con salmón ahumado y salsa holandesa casera.", price: "$10.00", category: "Entrante", imageUrl: "https://placehold.co/300x200.png", imageHint: "eggs benedict" },
        mainCourse: { id: "do-m2-p", name: "Bagel Club Sándwich", description: "Bagel tostado con pechuga de pollo a la plancha, bacon crujiente, lechuga, tomate y mayonesa. Acompañado de patatas gajo.", price: "$14.00", category: "Plato Principal", imageUrl: "https://placehold.co/300x200.png", imageHint: "club sandwich" },
        dessert: { id: "do-m2-d", name: "Pancakes con Sirope de Arce y Frutos Rojos", description: "Torre de esponjosos pancakes americanos, servidos con sirope de arce y una selección de frutos rojos frescos.", price: "$8.00", category: "Postre", imageUrl: "https://placehold.co/300x200.png", imageHint: "pancakes berries" },
      },
    ],
  },
];

export default function MenuPage() {
  const renderDishCard = (item: MenuItem) => (
    <Card key={item.id} className="flex flex-col">
      <CardHeader className="p-0">
        <Image 
          src={item.imageUrl} 
          alt={item.name} 
          width={300} 
          height={200} 
          className="object-cover w-full h-48 rounded-t-lg"
          data-ai-hint={item.imageHint}
        />
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-grow">
        <CardTitle className="text-lg font-headline mb-1">{item.name}</CardTitle>
        <CardDescription className="text-sm mb-2 flex-grow">{item.description}</CardDescription>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-semibold text-primary">{item.price}</span>
          <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full">{item.category}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-headline font-semibold tracking-tight">Menú de la Semana</h2>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {weeklyMenuData.map((dailyMenu) => (
          <AccordionItem value={dailyMenu.id} key={dailyMenu.id}>
            <AccordionTrigger className="text-xl font-headline hover:no-underline">
              {dailyMenu.dayName}
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-4 space-y-8">
                {dailyMenu.menus.map((menuSet) => (
                  <div key={menuSet.id} className="space-y-4 p-4 border rounded-lg shadow-sm bg-card">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-xl font-headline font-semibold text-primary">{menuSet.name}</h4>
                      <span className="text-lg font-semibold text-accent">{menuSet.totalPrice}</span>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
                      {renderDishCard(menuSet.appetizer)}
                      {renderDishCard(menuSet.mainCourse)}
                      {renderDishCard(menuSet.dessert)}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
    

    

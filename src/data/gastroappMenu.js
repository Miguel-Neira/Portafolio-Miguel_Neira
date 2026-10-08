import helado from '../assets/gastroapp/helado.jpg'
import papasFritas from '../assets/gastroapp/papas-fritas.jpg'
import pizzaConCarne from '../assets/gastroapp/pizza-con-carne.webp'
import pizzaHawaiana from '../assets/gastroapp/pizza-hawaiana.jpg'
import pizzaMargarita from '../assets/gastroapp/pizza-margarita.jpg'
import pizzaPepperoni from '../assets/gastroapp/pizza-pepperoni.jpg'
import sushi from '../assets/gastroapp/sushi.jpg'

// Mismos datos que carta/fixtures/demo_menu.json en el proyecto GASTROAPP original,
// reconstruidos como UI estática (sin backend) para el portafolio.
export const menu = [
  {
    categoria: 'Pizzas',
    icono: 'fas fa-pizza-slice',
    platos: [
      {
        id: 1,
        nombre: 'Pizza Margarita',
        descripcion: 'Salsa de tomate, mozzarella y albahaca fresca.',
        precio: 8990,
        imagen: pizzaMargarita,
      },
      {
        id: 2,
        nombre: 'Pizza Hawaiana',
        descripcion: 'Jamón, piña y mozzarella.',
        precio: 9490,
        imagen: pizzaHawaiana,
      },
      {
        id: 3,
        nombre: 'Pizza Pepperoni',
        descripcion: 'Doble pepperoni y mozzarella.',
        precio: 9290,
        imagen: pizzaPepperoni,
      },
      {
        id: 4,
        nombre: 'Pizza con Carne',
        descripcion: 'Carne mechada, cebolla caramelizada y mozzarella.',
        precio: 9990,
        imagen: pizzaConCarne,
      },
    ],
  },
  {
    categoria: 'Acompañamientos',
    icono: 'fas fa-utensils',
    platos: [
      {
        id: 5,
        nombre: 'Papas Fritas',
        descripcion: 'Porción de papas fritas crocantes.',
        precio: 3500,
        imagen: papasFritas,
      },
    ],
  },
  {
    categoria: 'Postres',
    icono: 'fas fa-ice-cream',
    platos: [
      {
        id: 6,
        nombre: 'Helado',
        descripcion: 'Helado artesanal, pregunta por los sabores disponibles.',
        precio: 2500,
        imagen: helado,
      },
    ],
  },
  {
    categoria: 'Sushi',
    icono: 'fas fa-fish',
    platos: [
      {
        id: 7,
        nombre: 'Sushi Mix',
        descripcion: 'Selección de piezas variadas para compartir.',
        precio: 7990,
        imagen: sushi,
      },
    ],
  },
]

export const allPlatos = menu.flatMap((cat) => cat.platos)

export function formatCLP(value) {
  return new Intl.NumberFormat('es-CL').format(value)
}

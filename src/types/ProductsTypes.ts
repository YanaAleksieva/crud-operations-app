interface Product {
    id: number | string;
    name: string;
    price: string | number;
    currency: string;
  }
  
interface EditableRowProps {
    product: Product;
}
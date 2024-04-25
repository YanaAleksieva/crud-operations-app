interface Product {
    id: number;
    name: string;
    price: string;
    currency: string;
  }
  
interface EditableRowProps {
    product: Product;
    onSave: (id: number, name: string, price: string, currency: string) => void;
}
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export function toPrice(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format(value);
}
